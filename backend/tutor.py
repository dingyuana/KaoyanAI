"""Guided AI tutoring: hint-first responses, context-aware with error history."""

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from auth import get_optional_user
from database import get_session, User, ErrorBook
from wiki_retriever import retrieve_knowledge
from llm import generate_response
from config import MOCK_MODE

router = APIRouter(prefix="/tutor", tags=["tutor"])


class TutorRequest(BaseModel):
    question: str
    subject: str = "math"
    show_solution: bool = False
    conversation_history: list[dict] = []  # [{role, content}]

HINT_PROMPT = (
    "你是一个考研辅导老师，遵循\"先引导，后解答\"的教学原则。\n\n"
    "1. 首先，不要直接给出答案或完整解法。\n"
    "2. 先给出解题思路提示（1-2句）：涉及哪个知识点、从哪里入手、需要注意什么。\n"
    "3. 如果学生有历史错题记录，在提示中关联提醒。\n"
    "4. 在回答末尾标注参考的知识库来源。\n"
    "5. 只在用户明确要求（show_solution=true）时，才给出完整解析步骤。\n"
)

SOLUTION_PROMPT = (
    "你是一个考研辅导老师，请给出完整的解题过程和详细解析。\n\n"
    "1. 分步骤展示解题过程，每步标注思路。\n"
    "2. 包含所涉及的知识点说明。\n"
    "3. 标注易错点和注意事项。\n"
    "4. 在末尾标注参考的知识库来源。\n"
)


@router.post("/chat")
async def tutor_chat(
    req: TutorRequest,
    user: User | None = Depends(get_optional_user),
    session: AsyncSession = Depends(get_session),
):
    knowledge = retrieve_knowledge(req.question, req.subject)
    context = knowledge.get("content", "")
    sources = knowledge.get("sources", [])

    user_context = ""
    if user:
        recent_errors = await session.execute(
            select(ErrorBook).where(
                ErrorBook.user_id == user.id,
                ErrorBook.is_mastered == False,
            ).order_by(ErrorBook.created_at.desc()).limit(5)
        )
        errors = recent_errors.scalars().all()
        if errors:
            error_summary = "\n".join(
                f"- {e.knowledge_point}（{e.error_type}）: {e.correct_answer[:80]}"
                for e in errors if e.knowledge_point
            )
            if error_summary:
                user_context = f"\n\n该学生的近期错题记录：\n{error_summary}\n\n辅导时请结合这些薄弱点给出针对性提醒。"

    system_prompt = SOLUTION_PROMPT if req.show_solution else HINT_PROMPT
    full_prompt = system_prompt + user_context

    messages = [{"role": "system", "content": full_prompt}]
    for h in (req.conversation_history or []):
        messages.append({"role": h.get("role", "user"), "content": h.get("content", "")})

    if context:
        messages.append({"role": "user", "content": f"知识库上下文：\n{context[:2000]}\n\n学生问题：{req.question}"})
    else:
        messages.append({"role": "user", "content": req.question})

    if MOCK_MODE:
        if req.show_solution:
            answer = f"【完整解析】\n基于知识库，针对「{req.question}」的解题步骤如下：\n\n第一步：分析问题类型\n第二步：确定解题方法\n第三步：逐步推导\n\n（Mock 模式 - 请配置 LLM API Key 获取真实回答）"
        else:
            answer = f"【思路引导】\n关于「{req.question}」，建议从以下角度思考：\n\n1. 先回顾相关的基础概念\n2. 确定问题属于哪个知识点范畴\n3. 尝试用已学方法进行推导\n\n如果需要完整解析，请告知。"
    else:
        from llm import _build_prompt, _call_llm_sync
        answer = _strip_think_tags(_call_llm_sync(context[:2000], req.question))

    return {
        "answer": answer,
        "sources": sources,
        "is_hint": not req.show_solution,
        "has_context": bool(context),
    }


def _strip_think_tags(text: str) -> str:
    import re
    return re.sub(r'<think>.*?</think>', '', text, flags=re.DOTALL).strip()
