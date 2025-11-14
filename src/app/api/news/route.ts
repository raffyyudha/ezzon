import { NextResponse } from "next/server";
import { addNews, getAllNews, NewsInput } from "@/lib/newsStore";

export async function GET() {
  try {
    const items = await getAllNews();
    return NextResponse.json(items);
  } catch (err) {
    console.error("Failed to load news", err);
    return NextResponse.json({ message: "Failed to load news" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NewsInput;

    const item = await addNews({
      title: body.title?.trim(),
      summary: body.summary?.trim(),
      date: body.date,
      url: body.url?.trim() || undefined,
      imageUrl: body.imageUrl?.trim() || undefined,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    console.error("Failed to add news", err);
    return NextResponse.json(
      { message: err?.message || "Failed to add news" },
      { status: 400 },
    );
  }
}
