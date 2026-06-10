"""Stage testing and mock exam module."""

import random
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_

from auth import get_current_user
from database import get_session, User, Diagnosis
from wiki_retriever import list_concepts, retrieve_knowledge

router = APIRouter(prefix="/exam", tags=["exam"])

SUBJECT_CHAPTERS = {
    "math": ["高等数学", "线性代数", "概率论与数理统计"],
    "ds": ["线性结构", "树形结构", "图结构", "查找", "排序"],
    "arch": ["计算机系统概述", "数据的表示和运算", "存储系统", "指令系统", "中央处理器", "总线", "输入输出系统"],
    "net": ["体系结构", "物理层", "数据链路层", "网络层", "传输层", "应用层"],
    "os": ["计算机系统概述", "进程与线程", "内存管理", "文件管理", "输入输出管理"],
}


class ExamGenerateRequest(BaseModel):
    subject: str = "math"
    phase: str = "base"  # base / 强化 / 冲刺
    question_count: int = 15
    duration_minutes: int = 60


class ExamSubmitRequest(BaseModel):
    exam_id: int
    answers: list[dict]


class ExamRecord(BaseModel):
    id: int
    subject: str
    phase: str
    score: float
    total: int
    correct: int
    duration_minutes: int
    created_at: datetime
    chapters: dict


def _generate_exam_questions(subject: str, phase: str, count: int) -> list[dict]:
    chapters = SUBJECT_CHAPTERS.get(subject, ["基础"])
    concepts = list_concepts(subject)
    if not concepts:
        concepts = [{"id": f"c{i}", "title": f"概念{i}", "type": "concept", "tags": []} for i in range(1, 21)]

    per_chapter = count // len(chapters)
    remainder = count % len(chapters)
    questions = []
    qid = 0

    for i, ch in enumerate(chapters):
        ch_count = per_chapter + (1 if i < remainder else 0)
        ch_concepts = [c for c in concepts if ch in c.get("tags", [])] or concepts[:ch_count]
        selected = random.sample(ch_concepts, min(ch_count, len(ch_concepts)))

        for c in selected:
            qid += 1
            difficulty = "简单" if phase == "base" else ("中等" if phase == "强化" else "困难")
            qtype = "choice" if random.random() > 0.3 else "fill"
            questions.append({
                "id": f"eq_{qid}",
                "type": qtype,
                "question": f"【{ch}】请回答关于「{c['title']}」的问题：\n{_sample_question(c['title'], difficulty)}",
                "knowledge_point": c["title"],
                "chapter": ch,
                "difficulty": difficulty,
                "options": _sample_options(c["title"]) if qtype == "choice" else [],
            })

    random.shuffle(questions)
    return questions[:count]


def _sample_question(title: str, difficulty: str) -> str:
    templates = [
        f"请简述「{title}」的核心定义和关键特性。",
        f"「{title}」在考试中的常见考查方式有哪些？",
        f"以下关于「{title}」的描述，哪一项是正确的？",
        f"请分析「{title}」与相关概念的区别和联系。",
        f"「{title}」的典型应用场景是什么？",
    ]
    return random.choice(templates)


def _sample_options(title: str) -> list[str]:
    return [
        f"A. {title}是该学科的基础概念",
        f"B. {title}主要应用于理论推导",
        f"C. {title}在考研中属于高频考点",
        f"D. 以上说法都正确",
    ]


