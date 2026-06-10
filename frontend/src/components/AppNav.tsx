'use client';

import { useAuth } from '@/lib/auth-context';
import { MessageSquare, BookOpen, ClipboardCheck, BookX, Calendar, GraduationCap, LogIn, LogOut, BarChart3, FileCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/kaoyan', label: '问答', icon: MessageSquare },
  { href: '/kaoyan/concepts', label: '概念', icon: BookOpen },
  { href: '/kaoyan/diagnosis', label: '诊断', icon: ClipboardCheck, needAuth: true },
  { href: '/kaoyan/exam', label: '模考', icon: FileCheck, needAuth: true },
  { href: '/kaoyan/error-book', label: '错题', icon: BookX, needAuth: true },
  { href: '/kaoyan/plan', label: '计划', icon: Calendar, needAuth: true },
  { href: '/kaoyan/dashboard', label: '数据', icon: BarChart3, needAuth: true },
  { href: '/kaoyan/tutor', label: '辅导', icon: GraduationCap },
];

export function AppNav() {
  const { user, isLoading, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center h-14 gap-2">
        <Link href="/kaoyan" className="flex items-center gap-2 mr-auto">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-base font-semibold text-gray-800 dark:text-white">考研助手</span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            if (item.needAuth && !user) return null;
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 ml-2">
          {isLoading ? null : user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 hidden sm:inline">{user.name || user.phone}</span>
              <button onClick={logout} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="退出">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/kaoyan/login" className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-lg text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">登录</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
