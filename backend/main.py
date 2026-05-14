"""FastAPI application for kaoyan Q&A system."""

import asyncio
import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional

from config import SUBJECTS, MOCK_MODE
from wiki_retriever import get_subjects, list_concepts, retrieve_knowledge
from llm import generate_response


app = FastAPI(
    title="考研助手后端API",
    description="考研备考问答系统后端服务",
    version="1.0.0"
)

# CORS — allow all origins for MVP dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    """Chat request model."""
    message: str
    subject: Optional[str] = None


class ChatResponse(BaseModel):
    """Chat response model."""
    answer: str
    sources: List[str]


class SubjectInfo(BaseModel):
    """Subject info model."""
    name: str
    available: bool


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}


@app.get("/subjects")
async def get_subjects_endpoint():
    """
    Get list of available subjects from wiki directory.
    """
    subjects = get_subjects()
    return {
        "subjects": subjects,
        "count": len(subjects)
    }


@app.get("/concepts/{subject}")
async def get_concepts(subject: str):
    """
    Get list of concepts for a specific subject.
    
    Args:
        subject: Subject name (math, english, politics)
        
    Returns:
        List of concept info
    """
    if subject not in SUBJECTS:
        raise HTTPException(status_code=404, detail=f"Subject '{subject}' not found")
    
    concepts = list_concepts(subject)
    
    return {
        "subject": subject,
        "concepts": concepts,
        "count": len(concepts)
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint for Q&A.
    
    1. Retrieve relevant knowledge from wiki
    2. Build context from retrieved content
    3. Generate response using LLM
    4. Return answer + sources
    
    Args:
        request: ChatRequest with message and optional subject filter
        
    Returns:
        ChatResponse with answer and sources
    """
    if not request.message or len(request.message.strip()) == 0:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    # Step 1: Retrieve relevant knowledge from wiki
    knowledge = retrieve_knowledge(request.message, request.subject)
    
    # Step 2: Generate response using LLM
    answer = generate_response(
        context=knowledge["content"],
        question=request.message
    )
    
    # Step 3: Return answer with sources
    return ChatResponse(
        answer=answer,
        sources=knowledge.get("sources", [])
    )


@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    SSE streaming chat endpoint.
    
    Same as /chat but streams the response as SSE events:
      data: {"type":"sources","sources":[...]}
      data: {"type":"chunk","content":"..."}
      data: {"type":"done"}
    """
    if not request.message or len(request.message.strip()) == 0:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    knowledge = retrieve_knowledge(request.message, request.subject)
    sources = knowledge.get("sources", [])
    content = knowledge.get("content", "")

    async def event_stream():
        # 1. Send sources
        yield f"data: {json.dumps({'type': 'sources', 'sources': sources}, ensure_ascii=False)}\n\n"

        # 2. Generate and stream answer
        answer = generate_response(context=content, question=request.message)

        if MOCK_MODE:
            # Simulate streaming: send line-granularity chunks with short delay
            lines = answer.split('\n')
            for i, line in enumerate(lines):
                if not line.strip():
                    continue
                payload = line + ('\n' if i < len(lines) - 1 else '')
                yield f"data: {json.dumps({'type': 'chunk', 'content': payload}, ensure_ascii=False)}\n\n"
                await asyncio.sleep(0.02)
        else:
            yield f"data: {json.dumps({'type': 'chunk', 'content': answer}, ensure_ascii=False)}\n\n"

        # 3. Signal done
        yield f"data: {json.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream", headers={
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
    })


@app.get("/")
async def root():
    """Root endpoint with API info."""
    return {
        "name": "考研助手后端API",
        "version": "1.0.0",
        "endpoints": {
            "health": "GET /health",
            "subjects": "GET /subjects",
            "concepts": "GET /concepts/{subject}",
            "chat": "POST /chat"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)