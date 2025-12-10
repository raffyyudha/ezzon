# 🚀 Quick Start: Scheduled Posts

## Setup (5 menit)

### 1. Update Database

```sql
-- Jalankan di Supabase SQL Editor
-- File: database-scheduled-posts.sql

ALTER TABLE news
ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_news_scheduled_date ON news(scheduled_date);
```

### 2. Verifikasi Kode

Pastikan file-file ini sudah ada (sudah otomatis ter-update):

- ✅ `src/lib/newsStore.ts` - Updated dengan scheduledDate field
- ✅ `src/app/admin/news/page.tsx` - UI untuk input scheduled date
- ✅ `src/app/api/news/publish-scheduled/route.ts` - API endpoint
- ✅ `src/components/ScheduledPostsPublisher.tsx` - Auto-publish component
- ✅ `src/app/ClientBody.tsx` - Component sudah diintegrasikan

### 3. Test

1. Buka `/admin/news`
2. Buat artikel baru
3. Isi field "🕐 Jadwalkan Publikasi" dengan tanggal 5 menit ke depan
4. Simpan
5. Tunggu 5-10 menit
6. Artikel otomatis published!

## Cara Pakai

### Jadwalkan Artikel

```
1. Login ke /admin/news
2. Isi form artikel (judul, konten, gambar, dll)
3. Scroll ke "🕐 Jadwalkan Publikasi"
4. Pilih tanggal & waktu (contoh: 20 Desember 2025, 10:00)
5. Klik "Simpan Berita"
6. ✅ Done! Artikel akan auto-publish pada waktu yang ditentukan
```

### Cek Status Terjadwal

```bash
# Via browser
https://yourdomain.com/api/news/publish-scheduled

# Via curl
curl https://yourdomain.com/api/news/publish-scheduled
```

### Manual Trigger (jika perlu)

```bash
# POST request untuk publish sekarang
curl -X POST https://yourdomain.com/api/news/publish-scheduled
```

## Cara Kerja

1. **Client-Side** (Default)
   - Component `ScheduledPostsPublisher` berjalan di browser
   - Cek setiap 5 menit
   - Auto-publish artikel yang waktunya sudah tiba

2. **Server-Side** (Optional, untuk production)
   - Setup cron job: `*/5 * * * * node scripts/publish-scheduled-posts.js`
   - Lebih reliable, tidak bergantung pada user aktif
   - Lihat `CRON-SETUP-GUIDE.md` untuk detail

## Contoh Use Case

### Event Launch
```
Hari ini: 10 Desember 2025
Event: 20 Desember 2025, jam 09:00

Jadwalkan:
- Pre-event artikel: 18 Desember, 08:00
- Launch announcement: 20 Desember, 09:00
- Follow-up: 21 Desember, 10:00
```

### Content Calendar
```
Jadwalkan artikel rutin:
- Tutorial Senin: Setiap Senin, 08:00
- Tips Jumat: Setiap Jumat, 16:00
- Newsletter Bulanan: Tanggal 1, 09:00
```

### Seasonal Content
```
- Tahun Baru: 1 Januari 2026, 00:01
- Valentine: 14 Februari 2026, 06:00
- Kemerdekaan: 17 Agustus 2026, 06:00
```

## Troubleshooting

### Artikel tidak auto-publish?

**Cek:**
1. ✅ Database sudah di-update dengan kolom `scheduled_date`?
2. ✅ Scheduled date sudah lewat?
3. ✅ Ada user yang buka website? (untuk client-side)
4. ✅ Browser console ada error?

**Solusi:**
```bash
# Manual trigger
curl -X POST https://yourdomain.com/api/news/publish-scheduled

# Atau setup server-side cron job (recommended)
```

### Artikel publish terlambat?

**Normal!** Sistem cek setiap 5 menit, jadi bisa delay 0-5 menit.

**Untuk publish lebih cepat:**
- Kurangi interval di `ScheduledPostsPublisher.tsx`
- Atau setup server-side cron job setiap 1 menit

## Next Steps

- 📖 Baca dokumentasi lengkap: `SCHEDULED-POSTS-GUIDE.md`
- ⚙️ Setup cron job untuk production: `CRON-SETUP-GUIDE.md`
- 📚 Lihat admin guide: `ADMIN-NEWS-GUIDE.md`

## Support

Ada pertanyaan? Check:
1. Console browser untuk errors
2. Database schema di Supabase
3. API endpoint: `/api/news/publish-scheduled`
4. Dokumentasi lengkap di folder root

---

**Happy Scheduling! 🎉**
