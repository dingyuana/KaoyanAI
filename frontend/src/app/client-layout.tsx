'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth-context';
import { AppNav } from '@/components/AppNav';

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppNav />
      <main>{children}</main>
    </AuthProvider>
  );
}
