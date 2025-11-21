# 📰 Panduan Admin News Dashboard - Super Professional Edition

## 🎯 Overview

Admin News Dashboard telah di-upgrade menjadi sistem manajemen artikel yang **SUPER LENGKAP dan PROFESIONAL** dengan fitur-fitur enterprise-level.

## ✨ Fitur Lengkap

### 1. **📊 Statistics Dashboard**
- Total Artikel
- Published Count
- Draft Count
- Archived Count
- Featured Articles Count
- Total Views

### 2. **📝 Informasi Dasar**
- **Judul Artikel** (dengan character counter & SEO warning)
- **Kategori** (8 kategori pre-defined + custom category)
  - Berita
  - Event
  - Tutorial
  - Pengumuman
  - Press Release
  - Artikel Teknis
  - Case Study
  - Lainnya (custom)
- **Status Publikasi**
  - 📝 Draft
  - ✅ Published
  - 📦 Archived
- **Tanggal** (auto-generate jika kosong)
- **Featured Toggle** (⭐ Artikel Unggulan)

### 3. **👤 Informasi Penulis**
- Nama Penulis
- Email Penulis

### 4. **🖼️ Manajemen Gambar**
- **Image Preview** (real-time preview)
- **URL Gambar** (manual input)
- **Upload Gambar** (auto-upload ke Supabase)
- **Delete Preview** (button untuk hapus preview)
- Tips: Resolusi minimal 1200x630px

### 5. **📄 Konten Artikel**
- **Ringkasan** (dengan character counter, warning jika >160 karakter)
- **Konten Lengkap** (Rich Text Editor dengan toolbar lengkap)
  - Heading (H1, H2, H3)
  - Bold, Italic
  - Lists (ordered & unordered)
  - Links
  - Images
  - Blockquotes
  - Code blocks
- **Word Counter** (menghitung jumlah kata dalam artikel)

### 6. **🏷️ Tags & Keywords**
- **Tag Management**
  - Input tag dengan Enter key
  - Button "Tambah"
  - Visual tag chips dengan button delete
  - Multiple tags support
- Membantu kategorisasi dan pencarian

### 7. **🔍 SEO & Pengaturan Lanjutan**
- **URL Slug** (auto-generate dari judul, bisa diedit manual)
- **Meta Description** (untuk Google search results, max 160 karakter)
- **Meta Keywords** (comma-separated keywords)
- **URL Artikel Eksternal** (link ke artikel lengkap di situs lain)

### 8. **🔎 Search & Filter**
- **Search Bar** (cari berdasarkan judul, ringkasan, atau penulis)
- **Filter Kategori** (dropdown semua kategori)
- **Filter Status** (Published/Draft/Archived)
- **Reset Filter** button
- **Counter** (menampilkan "X dari Y artikel")

### 9. **📋 Enhanced List View**
- **Status Badges** (color-coded: green/yellow/gray)
- **Featured Badge** (⭐ untuk artikel unggulan)
- **Category Badge** (purple badge)
- **Author Info** (nama penulis)
- **View Count** (👁️ jumlah views)
- **Tags Display** (menampilkan 3 tags pertama + counter)
- **Slug Display** (URL-friendly slug)
- **Image Thumbnail** (24x24 rounded)
- **Action Buttons** (Edit & Hapus dengan icon)

## 🚀 Cara Menggunakan

### Setup Database

1. Buka Supabase SQL Editor
2. Jalankan file `database-news-update.sql`
3. Verifikasi semua kolom baru sudah ditambahkan

### Menambah Artikel Baru

1. **Isi Informasi Dasar**
   - Tulis judul yang menarik (max 60 karakter untuk SEO)
   - Pilih kategori (atau buat custom)
   - Pilih status (Draft untuk preview, Published untuk live)
   - Centang "Featured" jika artikel unggulan
   - Atur tanggal (atau biarkan kosong untuk hari ini)

2. **Tambahkan Penulis**
   - Nama lengkap penulis
   - Email penulis (opsional)

3. **Upload Gambar**
   - Paste URL gambar ATAU
   - Upload file gambar (akan auto-upload ke Supabase)
   - Preview akan muncul otomatis
   - Gunakan resolusi minimal 1200x630px

4. **Tulis Konten**
   - Ringkasan singkat (max 160 karakter untuk preview)
   - Artikel lengkap dengan Rich Text Editor
   - **PENTING**: Setiap paragraf HARUS dibungkus dengan tag `<p>` atau gunakan tombol "P" di toolbar
   - Gunakan heading untuk struktur (tombol H2, H3)
   - Tambahkan gambar, link, list sesuai kebutuhan
   
   **Contoh Format yang BENAR**:
   ```html
   <p class="mb-4"><strong>InrushCurrent</strong> — The Instant Shock That Shortens Equipment Life</p>
   
   <p class="mb-4">Segalanya tampak normal... hingga suatu pagi, sistem panel listrik tiba-tiba trip tanpa sebab yang jelas.</p>
   
   <p class="mb-4">Setelah dinyalakan ulang, semua kembali berjalan normal. Namun seminggu kemudian, peristiwa yang sama terulang — kali ini di sirkuit berbeda.</p>
   ```
   
   **Format yang SALAH** (tanpa tag `<p>`):
   ```html
   <strong>InrushCurrent</strong> — The Instant Shock That Shortens Equipment Life
   
   Segalanya tampak normal... hingga suatu pagi...
   ```

