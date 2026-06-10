import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

# Use SQLite for tests to avoid asyncpg concurrency issues
os.environ.setdefault("KAOYAN_DB_URL", "sqlite+aiosqlite:///test_kaoyan.db")

import pytest
from fastapi.testclient import TestClient
from database import init_db

from main import app


@pytest.fixture(autouse=True)
async def setup_db():
    await init_db()
    yield
    # Clean up after tests
    from database import engine
    async with engine.begin() as conn:
        from database import Base
        for table in reversed(Base.metadata.sorted_tables):
            await conn.execute(table.delete())


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def sample_context():
    return "极限是微积分中的基础概念。函数f(x)在x→x0时的极限是A，表示当x无限接近x0时，f(x)无限接近A。"
