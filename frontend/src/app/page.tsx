'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { MessageSquare, BookOpen } from 'lucide-react';
import { ChatInterface } from '@/components/ChatInterface';

const ConceptsPage = dynamic(() => import('@/app/concepts/page'), {
  loading: () => <div className="flex items-center justify-center h-full text-gray-400">加载中...</div>,
});

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'concepts'>('chat');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 flex items-center h-14 gap-4">
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <h1 className="text-base font-semibold text-gray-800 dark:text-white">
              考研知识问答
            </h1>
          </div>

          <nav className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === 'chat'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              问答
            </button>
            <button
              onClick={() => setActiveTab('concepts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === 'concepts'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              概念浏览
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'chat' ? <ChatInterface /> : <ConceptsPage />}
      </main>
    </div>
  );
}
