# ⚡ Quick Fix: Artikel Masa Depan Masih Muncul

## 🎯 Masalah

Artikel dengan tanggal masa depan (Januari 2026, Februari 2026, dll) masih muncul di halaman publik.

**Penyebab:** Artikel dibuat SEBELUM fitur scheduled posts, jadi:
- Status: `published` ✅
- Scheduled date: NULL ❌
- Artikel langsung muncul meskipun tanggalnya masa depan

## ✅ Solusi Cepat (5 Menit)

### Opsi 1: Edit Manual (Recommended)

1. **Buka Admin Dashboard:**
   ```
   http://localhost:3000/admin/news
   ```

2. **Untuk setiap artikel masa depan:**
   - Klik "✏️ Edit"
   - Scroll ke bagian "🕐 Jadwalkan Publikasi"
   - Pilih tanggal dan waktu (misal: 26 Januari 2026, 09:00)
   - Klik "Simpan Perubahan"

3. **Done!** Artikel akan:
   - Status → Draft
   - Tidak muncul di publik
   - Auto-publish pada waktu terjadwal

---

### Opsi 2: SQL Auto-Fix (Untuk Banyak Artikel)

1. **Buka Supabase SQL Editor**

2. **Copy-paste script ini:**

```sql
-- Auto-fix semua artikel masa depan
UPDATE news
SET 
  status = 'draft',
  scheduled_date = (date || ' 09:00:00')::timestamp with time zone,
  updated_at = NOW()
WHERE 
  date > CURRENT_DATE 
  AND status = 'published'
  AND scheduled_date IS NULL;

-- Cek hasil
SELECT id, title, date, status, scheduled_date
FROM news
WHERE date > CURRENT_DATE
ORDER BY date;
```

3. **Done!** Semua artikel masa depan akan:
   - Status → Draft
   - Scheduled date → Tanggal artikel + jam 09:00
   - Auto-publish pada tanggal tersebut

---

## 📝 Untuk Artikel Baru

Mulai sekarang, gunakan field yang benar:

### ❌ SALAH:
```
Tanggal: 26 Januari 2026
Status: Published
Jadwalkan Publikasi: (kosong)
→ Artikel langsung muncul (salah!)
```

### ✅ BENAR:
```
Tanggal: 26 Januari 2026
Status: Published (auto-change ke Draft)
Jadwalkan Publikasi: 26 Januari 2026, 09:00
→ Artikel terjadwal, auto-publish tanggal 26 Jan
```

---

## 🔍 Verifikasi

### Cek artikel tidak muncul di publik:
```
http://localhost:3000/news
→ Artikel masa depan TIDAK muncul ✅
```

### Cek artikel ada di admin:
```
http://localhost:3000/admin/news
→ Artikel ada dengan badge "🕐 Terjadwal" ✅
```

---

## 🚀 Summary

**Problem:** Artikel masa depan muncul di publik  
**Cause:** Dibuat sebelum fitur scheduled posts  
**Fix:** Edit manual atau SQL auto-fix  
**Result:** Artikel terjadwal, auto-publish pada waktunya  

**Time:** 5 menit ⚡

---

**Need help?** Lihat `FIX-EXISTING-ARTICLES.md` untuk panduan lengkap.
