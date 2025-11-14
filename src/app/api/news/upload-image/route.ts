import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Paksa route ini berjalan di lingkungan Node.js
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ message: "File tidak valid" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const originalName = "name" in file && typeof (file as File).name === "string" ? (file as File).name : "news-image";
    const extIndex = originalName.lastIndexOf(".");
    const ext = extIndex !== -1 ? originalName.slice(extIndex) : "";
    const filePath = `news/${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const contentType = "type" in file && typeof (file as Blob).type === "string" ? (file as Blob).type : "image/jpeg";

    const { error } = await supabase.storage.from("news-images").upload(filePath, buffer, {
      contentType,
      upsert: false,
    });

    if (error) {
      console.error("Supabase upload error", error);
      return NextResponse.json({ message: "Gagal mengupload gambar" }, { status: 500 });
    }

    const { data } = supabase.storage.from("news-images").getPublicUrl(filePath);

    return NextResponse.json({ url: data.publicUrl }, { status: 201 });
  } catch (err: unknown) {
    console.error("Failed to upload news image", err);
    return NextResponse.json({ message: "Gagal mengupload gambar" }, { status: 500 });
  }
}
