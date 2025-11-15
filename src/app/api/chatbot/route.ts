import { NextResponse } from "next/server";

// Pastikan dijalankan di lingkungan Node.js
export const runtime = "nodejs";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Debug logging (hanya di development)
if (process.env.NODE_ENV === 'development') {
  console.log('OPENROUTER_API_KEY exists:', !!OPENROUTER_API_KEY);
  console.log('OPENROUTER_API_KEY length:', OPENROUTER_API_KEY?.length || 0);
}

export async function POST(request: Request) {
  if (!OPENROUTER_API_KEY) {
    console.error("OPENROUTER_API_KEY not found in environment variables");
    return NextResponse.json(
      { 
        reply: "Maaf, layanan AI sedang dalam pemeliharaan. Silakan hubungi kami melalui WhatsApp 08174147477 untuk bantuan langsung.",
        error: "API key not configured"
      },
      { status: 200 }, // Return 200 so frontend doesn't show error
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
        model: "gpt-4.0",
        messages,
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("OpenRouter DeepSeek error", response.status, text);
      return NextResponse.json(
        {
          reply:
            "Maaf, layanan AI sedang sibuk. Silakan coba lagi dalam beberapa saat atau hubungi kami melalui WhatsApp 08174147477.",
          error: `OpenRouter DeepSeek error: ${response.status}`,
        },
        { status: 200 },
      );
    }

    type OpenRouterChoice = { message?: { content?: string } };
    type OpenRouterResponse = { choices?: OpenRouterChoice[] };

    const json = (await response.json()) as OpenRouterResponse;
    const rawReply: string = json?.choices?.[0]?.message?.content?.trim() ?? "";

    // Fallback jika reply kosong
    const baseReply =
      rawReply ||
      "Maaf, saya tidak bisa memproses pertanyaan Anda saat ini. Silakan hubungi tim sales kami di WhatsApp 08174147477 untuk bantuan langsung.";

    // Hapus semua tanda kutip ganda dari jawaban agar lebih mudah dibaca klien
    const finalReply = baseReply.replace(/"/g, "");

    return NextResponse.json({ reply: finalReply });
  } catch (err) {
    console.error("Chatbot route error", err);
    return NextResponse.json({ 
      reply: "Maaf, terjadi kesalahan teknis. Untuk bantuan segera, silakan hubungi kami melalui WhatsApp 08174147477.",
      error: "Server error"
    }, { status: 200 });
  }
}
