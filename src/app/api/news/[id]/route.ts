import { NextResponse } from "next/server";
import { deleteNews, getNewsById, updateNews, type NewsInput } from "@/lib/newsStore";

export async function GET(
  _request: Request,
  context: any
) {
  try {
    const item = await getNewsById(context.params.id);
    if (!item) {
      return NextResponse.json({ message: "Berita tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (err) {
    console.error("Failed to load news item", err);
    return NextResponse.json({ message: "Failed to load news" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: any) {
  try {
    const body = (await request.json()) as NewsInput;

    const item = await updateNews(context.params.id, {
      title: body.title?.trim(),
      summary: body.summary?.trim(),
      date: body.date,
      url: body.url?.trim() || undefined,
      imageUrl: body.imageUrl?.trim() || undefined,
    });

    return NextResponse.json(item);
  } catch (err: any) {
    console.error("Failed to update news", err);
    return NextResponse.json(
      { message: err?.message || "Failed to update news" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: any
) {
  try {
    await deleteNews(context.params.id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Failed to delete news", err);
    return NextResponse.json(
      { message: err?.message || "Failed to delete news" },
      { status: 400 },
    );
  }
}
