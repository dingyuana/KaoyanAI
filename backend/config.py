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

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://kaoyan:kaoyan_dev@localhost:5433/kaoyan")

# JWT
JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# Available subjects — all knowledge base subjects
SUBJECTS = ["math", "english", "politics", "ds", "arch", "net", "os"]

# Enable mock mode when no API key is provided
MOCK_MODE = not bool(LLM_API_KEY)