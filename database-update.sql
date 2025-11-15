-- SQL untuk update database news table
-- Jalankan ini di Supabase SQL Editor

-- Tambah kolom content untuk artikel HTML lengkap
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS content TEXT NULL;

-- Verifikasi struktur table (opsional, untuk cek)
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'news';
