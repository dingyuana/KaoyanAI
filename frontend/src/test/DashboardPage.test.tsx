import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe('DashboardPage', () => {
  it('renders dashboard', async () => {
    render(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByText('能力可视化')).toBeTruthy();
    });
  });

  it('renders stat cards', async () => {
    render(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByText('诊断次数')).toBeTruthy();
      expect(screen.getByText('平均分')).toBeTruthy();
      expect(screen.getByText('错题总数')).toBeTruthy();
      expect(screen.getByText('掌握率')).toBeTruthy();
    });
  });

  it('renders chart containers', async () => {
    render(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByText('知识雷达')).toBeTruthy();
      expect(screen.getByText('成长曲线')).toBeTruthy();
    });
  });
});
