'use client';

import type { IconKey } from '@/lib/modules';

interface IconProps {
  iconKey: IconKey;
  iconColor: string;       // 描边/主色（来自模块配置）
  gradient: string;        // 模块渐变（用于图标内部 fill）
  size?: number;
}

// 8 个模块的线性 SVG 图标（80×80 视角，scale 到 size）
// 风格：线性柔边渐变 + 玻璃质感，无描边粗硬感
export function ModuleIcon({ iconKey, iconColor, gradient, size = 80 }: IconProps) {
  // 给每个图标一个独立 id 避免同页冲突
  const gid = `mi-${iconKey}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${gid}-glass`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {renderIcon(iconKey, iconColor, gid)}
      {/* 玻璃高光覆盖层：右上斜对角 */}
      <path
        d="M12 8 H68 A8 8 0 0 1 76 16 V36 Q40 28 4 36 V16 A8 8 0 0 1 12 8 Z"
        fill={`url(#${gid}-glass)`}
        opacity="0.5"
        pointerEvents="none"
      />
    </svg>
  );
}

function renderIcon(key: IconKey, color: string, gid: string) {
  switch (key) {
    case 'kb':
      // 知识库：堆叠文档 + 对勾
      return (
        <g>
          <rect x="14" y="20" width="42" height="50" rx="6" fill="#ffffff" opacity="0.55" />
          <rect x="22" y="14" width="42" height="50" rx="6" fill={color} opacity="0.18" />
          <rect x="22" y="14" width="42" height="50" rx="6" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="30" y1="26" x2="56" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="34" x2="50" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="42" x2="56" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="58" cy="56" r="10" fill="#ffffff" />
          <path d="M53 56 L57 60 L64 52" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );

    case 'dx':
      // 学习诊断：分层习题文档
      return (
        <g>
          <rect x="18" y="22" width="38" height="48" rx="6" fill="#ffffff" opacity="0.4" />
          <rect x="14" y="16" width="38" height="48" rx="6" fill={color} opacity="0.15" />
          <rect x="14" y="16" width="38" height="48" rx="6" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
          <text x="22" y="32" fontSize="10" fill={color} fontWeight="600">Q1</text>
          <line x1="32" y1="28" x2="48" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="40" x2="46" y2="40" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="22" y1="48" x2="42" y2="48" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="24" cy="56" r="3" fill={color} />
          <path d="M22 56 L24 58 L27 54" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="32" y1="56" x2="48" y2="56" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      );

    case 'eb':
      // 错题管理：铃铛
      return (
        <g>
          <path
            d="M40 14 C28 14 22 22 22 34 V44 L18 50 H62 L58 44 V34 C58 22 52 14 40 14 Z"
            fill={color}
            opacity="0.2"
            stroke={color}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="58" r="5" fill={color} />
          <path d="M40 12 V18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="40" cy="38" r="2" fill={color} />
        </g>
      );

    case 'ai':
      // AI 辅导：对话气泡 + 闪光
      return (
        <g>
          <path
            d="M14 22 H66 A6 6 0 0 1 72 28 V48 A6 6 0 0 1 66 54 H32 L22 62 V54 H14 A6 6 0 0 1 8 48 V28 A6 6 0 0 1 14 22 Z"
            fill={color}
            opacity="0.18"
            stroke={color}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="38" r="2.4" fill={color} />
          <circle cx="40" cy="38" r="2.4" fill={color} />
          <circle cx="52" cy="38" r="2.4" fill={color} />
          <path d="M58 16 L60 20 L64 22 L60 24 L58 28 L56 24 L52 22 L56 20 Z" fill={color} opacity="0.7" />
        </g>
      );

    case 'plan':
      // 个性规划：任务清单气泡
      return (
        <g>
          <rect x="16" y="14" width="40" height="48" rx="8" fill={color} opacity="0.18" stroke={color} strokeWidth="2.5" />
          <rect x="22" y="22" width="28" height="3" rx="1.5" fill={color} opacity="0.5" />
          <circle cx="26" cy="34" r="3" fill="#fff" stroke={color} strokeWidth="1.8" />
          <path d="M24 34 L26 36 L29 32" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="32" y1="34" x2="46" y2="34" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="26" cy="44" r="3" fill="#fff" stroke={color} strokeWidth="1.8" />
          <line x1="32" y1="44" x2="46" y2="44" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="26" cy="54" r="3" fill="#fff" stroke={color} strokeWidth="1.8" />
          <line x1="32" y1="54" x2="42" y2="54" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M60 26 L66 22 V36 A8 8 0 0 1 58 44 H56" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </g>
      );

    case 'info':
      // 智能信息中枢（暂停）：灰色喇叭
      return (
        <g>
          <path
            d="M20 32 H32 L48 20 V60 L32 48 H20 Z"
            fill={color}
            opacity="0.18"
            stroke={color}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M54 28 Q62 40 54 52" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M60 22 Q72 40 60 58" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
        </g>
      );

    case 'exam':
      // 阶段检测：盾牌 + 向下箭头
      return (
        <g>
          <path
            d="M40 12 L60 20 V40 Q60 56 40 64 Q20 56 20 40 V20 Z"
            fill={color}
            opacity="0.18"
            stroke={color}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M40 26 V50 M32 42 L40 50 L48 42" stroke={color} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );

    case 'school':
      // 智能择校（暂停）：院校定位
      return (
        <g>
          <path
            d="M40 12 C30 12 22 20 22 30 C22 44 40 60 40 60 S58 44 58 30 C58 20 50 12 40 12 Z"
            fill={color}
            opacity="0.18"
            stroke={color}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="30" r="6" fill={color} opacity="0.4" />
          <circle cx="40" cy="30" r="3" fill="#fff" />
        </g>
      );

    case 'viz':
      // 能力可视化：环形雷达
      return (
        <g>
          <circle cx="40" cy="40" r="26" fill="none" stroke={color} strokeWidth="2" opacity="0.35" />
          <circle cx="40" cy="40" r="18" fill="none" stroke={color} strokeWidth="2" opacity="0.45" />
          <circle cx="40" cy="40" r="10" fill="none" stroke={color} strokeWidth="2" opacity="0.55" />
          <path
            d="M40 16 L52 30 L48 48 L32 48 L28 30 Z"
            fill={color}
            opacity="0.3"
            stroke={color}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="40" r="3" fill={color} />
        </g>
      );

    default:
      return null;
  }
}
