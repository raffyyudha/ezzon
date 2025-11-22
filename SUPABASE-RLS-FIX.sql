-- ============================================
-- FIX SUPABASE RLS POLICIES FOR NEWS TABLE
-- ============================================
-- Jalankan script ini di Supabase SQL Editor jika delete tidak berfungsi

-- 1. Cek RLS policies yang ada
SELECT * FROM pg_policies WHERE tablename = 'news';

-- 2. Disable RLS sementara untuk testing (HATI-HATI: ini membuka akses publik!)
-- Uncomment baris di bawah jika ingin disable RLS untuk testing
-- ALTER TABLE news DISABLE ROW LEVEL SECURITY;

-- 3. Atau, buat policy yang benar untuk allow delete
-- Drop existing policies jika ada
DROP POLICY IF EXISTS "Enable delete for all users" ON news;
DROP POLICY IF EXISTS "Enable insert for all users" ON news;
DROP POLICY IF EXISTS "Enable update for all users" ON news;
DROP POLICY IF EXISTS "Enable read access for all users" ON news;

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policies yang allow semua operasi (untuk development)
-- CATATAN: Untuk production, sebaiknya gunakan authentication!

-- Allow SELECT (read)
CREATE POLICY "Enable read access for all users" 
ON news FOR SELECT 
USING (true);

-- Allow INSERT (create)
CREATE POLICY "Enable insert for all users" 
ON news FOR INSERT 
WITH CHECK (true);

-- Allow UPDATE (edit)
CREATE POLICY "Enable update for all users" 
ON news FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Allow DELETE (hapus)
CREATE POLICY "Enable delete for all users" 
ON news FOR DELETE 
USING (true);

-- 4. Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'news';

-- ============================================
-- ALTERNATIVE: Disable RLS completely (NOT RECOMMENDED for production)
-- ============================================
-- Uncomment jika ingin disable RLS sepenuhnya
-- ALTER TABLE news DISABLE ROW LEVEL SECURITY;

-- ============================================
-- NOTES:
-- ============================================
-- 1. RLS (Row Level Security) adalah fitur keamanan Supabase
-- 2. Jika RLS enabled tapi tidak ada policy, maka operasi akan ditolak
-- 3. Policy di atas allow semua operasi untuk development
-- 4. Untuk production, sebaiknya implement proper authentication
-- 5. Setelah run script ini, coba delete berita lagi
