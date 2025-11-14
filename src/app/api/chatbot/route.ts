import { NextResponse } from "next/server";

// Pastikan dijalankan di lingkungan Node.js
export const runtime = "nodejs";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(request: Request) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { message: "Server belum dikonfigurasi untuk OpenRouter." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as {
      messages?: { role: "user" | "assistant" | "system"; content: string }[];
    };

    const history = Array.isArray(body.messages) ? body.messages : [];

    const messages = [
      {
        role: "system" as const,
        content:
          "Kamu adalah Baswara AI, asisten layanan pelanggan yang ramah untuk PT. Anugerah Baswara Megah (ABM). Jawab selalu dalam bahasa Indonesia yang sopan dan mudah dipahami. Berikan jawaban singkat dan to the point, tapi jelas. Fokus pada informasi yang relevan dengan produk, solusi energi, proteksi petir SERTEC, kamera PTZ SENTER, dan layanan perusahaan yang ada di website. Jika kamu tidak yakin atau informasi tidak tersedia, sarankan pengguna untuk menghubungi tim sales melalui WhatsApp 08174147477 atau email sales@baswarasolution.com.",
      },
      ...history,
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "",
        "X-Title": "Baswara Website Chatbot",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages,
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("OpenRouter error", response.status, text);
      return NextResponse.json(
        { message: "Gagal menghubungi layanan AI" },
        { status: 500 },
      );
    }

    type OpenRouterChoice = { message?: { content?: string } };
    type OpenRouterResponse = { choices?: OpenRouterChoice[] };

    const json = (await response.json()) as OpenRouterResponse;
    const reply: string = json?.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chatbot route error", err);
    return NextResponse.json({ message: "Terjadi kesalahan di server" }, { status: 500 });
  }
}
