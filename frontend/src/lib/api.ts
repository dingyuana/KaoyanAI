const API_BASE_URL = '/kaoyan';

export type ErrorType = 'network' | 'server' | 'timeout' | 'no_context' | 'unknown';

export interface Source {
  title: string;
  excerpt: string;
}

export interface StreamCallbacks {
  onChunk: (text: string) => void;
  onSources: (sources: string[]) => void;
  onDone: () => void;
  onError: (error: string, type?: ErrorType) => void;
}

export interface ConceptGroup {
  [chapter: string]: Array<{
    title: string;
    id: string;
    type: string;
    tags: string[];
  }>;
}

export interface ConceptDetail {
  id: string;
  title: string;
  subject: string;
  type: string;
  tags: string[];
  related: string[];
  source_anchors: string[];
  content: string;
}

export async function fetchConceptGroups(subject: string): Promise<ConceptGroup> {
  const resp = await fetch(`/kaoyan/api/concepts/${subject}`);
  if (!resp.ok) throw new Error(`获取概念列表失败 (${resp.status})`);
  const data = await resp.json();
  return data.groups || {};
}

export interface RelatedExercise {
  id: string;
  title: string;
  tags: string[];
  difficulty: string;
  score: number;
}

export async function fetchRelatedExercises(subject: string, conceptId: string): Promise<RelatedExercise[]> {
  const resp = await fetch(`/kaoyan/api/concepts/${subject}/${encodeURIComponent(conceptId)}/exercises`);
  if (!resp.ok) throw new Error(`获取关联习题失败 (${resp.status})`);
  const data = await resp.json();
  return data.exercises || [];
}

export interface ExerciseGroup {
  [tier: string]: Array<{
    id: string;
    title: string;
    tags: string[];
    difficulty: string;
  }>;
}

export async function fetchSubjectExercises(subject: string): Promise<{ groups: ExerciseGroup; count: number }> {
  const resp = await fetch(`/kaoyan/api/exercises/${subject}`);
  if (!resp.ok) throw new Error(`获取习题列表失败 (${resp.status})`);
  return resp.json();
}

export async function fetchConceptDetail(subject: string, conceptId: string): Promise<ConceptDetail> {
  const resp = await fetch(`/kaoyan/api/concepts/${subject}/${encodeURIComponent(conceptId)}`);
  if (!resp.ok) throw new Error(`获取概念详情失败 (${resp.status})`);
  return resp.json();
}

export async function sendChatMessageStream(
  message: string,
  subject: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const { onChunk, onSources, onDone, onError } = callbacks;
  let timedOut = false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
      onError('响应超时，请重试', 'timeout');
    }, 30000);

    const response = await fetch(`/kaoyan/api/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, subject: subject || null }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      let errMsg = `请求失败 (${response.status})`;
      if (response.status === 429) errMsg = '请求过于频繁，请稍后重试';
      else if (response.status >= 500) errMsg = '服务器出了点问题，请稍后重试';
      onError(errMsg, 'server');
      return;
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;
        const raw = trimmed.slice(5).trim();
        if (!raw) continue;
        try {
          const event = JSON.parse(raw);
          switch (event.type) {
            case 'chunk': onChunk(event.content); break;
            case 'sources': onSources(event.sources); break;
            case 'done': onDone(); break;
          }
        } catch { /* ignore */ }
      }
    }
    onDone();
  } catch (error) {
    if (timedOut) return;
    const msg = error instanceof Error ? error.message : '网络连接失败';
    const type: ErrorType = error instanceof TypeError ? 'network' : 'unknown';
    onError(msg, type);
  }
}

// ── Auth ──────────────────────────────────────────────

export async function register(phone: string, password: string, name: string) {
  const resp = await fetch(`/kaoyan/api/auth/register`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password, name }),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.detail || '注册失败');
  return data;
}

export async function login(phone: string, password: string) {
  const resp = await fetch(`/kaoyan/api/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password }),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.detail || '登录失败');
  return data;
}

export async function fetchMe(token: string) {
  const resp = await fetch(`/kaoyan/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) return null;
  return resp.json();
}

// ── Diagnosis ─────────────────────────────────────────

export async function startDiagnosis(token: string, subject: string, questionCount = 10) {
  const resp = await fetch(`/kaoyan/api/diagnosis/start`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ subject, question_count: questionCount }),
  });
  return resp.json();
}

export async function submitDiagnosis(token: string, diagnosisId: number, answers: any[]) {
  const resp = await fetch(`/kaoyan/api/diagnosis/submit`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ diagnosis_id: diagnosisId, answers }),
  });
  return resp.json();
}

export async function fetchDiagnosisHistory(token: string) {
  const resp = await fetch(`/kaoyan/api/diagnosis/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.json();
}

// ── Error Book ────────────────────────────────────────

export async function fetchErrorList(token: string, params?: { subject?: string; error_type?: string; mastered?: boolean }) {
  const q = new URLSearchParams();
  if (params?.subject) q.set('subject', params.subject);
  if (params?.error_type) q.set('error_type', params.error_type);
  if (params?.mastered !== undefined) q.set('mastered', String(params.mastered));
  const resp = await fetch(`/kaoyan/api/error-book/list?${q}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.json();
}

export async function fetchDueErrors(token: string) {
  const resp = await fetch(`/kaoyan/api/error-book/due-today`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.json();
}

export async function reviewError(token: string, errorId: number, isCorrect: boolean) {
  const resp = await fetch(`/kaoyan/api/error-book/review`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ error_id: errorId, is_correct: isCorrect }),
  });
  return resp.json();
}

export async function fetchSimilarExercises(token: string, errorId: number) {
  const resp = await fetch(`/kaoyan/api/error-book/${errorId}/similar`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.json();
}

// ── Plan ──────────────────────────────────────────────

export async function generatePlan(token: string, subject: string, targetScore = 120, dailyMinutes = 120) {
  const resp = await fetch(`/kaoyan/api/plan/generate`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ subject, target_score: targetScore, daily_minutes: dailyMinutes }),
  });
  return resp.json();
}

export async function fetchActivePlan(token: string) {
  const resp = await fetch(`/kaoyan/api/plan/active`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.json();
}

export async function fetchTodayTasks(token: string) {
  const resp = await fetch(`/kaoyan/api/plan/today`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.json();
}

export async function updateTask(token: string, taskId: number, isCompleted: boolean) {
  const resp = await fetch(`/kaoyan/api/plan/tasks/update`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ task_id: taskId, is_completed: isCompleted }),
  });
  return resp.json();
}

// ── Tutor ─────────────────────────────────────────────

export async function tutorChat(token: string | null, question: string, subject: string, showSolution = false, history: any[] = []) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const resp = await fetch(`/kaoyan/api/tutor/chat`, {
    method: 'POST', headers,
    body: JSON.stringify({ question, subject, show_solution: showSolution, conversation_history: history }),
  });
  return resp.json();
}
