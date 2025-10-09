/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SnippetForm from "@/components/SnippetForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SnippetsEditPage() {
  const params = useParams();
  const id = params.id;
  const [snippet, setSnippet] = useState<any>(null);
  const [loadingSnippet, setLoadingSnippet] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchSnippet = async () => {
      try {
        const res = await fetch(`/api/snippets?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch snippet");
        const data = await res.json();
        setSnippet(data);
      } catch (err: any) {
      } finally {
        setLoadingSnippet(false);
      }
    };

    fetchSnippet();
  }, [id]);


  if (loadingSnippet) return <div>Đang kiểm tra đăng nhập...</div>;
  return (
    <SnippetForm typePage="update" initial={snippet} />
  );
}
