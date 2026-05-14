'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, BookOpen, Loader2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { sendChatMessageStream } from '@/lib/api';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUBJECTS = [
  { id: 'math', label: '数学', active: true },
  { id: 'english', label: '英语', active: false },
  { id: 'politics', label: '政治', active: false },
];

interface StreamMessage {
  id: string;
  content: string;
  sources: string[];
  done: boolean;
  error?: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('math');
  const streamRef = useRef<StreamMessage | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    const streamMsg: StreamMessage = { id: assistantId, content: '', sources: [], done: false };
    streamRef.current = streamMsg;

    // Insert a placeholder assistant message
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    await sendChatMessageStream(trimmed, subject, {
      onChunk: (text) => {
        streamMsg.content += text;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: streamMsg.content } : m))
        );
      },
      onSources: (sources) => {
        streamMsg.sources = sources;
      },
      onDone: () => {
        streamMsg.done = true;
        setIsLoading(false);
      },
      onError: (error) => {
        streamMsg.error = error;
        streamMsg.content = error;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: error } : m))
        );
        setIsLoading(false);
      },
    });

    // If stream ended without onDone/onError (defensive)
    if (!streamMsg.done && !streamMsg.error) {
      setIsLoading(false);
    }
    streamRef.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Click the submit button directly — most reliable way
      const btn = (e.currentTarget as HTMLElement)
        .closest('form')
        ?.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (btn && !btn.disabled) btn.click();
    }
  };

  // Load the latest assistant message to extract sources
  const latestAssistant = messages.filter((m) => m.role === 'assistant').at(-1);
  const latestSources = streamRef.current?.sources ?? [];

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      {/* Subject switcher */}
      <div className="flex items-center gap-1 px-4 py-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => s.active && setSubject(s.id)}
            disabled={!s.active}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              subject === s.id
                ? 'bg-blue-500 text-white font-medium'
                : s.active
                  ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            {s.label}
            {!s.active && <span className="ml-1 text-xs">(即将上线)</span>}
          </button>
        ))}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500">
            <BookOpen className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg mb-1 font-medium text-gray-500 dark:text-gray-400">考研知识问答助手</p>
            <p className="text-sm max-w-md">
              基于考研知识库，智能解答高等数学、线性代数、概率论等问题
            </p>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Source citations for latest assistant message */}
        {latestSources.length > 0 && (
          <div className="mb-4 px-2">
            <p className="text-xs text-gray-400 mb-2 font-medium">📖 参考来源</p>
            <div className="flex flex-wrap gap-2">
              {latestSources.map((src, i) => (
                <span key={i} className="source-chip" title={src}>
                  {src}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && !streamRef.current?.content && (
          <div className="flex justify-start mb-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">检索知识库...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2 bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你的考研问题..."
              rows={1}
              disabled={isLoading}
              className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 py-1.5 max-h-40 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1.5 text-center">
            Enter 发送 · Shift+Enter 换行
          </p>
        </form>
      </div>
    </div>
  );
}
