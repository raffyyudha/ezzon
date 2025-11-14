import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only throw error in development or when actually using Supabase
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  console.error("Supabase URL dan anon key belum dikonfigurasi. Tambahkan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di environment variables.");
}

// Use dummy values for build time if not available
const url = supabaseUrl || 'https://dummy.supabase.co';
const key = supabaseAnonKey || 'dummy-key';

export const supabase = createClient(url, key);
