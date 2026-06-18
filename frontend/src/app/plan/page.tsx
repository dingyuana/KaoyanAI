'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { generatePlan, fetchPlanSummary, updateTask, type PlanSummary, type WeekDay } from '@/lib/api';
import {
  Calendar, Loader2, CheckCircle2, ChevronRight, Target, Clock, BookOpen,
  TrendingUp, Sparkles, Plus,
} from 'lucide-react';

const PHASE_COLORS: Record<string, string> = {
  base: '#3B82F6',
  强化: '#8B5CF6',
  冲刺: '#EF4444',
};

const PHASE_MILESTONES: Record<string, number> = {
  base: 33,
  强化: 66,
  冲刺: 100,
};

export default function PlanPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [summary, setSummary] = useState<PlanSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Generate form state
  const [subject, setSubject] = useState('math');
  const [targetScore, setTargetScore] = useState(120);
  const [dailyMinutes, setDailyMinutes] = useState(120);
  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const s = await fetchPlanSummary(token!).catch(() => null);
      setSummary(s);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    loadData();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    await generatePlan(token!, subject, targetScore, dailyMinutes);
    await loadData();
    setGenerating(false);
    setShowForm(false);
  };

  const handleToggleTask = async (taskId: number, done: boolean) => {
    await updateTask(token!, taskId, done);
    await loadData();
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex justify-center py-16">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-3" />
            <p className="text-sm text-gray-400">加载计划数据…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">学习计划</h1>
        <button
          onClick={loadData}
          className="ml-auto p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="刷新"
        >
          <Loader2 className="w-4 h-4" />
        </button>
      </div>

      {!summary || !summary.has_plan ? (
        <NoPlanView
          subject={subject} setSubject={setSubject}
          targetScore={targetScore} setTargetScore={setTargetScore}
          dailyMinutes={dailyMinutes} setDailyMinutes={setDailyMinutes}
          generating={generating} handleGenerate={handleGenerate}
          showForm={showForm} setShowForm={setShowForm}
        />
      ) : (
        <HasPlanView
          data={summary}
          onToggle={handleToggleTask}
          onRegenerate={() => { setSummary(null); setShowForm(true); }}
        />
      )}
    </div>
  );
}

// ── No Plan View ──────────────────────────────────────────

