"""Tests for auth endpoints."""

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
USER = {"phone": "13800000001", "password": "test123", "name": "测试用户"}


class TestRegister:
    def test_success(self):
        resp = client.post("/auth/register", json=USER)
        assert resp.status_code == 200
        data = resp.json()
        assert "access_token" in data
        assert data["user_id"] > 0

    def test_duplicate_phone(self):
        client.post("/auth/register", json=USER)
        resp = client.post("/auth/register", json=USER)
        assert resp.status_code == 400


class TestLogin:
    def test_success(self):
        client.post("/auth/register", json=USER)
        resp = client.post("/auth/login", json=USER)
        assert resp.status_code == 200

    def test_wrong_password(self):
        client.post("/auth/register", json=USER)
        resp = client.post("/auth/login", json={"phone": USER["phone"], "password": "wrong"})
        assert resp.status_code == 401

    def test_nonexistent(self):
        resp = client.post("/auth/login", json={"phone": "13900000000", "password": "test123"})
        assert resp.status_code == 401


class TestMe:
    def test_with_token(self):
        reg = client.post("/auth/register", json=USER)
        token = reg.json()["access_token"]
        resp = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert resp.status_code == 200
        assert resp.json()["phone"] == USER["phone"]

    def test_without_token(self):
        assert client.get("/auth/me").status_code == 401

    def test_invalid_token(self):
        assert client.get("/auth/me", headers={"Authorization": "Bearer bad"}).status_code == 401