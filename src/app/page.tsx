import Link from "next/link";
import { cookies } from "next/headers";
import ContentSnippetsComponent from "./snippets/contentSnippets";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("token", token);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[white]">SnippetShare</h1>
        {token && (
          <>
            <nav className="space-x-4">
              <Link href="/snippets" className="text-[white]">
                Snippets
              </Link>
              <Link
                href="/snippets/post-new"
                className="ml-2 rounded border px-3 py-1 text-[white]"
              >
                New
              </Link>
            </nav>
          </>
        )}
      </header>

      <section>
        <p className="text-[white] mb-4">
          Chào mừng đến với SnippetShare — chia sẻ code nhanh chóng.
        </p>
      </section>
        <ContentSnippetsComponent user={token} page="home"/>
    </main>
  );
}
