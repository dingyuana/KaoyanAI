import { ChatInterface } from '@/components/ChatInterface';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
        <h1 className="text-xl font-bold text-center text-gray-800 dark:text-white">
          考研数学问答助手
        </h1>
      </header>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
        <ChatInterface />
      </main>
    </div>
  );
}