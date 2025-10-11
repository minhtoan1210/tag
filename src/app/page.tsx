import { cookies } from "next/headers";
import ContentSnippetsComponent from "./snippets/contentSnippets";
import TitleHomeComponent from "./titleHomeComponent";

export const metadata = {
  title: "SnippetShare - Chia sẻ code nhanh chóng",
  description:
    "Chào mừng đến với SnippetShare, nơi chia sẻ code hữu ích nhanh chóng.",
  openGraph: {
    title: "SnippetShare",
    description: "Chia sẻ code nhanh chóng",
    url: "https://tag-liard.vercel.app/",
    siteName: "SnippetShare",
    type: "website",
  },
};

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <TitleHomeComponent token={token} />
      <ContentSnippetsComponent user={token} page="home" />
    </main>
  );
}
