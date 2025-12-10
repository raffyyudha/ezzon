# 📅 Panduan Penjadwalan Posting Artikel

## 🎯 Overview

Fitur penjadwalan posting memungkinkan Anda untuk mengatur artikel agar otomatis dipublikasikan pada tanggal dan waktu tertentu di masa depan. Artikel yang dijadwalkan akan tersimpan sebagai draft hingga waktu yang ditentukan tiba, kemudian otomatis berubah status menjadi published.

## ✨ Fitur

- **Penjadwalan Fleksibel**: Jadwalkan artikel untuk dipublikasikan kapan saja di masa depan
- **Auto-Publish**: Artikel otomatis dipublikasikan tanpa intervensi manual
- **Preview Waktu**: Lihat preview kapan artikel akan dipublikasikan
- **Status Tracking**: Artikel terjadwal ditandai dengan status draft + scheduled_date
- **Background Processing**: Sistem mengecek dan mempublikasikan artikel setiap 5 menit

## 🚀 Cara Menggunakan

### 1. Setup Database

Pertama, jalankan SQL migration untuk menambahkan kolom `scheduled_date`:

```bash
# Buka Supabase SQL Editor dan jalankan file:
database-scheduled-posts.sql
```

SQL ini akan:
- Menambahkan kolom `scheduled_date` ke tabel `news`
- Membuat index untuk performa query
- Membuat function `auto_publish_scheduled_posts()` (opsional untuk manual trigger)

### 2. Menjadwalkan Artikel Baru

1. Buka **Admin News Dashboard** (`/admin/news`)
2. Isi form artikel seperti biasa (judul, konten, gambar, dll)
3. Scroll ke bagian **"🕐 Jadwalkan Publikasi"**
4. Pilih tanggal dan waktu publikasi yang diinginkan
5. Klik **"Simpan Berita"**

**Contoh:**
- Hari ini: 10 Desember 2025
- Jadwal publikasi: 20 Desember 2025, jam 10:00 WIB
- Artikel akan otomatis published pada 20 Desember 2025 pukul 10:00

### 3. Menjadwalkan Artikel yang Sudah Ada

1. Klik **"✏️ Edit"** pada artikel yang ingin dijadwalkan
2. Isi field **"Jadwalkan Publikasi"** dengan tanggal dan waktu yang diinginkan
3. Klik **"Simpan Perubahan"**

### 4. Membatalkan Penjadwalan

Untuk membatalkan penjadwalan artikel:
1. Edit artikel yang dijadwalkan
2. Hapus tanggal di field **"Jadwalkan Publikasi"** (kosongkan)
3. Ubah status menjadi **"Published"** jika ingin langsung publish
4. Atau biarkan sebagai **"Draft"** jika belum siap publish

## 🔧 Cara Kerja Sistem

### Auto-Publish Mechanism

1. **Component `ScheduledPostsPublisher`** berjalan di background
2. Setiap **5 menit**, component memanggil API `/api/news/publish-scheduled`
3. API mengecek database untuk artikel dengan:
   - Status: `draft`
   - `scheduled_date` tidak null
   - `scheduled_date` <= waktu sekarang
4. Artikel yang memenuhi kriteria otomatis diupdate:
   - Status → `published`
   - `published_at` → waktu sekarang

### Status Artikel Terjadwal

Artikel terjadwal memiliki karakteristik:
- **Status**: `draft` (tersimpan sebagai draft)
- **scheduled_date**: Tanggal dan waktu publikasi
- **Tampilan**: Tidak muncul di halaman publik hingga dipublikasikan

## 📊 API Endpoints

### POST `/api/news/publish-scheduled`

Mempublikasikan semua artikel terjadwal yang waktunya sudah tiba.

**Response:**
```json
{
  "message": "Successfully published 2 scheduled posts",
  "published": 2,
  "posts": [...]
}
```

### GET `/api/news/publish-scheduled`

Mengecek status artikel terjadwal.

**Response:**
```json
{
  "readyToPublish": 2,
  "futureScheduled": 5,
  "readyPosts": [...],
  "futurePosts": [...]
}
```

