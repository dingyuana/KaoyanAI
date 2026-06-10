import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TutorPage from '@/app/tutor/page';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe('TutorPage', () => {
  it('renders welcome message', () => {
    render(<TutorPage />);
    expect(screen.getByText(/考研辅导老师/)).toBeTruthy();
  });

  it('renders input and buttons', () => {
    render(<TutorPage />);
    expect(screen.getByPlaceholderText('描述你遇到的问题...')).toBeTruthy();
    expect(screen.getByText('完整解析')).toBeTruthy();
  });

  it('sends message on full solution button', async () => {
    render(<TutorPage />);
    const textarea = screen.getByPlaceholderText('描述你遇到的问题...');
    fireEvent.change(textarea, { target: { value: '什么是极限？' } });
    fireEvent.click(screen.getByText('完整解析'));
    await waitFor(() => {
      expect(screen.getByText('这是思路引导')).toBeTruthy();
    });
  });
});