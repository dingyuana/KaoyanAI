'use client';

export type ViewMode = 'card' | 'list';

interface ViewSwitcherProps {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}

const OPTIONS: { value: ViewMode; label: string }[] = [
  { value: 'card', label: '卡片视图' },
  { value: 'list', label: '列表视图' },
];

export function ViewSwitcher({ value, onChange }: ViewSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="视图切换"
      className="inline-flex items-center p-1 rounded-2xl bg-white/70 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60"
    >
      {OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`ds-button px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            }`}
            style={{ borderRadius: 'var(--ds-radius-button)' }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
