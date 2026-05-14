'use client';

import { useMemo, useEffect, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { FileText, BookOpen, Hash, Link as LinkIcon, Puzzle } from 'lucide-react';
import type { ConceptDetail as ConceptDetailType, RelatedExercise } from '@/lib/api';
import { renderMarkdown } from '@/lib/render-md';

interface ConceptDetailProps {
  detail: ConceptDetailType;
}

export function ConceptDetail({ detail }: ConceptDetailProps) {
  const rendered = useMemo(() => {
    const html = renderMarkdown(detail.content);
    const lines = html.split('\n').filter(Boolean);
    return lines.map((line, i) => {
      const isBlockMath = line.includes('katex-display');
      return (
        <div
          key={i}
          className={isBlockMath ? 'my-2' : 'mb-2 last:mb-0'}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      );
    });
  }, [detail.content]);

  const [exercises, setExercises] = useState<RelatedExercise[]>([]);
  const [exLoading, setExLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setExLoading(true);
    import('@/lib/api').then(({ fetchRelatedExercises }) => {
      fetchRelatedExercises(detail.subject, detail.id).then((data) => {
        if (!cancelled) {
          setExercises(data);
          setExLoading(false);
        }
      }).catch(() => {
        if (!cancelled) setExLoading(false);
      });
    });
    return () => { cancelled = true; };
  }, [detail.id, detail.subject]);

  const difficultyColor = (d: string) => {
    if (d === '简单') return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
    if (d === '中等') return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
    if (d === '困难') return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
    return 'text-gray-400 bg-gray-50 dark:bg-gray-800';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-4 h-4 text-blue-500" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{detail.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {detail.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
              <Hash className="w-3 h-3" />
              {tag}
            </span>
          ))}
          <span className="text-xs text-gray-400 capitalize px-1.5 py-0.5 rounded-full border dark:border-gray-600">{detail.type}</span>
        </div>
        {detail.source_anchors.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {detail.source_anchors.map((anchor) => (
              <span key={anchor} className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                {anchor}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-thin">
        {rendered}
      </div>

      {exercises.length > 0 && (
        <div className="px-6 py-3 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex-shrink-0">
          <div className="flex items-center gap-1.5 mb-2">
            <Puzzle className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">相关习题 ({exercises.length})</span>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin">
            {exercises.map((ex) => (
              <div key={ex.id} className="flex items-center gap-2 text-xs bg-white dark:bg-gray-700 rounded-lg px-3 py-2 border dark:border-gray-600 transition-colors hover:border-gray-300 dark:hover:border-gray-500">
                <span className="flex-1 text-gray-700 dark:text-gray-300 truncate">{ex.title}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${difficultyColor(ex.difficulty)}`}>
                  {ex.difficulty || '未分级'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {detail.related && detail.related.length > 0 && (
        <div className="px-6 py-3 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex-shrink-0">
          <div className="flex items-center gap-1.5 mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">关联</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {detail.related.map((rel) => (
              <span key={rel} className="text-xs bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-md border dark:border-gray-600">
                {rel}
              </span>
            ))}
          </div>
        </div>
      )}

      {exLoading && (
        <div className="px-6 py-3 border-t dark:border-gray-700 flex items-center gap-2 text-xs text-gray-400">
          <Loader2 className="w-3 h-3 animate-spin" />
          加载相关习题...
        </div>
      )}
    </div>
  );
}
