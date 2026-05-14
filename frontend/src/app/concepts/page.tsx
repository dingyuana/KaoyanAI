'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, ChevronLeft } from 'lucide-react';
import { ConceptTree } from '@/components/ConceptTree';
import { ConceptDetail } from '@/components/ConceptDetail';
import { fetchConceptGroups, fetchConceptDetail } from '@/lib/api';
import type { ConceptGroup, ConceptDetail as ConceptDetailType } from '@/lib/api';

export default function ConceptsPage() {
  const [groups, setGroups] = useState<ConceptGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ConceptDetailType | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTree, setShowTree] = useState(true);

  useEffect(() => {
    fetchConceptGroups('math')
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSelect = useCallback(async (id: string) => {
    setSelectedId(id);
    setDetailLoading(true);
    setDetail(null);
    try {
      const data = await fetchConceptDetail('math', id);
      setDetail(data);
    } catch (err: any) {
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
      if (window.innerWidth < 768) setShowTree(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-60px)] text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-60px)] text-red-400">
        <p>加载失败: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-60px)] bg-white dark:bg-gray-900">
      {!showTree && selectedId && (
        <button
          onClick={() => setShowTree(true)}
          className="md:hidden fixed top-16 left-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      )}

      <div className={`${
        showTree ? 'block' : 'hidden'
      } md:block w-72 flex-shrink-0 border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50`}>
        <ConceptTree
          groups={groups || {}}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>

      <div className={`flex-1 min-w-0 ${
        !showTree && selectedId ? 'block' : 'hidden md:block'
      }`}>
        {detailLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : detail ? (
          <ConceptDetail detail={detail} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
            <p className="text-lg mb-1">选择一个概念查看详情</p>
            <p className="text-sm">从左侧列表选择一个概念</p>
          </div>
        )}
      </div>
    </div>
  );
}
