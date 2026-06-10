"""Tests for guided AI tutoring endpoints."""

from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app

client = TestClient(app)
USER = {"phone": "13900000400", "password": "test123"}


def _auth():
    r = client.post("/auth/register", json={**USER, "name": "辅导测试"})
    return {"Authorization": f"Bearer {r.json()['access_token']}"}


class TestTutor:
    @patch('tutor.MOCK_MODE', True)
    def test_tutor_hint_mode(self):
        resp = client.post("/tutor/chat", json={
            "question": "什么是极限？",
            "subject": "math",
            "show_solution": False,
        })
        assert resp.status_code == 200
        data = resp.json()
        assert "answer" in data
        assert data["is_hint"] is True

    @patch('tutor.MOCK_MODE', True)
    def test_tutor_solution_mode(self):
        resp = client.post("/tutor/chat", json={
            "question": "如何求极限？",
            "subject": "math",
            "show_solution": True,
        })
        assert resp.status_code == 200
        data = resp.json()
        assert "answer" in data
        assert data["is_hint"] is False

    @patch('tutor.MOCK_MODE', True)
    def test_tutor_with_conversation_history(self):
        resp = client.post("/tutor/chat", json={
            "question": "导数怎么求？",
            "subject": "math",
            "show_solution": False,
            "conversation_history": [
                {"role": "user", "content": "什么是导数？"},
                {"role": "assistant", "content": "导数是函数的变化率。"},
            ],
        })
        assert resp.status_code == 200

    @patch('tutor.MOCK_MODE', True)
    def test_tutor_auth_user_gets_context(self):
        headers = _auth()
        resp = client.post("/tutor/chat", json={
            "question": "什么是函数极限？",
            "subject": "math",
        }, headers=headers)
        assert resp.status_code == 200

    @patch('tutor.MOCK_MODE', True)
    def test_tutor_returns_sources(self):
        resp = client.post("/tutor/chat", json={
            "question": "什么是极限？",
            "subject": "math",
        })
        assert resp.status_code == 200
        data = resp.json()
        assert "sources" in data