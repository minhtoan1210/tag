import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
 context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const snippets = await prisma.snippet.findMany({
    where: { authorId: id },
    orderBy: { createdAt: "desc" },
  });

  const user = await prisma.user.findUnique({
    where: { id },
  });

  return NextResponse.json({ data: { snippets, user } }, { status: 200 });
}
