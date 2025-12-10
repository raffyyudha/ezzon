import { supabase } from "@/lib/supabaseClient";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content?: string; // HTML content untuk artikel lengkap
  date: string; // YYYY-MM-DD
  url?: string;
  imageUrl?: string;
  // New professional fields
  category?: string; // Kategori artikel (Berita, Event, Tutorial, dll)
  tags?: string[]; // Array of tags
  author?: string; // Nama penulis
  authorEmail?: string; // Email penulis
  status?: 'draft' | 'published' | 'archived'; // Status publikasi
  slug?: string; // URL-friendly slug
  metaDescription?: string; // SEO meta description
  metaKeywords?: string; // SEO keywords
  featured?: boolean; // Artikel unggulan
  viewCount?: number; // Jumlah views
  publishedAt?: string; // Tanggal publikasi
  updatedAt?: string; // Tanggal update terakhir
  scheduledDate?: string; // Tanggal terjadwal untuk auto-publish
};

export type NewsInput = {
  title: string;
  summary: string;
  content?: string; // HTML content
  date?: string;
  url?: string;
  imageUrl?: string;
  // New professional fields
  category?: string;
  tags?: string[];
  author?: string;
  authorEmail?: string;
  status?: 'draft' | 'published' | 'archived';
  slug?: string;
  metaDescription?: string;
  metaKeywords?: string;
  featured?: boolean;
  scheduledDate?: string; // Tanggal terjadwal untuk auto-publish
};

type NewsRow = {
  id: string;
  title: string;
  summary: string;
  content: string | null;
  date: string;
  url: string | null;
  image_url: string | null;
  category: string | null;
  tags: string[] | null;
  author: string | null;
  author_email: string | null;
  status: string | null;
  slug: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  featured: boolean | null;
  view_count: number | null;
  published_at: string | null;
  updated_at: string | null;
  scheduled_date: string | null;
};

export async function getAllNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to load news from Supabase", error);
    throw new Error("Gagal memuat data berita");
  }

  return ((data as NewsRow[] | null) ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    summary: row.summary,
    content: row.content ?? undefined,
    date: row.date,
    url: row.url ?? undefined,
    imageUrl: row.image_url ?? undefined,
    category: row.category ?? undefined,
    tags: row.tags ?? undefined,
    author: row.author ?? undefined,
    authorEmail: row.author_email ?? undefined,
    status: (row.status as 'draft' | 'published' | 'archived') ?? 'published',
    slug: row.slug ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    metaKeywords: row.meta_keywords ?? undefined,
    featured: row.featured ?? false,
    viewCount: row.view_count ?? 0,
    publishedAt: row.published_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    scheduledDate: row.scheduled_date ?? undefined,
  }));
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  if (!id) return null;

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load news item from Supabase", error);
    return null;
  }

  if (!data) return null;

  const row = data as NewsRow;
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    content: row.content ?? undefined,
    date: row.date,
    url: row.url ?? undefined,
    imageUrl: row.image_url ?? undefined,
    category: row.category ?? undefined,
    tags: row.tags ?? undefined,
    author: row.author ?? undefined,
    authorEmail: row.author_email ?? undefined,
    status: (row.status as 'draft' | 'published' | 'archived') ?? 'published',
    slug: row.slug ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    metaKeywords: row.meta_keywords ?? undefined,
    featured: row.featured ?? false,
    viewCount: row.view_count ?? 0,
    publishedAt: row.published_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    scheduledDate: row.scheduled_date ?? undefined,
  };
}

