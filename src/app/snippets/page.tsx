'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SnippetsPage() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/snippets')
      .then(res => res.json())
      .then(setList);
  }, []);

  console.log("list", list)

  return (
    <main className="max-w-5xl mx-auto p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Snippets</h2>
          <p className="text-gray-400">
            A list of all snippets in your project including title, description and tags.
          </p>
        </div>
        <Link
          href="/snippets/create-new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Add snippet
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-700 bg-[#111827] shadow">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#1f2937]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Tags</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {list.map((s) => (
              <tr key={s.id} className="hover:bg-[#1e293b] transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{s.title}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{s.description}</td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {s.tags && s.tags.length > 0
                    ? s.tags.map(t => t.tag?.name).join(', ')
                    : 'No tags'}
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <Link href={`/snippets/${s.id}/edit`} className="text-indigo-400 hover:text-indigo-300">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}

            {list.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  No snippets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
