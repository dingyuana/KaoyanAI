"""LLM integration for kaoyan backend.

Supports two modes:
  - Mock mode: returns retrieved context content directly (no API key)
  - Real mode: streams from OpenAI-compatible API token by token
"""

import asyncio
import json
import re
from typing import AsyncIterator, Optional

from config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL, MOCK_MODE

# Token budget: rough estimate for Chinese text (2 chars ≈ 1 token)
MAX_CONTEXT_TOKENS = 3000
MAX_RESPONSE_TOKENS = 2000
STREAM_TIMEOUT = 60.0


def estimate_tokens(text: str) -> int:
    """Rough token estimation for Chinese/English mixed text."""
    # Chinese chars count as ~2 tokens each, English words ~1 token
    chinese_chars = len(re.findall(r'[\u4e00-\u9fff]', text))
    other_chars = len(text) - chinese_chars
    return chinese_chars + other_chars // 2


def trim_context(context: str, max_tokens: int = MAX_CONTEXT_TOKENS) -> str:
    """Trim context to fit within token budget."""
    if estimate_tokens(context) <= max_tokens:
        return context
    ratio = max_tokens / estimate_tokens(context)
    cut_pos = int(len(context) * ratio)
    return context[:cut_pos] + "\n\n[内容已截断，以上为最相关内容]"


def _build_prompt(context: str, question: str) -> list:
    """Build OpenAI-compatible messages array from context and question."""
    trimmed = trim_context(context)
    return [
        {
            "role": "system",
            "content": (
                "你是一个专业的考研备考助手。请基于以下知识库内容回答用户的问题。\n"
                "要求：\n"
                "1. 只基于知识库内容回答，不编造知识\n"
                "2. 如果知识库中没有相关信息，请明确说明「无法从知识库中找到答案」\n"
                "3. 回答要准确、详细，包含数学公式时使用 LaTeX 格式\n"
                "4. 用中文回答"
            ),
        },
        {
            "role": "user",
            "content": f"知识库内容：\n{trimmed}\n\n用户问题：{question}",
        },
    ]


def generate_response(context: str, question: str) -> str:
    """
    Generate response using LLM (sync, non-streaming).

    Args:
        context: Retrieved knowledge base content
        question: User's question

    Returns:
        Generated answer text
    """
    if MOCK_MODE:
        return _mock_response(context, question)
    return _call_llm_sync(context, question)


def _mock_response(context: str, question: str) -> str:
    """
    Mock response when no API key is available.
    Returns the most relevant portion of context content.
    """
    if not context or not context.strip():
        return (
            "抱歉，知识库中暂时没有找到相关信息。\n\n"
            "建议：\n"
            "- 尝试更换关键词\n"
            "- 尝试更具体的描述\n"
            "- 或者换个问题试试"
        )

    content = context.strip()
    if len(content) > 2000:
        content = content[:2000] + "\n\n[内容较长，已截取最相关部分]"

    return content


def _call_llm_sync(context: str, question: str) -> str:
    """
    Call LLM API synchronously (non-streaming fallback).

    Args:
        context: Retrieved knowledge base content
        question: User's question

    Returns:
        LLM response text
    """
    try:
        import httpx
    except ImportError:
        return "错误：缺少 httpx 库，请执行 `pip install httpx`"

    messages = _build_prompt(context, question)

    headers = {
        "Authorization": f"Bearer {LLM_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": LLM_MODEL,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": MAX_RESPONSE_TOKENS,
    }

    try:
        with httpx.Client(timeout=STREAM_TIMEOUT) as client:
            response = client.post(
                f"{LLM_BASE_URL}/chat/completions",
                headers=headers,
                json=payload,
            )
            response.raise_for_status()
            result = response.json()
            return result["choices"][0]["message"]["content"]
    except httpx.TimeoutException:
        return "调用 LLM 时超时，请稍后重试或检查网络连接。"
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 401:
            return "LLM API 认证失败，请检查 API Key 配置。"
        return f"调用 LLM 时出错 (HTTP {e.response.status_code})，请稍后重试。"
    except Exception as e:
        return f"调用 LLM 时出错: {str(e)}。请检查 API 配置或稍后再试。"


