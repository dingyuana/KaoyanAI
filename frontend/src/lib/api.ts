const API_BASE_URL = '/kaoyan';

export interface Source {
  title: string;
  excerpt: string;
}

export interface StreamCallbacks {
  onChunk: (text: string) => void;
  onSources: (sources: string[]) => void;
  onDone: () => void;
  onError: (error: string) => void;
}

export async function sendChatMessageStream(
  message: string,
  subject: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const { onChunk, onSources, onDone, onError } = callbacks;
  try {
    const response = await fetch(`/kaoyan/api/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, subject: subject || null }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => 'Unknown error');
      onError(`请求失败 (${response.status}): ${errText}`);
      return;
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;
        const raw = trimmed.slice(5).trim();
        if (!raw) continue;
        try {
          const event = JSON.parse(raw);
          switch (event.type) {
            case 'chunk':
              onChunk(event.content);
              break;
            case 'sources':
              onSources(event.sources);
              break;
            case 'done':
              onDone();
              break;
          }
        } catch {
          // skip malformed JSON lines
        }
      }
    }
    // Stream ended without 'done' event — still signal completion
    onDone();
  } catch (error) {
    onError(error instanceof Error ? error.message : '网络连接失败，请确保后端服务已启动');
  }
}
