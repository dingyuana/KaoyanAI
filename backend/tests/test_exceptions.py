"""Tests for custom exception classes."""

import pytest
from backend.exceptions import (
    KaoyanError,
    SubjectNotFoundError,
    InvalidInputError,
    LLMServiceError,
    RateLimitError,
)


class TestKaoyanError:
    def test_default_status_code(self):
        err = KaoyanError("test")
        assert err.status_code == 500
        assert err.message == "test"

    def test_custom_status(self):
        err = KaoyanError("not found", status_code=404)
        assert err.status_code == 404


class TestSubjectNotFoundError:
    def test_creates_correctly(self):
        err = SubjectNotFoundError("math")
        assert err.status_code == 404
        assert "math" in str(err.detail.get("subject", ""))


class TestInvalidInputError:
    def test_default_message(self):
        err = InvalidInputError()
        assert err.status_code == 400

    def test_custom_message(self):
        err = InvalidInputError("消息过长")
        assert "过长" in err.message


class TestLLMServiceError:
    def test_status_code(self):
        err = LLMServiceError()
        assert err.status_code == 502


class TestRateLimitError:
    def test_status_code(self):
        err = RateLimitError()
        assert err.status_code == 429
