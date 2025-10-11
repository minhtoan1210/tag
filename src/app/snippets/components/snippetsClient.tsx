"use client";
import Link from "next/link";
import ContentSnippetsComponent from "../contentSnippets";
import { useTranslation } from "react-i18next";

export default function SnippetsClient({
  token,
}: {
  token: string | undefined;
}) {
  const { t } = useTranslation();
  return (
    <main className="max-w-5xl mx-auto p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{t("snippets")}</h2>
          <p className="text-gray-400">{t("snippets_page.title")}</p>
        </div>
        <Link
          href="/snippets/post-new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
          {t("snippets_page.add")}
        </Link>
      </div>

      <ContentSnippetsComponent user={token} />
    </main>
  );
}
