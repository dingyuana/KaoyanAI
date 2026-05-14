"""Logging configuration for kaoyan backend."""

import logging
import sys

_logger: logging.Logger | None = None


def get_logger() -> logging.Logger:
    """Get the application logger (singleton)."""
    global _logger
    if _logger is not None:
        return _logger

    logger = logging.getLogger("kaoyan")
    logger.setLevel(logging.INFO)

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        logging.Formatter(
            "%(asctime)s | %(levelname)s | %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
    )
    logger.handlers.clear()
    logger.addHandler(handler)

    _logger = logger
    return logger
