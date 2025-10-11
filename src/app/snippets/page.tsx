import { cookies } from "next/headers";
import SnippetsClient from "./components/snippetsClient";

export const metadata = {
  title: "Snippets - SnippetShare",
  description:
    "Danh sách tất cả snippets trong dự án của bạn, bao gồm tiêu đề, mô tả và tags.",
};

export default async function SnippetsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return <SnippetsClient token={token}/>;
}
