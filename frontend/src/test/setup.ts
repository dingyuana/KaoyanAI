import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

Element.prototype.scrollIntoView = () => {};

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/kaoyan',
}));

vi.mock('next/link', () => ({
  default: ({ children, href, className }: any) =>
    React.createElement('a', { href, className }, children),
}));

vi.mock('recharts', () => {
  const MockDiv = ({ children }: any) => children;
  return {
    ResponsiveContainer: MockDiv,
    RadarChart: MockDiv,
    PolarGrid: () => null,
    PolarAngleAxis: () => null,
    PolarRadiusAxis: () => null,
    Radar: () => null,
    LineChart: MockDiv,
    Line: () => null,
    XAxis: () => null,
    YAxis: () => null,
    CartesianGrid: () => null,
    Tooltip: () => null,
  };
});

vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal() as Record<string, unknown>;
  const MockIcon = () => React.createElement('svg', { 'data-testid': 'mock-icon' });
  const iconNames = [
    'MessageSquare', 'BookOpen', 'ClipboardCheck', 'BookX', 'Calendar',
    'GraduationCap', 'LogIn', 'LogOut', 'BarChart3', 'FileCheck',
    'Send', 'Loader2', 'ChevronRight', 'RefreshCw', 'Lightbulb',
    'FileText', 'Check', 'X', 'Target', 'Clock', 'TrendingUp',
    'CheckCircle', 'AlertTriangle', 'AlertCircle', 'Puzzle', 'PenTool',
    'Search', 'Hash', 'Link', 'User', 'Bookmark', 'Network',
    'Moon', 'Sun', 'ArrowLeft', 'ArrowRight', 'Sparkles', 'Pause',
    'LayoutDashboard', 'Menu', 'Brain',
  ];
  const mocks: Record<string, unknown> = {};
  for (const name of iconNames) {
    mocks[name] = MockIcon;
  }
  return { ...(actual ?? {}), ...mocks };
});

vi.mock('@/lib/auth-context', () => {
  const mockUser = { id: 1, phone: '13800000001', name: '测试用户', role: 'student' };
  return {
    useAuth: () => ({
      user: mockUser,
      token: 'test-token-123',
      login: vi.fn().mockResolvedValue(undefined),
      register: vi.fn().mockResolvedValue(undefined),
      logout: vi.fn(),
      isLoading: false,
    }),
    AuthProvider: ({ children }: any) => children,
  };
});

vi.mock('@/lib/api', () => ({
  sendChatMessageStream: vi.fn(),
  login: vi.fn().mockResolvedValue({ access_token: 'test-token', user_id: 1 }),
  register: vi.fn().mockResolvedValue({ access_token: 'test-token', user_id: 1 }),
  fetchMe: vi.fn().mockResolvedValue({ id: 1, phone: '13800000001', name: '测试用户', role: 'student' }),
  startDiagnosis: vi.fn().mockResolvedValue({
    diagnosis_id: 1, subject: 'math', questions: [
      { id: 'q1', type: 'choice', question: '测试题1？', knowledge_point: '极限', options: ['A. 正确', 'B. 错误'] },
    ], total: 1,
  }),
  submitDiagnosis: vi.fn().mockResolvedValue({
    diagnosis_id: 1, score: 100, correct: 1, total: 1, weak_points: [], report: '诊断报告内容',
  }),
  fetchDiagnosisHistory: vi.fn().mockResolvedValue([
    { id: 1, subject: 'math', score: 80, correct: 8, total: 10, created_at: '2026-06-10T00:00:00' },
  ]),
  fetchErrorList: vi.fn().mockResolvedValue([
    { id: 1, question_text: '错题1', knowledge_point: '极限', error_type: 'concept', review_count: 0, is_mastered: false, next_review_at: '2026-06-10T00:00:00' },
  ]),
  fetchDueErrors: vi.fn().mockResolvedValue({
    count: 1, errors: [{ id: 1, question_text: '待复习错题', knowledge_point: '极限', error_type: 'concept' }],
  }),
  reviewError: vi.fn().mockResolvedValue({ id: 1, review_count: 1, review_interval: 2, next_review_at: '2026-06-12T00:00:00', is_mastered: false }),
  generatePlan: vi.fn().mockResolvedValue({
    plan_id: 1, subject: 'math', phase: 'base', phase_name: '基础阶段', target_score: 120, daily_minutes: 120, task_count: 50,
  }),
  fetchActivePlan: vi.fn().mockResolvedValue({
    plan_id: 1, subject: 'math', phase: 'base', target_score: 120, daily_minutes: 120, progress: 20,
    tasks: [{ id: 1, task_type: 'study', knowledge_point: '极限', estimated_minutes: 30, is_completed: false, scheduled_date: '2026-06-10' }],
    created_at: '2026-06-10T00:00:00',
  }),
  fetchTodayTasks: vi.fn().mockResolvedValue({
    date: '2026-06-10', count: 1, total_minutes: 30,
    tasks: [{ id: 1, task_type: 'study', knowledge_point: '极限', estimated_minutes: 30 }],
  }),
  updateTask: vi.fn().mockResolvedValue({ id: 1, is_completed: true }),
  tutorChat: vi.fn().mockResolvedValue({ answer: '这是思路引导', is_hint: true, sources: ['math/概念.md'], has_context: true }),
  fetchConceptGroups: vi.fn().mockResolvedValue({}),
  fetchConceptDetail: vi.fn().mockResolvedValue({}),
}));

global.fetch = vi.fn().mockResolvedValue({
  json: () => Promise.resolve({ subjects: ['math', 'ds', 'arch', 'net', 'os'], count: 5, questions: [] }),
  ok: true,
  text: () => Promise.resolve(''),
  headers: new Headers({ 'content-type': 'application/json' }),
});