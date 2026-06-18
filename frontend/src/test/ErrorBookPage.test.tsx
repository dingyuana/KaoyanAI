import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ErrorBookPage from '@/app/error-book/page';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));

describe('ErrorBookPage', () => {
  it('renders error list', async () => {
    render(<ErrorBookPage />);
    await waitFor(() => {
      expect(screen.getByText('错题本')).toBeTruthy();
    });
  });

  it('shows due tab content', async () => {
    render(<ErrorBookPage />);
    await waitFor(() => {
      expect(screen.getByText('待复习')).toBeTruthy();
    });
    fireEvent.click(screen.getByText('待复习'));
    await waitFor(() => {
      expect(screen.getByText('答对了')).toBeTruthy();
    });
  });

  it('switches to all tab', async () => {
    render(<ErrorBookPage />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('全部'));
    });
    await waitFor(() => {
      expect(screen.getByText('全部')).toBeTruthy();
    });
  });
});
