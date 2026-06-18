'use client';

import Link from 'next/link';
import { Check, AlertTriangle, Pause } from 'lucide-react';
import type { ModuleItem } from '@/lib/modules';
import { ModuleIcon } from './ModuleIcon';
import { BiasPopover } from './BiasPopover';

interface ModuleCardProps {
  module: ModuleItem;
}

const STATUS_DOT = {
  done: { Icon: Check, color: 'var(--ds-status-done)', label: '已完成' },
  bias: { Icon: AlertTriangle, color: 'var(--ds-status-bias)', label: '存在偏差' },
  paused: { Icon: Pause, color: 'var(--ds-status-paused)', label: '已暂停' },
} as const;

export function ModuleCard({ module: m }: ModuleCardProps) {
  const dot = STATUS_DOT[m.status];
  const isPaused = m.status === 'paused';
  const isBias = m.status === 'bias';
  const Wrapper: any = m.href ? Link : 'div';
  const wrapperProps = m.href ? { href: m.href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`ds-card relative block p-6 min-w-[280px] overflow-visible ${
        isPaused ? 'ds-card-paused' : ''
      } ${m.href ? 'cursor-pointer' : ''}`}
      style={{
        background: m.gradient,
        color: 'var(--ds-text-primary)',
      }}
      aria-label={`${m.name} ${m.priority} ${dot.label}`}
    >
      {/* 顶部：标题 + 优先级标签 */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0 flex-1">
          <h3
            className="text-[18px] font-medium leading-tight"
            style={{ color: 'var(--ds-text-primary)' }}
          >
            {m.name}
          </h3>
          <p
            className="text-[13px] mt-1 leading-snug"
            style={{ color: 'var(--ds-text-secondary)' }}
          >
            {m.description}
          </p>
        </div>
        <span className={`ds-tag ${m.priority === 'P0' ? 'ds-tag-p0' : 'ds-tag-p1'}`}>
          {m.priority}
        </span>
      </div>

      {/* 中部：图标 + 完成状态 */}
      <div className="flex items-center justify-between mb-5">
        <div
          className="text-[12px] font-medium px-2.5 py-1 rounded-full"
          style={{
            color: dot.color,
            background: 'rgba(255,255,255,0.55)',
          }}
        >
          <dot.Icon className="inline w-3 h-3 mr-1 -mt-0.5" />
          {dot.label}
          {m.completion > 0 && ` · ${m.completion}%`}
        </div>
        <ModuleIcon
          iconKey={m.iconKey}
          iconColor={m.iconColor}
          gradient={m.gradient}
          size={72}
        />
      </div>

      {/* 底部：备注 / 偏差提示 */}
      <div
        className="text-[12px] leading-relaxed"
        style={{ color: 'var(--ds-text-muted)' }}
      >
        {isBias && m.biasDetail && m.optimizationPlan ? (
          <BiasPopover
            detail={m.biasDetail}
            optimization={m.optimizationPlan}
            trigger={<span>{m.bottomNote}</span>}
          />
        ) : (
          m.bottomNote
        )}
      </div>

      {/* 完成态对勾标识（右下角） */}
      {m.status === 'done' && (
        <div
          className="absolute right-5 top-5 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.7)' }}
          aria-hidden
        >
          <Check className="w-4 h-4" style={{ color: 'var(--ds-status-done)' }} />
        </div>
      )}
    </Wrapper>
  );
}
