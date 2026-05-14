'use client';

import { useMemo } from 'react';
import { BookOpen, Hash, LinkIcon, Puzzle, Lightbulb, Network, FileText, ChevronRight, Bookmark } from 'lucide-react';
import { renderMarkdown } from '@/lib/render-md';
import type { ConceptDetail, RelatedExercise } from '@/lib/api';

interface ConceptAnswerPanelProps {
  detail: ConceptDetail;
  exercises: RelatedExercise[];
  chatContent: string;
  matchedTitle: string;
}

const difficultyColor = (d: string) => {
  if (d === '简单') return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
  if (d === '中等') return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
  if (d === '困难') return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
  return 'text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
};

function SectionCard({ icon: Icon, title, children, className = '' }: {
  icon: typeof BookOpen;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <Icon className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
      </div>
      <div className="px-4 py-3">
        {children}
      </div>
    </div>
  );
}

export function ConceptAnswerPanel({ detail, exercises, chatContent, matchedTitle }: ConceptAnswerPanelProps) {
  const renderedContent = useMemo(() => {
    const html = renderMarkdown(detail.content);
    return html.split('\n').filter(Boolean).map((line, i) => {
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

  const knowledgeTags = useMemo(() => {
    const exclude = new Set(['基础概念', '解题方法', '数学二', '基础篇', '强化篇']);
    return detail.tags.filter((t) => !exclude.has(t));
  }, [detail.tags]);

  return (
    <div className="space-y-4 animate-fade-in">
      <SectionCard icon={BookOpen} title="概念定义" className="border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">{detail.title}</h2>
            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
              {detail.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                  <Hash className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              <span className="text-xs text-gray-400 dark:text-gray-500 px-1.5 py-0.5 rounded-full border dark:border-gray-600 capitalize">
                {detail.type}
              </span>
            </div>
            {detail.source_anchors.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {detail.source_anchors.slice(0, 2).map((anchor) => (
                  <span key={anchor} className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                    <LinkIcon className="w-3 h-3" />
                    {anchor}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 border-t dark:border-gray-700 pt-3">
          {renderedContent}
        </div>
      </SectionCard>

      {knowledgeTags.length > 0 && (
        <SectionCard icon={Network} title="知识关联">
          <div className="flex flex-wrap gap-2">
            {knowledgeTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-default"
              >
                <Bookmark className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
          {detail.related && detail.related.length > 0 && (
            <div className="mt-3 pt-3 border-t dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">关联概念</p>
              <div className="flex flex-wrap gap-1.5">
                {detail.related.slice(0, 8).map((rel) => (
                  <span key={rel} className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border dark:border-gray-600">
                    {rel}
                  </span>
                ))}
              </div>
            </div>
          )}
        </SectionCard>
      )}

      {chatContent && (
        <SectionCard icon={Lightbulb} title="例题解析">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              以下为与该概念相关的例题分析：
            </p>
            <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {chatContent.length > 600 ? chatContent.slice(0, 600) + '...' : chatContent}
            </div>
          </div>
        </SectionCard>
      )}

      {exercises.length > 0 && (
        <SectionCard icon={Puzzle} title={`相关习题 (${exercises.length})`}>
          <div className="space-y-2">
            {exercises.map((ex) => (
              <div
                key={ex.id}
                className="flex items-center gap-2 text-sm bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2.5 border dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-500 flex-shrink-0" />
                <span className="flex-1 text-gray-700 dark:text-gray-300 truncate">{ex.title}</span>
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${difficultyColor(ex.difficulty)}`}>
                  {ex.difficulty || '未分级'}
                </span>
                {ex.tags.filter((t) => ['基础篇', '强化篇'].includes(t)).map((t) => (
                  <span key={t} className="text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-600 px-1.5 py-0.5 rounded border dark:border-gray-500">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
