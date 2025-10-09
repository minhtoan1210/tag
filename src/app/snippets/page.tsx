import Link from "next/link";
import ContentSnippetsComponent from "./contentSnippets";
import { cookies } from "next/headers";

export default async function SnippetsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("token", token)

  return (
    <main className="max-w-5xl mx-auto p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Snippets</h2>
          <p className="text-gray-400">
            A list of all snippets in your project including title, description
            and tags.
          </p>
        </div>
        <Link
          href="/snippets/post-new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Add snippet
        </Link>
      </div>

      <ContentSnippetsComponent user={token}/>
    </main>
  );
}
