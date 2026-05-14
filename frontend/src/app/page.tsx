import { ChatInterface } from '@/components/ChatInterface';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-6 flex items-center justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          考研知识问答
        </h1>
        <span className="text-xs text-gray-400 ml-1">MVP</span>
      </header>
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
        <ChatInterface />
      </main>
    </div>
  );
}
