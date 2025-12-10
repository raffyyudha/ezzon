"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ModernRichTextEditor from "@/components/ModernRichTextEditor";
import type { NewsItem } from "@/lib/newsStore";

const STORAGE_KEY = "adminNewsAuth";

// Predefined categories
const CATEGORIES = [
  "Berita",
  "Event", 
  "Tutorial",
  "Pengumuman",
  "Press Release",
  "Artikel Teknis",
  "Case Study",
  "Lainnya"
];

export default function AdminNewsPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Basic fields
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  
  // Professional fields
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [author, setAuthor] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('published');
  const [slug, setSlug] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [featured, setFeatured] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  
  // UI State
  const [showAdvanced, setShowAdvanced] = useState(true);

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
        const res = await fetch("/api/news/admin"); // Use admin endpoint to get all articles
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

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !editingId) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  }, [title, editingId]);

  // Image preview
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else if (imageUrl) {
      setImagePreview(imageUrl);
    } else {
      setImagePreview("");
    }
  }, [imageFile, imageUrl]);

  // Statistics
  const stats = useMemo(() => {
    const total = items.length;
    const published = items.filter(i => i.status === 'published').length;
    const draft = items.filter(i => i.status === 'draft').length;
    const archived = items.filter(i => i.status === 'archived').length;
    const featuredCount = items.filter(i => i.featured).length;
    const totalViews = items.reduce((sum, i) => sum + (i.viewCount || 0), 0);
    
    return { total, published, draft, archived, featured: featuredCount, totalViews };
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    let filtered = items;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.author?.toLowerCase().includes(query)
      );
    }

    if (filterCategory) {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    if (filterStatus) {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    return filtered;
  }, [items, searchQuery, filterCategory, filterStatus]);

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSummary(item.summary);
    setContent(item.content || "");
    setDate(item.date || "");
    setUrl(item.url || "");
    setImageUrl(item.imageUrl || "");
    setImageFile(null);
    setCategory(item.category || "");
    setTags(item.tags || []);
    setAuthor(item.author || "");
    setAuthorEmail(item.authorEmail || "");
    setStatus(item.status || 'published');
    setSlug(item.slug || "");
    setMetaDescription(item.metaDescription || "");
    setMetaKeywords(item.metaKeywords || "");
    setFeatured(item.featured || false);
    setScheduledDate(item.scheduledDate || "");
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
    setImagePreview("");
    setCategory("");
    setCustomCategory("");
    setTags([]);
    setTagInput("");
    setAuthor("");
    setAuthorEmail("");
    setStatus('published');
    setSlug("");
    setMetaDescription("");
    setMetaKeywords("");
    setFeatured(false);
    setScheduledDate("");
    setError(null);
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    const ok = typeof window !== "undefined" ? window.confirm("Yakin ingin menghapus berita ini?") : true;
    if (!ok) return;

    try {
      setError(null);
      console.log('Deleting news with ID:', id);
      
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      console.log('Delete response status:', res.status);
      
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error('Delete failed:', body);
        const message =
          typeof body === "object" && body && "message" in body && typeof body.message === "string"
            ? body.message
            : "Gagal menghapus berita";
        throw new Error(message);
      }
      
      const responseData = await res.json();
      console.log('Delete successful:', responseData);
      
      // Remove from state
      setItems((prev) => {
        const filtered = prev.filter((it) => it.id !== id);
        console.log('Items before delete:', prev.length, 'after:', filtered.length);
        return filtered;
      });
      
      if (editingId === id) {
        handleCancelEdit();
      }
      
      // Show success message
      if (typeof window !== "undefined") {
        alert("Berita berhasil dihapus!");
      }
    } catch (err: unknown) {
      console.error('Delete error:', err);
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

      const finalCategory = category === 'Lainnya' ? customCategory : category;

      // Determine final status based on scheduled date
      let finalStatus = status;
      if (scheduledDate && scheduledDate.trim() !== "") {
        const scheduledDateTime = new Date(scheduledDate);
        const now = new Date();
        
        // If scheduled date is in the future, set status to 'scheduled'
        if (scheduledDateTime > now) {
          finalStatus = 'draft'; // We'll use draft status with scheduledDate set
        }
      }

      const payload = {
        title,
        summary,
        content,
        date,
        url,
        imageUrl: finalImageUrl || undefined,
        category: finalCategory || undefined,
        tags: tags.length > 0 ? tags : undefined,
        author: author || undefined,
        authorEmail: authorEmail || undefined,
        status: finalStatus,
        slug: slug || undefined,
        metaDescription: metaDescription || undefined,
        metaKeywords: metaKeywords || undefined,
        featured,
        scheduledDate: scheduledDate && scheduledDate.trim() !== "" ? scheduledDate : undefined,
      };

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

      handleCancelEdit();
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
        <div className="container max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">📰 Admin Berita & Event</h1>
            <p className="text-gray-600">
              Dashboard profesional untuk mengelola artikel, berita, dan event dengan fitur lengkap
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-xs text-gray-600 mt-1">Total Artikel</div>
            </div>
            <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-4">
              <div className="text-2xl font-bold text-green-700">{stats.published}</div>
              <div className="text-xs text-green-600 mt-1">Published</div>
            </div>
            <div className="bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 p-4">
              <div className="text-2xl font-bold text-yellow-700">{stats.draft}</div>
              <div className="text-xs text-yellow-600 mt-1">Draft</div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-2xl font-bold text-gray-700">{stats.archived}</div>
              <div className="text-xs text-gray-600 mt-1">Archived</div>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-4">
              <div className="text-2xl font-bold text-blue-700">{stats.featured}</div>
              <div className="text-xs text-blue-600 mt-1">Featured</div>
            </div>
            <div className="bg-purple-50 rounded-lg shadow-sm border border-purple-200 p-4">
              <div className="text-2xl font-bold text-purple-700">{stats.totalViews}</div>
              <div className="text-xs text-purple-600 mt-1">Total Views</div>
            </div>
          </div>

          {/* Form */}
          <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingId ? "✏️ Edit Artikel" : "➕ Tambah Artikel Baru"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Batalkan edit
                </button>
              )}
            </div>

            {error && (
              <div className="mb-6 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  📝 Informasi Dasar
                </h3>
                
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Judul Artikel *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="Masukkan judul artikel yang menarik"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {title.length} karakter {title.length > 60 && '(⚠️ Terlalu panjang untuk SEO)'}
                    </p>
                  </div>

                  {/* Category, Status, Date Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kategori
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      >
                        <option value="">Pilih Kategori</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {category === 'Lainnya' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kategori Custom
                        </label>
                        <input
                          type="text"
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          placeholder="Nama kategori baru"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status Publikasi *
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'draft' | 'published' | 'archived')}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      >
                        <option value="draft">📝 Draft</option>
                        <option value="published">✅ Published</option>
                        <option value="archived">📦 Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tanggal
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Kosongkan untuk menggunakan tanggal hari ini
                      </p>
                    </div>
                  </div>

                  {/* Scheduled Date */}
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🕐 Jadwalkan Publikasi (Opsional)
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      💡 Jika diisi, artikel akan otomatis dipublikasikan pada tanggal dan waktu yang ditentukan. 
                      Artikel akan tersimpan sebagai draft hingga waktu terjadwal tiba.
                    </p>
                    {scheduledDate && (
                      <p className="text-xs text-purple-700 mt-2 font-medium">
                        ⏰ Akan dipublikasikan: {new Date(scheduledDate).toLocaleString('id-ID', { 
                          dateStyle: 'full', 
                          timeStyle: 'short' 
                        })}
                      </p>
                    )}
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-900 cursor-pointer">
                      ⭐ Tandai sebagai Artikel Unggulan (Featured)
                    </label>
                  </div>
                </div>
              </div>

              {/* Author Information */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  👤 Informasi Penulis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Penulis
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="Nama lengkap penulis"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Penulis
                    </label>
                    <input
                      type="email"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Image Management */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  🖼️ Gambar Artikel
                </h3>
                
                <div className="space-y-4">
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImageUrl("");
                          setImagePreview("");
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL Gambar
                      </label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Gambar
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setImageFile(file);
                        }}
                        className="block w-full text-sm text-gray-700 file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    💡 Tip: Gunakan gambar dengan resolusi minimal 1200x630px untuk hasil terbaik
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  📄 Ringkasan Artikel
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ringkasan *
                  </label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm min-h-[140px]"
                    placeholder="Tulis ringkasan singkat yang menarik untuk artikel ini..."
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">
                      Ringkasan akan tampil di halaman daftar artikel
                    </p>
                    <span className="text-xs text-gray-500">
                      {summary.length} karakter {summary.length > 160 && '(⚠️ Terlalu panjang)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Full Content */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  ✍️ Konten Lengkap Artikel
                </h3>
                
                <div>
                  <ModernRichTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Tulis artikel lengkap dengan format profesional di sini. Gunakan heading, bold, italic, list, link, gambar, dan elemen lainnya untuk membuat artikel yang menarik dan mudah dibaca..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      💡 Artikel yang baik: terstruktur, informatif, dan mudah dipahami
                    </p>
                    <span className="text-xs text-gray-500">
                      {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length} kata
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  🏷️ Tags & Keywords
                </h3>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="Ketik tag dan tekan Enter"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-6 py-2.5 bg-gray-700 text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
                    >
                      Tambah
                    </button>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Tags membantu kategorisasi dan pencarian artikel
                  </p>
                </div>
              </div>

              {/* SEO & Advanced Settings */}
              {showAdvanced && (
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    🔍 SEO & Pengaturan Lanjutan
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                        placeholder="url-friendly-slug"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Slug otomatis dibuat dari judul. Edit jika perlu.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meta Description (SEO)
                      </label>
                      <textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm min-h-[100px]"
                        placeholder="Deskripsi singkat untuk mesin pencari (Google, Bing, dll)"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500">
                          Deskripsi yang muncul di hasil pencarian Google
                        </p>
                        <span className={`text-xs ${metaDescription.length > 160 ? 'text-orange-600' : 'text-gray-500'}`}>
                          {metaDescription.length}/160 karakter
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meta Keywords (SEO)
                      </label>
                      <input
                        type="text"
                        value={metaKeywords}
                        onChange={(e) => setMetaKeywords(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        placeholder="keyword1, keyword2, keyword3"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Pisahkan dengan koma. Contoh: energi, manajemen, teknologi
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL Artikel Eksternal (opsional)
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        placeholder="https://example.com/artikel-lengkap"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Link ke artikel lengkap di situs eksternal (jika ada)
                      </p>
                    </div>
                  </div>
                </div>
              )}

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

          {/* List Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">📋 Daftar Artikel</h2>
              <span className="text-sm text-gray-600">
                {filteredItems.length} dari {items.length} artikel
              </span>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="🔍 Cari artikel berdasarkan judul, ringkasan, atau penulis..."
                  />
                </div>

                <div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  >
                    <option value="">Semua Kategori</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  >
                    <option value="">Semua Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-600">⏳ Memuat data...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-600 mb-2">
                  {searchQuery || filterCategory || filterStatus
                    ? "❌ Tidak ada artikel yang sesuai dengan filter"
                    : "📝 Belum ada artikel yang tersimpan"}
                </p>
                {(searchQuery || filterCategory || filterStatus) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterCategory("");
                      setFilterStatus("");
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      {/* Image */}
                      {item.imageUrl && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Status & Category Badges */}
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                            item.status === 'published' ? 'bg-green-100 text-green-800' :
                            item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status === 'published' ? '✅ Published' :
                             item.status === 'draft' ? '📝 Draft' :
                             '📦 Archived'}
                          </span>
                          {item.scheduledDate && item.status === 'draft' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 text-purple-800">
                              🕐 Terjadwal: {new Date(item.scheduledDate).toLocaleString('id-ID', { 
                                dateStyle: 'short', 
                                timeStyle: 'short' 
                              })}
                            </span>
                          )}
                          {item.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                              ⭐ Featured
                            </span>
                          )}
                          {item.category && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              {item.category}
                            </span>
                          )}
                        </div>

                        {/* Title & Date */}
                        <h3 className="text-base font-bold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">
                          📅 {formatDate(item.date)}
                          {item.author && ` • ✍️ ${item.author}`}
                          {item.viewCount !== undefined && ` • 👁️ ${item.viewCount} views`}
                        </p>

                        {/* Summary */}
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {item.summary}
                        </p>

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700"
                              >
                                #{tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{item.tags.length - 3} lainnya
                              </span>
                            )}
                          </div>
                        )}

                        {/* Links */}
                        <div className="flex items-center gap-3 text-xs">
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              🔗 Artikel Eksternal
                            </a>
                          )}
                          {item.slug && (
                            <span className="text-gray-500 font-mono">
                              /{item.slug}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 ml-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
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
