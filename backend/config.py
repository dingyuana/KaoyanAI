"""Configuration for kaoyan backend."""

import os
from pathlib import Path

# Load .env file if present
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent / '.env'
    if env_path.exists():
        load_dotenv(env_path)
except ImportError:
    pass

# Wiki knowledge base path
WIKI_PATH = "/root/kaoyan/wiki"

# LLM Configuration
LLM_API_KEY = os.getenv("LLM_API_KEY", "")
LLM_BASE_URL = os.getenv("LLM_BASE_URL", "https://api.openai.com/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")

# Available subjects — all knowledge base subjects
SUBJECTS = ["math", "english", "politics", "ds", "arch", "net", "os"]

# Enable mock mode when no API key is provided
MOCK_MODE = not bool(LLM_API_KEY)