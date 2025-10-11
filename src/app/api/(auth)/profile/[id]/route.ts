import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: any
) {
  try {
    const { params } = context;
    const id = params.id;

    const snippets = await prisma.snippet.findMany({
      where: { authorId: id },
      orderBy: { createdAt: "desc" },
      include: {
        tags: { include: { tag: true } },
        author: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: { snippets, user } }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
