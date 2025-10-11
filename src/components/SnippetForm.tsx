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
import { useTranslation } from "react-i18next";
import { estimateComplexity } from "@/lib/complexityAnalyzer";

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
  const { t } = useTranslation();

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then(setUser)
      .catch(console.log)
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
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    try {
      const url = window.location.href;
      toast.success("Copy successful!");
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.log(err);
    }
  };

  if (loadingUser) return <div className="text-[white] text-center mt-2">{t("loading")}</div>;;

  return (
    <div className="min-h-screen text-gray-100 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-400">
          {t("snippet_form.snippet")}
        </h1>
        <p className="text-center mb-4 text-gray-400">
          {t("snippet_form.title1")}<br/>
          {t("snippet_form.title2")}
        </p>
        <form
          onSubmit={submit}
          className="bg-[#1b1b1b] rounded-2xl shadow-lg border border-[#2a2a2a] p-6 space-y-4"
        >
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">{t("snippet_form.title")}</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder= {t("snippet_form.your_snippet")}
              required
              className="bg-[#111] border border-[#333] text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">{t("snippet_form.language")}</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full bg-[#111] border border-[#333] rounded-lg text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none">
                <SelectValue placeholder={t("snippet_form.select_language")} />
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

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">{t("snippet_form.code")}</label>
            <div className="bg-[#151515] rounded-xl overflow-hidden shadow-md border border-[#2a2a2a]">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#202020] border-b border-[#2a2a2a]">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                required
                className="w-full bg-transparent font-mono text-sm p-4 text-gray-100 outline-none resize-none whitespace-pre-wrap"
                placeholder={t("snippet_form.write_your_code_here")}
              />
              <div>{t("complexity")}: {estimateComplexity(content)}</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">{t("snippet_form.tags")}</label>
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
                      {loading ? `${t("snippet_form.save_loading")}` : `${t("snippet_form.save")}`}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  <p>
                    {userId?.user
                      ? `${t("snippet_form.tool_save")}`
                      : `${t("snippet_form.you_need_to")}`}
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
                      type="button"
                      onClick={handleSubmit}
                      disabled={!userId?.user}
                      className={`w-[100px] mt-4 text-[14px] py-3 cursor-pointer rounded-xl bg-white text-black font-semibold hover:bg-white transition `}
                    >
                      {t("snippet_form.share")}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  <p>
                    {userId?.user
                      ? `${t("snippet_form.share_your_snippet")}`
                      : `${t("you_need_to_log_in")}`}
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
