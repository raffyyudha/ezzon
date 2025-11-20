# 📰 Panduan Admin Panel - Membuat Artikel

## 🎯 Fitur Baru Editor Artikel

Editor artikel telah diperbaharui dengan fitur-fitur modern yang memudahkan pembuatan artikel:

### ✨ Fitur Utama

1. **Preview Real-Time** 
   - Lihat hasil artikel secara langsung saat menulis
   - Toggle preview ON/OFF sesuai kebutuhan

2. **Drag & Drop Upload Gambar**
   - Cukup drag gambar dari komputer langsung ke editor
   - Gambar otomatis terupload dan tersimpan

3. **Galeri Gambar (Image Library)**
   - Semua gambar yang diupload tersimpan di galeri
   - Gunakan kembali gambar untuk artikel lain
   - Tidak perlu upload ulang gambar yang sama

4. **Insert Link Mudah**
   - Tombol khusus untuk insert link
   - Template untuk Datasheet dan Brosur produk
   - Link otomatis terbuka di tab baru

5. **Format Teks Cepat**
   - Tombol toolbar untuk heading, bold, italic
   - List (bullet & numbered)
   - Quote/blockquote

---

## 📝 Cara Membuat Artikel

### 1. Login ke Admin Panel
- Buka: `https://baswarasolution.com/admin`
- Password: `baswaranewss`

### 2. Isi Informasi Dasar
- **Judul Artikel** (wajib)
- **Kategori** (Berita, Event, Tutorial, dll)
- **Status**: Draft / Published / Archived
- **Tanggal** (kosongkan untuk hari ini)
- **Featured**: Centang untuk artikel unggulan

### 3. Upload Gambar Utama
**Cara 1: Upload File**
- Klik tombol "Upload Gambar"
- Pilih file dari komputer

**Cara 2: Pakai URL**
- Masukkan URL gambar langsung

**Preview gambar** akan muncul otomatis.

### 4. Tulis Ringkasan
- Ringkasan singkat (max 160 karakter)
- Akan tampil di halaman daftar artikel

### 5. Tulis Konten Artikel

#### 🖼️ Cara Insert Gambar:

**Metode 1: Drag & Drop (PALING MUDAH)**
1. Buka folder gambar di komputer
2. Drag gambar langsung ke area editor (kiri)
3. Gambar otomatis terupload dan muncul di artikel
4. Gambar juga tersimpan di Galeri

**Metode 2: Upload Button**
1. Klik tombol **🖼️ Upload** di toolbar
2. Pilih gambar dari komputer
3. Gambar otomatis diinsert ke posisi kursor

**Metode 3: Dari Galeri**
1. Klik tombol **📚 Galeri** di toolbar
2. Pilih gambar yang sudah pernah diupload
3. Klik gambar untuk insert ke artikel
4. Hemat waktu, tidak perlu upload ulang!

#### 🔗 Cara Insert Link (Datasheet/Brosur):

1. Klik tombol **🔗 Link** di toolbar
2. Pilih tipe link:
   - **Custom**: Link biasa
   - **📄 Datasheet**: Link ke datasheet produk
   - **📑 Brosur**: Link ke brosur produk
3. Isi:
   - **Teks Link**: Misal "Download Datasheet SATEC"
   - **URL**: Link ke file PDF atau halaman download
4. Klik **Insert Link**

**Contoh hasil:**
```html
<a href="https://example.com/datasheet.pdf" class="text-primary hover:underline" target="_blank">
  Download Datasheet SATEC
</a>
```

#### ✍️ Format Teks:

**Heading:**
- Klik tombol **H2** atau **H3**
- Atau ketik: `<h2>Judul Bagian</h2>`

**Bold & Italic:**
- Pilih teks → klik **B** (bold) atau **I** (italic)

**List:**
- Klik **• List** untuk bullet points
- Klik **1. List** untuk numbered list

**Quote:**
- Klik **💬 Quote** untuk membuat blockquote

### 6. Tambah Tags
- Ketik tag → tekan Enter
- Contoh: "energi", "teknologi", "SATEC"
- Tags membantu pencarian artikel

### 7. SEO (Opsional)
- **URL Slug**: Otomatis dari judul
- **Meta Description**: Deskripsi untuk Google
- **Meta Keywords**: Kata kunci untuk SEO

### 8. Simpan Artikel
- **Draft**: Artikel tersimpan tapi belum publish
- **Published**: Artikel langsung tayang di website
- **Archived**: Artikel disimpan tapi tidak tampil

---

## 💡 Tips Menulis Artikel yang Baik

### Struktur Artikel
```html
<h2>Pendahuluan</h2>
<p>Paragraf pembuka yang menarik...</p>

<h2>Manfaat Produk</h2>
<ul>
  <li>Manfaat 1</li>
  <li>Manfaat 2</li>
  <li>Manfaat 3</li>
</ul>

<h2>Spesifikasi Teknis</h2>
<p>Detail spesifikasi produk...</p>

<img src="..." alt="Gambar produk" class="w-full rounded-lg my-4" />

<h2>Download Dokumen</h2>
<p>
  <a href="..." target="_blank">Download Datasheet Produk</a>
</p>
```

### Gambar
- Gunakan gambar berkualitas tinggi (min 1200x630px)
- Beri nama file yang jelas
- Simpan di Galeri untuk digunakan lagi

### Link ke Datasheet/Brosur
- Pastikan file PDF sudah diupload ke server
- Gunakan link yang tidak akan berubah
- Beri nama link yang jelas: "Download Datasheet SATEC PM180"

### Preview
- Selalu cek preview sebelum publish
- Pastikan gambar muncul dengan baik
- Cek link berfungsi dengan benar

---

## 🎨 Galeri Gambar (Image Library)

### Keuntungan Galeri:
1. **Hemat Waktu**: Tidak perlu upload gambar yang sama berkali-kali
2. **Konsisten**: Gunakan gambar yang sama di berbagai artikel
3. **Terorganisir**: Semua gambar tersimpan di satu tempat

### Cara Pakai:
1. Upload gambar → otomatis masuk Galeri
2. Artikel baru → buka Galeri → pilih gambar
3. Hapus gambar dari Galeri jika tidak dipakai lagi

---

## 🔧 Troubleshooting

### Gambar tidak muncul?
- Cek koneksi internet
- Pastikan file gambar valid (JPG, PNG, WebP)
- Coba upload ulang

### Preview tidak update?
- Klik tombol **Preview OFF** lalu **Preview ON** lagi
- Refresh browser

### Link tidak berfungsi?
- Pastikan URL lengkap dengan `https://`
- Cek link di tab baru sebelum publish

### Artikel hilang?
- Cek filter Status (Draft/Published/Archived)
- Gunakan search untuk cari artikel

---

## 📞 Bantuan

Jika ada masalah atau pertanyaan:
- WhatsApp: +62 817-4147-477
- Email: info@baswarasolution.com

---

**Selamat menulis artikel! 🎉**
