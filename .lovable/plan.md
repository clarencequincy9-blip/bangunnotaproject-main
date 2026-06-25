
Pekerjaan dibagi 5 fase agar bisa diverifikasi bertahap. Semua perubahan menambah/menggeser — tidak menghapus data atau fitur yang sudah ada.

## Fase 1 — Terminologi akuntansi (UI saja)
Rename label di seluruh `src/routes/app.*.tsx` & `src/lib/transaction-dialog.tsx`:
- "Harga Modal" → "Harga Pokok (HPP)"
- "Modal" (di laporan) → "Harga Pokok Penjualan"
- "Untung" / "Keuntungan" → "Laba Kotor" (untuk margin penjualan) / "Laba Bersih" (setelah biaya)
- "Hutang" tetap, tapi label kolom "Belum Lunas" → "Saldo Hutang"
- "Piutang" tetap; "Belum Lunas" → "Saldo Piutang"
- "Setoran" → "Pelunasan"
- "Pemasukan/Pengeluaran kas" → "Penerimaan Kas / Pengeluaran Kas"
- "Aset Gudang" → "Nilai Persediaan"
- "Saldo Bersih" → "Saldo Kas Bersih"

Kolom DB tidak diubah (kompatibilitas) — hanya label tampilan.

## Fase 2 — Integrasi Hutang otomatis
Audit & perbaiki:
- Saat membuat **Pembelian** dengan `payment_method = 'credit'` → otomatis muncul di:
  - Dashboard card "Hutang Aktif" (sudah ada — pastikan query `purchases` filter `total > paid`).
  - Halaman `app.purchases.tsx` → kolom Saldo Hutang + badge Jatuh Tempo.
  - Laporan: tambah tab **Hutang** di `app.reports.tsx` (mirroring Piutang: aging 0-14/15-30/>30, total per supplier, tombol Pelunasan).
- Tambah dialog Pelunasan Hutang yang menambah `purchases.paid` dan mencatat sebagai pengeluaran kas (atau row di tabel `payments_log` jika perlu — saya akan reuse field `paid` agar tidak menambah skema).

## Fase 3 — Stok Awal & Carry-over saldo
**Skema baru** (migration):
- Kolom `products.opening_stock numeric default 0` + `opening_stock_locked boolean default false`.
- Trigger: saat insert pertama di `sale_items`/`purchase_items` untuk product tsb → set `opening_stock_locked = true`.
- Fungsi `set_opening_stock(product_id, qty, cost)` — hanya jalan kalau belum locked; men-set `stock`, `cost_price`, `opening_stock`.

**UI**:
- Di `app.products.tsx`: tombol "Stok Awal" pada baris produk → disabled jika locked, dengan tooltip "Sudah ada transaksi, gunakan Pembelian/Penyesuaian".
- Modul baru `app.adjustments.tsx` (Penyesuaian Stok) — opsional untuk koreksi setelah locked, mencatat ke tabel baru `stock_adjustments` (qty +/-, alasan).

**Carry-over saldo periode**:
- Di `app.reports.tsx` tab Laba/Rugi & Neraca, tambah filter periode (bulan/tahun). Saldo awal = saldo akhir periode sebelumnya, dihitung di query (sum sampai tanggal sebelum periode). Berlaku untuk: Kas, Persediaan (nilai HPP × stok), Hutang, Piutang.

## Fase 4 — Export Print / PDF / Excel
Tambah `src/lib/export.ts` dengan helper:
- `printElement(id)` — `window.print()` + CSS `@media print`.
- `exportPDF(title, rows, columns)` — pakai `jspdf` + `jspdf-autotable`.
- `exportExcel(filename, sheets)` — pakai `xlsx` (SheetJS).

Tombol dropdown "Cetak / PDF / Excel" di:
- `app.sales.tsx`, `app.purchases.tsx`, `app.expenses.tsx`, `app.receivables.tsx`, halaman Hutang baru.
- `app.reports.tsx` — per tab (Laba/Rugi, Aging Piutang, Aging Hutang, Harian, Kategori).
- Detail transaksi → "Cetak Nota" (template kwitansi sederhana A5).

## Fase 5 — Multi-bahasa (ID / EN)
- Install `i18next` + `react-i18next`.
- File: `src/i18n/index.ts`, `src/i18n/locales/id.json`, `src/i18n/locales/en.json`.
- Provider di `__root.tsx`. Default `id`. Toggle Bahasa di `app.settings.tsx` (select ID / EN), simpan di `localStorage`.
- Pindahkan semua label statis ke key `t("...")`. Struktur key: `common.*`, `nav.*`, `products.*`, `sales.*`, dst — sehingga mudah menambah bahasa baru.

## Catatan teknis
- Tidak ada perubahan destruktif di tabel existing. Hanya tambah kolom & tabel baru (`stock_adjustments`).
- Migration berjalan idempotent (cek `IF NOT EXISTS`).
- Setiap fase saya commit terpisah agar mudah di-rollback.

## Konfirmasi
Setujui untuk saya jalankan **berurutan Fase 1 → 5**. Jika ada yang ingin diubah urutannya atau di-skip, beri tahu sekarang.
