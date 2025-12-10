import { NextResponse } from "next/server";
import { deleteNews, getNewsById, updateNews, type NewsInput } from "@/lib/newsStore";

function getIdFromRequest(request: Request): string | null {
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] ?? null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const id = getIdFromRequest(request);
  if (!id) {
    return NextResponse.json({ message: "ID berita tidak valid" }, { status: 400 });
  }

  try {
    const item = await getNewsById(id);
    if (!item) {
      return NextResponse.json({ message: "Berita tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (err: unknown) {
    console.error("Failed to load news item", err);
    const message = err instanceof Error ? err.message : "Failed to load news";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const id = getIdFromRequest(request);
  if (!id) {
    return NextResponse.json({ message: "ID berita tidak valid" }, { status: 400 });
  }

  try {
    const body = (await request.json()) as NewsInput;

    const item = await updateNews(id, {
      title: body.title?.trim(),
      summary: body.summary?.trim(),
      content: body.content?.trim() || undefined,
      date: body.date,
      url: body.url?.trim() || undefined,
      imageUrl: body.imageUrl?.trim() || undefined,
      category: body.category?.trim() || undefined,
      tags: body.tags || undefined,
      author: body.author?.trim() || undefined,
      authorEmail: body.authorEmail?.trim() || undefined,
      status: body.status || undefined,
      slug: body.slug?.trim() || undefined,
      metaDescription: body.metaDescription?.trim() || undefined,
      metaKeywords: body.metaKeywords?.trim() || undefined,
      featured: body.featured !== undefined ? body.featured : undefined,
      scheduledDate: body.scheduledDate?.trim() || undefined,
    });

    return NextResponse.json(item);
  } catch (err: unknown) {
    console.error("Failed to update news", err);
    const message = err instanceof Error ? err.message : "Failed to update news";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const id = getIdFromRequest(request);
  if (!id) {
    return NextResponse.json({ message: "ID berita tidak valid" }, { status: 400 });
  }

  try {
    await deleteNews(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Failed to delete news", err);
    const message = err instanceof Error ? err.message : "Failed to delete news";
    return NextResponse.json({ message }, { status: 400 });
  }
}
