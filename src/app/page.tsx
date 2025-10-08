import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">SnippetShare</h1>
        <nav className="space-x-4">
          <Link href="/snippets">Snippets</Link>
          <Link href="/snippets/post-new" className="ml-2 rounded border px-3 py-1">New</Link>
        </nav>
      </header>

      <section>
        <p>Chào mừng đến với SnippetShare — chia sẻ code nhanh chóng.</p>
      </section>
    </main>
  );
}