function NoPlanView({
  subject, setSubject, targetScore, setTargetScore,
  dailyMinutes, setDailyMinutes, generating, handleGenerate,
  showForm, setShowForm,
}: any) {
  return (
    <div className="space-y-4">
      {/* Hero CTA */}
      <section
        className="ds-card p-8 relative overflow-hidden text-center"
        style={{ background: 'var(--ds-grad-plan)' }}
      >
        <div
          className="absolute right-8 top-8 w-32 h-32 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)' }}
          aria-hidden
        />
        <Sparkles className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--ds-icon-plan)' }} />
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--ds-text-primary)' }}>
          还没有学习计划
        </h2>
        <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--ds-text-secondary)' }}>
          根据你的目标分数和可用时间，AI 将为你生成专属复习计划。每日任务明确，进度一目了然。
        </p>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg"
            style={{ background: 'var(--ds-text-primary)', color: 'var(--ds-bg-elevated)' }}
          >
            <Plus className="w-4 h-4" /> 创建学习计划
          </button>
        ) : (
          <div className="max-w-sm mx-auto text-left space-y-4">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border text-sm"
              style={{ borderColor: 'rgba(0,0,0,0.1)', background: 'var(--ds-bg-elevated)', color: 'var(--ds-text-primary)' }}
            >
              <option value="math">数学</option>
              <option value="ds">数据结构</option>
              <option value="arch">组成原理</option>
              <option value="net">计算机网络</option>
              <option value="os">操作系统</option>
            </select>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs mb-1 block" style={{ color: 'var(--ds-text-secondary)' }}>目标分数</label>
                <input
                  type="number" value={targetScore}
                  onChange={(e) => setTargetScore(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border text-sm"
                  style={{ borderColor: 'rgba(0,0,0,0.1)', background: 'var(--ds-bg-elevated)', color: 'var(--ds-text-primary)' }}
                />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: 'var(--ds-text-secondary)' }}>每日分钟</label>
                <input
                  type="number" value={dailyMinutes}
                  onChange={(e) => setDailyMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border text-sm"
                  style={{ borderColor: 'rgba(0,0,0,0.1)', background: 'var(--ds-bg-elevated)', color: 'var(--ds-text-primary)' }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex-1 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
                style={{ background: 'var(--ds-text-primary)', color: 'var(--ds-bg-elevated)' }}
              >
                {generating && <Loader2 className="w-4 h-4 animate-spin" />}
                生成计划
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ color: 'var(--ds-text-secondary)' }}
              >
                取消
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// ── Has Plan View ──────────────────────────────────────────

function HasPlanView({
  data, onToggle, onRegenerate,
}: {
  data: PlanSummary;
  onToggle: (taskId: number, done: boolean) => void;
  onRegenerate: () => void;
}) {
  const { today, week, month, overall, phase, phase_name, target_score, daily_minutes, subject } = data;
  const phaseColor = PHASE_COLORS[phase || 'base'] || '#3B82F6';
  const progress = overall?.progress ?? 0;
  const phaseKey = (phase || 'base') as keyof typeof PHASE_COLORS;

  // Find next milestone
  const milestones = [33, 66, 100];
  const nextMilestone = milestones.find((m) => progress < m) || 100;

  return (
    <div className="space-y-5">
      {/* ── Phase overview card ── */}
      <div
        className="ds-card p-5 md:p-6 relative overflow-hidden"
        style={{ background: 'var(--ds-grad-plan)' }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.6)' }}
          >
            <Target className="w-6 h-6" style={{ color: 'var(--ds-icon-plan)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h2 className="text-lg font-bold" style={{ color: 'var(--ds-text-primary)' }}>
                {subject === 'math' ? '数学' : subject} · {phase_name || phase}
              </h2>
              <span
                className="text-[11px] px-2 py-0.5 rounded-full font-medium text-white"
                style={{ background: phaseColor }}
              >
                目标 {target_score} 分
              </span>
            </div>
            <p className="text-[13px]" style={{ color: 'var(--ds-text-secondary)' }}>
              每日 {daily_minutes} 分钟 · 共 {overall?.total ?? 0} 个任务 · 已完成 {overall?.completed ?? 0}
            </p>
          </div>
        </div>

        {/* Progress bar with milestone markers */}
        <div className="mt-5 relative">
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.08)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 relative"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${phaseColor}, ${phaseColor}dd)` }}
            />
          </div>
          {/* Milestone dots */}
          <div className="flex justify-between mt-1.5 px-0.5">
            {milestones.map((m) => (
              <div key={m} className="flex flex-col items-center">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: progress >= m ? phaseColor : 'rgba(0,0,0,0.1)',
                  }}
                />
                <span className="text-[9px] mt-0.5" style={{ color: 'var(--ds-text-muted)' }}>
                  {m}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs" style={{ color: 'var(--ds-text-muted)' }}>
            下一里程碑：完成至 {nextMilestone}%
          </span>
          <div className="flex gap-2">
            <button
              onClick={onRegenerate}
              className="text-[11px] px-2.5 py-1 rounded-lg transition-colors"
              style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--ds-text-secondary)' }}
            >
              重新生成
            </button>
          </div>
        </div>
      </div>

      {/* ── Today / Week / Month 3-column stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today */}
        <TodayStatsCard today={today} />
        {/* Week grid */}
        <WeekGridCard week={week} />
        {/* Month */}
        <MonthStatsCard month={month} overall={overall} phaseColor={phaseColor} />
      </div>

      {/* ── Today task detail list ── */}
      {today && today.tasks.length > 0 && (
        <div
          className="ds-card p-4"
          style={{ background: 'var(--ds-bg-elevated)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4" style={{ color: 'var(--ds-icon-plan)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--ds-text-primary)' }}>
              今日任务
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(59,130,246,0.1)', color: phaseColor }}>
              {today.completed}/{today.total} · {today.minutes}分钟
            </span>
          </div>
          <div className="space-y-1">
            {today.tasks.map((t) => (
              <TaskRow key={t.id} task={t} onToggle={onToggle} />
            ))}
          </div>
        </div>
      )}

      {/* ── This week's tasks (grouped by date) ── */}
      {week && week.grid.length > 0 && (
        <div
          className="ds-card p-4"
          style={{ background: 'var(--ds-bg-elevated)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4" style={{ color: 'var(--ds-icon-plan)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--ds-text-primary)' }}>
              本周概览
            </span>
            <span className="text-xs ml-auto" style={{ color: 'var(--ds-text-muted)' }}>
              {week.start?.slice(5)} ~ {week.end?.slice(5)}
            </span>
          </div>
          <p className="text-[12px] mb-3" style={{ color: 'var(--ds-text-muted)' }}>
            已安排 {week.total} 个任务，已完成 {week.completed} · 共 {week.minutes} 分钟
          </p>
          {/* Day-by-day summary grid */}
          <div className="space-y-1.5">
            {week.grid.filter((d: WeekDay) => d.total > 0).map((d: WeekDay) => {
              const pct = d.total > 0 ? Math.round((d.completed / d.total) * 100) : 0;
              return (
                <div
                  key={d.date}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl"
                  style={{
                    background: d.is_today ? 'rgba(59,130,246,0.06)' : 'transparent',
                    border: d.is_today ? '1px solid rgba(59,130,246,0.15)' : 'none',
                  }}
                >
                  <span
                    className="text-[11px] font-medium w-12"
                    style={{ color: d.is_today ? 'var(--ds-icon-plan)' : 'var(--ds-text-secondary)' }}
                  >
                    {d.weekday}
                  </span>
                  <span className="text-[10px] w-10" style={{ color: 'var(--ds-text-muted)' }}>
                    {d.date.slice(5)}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--ds-bg-subtle)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: phaseColor }}
                    />
                  </div>
                  <span className="text-[11px] tabular-nums w-12 text-right" style={{ color: 'var(--ds-text-muted)' }}>
                    {d.completed}/{d.total}
                  </span>
                  <span className="text-[10px] tabular-nums w-10 text-right" style={{ color: 'var(--ds-text-muted)' }}>
                    {d.minutes}m
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Date-grouped full task list ── */}
      {week && week.grid.length > 0 && (
        <div
          className="ds-card p-4"
          style={{ background: 'var(--ds-bg-elevated)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4" style={{ color: 'var(--ds-icon-plan)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--ds-text-primary)' }}>
              每日任务详情
            </span>
          </div>
          {week.grid.filter((d: WeekDay) => d.total > 0).map((d: WeekDay) => (
            <DayGroup
              key={d.date}
              day={d}
              isToday={d.is_today}
              todayTasks={d.date === today?.date ? today?.tasks : undefined}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────

function TaskRow({ task, onToggle }: { task: any; onToggle: (id: number, done: boolean) => void }) {
  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
      style={{
        background: task.is_completed ? 'rgba(84,197,168,0.08)' : 'transparent',
      }}
      onClick={() => onToggle(task.id, !task.is_completed)}
    >
      <button
        type="button"
        aria-label={task.is_completed ? '标记为未完成' : '标记为完成'}
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
        style={{
          borderColor: task.is_completed ? '#54C5A8' : 'var(--ds-text-muted)',
          background: task.is_completed ? '#54C5A8' : 'transparent',
        }}
      >
        {task.is_completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
      </button>
      <BookOpen className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--ds-text-muted)' }} />
      <span
        className="flex-1 text-sm truncate"
        style={{
          color: task.is_completed ? 'var(--ds-text-muted)' : 'var(--ds-text-primary)',
          textDecoration: task.is_completed ? 'line-through' : 'none',
        }}
      >
        {task.knowledge_point}
      </span>
      <span
        className="text-[10px] px-1.5 py-0.5 rounded"
        style={{ background: 'var(--ds-bg-subtle)', color: 'var(--ds-text-muted)' }}
      >
        {task.task_type}
      </span>
      <span className="text-[11px] tabular-nums" style={{ color: 'var(--ds-text-muted)' }}>
        {task.estimated_minutes}m
      </span>
    </div>
  );
}

function TodayStatsCard({ today }: { today: PlanSummary['today'] }) {
  if (!today) return null;
  const pct = today.total > 0 ? Math.round((today.completed / today.total) * 100) : 0;
  return (
    <div className="ds-card p-4 relative overflow-hidden" style={{ background: 'var(--ds-bg-elevated)' }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" style={{ color: 'var(--ds-icon-plan)' }} />
          <span className="text-[12px] font-medium" style={{ color: 'var(--ds-text-secondary)' }}>今日</span>
        </div>
        <span className="text-[10px]" style={{ color: 'var(--ds-text-muted)' }}>{today.date?.slice(5)}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold" style={{ color: 'var(--ds-text-primary)' }}>{today.completed}</span>
        <span className="text-sm" style={{ color: 'var(--ds-text-muted)' }}>/ {today.total}</span>
      </div>
      <div className="text-[11px] mt-1" style={{ color: 'var(--ds-text-muted)' }}>已完成 · 预计 {today.minutes} 分钟</div>
      <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: 'var(--ds-bg-subtle)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'var(--ds-icon-plan)' }} />
      </div>
    </div>
  );
}

function WeekGridCard({ week }: { week: PlanSummary['week'] }) {
  if (!week) return null;
  const pct = week.total > 0 ? Math.round((week.completed / week.total) * 100) : 0;
  return (
    <div className="ds-card p-4" style={{ background: 'var(--ds-bg-elevated)' }}>
      <div className="flex items-center gap-1.5 mb-2">
        <TrendingUp className="w-3.5 h-3.5" style={{ color: 'var(--ds-icon-plan)' }} />
        <span className="text-[12px] font-medium" style={{ color: 'var(--ds-text-secondary)' }}>本周</span>
      </div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-3xl font-bold" style={{ color: 'var(--ds-text-primary)' }}>{week.completed}</span>
        <span className="text-sm" style={{ color: 'var(--ds-text-muted)' }}>/ {week.total}</span>
        <span className="text-[10px] ml-auto" style={{ color: 'var(--ds-text-muted)' }}>{pct}%</span>
      </div>
      {/* 7-day grid */}
      <div className="grid grid-cols-7 gap-0.5 mt-2">
        {week.grid.map((d: WeekDay) => {
          const dayPct = d.total > 0 ? d.completed / d.total : 0;
          return (
            <div key={d.date} className="flex flex-col items-center gap-0.5">
              <span
                className="text-[9px]"
                style={{
                  color: d.is_today ? 'var(--ds-icon-plan)' : 'var(--ds-text-muted)',
                  fontWeight: d.is_today ? 600 : 400,
                }}
              >
                {d.weekday.charAt(1)}
              </span>
              <div
                className="w-full aspect-square rounded-md flex items-center justify-center text-[9px] font-medium relative overflow-hidden"
                style={{
                  background: d.total === 0
                    ? 'var(--ds-bg-subtle)'
                    : `color-mix(in srgb, var(--ds-icon-plan) ${dayPct * 100}%, var(--ds-bg-subtle))`,
                  color: dayPct > 0.5 ? '#fff' : 'var(--ds-text-secondary)',
                  border: d.is_today ? '1.5px solid var(--ds-icon-plan)' : 'none',
                }}
              >
                {d.total > 0 ? Math.min(d.total, 9) : '·'}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-[10px] mt-2" style={{ color: 'var(--ds-text-muted)' }}>
        {week.minutes} 分钟 · {week.start?.slice(5)} ~ {week.end?.slice(5)}
      </div>
    </div>
  );
}

function MonthStatsCard({ month, overall, phaseColor }: { month: PlanSummary['month']; overall: PlanSummary['overall']; phaseColor: string }) {
  if (!month) return null;
  const pct = month.total > 0 ? Math.round((month.completed / month.total) * 100) : 0;
  return (
    <div className="ds-card p-4" style={{ background: 'var(--ds-bg-elevated)' }}>
      <div className="flex items-center gap-1.5 mb-2">
        <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--ds-icon-plan)' }} />
        <span className="text-[12px] font-medium" style={{ color: 'var(--ds-text-secondary)' }}>本月</span>
        <span className="text-[10px] ml-auto" style={{ color: 'var(--ds-text-muted)' }}>{month.start?.slice(0, 7)}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold" style={{ color: 'var(--ds-text-primary)' }}>{month.completed}</span>
        <span className="text-sm" style={{ color: 'var(--ds-text-muted)' }}>/ {month.total}</span>
        <span className="text-[10px] ml-auto" style={{ color: 'var(--ds-text-muted)' }}>{pct}%</span>
      </div>
      <div className="text-[11px] mt-1" style={{ color: 'var(--ds-text-muted)' }}>已完成 · {month.minutes} 分钟</div>
      <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: 'var(--ds-bg-subtle)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: phaseColor }} />
      </div>
      <div className="text-[10px] mt-1.5" style={{ color: 'var(--ds-text-muted)' }}>
        整体计划 {overall?.total} 个任务 · 已完成 {overall?.progress ?? 0}%
      </div>
    </div>
  );
}

function DayGroup({ day, isToday, todayTasks, onToggle }: {
  day: WeekDay;
  isToday: boolean;
  todayTasks?: NonNullable<PlanSummary['today']>['tasks'];
  onToggle: (id: number, done: boolean) => void;
}) {
  // For today, use the detailed tasks from today data
  const tasks: NonNullable<PlanSummary['today']>['tasks'] = isToday && todayTasks ? todayTasks : [];

  // For future/past days, we only show the count since detailed data isn't available per-day from the current API
  return (
    <div
      className="mb-2 last:mb-0"
      style={{
        borderLeft: isToday ? `2px solid var(--ds-icon-plan)` : '1px solid var(--ds-bg-subtle)',
        paddingLeft: '12px',
        marginLeft: '4px',
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className="text-[11px] font-medium"
          style={{ color: isToday ? 'var(--ds-icon-plan)' : 'var(--ds-text-secondary)' }}
        >
          {day.weekday} {day.date.slice(5)}
        </span>
        {isToday && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-full text-white" style={{ background: 'var(--ds-icon-plan)' }}>
            今天
          </span>
        )}
        <span className="text-[10px] ml-auto" style={{ color: 'var(--ds-text-muted)' }}>
          {day.completed}/{day.total} · {day.minutes}m
        </span>
      </div>

      {/* Show task rows for today, count for other days */}
      {isToday && tasks.length > 0 ? (
        <div className="space-y-0.5">
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} onToggle={onToggle} />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3 py-1.5">
          <BookOpen className="w-3 h-3" style={{ color: 'var(--ds-text-muted)' }} />
          <span className="text-[11px]" style={{ color: 'var(--ds-text-muted)' }}>
            {day.total} 个任务
            {day.completed > 0 && `（${day.completed} 已完成）`}
          </span>
        </div>
      )}
    </div>
  );
}
