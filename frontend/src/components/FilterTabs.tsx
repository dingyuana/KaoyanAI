'use client';

import type { FilterKey } from '@/lib/modules';
import { FILTER_LABELS } from '@/lib/modules';

interface FilterTabsProps {
  value: FilterKey;
  onChange: (v: FilterKey) => void;
  counts: Record<FilterKey, number>;
}

const ORDER: FilterKey[] = ['all', 'P0', 'P1', 'paused'];

export function FilterTabs({ value, onChange, counts }: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="模块筛选"
      className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/70 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 backdrop-blur"
    >
      {ORDER.map((key) => {
        const active = value === key;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(key)}
            className={`ds-button px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-[#86D9B8] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            }`}
            style={{ borderRadius: 'var(--ds-radius-button)' }}
          >
            {FILTER_LABELS[key]}
            <span
              className={`ml-1.5 text-xs tabular-nums ${active ? 'opacity-90' : 'text-gray-400'}`}
            >
              {counts[key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
