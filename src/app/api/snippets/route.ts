import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    let userId: string | null = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          userId: string;
        };
        userId = decoded.userId;
      } catch (err) {
        console.warn("Invalid token:", err);
      }
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const page = url.searchParams.get("page");

    if (id) {
      const data = await prisma.snippet.findUnique({
        where: { id },
        include: { tags: { include: { tag: true } }, author: true },
      });
      return NextResponse.json(data);
    }

    let snippets;

    if (page === "home") {
      snippets = await prisma.snippet.findMany({
        include: { tags: { include: { tag: true } }, author: true },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(snippets);
    }

    if (userId) {
      snippets = await prisma.snippet.findMany({
        where: { authorId: userId },
        include: { tags: { include: { tag: true } }, author: true },
        orderBy: { createdAt: "desc" },
      });
    } else {
      snippets = await prisma.snippet.findMany({
        include: { tags: { include: { tag: true } }, author: true },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(snippets);
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token found" },
        { status: 401 }
      );
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      userId = decoded.userId;
    } catch (err) {
      console.error("Invalid token:", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    console.log("userId", userId)
    
    const body = await req.json();
    const slug =
      (body.title || "snippet")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .slice(0, 80) +
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
        authorId: userId,
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
  } catch (error) {
    console.error("Error creating snippet:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized - No token found" },
      { status: 401 }
    );
  }

  let userId: string;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    userId = decoded.userId;
  } catch (err) {
    console.error("Invalid token:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!body.id) {
    return NextResponse.json({ message: "id required" }, { status: 400 });
  }

  const isCheck = await prisma.snippet.findUnique({
    where: { id: body.id, authorId: userId },
  });

  if (!isCheck) {
    const slug =
      (body.title || "snippet")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .slice(0, 80) +
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
        authorId: userId,
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
