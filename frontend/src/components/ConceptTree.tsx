'use client';

import { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Search, FileText, BookOpen, Puzzle, PenTool, Hash } from 'lucide-react';

interface ConceptItem {
  title: string;
  id: string;
  type: string;
}

interface ConceptTreeProps {
  groups: Record<string, ConceptItem[]>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const TYPE_ICONS: Record<string, typeof FileText> = {
  concept: FileText,
  method: PenTool,
  exercise: Puzzle,
};

const CHAPTER_ORDER: Record<string, string[]> = {
  math: ['高等数学', '线性代数', '概率论与数理统计', '解题方法', '基础概念'],
  ds: ['线性结构', '树形结构', '图结构', '查找', '排序', '其他'],
  arch: ['计算机系统概述', '数据的表示和运算', '存储系统', '指令系统', '中央处理器', '总线', '输入输出系统'],
  net: ['计算机网络体系结构', '物理层', '数据链路层', '网络层', '传输层', '应用层'],
  os: ['计算机系统概述', '进程与线程', '内存管理', '文件管理', '输入输出管理'],
};

export function ConceptTree({ groups, selectedId, onSelect }: ConceptTreeProps) {
  const [search, setSearch] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(Object.keys(groups).slice(0, 3)));

  const toggleChapter = (chapter: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapter)) next.delete(chapter);
      else next.add(chapter);
      return next;
    });
  };

  const chapterEntries = useMemo(() => {
    const entries = Object.entries(groups);
    // Try to find matching chapter order from any subject
    const order: string[] = [];
    for (const o of Object.values(CHAPTER_ORDER)) {
      if (entries.some(([ch]) => o.includes(ch))) {
        order.push(...o);
        break;
      }
    }
    entries.sort(([a], [b]) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
    return search
      ? entries.map(([ch, items]) => [ch, items.filter((i) => i.title.includes(search))] as const).filter(([, items]) => items.length > 0)
      : entries;
  }, [groups, search]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-3 border-b dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索概念..."
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chapterEntries.map(([chapter, items]) => (
          <div key={chapter}>
            <button
              onClick={() => toggleChapter(chapter)}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {expandedChapters.has(chapter) ? (
                <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              )}
              <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{chapter}</span>
              <span className="ml-auto text-gray-400">{items.length}</span>
            </button>

            {expandedChapters.has(chapter) && (
              <div className="border-l border-gray-200 dark:border-gray-700 ml-4">
                {items.map((item) => {
                  const Icon = TYPE_ICONS[item.type] || FileText;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item.id)}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left transition-colors ${
                        selectedId === item.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <Icon className="w-3 h-3 flex-shrink-0 opacity-60" />
                      <span className="truncate">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {chapterEntries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Search className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">无匹配结果</p>
          </div>
        )}
      </div>
    </div>
  );
}