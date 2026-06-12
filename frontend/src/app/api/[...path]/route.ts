import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8090';

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path, 'GET');
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path, 'POST');
}

async function proxy(request: NextRequest, path: string[], method: string) {
  const backendPath = path.join('/');
  const url = new URL(request.url);
  const queryString = url.search;

  try {
    const headers: Record<string, string> = {};
    const auth = request.headers.get('authorization');
    if (auth) headers['Authorization'] = auth;
    const ct = request.headers.get('content-type');
    if (ct) headers['Content-Type'] = ct;

    const fetchOptions: RequestInit = { method, headers };
    if (method === 'POST') {
      const body = await request.text().catch(() => '');
      fetchOptions.body = body || undefined;
    }

    const resp = await fetch(`${BACKEND_URL}/${backendPath}${queryString}`, fetchOptions);
    const text = await resp.text();

    return new NextResponse(text, {
      status: resp.status,
      headers: { 'Content-Type': resp.headers.get('content-type') || 'application/json' },
    });
  } catch {
    return NextResponse.json({ error: '后端服务不可用' }, { status: 502 });
  }
}
