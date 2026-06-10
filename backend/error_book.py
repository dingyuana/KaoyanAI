"""Error book management: list, review scheduling, similar recommendations."""

from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_

from auth import get_current_user
from database import get_session, User, ErrorBook
from wiki_retriever import get_related_exercises

router = APIRouter(prefix="/error-book", tags=["error-book"])

EBINGHAUS_INTERVALS = [1, 2, 4, 7, 15]


class ReviewRequest(BaseModel):
    error_id: int
    is_correct: bool


@router.get("/list")
async def list_errors(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
    subject: str = "",
    error_type: str = "",
    mastered: bool | None = None,
):
    stmt = select(ErrorBook).where(ErrorBook.user_id == user.id)
    if subject:
        stmt = stmt.where(ErrorBook.knowledge_point == subject)
    if error_type:
        stmt = stmt.where(ErrorBook.error_type == error_type)
    if mastered is not None:
        stmt = stmt.where(ErrorBook.is_mastered == mastered)
    stmt = stmt.order_by(ErrorBook.next_review_at.asc().nulls_last(), ErrorBook.created_at.desc()).limit(100)

    result = await session.execute(stmt)
    return [
        {
            "id": e.id,
            "question_text": e.question_text[:200],
            "user_answer": e.user_answer[:200],
            "correct_answer": e.correct_answer[:200],
            "analysis": e.analysis[:200],
            "knowledge_point": e.knowledge_point,
            "error_type": e.error_type,
            "review_interval": e.review_interval,
            "review_count": e.review_count,
            "next_review_at": e.next_review_at.isoformat() if e.next_review_at else None,
            "is_mastered": e.is_mastered,
            "created_at": e.created_at.isoformat(),
        }
        for e in result.scalars().all()
    ]


@router.get("/due-today")
async def get_due_errors(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    now = datetime.utcnow()
    stmt = select(ErrorBook).where(
        and_(
            ErrorBook.user_id == user.id,
            ErrorBook.is_mastered == False,
            ErrorBook.next_review_at <= now,
        )
    ).order_by(ErrorBook.next_review_at.asc()).limit(50)

    result = await session.execute(stmt)
    errors = result.scalars().all()
    return {
        "count": len(errors),
        "errors": [{"id": e.id, "question_text": e.question_text[:200], "knowledge_point": e.knowledge_point, "error_type": e.error_type} for e in errors],
    }


@router.post("/review")
async def review_error(
    req: ReviewRequest,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    error = await session.get(ErrorBook, req.error_id)
    if not error or error.user_id != user.id:
        raise HTTPException(status_code=404, detail="错题记录不存在")

    if req.is_correct:
        error.review_count += 1
        next_interval_idx = min(error.review_count, len(EBINGHAUS_INTERVALS) - 1)
        error.review_interval = EBINGHAUS_INTERVALS[next_interval_idx]
        error.next_review_at = datetime.utcnow() + timedelta(days=error.review_interval)

        if error.review_count >= 3:
            error.is_mastered = True
            error.next_review_at = None
    else:
        error.review_count = 0
        error.review_interval = 1
        error.next_review_at = datetime.utcnow() + timedelta(days=1)

    await session.commit()
    return {
        "id": error.id,
        "review_count": error.review_count,
        "review_interval": error.review_interval,
        "next_review_at": error.next_review_at.isoformat() if error.next_review_at else None,
        "is_mastered": error.is_mastered,
    }


@router.get("/{error_id}/similar")
async def get_similar_exercises(
    error_id: int,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    error = await session.get(ErrorBook, error_id)
    if not error or error.user_id != user.id:
        raise HTTPException(status_code=404, detail="错题记录不存在")

    if not error.knowledge_point:
        return {"count": 0, "exercises": []}

    # Search across all subjects for related exercises
    exercises = get_related_exercises("math", error.knowledge_point)
    for subj in ["ds", "arch", "net", "os"]:
        ex = get_related_exercises(subj, error.knowledge_point)
        exercises.extend(ex)

    exercises.sort(key=lambda x: -x.get("score", 0))
    top = exercises[:5]

    return {
        "count": len(top),
        "knowledge_point": error.knowledge_point,
        "exercises": [
            {
                "id": e["id"],
                "title": e["title"],
                "difficulty": e.get("difficulty", ""),
                "score": e.get("score", 0),
            }
            for e in top
        ],
    }