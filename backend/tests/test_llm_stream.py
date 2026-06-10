"""Tests for LLM streaming module."""

import asyncio

from llm import generate_response_stream


class TestGenerateResponseStream:
    """Test suite for streaming response generation."""

    def test_stream_returns_chunks(self):
        """Verify streaming returns multiple non-empty chunks in mock mode."""
        context = "极限是微积分的基础概念"
        question = "什么是极限？"

        async def consume():
            chunks = []
            async for chunk in generate_response_stream(context, question):
                chunks.append(chunk)
            return chunks

        chunks = asyncio.run(consume())
        assert len(chunks) > 0, "流式调用应返回至少一个 chunk"
        non_empty_chunks = [c for c in chunks if c and c.strip()]
        assert len(non_empty_chunks) > 0, "至少有一个非空 chunk"

    def test_stream_content_with_context(self):
        """Verify streaming content includes context when provided."""
        context = "极限的定义：函数f(x)在x趋近于x0时，极限为A"
        question = "什么是极限？"

        async def consume():
            full_content = ""
            async for chunk in generate_response_stream(context, question):
                full_content += chunk
            return full_content

        full_content = asyncio.run(consume())
        assert len(full_content) > 0, "完整内容应非空"
        assert "极限" in full_content, "内容应包含上下文中提到的概念"

    def test_stream_without_context(self):
        """Verify streaming handles empty context gracefully."""
        context = ""
        question = "什么是极限？"

        async def consume():
            chunks = []
            async for chunk in generate_response_stream(context, question):
                chunks.append(chunk)
            return chunks

        chunks = asyncio.run(consume())
        assert len(chunks) > 0, "空上下文时仍应返回 chunk（道歉信息）"
        full_content = "".join(chunks)
        assert "抱歉" in full_content or "没有" in full_content or "无法" in full_content, "应返回歉意信息"
