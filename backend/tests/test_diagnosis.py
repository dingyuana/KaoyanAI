"""Tests for diagnosis endpoints."""

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
USER = {"phone": "13900000100", "password": "test123"}


def _auth_header():
    resp = client.post("/auth/register", json={**USER, "name": "诊断测试"})
    return {"Authorization": f"Bearer {resp.json()['access_token']}"}


class TestDiagnosis:
    def test_start_diagnosis(self):
        resp = client.post("/diagnosis/start", json={"subject": "math", "question_count": 5}, headers=_auth_header())
        assert resp.status_code == 200
        data = resp.json()
        assert "diagnosis_id" in data
        assert data["total"] == 5
        assert len(data["questions"]) == 5

    def test_start_diagnosis_requires_auth(self):
        resp = client.post("/diagnosis/start", json={"subject": "math"})
        assert resp.status_code == 401

    def test_submit_diagnosis(self):
        headers = _auth_header()
        start = client.post("/diagnosis/start", json={"subject": "math", "question_count": 3}, headers=headers)
        diag_id = start.json()["diagnosis_id"]
        questions = start.json()["questions"]

        answers = [
            {"question_id": q["id"], "question": q["question"], "user_answer": "A",
             "correct_answer": "A", "type": "choice", "knowledge_point": q["knowledge_point"]}
            for q in questions
        ]
        resp = client.post("/diagnosis/submit", json={"diagnosis_id": diag_id, "answers": answers}, headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["score"] == 100.0
        assert data["correct"] == 3
        assert "report" in data

    def test_submit_diagnosis_wrong_answers(self):
        headers = _auth_header()
        start = client.post("/diagnosis/start", json={"subject": "math", "question_count": 3}, headers=headers)
        diag_id = start.json()["diagnosis_id"]
        questions = start.json()["questions"]

        answers = [
            {"question_id": q["id"], "question": q["question"], "user_answer": "B",
             "correct_answer": "A", "type": "choice", "knowledge_point": q["knowledge_point"]}
            for q in questions
        ]
        resp = client.post("/diagnosis/submit", json={"diagnosis_id": diag_id, "answers": answers}, headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["score"] == 0.0
        assert data["correct"] == 0
        assert len(data["weak_points"]) == 3

    def test_submit_other_users_diagnosis_fails(self):
        headers1 = _auth_header()
        # Register a second user
        client.post("/auth/register", json={"phone": "13900000101", "password": "test123", "name": "其他用户"})
        headers2 = {"Authorization": f"Bearer {client.post('/auth/login', json={'phone': '13900000101', 'password': 'test123'}).json()['access_token']}"}

        start = client.post("/diagnosis/start", json={"subject": "math", "question_count": 3}, headers=headers1)
        diag_id = start.json()["diagnosis_id"]

        resp = client.post("/diagnosis/submit", json={"diagnosis_id": diag_id, "answers": []}, headers=headers2)
        assert resp.status_code == 404

    def test_diagnosis_history(self):
        headers = _auth_header()
        client.post("/diagnosis/start", json={"subject": "math"}, headers=headers)
        resp = client.get("/diagnosis/history", headers=headers)
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)