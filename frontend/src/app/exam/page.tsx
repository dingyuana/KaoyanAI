'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { fetchDiagnosisHistory } from '@/lib/api';
import { ClipboardCheck, Loader2, Clock, ChevronRight, BarChart3 } from 'lucide-react';

export default function ExamPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<'new' | 'history'>('new');
  const [subject, setSubject] = useState('math');
  const [phase, setPhase] = useState('base');
  const [duration, setDuration] = useState(30);
  const [qCount, setQCount] = useState(10);
  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
  }, [user]);

  useEffect(() => {
    if (timeLeft <= 0 && exam && !result) {
      handleSubmit();
    }
  }, [timeLeft]);

  const startExam = async () => {
    setLoading(true);
    const resp = await fetch(`/kaoyan/api/exam/generate`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ subject, phase, question_count: qCount, duration_minutes: duration }),
    });
    const data = await resp.json();
    setExam(data);
    setAnswers({});
    setResult(null);
    setTimeLeft(duration * 60);
    timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setLoading(true);
    const ans = (exam?.questions || []).map((q: any) => ({
      id: q.id, question: q.question, user_answer: answers[q.id] || '',
      correct_answer: 'A', type: q.type || 'choice', chapter: q.chapter,
    }));
    const resp = await fetch(`/kaoyan/api/exam/submit`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ exam_id: exam.exam_id, answers: ans }),
    });
    setResult(await resp.json());
    setLoading(false);
  };

  const loadHistory = async () => {
    setLoading(true);
    const resp = await fetch(`/kaoyan/api/exam/history`, { headers: { Authorization: `Bearer ${token}` } });
    setHistory(await resp.json());
    setTab('history');
    setLoading(false);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardCheck className="w-5 h-5 text-blue-500" />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">阶段检测</h1>
        <div className="ml-auto flex gap-2">
          <button onClick={() => { setExam(null); setResult(null); setTab('new'); }} className={`px-3 py-1 text-xs rounded-lg ${tab === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>模考</button>
          <button onClick={loadHistory} className={`px-3 py-1 text-xs rounded-lg ${tab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>历史</button>
        </div>
      </div>

      {loading && <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>}

      {!exam && !loading && tab === 'new' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-6 space-y-4">
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm">
            <option value="math">数学</option><option value="ds">数据结构</option><option value="arch">组成原理</option><option value="net">计算机网络</option><option value="os">操作系统</option>
          </select>
          <select value={phase} onChange={(e) => setPhase(e.target.value)} className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm">
            <option value="base">基础阶段</option><option value="强化">强化阶段</option><option value="冲刺">冲刺阶段</option>
          </select>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">题目数</label>
              <input type="number" value={qCount} onChange={(e) => setQCount(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">时长（分钟）</label>
              <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm" />
            </div>
          </div>
          <button onClick={startExam} className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">开始模考</button>
        </div>
      )}

      {exam && !result && !loading && (
        <div>
          <div className="sticky top-14 z-10 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-2 flex items-center gap-3 mb-4">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className={`font-mono text-lg ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-700 dark:text-gray-300'}`}>{formatTime(timeLeft)}</span>
            <span className="text-xs text-gray-400">{exam.phase_name} · {exam.subject} · {exam.total}题</span>
            <button onClick={handleSubmit} className="ml-auto px-3 py-1 text-xs rounded-lg bg-blue-500 text-white hover:bg-blue-600">交卷</button>
          </div>
          <div className="space-y-4">
            {exam.questions.map((q: any, i: number) => (
              <div key={q.id} className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{i + 1}. {q.question}</p>
                <span className="text-xs text-gray-400 mb-2 block">{q.chapter} · {q.difficulty}</span>
                {q.options?.length > 0 ? (
                  <div className="space-y-1.5">
                    {q.options.map((opt: string, oi: number) => (
                      <label key={oi} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer ${answers[q.id] === String.fromCharCode(65 + oi) ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200' : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100'}`}>
                        <input type="radio" name={q.id} value={String.fromCharCode(65 + oi)} checked={answers[q.id] === String.fromCharCode(65 + oi)} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} className="accent-blue-500" />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea value={answers[q.id] || ''} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm outline-none" rows={2} />
                )}
              </div>
            ))}
            <button onClick={handleSubmit} disabled={Object.keys(answers).length < exam.total * 0.5}
              className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:bg-gray-300 transition-colors">交卷</button>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-6 text-center">
            <div className={`text-4xl font-bold mb-2 ${result.score >= 80 ? 'text-green-500' : result.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>{result.score}分</div>
            <p className="text-sm text-gray-400">正确 {result.correct}/{result.total}</p>
            {result.improvement !== null && (
              <p className={`text-sm mt-1 ${result.improvement >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {result.improvement >= 0 ? '↑' : '↓'} 较上次{Math.abs(result.improvement)}分
              </p>
            )}
          </div>

          {result.chapter_stats && Object.keys(result.chapter_stats).length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4">
              <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">章节分析</h2>
              <div className="space-y-2">
                {Object.entries(result.chapter_stats).map(([ch, st]: any) => (
                  <div key={ch}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{ch}</span>
                      <span className="text-gray-400">{st.correct}/{st.total}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${st.correct / st.total >= 0.8 ? 'bg-green-500' : st.correct / st.total >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${st.correct / Math.max(st.total, 1) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => { setExam(null); setResult(null); }} className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">再测一次</button>
            <button onClick={loadHistory} className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 font-medium hover:bg-gray-200 transition-colors">查看历史</button>
          </div>
        </div>
      )}

      {tab === 'history' && !loading && (
        <div className="space-y-3">
          {history.length === 0 ? <p className="text-sm text-gray-400 text-center py-8">暂无记录</p> : (
            history.map((h: any) => (
              <div key={h.id} className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4 flex items-center gap-4">
                <div className={`text-lg font-bold ${h.score >= 80 ? 'text-green-500' : h.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>{h.score}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">{h.subject}</p>
                  <p className="text-xs text-gray-400">{h.correct}/{h.total} 正确 · {new Date(h.created_at).toLocaleDateString()}</p>
                </div>
                <BarChart3 className="w-4 h-4 text-gray-300" />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}