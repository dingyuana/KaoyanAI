'use client';

import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare, BookOpen, ClipboardCheck, BookX, Calendar,
  GraduationCap, LogIn, LogOut, BarChart3, FileCheck,
  LayoutDashboard, Menu, X, ChevronRight, Brain,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: any;
  needAuth?: boolean;
}

const MAIN_NAV: NavItem[] = [
  { href: '/', label: '首页', icon: LayoutDashboard },
  { href: '/concepts', label: '知识库', icon: BookOpen },
  { href: '/tutor', label: 'AI 辅导', icon: GraduationCap },
];

const FEATURE_NAV: NavItem[] = [
  { href: '/diagnosis', label: '学习诊断', icon: ClipboardCheck, needAuth: true },
  { href: '/exam', label: '阶段模考', icon: FileCheck, needAuth: true },
  { href: '/error-book', label: '错题本', icon: BookX, needAuth: true },
  { href: '/plan', label: '学习计划', icon: Calendar, needAuth: true },
  { href: '/dashboard', label: '数据看板', icon: BarChart3, needAuth: true },
];

export function AppNav() {
  const { user, isLoading, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const NavLink = ({ item, className = '' }: { item: NavItem; className?: string }) => {
    if (item.needAuth && !user) return null;
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <Link href={item.href} onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
          active
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
        } ${className}`}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-blue-500' : 'text-gray-400'}`} />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      <header className="md:hidden sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">考研助手</span>
          </Link>
          <div className="flex items-center gap-2">
            {user ? (
              <button onClick={logout} className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <Link href="/login" className="p-2 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <LogIn className="w-5 h-5" />
              </Link>
            )}
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 px-2">
        <div className="flex items-center justify-around py-1.5">
          {[...MAIN_NAV, ...FEATURE_NAV.slice(0, 3)].map((item) => {
            if (item.needAuth && !user) return null;
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${active ? 'text-blue-500' : 'text-gray-400'}`}>
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 h-16 border-b dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">考研助手</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 space-y-1 overflow-y-auto h-[calc(100%-64px)] pb-20">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-2">主要</p>
              {MAIN_NAV.map((item) => <NavLink key={item.href} item={item} />)}
              {user && (
                <>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-2 mt-4">学习工具</p>
                  {FEATURE_NAV.map((item) => <NavLink key={item.href} item={item} />)}
                </>
              )}
              <div className="border-t dark:border-gray-800 mt-4 pt-4 px-3">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                      {user.name?.[0] || user.phone?.[0] || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name || user.phone}</p>
                      <p className="text-xs text-gray-400">{user.role === 'admin' ? '管理员' : '学生'}</p>
                    </div>
                    <button onClick={logout} className="p-2 rounded-xl text-gray-400 hover:text-red-500 transition-colors">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 w-full py-2.5 px-3 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">
                    <LogIn className="w-4 h-4" /> 登录 / 注册
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <aside className="hidden md:flex md:flex-col fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40">
        <div className="flex items-center gap-2.5 px-5 h-16 border-b dark:border-gray-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">考研助手</span>
            <p className="text-[10px] text-gray-400 -mt-0.5">智能学习平台</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-2">主要</p>
          {MAIN_NAV.map((item) => <NavLink key={item.href} item={item} />)}
          {user && (
            <>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-2 mt-4">学习工具</p>
              {FEATURE_NAV.map((item) => <NavLink key={item.href} item={item} />)}
            </>
          )}
        </div>

        <div className="p-3 border-t dark:border-gray-800">
          {user ? (
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                {user.name?.[0] || user.phone?.[0] || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name || user.phone}</p>
                <p className="text-xs text-gray-400">{user.role === 'admin' ? '管理员' : '学生'}</p>
              </div>
              <button onClick={logout} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="退出">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm shadow-blue-500/20">
              <LogIn className="w-4 h-4" /> 登录 / 注册 <ChevronRight className="w-3.5 h-3.5 ml-auto" />
            </Link>
          )}
        </div>
      </aside>

      <div className="hidden md:block md:w-64 flex-shrink-0" />
      <div className="md:hidden h-16" />
    </>
  );
}