## 💡 Tips & Best Practices

### Waktu Penjadwalan

- **Zona Waktu**: Pastikan menggunakan zona waktu yang benar (WIB/WITA/WIT)
- **Buffer Time**: Jadwalkan minimal 10 menit ke depan untuk menghindari konflik
- **Peak Hours**: Jadwalkan di jam-jam ramai untuk engagement maksimal

### Konten Terjadwal

- **Review Konten**: Pastikan konten sudah final sebelum dijadwalkan
- **Gambar**: Upload gambar sebelum menjadwalkan
- **SEO**: Optimasi SEO (slug, meta description) sebelum jadwal
- **Preview**: Gunakan status draft untuk preview sebelum jadwal

### Monitoring

- Cek API endpoint GET `/api/news/publish-scheduled` untuk monitoring
- Log browser console akan menampilkan info publikasi
- Verifikasi artikel published setelah waktu terjadwal

## 🔍 Troubleshooting

### Artikel Tidak Terpublikasi Otomatis

**Penyebab:**
1. Browser/tab tidak terbuka (component hanya berjalan saat ada user aktif)
2. Scheduled date salah format
3. Database connection error

**Solusi:**
1. Pastikan ada user yang mengakses website
2. Verifikasi format tanggal di database
3. Cek Supabase connection
4. Manual trigger: Panggil API POST `/api/news/publish-scheduled`

### Artikel Terpublikasi Terlambat

**Penyebab:**
- Sistem mengecek setiap 5 menit, jadi bisa delay maksimal 5 menit

**Solusi:**
- Ini normal behavior
- Untuk publish lebih cepat, manual trigger API
- Atau kurangi interval di `ScheduledPostsPublisher.tsx`

### Artikel Terjadwal Tidak Muncul di List

**Penyebab:**
- Artikel dengan status draft tidak muncul di halaman publik

**Solusi:**
- Ini expected behavior
- Artikel akan muncul setelah dipublikasikan otomatis
- Cek di admin dashboard untuk melihat artikel terjadwal

## 📱 Use Cases

### 1. Kampanye Marketing

Jadwalkan artikel promosi untuk launch produk baru:
- Pre-launch teaser: 1 minggu sebelum
- Launch announcement: Hari H jam 09:00
- Follow-up content: 3 hari setelah launch

### 2. Event Coverage

Jadwalkan artikel event sesuai timeline:
- Event preview: 2 hari sebelum
- Live coverage: Saat event dimulai
- Event recap: Hari setelah event

### 3. Content Calendar

Jadwalkan konten rutin:
- Tutorial mingguan: Setiap Senin jam 08:00
- Tips bulanan: Tanggal 1 setiap bulan
- Newsletter: Setiap Jumat jam 16:00

### 4. Seasonal Content

Jadwalkan konten musiman:
- Tahun Baru: 1 Januari 2026 jam 00:01
- Hari Kemerdekaan: 17 Agustus 2026 jam 06:00
- Hari Raya: Sesuai kalender

## 🔐 Security & Performance

### Security

- Hanya admin yang dapat menjadwalkan artikel
- Token authentication required: `baswaranewss`
- API endpoint protected (bisa ditambahkan auth jika perlu)

### Performance

- Background check setiap 5 menit (minimal overhead)
- Efficient database query dengan index
- Batch update untuk multiple posts
- No impact on page load time

## 📈 Future Enhancements

Fitur yang bisa ditambahkan:

- [ ] Email notification saat artikel published
- [ ] Webhook untuk integrasi external
- [ ] Recurring schedule (publish otomatis setiap minggu)
- [ ] Timezone selector di UI
- [ ] Schedule history log
- [ ] Bulk scheduling
- [ ] Preview scheduled content
- [ ] Social media auto-post integration

## 📞 Support

Jika ada pertanyaan atau issue:
1. Check dokumentasi ini
2. Cek console untuk error messages
3. Verify database schema
4. Test API endpoints manually
5. Contact developer

---

**Version**: 1.0  
**Last Updated**: Desember 2025  
**Status**: ✅ Production Ready
