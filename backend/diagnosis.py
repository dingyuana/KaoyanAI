"""Learning diagnosis module: test generation, grading, weak point analysis."""

import re
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from auth import get_current_user
from database import get_session, User, Diagnosis, ErrorBook
from wiki_retriever import list_concepts, retrieve_knowledge
from llm import generate_response

router = APIRouter(prefix="/diagnosis", tags=["diagnosis"])


class DiagnosisStartRequest(BaseModel):
    subject: str = "math"
    question_count: int = 10


class AnswerSubmission(BaseModel):
    diagnosis_id: int
    answers: list[dict]  # [{question_id, question, user_answer, correct_answer, type}]


class DiagnosisListRequest(BaseModel):
    subject: str = "math"


def _generate_questions(subject: str, count: int) -> list[dict]:
    concepts = list_concepts(subject)
    if not concepts:
        return _fallback_questions(subject, count)

    questions = []
    for i, c in enumerate(concepts[:count]):
        questions.append({
            "id": f"q_{i+1}",
            "type": "choice" if i % 3 != 0 else "fill",
            "question": f"请简述「{c['title']}」的核心概念。（难度：根据知识掌握情况自评）",
            "knowledge_point": c["title"],
            "options": [] if i % 3 == 0 else [
                f"A. {c['title']}是{'数学分析' if '数学' in subject else '该学科'}的基础概念之一",
                f"B. {c['title']}与考试无关",
                f"C. 我不确定{c['title']}的定义",
                f"D. 以上都不对",
            ],
        })
    return questions


def _fallback_questions(subject: str, count: int) -> list[dict]:
    topics = {
        "math": ["极限", "导数", "积分", "线性代数", "概率"],
        "ds": ["线性表", "栈与队列", "二叉树", "排序", "查找"],
        "arch": ["数据的表示", "存储系统", "指令系统", "CPU", "IO"],
        "net": ["TCP/IP", "路由", "传输层", "应用层", "网络安全"],
        "os": ["进程管理", "内存管理", "文件系统", "IO管理", "死锁"],
    }
    topics_list = topics.get(subject, ["基础概念"])
    return [
        {
            "id": f"q_{i+1}",
            "type": "choice",
            "question": f"关于「{t}」的正确描述是：",
            "knowledge_point": t,
            "options": [
                f"A. {t}是{subject}学科的核心知识点",
                f"B. {t}与考研无关",
                f"C. 我对{t}不太了解",
                f"D. 以上都不对",
            ],
        }
        for i, t in enumerate(topics_list[:count])
    ]


