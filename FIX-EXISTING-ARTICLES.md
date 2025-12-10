# 🔧 Cara Memperbaiki Artikel yang Sudah Ada

## 🎯 Masalah

Artikel-artikel yang dibuat sebelum fitur scheduled posts ditambahkan memiliki:
- **Tanggal artikel (`date`)**: Di masa depan (misal: 26 Januari 2026)
- **Status**: `published`
- **Scheduled date**: NULL (kosong)

Akibatnya, artikel tersebut **langsung muncul** di halaman publik meskipun tanggalnya di masa depan.

## 📋 Perbedaan Field

### Field `date` (Tanggal Artikel)
- Tanggal yang ditampilkan di halaman artikel
- Untuk sorting dan display
- **BUKAN** untuk penjadwalan auto-publish

### Field `scheduled_date` (Tanggal Penjadwalan)
- Tanggal untuk auto-publish artikel
- Jika diisi, artikel akan auto-publish pada waktu tersebut
- Artikel dengan scheduled_date harus berstatus `draft`

## 🔧 Solusi

Ada 3 cara untuk memperbaiki artikel yang sudah ada:

---

## Cara 1: Edit Manual di Admin Dashboard (Recommended)

### Langkah-langkah:

1. **Buka Admin Dashboard**
   ```
   http://localhost:3000/admin/news
   ```

2. **Untuk setiap artikel yang ingin dijadwalkan:**
   - Klik tombol "✏️ Edit"
   - Scroll ke bagian "🕐 Jadwalkan Publikasi"
   - Pilih tanggal dan waktu publikasi
   - Klik "Simpan Perubahan"

3. **Artikel akan otomatis:**
   - Status berubah menjadi `draft`
   - `scheduled_date` terisi
   - Tidak muncul di halaman publik
   - Auto-publish pada waktu yang ditentukan

### Kelebihan:
- ✅ Aman dan terkontrol
- ✅ Bisa set waktu publish yang spesifik
- ✅ Bisa review artikel sebelum jadwal

---

## Cara 2: SQL Script Auto-Fix (Cepat)

### Langkah-langkah:

1. **Buka Supabase SQL Editor**

2. **Jalankan script untuk cek artikel:**
   ```sql
   -- Cek artikel yang akan diubah
   SELECT 
     id, 
     title, 
     date, 
     status, 
     scheduled_date
   FROM news
   WHERE date > CURRENT_DATE AND status = 'published'
   ORDER BY date;
   ```

3. **Jalankan script fix:**
   ```sql
   -- Auto-fix artikel masa depan
   UPDATE news
   SET 
     status = 'draft',
     scheduled_date = (date || ' 09:00:00')::timestamp with time zone,
     updated_at = NOW()
   WHERE 
     date > CURRENT_DATE 
     AND status = 'published'
     AND scheduled_date IS NULL;
   ```

4. **Verifikasi hasil:**
   ```sql
   -- Cek hasil update
   SELECT 
     id, 
     title, 
     date, 
     status, 
     scheduled_date
   FROM news
   WHERE date > CURRENT_DATE
   ORDER BY date;
   ```

### Kelebihan:
- ✅ Cepat untuk banyak artikel
- ✅ Otomatis set scheduled_date = date artikel + jam 09:00
- ✅ Semua artikel masa depan langsung terjadwal

### Kekurangan:
- ⚠️ Semua artikel di-set jam 09:00 (bisa diubah manual setelahnya)

---

## Cara 3: Custom Waktu per Artikel

Jika ingin set waktu publish yang berbeda untuk setiap artikel:

```sql
-- Artikel 1: Publish jam 08:00
UPDATE news 
SET 
  status = 'draft',
  scheduled_date = '2026-01-26 08:00:00+07',
  updated_at = NOW()
WHERE id = 'artikel-id-1';

-- Artikel 2: Publish jam 10:00
UPDATE news 
SET 
  status = 'draft',
  scheduled_date = '2026-02-04 10:00:00+07',
  updated_at = NOW()
WHERE id = 'artikel-id-2';

-- Artikel 3: Publish jam 14:00
UPDATE news 
SET 
  status = 'draft',
  scheduled_date = '2026-12-05 14:00:00+07',
  updated_at = NOW()
WHERE id = 'artikel-id-3';
```

