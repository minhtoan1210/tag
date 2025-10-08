import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: Request) {
  const url = new URL(req.url);
  console.log("url", url);
  const id = url.searchParams.get("id");
  if (id) {
    const s = await prisma.snippet.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } }, author: true },
    });
    return NextResponse.json(s);
  }
  const list = await prisma.snippet.findMany({
    include: { tags: { include: { tag: true } }, author: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  // expected: { title, content, language, description, tags: ['js','algos'], authorId }

  const slug =
    (body.title || "snippet").toLowerCase().replace(/\s+/g, "-").slice(0, 80) +
    "-" +
    uuidv4().slice(0, 6);

  const uniqueTags = [...new Set(body.tags as string[])];

  const snippet = await prisma.snippet.create({
    data: {
      title: body.title,
      content: body.content,
      language: body.language,
      description: body.description,
      slug,
      authorId: body.authorId,
      type: "public",
      tags: {
        create: uniqueTags.map((t: string) => ({
          tag: {
            connectOrCreate: {
              where: { name: t },
              create: { name: t, type: "language" },
            },
          },
        })),
      },
    },
    include: {
      tags: { include: { tag: true } },
    },
  });

  return NextResponse.json(snippet, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();

  if (!body.id) {
    return NextResponse.json({ message: "id required" }, { status: 400 });
  }

  console.log("bodybody", body);

  const updated = await prisma.snippet.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
      language: body.language,
      description: body.description,
      type: "public", // hoặc body.type nếu bạn gửi từ client
      tags: {
        deleteMany: {}, // xóa hết tag cũ
        create: body.tags.map((tagName: string) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: {
                name: tagName,
                type: "language",
              },
            },
          },
        })),
      },
    },
    include: {
      tags: { include: { tag: true } },
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "id required" }, { status: 400 });
  }
  try {
    await prisma.snippetTag.deleteMany({
      where: { snippetId: id },
    });
    await prisma.snippet.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { message: "Failed to delete snippet" },
      { status: 500 }
    );
  }
}
