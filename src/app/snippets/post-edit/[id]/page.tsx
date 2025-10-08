/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SnippetForm from "@/components/SnippetForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SnippetsEditPage() {
  const params = useParams();
  const id = params.id;
  const [snippet, setSnippet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchSnippet = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/snippets?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch snippet");
        const data = await res.json();
        setSnippet(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!snippet) return <div>No snippet found</div>;

  return <SnippetForm typePage="update" initial={snippet} />;
}
