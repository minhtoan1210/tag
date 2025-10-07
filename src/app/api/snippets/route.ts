import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (id) {
    const s = await prisma.snippet.findUnique({ where: { id }, include: { tags: { include: { tag: true } }, author: true }});
    return NextResponse.json(s);
  }
  const list = await prisma.snippet.findMany({ include: { tags: { include: { tag: true } }, author: true }, orderBy: { createdAt: 'desc' }});
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  // expected: { title, content, language, description, tags: ['js','algos'], authorId }
  const slug = (body.title || 'snippet').toLowerCase().replace(/\s+/g, '-').slice(0, 80) + '-' + uuidv4().slice(0,6);
  const snippet = await prisma.snippet.create({
    data: {
      title: body.title,
      content: body.content,
      language: body.language,
      description: body.description,
      slug,
      authorId: body.authorId
    }
  });

  // attach tags (create if not exist)
  if (Array.isArray(body.tags)) {
    for (const t of body.tags) {
      const tag = await prisma.tag.upsert({
        where: { name: t },
        update: {},
        create: { name: t, type: 'topic' }
      });
      await prisma.snippetTag.create({ data: { snippetId: snippet.id, tagId: tag.id }});
    }
  }

  return NextResponse.json(snippet, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  if (!body.id) return NextResponse.json({ message: 'id required' }, { status: 400 });
  const updated = await prisma.snippet.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
      language: body.language,
      description: body.description
    }
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ message: 'id required' }, { status: 400 });
  await prisma.snippet.delete({ where: { id }});
  return NextResponse.json({ success: true });
}
