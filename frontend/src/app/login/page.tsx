'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login, register, user } = useAuth();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await register(phone, password, name);
      } else {
        await login(phone, password);
      }
      router.push('/');
    } catch (err: any) {
      setError(err.message || '操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{isRegister ? '注册' : '登录'}</h1>
        <p className="text-sm text-gray-400 mb-6">{isRegister ? '创建账号开始使用' : '登录后使用诊断、错题、计划功能'}</p>

        {error && <p className="text-sm text-red-500 mb-4 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">昵称</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="你的昵称"
                className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400/30 outline-none" />
            </div>
          )}
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">手机号</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="13800138000"
              className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400/30 outline-none" />
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">密码</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="输入密码"
              className="w-full px-3 py-2 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400/30 outline-none" />
          </div>
          <button type="submit" disabled={loading || !phone || !password}
            className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors flex items-center justify-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isRegister ? '注册' : '登录'}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          {isRegister ? '已有账号？' : '没有账号？'}
          <button onClick={() => setIsRegister(!isRegister)} className="text-blue-500 hover:text-blue-600 ml-1">
            {isRegister ? '去登录' : '去注册'}
          </button>
        </p>
      </div>
    </div>
  );
}