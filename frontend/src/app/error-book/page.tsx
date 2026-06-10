'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { fetchErrorList, fetchDueErrors, reviewError } from '@/lib/api';
import { BookX, Loader2, Check, X, ChevronRight, RefreshCw } from 'lucide-react';

export default function ErrorBookPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<'due' | 'all'>('due');
  const [errors, setErrors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<number | null>(null);

  useEffect(() => {
    if (!user) { router.push('/kaoyan/login'); return; }
    load();
  }, [tab]);

  const load = async () => {
    setLoading(true);
    try {
      if (tab === 'due') {
        const data = await fetchDueErrors(token!);
        setErrors(data.errors || []);
      } else {
        setErrors(await fetchErrorList(token!));
      }
    } catch { setErrors([]); }
    setLoading(false);
  };

  const handleReview = async (id: number, correct: boolean) => {
    setReviewingId(id);
    await reviewError(token!, id, correct);
    setErrors((prev) => prev.filter((e) => e.id !== id));
    setReviewingId(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <BookX className="w-5 h-5 text-blue-500" />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">错题本</h1>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setTab('due')} className={`px-3 py-1 text-xs rounded-lg ${tab === 'due' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>待复习</button>
          <button onClick={() => setTab('all')} className={`px-3 py-1 text-xs rounded-lg ${tab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>全部</button>
          <button onClick={load} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"><RefreshCw className="w-4 h-4" /></button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
      ) : errors.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <BookX className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">暂无错题，继续加油！</p>
        </div>
      ) : (
        <div className="space-y-3">
          {errors.map((e) => (
            <div key={e.id} className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4">
              <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">{e.question_text || e.knowledge_point}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-red-50 dark:bg-red-900/20 text-red-500 px-2 py-0.5 rounded-full">{e.error_type}</span>
                <span className="text-xs text-gray-400">{e.knowledge_point}</span>
                {e.review_count > 0 && <span className="text-xs text-gray-400">已复习{e.review_count}次</span>}
              </div>
              {tab === 'due' && (
                <div className="flex gap-2">
                  <button onClick={() => handleReview(e.id, true)} disabled={reviewingId === e.id}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100 disabled:opacity-50">
                    {reviewingId === e.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />} 答对了
                  </button>
                  <button onClick={() => handleReview(e.id, false)} disabled={reviewingId === e.id}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 disabled:opacity-50">
                    <X className="w-3 h-3" /> 还不会
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}