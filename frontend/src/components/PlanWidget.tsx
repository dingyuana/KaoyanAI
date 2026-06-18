'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { fetchPlanSummary, updateTask, type PlanSummary } from '@/lib/api';
import {
  Calendar, Clock, CheckCircle2, ChevronRight, Sparkles, Target,
  TrendingUp, BookOpen, Loader2,
} from 'lucide-react';

const PHASE_COLORS: Record<string, string> = {
  base: 'var(--ds-tag-p0)',
  强化: 'var(--ds-status-bias)',
  冲刺: 'var(--ds-status-done)',
};

/**
 * 首页醒目计划小部件：日/周/月三段聚合
 * - 无计划：显示「创建计划」CTA 卡片
 * - 有计划：显示今日任务 + 本周进度 + 本月完成度
 */
export function PlanWidget() {
  const { user, token } = useAuth();
  const [data, setData] = useState<PlanSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<number | null>(null);

  useEffect(() => {
    if (!user || !token) return;
    let alive = true;
    setLoading(true);
    fetchPlanSummary(token)
      .then((d) => { if (alive) setData(d); })
      .catch(() => { if (alive) setData(null); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [user, token]);

  if (loading) {
    return (
      <section className="ds-card bg-[var(--ds-bg-elevated)] p-6">
        <div className="flex items-center justify-center py-6 gap-2 text-sm text-[var(--ds-text-muted)]">
          <Loader2 className="w-4 h-4 animate-spin" />
          加载计划数据…
        </div>
      </section>
    );
  }

  if (!data || !data.has_plan) {
    return <NoPlanCTA hint={data?.hint} />;
  }

  return (
    <HasPlanSummary
      data={data}
      onToggle={async (taskId, done) => {
        setToggling(taskId);
        try {
          await updateTask(token!, taskId, done);
          const fresh = await fetchPlanSummary(token!);
          setData(fresh);
        } finally {
          setToggling(null);
        }
      }}
      toggling={toggling}
    />
  );
}

function NoPlanCTA({ hint }: { hint?: string }) {
  return (
    <Link href="/plan" className="block">
      <section
        className="ds-card p-6 md:p-8 relative overflow-hidden"
        style={{
          background: 'var(--ds-grad-plan)',
        }}
      >
        <div
          className="absolute right-4 top-4 w-20 h-20 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="flex items-start gap-4 relative">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.6)' }}>
            <Sparkles className="w-6 h-6" style={{ color: 'var(--ds-icon-plan)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[18px] font-semibold" style={{ color: 'var(--ds-text-primary)' }}>
                个性学习计划
              </h3>
              <span className="ds-tag ds-tag-p0">P0</span>
            </div>
            <p className="text-[14px] mb-4" style={{ color: 'var(--ds-text-secondary)' }}>
              {hint || '生成专属学习计划，让每日复习有节奏'}
            </p>
            <div
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-medium"
              style={{ background: 'var(--ds-text-primary)', color: 'var(--ds-bg-elevated)' }}
            >
              立即生成计划 <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

function HasPlanSummary({
  data, onToggle, toggling,
}: {
  data: PlanSummary;
  onToggle: (taskId: number, done: boolean) => void;
  toggling: number | null;
}) {
  const { today, week, month, overall, phase, phase_name, target_score, daily_minutes, subject } = data;
  const phaseColor = PHASE_COLORS[phase || 'base'] || 'var(--ds-tag-p0)';

  return (
    <section className="space-y-4">
      {/* 头部：计划概要 */}
      <Link href="/plan" className="block">
        <div
          className="ds-card p-5 relative overflow-hidden"
          style={{ background: 'var(--ds-grad-plan)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.6)' }}
            >
              <Target className="w-5 h-5" style={{ color: 'var(--ds-icon-plan)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15px] font-semibold" style={{ color: 'var(--ds-text-primary)' }}>
                  {subject} · {phase_name}
                </span>
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background: phaseColor, color: '#fff' }}
                >
                  目标 {target_score} 分
                </span>
              </div>
              <div className="flex items-center gap-3 text-[12px] mt-0.5" style={{ color: 'var(--ds-text-secondary)' }}>
                <span>每日 {daily_minutes} 分钟</span>
                <span>·</span>
                <span>总进度 {overall?.progress ?? 0}%</span>
                <span>·</span>
                <span>{overall?.completed ?? 0}/{overall?.total ?? 0} 任务</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ color: 'var(--ds-icon-plan)' }}>
                {Math.round(overall?.progress ?? 0)}<span className="text-sm">%</span>
              </div>
              <div className="text-[10px]" style={{ color: 'var(--ds-text-muted)' }}>总进度</div>
            </div>
          </div>
          <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${overall?.progress ?? 0}%`, background: phaseColor }}
            />
          </div>
        </div>
      </Link>

      {/* 今日 / 本周 / 本月 三栏 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 今日任务 */}
        <TodayCard today={today} onToggle={onToggle} toggling={toggling} />
        {/* 本周视图 */}
        <WeekCard week={week} />
        {/* 本月统计 */}
        <MonthCard month={month} overall={overall} />
      </div>

      {/* 今日任务详情列表 */}
      {today && today.tasks.length > 0 && (
        <Link href="/plan" className="block">
          <div className="ds-card bg-[var(--ds-bg-elevated)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4" style={{ color: 'var(--ds-text-secondary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--ds-text-primary)' }}>
                今日 {today.total} 个任务 · 预计 {today.minutes} 分钟
              </span>
              <span className="ml-auto text-[11px]" style={{ color: 'var(--ds-text-muted)' }}>
                点击查看全部 →
              </span>
            </div>
            <div className="space-y-1.5">
              {today.tasks.slice(0, 4).map((t) => (
                <div
                  key={t.id}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(t.id, !t.is_completed); }}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl transition-colors"
                  style={{ background: t.is_completed ? 'rgba(84,197,168,0.08)' : 'rgba(0,0,0,0.02)' }}
                >
                  <button
                    type="button"
                    aria-label={t.is_completed ? '标记为未完成' : '标记为完成'}
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      borderColor: t.is_completed ? 'var(--ds-status-done)' : 'var(--ds-text-muted)',
                      background: t.is_completed ? 'var(--ds-status-done)' : 'transparent',
                    }}
                  >
                    {t.is_completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    {toggling === t.id && <Loader2 className="w-3 h-3 animate-spin" style={{ color: 'var(--ds-text-muted)' }} />}
                  </button>
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--ds-text-muted)' }} />
                  <span
                    className="flex-1 text-sm truncate"
                    style={{
                      color: t.is_completed ? 'var(--ds-text-muted)' : 'var(--ds-text-primary)',
                      textDecoration: t.is_completed ? 'line-through' : 'none',
                    }}
                  >
                    {t.knowledge_point}
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--ds-bg-subtle)', color: 'var(--ds-text-muted)' }}
                  >
                    {t.task_type}
                  </span>
                  <span className="text-[11px] tabular-nums" style={{ color: 'var(--ds-text-muted)' }}>
                    {t.estimated_minutes}m
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Link>
      )}
    </section>
  );
}

function TodayCard({ today, onToggle, toggling }: any) {
  if (!today) return null;
  const pct = today.total > 0 ? Math.round((today.completed / today.total) * 100) : 0;
  return (
    <div
      className="ds-card p-4 relative overflow-hidden"
      style={{ background: 'var(--ds-bg-elevated)' }}
    >
      <div
        className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-20"
        style={{ background: 'var(--ds-icon-plan)' }}
        aria-hidden
      />
      <div className="flex items-center justify-between mb-2 relative">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--ds-icon-plan)' }} />
          <span className="text-[12px] font-medium" style={{ color: 'var(--ds-text-secondary)' }}>
            今日
          </span>
        </div>
        <span className="text-[10px]" style={{ color: 'var(--ds-text-muted)' }}>
          {today.date?.slice(5) || ''}
        </span>
      </div>
      <div className="flex items-baseline gap-1.5 relative">
        <span className="text-3xl font-bold" style={{ color: 'var(--ds-text-primary)' }}>
          {today.completed}
        </span>
        <span className="text-sm" style={{ color: 'var(--ds-text-muted)' }}>/ {today.total}</span>
      </div>
      <div className="text-[11px] mt-1 relative" style={{ color: 'var(--ds-text-muted)' }}>
        已完成 · 预计 {today.minutes} 分钟
      </div>
      <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: 'var(--ds-bg-subtle)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: 'var(--ds-icon-plan)' }}
        />
      </div>
    </div>
  );
}

function WeekCard({ week }: any) {
  if (!week) return null;
  const pct = week.total > 0 ? Math.round((week.completed / week.total) * 100) : 0;
  return (
    <div
      className="ds-card p-4"
      style={{ background: 'var(--ds-bg-elevated)' }}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <TrendingUp className="w-3.5 h-3.5" style={{ color: 'var(--ds-icon-plan)' }} />
        <span className="text-[12px] font-medium" style={{ color: 'var(--ds-text-secondary)' }}>
          本周
        </span>
      </div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-3xl font-bold" style={{ color: 'var(--ds-text-primary)' }}>
          {week.completed}
        </span>
        <span className="text-sm" style={{ color: 'var(--ds-text-muted)' }}>/ {week.total}</span>
        <span className="text-[10px] ml-auto" style={{ color: 'var(--ds-text-muted)' }}>
          {pct}%
        </span>
      </div>
      {/* 7-day grid */}
      <div className="grid grid-cols-7 gap-0.5 mt-2">
        {week.grid.map((d: any) => {
          const dayPct = d.total > 0 ? d.completed / d.total : 0;
          const isToday = d.is_today;
          return (
            <div key={d.date} className="flex flex-col items-center gap-0.5">
              <span
                className="text-[9px]"
                style={{
                  color: isToday ? 'var(--ds-icon-plan)' : 'var(--ds-text-muted)',
                  fontWeight: isToday ? 600 : 400,
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
                  border: isToday ? '1.5px solid var(--ds-icon-plan)' : 'none',
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

function MonthCard({ month, overall }: any) {
  if (!month) return null;
  const pct = month.total > 0 ? Math.round((month.completed / month.total) * 100) : 0;
  const monthName = month.start?.slice(0, 7) || '';
  return (
    <div
      className="ds-card p-4"
      style={{ background: 'var(--ds-bg-elevated)' }}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--ds-icon-plan)' }} />
        <span className="text-[12px] font-medium" style={{ color: 'var(--ds-text-secondary)' }}>
          本月
        </span>
        <span className="text-[10px] ml-auto" style={{ color: 'var(--ds-text-muted)' }}>
          {monthName}
        </span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold" style={{ color: 'var(--ds-text-primary)' }}>
          {month.completed}
        </span>
        <span className="text-sm" style={{ color: 'var(--ds-text-muted)' }}>/ {month.total}</span>
        <span className="text-[10px] ml-auto" style={{ color: 'var(--ds-text-muted)' }}>
          {pct}%
        </span>
      </div>
      <div className="text-[11px] mt-1" style={{ color: 'var(--ds-text-muted)' }}>
        已完成 · {month.minutes} 分钟
      </div>
      <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: 'var(--ds-bg-subtle)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: 'var(--ds-icon-plan)' }}
        />
      </div>
      <div className="text-[10px] mt-1.5" style={{ color: 'var(--ds-text-muted)' }}>
        整体计划 {overall?.total} 个任务 · 已完成 {overall?.progress ?? 0}%
      </div>
    </div>
  );
}
