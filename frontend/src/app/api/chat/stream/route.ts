import { NextRequest } from 'next/server';

const BACKEND_URL = 'http://localhost:8001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, subject } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const backendResp = await fetch(`${BACKEND_URL}/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, subject: subject || null }),
    });

    if (!backendResp.ok) {
      const errText = await backendResp.text().catch(() => 'Unknown error');
      return new Response(JSON.stringify({ error: `Backend error: ${errText}` }), {
        status: backendResp.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Forward the SSE stream directly
    const headers = new Headers();
    headers.set('Content-Type', 'text/event-stream');
    headers.set('Cache-Control', 'no-cache');
    headers.set('Connection', 'keep-alive');

    return new Response(backendResp.body, { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
