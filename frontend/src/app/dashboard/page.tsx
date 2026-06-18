'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { BarChart3, Loader2, TrendingUp, Target, BookX, CheckCircle, Calendar } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [dashboard, setDashboard] = useState<any>(null);
  const [radar, setRadar] = useState<any>(null);
  const [trend, setTrend] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState('math');

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    loadData();
  }, [subject]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [d, r, t] = await Promise.all([
        fetch(`/kaoyan/api/stats/dashboard`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch(`/kaoyan/api/stats/radar?subject=${subject}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch(`/kaoyan/api/stats/trend?subject=${subject}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      ]);
      setDashboard(d);
      setRadar(r);
      setTrend(t);
    } catch {}
    setLoading(false);
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>;

  const radarData = radar?.chapters?.map((ch: string, i: number) => ({
    chapter: ch.replace(/[（(].*[）)]/, '').slice(0, 6),
    score: radar.scores[i] || 0,
    fullScore: 100,
  })) || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-blue-500" />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">能力可视化</h1>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}
          className="ml-auto px-2 py-1 text-xs rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500">
          <option value="math">数学</option><option value="ds">数据结构</option><option value="arch">组成原理</option><option value="net">计算机网络</option><option value="os">操作系统</option>
        </select>
      </div>

      {dashboard && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Target, label: '诊断次数', value: dashboard.diagnosis_count, color: 'text-blue-500' },
            { icon: TrendingUp, label: '平均分', value: `${dashboard.avg_score}`, color: 'text-green-500' },
            { icon: BookX, label: '错题总数', value: dashboard.total_errors, color: 'text-red-500' },
            { icon: CheckCircle, label: '掌握率', value: `${dashboard.mastery_rate}%`, color: 'text-purple-500' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-4">
              <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
              <p className="text-xs text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4">
          <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">知识雷达</h2>
          {radarData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="chapter" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">暂无数据，完成一次诊断后查看</p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-4">
          <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">成长曲线</h2>
          {trend?.points?.length > 1 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trend.points}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">暂无数据，完成诊断或模考后查看</p>
          )}
        </div>
      </div>

      {dashboard && dashboard.pending_today > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-amber-500" />
          <span className="text-sm text-amber-700 dark:text-amber-300">今日还有 {dashboard.pending_today} 个任务待完成</span>
        </div>
      )}
    </div>
  );
}