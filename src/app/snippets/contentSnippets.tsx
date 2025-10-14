/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type ContentSnippets = {
  user: string | undefined;
  page?: string;
};

export default function ContentSnippetsComponent({
  user,
  page,
}: ContentSnippets) {
  const [list, setList] = useState<any[]>([]);
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const fetchSnippets = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/snippets?page=${page}`);
      const data = await res.json();
      setList(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleDetele = async (id: string) => {
    await fetch(`/api/snippets?id=${id}`, { method: "DELETE" });
    await fetchSnippets();
  };

  const handleShowDetail = (id: string) => {
    router.push(`/snippets/post-edit/${id}`);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-700 bg-[#111827] shadow">
      <div className="grid gap-4 lg:grid-cols-2 p-2 grid-cols-1">
        {loading ? (
          <span className="text-[white]">Loading......</span>
        ) : (
          <>
            {Array.isArray(list) &&
              list?.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-[#1e293b] border border-gray-700 rounded-lg p-4 hover:bg-[#334155] transition"
                >
                  <div
                    className="text-lg font-semibold text-gray-100 mb-2 flex items-center cursor-pointer"
                    onClick={() => handleShowDetail(item.id)}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 6.675l-1.8-.6c-.2-.1-.3-.3-.2-.4l.9-1.7c.6-1.2-.7-2.5-1.9-1.9l-1.7.9c-.1.1-.3 0-.4-.2l-.6-1.8c-.4-1.3-2.2-1.3-2.6 0l-.6 1.8c-.1.2-.3.3-.4.2l-1.7-.9c-1.2-.6-2.5.7-1.9 1.9l.9 1.7c.1.1 0 .3-.2.4l-1.8.6c-1.3.4-1.3 2.3 0 2.7l1.8.6c.2 0 .3.2.2.3l-.9 1.7c-.6 1.2.7 2.5 1.9 1.9l1.7-.9c.2-.1.4 0 .4.2l.6 1.8c.4 1.3 2.3 1.3 2.7 0l.6-1.8c.1-.2.3-.3.4-.2l1.7.9c1.2.6 2.5-.7 1.9-1.9l-1-1.7c-.1-.2 0-.4.2-.4l1.8-.6c1.3-.4 1.3-2.2 0-2.6zm-7 3.7c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4 1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.4-2.4 2.4z"
                        fill="#4C4F5A"
                      ></path>
                    </svg>
                    <p className="ml-1">{item.language}</p>
                  </div>
                  <div
                    className="mb-2 cursor-pointer text-[white]"
                    onClick={() => handleShowDetail(item.id)}
                  >
                    {item.title}
                  </div>
                  <SyntaxHighlighter
                    language={item.language || "javascript"}
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      background: "#0f172a",
                      fontSize: "0.85rem",
                      padding: "1rem",
                      maxHeight: "300px",
                      overflowY: "auto",
                      borderRadius: "0.5rem",
                    }}
                    className="custom-scroll"
                  >
                    {item.content}
                  </SyntaxHighlighter>

                  <div className="text-sm text-gray-300 mt-2">
                    <strong>{t("home_page.btn.tags")}:</strong>{" "}
                    {item.tags && item.tags.length > 0
                      ? item.tags
                          ?.map(
                            (itemTag: { tag: { name: string } }) =>
                              itemTag.tag?.name
                          )
                          .join(", ")
                      : `${t("home_page.btn.no_tag")}`}
                  </div>

                  {user && page !== "home" && (
                    <div className="absolute top-3 right-3 flex gap-2 opacity-100 transition-opacity">
                      <Link
                        href={`/snippets/post-edit/${item.id}`}
                        className="text-indigo-400 hover:text-indigo-300 text-sm"
                      >
                        {t("home_page.btn.edit")}
                      </Link>
                      <button
                        onClick={() => handleDetele(item.id)}
                        className="text-red-400 hover:text-red-300 text-sm cursor-pointer"
                      >
                        {t("home_page.btn.delete")}
                      </button>
                    </div>
                  )}

                  <Link
                    href={`/profile/${item?.author?.id}`}
                    className="cursor-pointer text-gray-300"
                  >
                   <span>{t("author")}</span>: {item?.author?.email}
                  </Link>
                </div>
              ))}
            {list.length === 0 && (
              <div className="text-gray-500 text-sm">
                {t("home_page.btn.no_snippets")}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
