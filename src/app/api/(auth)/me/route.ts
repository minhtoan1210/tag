import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ user: null }, { status: 200 });
  }

  return Response.json({ user: { token } }, { status: 200 });
}
