'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { startDiagnosis, submitDiagnosis, fetchDiagnosisHistory } from '@/lib/api';
import { ClipboardCheck, Loader2, ChevronRight, RefreshCw } from 'lucide-react';

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
    setLoading(false);
  };

  const submit = async () => {
    setLoading(true);
    const ans = questions.map((q) => ({
      question_id: q.id,
      question: q.question,
      user_answer: answers[q.id] || '',
      correct_answer: 'A',
      type: q.type || 'choice',
      knowledge_point: q.knowledge_point,
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardCheck className="w-5 h-5 text-blue-500" />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">学习诊断</h1>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setStep('start')} className={`px-3 py-1 text-xs rounded-lg ${step === 'start' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>开始</button>
          <button onClick={loadHistory} className={`px-3 py-1 text-xs rounded-lg ${step === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>历史</button>
        </div>
      </div>

      {loading && <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>}

      {step === 'start' && !loading && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">选择学科开始诊断测试，系统将根据你的答题情况生成诊断报告。</p>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm mb-4">
            <option value="math">数学</option><option value="ds">数据结构</option><option value="arch">组成原理</option><option value="net">计算机网络</option><option value="os">操作系统</option>
          </select>
          <button onClick={start} className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">开始诊断</button>
        </div>
      )}

      {step === 'testing' && !loading && (
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={q.id} className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{i + 1}. {q.question}</p>
              {q.options?.length > 0 ? (
                <div className="space-y-2">
                  {q.options.map((opt: string, oi: number) => (
                    <label key={oi} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer transition-colors ${answers[q.id] === String.fromCharCode(65 + oi) ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200' : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      <input type="radio" name={q.id} value={String.fromCharCode(65 + oi)} checked={answers[q.id] === String.fromCharCode(65 + oi)} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} className="accent-blue-500" />
                      {opt}
                    </label>
                  ))}
                </div>
              ) : (
                <textarea value={answers[q.id] || ''} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm outline-none" rows={3} placeholder="输入你的回答..." />
              )}
              <p className="text-xs text-gray-400 mt-2">知识点：{q.knowledge_point}</p>
            </div>
          ))}
          <button onClick={submit} disabled={Object.keys(answers).length !== questions.length}
            className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:bg-gray-300 transition-colors">提交答案</button>
        </div>
      )}

      {step === 'result' && result && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-6 text-center">
            <div className={`text-4xl font-bold mb-2 ${result.score >= 80 ? 'text-green-500' : result.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>{result.score}分</div>
            <p className="text-sm text-gray-400">正确 {result.correct}/{result.total}</p>
          </div>
          {result.weak_points?.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4">
              <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">薄弱环节</h2>
              {result.weak_points.map((wp: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm py-1.5 border-b dark:border-gray-700 last:border-0">
                  <ChevronRight className="w-3 h-3 text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">{wp.knowledge_point}</span>
                  <span className="text-xs text-gray-400 ml-auto">{wp.count}次错误</span>
                </div>
              ))}
            </div>
          )}
          {result.report && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4">
              <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">诊断报告</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">{result.report}</div>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => setStep('start')} className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">再测一次</button>
            <button onClick={loadHistory} className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">查看历史</button>
          </div>
        </div>
      )}

      {step === 'history' && !loading && (
        <div className="space-y-3">
          {history.length === 0 ? <p className="text-sm text-gray-400 text-center py-8">暂无诊断记录</p> : (
            history.map((h: any) => (
              <div key={h.id} className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4 flex items-center gap-4">
                <div className={`text-lg font-bold ${h.score >= 80 ? 'text-green-500' : h.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>{h.score}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">{h.subject}</p>
                  <p className="text-xs text-gray-400">{h.correct}/{h.total} 正确 · {new Date(h.created_at).toLocaleDateString()}</p>
                </div>
                <RefreshCw className="w-4 h-4 text-gray-300" />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}