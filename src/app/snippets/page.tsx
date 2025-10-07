'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SnippetCard from '@/components/SnippetCard';

export default function SnippetsPage() {
  const [list, setList] = useState<any[]>([]);
  useEffect(()=>{ fetch('/api/snippets').then(r=>r.json()).then(setList) },[]);
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Snippets</h2>
      <div className="space-y-4">
        {list.map(s => <SnippetCard key={s.id} snippet={s} />)}
      </div>
      <div className="mt-6">
        <Link href="/snippets/new" className="text-blue-600">Create new</Link>
      </div>
    </main>
  )
}
