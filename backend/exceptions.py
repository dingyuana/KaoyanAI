"""Custom exception classes for kaoyan backend."""

from typing import Optional


class KaoyanError(Exception):
    """Base exception for all kaoyan backend errors."""

    def __init__(
        self,
        message: str,
        status_code: int = 500,
        detail: Optional[dict] = None,
    ):
        self.message = message
        self.status_code = status_code
        self.detail = detail or {}
        super().__init__(self.message)


class SubjectNotFoundError(KaoyanError):
    """Raised when a requested subject does not exist."""

    def __init__(self, subject: str):
        super().__init__(
            message=f"学科 '{subject}' 不存在",
            status_code=404,
            detail={"subject": subject},
        )


class InvalidInputError(KaoyanError):
    """Raised when user input fails validation."""

    def __init__(self, message: str = "输入无效"):
        super().__init__(message=message, status_code=400)


class LLMServiceError(KaoyanError):
    """Raised when LLM API call fails."""

    def __init__(self, message: str = "AI 服务暂时不可用"):
        super().__init__(message=message, status_code=502)


class RateLimitError(KaoyanError):
    """Raised when rate limit is exceeded."""

    def __init__(self):
        super().__init__(
            message="请求过于频繁，请稍后重试",
            status_code=429,
        )
