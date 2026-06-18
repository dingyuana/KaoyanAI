'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Sparkles, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/lib/use-theme';
import { MODULES, filterModules, countByStatus, type FilterKey } from '@/lib/modules';
import { FilterTabs } from '@/components/FilterTabs';
import { ViewSwitcher, type ViewMode } from '@/components/ViewSwitcher';
import { ModuleCard } from '@/components/ModuleCard';
import { ModuleListItem } from '@/components/ModuleListItem';

export default function DesignOverviewPage() {
  const { theme, toggle, ready } = useTheme();
  const [filter, setFilter] = useState<FilterKey>('all');
  const [view, setView] = useState<ViewMode>('card');

  // 视图模式持久化
  useEffect(() => {
    const stored = localStorage.getItem('kaoyan_design_view') as ViewMode | null;
    if (stored === 'card' || stored === 'list') setView(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem('kaoyan_design_view', view);
  }, [view]);

  const counts = useMemo(() => {
    const c = countByStatus(MODULES);
    return {
      all: c.total,
      P0: c.p0,
      P1: c.p1,
      paused: c.paused,
    } as Record<FilterKey, number>;
  }, []);

  const visible = useMemo(() => filterModules(MODULES, filter), [filter]);
  const c = countByStatus(MODULES);

  return (
    <div
      className="min-h-screen transition-colors"
      style={{ background: 'var(--ds-bg)', color: 'var(--ds-text-primary)' }}
    >
      {/* 水印 */}
      <div
        className="fixed top-5 right-6 text-[11px] font-medium tracking-[0.3em] pointer-events-none select-none z-30"
        style={{ color: 'var(--ds-text-muted)', opacity: 0.4 }}
        aria-hidden
      >
        FRTOUR DESIGN
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14">
        {/* 顶部：返回 + 主题切换 */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/kaoyan"
            className="inline-flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity"
            style={{ color: 'var(--ds-text-secondary)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          {ready && (
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
              className="ds-button w-10 h-10 flex items-center justify-center"
              style={{
                background: 'var(--ds-bg-elevated)',
                boxShadow: 'var(--ds-shadow-card)',
                borderRadius: 'var(--ds-radius-button)',
              }}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" style={{ color: 'var(--ds-text-primary)' }} />
              ) : (
                <Moon className="w-4 h-4" style={{ color: 'var(--ds-text-primary)' }} />
              )}
            </button>
          )}
        </div>

        {/* 标题区 */}
        <header className="mb-10">
          <h1
            className="text-[36px] md:text-[40px] font-bold tracking-tight leading-tight"
            style={{ color: 'var(--ds-text-primary)' }}
          >
            前端设计
            <span
              className="block mt-3 w-16 h-1.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #86D9B8, #B0E8D3)' }}
              aria-hidden
            />
          </h1>
          <p
            className="mt-5 text-[15px] md:text-base max-w-2xl"
            style={{ color: 'var(--ds-text-secondary)' }}
          >
            自由松弛的自适应瀑布流卡片布局，所有卡片元素采用 16px-20px 超大圆角、轻薄弥散阴影，奶白色(#FAFAF8) 基底，适配考研系统年轻化视觉需求
          </p>

          {/* 统计 */}
          <div
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]"
            style={{ color: 'var(--ds-text-muted)' }}
          >
            <span>
              共 <strong style={{ color: 'var(--ds-text-primary)' }}>{c.total}</strong> 个模块
            </span>
            <span>·</span>
            <span>
              P0{' '}
              <strong style={{ color: 'var(--ds-tag-p0)' }}>{c.p0}</strong> · P1{' '}
              <strong style={{ color: 'var(--ds-tag-p1)' }}>{c.p1}</strong>
            </span>
            <span>·</span>
            <span>
              已完成{' '}
              <strong style={{ color: 'var(--ds-status-done)' }}>{c.done}</strong> · 待优化{' '}
              <strong style={{ color: 'var(--ds-status-bias)' }}>{c.bias}</strong> · 暂停{' '}
              <strong style={{ color: 'var(--ds-status-paused)' }}>{c.paused}</strong>
            </span>
          </div>
        </header>

        {/* 工具栏：筛选 + 视图 */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <FilterTabs value={filter} onChange={setFilter} counts={counts} />
          <ViewSwitcher value={view} onChange={setView} />
        </div>

        {/* 内容区 */}
        {visible.length === 0 ? (
          <div
            className="text-center py-20 text-sm"
            style={{ color: 'var(--ds-text-muted)' }}
          >
            <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-40" />
            没有匹配的模块
          </div>
        ) : view === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visible.map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {visible.map((m) => (
              <ModuleListItem key={m.id} module={m} />
            ))}
          </div>
        )}

        {/* 底部脚注 */}
        <footer
          className="mt-14 pt-6 border-t text-[12px] flex flex-wrap items-center justify-between gap-3"
          style={{
            color: 'var(--ds-text-muted)',
            borderColor: 'rgba(0,0,0,0.06)',
          }}
        >
          <span>
            设计系统 v0.1 · 轻治愈极简元气风 · 16-20px 超大圆角 · 弥散软阴影
          </span>
          <span>© 2026 考研智能学习助手</span>
        </footer>
      </div>
    </div>
  );
}
