import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def sample_context():
    return "极限是微积分中的基础概念。函数f(x)在x→x0时的极限是A，表示当x无限接近x0时，f(x)无限接近A。"
