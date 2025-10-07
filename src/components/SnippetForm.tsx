"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SnippetForm({ initial = null, authorId }: any) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [language, setLanguage] = useState(initial?.language || "javascript");
  const [tags, setTags] = useState(
    (initial?.tags || []).map((t: any) => t.tag.name).join(",")
  );
  const router = useRouter();

  async function submit(e: any) {
    e.preventDefault();
    const body = {
      title,
      content,
      language,
      tags: tags.split(",").map((s) => s.trim()).filter(Boolean),
      authorId,
    };
    const res = await fetch("/api/snippets", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) router.push("/snippets");
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#ffe94e]">
          Create Snippet
        </h1>

        <form
          onSubmit={submit}
          className="bg-[#1b1b1b] rounded-2xl shadow-lg border border-[#2a2a2a] p-6 space-y-4"
        >
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your snippet title..."
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Language</label>
            <input
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="e.g. JavaScript, Python..."
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Code</label>

            {/* Fake "code window" like Carbon */}
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
                rows={10}
                className="w-full bg-transparent font-mono text-sm p-4 text-gray-100 outline-none resize-none"
                placeholder={`// write your code here...`}
              />
            </div>
          </div>

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
            className="w-full mt-4 py-3 rounded-xl bg-[#ffe94e] text-black font-semibold hover:bg-[#fddc3c] transition"
          >
            Save Snippet
          </button>
        </form>
      </div>
    </div>
  );
}
