'use client';

import { useState, useRef, useEffect, useId } from 'react';

interface BiasPopoverProps {
  trigger: React.ReactNode;
  detail: string;
  optimization: string;
}

/**
 * 偏差详情气泡：
 * - trigger 悬浮 / 聚焦时显示
 * - 桌面端 hover + focus 双触发，移动端仅 focus
 * - 顶部 6px 三角箭头指向 trigger
 */
export function BiasPopover({ trigger, detail, optimization }: BiasPopoverProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="ds-popover-trigger relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-describedby={id}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 cursor-help underline decoration-dotted underline-offset-4 decoration-[var(--ds-status-bias)]/60"
        style={{ color: 'var(--ds-status-bias)' }}
      >
        {trigger}
      </button>

      {open && (
        <div
          id={id}
          role="tooltip"
          className="absolute z-50 left-0 bottom-full mb-2 w-[320px] max-w-[calc(100vw-2rem)] p-4 rounded-2xl text-left"
          style={{
            background: 'var(--ds-bg-elevated)',
            color: 'var(--ds-text-primary)',
            boxShadow: 'var(--ds-shadow-popover)',
            border: '1px solid rgba(0,0,0,0.04)',
          }}
        >
          <div className="text-xs font-semibold mb-1.5" style={{ color: 'var(--ds-status-bias)' }}>
            存在设计偏差
          </div>
          <p className="text-[13px] leading-relaxed mb-2.5" style={{ color: 'var(--ds-text-secondary)' }}>
            {detail}
          </p>
          <div className="text-xs font-semibold mb-1" style={{ color: 'var(--ds-text-primary)' }}>
            后续优化方案
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ds-text-muted)' }}>
            {optimization}
          </p>
          {/* 箭头 */}
          <span
            className="absolute left-4 -bottom-1.5 w-3 h-3 rotate-45"
            style={{ background: 'var(--ds-bg-elevated)', borderRight: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)' }}
            aria-hidden
          />
        </div>
      )}
    </div>
  );
}
