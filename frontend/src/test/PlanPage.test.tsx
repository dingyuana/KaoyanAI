import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PlanPage from '@/app/plan/page';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));

describe('PlanPage', () => {
  it('renders plan page', async () => {
    render(<PlanPage />);
    await waitFor(() => {
      expect(screen.getByText('学习计划')).toBeTruthy();
    });
  });

  it('shows plan generated state', async () => {
    render(<PlanPage />);
    await waitFor(() => {
      expect(screen.getByText('学习计划')).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByText(/基础阶段/)).toBeTruthy();
    });
  });
});
