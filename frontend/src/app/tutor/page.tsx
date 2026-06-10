'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { tutorChat } from '@/lib/api';
import { GraduationCap, Send, Loader2, Lightbulb, FileText, ChevronRight } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isHint?: boolean;
  sources?: string[];
}

export default function TutorPage() {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '你好！我是考研辅导老师。请告诉我你遇到的问题，我会先给你思路引导，帮你独立思考。如果需要完整解析，告诉我即可。', isHint: true },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('math');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async (showSolution = false) => {
    const text = showSolution ? input : input;
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const data = await tutorChat(token, text, subject, showSolution, history);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: data.answer,
        isHint: data.is_hint,
        sources: data.sources,
      }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: '抱歉，暂时无法回答，请稍后重试。' }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-5 h-5 text-blue-500" />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AI 辅导</h1>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}
          className="ml-auto px-2 py-1 text-xs rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500">
          <option value="math">数学</option><option value="ds">数据结构</option><option value="arch">组成原理</option><option value="net">计算机网络</option><option value="os">操作系统</option>
        </select>
      </div>

      <div className="space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white rounded-br-md'
                : 'bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-bl-md shadow-sm'
            }`}>
              {msg.role === 'assistant' && msg.isHint && (
                <div className="flex items-center gap-1.5 mb-2">
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">思路引导</span>
                </div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t dark:border-gray-600">
                  <p className="text-xs text-gray-400">参考来源</p>
                  {msg.sources.map((s, j) => (
                    <p key={j} className="text-xs text-gray-400 truncate">{s}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                <span className="text-sm text-gray-400">思考中...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-3">
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="描述你遇到的问题..."
          className="w-full bg-transparent outline-none resize-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 mb-2" rows={2} />
        <div className="flex items-center gap-2">
          <button onClick={() => handleSend(false)} disabled={!input.trim() || loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 transition-colors">
            <Lightbulb className="w-3.5 h-3.5" /> 思路引导
          </button>
          <button onClick={() => handleSend(true)} disabled={!input.trim() || loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors">
            <FileText className="w-3.5 h-3.5" /> 完整解析
          </button>
          <button onClick={() => handleSend(false)} disabled={!input.trim() || loading}
            className="ml-auto p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}