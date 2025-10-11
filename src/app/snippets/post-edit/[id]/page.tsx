"use client";
import SnippetForm from "@/components/SnippetForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SnippetsEditPage() {
  const params = useParams();
  const id = params.id;
  const [snippet, setSnippet] = useState<any>(null);
  const [loadingSnippet, setLoadingSnippet] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (!id) return;
    const fetchSnippet = async () => {
      try {
        const res = await fetch(`/api/snippets?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch snippet");
        const data = await res.json();
        setSnippet(data);
      } catch (err: any) {
        console.log("err", err)
      } finally {
        setLoadingSnippet(false);
      }
    };

    fetchSnippet();
  }, [id]);


  if (loadingSnippet) return <div className="text-[white] text-center mt-2">{t("loading")}</div>;
  
  return (
    <SnippetForm typePage="update" initial={snippet} />
  );
}
