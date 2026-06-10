"""FastAPI application for kaoyan Q&A system."""

import asyncio
import json

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, field_validator
from typing import List, Optional

from config import MOCK_MODE
from wiki_retriever import get_subjects, list_concepts, retrieve_knowledge, get_concept_detail, get_related_exercises, get_subject_exercises
from llm import generate_response, generate_response_stream
from exceptions import (
    KaoyanError,
    SubjectNotFoundError,
    InvalidInputError,
    LLMServiceError,
)
from logging_config import get_logger
from rate_limiter import rate_limiter
from database import init_db
from auth import router as auth_router
from diagnosis import router as diagnosis_router
from error_book import router as error_book_router
from planner import router as planner_router
from tutor import router as tutor_router

logger = get_logger()

app = FastAPI(title="考研助手后端API", description="考研备考问答系统后端服务", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware
async def request_logging_middleware(request: Request, call_next):
    client_ip = _get_client_ip(request)
    user_agent = request.headers.get("user-agent", "unknown")
    logger.info(f"{request.method} {request.url.path} | client_ip={client_ip} | user_agent={user_agent}")
    response = await call_next(request)
    return response


@app.exception_handler(KaoyanError)
async def kaoyan_error_handler(request: Request, exc: KaoyanError):
    """Handle custom application errors with consistent JSON format."""
    logger.warning(f"KaoyanError {exc.status_code}: {exc.message}")
    from fastapi.responses import JSONResponse
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.error_code,
                "message": exc.message,
                "detail": exc.detail,
            },
        },
    )


@app.exception_handler(Exception)
async def general_error_handler(request: Request, exc: Exception):
    """Catch-all for unhandled exceptions."""
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    from fastapi.responses import JSONResponse
    return JSONResponse(
        status_code=500,
        content={
            "error": "服务器内部错误，请稍后重试",
            "status_code": 500,
        },
    )


@app.on_event("startup")
async def startup_event():
    await init_db()
    if MOCK_MODE:
        print("注意：未配置 LLM_API_KEY，系统运行在 Mock 模式")
    else:
        from config import LLM_MODEL, LLM_BASE_URL
        print(f"LLM 已连接: {LLM_MODEL} @ {LLM_BASE_URL}")

app.include_router(auth_router)
app.include_router(diagnosis_router)
app.include_router(error_book_router)
app.include_router(planner_router)
app.include_router(tutor_router)


class ChatRequest(BaseModel):
    """Chat request model."""
    message: str
    subject: Optional[str] = None

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise InvalidInputError("消息不能为空")
        if len(v) > 1000:
            raise InvalidInputError("消息过长，请控制在 1000 字以内")
        if "<script>" in v.lower():
            raise InvalidInputError("消息包含非法字符")
        return v


class ChatResponse(BaseModel):
    """Chat response model."""
    answer: str
    sources: List[str]


