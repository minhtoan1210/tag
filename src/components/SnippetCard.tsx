import Link from 'next/link';

export default function SnippetCard({ snippet }: any) {
  return (
    <article className="p-4 border rounded">
      <h3 className="font-semibold text-lg"><Link href={`/snippets/${snippet.slug}`}>{snippet.title}</Link></h3>
      <p className="text-sm text-gray-500">{snippet.language} • {snippet.author?.name || 'Anonymous'}</p>
      <pre className="overflow-x-auto mt-2 bg-gray-50 p-3 rounded text-sm">{snippet.content.slice(0, 300)}</pre>
    </article>
  );
}
