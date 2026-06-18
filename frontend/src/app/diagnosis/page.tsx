'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { startDiagnosis, submitDiagnosis, fetchDiagnosisHistory } from '@/lib/api';
import {
  ClipboardCheck, Loader2, ChevronRight, RefreshCw,
  CheckCircle2, XCircle, BarChart3, BookOpen, AlertTriangle,
} from 'lucide-react';

export default function DiagnosisPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<'start' | 'testing' | 'result' | 'history'>('start');
  const [subject, setSubject] = useState('math');
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [diagId, setDiagId] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
  }, [user]);

  const start = async () => {
    setLoading(true);
    const data = await startDiagnosis(token!, subject, 5);
    setQuestions(data.questions || []);
    setDiagId(data.diagnosis_id);
    setAnswers({});
    setStep('testing');
    setShowAnswers(false);
    setLoading(false);
  };

  const submit = async () => {
    setLoading(true);
    const ans = questions.map((q) => ({
      question_id: q.id,
      question: q.question,
      user_answer: answers[q.id] || '',
      correct_answer: q.correct_answer || q.answer || 'A',
      type: q.type || 'choice',
      knowledge_point: q.knowledge_point,
      options: q.options,
    }));
    const data = await submitDiagnosis(token!, diagId, ans);
    setResult(data);
    setStep('result');
    setLoading(false);
  };

  const loadHistory = async () => {
    setLoading(true);
    setHistory(await fetchDiagnosisHistory(token!));
    setStep('history');
    setLoading(false);
  };

  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md shadow-orange-500/20">
          <ClipboardCheck className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">学习诊断</h1>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => { setStep('start'); setResult(null); }}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              step === 'start' ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
            }`}
          >
            开始
          </button>
          <button
            onClick={loadHistory}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              step === 'history' ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
            }`}
          >
            历史
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-orange-400 mx-auto mb-3" />
            <p className="text-sm text-gray-400">处理中…</p>
          </div>
        </div>
      )}

      {/* ── Start screen ── */}
      {step === 'start' && !loading && (
        <div
          className="ds-card p-6 md:p-8 relative overflow-hidden"
          style={{ background: 'var(--ds-grad-diagnosis)' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.5)' }}
            >
              <ClipboardCheck className="w-7 h-7" style={{ color: 'var(--ds-icon-diagnosis)' }} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--ds-text-primary)' }}>
                开始学习诊断
              </h2>
              <p className="text-sm mb-5" style={{ color: 'var(--ds-text-secondary)' }}>
                选择学科进行诊断测试。系统将根据答题情况生成薄弱点分析报告，帮你找到知识盲区。
              </p>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border text-sm mb-4"
                style={{ borderColor: 'rgba(0,0,0,0.08)', background: 'var(--ds-bg-elevated)', color: 'var(--ds-text-primary)' }}
              >
                <option value="math">数学</option>
                <option value="ds">数据结构</option>
                <option value="arch">组成原理</option>
                <option value="net">计算机网络</option>
                <option value="os">操作系统</option>
              </select>
              <button
                onClick={start}
                className="w-full py-2.5 rounded-2xl text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: 'var(--ds-text-primary)', color: 'var(--ds-bg-elevated)' }}
              >
                开始诊断
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Testing screen ── */}
      {step === 'testing' && !loading && (
        <div className="space-y-4">
          {/* Progress bar */}
          <div
            className="ds-card p-4"
            style={{ background: 'var(--ds-bg-elevated)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4" style={{ color: 'var(--ds-icon-diagnosis)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--ds-text-primary)' }}>
                  答题进度
                </span>
              </div>
              <span className="text-xs" style={{ color: 'var(--ds-text-muted)' }}>
                {answeredCount}/{totalCount} 已答
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--ds-bg-subtle)' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${totalCount > 0 ? (answeredCount / totalCount) * 100 : 0}%`,
                  background: 'linear-gradient(90deg, var(--ds-icon-diagnosis), #F59E0B)',
                }}
              />
            </div>
            {/* Question indicators */}
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {questions.map((q, i) => {
                const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      document.getElementById(`q-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`w-7 h-7 rounded-lg text-[10px] font-medium transition-colors ${
                      isAnswered
                        ? 'text-white shadow-sm'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                    style={{
                      background: isAnswered ? 'var(--ds-icon-diagnosis)' : 'var(--ds-bg-subtle)',
                    }}
                    title={`第${i + 1}题${isAnswered ? '（已答）' : '（未答）'}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Questions */}
          {questions.map((q, i) => (
            <div
              key={q.id}
              id={`q-${i}`}
              className="ds-card p-4"
              style={{
                background: 'var(--ds-bg-elevated)',
                borderLeft: answers[q.id] ? '3px solid var(--ds-icon-diagnosis)' : '3px solid transparent',
              }}
            >
              <p className="text-sm font-medium mb-3" style={{ color: 'var(--ds-text-primary)' }}>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold mr-2 text-white"
                  style={{ background: 'var(--ds-icon-diagnosis)' }}>
                  {i + 1}
                </span>
                {q.question}
              </p>
              {q.options?.length > 0 ? (
                <div className="space-y-1.5">
                  {q.options.map((opt: string, oi: number) => {
                    const optKey = String.fromCharCode(65 + oi); // A, B, C, D
                    const isSelected = answers[q.id] === optKey;
                    return (
                      <label
                        key={oi}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm cursor-pointer transition-all"
                        style={{
                          background: isSelected ? 'rgba(249,115,22,0.1)' : 'var(--ds-bg-subtle)',
                          border: isSelected ? '1px solid var(--ds-icon-diagnosis)' : '1px solid transparent',
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                          style={{
                            borderColor: isSelected ? 'var(--ds-icon-diagnosis)' : 'var(--ds-text-muted)',
                          }}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--ds-icon-diagnosis)' }} />
                          )}
                        </div>
                        <input
                          type="radio"
                          name={q.id}
                          value={optKey}
                          checked={isSelected}
                          onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                          className="sr-only"
                        />
                        <span style={{ color: 'var(--ds-text-primary)' }}>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <textarea
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors resize-none"
                  style={{
                    borderColor: 'rgba(0,0,0,0.1)',
                    background: 'var(--ds-bg-subtle)',
                    color: 'var(--ds-text-primary)',
                  }}
                  rows={3}
                  placeholder="输入你的回答..."
                />
              )}
              <div className="flex items-center gap-1.5 mt-2">
                <BookOpen className="w-3 h-3" style={{ color: 'var(--ds-text-muted)' }} />
                <span className="text-[11px]" style={{ color: 'var(--ds-text-muted)' }}>
                  {q.knowledge_point}
                </span>
              </div>
            </div>
          ))}

          {/* Submit button */}
          <button
            onClick={submit}
            disabled={answeredCount !== totalCount}
            className="w-full py-3 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
            style={{
              background: answeredCount === totalCount
                ? 'linear-gradient(135deg, var(--ds-icon-diagnosis), #F59E0B)'
                : 'var(--ds-bg-subtle)',
              color: answeredCount === totalCount ? '#fff' : 'var(--ds-text-muted)',
            }}
          >
            {answeredCount === totalCount ? (
              <>提交答案 <ChevronRight className="w-4 h-4" /></>
            ) : (
              <>还剩 {totalCount - answeredCount} 题未答</>
            )}
          </button>
        </div>
      )}

      {/* ── Result screen ── */}
      {step === 'result' && result && !loading && (
        <div className="space-y-4">
          {/* Score card */}
          <div
            className="ds-card p-6 text-center relative overflow-hidden"
            style={{ background: 'var(--ds-grad-diagnosis)' }}
          >
            <div
              className="text-5xl font-bold mb-1"
              style={{
                color: result.score >= 80
                  ? '#10B981'
                  : result.score >= 60
                    ? '#F59E0B'
                    : '#EF4444',
              }}
            >
              {result.score}
              <span className="text-xl ml-0.5">分</span>
            </div>
            <p className="text-sm mt-1" style={{ color: 'var(--ds-text-secondary)' }}>
              正确 {result.correct}/{result.total}
              {result.total > 0 && (
                <> · {result.weak_points?.length || 0} 个薄弱点</>
              )}
            </p>
            {/* Score progress ring approximation */}
            <div className="mt-4 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto" style={{ background: 'rgba(0,0,0,0.08)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${result.score}%`,
                  background: result.score >= 80
                    ? 'linear-gradient(90deg, #10B981, #34D399)'
                    : result.score >= 60
                      ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                      : 'linear-gradient(90deg, #EF4444, #F87171)',
                }}
              />
            </div>
          </div>

          {/* Chapter analysis */}
          {result.chapter_analysis && result.chapter_analysis.length > 0 && (
            <div className="ds-card p-4" style={{ background: 'var(--ds-bg-elevated)' }}>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4" style={{ color: 'var(--ds-icon-diagnosis)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--ds-text-primary)' }}>
                  章节分析
                </span>
              </div>
              <div className="space-y-2">
                {result.chapter_analysis.map((ch: any, i: number) => {
                  const chPct = ch.total > 0 ? Math.round((ch.correct / ch.total) * 100) : 0;
                  return (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ background: 'var(--ds-bg-subtle)' }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium truncate" style={{ color: 'var(--ds-text-primary)' }}>
                            {ch.chapter || ch.knowledge_point}
                          </span>
                          <span className="text-[10px] ml-2 tabular-nums" style={{ color: 'var(--ds-text-muted)' }}>
                            {ch.correct}/{ch.total}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${chPct}%`,
                              background: chPct >= 80 ? '#10B981' : chPct >= 60 ? '#F59E0B' : '#EF4444',
                            }}
                          />
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-medium w-8 text-right"
                        style={{ color: chPct >= 80 ? '#10B981' : chPct >= 60 ? '#F59E0B' : '#EF4444' }}
                      >
                        {chPct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Wrong-answer review */}
          {result.questions_result && result.questions_result.filter((qr: any) => !qr.is_correct).length > 0 && (
            <div className="ds-card p-4" style={{ background: 'var(--ds-bg-elevated)' }}>
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="flex items-center gap-2 w-full mb-3"
              >
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium" style={{ color: 'var(--ds-text-primary)' }}>
                  错题回顾
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 ml-auto">
                  {result.questions_result.filter((qr: any) => !qr.is_correct).length} 题
                </span>
                <ChevronRight
                  className="w-4 h-4 transition-transform"
                  style={{ color: 'var(--ds-text-muted)', transform: showAnswers ? 'rotate(90deg)' : '' }}
                />
              </button>
              {showAnswers && (
                <div className="space-y-2">
                  {result.questions_result.filter((qr: any) => !qr.is_correct).map((qr: any, i: number) => (
                    <div
                      key={qr.question_id || i}
                      className="px-3 py-3 rounded-xl"
                      style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}
                    >
                      <p className="text-xs font-medium mb-2" style={{ color: 'var(--ds-text-primary)' }}>
                        {i + 1}. {qr.question || qr.question_text}
                      </p>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div className="flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-red-500" />
                          <span className="text-red-500">
                            你的答案：{qr.user_answer || '未作答'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span className="text-green-500">
                            正确答案：{qr.correct_answer}
                          </span>
                        </div>
                      </div>
                      {qr.explanation && (
                        <p className="text-[11px] mt-1.5" style={{ color: 'var(--ds-text-muted)' }}>
                          {qr.explanation}
                        </p>
                      )}
                      <div className="flex items-center gap-1 mt-1.5">
                        <BookOpen className="w-2.5 h-2.5" style={{ color: 'var(--ds-text-muted)' }} />
                        <span className="text-[10px]" style={{ color: 'var(--ds-text-muted)' }}>
                          {qr.knowledge_point}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Weal points */}
          {result.weak_points?.length > 0 && (
            <div className="ds-card p-4" style={{ background: 'var(--ds-bg-elevated)' }}>
              <h2 className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--ds-text-primary)' }}>
                <AlertTriangle className="w-4 h-4 text-amber-500" /> 薄弱环节
              </h2>
              <div className="space-y-1.5">
                {result.weak_points.map((wp: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm py-2 px-3 rounded-xl"
                    style={{ borderBottom: '1px solid var(--ds-bg-subtle)' }}
                  >
                    <ChevronRight className="w-3 h-3" style={{ color: 'var(--ds-text-muted)' }} />
                    <span style={{ color: 'var(--ds-text-primary)' }}>{wp.knowledge_point}</span>
                    <span className="text-xs ml-auto" style={{ color: 'var(--ds-text-muted)' }}>
                      {wp.count}次错误
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report */}
          {result.report && (
            <div className="ds-card p-4" style={{ background: 'var(--ds-bg-elevated)' }}>
              <h2 className="text-sm font-medium mb-2" style={{ color: 'var(--ds-text-primary)' }}>
                诊断报告
              </h2>
              <div
                className="text-sm whitespace-pre-line leading-relaxed"
                style={{ color: 'var(--ds-text-secondary)' }}
              >
                {result.report}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => { setStep('start'); setResult(null); }}
              className="flex-1 py-2.5 rounded-2xl font-medium text-sm transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, var(--ds-icon-diagnosis), #F59E0B)', color: '#fff' }}
            >
              再测一次
            </button>
            <button
              onClick={loadHistory}
              className="flex-1 py-2.5 rounded-2xl font-medium text-sm transition-colors"
              style={{ background: 'var(--ds-bg-subtle)', color: 'var(--ds-text-secondary)' }}
            >
              查看历史
            </button>
          </div>
        </div>
      )}

      {/* ── History screen ── */}
      {step === 'history' && !loading && (
        <div className="space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardCheck className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--ds-text-muted)' }} />
              <p className="text-sm" style={{ color: 'var(--ds-text-muted)' }}>暂无诊断记录</p>
            </div>
          ) : (
            history.map((h: any) => (
              <div
                key={h.id}
                className="ds-card p-4 flex items-center gap-4 transition-all hover:shadow-md cursor-pointer"
                style={{ background: 'var(--ds-bg-elevated)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{
                    background: h.score >= 80
                      ? 'rgba(16,185,129,0.1)'
                      : h.score >= 60
                        ? 'rgba(245,158,11,0.1)'
                        : 'rgba(239,68,68,0.1)',
                    color: h.score >= 80 ? '#10B981' : h.score >= 60 ? '#F59E0B' : '#EF4444',
                  }}
                >
                  {h.score}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--ds-text-primary)' }}>
                    {h.subject === 'math' ? '数学' : h.subject}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--ds-text-muted)' }}>
                    {h.correct}/{h.total} 正确 · {new Date(h.created_at).toLocaleDateString('zh-CN')}
                  </p>
                </div>
                <RefreshCw className="w-4 h-4" style={{ color: 'var(--ds-text-muted)' }} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
