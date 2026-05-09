import { Message } from './ChatInterface';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  
  // Parse content for math rendering - looking for $ and $$ delimiters
  const renderContent = (content: string) => {
    // Simple rendering - the content from backend will contain LaTeX with $ and $$ delimiters
    // For now, we'll just display the text; math rendering can be enhanced with KaTeX later
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap break-words">
          {renderContent(message.content)}
        </div>
      </div>
    </div>
  );
}