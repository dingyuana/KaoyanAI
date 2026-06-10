"""Tests for planner endpoints."""

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
USER = {"phone": "13900000300", "password": "test123"}


def _auth():
    r = client.post("/auth/register", json={**USER, "name": "规划测试"})
    return {"Authorization": f"Bearer {r.json()['access_token']}"}


class TestPlanner:
    def test_generate_plan(self):
        resp = client.post("/plan/generate", json={
            "subject": "math", "target_score": 130, "daily_minutes": 90
        }, headers=_auth())
        assert resp.status_code == 200
        data = resp.json()
        assert "plan_id" in data
        assert data["target_score"] == 130
        assert data["task_count"] > 0

    def test_generate_plan_requires_auth(self):
        assert client.post("/plan/generate", json={}).status_code == 401

    def test_get_active_plan(self):
        headers = _auth()
        client.post("/plan/generate", json={"subject": "math"}, headers=headers)
        resp = client.get("/plan/active", headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data is not None
        assert "tasks" in data
        assert len(data["tasks"]) > 0

    def test_get_active_plan_no_plan(self):
        headers = _auth()
        resp = client.get("/plan/active", headers=headers)
        assert resp.status_code == 200
        assert resp.json() is None

    def test_get_today_tasks(self):
        headers = _auth()
        client.post("/plan/generate", json={"subject": "math", "daily_minutes": 60}, headers=headers)
        resp = client.get("/plan/today", headers=headers)
        assert resp.status_code == 200
        data = resp.json()
        assert "tasks" in data

    def test_update_task_complete(self):
        headers = _auth()
        client.post("/plan/generate", json={"subject": "math"}, headers=headers)
        plan = client.get("/plan/active", headers=headers).json()
        task_id = plan["tasks"][0]["id"]

        resp = client.post("/plan/tasks/update", json={"task_id": task_id, "is_completed": True}, headers=headers)
        assert resp.status_code == 200
        assert resp.json()["is_completed"] is True

    def test_update_task_unknown(self):
        headers = _auth()
        resp = client.post("/plan/tasks/update", json={"task_id": 99999, "is_completed": True}, headers=headers)
        assert resp.status_code == 404