"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SnippetFormType = {
  initial?: any;
  authorId?: string;
  typePage: "create" | "update" | "delete";
};

type SnippetBody = {
  id?: string;
  title: string;
  content: string;
  language: string;
  tags: string[];
  authorId?: string;
};

export default function SnippetForm({
  initial = null,
  authorId,
  typePage,
}: SnippetFormType) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [language, setLanguage] = useState(initial?.language || "javascript");
  const [tags, setTags] = useState(
    (initial?.tags || [])
      .map((item: { tag: { name: string } }) => item.tag.name)
      .join(",")
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const body: SnippetBody = {
      title,
      content,
      language,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      authorId,
      id: initial?.id,
    };

    let res: Response;

    try {
      if (typePage === "create") {
        res = await fetch("/api/snippets", {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
      } else if (typePage === "update") {
        res = await fetch(`/api/snippets`, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        res = await fetch(`/api/snippets?id=${initial.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      }

      // 🔹 Đợi server trả JSON xong mới chuyển trang
      const data = await res.json();
      console.log("✅ Saved snippet:", data);

      if (res.ok) {
        router.push("/snippets");
        router.refresh(); // làm mới list snippets
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Error submitting snippet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#ffe94e]">
          {typePage === "update" ? "Update" : "Create"} Snippet
        </h1>

        <form
          onSubmit={submit}
          className="bg-[#1b1b1b] rounded-2xl shadow-lg border border-[#2a2a2a] p-6 space-y-4"
        >
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your snippet title..."
              required
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
            />
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="php">PHP</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="sql">SQL</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="bash">Bash</option>
            </select>
          </div>

          {/* Code Editor */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Code</label>
            <div className="bg-[#151515] rounded-xl overflow-hidden shadow-md border border-[#2a2a2a]">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#202020] border-b border-[#2a2a2a]">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="ml-3 text-sm text-gray-400">Monokai</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                required
                className="w-full bg-transparent font-mono text-sm p-4 text-gray-100 outline-none resize-none whitespace-pre-wrap"
                placeholder={`// write your code here...`}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Tags</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. react, hooks, ui"
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl bg-[#ffe94e] text-black font-semibold hover:bg-[#fddc3c] transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Snippet"}
          </button>
        </form>
      </div>
    </div>
  );
}
