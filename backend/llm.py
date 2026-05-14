"""LLM integration for kaoyan backend."""

import os
from typing import Optional

from config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL, MOCK_MODE


def generate_response(context: str, question: str) -> str:
    """
    Generate response using LLM based on context.
    
    Args:
        context: Retrieved knowledge base content
        question: User's question
        
    Returns:
        Generated answer text
    """
    if MOCK_MODE:
        return _mock_response(context, question)
    
    return _call_llm(context, question)


def _mock_response(context: str, question: str) -> str:
    """
    Mock response for MVP when no API key is available.
    """
    if not context:
        return "抱歉，知识库中暂时没有找到相关信息。请尝试更换关键词或稍后再试。"
    # Return first 2000 chars of the cleanest matching content
    return context.strip()[:2000]


def _call_llm(context: str, question: str) -> str:
    """
    Call LLM API with context and question.
    """
    try:
        import httpx
        
        prompt = f"""你是一个考研备考助手，基于以下知识库内容回答用户问题。

知识库内容：
{context}

用户问题：{question}

请基于知识库内容给出准确、详细的回答。如果知识库中没有相关信息，请明确说明。"""
        
        headers = {
            "Authorization": f"Bearer {LLM_API_KEY}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": LLM_MODEL,
            "messages": [
                {"role": "system", "content": "你是一个专业的考研备考助手，基于提供的知识库内容回答问题。"},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 2000
        }
        
        with httpx.Client(timeout=60.0) as client:
            response = client.post(
                f"{LLM_BASE_URL}/chat/completions",
                headers=headers,
                json=payload
            )
            response.raise_for_status()
            result = response.json()
            return result["choices"][0]["message"]["content"]
            
    except Exception as e:
        return f"调用LLM时出错: {str(e)}。请检查API配置或稍后再试。"