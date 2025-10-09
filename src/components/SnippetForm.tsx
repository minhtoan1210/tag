"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

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
  authorId?: string | undefined;
};

export default function SnippetForm({
  initial = null,
  authorId,
  typePage,
}: SnippetFormType) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [language, setLanguage] = useState(initial?.language || "javascript");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userId, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [tags, setTags] = useState(
    (initial?.tags || [])
      ?.map((item: { tag: { name: string } }) => item.tag.name)
      .join(",")
  );

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoadingUser(false));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const body: SnippetBody = {
      title,
      content,
      language,
      tags: tags
        .split(",")
        ?.map((t: string) => t.trim())
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

      if (res.ok) {
        router.push("/snippets");
        router.refresh();
        toast.success("Successfully created!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err: any) {
      toast.error(`Error submitting snippet`);
      console.log("err", err)
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    console.log("hehe");
  }

  if (loadingUser) return <div>Đang kiểm tra đăng nhập...</div>;

  return (
    <div className="min-h-screen text-gray-100 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-400">
          Snippet
        </h1>
        <p className="text-center mb-4 text-gray-400">
          Create and share beautiful images of your source code. <br />
          Start typing or drop a file into the text area to get started.
        </p>

        <form
          onSubmit={submit}
          className="bg-[#1b1b1b] rounded-2xl shadow-lg border border-[#2a2a2a] p-6 space-y-4"
        >
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your snippet title..."
              required
              className="bg-[#111] border border-[#333] text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Language</label>
            {/* <select
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
            </select> */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full bg-[#111] border border-[#333] rounded-lg text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none">
                <SelectValue placeholder="Chọn ngôn ngữ" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] text-gray-100 border border-[#333]">
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="bash">Bash</SelectItem>
              </SelectContent>
            </Select>
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
          <TooltipProvider>
            <div className="flex justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={
                      !userId?.user
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  >
                    <Button
                      type="submit"
                      disabled={!userId?.user}
                      className={`w-[100px] mr-2 mt-4 text-[14px] py-3 rounded-xl cursor-pointer bg-white text-black font-semibold hover:bg-white transition`}
                    >
                      {loading ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  <p>
                    {userId?.user
                      ? "Lưu snippet của bạn"
                      : "Bạn cần đăng nhập để lưu"}
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={
                      !userId?.user
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  >
                    <Button
                      onClick={handleSubmit}
                      disabled={!userId?.user}
                      className={`w-[100px] mt-4 text-[14px] py-3 cursor-pointer rounded-xl bg-white text-black font-semibold hover:bg-white transition `}
                    >
                      Share
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  <p>
                    {userId?.user
                      ? "Chia sẻ snippet của bạn"
                      : "Bạn cần đăng nhập để chia sẻ"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </form>
      </div>
    </div>
  );
}
