"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRouter } from "next/navigation";

type ContentSnippets = {
  page?: string;
  list?: any
};

export default function CardProfileComponent({
  list,
}: ContentSnippets) {
  const router = useRouter();

  const handleShowDetail = (id: string) => {
    router.push(`/snippets/post-edit/${id}`);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-700 bg-[#111827] shadow">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 p-2">
        {Array.isArray(list) && list?.map((item: any) => (
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
              <strong>Tags:</strong>{" "}
              {item.tags && item.tags.length > 0
                ? item.tags
                    .map(
                      (itemTag: { tag: { name: string } }) => itemTag.tag?.name
                    )
                    .join(", ")
                : "No tags"}
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="col-span-full text-center text-gray-500 text-sm">
            No snippets found.
          </div>
        )}
      </div>
    </div>
  );
}
