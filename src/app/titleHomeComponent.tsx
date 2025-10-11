"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function TitleHomeComponent({ token }: any) {
  const { t } = useTranslation();

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[white]">
          {t("home_page.snippet_share")}
        </h1>
        {token && (
          <>
            <nav className="space-x-4">
              <Link href="/snippets" className="text-[white]">
                {t("home_page.snippets")}
              </Link>
              <Link
                href="/snippets/post-new"
                className="ml-2 rounded border px-3 py-1 text-[white]"
              >
                {t("home_page.new")}
              </Link>
            </nav>
          </>
        )}
      </header>

      <section>
        <p className="text-[white] mb-4">{t("home_page.title")}</p>
      </section>
    </>
  );
}
