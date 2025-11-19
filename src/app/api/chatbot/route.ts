import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Pastikan dijalankan di lingkungan Node.js
export const runtime = "nodejs";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL_ID = process.env.OPENROUTER_MODEL_ID ?? "openai/gpt-4o";

// Debug logging (hanya di development)
if (process.env.NODE_ENV === 'development') {
  console.log('OPENROUTER_API_KEY exists:', !!OPENROUTER_API_KEY);
  console.log('OPENROUTER_API_KEY length:', OPENROUTER_API_KEY?.length || 0);
}

// Load knowledge base
let knowledgeBase = "";
try {
  const knowledgeBasePath = path.join(process.cwd(), "ai-knowledge-base.md");
  knowledgeBase = fs.readFileSync(knowledgeBasePath, "utf-8");
  console.log("✅ Knowledge base loaded successfully");
} catch (error) {
  console.error("⚠️ Failed to load knowledge base:", error);
  knowledgeBase = "Knowledge base tidak tersedia. Gunakan informasi umum.";
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
          `Kamu adalah Baswara AI, asisten layanan pelanggan yang ramah dan profesional untuk PT. Anugerah Baswara Megah (ABM). Jawab selalu dalam bahasa Indonesia yang sopan, mudah dipahami, dan akurat. Berikan jawaban yang informatif namun tetap to the point.

INFORMASI PENTING PERUSAHAAN:
- Kantor Pusat: Paccerakang Raya No. 150A, Biringkanaya, Makassar 90241, Sulawesi Selatan
- Kantor Cabang: Jl. Gajah Mada No.27A, RT.5/RW.7, Krukut, Taman Sari, Jakarta Barat 11140
- Telepon/WhatsApp: +62 817 4147 477
- Email: sales@baswarasolution.com
- Jam Operasional: Senin-Jumat 9:00-18:00, Sabtu 9:00-16:00, Minggu dengan janji temu

CARA KERJA SERTEC CMCE (PENTING - JAWAB DENGAN BENAR):
SERTEC CMCE bekerja dengan cara mengkompensasi ion positif dan negatif di atmosfer atau de-Ionisasi sistem. Sistem ini dirancang untuk mendeteksi dan menangkap petir sebelum mencapai struktur yang dilindungi. Dengan teknologi yang canggih, SERTEC memastikan proteksi maksimal dan mengurangi risiko kerusakan akibat petir.

KNOWLEDGE BASE PRODUK:
Gunakan informasi lengkap di bawah ini untuk menjawab pertanyaan tentang produk, spesifikasi, dan rekomendasi:

${knowledgeBase}

PANDUAN MENJAWAB:
1. Gunakan knowledge base untuk memberikan informasi detail dan akurat tentang produk
2. Sebutkan model/tipe produk yang spesifik jika ditanya rekomendasi
3. Jelaskan fitur dan keunggulan produk dengan jelas
4. Bandingkan produk jika customer meminta
5. Berikan rekomendasi berdasarkan kebutuhan customer (industri, aplikasi, budget)
6. Jika informasi tidak ada di knowledge base, sarankan customer menghubungi sales untuk konsultasi detail

Fokus pada memberikan value dan membantu customer menemukan solusi terbaik. Jika ada pertanyaan teknis mendalam atau butuh quotation, arahkan ke tim sales melalui WhatsApp 08174147477 atau email sales@baswarasolution.com.`,
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
        model: OPENROUTER_MODEL_ID,
        messages,
        temperature: 0.3, // Lower for more accurate knowledge-based responses
        max_tokens: 1000, // Enough for detailed product explanations
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
