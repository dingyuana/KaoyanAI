'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import {
  MessageSquare, BookOpen, ClipboardCheck, BookX, Calendar,
  GraduationCap, BarChart3, FileCheck, Brain, ArrowRight,
  Sparkles, Target, TrendingUp, Loader2,
} from 'lucide-react';

const FEATURES = [
  { href: '/', label: '智能问答', desc: '基于知识库的AI问答', icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
  { href: '/concepts', label: '知识库', desc: '浏览概念/方法/习题', icon: BookOpen, color: 'from-emerald-500 to-emerald-600' },
  { href: '/tutor', label: 'AI 辅导', desc: '引导式解题辅导', icon: GraduationCap, color: 'from-violet-500 to-violet-600' },
  { href: '/diagnosis', label: '学习诊断', desc: '测试+薄弱点分析', icon: ClipboardCheck, color: 'from-orange-500 to-orange-600', needAuth: true },
  { href: '/exam', label: '阶段模考', desc: '限时模拟考试', icon: FileCheck, color: 'from-rose-500 to-rose-600', needAuth: true },
  { href: '/plan', label: '学习计划', desc: '个性定制复习计划', icon: Calendar, color: 'from-cyan-500 to-cyan-600', needAuth: true },
  { href: '/error-book', label: '错题本', desc: '艾宾浩斯复习', icon: BookX, color: 'from-amber-500 to-amber-600', needAuth: true },
  { href: '/dashboard', label: '数据看板', desc: '学习数据可视化', icon: BarChart3, color: 'from-indigo-500 to-indigo-600', needAuth: true },
];

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetch('/kaoyan/api/stats/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('kaoyan_token') || ''}` },
      }).then(r => r.json()).then(setStats).catch(() => {});
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800/50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {user ? `你好，${user.name || user.phone}` : '考研智能学习助手'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user ? '继续你的学习之旅' : '登录后获取个性化学习体验'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        {user && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: Target, label: '诊断次数', value: stats.diagnosis_count, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: TrendingUp, label: '平均分', value: `${stats.avg_score}`, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
              { icon: BookX, label: '错题', value: stats.total_errors, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
              { icon: BarChart3, label: '掌握率', value: `${stats.mastery_rate}%`, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20' },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} rounded-2xl p-4 border border-gray-100 dark:border-gray-700/50 transition-all hover:shadow-md`}>
                <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Auth prompt for non-logged-in */}
        {!user && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 mb-8 text-white shadow-xl shadow-blue-500/20">
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 flex-shrink-0 opacity-80" />
              <div>
                <h2 className="text-lg font-semibold mb-1">开始你的考研之旅</h2>
                <p className="text-sm text-blue-100 mb-4">登录后可使用学习诊断、错题本、学习计划、数据看板等全部功能</p>
                <Link href="/login" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-600 font-medium text-sm hover:bg-blue-50 transition-colors shadow-lg">
                  登录 / 注册 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Feature cards */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" /> 全部功能
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FEATURES.map((feature) => {
              if (feature.needAuth && !user) return null;
              const Icon = feature.icon;
              return (
                <Link key={feature.href} href={feature.href}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-200">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{feature.label}</h3>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                  <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick chat prompt */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">快速提问</h2>
          </div>
          <Link href="/"
            className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700">
            <MessageSquare className="w-4 h-4" />
            输入你的考研问题... <kbd className="ml-auto text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-gray-500">Enter</kbd>
          </Link>
        </div>
      </div>
    </div>
  );
}