---

## 📊 Contoh Kasus

### Sebelum Fix:

| Artikel | date | status | scheduled_date | Muncul di Publik? |
|---------|------|--------|----------------|-------------------|
| Artikel A | 2026-01-26 | published | NULL | ✅ YA (salah!) |
| Artikel B | 2026-02-04 | published | NULL | ✅ YA (salah!) |
| Artikel C | 2026-12-05 | published | NULL | ✅ YA (salah!) |

### Setelah Fix:

| Artikel | date | status | scheduled_date | Muncul di Publik? |
|---------|------|--------|----------------|-------------------|
| Artikel A | 2026-01-26 | draft | 2026-01-26 09:00 | ❌ TIDAK |
| Artikel B | 2026-02-04 | draft | 2026-02-04 09:00 | ❌ TIDAK |
| Artikel C | 2026-12-05 | draft | 2026-12-05 09:00 | ❌ TIDAK |

### Setelah Auto-Publish:

Pada tanggal 26 Januari 2026 jam 09:00:

| Artikel | date | status | scheduled_date | Muncul di Publik? |
|---------|------|--------|----------------|-------------------|
| Artikel A | 2026-01-26 | **published** | 2026-01-26 09:00 | ✅ YA |
| Artikel B | 2026-02-04 | draft | 2026-02-04 09:00 | ❌ TIDAK |
| Artikel C | 2026-12-05 | draft | 2026-12-05 09:00 | ❌ TIDAK |

---

## 🚨 Penting!

### Untuk Artikel Baru (Setelah Fix):

Gunakan field yang benar:

1. **Field "Tanggal"** (date input biasa):
   - Untuk tanggal artikel yang ditampilkan
   - Bisa diisi tanggal apa saja
   - **BUKAN** untuk penjadwalan

2. **Field "🕐 Jadwalkan Publikasi"** (datetime-local):
   - Untuk penjadwalan auto-publish
   - Jika diisi, artikel akan auto-publish pada waktu tersebut
   - Jika kosong, artikel langsung published (jika status = published)

### Contoh Penggunaan:

**Scenario 1: Artikel Biasa (Langsung Publish)**
- Tanggal: 10 Desember 2025
- Status: Published
- Jadwalkan Publikasi: (kosong)
- **Result**: Artikel langsung muncul di publik

**Scenario 2: Artikel Terjadwal**
- Tanggal: 20 Desember 2025
- Status: Published (akan auto-change ke Draft)
- Jadwalkan Publikasi: 20 Desember 2025, 10:00
- **Result**: Artikel tersimpan sebagai draft, auto-publish tanggal 20 Des jam 10:00

**Scenario 3: Artikel Masa Depan (Terjadwal)**
- Tanggal: 26 Januari 2026
- Status: Published (akan auto-change ke Draft)
- Jadwalkan Publikasi: 26 Januari 2026, 09:00
- **Result**: Artikel tersimpan sebagai draft, auto-publish tanggal 26 Jan 2026 jam 09:00

---

## 🔍 Verifikasi

### Cek Artikel di Database:

```sql
-- Artikel yang akan dipublikasikan hari ini
SELECT id, title, status, scheduled_date
FROM news
WHERE scheduled_date::date = CURRENT_DATE
ORDER BY scheduled_date;

-- Artikel terjadwal di masa depan
SELECT id, title, status, scheduled_date
FROM news
WHERE scheduled_date > NOW()
ORDER BY scheduled_date;

-- Artikel yang sudah lewat waktu tapi belum published (error)
SELECT id, title, status, scheduled_date
FROM news
WHERE scheduled_date < NOW() AND status = 'draft'
ORDER BY scheduled_date;
```

### Manual Trigger Publish:

Jika ada artikel yang sudah lewat waktu tapi belum published:

```bash
curl -X POST http://localhost:3000/api/news/publish-scheduled
```

---

## 📞 Support

Jika masih ada masalah:
1. Cek artikel di admin dashboard
2. Cek database dengan SQL query di atas
3. Cek console browser untuk errors
4. Manual trigger publish API

---

**Version**: 1.0  
**Last Updated**: Desember 2025  
**Status**: ✅ Ready to Use
