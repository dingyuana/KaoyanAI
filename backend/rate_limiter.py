"""Simple in-memory rate limiter for kaoyan backend."""

import time
from collections import defaultdict
from typing import Optional

from exceptions import RateLimitError

# Max requests per window per client (by IP)
MAX_REQUESTS = 60
WINDOW_SECONDS = 60


class RateLimiter:
    """Sliding-window rate limiter using in-memory counters."""

    def __init__(self, max_requests: int = MAX_REQUESTS, window: int = WINDOW_SECONDS):
        self.max_requests = max_requests
        self.window = window
        self._clients: dict[str, list[float]] = defaultdict(list)

    def check(self, client_id: str) -> None:
        """
        Check if client_id has exceeded rate limit.
        Raises RateLimitError if limit exceeded.
        """
        now = time.time()
        cutoff = now - self.window

        timestamps = self._clients[client_id]
        timestamps[:] = [t for t in timestamps if t > cutoff]

        if len(timestamps) >= self.max_requests:
            raise RateLimitError()

        timestamps.append(now)

    def get_remaining(self, client_id: str) -> int:
        """Get remaining requests for current window."""
        now = time.time()
        cutoff = now - self.window
        timestamps = [t for t in self._clients[client_id] if t > cutoff]
        return max(0, self.max_requests - len(timestamps))


rate_limiter = RateLimiter()
