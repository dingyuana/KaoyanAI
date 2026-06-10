"""Tests for error book endpoints."""

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
USER = {"phone": "13900000200", "password": "test123"}


def _auth():
    r = client.post("/auth/register", json={**USER, "name": "错题测试"})
    return {"Authorization": f"Bearer {r.json()['access_token']}"}


def _create_error(headers):
    """Create a diagnosis with wrong answers to seed error book."""
    start = client.post("/diagnosis/start", json={"subject": "math", "question_count": 2}, headers=headers)
    did = start.json()["diagnosis_id"]
    qs = start.json()["questions"]
    client.post("/diagnosis/submit", json={
        "diagnosis_id": did,
        "answers": [{"question_id": q["id"], "question": q["question"],
                      "user_answer": "B", "correct_answer": "A",
                      "type": "choice", "knowledge_point": q["knowledge_point"]}
                     for q in qs]
    }, headers=headers)


class TestErrorBook:
    def test_list_errors(self):
        headers = _auth()
        _create_error(headers)
        resp = client.get("/error-book/list", headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        assert data[0]["error_type"] == "concept"

    def test_list_requires_auth(self):
        assert client.get("/error-book/list").status_code == 401

    def test_due_today(self):
        headers = _auth()
        _create_error(headers)
        resp = client.get("/error-book/due-today", headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert "count" in data
        assert isinstance(data["errors"], list)

    def test_review_correct(self):
        headers = _auth()
        _create_error(headers)
        errs = client.get("/error-book/list", headers=headers).json()
        eid = errs[0]["id"]

        resp = client.post("/error-book/review", json={"error_id": eid, "is_correct": True}, headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["review_count"] == 1
        assert data["next_review_at"] is not None

    def test_review_wrong(self):
        headers = _auth()
        _create_error(headers)
        errs = client.get("/error-book/list", headers=headers).json()
        eid = errs[0]["id"]

        resp = client.post("/error-book/review", json={"error_id": eid, "is_correct": False}, headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["review_count"] == 0
        assert data["review_interval"] == 1

    def test_review_unknown_error(self):
        headers = _auth()
        resp = client.post("/error-book/review", json={"error_id": 99999, "is_correct": True}, headers=headers)
        assert resp.status_code == 404

    def test_similar_exercises(self):
        headers = _auth()
        _create_error(headers)
        errs = client.get("/error-book/list", headers=headers).json()
        eid = errs[0]["id"]

        resp = client.get(f"/error-book/{eid}/similar", headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert "exercises" in data
        assert isinstance(data["exercises"], list)