@router.post("/start")
async def start_diagnosis(
    req: DiagnosisStartRequest,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    questions = _generate_questions(req.subject, req.question_count)
    diagnosis = Diagnosis(
        user_id=user.id,
        subject=req.subject,
        total_questions=len(questions),
    )
    session.add(diagnosis)
    await session.commit()
    await session.refresh(diagnosis)
    return {
        "diagnosis_id": diagnosis.id,
        "subject": req.subject,
        "questions": questions,
        "total": len(questions),
    }


@router.post("/submit")
async def submit_diagnosis(
    req: AnswerSubmission,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    diagnosis = await session.get(Diagnosis, req.diagnosis_id)
    if not diagnosis or diagnosis.user_id != user.id:
        raise HTTPException(status_code=404, detail="诊断记录不存在")

    correct = 0
    weak_points_map: dict[str, dict] = {}

    for ans in req.answers:
        qtype = ans.get("type", "choice")
        user_ans = ans.get("user_answer", "").strip()
        correct_ans = ans.get("correct_answer", "").strip()
        knowledge_point = ans.get("knowledge_point", "")

        is_correct = _grade_answer(qtype, user_ans, correct_ans)
        if is_correct:
            correct += 1
        elif knowledge_point:
            error_type = _classify_error(qtype, user_ans, correct_ans, knowledge_point)
            if knowledge_point not in weak_points_map:
                weak_points_map[knowledge_point] = {"count": 0, "types": set()}
            weak_points_map[knowledge_point]["count"] += 1
            weak_points_map[knowledge_point]["types"].add(error_type)

            error_book = ErrorBook(
                user_id=user.id,
                question_text=ans.get("question", ""),
                user_answer=user_ans,
                correct_answer=correct_ans,
                knowledge_point=knowledge_point,
                error_type=error_type,
                review_interval=1,
                next_review_at=datetime.utcnow(),
            )
            session.add(error_book)

    weak_points = [
        {"knowledge_point": kp, "count": v["count"], "error_types": list(v["types"])}
        for kp, v in weak_points_map.items()
    ]

    score = round(correct / len(req.answers) * 100, 1) if req.answers else 0
    report = _generate_report(req.answers, weak_points, score)

    diagnosis.score = score
    diagnosis.correct_questions = correct
    diagnosis.weak_points = weak_points
    diagnosis.report_text = report
    await session.commit()

    return {
        "diagnosis_id": diagnosis.id,
        "score": score,
        "correct": correct,
        "total": len(req.answers),
        "weak_points": weak_points,
        "report": report,
    }


@router.get("/history")
async def list_diagnoses(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(Diagnosis).where(Diagnosis.user_id == user.id).order_by(Diagnosis.created_at.desc()).limit(20)
    )
    return [
        {
            "id": d.id,
            "subject": d.subject,
            "score": d.score,
            "total": d.total_questions,
            "correct": d.correct_questions,
            "weak_points": d.weak_points,
            "created_at": d.created_at.isoformat(),
        }
        for d in result.scalars().all()
    ]


def _grade_answer(qtype: str, user_answer: str, correct_answer: str) -> bool:
    if qtype == "choice":
        return user_answer.upper() == correct_answer.upper()
    return _llm_grade(user_answer, correct_answer)


def _llm_grade(user_answer: str, correct_answer: str) -> bool:
    if not user_answer or not correct_answer:
        return False
    user_lower = user_answer.lower().strip()
    correct_lower = correct_answer.lower().strip()
    # Simple keyword-based fallback grading
    common = set(user_lower.split()) & set(correct_lower.split())
    return len(common) >= 2 or user_lower == correct_lower


def _classify_error(qtype: str, user_answer: str, correct_answer: str, knowledge_point: str) -> str:
    if not user_answer:
        return "comprehension"
    user_lower = user_answer.lower().strip()
    correct_lower = correct_answer.lower().strip()
    if len(user_lower) < 3 and len(correct_lower) > 10:
        return "comprehension"
    common = set(user_lower.split()) & set(correct_lower.split())
    ratio = len(common) / max(len(set(correct_lower.split())), 1)
    if ratio > 0.5:
        return "calculation"
    return "concept"


def _generate_report(answers: list[dict], weak_points: list[dict], score: float) -> str:
    lines = ["## 诊断报告\n"]
    if score >= 80:
        lines.append(f"总体评价：优秀（{score}分）。知识掌握扎实，建议保持当前学习节奏。\n")
    elif score >= 60:
        lines.append(f"总体评价：良好（{score}分）。有提升空间，建议针对薄弱点重点突破。\n")
    else:
        lines.append(f"总体评价：需要加强（{score}分）。建议系统梳理基础知识。\n")

    if weak_points:
        lines.append("### 薄弱环节\n")
        for wp in weak_points:
            lines.append(f"- **{wp['knowledge_point']}**：{wp['count']}次错误")
            error_types = "、".join(wp.get("error_types", []))
            if error_types:
                lines.append(f"  - 错误类型：{error_types}")
        lines.append("")

    lines.append("### 建议\n")
    if score < 60:
        lines.append("1. 建议从基础概念开始系统复习\n")
        lines.append("2. 配合知识库中的概念文档逐章学习\n")
    elif score < 80:
        lines.append("1. 针对薄弱知识点进行专项练习\n")
        lines.append("2. 使用错题本功能巩固易错点\n")
    else:
        lines.append("1. 进行综合性练习，提升解题速度\n")
        lines.append("2. 尝试更高难度的题目\n")

    return "\n".join(lines)