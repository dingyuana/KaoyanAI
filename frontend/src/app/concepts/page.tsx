'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, ChevronLeft, BookOpen } from 'lucide-react';
import { ConceptTree } from '@/components/ConceptTree';
import { ConceptDetail } from '@/components/ConceptDetail';
import { fetchConceptGroups, fetchConceptDetail } from '@/lib/api';
import type { ConceptGroup, ConceptDetail as ConceptDetailType } from '@/lib/api';

const SUBJECT_MAP: Record<string, string> = {
  math: '数学',
  ds: '数据结构',
  arch: '组成原理',
  net: '计算机网络',
  os: '操作系统',
  english: '英语',
  politics: '政治',
};

export default function ConceptsPage() {
  const [groups, setGroups] = useState<ConceptGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ConceptDetailType | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTree, setShowTree] = useState(true);
  const [subject, setSubject] = useState('math');
  const [availableSubjects, setAvailableSubjects] = useState<string[]>(['math']);

  useEffect(() => {
    fetch('/kaoyan/api/subjects')
      .then((r) => r.json())
      .then((data) => {
        const subs = data.subjects || ['math'];
        setAvailableSubjects(subs);
        if (subs.length > 0 && !subs.includes(subject)) {
          setSubject(subs[0]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setSelectedId(null);
    setDetail(null);
    setError(null);
    fetchConceptGroups(subject)
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [subject]);

  const handleSelect = useCallback(async (id: string) => {
    setSelectedId(id);
    setDetailLoading(true);
    setDetail(null);
    try {
      const data = await fetchConceptDetail(subject, id);
      setDetail(data);
    } catch (err: unknown) {
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
    if (window.innerWidth < 768) setShowTree(false);
  }, [subject]);

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      <div className="flex items-center gap-1 px-5 py-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800/50 flex-shrink-0 overflow-x-auto">
        {availableSubjects.map((id) => (
          <button
            key={id}
            onClick={() => setSubject(id)}
            className={`flex-shrink-0 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
              subject === id
                ? 'bg-blue-500 text-white font-medium shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {SUBJECT_MAP[id] || id}
          </button>
        ))}
      </div>

      <div className="flex flex-1 min-h-0 bg-white dark:bg-gray-900">
        {!showTree && selectedId && (
          <button
            onClick={() => setShowTree(true)}
            className="md:hidden fixed top-16 left-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}

        <div className={`${showTree ? 'block' : 'hidden'} md:block w-72 flex-shrink-0 border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50`}>
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-400 p-4 text-sm text-center">
              <p>{error}</p>
            </div>
          ) : groups && Object.keys(groups).length > 0 ? (
            <ConceptTree
              groups={groups}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
              <BookOpen className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm text-center">该学科暂无概念内容</p>
            </div>
          )}
        </div>

        <div className={`flex-1 min-w-0 ${!showTree && selectedId ? 'block' : 'hidden md:block'}`}>
          {detailLoading ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : detail ? (
            <ConceptDetail detail={detail} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
              <BookOpen className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-lg mb-1">选择一个概念查看详情</p>
              <p className="text-sm">从左侧列表选择一个概念</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}