export async function updateNews(id: string, input: NewsInput): Promise<NewsItem> {
  if (!id) {
    throw new Error("News id is required");
  }
  if (!input.title || !input.summary) {
    throw new Error("Title and summary are required");
  }

  const now = new Date();
  const date = input.date && input.date.trim() !== "" ? input.date : now.toISOString().slice(0, 10);
  
  // Generate slug from title if not provided
  const slug = input.slug || input.title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const { data, error } = await supabase
    .from("news")
    .update({
      title: input.title,
      summary: input.summary,
      content: input.content ?? null,
      date,
      url: input.url ?? null,
      image_url: input.imageUrl ?? null,
      category: input.category ?? null,
      tags: input.tags ?? null,
      author: input.author ?? null,
      author_email: input.authorEmail ?? null,
      status: input.status ?? 'published',
      slug,
      meta_description: input.metaDescription ?? null,
      meta_keywords: input.metaKeywords ?? null,
      featured: input.featured ?? false,
      scheduled_date: input.scheduledDate ?? null,
      updated_at: now.toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Failed to update news in Supabase", error);
    throw new Error("Gagal mengupdate berita");
  }

  const row = data as NewsRow;
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    content: row.content ?? undefined,
    date: row.date,
    url: row.url ?? undefined,
    imageUrl: row.image_url ?? undefined,
    category: row.category ?? undefined,
    tags: row.tags ?? undefined,
    author: row.author ?? undefined,
    authorEmail: row.author_email ?? undefined,
    status: (row.status as 'draft' | 'published' | 'archived') ?? 'published',
    slug: row.slug ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    metaKeywords: row.meta_keywords ?? undefined,
    featured: row.featured ?? false,
    viewCount: row.view_count ?? 0,
    publishedAt: row.published_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    scheduledDate: row.scheduled_date ?? undefined,
  };
}

export async function deleteNews(id: string): Promise<void> {
  if (!id) {
    throw new Error("News id is required");
  }

  console.log('Attempting to delete news with ID:', id);

  // First check if the news exists
  const { data: existing, error: checkError } = await supabase
    .from("news")
    .select("id, title")
    .eq("id", id)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking news existence:", checkError);
    throw new Error("Gagal memeriksa berita");
  }

  if (!existing) {
    console.error("News not found with ID:", id);
    throw new Error("Berita tidak ditemukan");
  }

  console.log('Found news to delete:', existing);

  // Now delete it
  const { error, data } = await supabase
    .from("news")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Failed to delete news from Supabase", error);
    throw new Error(`Gagal menghapus berita: ${error.message}`);
  }

  console.log('Delete result:', data);
}

export async function addNews(input: NewsInput): Promise<NewsItem> {
  if (!input.title || !input.summary) {
    throw new Error("Title and summary are required");
  }

  const now = new Date();
  const date = input.date && input.date.trim() !== "" ? input.date : now.toISOString().slice(0, 10);
  
  // Generate slug from title if not provided
  const slug = input.slug || input.title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const status = input.status ?? 'published';
  const publishedAt = status === 'published' ? now.toISOString() : null;

  const { data, error } = await supabase
    .from("news")
    .insert({
      title: input.title,
      summary: input.summary,
      content: input.content ?? null,
      date,
      url: input.url ?? null,
      image_url: input.imageUrl ?? null,
      category: input.category ?? null,
      tags: input.tags ?? null,
      author: input.author ?? null,
      author_email: input.authorEmail ?? null,
      status,
      slug,
      meta_description: input.metaDescription ?? null,
      meta_keywords: input.metaKeywords ?? null,
      featured: input.featured ?? false,
      view_count: 0,
      published_at: publishedAt,
      scheduled_date: input.scheduledDate ?? null,
      updated_at: now.toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    console.error("Failed to add news to Supabase", error);
    throw new Error("Gagal menyimpan berita");
  }

  const row = data as NewsRow;
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    content: row.content ?? undefined,
    date: row.date,
    url: row.url ?? undefined,
    imageUrl: row.image_url ?? undefined,
    category: row.category ?? undefined,
    tags: row.tags ?? undefined,
    author: row.author ?? undefined,
    authorEmail: row.author_email ?? undefined,
    status: (row.status as 'draft' | 'published' | 'archived') ?? 'published',
    slug: row.slug ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    metaKeywords: row.meta_keywords ?? undefined,
    featured: row.featured ?? false,
    viewCount: row.view_count ?? 0,
    publishedAt: row.published_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    scheduledDate: row.scheduled_date ?? undefined,
  };
}
