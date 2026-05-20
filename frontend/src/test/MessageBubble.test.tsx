import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageBubble } from '@/components/MessageBubble';

// Mock the render-md module
vi.mock('@/lib/render-md', () => ({
  renderMarkdown: (text: string) => {
    // Simple mock that returns LaTeX as-is and preserves structure
    if (!text) return '';
    // Replace $$...$$ with katex-display spans
    let html = text.replace(/\$\$([\s\S]*?)\$\$/g, '<div class="katex-display">$1</div>');
    // Replace $...$ with katex-inline spans
    html = html.replace(/\$(.+?)\$/g, '<span class="katex-inline">$1</span>');
    // Split by newlines for paragraphs
    return html;
  },
}));

describe('MessageBubble', () => {
  const userMessage = {
    id: '1',
    role: 'user' as const,
    content: '你好，请介绍一下极限的定义',
  };

  const assistantMessage = {
    id: '2',
    role: 'assistant' as const,
    content: '极限是微积分的基础概念。',
  };

  it('renders user message with correct styling', () => {
    const { container } = render(<MessageBubble message={userMessage} />);
    const bubble = container.querySelector('.bg-blue-500');
    expect(bubble).toBeTruthy();
    expect(bubble?.textContent).toContain('你好，请介绍一下极限的定义');
  });

  it('renders assistant message with correct styling', () => {
    const { container } = render(<MessageBubble message={assistantMessage} />);
    const bubble = container.querySelector('.bg-white');
    expect(bubble).toBeTruthy();
    expect(bubble?.textContent).toContain('极限是微积分的基础概念。');
  });

  it('renders assistant message content', () => {
    render(<MessageBubble message={assistantMessage} />);
    expect(screen.getByText('极限是微积分的基础概念。')).toBeTruthy();
  });

  it('renders message with LaTeX display formula', () => {
    const msgWithLatex = {
      id: '3',
      role: 'assistant' as const,
      content: '极限的 $\\epsilon$-$\\delta$ 定义：\n\n$$\\lim_{x \\to a} f(x) = L$$',
    };
    const { container } = render(<MessageBubble message={msgWithLatex} />);
    const html = container.innerHTML;
    expect(html).toContain('katex-display');
    expect(html).toContain('katex-inline');
  });

  it('renders message with inline LaTeX', () => {
    const msgWithInlineLatex = {
      id: '4',
      role: 'assistant' as const,
      content: '设 $f(x) = x^2$，当 $x \\to 2$ 时，$f(x) \\to 4$。',
    };
    const { container } = render(<MessageBubble message={msgWithInlineLatex} />);
    const html = container.innerHTML;
    expect(html).toContain('katex-inline');
  });

  it('justifies user messages to the right', () => {
    const { container } = render(<MessageBubble message={userMessage} />);
    const flexDiv = container.querySelector('.flex.justify-end');
    expect(flexDiv).toBeTruthy();
  });

  it('justifies assistant messages to the left', () => {
    const { container } = render(<MessageBubble message={assistantMessage} />);
    const flexDiv = container.querySelector('.flex.justify-start');
    expect(flexDiv).toBeTruthy();
  });
});
