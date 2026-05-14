'use client';

import { useMemo, useEffect, useState, useCallback } from 'react';
import katex from 'katex';
import { FileText, BookOpen, Hash, Link as LinkIcon, Puzzle, Loader2 } from 'lucide-react';
import type { ConceptDetail as ConceptDetailType, RelatedExercise } from '@/lib/api';

interface ConceptDetailProps {
  detail: ConceptDetailType;
}

function renderInlineLatex(text: string): string {
  return text.replace(/\$(.+?)\$/g, (_, formula: string) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return `<span class="text-red-400">$${formula}$</span>`;
    }
  });
}

function renderMarkdown(text: string): string {
  let html = text
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 my-2 overflow-x-auto text-sm"><code>${escaped}</code></pre>`;
    })
    .replace(/\|(.+)\|/g, (match) => {
      if (match.includes('---')) return '';
      const cells = match.split('|').filter(Boolean);
      const row = cells.map((c) => `<td class="px-3 py-1.5 border dark:border-gray-700 text-sm">${c.trim()}</td>`).join('');
      return `<tr>${row}</tr>`;
    })
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-300 dark:border-blue-600 pl-3 my-2 text-gray-600 dark:text-gray-400 italic">$1</blockquote>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm">$1</li>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold mt-5 mb-2 text-gray-900 dark:text-gray-100">$1</h2>');

  html = renderInlineLatex(html);

  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, formula: string) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false });
    } catch {
      return `<div class="text-red-400">$$${formula}$$</div>`;
    }
  });

  // Wrap consecutive list items
  html = html.replace(/((?:<li[^>]*>.*?<\/li>\n?)+)/g, '<ul class="my-2">$1</ul>');

  // Wrap consecutive table rows in a table
  html = html.replace(/((?:<tr>.*?<\/tr>\n?)+)/g, '<table class="min-w-full my-2 border-collapse">$1</table>');

  // Paragraphize remaining text lines
  const lines = html.split('\n');
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<ul') || trimmed.startsWith('<table') || trimmed.startsWith('<tr') ||
        trimmed.startsWith('<div') || trimmed.includes('katex-display')) {
      result.push(trimmed);
    } else if (!trimmed.startsWith('<')) {
      result.push(`<p class="mb-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">${trimmed}</p>`);
    } else {
      result.push(trimmed);
    }
  }

  return result.join('\n');
}

export function ConceptDetail({ detail }: ConceptDetailProps) {
  const rendered = useMemo(() => renderMarkdown(detail.content), [detail.content]);
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
    if (d === '简单') return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    if (d === '中等') return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    if (d === '困难') return 'text-red-500 bg-red-50 dark:bg-red-900/20';
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
          <span className="text-xs text-gray-400 capitalize">{detail.type}</span>
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

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      </div>

      {exercises.length > 0 && (
        <div className="px-6 py-3 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex-shrink-0">
          <div className="flex items-center gap-1.5 mb-2">
            <Puzzle className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">相关习题 ({exercises.length})</span>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {exercises.map((ex) => (
              <div key={ex.id} className="flex items-center gap-2 text-xs bg-white dark:bg-gray-700 rounded-lg px-3 py-2 border dark:border-gray-600">
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
