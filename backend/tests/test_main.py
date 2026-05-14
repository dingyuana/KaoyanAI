"""Tests for FastAPI endpoints in main.py."""

import json


class TestHealth:
    def test_health_returns_ok(self, client):
        resp = client.get("/health")
        assert resp.status_code == 200
        assert resp.json() == {"status": "ok"}


class TestSubjects:
    def test_subjects_returns_list(self, client):
        resp = client.get("/subjects")
        assert resp.status_code == 200
        data = resp.json()
        assert "subjects" in data
        assert data["count"] >= 1
        assert "math" in data["subjects"]


class TestConcepts:
    def test_concepts_math_ok(self, client):
        resp = client.get("/concepts/math")
        assert resp.status_code == 200
        data = resp.json()
        assert "groups" in data
        assert data["count"] >= 0

    def test_concepts_unknown_returns_404(self, client):
        resp = client.get("/concepts/nonexistent")
        assert resp.status_code == 404


class TestChat:
    def test_chat_empty_message_returns_400(self, client):
        resp = client.post("/chat", json={"message": ""})
        assert resp.status_code == 400

    def test_chat_valid_message_returns_answer(self, client):
        resp = client.post("/chat", json={"message": "什么是极限？"})
        assert resp.status_code == 200
        data = resp.json()
        assert "answer" in data
        assert "sources" in data

    def test_chat_stream_returns_sse(self, client):
        resp = client.post("/chat/stream", json={"message": "什么是导数？"})
        assert resp.status_code == 200
        assert resp.headers["content-type"].startswith("text/event-stream")
        body = resp.read()
        assert b"data:" in body


class TestConceptDetail:
    def test_concept_detail_exists(self, client):
        resp = client.get("/concepts/math/L3-math-concept-函数极限")
        assert resp.status_code == 200
        data = resp.json()
        assert "content" in data
        assert "title" in data

    def test_concept_detail_not_found(self, client):
        resp = client.get("/concepts/math/nonexistent-concept")
        assert resp.status_code == 400


class TestRoot:
    def test_root_returns_info(self, client):
        resp = client.get("/")
        assert resp.status_code == 200
        data = resp.json()
        assert "endpoints" in data
