-- Script untuk memperbaiki artikel yang tanggalnya di masa depan
-- Artikel dengan date > now akan diubah menjadi draft dengan scheduled_date

-- 1. Cek artikel yang tanggalnya di masa depan dan statusnya published
SELECT 
  id, 
  title, 
  date, 
  status, 
  scheduled_date,
  CASE 
    WHEN date > CURRENT_DATE AND status = 'published' THEN 'AKAN DIUBAH'
    ELSE 'OK'
  END as action
FROM news
WHERE date > CURRENT_DATE
ORDER BY date;

-- 2. Update artikel yang tanggalnya di masa depan
-- Set status = 'draft' dan scheduled_date = date + waktu default (09:00)
UPDATE news
SET 
  status = 'draft',
  scheduled_date = (date || ' 09:00:00')::timestamp with time zone,
  updated_at = NOW()
WHERE 
  date > CURRENT_DATE 
  AND status = 'published'
  AND scheduled_date IS NULL;

-- 3. Verifikasi hasil
SELECT 
  id, 
  title, 
  date, 
  status, 
  scheduled_date,
  published_at
FROM news
WHERE date > CURRENT_DATE
ORDER BY date;

-- NOTES:
-- - Artikel dengan date di masa depan akan diubah menjadi draft
-- - scheduled_date akan diset ke tanggal artikel + jam 09:00
-- - Artikel akan auto-publish pada tanggal tersebut
-- - Jika ingin ubah jam publish, edit scheduled_date secara manual

-- Contoh: Ubah scheduled_date secara manual
-- UPDATE news 
-- SET scheduled_date = '2026-01-26 10:00:00+07'
-- WHERE id = 'your-article-id';
