"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Halo! Saya Baswara AI, asisten layanan pelanggan PT. Anugerah Baswara Megah. Ada yang bisa saya bantu terkait produk, solusi, atau informasi di website ini?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const payload = {
        // Kirim hanya beberapa pesan terakhir supaya ringan
        messages: [...messages, userMessage].slice(-6).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Gagal menghubungi server AI");
      }

      const data = (await res.json()) as { reply?: string };
      const replyText = data.reply?.trim() || "Maaf, saat ini bot sedang mengalami kendala. Silakan coba lagi atau hubungi kami melalui WhatsApp.";

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: replyText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const assistantMessage: ChatMessage = {
        id: Date.now() + 2,
        role: "assistant",
        content:
          "Maaf, terjadi kesalahan saat menghubungi server. Untuk bantuan cepat, Anda bisa menghubungi kami melalui WhatsApp di pojok kanan bawah.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end space-y-3">
      {open && (
        <div className="w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-[#FC0002] text-white flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Baswara AI Assistant</div>
              <div className="text-xs text-white/80">Customer service bot yang ramah</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto px-4 py-3 space-y-3 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    m.role === "user"
                      ? "inline-flex rounded-2xl bg-[#1A7B4C] text-white px-3 py-2 max-w-[85%]"
                      : "inline-flex rounded-2xl bg-gray-100 text-gray-900 px-3 py-2 max-w-[85%]"
                  }
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="border-t border-gray-200 px-3 py-2 bg-white">
            <div className="flex items-end space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={1}
                className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FC0002] focus:border-transparent"
                placeholder="Tanyakan apa saja tentang produk atau solusi kami..."
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-[#1A7B4C] hover:bg-[#166A42] text-white w-9 h-9 text-xs font-semibold disabled:opacity-60"
              >
                {loading ? "..." : "Kirim"}
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-full bg-black hover:bg-black/80 text-white w-12 h-12 shadow-lg"
        aria-label="Buka chatbot Baswara AI"
      >
        <span className="text-lg font-bold">AI</span>
      </button>
    </div>
  );
}