5. **Tambahkan Tags**
   - Ketik tag dan tekan Enter
   - Atau klik button "Tambah"
   - Hapus tag dengan klik ×

6. **Optimasi SEO** (Opsional tapi Recommended)
   - Slug akan auto-generate, edit jika perlu
   - Tulis meta description yang menarik (max 160 karakter)
   - Tambahkan meta keywords (pisahkan dengan koma)
   - Tambahkan URL eksternal jika ada

7. **Simpan**
   - Klik "Simpan Berita" untuk artikel baru
   - Klik "Simpan Perubahan" untuk update artikel

### Edit Artikel

1. Klik button "✏️ Edit" pada artikel yang ingin diedit
2. Form akan terisi otomatis dengan data artikel
3. Edit field yang diperlukan
4. Klik "Simpan Perubahan"
5. Atau klik "Batalkan edit" untuk cancel

### Hapus Artikel

1. Klik button "🗑️ Hapus"
2. Konfirmasi penghapusan
3. Artikel akan dihapus permanent

### Search & Filter

1. **Search**: Ketik di search bar untuk cari artikel
2. **Filter Kategori**: Pilih kategori dari dropdown
3. **Filter Status**: Pilih status dari dropdown
4. **Reset**: Klik "Reset Filter" untuk clear semua filter

## 📊 Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | ✅ | Judul artikel |
| summary | string | ✅ | Ringkasan singkat |
| content | HTML | ❌ | Konten lengkap (Rich Text) |
| date | date | ❌ | Tanggal artikel (default: today) |
| imageUrl | string | ❌ | URL gambar |
| category | string | ❌ | Kategori artikel |
| tags | array | ❌ | Array of tags |
| author | string | ❌ | Nama penulis |
| authorEmail | string | ❌ | Email penulis |
| status | enum | ✅ | draft/published/archived |
| slug | string | ❌ | URL-friendly slug (auto-generate) |
| metaDescription | string | ❌ | SEO meta description |
| metaKeywords | string | ❌ | SEO keywords |
| featured | boolean | ❌ | Artikel unggulan (default: false) |
| url | string | ❌ | Link artikel eksternal |
| viewCount | number | ❌ | Jumlah views (auto) |
| publishedAt | timestamp | ❌ | Tanggal publikasi (auto) |
| updatedAt | timestamp | ❌ | Tanggal update (auto) |

## 🎨 Status Colors

- **Published**: Green (✅ bg-green-100 text-green-800)
- **Draft**: Yellow (📝 bg-yellow-100 text-yellow-800)
- **Archived**: Gray (📦 bg-gray-100 text-gray-800)
- **Featured**: Blue (⭐ bg-blue-100 text-blue-800)
- **Category**: Purple (bg-purple-100 text-purple-800)

## 💡 Tips & Best Practices

### SEO Optimization
- **Judul**: 50-60 karakter, include keyword utama
- **Meta Description**: 150-160 karakter, persuasive & include CTA
- **Slug**: Pendek, jelas, include keyword
- **Tags**: 3-5 tags relevan per artikel
- **Image**: Minimal 1200x630px untuk social media sharing

### Content Writing
- **Ringkasan**: 2-3 kalimat, highlight poin utama
- **Struktur**: Gunakan heading (H2, H3) untuk organize konten
- **Paragraf**: Pendek (3-4 baris), mudah dibaca
- **Visual**: Tambahkan gambar setiap 300-500 kata
- **Links**: Internal & external links untuk SEO

### Workflow
1. **Draft**: Tulis artikel sebagai draft
2. **Review**: Review konten, SEO, gambar
3. **Publish**: Ubah status ke published
4. **Featured**: Tandai artikel terbaik sebagai featured
5. **Archive**: Archive artikel lama yang tidak relevan

## 🔧 Troubleshooting

### Gambar tidak muncul
- Pastikan URL gambar valid dan accessible
- Atau upload file gambar (akan auto-upload ke Supabase)
- Check file size (max 5MB recommended)

### Slug conflict
- Edit slug manual jika ada konflik
- Slug harus unique per artikel

### Rich Text Editor tidak muncul
- Refresh halaman
- Clear browser cache
- Check console untuk error

### Search tidak bekerja
- Search case-insensitive
- Search di title, summary, dan author
- Coba reset filter jika hasil tidak sesuai

## 📱 Mobile Responsive

Dashboard fully responsive untuk:
- Desktop (1920px+)
- Laptop (1366px-1920px)
- Tablet (768px-1366px)
- Mobile (320px-768px)

## 🔐 Security

- Admin authentication required
- Token: `baswaranewss` (stored in localStorage)
- Auto-redirect jika tidak authorized
- Secure file upload ke Supabase Storage

## 🎯 Future Enhancements (Possible)

- [ ] Bulk actions (delete, archive multiple)
- [ ] Export articles (CSV, JSON)
- [ ] Duplicate article
- [ ] Version history
- [ ] Scheduled publishing
- [ ] Analytics integration
- [ ] Comment moderation
- [ ] Multi-language support
- [ ] AI-powered content suggestions
- [ ] Image optimization auto

## 📞 Support

Jika ada pertanyaan atau issue:
1. Check dokumentasi ini
2. Check console untuk error messages
3. Verify database schema
4. Contact developer

---

**Version**: 2.0 Professional Edition  
**Last Updated**: November 2025  
**Status**: ✅ Production Ready