async def generate_response_stream(context: str, question: str) -> AsyncIterator[str]:
    """
    Generate response as an async stream of content chunks.

    Mock mode: yields content line by line with short delay.
    Real mode: streams from LLM API token by token.

    Args:
        context: Retrieved knowledge base content
        question: User's question

    Yields:
        Content chunks as strings
    """
    if MOCK_MODE:
        async for chunk in _mock_response_stream(context, question):
            yield chunk
    else:
        async for chunk in _call_llm_stream(context, question):
            yield chunk


async def _mock_response_stream(context: str, question: str) -> AsyncIterator[str]:
    """
    Mock streaming response — yields content in chunks with realistic timing.
    """
    if not context or not context.strip():
        yield "抱歉，知识库中暂时没有找到相关信息。"
        await asyncio.sleep(0.3)
        yield "\n\n建议：\n- 尝试更换关键词\n- 尝试更具体的描述\n- 或者换个问题试试"
        return

    content = context.strip()
    if len(content) > 2000:
        content = content[:2000] + "\n\n[内容较长，已截取最相关部分]"

    # Yield line by line with short delay to simulate streaming
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if line:
            yield line
            await asyncio.sleep(0.02)
        if i < len(lines) - 1:
            yield '\n'


async def _call_llm_stream(context: str, question: str) -> AsyncIterator[str]:
    """
    Call LLM API with streaming support.

    Uses httpx.AsyncClient to stream the response token by token
    from OpenAI-compatible chat completion API.

    Yields:
        Content delta from each streaming chunk
    """
    try:
        import httpx
    except ImportError:
        yield "错误：缺少 httpx 库，请执行 `pip install httpx`"
        return

    messages = _build_prompt(context, question)

    headers = {
        "Authorization": f"Bearer {LLM_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": LLM_MODEL,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": MAX_RESPONSE_TOKENS,
        "stream": True,
    }

    try:
        async with httpx.AsyncClient(timeout=STREAM_TIMEOUT) as client:
            async with client.stream(
                "POST",
                f"{LLM_BASE_URL}/chat/completions",
                headers=headers,
                json=payload,
            ) as response:
                if response.status_code != 200:
                    error_body = await response.aread()
                    error_text = error_body.decode() if error_body else "Unknown error"
                    if response.status_code == 401:
                        yield "LLM API 认证失败，请检查 API Key 配置。"
                    elif response.status_code == 429:
                        yield "请求过于频繁，请稍后重试。"
                    else:
                        yield f"LLM 调用失败 (HTTP {response.status_code})。请稍后重试。"
                    return

                # Parse SSE stream: data: {"choices":[{"delta":{"content":"..."}}]}
                buffer = ""
                async for chunk in response.aiter_text():
                    buffer += chunk
                    while '\n' in buffer:
                        line, buffer = buffer.split('\n', 1)
                        line = line.strip()
                        if not line or not line.startswith('data:'):
                            continue
                        data_str = line[5:].strip()
                        if data_str == '[DONE]':
                            return
                        try:
                            data = json.loads(data_str)
                            delta = data.get("choices", [{}])[0].get("delta", {})
                            content = delta.get("content", "")
                            if content:
                                yield content
                        except json.JSONDecodeError:
                            continue

    except httpx.TimeoutException:
        yield "LLM 调用超时，请稍后重试或检查网络连接。"
    except httpx.ConnectError:
        yield f"无法连接到 LLM API ({LLM_BASE_URL})，请检查网络连接和 API 地址配置。"
    except Exception as e:
        yield f"调用 LLM 时出错: {str(e)}"

        # Fall back to mock for remaining content
        async for chunk in _mock_response_stream(context, question):
            yield chunk
