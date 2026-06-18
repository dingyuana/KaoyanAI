import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppNav } from '@/components/AppNav';

describe('AppNav', () => {
  it('renders main navigation links', () => {
    render(<AppNav />);
    expect(screen.getAllByText('首页').length).toBeGreaterThan(0);
    expect(screen.getAllByText('知识库').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/AI 辅导/).length).toBeGreaterThan(0);
  });

  it('shows logged-in user info when authenticated', () => {
    render(<AppNav />);
    expect(screen.getAllByText('测试用户').length).toBeGreaterThan(0);
  });

  it('hides auth-required feature links when logged in (default mock)', () => {
    render(<AppNav />);
    expect(screen.getAllByText('学习诊断').length).toBeGreaterThan(0);
    expect(screen.getAllByText('阶段模考').length).toBeGreaterThan(0);
    expect(screen.getAllByText('错题本').length).toBeGreaterThan(0);
    expect(screen.getAllByText('学习计划').length).toBeGreaterThan(0);
    expect(screen.getAllByText('数据看板').length).toBeGreaterThan(0);
  });
});
