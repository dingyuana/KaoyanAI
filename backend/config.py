"""Configuration for kaoyan backend."""

import os

# Wiki knowledge base path
WIKI_PATH = "/root/kaoyan/wiki"

# LLM Configuration
LLM_API_KEY = os.getenv("LLM_API_KEY", "")
LLM_BASE_URL = os.getenv("LLM_BASE_URL", "https://api.openai.com/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")

# Available subjects
SUBJECTS = ["math", "english", "politics"]

# Enable mock mode when no API key is provided
MOCK_MODE = not bool(LLM_API_KEY)