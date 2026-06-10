"""Statistics and visualization data for capability dashboard."""

from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from auth import get_current_user
from database import get_session, User, Diagnosis, ErrorBook, Plan, PlanTask

router = APIRouter(prefix="/stats", tags=["stats"])


@router.get("/dashboard")
async def get_dashboard(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    # Total diagnoses
    diag_result = await session.execute(
        select(func.count(), func.avg(Diagnosis.score)).where(Diagnosis.user_id == user.id)
    )
    diag_count, avg_score = diag_result.one()
    avg_score = round(avg_score or 0, 1)

    # Error book stats
    err_result = await session.execute(
        select(func.count()).where(ErrorBook.user_id == user.id)
    )
    total_errors = err_result.scalar() or 0

    mastered_result = await session.execute(
        select(func.count()).where(and_(ErrorBook.user_id == user.id, ErrorBook.is_mastered == True))
    )
    mastered = mastered_result.scalar() or 0

    # Plan stats
    plan_result = await session.execute(
        select(func.count()).where(and_(Plan.user_id == user.id, Plan.is_active == True))
    )
    active_plans = plan_result.scalar() or 0

    # Today's tasks
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timedelta(days=1)
    today_tasks = await session.execute(
        select(func.count()).select_from(PlanTask).join(Plan).where(
            and_(
                Plan.user_id == user.id,
                Plan.is_active == True,
                PlanTask.scheduled_date >= today_start,
                PlanTask.scheduled_date < today_end,
                PlanTask.is_completed == False,
            )
        )
    )

    return {
        "diagnosis_count": diag_count or 0,
        "avg_score": avg_score,
        "total_errors": total_errors,
        "mastered_errors": mastered,
        "mastery_rate": round(mastered / max(total_errors, 1) * 100, 1),
        "active_plans": active_plans,
        "pending_today": today_tasks.scalar() or 0,
    }


@router.get("/radar")
async def get_radar_data(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
    subject: str = "math",
):
    """Get knowledge radar data: accuracy by chapter for a subject."""
    diagnoses = await session.execute(
        select(Diagnosis).where(
            and_(Diagnosis.user_id == user.id, Diagnosis.subject == subject)
        ).order_by(Diagnosis.created_at.desc()).limit(5)
    )

    chapter_scores: dict[str, list[float]] = {}
    for d in diagnoses.scalars().all():
        if d.weak_points:
            for wp in d.weak_points:
                ch = wp.get("chapter", wp.get("knowledge_point", "其他"))
                rate = wp.get("rate", wp.get("correct", 0) / max(wp.get("total", 1), 1) * 100)
                if ch not in chapter_scores:
                    chapter_scores[ch] = []
                chapter_scores[ch].append(rate)

    # Pick best 6 chapters for radar
    chapters = sorted(chapter_scores.keys(), key=lambda ch: -sum(chapter_scores[ch]) / len(chapter_scores[ch]))
    chapters = chapters[:6]

    return {
        "subject": subject,
        "chapters": chapters,
        "scores": [round(sum(chapter_scores[ch]) / len(chapter_scores[ch]), 1) for ch in chapters],
    }


@router.get("/trend")
async def get_trend_data(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
    subject: str = "math",
):
    """Get score trend over time for a subject."""
    diagnoses = await session.execute(
        select(Diagnosis).where(
            and_(Diagnosis.user_id == user.id, Diagnosis.subject == subject)
        ).order_by(Diagnosis.created_at.asc()).limit(30)
    )

    points = []
    for d in diagnoses.scalars().all():
        points.append({
            "date": d.created_at.strftime("%m-%d"),
            "score": d.score,
            "correct": d.correct_questions,
            "total": d.total_questions,
        })

    return {
        "subject": subject,
        "points": points,
    }