@router.post("/generate")
async def generate_exam(
    req: ExamGenerateRequest,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    questions = _generate_exam_questions(req.subject, req.phase, req.question_count)

    # Store as a diagnosis-like record for history
    exam = Diagnosis(
        user_id=user.id,
        subject=req.subject,
        total_questions=len(questions),
    )
    session.add(exam)
    await session.commit()
    await session.refresh(exam)

    return {
        "exam_id": exam.id,
        "subject": req.subject,
        "phase": req.phase,
        "phase_name": {"base": "基础阶段", "强化": "强化阶段", "冲刺": "冲刺阶段"}.get(req.phase, req.phase),
        "duration_minutes": req.duration_minutes,
        "questions": questions,
        "total": len(questions),
    }


@router.post("/submit")
async def submit_exam(
    req: ExamSubmitRequest,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    exam = await session.get(Diagnosis, req.exam_id)
    if not exam or exam.user_id != user.id:
        raise HTTPException(status_code=404, detail="考试记录不存在")

    correct = 0
    chapter_stats: dict[str, dict] = {}

    for ans in req.answers:
        correct_ans = ans.get("correct_answer", "A")
        user_ans = ans.get("user_answer", "")
        chapter = ans.get("chapter", "其他")
        is_correct = user_ans.strip().upper() == correct_ans.strip().upper() if ans.get("type") == "choice" else bool(user_ans.strip())

        if is_correct:
            correct += 1

        if chapter not in chapter_stats:
            chapter_stats[chapter] = {"total": 0, "correct": 0}
        chapter_stats[chapter]["total"] += 1
        if is_correct:
            chapter_stats[chapter]["correct"] += 1

    score = round(correct / len(req.answers) * 100, 1) if req.answers else 0

    # Build comparison with last exam
    prev_exam = await session.execute(
        select(Diagnosis).where(
            and_(
                Diagnosis.user_id == user.id,
                Diagnosis.subject == exam.subject,
                Diagnosis.id != exam.id,
            )
        ).order_by(Diagnosis.created_at.desc()).limit(1)
    )
    prev = prev_exam.scalar_one_or_none()
    improvement = round(score - (prev.score or 0), 1) if prev else None

    exam.score = score
    exam.correct_questions = correct
    exam.weak_points = [
        {"chapter": ch, "total": st["total"], "correct": st["correct"], "rate": round(st["correct"] / st["total"] * 100, 1)}
        for ch, st in sorted(chapter_stats.items())
    ]
    exam.report_text = _generate_exam_report(score, improvement, chapter_stats)
    await session.commit()

    return {
        "exam_id": exam.id,
        "score": score,
        "correct": correct,
        "total": len(req.answers),
        "chapter_stats": chapter_stats,
        "improvement": improvement,
        "prev_score": prev.score if prev else None,
        "report": exam.report_text,
    }


@router.get("/history")
async def exam_history(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
    limit: int = Query(20, le=50),
):
    result = await session.execute(
        select(Diagnosis).where(
            Diagnosis.user_id == user.id
        ).order_by(Diagnosis.created_at.desc()).limit(limit)
    )
    records = []
    for d in result.scalars().all():
        records.append({
            "id": d.id,
            "subject": d.subject,
            "score": d.score,
            "total": d.total_questions,
            "correct": d.correct_questions,
            "chapter_stats": d.weak_points,
            "created_at": d.created_at.isoformat(),
        })
    return records


@router.get("/{exam_id}/report")
async def exam_report(
    exam_id: int,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    exam = await session.get(Diagnosis, exam_id)
    if not exam or exam.user_id != user.id:
        raise HTTPException(status_code=404, detail="考试记录不存在")

    # Get previous for comparison
    prev = await session.execute(
        select(Diagnosis).where(
            and_(
                Diagnosis.user_id == user.id,
                Diagnosis.id < exam_id,
            )
        ).order_by(Diagnosis.created_at.desc()).limit(1)
    )
    p = prev.scalar_one_or_none()

    return {
        "id": exam.id,
        "subject": exam.subject,
        "score": exam.score,
        "total": exam.total_questions,
        "correct": exam.correct_questions,
        "chapter_stats": exam.weak_points,
        "report": exam.report_text,
        "prev_score": p.score if p else None,
        "improvement": round(exam.score - (p.score or 0), 1) if p else None,
        "created_at": exam.created_at.isoformat(),
    }


def _generate_exam_report(score: float, improvement: float | None, chapter_stats: dict) -> str:
    lines = [f"## 模考报告\n"]
    if score >= 80:
        lines.append(f"总分：{score}分（优秀）")
    elif score >= 60:
        lines.append(f"总分：{score}分（良好）")
    else:
        lines.append(f"总分：{score}分（需加强）")

    if improvement is not None:
        direction = "提升" if improvement >= 0 else "下降"
        lines.append(f"较上次考试{direction}：{abs(improvement)}分")

    lines.append("\n### 章节分析\n")
    for ch, st in sorted(chapter_stats.items()):
        bar = "█" * int(st["correct"] / max(st["total"], 1) * 10)
        lines.append(f"{ch}：{bar} {st['correct']}/{st['total']}（{round(st['correct']/max(st['total'],1)*100)}%）")

    lines.append("\n### 建议\n")
    weak = [(ch, st) for ch, st in chapter_stats.items() if st["correct"] / max(st["total"], 1) < 0.6]
    if weak:
        lines.append("薄弱章节：")
        for ch, _ in weak:
            lines.append(f"- {ch}：建议回顾对应知识点，多做练习题")
    if score >= 80:
        lines.append("保持良好状态，可尝试更高难度题目。")
    else:
        lines.append("建议制定针对性复习计划，重点突破薄弱环节。")

    return "\n".join(lines)