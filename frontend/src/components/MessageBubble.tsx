'use client';

import { useMemo } from 'react';
import type { Message } from './ChatInterface';
import { renderMarkdown } from '@/lib/render-md';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const rendered = useMemo(() => {
    const html = renderMarkdown(message.content);
    const lines = html.split('\n').filter(Boolean);
    return lines.map((line, i) => {
      const isBlockMath = line.includes('katex-display');
      const isBlock = line.startsWith('<h') || line.startsWith('<pre') || line.startsWith('<blockquote') ||
                      line.startsWith('<ul') || line.startsWith('<ol') || line.startsWith('<table') ||
                      line.startsWith('<hr') || line.includes('katex-display');
      return (
        <div
          key={i}
          className={isBlock ? (isBlockMath ? 'my-1' : '') : 'mb-1.5 last:mb-0'}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      );
    });
  }, [message.content]);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 animate-fade-in`}>
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-sm'
            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-sm shadow-sm'
        }`}
      >
        <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            rendered
          )}
        </div>
      </div>
    </div>
  );
}
