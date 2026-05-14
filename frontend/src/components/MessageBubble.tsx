'use client';

import { useMemo } from 'react';
import katex from 'katex';
import type { Message } from './ChatInterface';

interface MessageBubbleProps {
  message: Message;
}

function renderLatex(text: string): string {
  // Block math $$...$$
  let html = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, formula: string) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false });
    } catch {
      return `<span class="text-red-500">$${formula}$$</span>`;
    }
  });
  // Inline math $...$
  html = html.replace(/\$(.+?)\$/g, (_, formula: string) => {
    try {
      return katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return `<span class="text-red-500">$${formula}$</span>`;
    }
  });
  return html;
}

function renderContent(content: string) {
  const withMath = renderLatex(content);
  // split on newlines for <p> wrapping
  return withMath.split('\n').map((line, i) => {
    if (line.trim() === '') return null;
    // Check if the line already has block-level math (katex renders to .katex-display)
    const isBlock = line.includes('class="katex-display"');
    if (i === 0) {
      return <p key={i} className={isBlock ? '' : 'mb-2 last:mb-0'} dangerouslySetInnerHTML={{ __html: line }} />;
    }
    return <p key={i} className={isBlock ? 'mt-2' : 'mt-2 mb-2 last:mb-0'} dangerouslySetInnerHTML={{ __html: line }} />;
  });
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  const rendered = useMemo(() => renderContent(message.content), [message.content]);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-md'
            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md shadow-sm'
        }`}
      >
        <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
          {rendered}
        </div>
      </div>
    </div>
  );
}
