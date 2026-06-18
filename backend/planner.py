"""Personalized learning plan: generation, dynamic adjustment, task management."""

from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, delete, func

from auth import get_current_user, get_optional_user
from database import get_session, User, Plan, PlanTask, Diagnosis
from wiki_retriever import list_concepts

router = APIRouter(prefix="/plan", tags=["plan"])

PHASES = {"base": "基础阶段", "强化": "强化阶段", "冲刺": "冲刺阶段"}
WEEKDAY_NAMES = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]


class GeneratePlanRequest(BaseModel):
    subject: str = "math"
    target_score: int = 120
    daily_minutes: int = 120
    exam_date: str = ""  # ISO date, optional


class UpdateTaskRequest(BaseModel):
    task_id: int
    is_completed: bool


def _build_plan_tasks(subject: str, phase: str, daily_minutes: int) -> list[dict]:
    concepts = list_concepts(subject)
    if not concepts:
        concepts = [{"title": "基础概念", "id": "basic", "type": "concept", "tags": []}]

    daily_task_count = max(1, daily_minutes // 30)
    tasks = []
    for i, c in enumerate(concepts):
        task_type = "study"
        if c.get("type") == "exercise":
            task_type = "practice"
        elif c.get("type") == "method":
            task_type = "study"

        tasks.append({
            "task_type": task_type,
            "knowledge_point": c["title"],
            "wiki_page_slug": c.get("id", ""),
            "estimated_minutes": 30,
            "scheduled_date": datetime.utcnow() + timedelta(days=i // daily_task_count),
        })
    return tasks[:50]


@router.post("/generate")
async def generate_plan(
    req: GeneratePlanRequest,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    # Deactivate existing active plans
    existing = await session.execute(
        select(Plan).where(and_(Plan.user_id == user.id, Plan.is_active == True))
    )
    for p in existing.scalars().all():
        p.is_active = False

    # Determine phase from latest diagnosis
    last_diag = await session.execute(
        select(Diagnosis).where(
            and_(Diagnosis.user_id == user.id, Diagnosis.subject == req.subject)
        ).order_by(Diagnosis.created_at.desc()).limit(1)
    )
    last = last_diag.scalar_one_or_none()
    phase = "base"
    if last and last.score >= 80:
        phase = "冲刺"
    elif last and last.score >= 60:
        phase = "强化"

    plan = Plan(
        user_id=user.id,
        subject=req.subject,
        phase=phase,
        target_score=req.target_score,
        daily_minutes=req.daily_minutes,
        is_active=True,
    )
    session.add(plan)
    await session.flush()

    tasks_data = _build_plan_tasks(req.subject, phase, req.daily_minutes)
    for t in tasks_data:
        task = PlanTask(plan_id=plan.id, **t)
        session.add(task)

    await session.commit()
    return {
        "plan_id": plan.id,
        "subject": req.subject,
        "phase": phase,
        "phase_name": PHASES.get(phase, phase),
        "target_score": req.target_score,
        "daily_minutes": req.daily_minutes,
        "task_count": len(tasks_data),
    }


@router.get("/active")
async def get_active_plan(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(Plan).where(and_(Plan.user_id == user.id, Plan.is_active == True))
    )
    plan = result.scalar_one_or_none()
    if not plan:
        return None

    tasks_result = await session.execute(
        select(PlanTask).where(PlanTask.plan_id == plan.id).order_by(PlanTask.scheduled_date.asc())
    )
    tasks = tasks_result.scalars().all()

    return {
        "plan_id": plan.id,
        "subject": plan.subject,
        "phase": plan.phase,
        "target_score": plan.target_score,
        "daily_minutes": plan.daily_minutes,
        "created_at": plan.created_at.isoformat(),
        "tasks": [
            {
                "id": t.id,
                "task_type": t.task_type,
                "knowledge_point": t.knowledge_point,
                "estimated_minutes": t.estimated_minutes,
                "is_completed": t.is_completed,
                "scheduled_date": t.scheduled_date.isoformat() if t.scheduled_date else None,
            }
            for t in tasks
        ],
        "progress": sum(1 for t in tasks if t.is_completed) / max(len(tasks), 1) * 100,
    }


@router.get("/today")
async def get_today_tasks(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timedelta(days=1)

    result = await session.execute(
        select(PlanTask).join(Plan).where(
            and_(
                Plan.user_id == user.id,
                Plan.is_active == True,
                PlanTask.is_completed == False,
                PlanTask.scheduled_date >= today_start,
                PlanTask.scheduled_date < today_end,
            )
        ).order_by(PlanTask.scheduled_date.asc())
    )
    tasks = result.scalars().all()

    return {
        "date": today_start.date().isoformat(),
        "count": len(tasks),
        "total_minutes": sum(t.estimated_minutes for t in tasks),
        "tasks": [
            {
                "id": t.id,
                "task_type": t.task_type,
                "knowledge_point": t.knowledge_point,
                "estimated_minutes": t.estimated_minutes,
            }
            for t in tasks
        ],
    }


@router.post("/tasks/update")
async def update_task(
    req: UpdateTaskRequest,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    task = await session.get(PlanTask, req.task_id)
    if not task:
        raise HTTPException(status_code=404, detail="任务不存在")

    plan = await session.get(Plan, task.plan_id)
    if not plan or plan.user_id != user.id:
        raise HTTPException(status_code=404, detail="任务不存在")

    task.is_completed = req.is_completed
    if req.is_completed:
        task.completed_at = datetime.utcnow()
    else:
        task.completed_at = None

    await session.commit()
    return {"id": task.id, "is_completed": task.is_completed}


@router.get("/summary")
async def get_plan_summary(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Aggregated day/week/month plan summary for home-page widget.

    Returns: today tasks, 7-day week grid, month progress, phase info.
    If no active plan: returns has_plan=False with onboarding hint.
    """
    plan_result = await session.execute(
        select(Plan).where(and_(Plan.user_id == user.id, Plan.is_active == True))
    )
    plan = plan_result.scalar_one_or_none()

    if not plan:
        return {
            "has_plan": False,
            "hint": "生成专属学习计划，让每日复习有节奏",
        }

    now = datetime.utcnow()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timedelta(days=1)
    week_start = today_start - timedelta(days=today_start.weekday())  # 周一首日
    week_end = week_start + timedelta(days=7)
    month_start = today_start.replace(day=1)
    next_month_start = (month_start + timedelta(days=32)).replace(day=1)

    all_tasks_result = await session.execute(
        select(PlanTask).where(PlanTask.plan_id == plan.id).order_by(PlanTask.scheduled_date.asc())
    )
    all_tasks = all_tasks_result.scalars().all()

    today_tasks = [t for t in all_tasks if t.scheduled_date and today_start <= t.scheduled_date < today_end]
    today_pending = [t for t in today_tasks if not t.is_completed]
    today_done = [t for t in today_tasks if t.is_completed]

    week_tasks = [t for t in all_tasks if t.scheduled_date and week_start <= t.scheduled_date < week_end]
    month_tasks = [t for t in all_tasks if t.scheduled_date and month_start <= t.scheduled_date < next_month_start]

    week_grid = []
    for i in range(7):
        day = week_start + timedelta(days=i)
        day_end = day + timedelta(days=1)
        day_tasks = [t for t in all_tasks if t.scheduled_date and day <= t.scheduled_date < day_end]
        day_done = sum(1 for t in day_tasks if t.is_completed)
        week_grid.append({
            "date": day.date().isoformat(),
            "weekday": WEEKDAY_NAMES[i],
            "is_today": day.date() == today_start.date(),
            "total": len(day_tasks),
            "completed": day_done,
            "minutes": sum(t.estimated_minutes for t in day_tasks),
        })

    total_completed = sum(1 for t in all_tasks if t.is_completed)

    return {
        "has_plan": True,
        "plan_id": plan.id,
        "subject": plan.subject,
        "phase": plan.phase,
        "phase_name": PHASES.get(plan.phase, plan.phase),
        "target_score": plan.target_score,
        "daily_minutes": plan.daily_minutes,
        "today": {
            "date": today_start.date().isoformat(),
            "total": len(today_tasks),
            "completed": len(today_done),
            "pending": len(today_pending),
            "minutes": sum(t.estimated_minutes for t in today_tasks),
            "tasks": [
                {
                    "id": t.id,
                    "task_type": t.task_type,
                    "knowledge_point": t.knowledge_point,
                    "estimated_minutes": t.estimated_minutes,
                    "is_completed": t.is_completed,
                }
                for t in today_tasks
            ],
        },
        "week": {
            "start": week_start.date().isoformat(),
            "end": (week_end - timedelta(days=1)).date().isoformat(),
            "total": len(week_tasks),
            "completed": sum(1 for t in week_tasks if t.is_completed),
            "minutes": sum(t.estimated_minutes for t in week_tasks),
            "grid": week_grid,
        },
        "month": {
            "start": month_start.date().isoformat(),
            "total": len(month_tasks),
            "completed": sum(1 for t in month_tasks if t.is_completed),
            "minutes": sum(t.estimated_minutes for t in month_tasks),
        },
        "overall": {
            "total": len(all_tasks),
            "completed": total_completed,
            "progress": round(total_completed / max(len(all_tasks), 1) * 100, 1),
        },
    }