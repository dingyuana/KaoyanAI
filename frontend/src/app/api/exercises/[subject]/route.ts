import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8001';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subject: string }> }
) {
  const { subject } = await params;
  try {
    const resp = await fetch(`${BACKEND_URL}/exercises/${subject}`);
    if (!resp.ok) {
      return NextResponse.json({ error: `Backend error: ${resp.status}` }, { status: resp.status });
    }
    const data = await resp.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch exercises' }, { status: 500 });
  }
}
