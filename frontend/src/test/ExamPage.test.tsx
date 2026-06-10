import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExamPage from '@/app/exam/page';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));

describe('ExamPage', () => {
  it('renders exam setup form', async () => {
    render(<ExamPage />);
    await waitFor(() => {
      expect(screen.getByText('阶段检测')).toBeTruthy();
    });
    expect(screen.getByText('开始模考')).toBeTruthy();
  });

  it('has history tab button', async () => {
    render(<ExamPage />);
    await waitFor(() => {
      expect(screen.getByText('历史')).toBeTruthy();
    });
  });
});
