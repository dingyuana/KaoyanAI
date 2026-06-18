'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { generatePlan, fetchActivePlan, fetchTodayTasks, updateTask } from '@/lib/api';
import { Calendar, Loader2, Check, ChevronRight, Target, Clock, BookOpen } from 'lucide-react';

export default function PlanPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [plan, setPlan] = useState<any>(null);
  const [todayTasks, setTodayTasks] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState('math');
  const [targetScore, setTargetScore] = useState(120);
  const [dailyMinutes, setDailyMinutes] = useState(120);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [p, t] = await Promise.all([
        fetchActivePlan(token!).catch(() => null),
        fetchTodayTasks(token!).catch(() => null),
      ]);
      setPlan(p);
      setTodayTasks(t);
    } catch {}
    setLoading(false);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    const data = await generatePlan(token!, subject, targetScore, dailyMinutes);
    setPlan(data);
    await loadData();
    setGenerating(false);
  };

  const handleToggleTask = async (taskId: number, done: boolean) => {
    await updateTask(token!, taskId, done);
    await loadData();
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-blue-500" />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">学习计划</h1>
        <button onClick={loadData} className="ml-auto p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"><Loader2 className="w-4 h-4" /></button>
      </div>

      {!plan ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-6">
          <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">生成学习计划</h2>
          <div className="space-y-4">
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm">
              <option value="math">数学</option><option value="ds">数据结构</option><option value="arch">组成原理</option><option value="net">计算机网络</option><option value="os">操作系统</option>
            </select>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">目标分数</label>
              <input type="number" value={targetScore} onChange={(e) => setTargetScore(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">每日学习时间（分钟）</label>
              <input type="number" value={dailyMinutes} onChange={(e) => setDailyMinutes(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm" />
            </div>
            <button onClick={handleGenerate} disabled={generating}
              className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:bg-gray-300 transition-colors flex items-center justify-center gap-2">
              {generating && <Loader2 className="w-4 h-4 animate-spin" />} 生成计划
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {plan.phase_name || plan.phase} · {plan.subject}
                </p>
                <p className="text-xs text-gray-400">目标 {plan.target_score}分 · 每日{plan.daily_minutes}分钟 · {plan.task_count}个任务</p>
              </div>
              <div className="text-lg font-bold text-blue-500">{Math.round(plan.progress || 0)}%</div>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${plan.progress || 0}%` }} />
            </div>
            <button onClick={() => { setPlan(null); }} className="mt-3 text-xs text-gray-400 hover:text-red-500">重新生成</button>
          </div>

          {todayTasks && todayTasks.tasks?.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" /> 今日任务（预计{todayTasks.total_minutes}分钟）
              </h2>
              <div className="space-y-2">
                {todayTasks.tasks.map((t: any) => (
                  <div key={t.id} className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-3 flex items-center gap-3">
                    <button onClick={() => handleToggleTask(t.id, true)} className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center hover:border-blue-400 transition-colors flex-shrink-0">
                      <Check className="w-3 h-3 text-transparent" />
                    </button>
                    <BookOpen className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{t.knowledge_point}</span>
                    <span className="text-xs text-gray-400">{t.estimated_minutes}分钟</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500">{t.task_type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {plan.tasks?.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">全部任务</h2>
              <div className="space-y-1.5">
                {plan.tasks.filter((t: any) => !t.is_completed).slice(0, 10).map((t: any) => (
                  <div key={t.id} className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 py-1.5 px-2">
                    <ChevronRight className="w-3 h-3" />
                    <span>{t.knowledge_point}</span>
                    <span className="ml-auto text-xs">{t.estimated_minutes}分钟</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}