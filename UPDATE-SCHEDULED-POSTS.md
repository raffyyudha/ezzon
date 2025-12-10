# 🔄 Update: Perbaikan Fitur Scheduled Posts

## 📋 Perubahan yang Dilakukan

### 1. **API Routes Update**

#### `src/app/api/news/route.ts`
- ✅ Menambahkan `scheduledDate` ke payload POST request
- Sekarang scheduled date tersimpan ke database saat create artikel

#### `src/app/api/news/[id]/route.ts`
- ✅ Menambahkan `scheduledDate` ke payload PUT request
- Sekarang scheduled date tersimpan ke database saat update artikel

#### `src/app/api/news/admin/route.ts` (NEW)
- ✅ Endpoint baru khusus untuk admin
- Menampilkan SEMUA artikel (published, draft, archived, scheduled)
- Digunakan oleh admin dashboard

### 2. **News Store Update**

#### `src/lib/newsStore.ts`

**Fungsi `getAllNews()`:**
- ✅ Sekarang hanya menampilkan artikel dengan status `published`
- Artikel draft/scheduled TIDAK muncul di halaman publik
- Digunakan oleh halaman `/news` (publik)

**Fungsi `getAllNewsForAdmin()` (NEW):**
- ✅ Menampilkan SEMUA artikel tanpa filter status
- Digunakan oleh admin dashboard `/admin/news`

### 3. **Admin Dashboard Update**

#### `src/app/admin/news/page.tsx`

**API Endpoint:**
- ✅ Menggunakan `/api/news/admin` instead of `/api/news`
- Menampilkan semua artikel termasuk yang dijadwalkan

**Visual Indicator:**
- ✅ Badge "🕐 Terjadwal" untuk artikel dengan scheduled date
- Menampilkan tanggal dan waktu publikasi terjadwal
- Format: "🕐 Terjadwal: 20/12/2025, 10.00"

## 🎯 Cara Kerja Sekarang

### Untuk Artikel Terjadwal:

1. **Admin membuat artikel:**
   - Isi form artikel
   - Set scheduled date (misal: 20 Desember 2025, 10:00)
   - Klik "Simpan Berita"

2. **Artikel tersimpan:**
   - Status: `draft`
   - `scheduled_date`: 2025-12-20T10:00:00+07:00
   - Artikel TIDAK muncul di halaman publik

3. **Di Admin Dashboard:**
   - Artikel terlihat dengan badge "📝 Draft"
   - Badge tambahan "🕐 Terjadwal: 20/12/2025, 10.00"
   - Admin bisa edit/hapus kapan saja

4. **Auto-Publish (setiap 5 menit):**
   - Sistem cek artikel dengan scheduled_date <= now
   - Update status → `published`
   - Update `published_at` → now
   - Artikel MUNCUL di halaman publik

5. **Di Halaman Publik:**
   - Artikel otomatis muncul setelah dipublikasikan
   - Tidak ada delay (langsung visible)

## 🔍 Testing

### Test 1: Artikel Terjadwal Tidak Muncul di Publik

```bash
# 1. Buat artikel dengan scheduled date di masa depan
# 2. Buka halaman /news
# 3. ✅ Artikel TIDAK muncul (karena masih draft)
```

### Test 2: Artikel Terjadwal Muncul di Admin

```bash
# 1. Buat artikel dengan scheduled date
# 2. Buka /admin/news
# 3. ✅ Artikel muncul dengan badge "🕐 Terjadwal"
```

### Test 3: Auto-Publish

```bash
# 1. Buat artikel dengan scheduled date 5 menit ke depan
# 2. Tunggu 5-10 menit
# 3. Refresh halaman /news
# 4. ✅ Artikel otomatis muncul
```

### Test 4: Manual Trigger

```bash
# Trigger manual publish
curl -X POST http://localhost:3000/api/news/publish-scheduled

# Expected response:
{
  "message": "Successfully published X scheduled posts",
  "published": X,
  "posts": [...]
}
```

## 📊 Database Schema

Pastikan kolom `scheduled_date` sudah ada:

```sql
-- Cek kolom
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'news' AND column_name = 'scheduled_date';

-- Jika belum ada, jalankan:
ALTER TABLE news ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMP WITH TIME ZONE;
CREATE INDEX IF NOT EXISTS idx_news_scheduled_date ON news(scheduled_date);
```

## 🚀 Deployment Checklist

Sebelum deploy ke production:

- [ ] Jalankan SQL migration (`database-scheduled-posts.sql`)
- [ ] Verify kolom `scheduled_date` ada di database
- [ ] Test create artikel dengan scheduled date
- [ ] Test artikel tidak muncul di halaman publik
- [ ] Test auto-publish (tunggu 5-10 menit)
- [ ] Setup server-side cron job (optional, recommended)

## 🐛 Troubleshooting

### Artikel Terjadwal Masih Muncul di Halaman Publik

**Penyebab:** Database belum di-update atau cache

**Solusi:**
```bash
# 1. Cek status artikel di database
SELECT id, title, status, scheduled_date FROM news WHERE scheduled_date IS NOT NULL;

# 2. Pastikan status = 'draft' untuk artikel terjadwal
UPDATE news SET status = 'draft' WHERE scheduled_date > NOW() AND status = 'published';

# 3. Clear cache (jika ada)
```

### Artikel Tidak Auto-Publish

**Penyebab:** Component tidak berjalan atau scheduled_date tidak tersimpan

**Solusi:**
```bash
# 1. Cek console browser untuk errors
# 2. Cek scheduled_date di database
SELECT id, title, status, scheduled_date FROM news WHERE status = 'draft' AND scheduled_date IS NOT NULL;

# 3. Manual trigger
curl -X POST http://localhost:3000/api/news/publish-scheduled

# 4. Cek response
```

### Badge Terjadwal Tidak Muncul

**Penyebab:** Admin page masih menggunakan endpoint lama

**Solusi:**
```javascript
// Pastikan di src/app/admin/news/page.tsx menggunakan:
const res = await fetch("/api/news/admin"); // BUKAN /api/news
```

## 📝 Summary

**Sebelum Update:**
- ❌ Scheduled date tidak tersimpan ke database
- ❌ Artikel terjadwal muncul di halaman publik
- ❌ Tidak ada visual indicator untuk artikel terjadwal

**Setelah Update:**
- ✅ Scheduled date tersimpan ke database
- ✅ Artikel terjadwal TIDAK muncul di halaman publik
- ✅ Badge "🕐 Terjadwal" di admin dashboard
- ✅ Auto-publish berjalan setiap 5 menit
- ✅ Artikel otomatis muncul setelah waktu terjadwal

---

**Version**: 2.1.1  
**Last Updated**: Desember 2025  
**Status**: ✅ Fixed & Production Ready
