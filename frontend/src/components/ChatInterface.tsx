'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, BookOpen, Loader2, AlertTriangle, AlertCircle, Clock, FileQuestion, RefreshCw } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { sendChatMessageStream, ErrorType } from '@/lib/api';

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
  errorType?: ErrorType;
}

const ERROR_CONFIG: Record<ErrorType, { icon: typeof AlertTriangle; message: string; color: string }> = {
  network: { icon: AlertTriangle, message: '网络连接失败，请检查网络后重试', color: 'text-red-500' },
  server: { icon: AlertCircle, message: '服务器出了点问题，请稍后重试', color: 'text-orange-500' },
  timeout: { icon: Clock, message: '响应时间过长，已中断，请重试', color: 'text-yellow-600' },
  no_context: { icon: FileQuestion, message: '知识库中未找到相关信息，请换个问题试试', color: 'text-blue-500' },
  unknown: { icon: AlertTriangle, message: '出了点问题，请重试', color: 'text-gray-500' },
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('math');
  const lastQuestionRef = useRef<string>('');
  const streamRef = useRef<StreamMessage | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

  const handleRetry = useCallback(() => {
    const q = lastQuestionRef.current;
    if (q) {
      setInput(q);
      // Trigger submit via the form
      requestAnimationFrame(() => {
        const form = document.querySelector('form');
        if (form) form.requestSubmit();
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    lastQuestionRef.current = trimmed;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    const streamMsg: StreamMessage = { id: assistantId, content: '', sources: [], done: false };
    streamRef.current = streamMsg;

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
      onError: (error, type) => {
        streamMsg.error = error;
        streamMsg.errorType = type || 'unknown';
        const config = ERROR_CONFIG[streamMsg.errorType];
        // Show error as styled card
        const errorHtml = `<div class="error-card" data-error-type="${streamMsg.errorType}">${error}</div>`;
        streamMsg.content = errorHtml;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: errorHtml } : m))
        );
        setIsLoading(false);
      },
    });

    if (!streamMsg.done && !streamMsg.error) {
      setIsLoading(false);
    }
    streamRef.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const btn = (e.currentTarget as HTMLElement)
        .closest('form')
        ?.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (btn && !btn.disabled) btn.click();
    }
  };

  const latestAssistant = messages.filter((m) => m.role === 'assistant').at(-1);
  const latestSources = streamRef.current?.sources ?? [];

  const getErrorInfo = (content: string) => {
    const match = content.match(/data-error-type="(\w+)"/);
    if (!match) return null;
    return ERROR_CONFIG[match[1] as ErrorType] || ERROR_CONFIG.unknown;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
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

        {messages.map((message) => {
          const errorInfo = message.role === 'assistant' ? getErrorInfo(message.content) : null;
          if (errorInfo) {
            const Icon = errorInfo.icon;
            return (
              <div key={message.id} className="flex justify-start mb-4">
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-md shadow-sm`}>
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${errorInfo.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${errorInfo.color}`}>{errorInfo.message}</p>
                      <button
                        onClick={handleRetry}
                        className="mt-2 inline-flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        重新提问
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return <MessageBubble key={message.id} message={message} />;
        })}

        {latestSources.length > 0 && (
          <div className="mb-4 px-2">
            <p className="text-xs text-gray-400 mb-2 font-medium">参考来源</p>
            <div className="flex flex-wrap gap-2">
              {latestSources.map((src, i) => (
                <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-md" title={src}>
                  {src}
                </span>
              ))}
            </div>
          </div>
        )}

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
