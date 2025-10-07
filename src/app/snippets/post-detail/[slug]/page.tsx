import { prisma } from '@/lib/prisma';

export default async function SnippetDetail({ params }: any) {
  const s = await prisma.snippet.findUnique({ where: { slug: params.slug }, include: { author: true, tags: { include: { tag: true } } }});
  if (!s) return <div>Not found</div>;
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{s.title}</h1>
      <p className="text-sm text-gray-500">{s.language} • {s.author?.name}</p>
      <pre className="mt-4 bg-gray-50 p-4 rounded overflow-x-auto">{s.content}</pre>
      <div className="mt-4">Estimated complexity: <strong>{s.complexity || 'unknown'}</strong></div>
    </main>
  );
}
