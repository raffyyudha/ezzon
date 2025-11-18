"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import RichTextEditor from "@/components/RichTextEditor";
import type { NewsItem } from "@/lib/newsStore";

const STORAGE_KEY = "adminNewsAuth";

export default function AdminNewsPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem(STORAGE_KEY);
    if (token === "baswaranewss") {
      setAuthorized(true);
    } else {
      router.replace("/admin");
    }
  }, [router]);

  useEffect(() => {
    if (!authorized) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error("Gagal memuat data berita");
        const data = (await res.json()) as NewsItem[];
        setItems(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [authorized]);

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSummary(item.summary);
    setContent(item.content || "");
    setDate(item.date || "");
    setUrl(item.url || "");
    setImageUrl(item.imageUrl || "");
    setImageFile(null);
    setError(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setSummary("");
    setContent("");
    setDate("");
    setUrl("");
    setImageUrl("");
    setImageFile(null);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    const ok = typeof window !== "undefined" ? window.confirm("Yakin ingin menghapus berita ini?") : true;
    if (!ok) return;

    try {
      setError(null);
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message =
          typeof body === "object" && body && "message" in body && typeof body.message === "string"
            ? body.message
            : "Gagal menghapus berita";
        throw new Error(message);
      }
      setItems((prev) => prev.filter((it) => it.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal menghapus berita";
      setError(message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      setError("Judul dan ringkasan wajib diisi");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Tentukan URL gambar final: unggah file ke Supabase jika ada, jika tidak pakai URL manual
      let finalImageUrl = imageUrl.trim();

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await fetch("/api/news/upload-image", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const body = await uploadRes.json().catch(() => ({}));
          throw new Error(body?.message || "Gagal mengupload gambar");
        }

        const uploadJson = (await uploadRes.json()) as { url?: string };
        if (uploadJson.url) {
          finalImageUrl = uploadJson.url;
        }
      }

      const payload = { title, summary, content, date, url, imageUrl: finalImageUrl || undefined };

      const res = await fetch(editingId ? `/api/news/${editingId}` : "/api/news", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message =
          typeof body === "object" && body && "message" in body && typeof body.message === "string"
            ? body.message
            : "Gagal menyimpan berita";
        throw new Error(message);
      }

      const saved = (await res.json()) as NewsItem;
      setItems((prev) => {
        if (!editingId) {
          return [saved, ...prev];
        }
        return prev.map((it) => (it.id === editingId ? saved : it));
      });

      setTitle("");
      setSummary("");
      setContent("");
      setDate("");
      setUrl("");
      setImageUrl("");
      setImageFile(null);
      setEditingId(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal menyimpan berita";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (value: string) => {
    if (!value) return "";
    try {
      const d = new Date(value);
      return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return value;
    }
  };

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-10">
        <div className="container max-w-5xl">
          <h1 className="text-3xl font-bold mb-6">Admin Berita &amp; Event</h1>
          <p className="text-gray-600 mb-8">
            Gunakan halaman ini untuk menambahkan berita atau event yang akan tampil di fitur
            Berita &amp; Event.
          </p>

          {/* Form */}
          <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Berita / Event" : "Tambah Berita / Event"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-gray-600 hover:text-gray-800 underline"
                >
                  Batalkan edit
                </button>
              )}
            </div>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="Judul berita atau event"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Jika dikosongkan, akan otomatis menggunakan tanggal hari ini.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL (opsional)
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="Link artikel lengkap (jika ada)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Gambar (opsional)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="Contoh: /images/news/berita-1.jpg atau URL publik lain"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Anda dapat mengisi URL manual, atau mengunggah file gambar di bawah ini.
                </p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Gambar (opsional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImageFile(file);
                    }}
                    className="block w-full text-sm text-gray-700 file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Jika Anda memilih file, sistem akan mengupload gambar ke Supabase dan
                    otomatis menggunakan URL tersebut.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ringkasan *
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm min-h-[120px]"
                  placeholder="Ringkasan singkat berita atau event"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Ringkasan akan tampil di halaman daftar berita. Untuk artikel lengkap, gunakan editor di bawah.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Artikel Lengkap (opsional)
                </label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Tulis artikel lengkap dengan format profesional di sini. Anda bisa menambahkan heading, bold, italic, list, link, gambar, dan lainnya..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  Gunakan toolbar di atas untuk memformat artikel. Artikel ini akan tampil di halaman detail berita.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-5 py-2.5 bg-primary text-white rounded-md text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting
                  ? editingId
                    ? "Menyimpan Perubahan..."
                    : "Menyimpan..."
                  : editingId
                    ? "Simpan Perubahan"
                    : "Simpan Berita"}
              </button>
            </form>
          </section>

          {/* List */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Daftar Berita &amp; Event</h2>

            {loading ? (
              <p className="text-gray-600 text-sm">Memuat data...</p>
            ) : items.length === 0 ? (
              <p className="text-gray-600 text-sm">Belum ada berita yang tersimpan.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-start gap-3 hover:shadow-sm transition-shadow"
                  >
                    {item.imageUrl && (
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-primary font-semibold uppercase tracking-wide">
                        {formatDate(item.date)}
                      </p>
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {item.summary}
                      </p>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[11px] text-primary hover:text-primary/80 mt-1"
                        >
                          Lihat artikel &rarr;
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1 ml-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="text-xs text-primary hover:text-primary/80 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
