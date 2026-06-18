"""Tests for LLM streaming module."""

import asyncio
from unittest.mock import patch

from llm import generate_response_stream


class TestGenerateResponseStream:

    @patch('llm.MOCK_MODE', True)
    def test_stream_returns_chunks(self):
        context = "极限是微积分的基础概念"
        question = "什么是极限？"

        async def consume():
            chunks = []
            async for chunk in generate_response_stream(context, question):
                chunks.append(chunk)
            return chunks

        chunks = asyncio.run(consume())
        assert len(chunks) > 0
        non_empty_chunks = [c for c in chunks if c and c.strip()]
        assert len(non_empty_chunks) > 0

    @patch('llm.MOCK_MODE', True)
    def test_stream_content_with_context(self):
        context = "极限的定义：函数f(x)在x趋近于x0时，极限为A"
        question = "什么是极限？"

        async def consume():
            full_content = ""
            async for chunk in generate_response_stream(context, question):
                full_content += chunk
            return full_content

        full_content = asyncio.run(consume())
        assert len(full_content) > 0
        assert "极限" in full_content

    @patch('llm.MOCK_MODE', True)
    def test_stream_without_context(self):
        context = ""
        question = "什么是极限？"

        async def consume():
            chunks = []
            async for chunk in generate_response_stream(context, question):
                chunks.append(chunk)
            return chunks

        chunks = asyncio.run(consume())
        assert len(chunks) > 0
