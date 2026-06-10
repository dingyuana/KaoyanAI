"""Tests for LLM module."""

import pytest
from llm import _mock_response, generate_response, estimate_tokens, trim_context


class TestEstimateTokens:
    def test_empty_string(self):
        assert estimate_tokens("") == 0

    def test_chinese_text(self):
        n = estimate_tokens("极限是微积分的基础概念")
        assert n > 0

    def test_english_text(self):
        n = estimate_tokens("hello world")
        assert n > 0


class TestTrimContext:
    def test_short_context_not_trimmed(self):
        text = "短文本"
        result = trim_context(text, max_tokens=100)
        assert result == text

    def test_long_context_trimmed(self):
        text = "内容。" * 5000
        result = trim_context(text, max_tokens=100)
        assert len(result) < len(text)
        assert "截断" in result


class TestMockResponse:
    def test_with_context(self):
        result = _mock_response("极限的定义是重要概念", "什么是极限？")
        assert len(result) > 0
        assert "极限" in result

    def test_without_context(self):
        result = _mock_response("", "什么是极限？")
        assert "抱歉" in result or "没有" in result

    def test_respects_length_limit(self):
        long = "内容。" * 2000
        result = _mock_response(long, "测试")
        assert len(result) <= 2100


class TestGenerateResponse:
    def test_returns_string(self):
        result = generate_response("测试内容", "测试问题")
        assert isinstance(result, str)
        assert len(result) > 0
