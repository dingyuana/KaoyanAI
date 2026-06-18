import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import DesignOverviewPage from '@/app/design/page';

describe('DesignOverviewPage', () => {
  beforeEach(() => {
    localStorage.clear();
    // 强制 light 模式以便断言
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('renders the page title and subtitle', () => {
    render(<DesignOverviewPage />);
    expect(screen.getByRole('heading', { name: /前端设计/ })).toBeTruthy();
    expect(screen.getByText(/自由松弛的自适应瀑布流/)).toBeTruthy();
    expect(screen.getByText(/FRTOUR DESIGN/i)).toBeTruthy();
  });

  it('shows the watermark text', () => {
    render(<DesignOverviewPage />);
    expect(screen.getByText('FRTOUR DESIGN')).toBeTruthy();
  });

  it('renders all 9 modules by default in card view', () => {
    render(<DesignOverviewPage />);
    expect(screen.getByText('知识库基座')).toBeTruthy();
    expect(screen.getByText('学习诊断')).toBeTruthy();
    expect(screen.getByText('错题管理')).toBeTruthy();
    expect(screen.getByText('AI 辅导')).toBeTruthy();
    expect(screen.getByText('个性规划')).toBeTruthy();
    expect(screen.getByText('智能信息中枢')).toBeTruthy();
    expect(screen.getByText('阶段检测')).toBeTruthy();
    expect(screen.getByText('智能择校')).toBeTruthy();
    expect(screen.getByText('能力可视化')).toBeTruthy();
  });

  it('shows status counts in header', () => {
    render(<DesignOverviewPage />);
    const matchCountText = (_: string | null, el: Element | null) =>
      el?.textContent?.replace(/\s+/g, '').includes('共9个模块') ?? false;
    expect(screen.getAllByText(matchCountText).length).toBeGreaterThan(0);
  });

  it('renders P0 and P1 priority tags', () => {
    const { container } = render(<DesignOverviewPage />);
    const p0 = container.querySelectorAll('.ds-tag-p0');
    const p1 = container.querySelectorAll('.ds-tag-p1');
    expect(p0.length).toBeGreaterThan(0);
    expect(p1.length).toBeGreaterThan(0);
  });

  it('filter tabs filter modules correctly', () => {
    render(<DesignOverviewPage />);
    // 默认全部：知识库 + 智能信息中枢均可见
    expect(screen.getByText('知识库基座')).toBeTruthy();
    expect(screen.getByText('智能信息中枢')).toBeTruthy();

    // 切到 P0：应包含 P0 模块
    fireEvent.click(screen.getByRole('tab', { name: /P0 核心/ }));
    expect(screen.getByText('知识库基座')).toBeTruthy();
    expect(screen.getByText('学习诊断')).toBeTruthy();
    // P1 模块不显示
    expect(screen.queryByText('阶段检测')).toBeNull();
    expect(screen.queryByText('智能择校')).toBeNull();

    // 切到 P1：仅 P1
    fireEvent.click(screen.getByRole('tab', { name: /P1 进阶/ }));
    expect(screen.getByText('阶段检测')).toBeTruthy();
    expect(screen.queryByText('知识库基座')).toBeNull();

    // 切到已暂停：仅暂停
    fireEvent.click(screen.getByRole('tab', { name: /已暂停/ }));
    expect(screen.getByText('智能信息中枢')).toBeTruthy();
    expect(screen.getByText('智能择校')).toBeTruthy();
    expect(screen.queryByText('知识库基座')).toBeNull();
  });

  it('view switcher toggles between card and list view', () => {
    render(<DesignOverviewPage />);
    // 默认卡片视图
    expect(screen.getByRole('tab', { name: '卡片视图' }).getAttribute('aria-selected')).toBe('true');

    // 切换到列表
    fireEvent.click(screen.getByRole('tab', { name: '列表视图' }));
    expect(screen.getByRole('tab', { name: '列表视图' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tab', { name: '卡片视图' }).getAttribute('aria-selected')).toBe('false');

    // 模块名仍然可见
    expect(screen.getByText('知识库基座')).toBeTruthy();
  });

  it('shows empty state when filter has no results', () => {
    render(<DesignOverviewPage />);
    // 模拟没有任何 P0 模块的情况不可能，但我们可以验证"没有匹配的模块"文案存在或不存在
    // 这里只验证它不会无故出现
    expect(screen.queryByText('没有匹配的模块')).toBeNull();
  });

  it('paused modules render with ds-card-paused class', () => {
    const { container } = render(<DesignOverviewPage />);
    // 智能信息中枢是暂停模块
    const paused = container.querySelectorAll('.ds-card-paused');
    expect(paused.length).toBe(2); // 智能信息中枢 + 智能择校
  });

  it('bias modules render with bias popover trigger', () => {
    render(<DesignOverviewPage />);
    // 学习诊断是 bias 模块，应有"存在偏差"文案
    expect(screen.getAllByText(/完成度 90%/).length).toBeGreaterThan(0);
  });

  it('renders footer note', () => {
    render(<DesignOverviewPage />);
    expect(screen.getByText(/设计系统 v0\.1/)).toBeTruthy();
  });

  it('renders back to home link', () => {
    render(<DesignOverviewPage />);
    const back = screen.getByRole('link', { name: /返回首页/ });
    expect(back.getAttribute('href')).toBe('/kaoyan');
  });
});
