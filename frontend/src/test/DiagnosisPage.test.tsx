import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DiagnosisPage from '@/app/diagnosis/page';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));

describe('DiagnosisPage', () => {
  it('renders start screen', async () => {
    render(<DiagnosisPage />);
    await waitFor(() => {
      expect(screen.getByText('开始诊断')).toBeTruthy();
    });
  });

  it('shows questions after starting', async () => {
    render(<DiagnosisPage />);
    await waitFor(() => {
      expect(screen.getByText('开始诊断')).toBeTruthy();
    });
    fireEvent.click(screen.getByText('开始诊断'));
    await waitFor(() => {
      expect(screen.getByText('提交答案')).toBeTruthy();
    });
  });

  it('has history tab button', async () => {
    render(<DiagnosisPage />);
    await waitFor(() => {
      expect(screen.getByText('历史')).toBeTruthy();
    });
  });
});