def _get_client_ip(request: Request) -> str:
    """Extract client IP from request."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _validate_subject(subject: str) -> bool:
    """Check if a subject exists in the wiki knowledge base."""
    return subject in get_subjects()


@app.get("/health")
async def health_check(request: Request):
    """Health check endpoint."""
    rate_limiter.check(_get_client_ip(request))
    logger.info("Health check OK")
    return {"status": "ok"}


@app.get("/subjects")
async def get_subjects_endpoint(request: Request):
    """Get list of available subjects from wiki directory."""
    rate_limiter.check(_get_client_ip(request))
    logger.info("Fetching subjects")
    subjects = get_subjects()
    return {"subjects": subjects, "count": len(subjects)}


@app.get("/concepts/{subject}")
async def get_concepts(subject: str, request: Request):
    """Get list of concepts for a specific subject, grouped by chapter."""
    rate_limiter.check(_get_client_ip(request))

    if not _validate_subject(subject):
        raise SubjectNotFoundError(subject)

    logger.info(f"Fetching concepts for subject: {subject}")
    concepts = list_concepts(subject)

    # Group concepts by chapter (first meaningful tag)
    groups = {}
    for c in concepts:
        tags = c.get("tags", [])
        chapter = "其他"
        for t in tags:
            if t in ("高等数学", "线性代数", "概率论与数理统计", "解题方法", "基础概念"):
                chapter = t
                break
        if chapter not in groups:
            groups[chapter] = []
        groups[chapter].append(c)

    return {
        "subject": subject,
        "groups": groups,
        "count": len(concepts),
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, req: Request):
    rate_limiter.check(_get_client_ip(req))
    logger.info(f"Chat request: subject={request.subject}, message_len={len(request.message)}")

    try:
        knowledge = retrieve_knowledge(request.message, request.subject)
        logger.info(f"Retrieved {len(knowledge.get('sources', []))} sources")
        answer = generate_response(context=knowledge["content"], question=request.message)
        logger.info(f"Generated response: {len(answer)} chars")
        return ChatResponse(answer=answer, sources=knowledge.get("sources", []))
    except KaoyanError:
        raise
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise LLMServiceError("生成回答时出错，请稍后重试")


@app.post("/chat/stream")
async def chat_stream(request: ChatRequest, req: Request):
    rate_limiter.check(_get_client_ip(req))
    logger.info(f"Stream chat: subject={request.subject}, message_len={len(request.message)}")

    try:
        knowledge = retrieve_knowledge(request.message, request.subject)
    except Exception as e:
        logger.error(f"Knowledge retrieval failed: {e}")
        raise LLMServiceError("检索知识库失败")

    sources = knowledge.get("sources", [])
    content = knowledge.get("content", "")

    async def event_stream():
        yield f"data: {json.dumps({'type': 'sources', 'sources': sources}, ensure_ascii=False)}\n\n"

        try:
            async for chunk in generate_response_stream(context=content, question=request.message):
                if chunk:
                    yield f"data: {json.dumps({'type': 'chunk', 'content': chunk}, ensure_ascii=False)}\n\n"
        except Exception as e:
            logger.error(f"Stream generation error: {e}")
            error_msg = "回答生成中断，请重试"
            yield f"data: {json.dumps({'type': 'chunk', 'content': error_msg}, ensure_ascii=False)}\n\n"

        yield f"data: {json.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive"},
    )


@app.get("/concepts/{subject}/{concept_id}")
async def get_concept_detail_route(subject: str, concept_id: str, request: Request):
    rate_limiter.check(_get_client_ip(request))

    if not _validate_subject(subject):
        raise SubjectNotFoundError(subject)

    detail = get_concept_detail(subject, concept_id)
    if detail is None:
        raise InvalidInputError(f"概念 '{concept_id}' 不存在")

    return detail


@app.get("/concepts/{subject}/{concept_id}/exercises")
async def get_related_exercises_route(subject: str, concept_id: str, request: Request):
    rate_limiter.check(_get_client_ip(request))

    if not _validate_subject(subject):
        raise SubjectNotFoundError(subject)

    exercises = get_related_exercises(subject, concept_id)
    return {"subject": subject, "concept_id": concept_id, "exercises": exercises, "count": len(exercises)}


@app.get("/exercises/{subject}")
async def get_exercises_route(subject: str, request: Request):
    rate_limiter.check(_get_client_ip(request))

    if not _validate_subject(subject):
        raise SubjectNotFoundError(subject)

    result = get_subject_exercises(subject)
    result["subject"] = subject
    return result


@app.get("/")
async def root(request: Request):
    """Root endpoint with API info."""
    rate_limiter.check(_get_client_ip(request))
    return {
        "name": "考研助手后端API",
        "version": "1.0.0",
        "endpoints": {
            "health": "GET /health",
            "subjects": "GET /subjects",
            "concepts": "GET /concepts/{subject}",
            "concept_detail": "GET /concepts/{subject}/{concept_id}",
            "related_exercises": "GET /concepts/{subject}/{concept_id}/exercises",
            "exercises": "GET /exercises/{subject}",
            "chat": "POST /chat",
            "chat_stream": "POST /chat/stream",
        },
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
