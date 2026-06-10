"""Tests for exam module."""

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
USER = {"phone": "13900000500", "password": "test123"}


def _auth():
    r = client.post("/auth/register", json={**USER, "name": "模考测试"})
    return {"Authorization": f"Bearer {r.json()['access_token']}"}


class TestExam:
    def test_generate_exam(self):
        resp = client.post("/exam/generate", json={
            "subject": "math", "phase": "base", "question_count": 10, "duration_minutes": 30
        }, headers=_auth())
        assert resp.status_code == 200
        data = resp.json()
        assert data["total"] >= 9
        assert len(data["questions"]) == 10

    def test_generate_requires_auth(self):
        assert client.post("/exam/generate", json={}).status_code == 401

    def test_submit_exam(self):
        headers = _auth()
        gen = client.post("/exam/generate", json={"subject": "math", "question_count": 5}, headers=headers).json()
        eid = gen["exam_id"]
        qs = gen["questions"]
        answers = [{"id": q["id"], "question": q["question"], "user_answer": "A",
                     "correct_answer": "A", "type": "choice", "chapter": q.get("chapter", "其他")} for q in qs]
        resp = client.post("/exam/submit", json={"exam_id": eid, "answers": answers}, headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["score"] == 100.0
        assert "chapter_stats" in data

    def test_exam_history(self):
        headers = _auth()
        client.post("/exam/generate", json={"subject": "math"}, headers=headers)
        resp = client.get("/exam/history", headers=headers)
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)

    def test_exam_report(self):
        headers = _auth()
        gen = client.post("/exam/generate", json={"subject": "math", "question_count": 3}, headers=headers).json()
        eid = gen["exam_id"]
        qs = gen["questions"]
        answers = [{"id": q["id"], "question": q["question"], "user_answer": "A",
                     "correct_answer": "A", "type": "choice", "chapter": q.get("chapter", "其他")} for q in qs]
        client.post("/exam/submit", json={"exam_id": eid, "answers": answers}, headers=headers)
        resp = client.get(f"/exam/{eid}/report", headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["id"] == eid