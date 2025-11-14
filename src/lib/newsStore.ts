import { supabase } from "@/lib/supabaseClient";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  date: string; // YYYY-MM-DD
  url?: string;
  imageUrl?: string;
};

export type NewsInput = {
  title: string;
  summary: string;
  date?: string;
  url?: string;
  imageUrl?: string;
};

export async function getAllNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from("news")
    .select("id, title, summary, date, url, image_url")
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to load news from Supabase", error);
    throw new Error("Gagal memuat data berita");
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    title: row.title,
    summary: row.summary,
    date: row.date,
    url: row.url ?? undefined,
    imageUrl: row.image_url ?? undefined,
  }));
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  if (!id) return null;

  const { data, error } = await supabase
    .from("news")
    .select("id, title, summary, date, url, image_url")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load news item from Supabase", error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    summary: data.summary,
    date: data.date,
    url: data.url ?? undefined,
    imageUrl: data.image_url ?? undefined,
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

  const { data, error } = await supabase
    .from("news")
    .update({
      title: input.title,
      summary: input.summary,
      date,
      url: input.url ?? null,
      image_url: input.imageUrl ?? null,
    })
    .eq("id", id)
    .select("id, title, summary, date, url, image_url")
    .single();

  if (error) {
    console.error("Failed to update news in Supabase", error);
    throw new Error("Gagal mengupdate berita");
  }

  return {
    id: data.id,
    title: data.title,
    summary: data.summary,
    date: data.date,
    url: data.url ?? undefined,
    imageUrl: data.image_url ?? undefined,
  };
}

export async function deleteNews(id: string): Promise<void> {
  if (!id) {
    throw new Error("News id is required");
  }

  const { error } = await supabase
    .from("news")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete news from Supabase", error);
    throw new Error("Gagal menghapus berita");
  }
}

export async function addNews(input: NewsInput): Promise<NewsItem> {
  if (!input.title || !input.summary) {
    throw new Error("Title and summary are required");
  }

  const now = new Date();
  const date = input.date && input.date.trim() !== "" ? input.date : now.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("news")
    .insert({
      title: input.title,
      summary: input.summary,
      date,
      url: input.url ?? null,
      image_url: input.imageUrl ?? null,
    })
    .select("id, title, summary, date, url, image_url")
    .single();

  if (error) {
    console.error("Failed to add news to Supabase", error);
    throw new Error("Gagal menyimpan berita");
  }

  return {
    id: data.id,
    title: data.title,
    summary: data.summary,
    date: data.date,
    url: data.url ?? undefined,
    imageUrl: data.image_url ?? undefined,
  };
}
