import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  try {
    const backendResp = await fetch(`${BACKEND_URL}/subjects`);
    if (!backendResp.ok) {
      return NextResponse.json({ subjects: ['math'], count: 1 }, { status: 200 });
    }
    const data = await backendResp.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ subjects: ['math'], count: 1 }, { status: 200 });
  }
}
