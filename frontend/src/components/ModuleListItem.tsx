'use client';

import Link from 'next/link';
import { Check, AlertTriangle, Pause, ArrowRight } from 'lucide-react';
import type { ModuleItem } from '@/lib/modules';
import { BiasPopover } from './BiasPopover';

interface ModuleListItemProps {
  module: ModuleItem;
}

const STATUS_DOT = {
  done: { Icon: Check, color: 'var(--ds-status-done)', label: '已完成' },
  bias: { Icon: AlertTriangle, color: 'var(--ds-status-bias)', label: '存在偏差' },
  paused: { Icon: Pause, color: 'var(--ds-status-paused)', label: '已暂停' },
} as const;

export function ModuleListItem({ module: m }: ModuleListItemProps) {
  const dot = STATUS_DOT[m.status];
  const isPaused = m.status === 'paused';
  const isBias = m.status === 'bias';
  const Wrapper: any = m.href ? Link : 'div';
  const wrapperProps = m.href ? { href: m.href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`ds-card flex items-center gap-4 p-4 ${isPaused ? 'ds-card-paused' : ''} ${
        m.href ? 'cursor-pointer' : ''
      }`}
      style={{
        background: 'var(--ds-bg-elevated)',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* 优先级色条 */}
      <div
        className="w-1.5 self-stretch rounded-full"
        style={{
          background: m.priority === 'P0' ? 'var(--ds-tag-p0)' : 'var(--ds-tag-p1)',
        }}
        aria-hidden
      />

      {/* 名称 / 描述 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-[15px] font-medium" style={{ color: 'var(--ds-text-primary)' }}>
            {m.name}
          </h3>
          <span className={`ds-tag ${m.priority === 'P0' ? 'ds-tag-p0' : 'ds-tag-p1'}`}>
            {m.priority}
          </span>
        </div>
        <p className="text-[12px] truncate" style={{ color: 'var(--ds-text-secondary)' }}>
          {m.description}
        </p>
      </div>

      {/* 状态 */}
      <div
        className="hidden sm:flex items-center gap-1 text-[12px] font-medium px-2.5 py-1 rounded-full"
        style={{
          color: dot.color,
          background: 'rgba(0,0,0,0.03)',
        }}
      >
        <dot.Icon className="w-3 h-3" />
        {dot.label}
        {m.completion > 0 && ` · ${m.completion}%`}
      </div>

      {/* 备注 / 偏差提示 */}
      <div
        className="hidden md:block text-[12px] max-w-[280px] truncate"
        style={{ color: 'var(--ds-text-muted)' }}
      >
        {isBias && m.biasDetail && m.optimizationPlan ? (
          <BiasPopover
            detail={m.biasDetail}
            optimization={m.optimizationPlan}
            trigger={<span className="truncate">{m.bottomNote}</span>}
          />
        ) : (
          <span className="truncate block">{m.bottomNote}</span>
        )}
      </div>

      {/* 跳转箭头 */}
      {m.href && (
        <ArrowRight
          className="w-4 h-4 flex-shrink-0"
          style={{ color: 'var(--ds-text-muted)' }}
        />
      )}
    </Wrapper>
  );
}
