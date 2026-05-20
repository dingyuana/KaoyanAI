import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatInterface, Message } from '@/components/ChatInterface';

// Mock the API module
vi.mock('@/lib/api', () => ({
  sendChatMessageStream: vi.fn(),
}));

import { sendChatMessageStream } from '@/lib/api';

const mockSendChatMessageStream = sendChatMessageStream as ReturnType<typeof vi.fn>;

describe('ChatInterface', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the initial empty state with welcome message', () => {
    render(<ChatInterface />);
    expect(screen.getByText('考研知识问答助手')).toBeTruthy();
    expect(screen.getByText(/基于考研数学知识库/)).toBeTruthy();
  });

  it('renders subject selector buttons', () => {
    render(<ChatInterface />);
    expect(screen.getByText('数学')).toBeTruthy();
    expect(screen.getByText('英语')).toBeTruthy();
    expect(screen.getByText('政治')).toBeTruthy();
  });

  it('renders the input textarea', () => {
    render(<ChatInterface />);
    const textarea = screen.getByPlaceholderText('输入你的考研问题...');
    expect(textarea).toBeTruthy();
  });

  it('renders the send button', () => {
    render(<ChatInterface />);
    const button = screen.getByRole('button', { name: '' });
    expect(button).toBeTruthy();
  });

  it('updates input value when typing', () => {
    render(<ChatInterface />);
    const textarea = screen.getByPlaceholderText('输入你的考研问题...') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '什么是函数极限' } });
    expect(textarea.value).toBe('什么是函数极限');
  });

  it('does not submit empty message', () => {
    render(<ChatInterface />);
    const form = screen.getByRole('button', { name: '' }).closest('form');
    fireEvent.submit(form!);
    expect(mockSendChatMessageStream).not.toHaveBeenCalled();
  });

  it('calls sendChatMessageStream with correct params on submit', async () => {
    render(<ChatInterface />);
    const textarea = screen.getByPlaceholderText('输入你的考研问题...') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '什么是函数极限' } });

    const form = screen.getByRole('button', { name: '' }).closest('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSendChatMessageStream).toHaveBeenCalledWith(
        '什么是函数极限',
        'math',
        expect.objectContaining({
          onChunk: expect.any(Function),
          onSources: expect.any(Function),
          onDone: expect.any(Function),
          onError: expect.any(Function),
        })
      );
    });
  });

  it('displays user message immediately after submit', async () => {
    render(<ChatInterface />);
    const textarea = screen.getByPlaceholderText('输入你的考研问题...') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '什么是函数极限' } });

    const form = screen.getByRole('button', { name: '' }).closest('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('什么是函数极限')).toBeTruthy();
    });
  });

  it('clears input after submit', async () => {
    render(<ChatInterface />);
    const textarea = screen.getByPlaceholderText('输入你的考研问题...') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '什么是函数极限' } });

    const form = screen.getByRole('button', { name: '' }).closest('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(textarea.value).toBe('');
    });
  });

  it('shows loading indicator when waiting for response', async () => {
    mockSendChatMessageStream.mockImplementation(() => {
      // Never resolves to keep loading state
      return new Promise(() => {});
    });

    render(<ChatInterface />);
    const textarea = screen.getByPlaceholderText('输入你的考研问题...') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '什么是函数极限' } });

    const form = screen.getByRole('button', { name: '' }).closest('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('思考中...')).toBeTruthy();
    });
  });

  it('displays streamed assistant response via onChunk', async () => {
    let onChunkCallback: ((text: string) => void) | undefined;
    mockSendChatMessageStream.mockImplementation((_, __, callbacks) => {
      onChunkCallback = callbacks.onChunk;
      return Promise.resolve();
    });

    render(<ChatInterface />);
    const textarea = screen.getByPlaceholderText('输入你的考研问题...') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '什么是函数极限' } });

    const form = screen.getByRole('button', { name: '' }).closest('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('什么是函数极限')).toBeTruthy();
    });

    // Simulate streaming chunks
    onChunkCallback!('极限是');
    onChunkCallback!('微积分中的');
    onChunkCallback!('重要概念。');

    await waitFor(() => {
      expect(screen.getByText('极限是微积分中的重要概念。')).toBeTruthy();
    });
  });

  it('shows retry button on error', async () => {
    mockSendChatMessageStream.mockImplementation((_, __, callbacks) => {
      callbacks.onError('网络连接失败，请检查网络后重试', 'network');
      return Promise.resolve();
    });

    render(<ChatInterface />);
    const textarea = screen.getByPlaceholderText('输入你的考研问题...') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test' } });

    const form = screen.getByRole('button', { name: '' }).closest('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/重新提问/)).toBeTruthy();
    });
  });
});
