import {
  Rocket,
  LayoutDashboard,
  Warehouse,
  Truck,
  ClipboardList,
  SlidersHorizontal,
  BarChart3,
  ContactRound,
  HandCoins,
  Receipt,
  PieChart,
  Printer,
  Settings,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type DocLang = "id" | "en";

export type DocBlock =
  | { kind: "p"; id: string; en: string }
  | { kind: "steps"; id: string[]; en: string[] }
  | { kind: "note"; id: string; en: string };

export type DocSection = {
  id: string;
  icon: LucideIcon;
  title: { id: string; en: string };
  blocks: DocBlock[];
};

export const DOCS_SECTIONS: DocSection[] = [
  {
    id: "get-started",
    icon: Rocket,
    title: { id: "1. Daftar & Masuk", en: "1. Sign Up & Sign In" },
    blocks: [
      {
        kind: "p",
        id: "Aplikasi ini adalah pembukuan untuk toko bangunan: mencatat stok, pembelian, penjualan, hutang–piutang, beban, dan menghasilkan laporan keuangan yang bisa dicetak.",
        en: "This app is bookkeeping software for a building-materials store: it records stock, purchases, sales, payables & receivables, expenses, and produces printable financial reports.",
      },
      {
        kind: "steps",
        id: [
          "Buka halaman aplikasi, lalu klik Daftar (Sign Up).",
          "Isi Nama Toko, Nama Lengkap, email, dan kata sandi, kemudian kirim.",
          "Akun langsung dibuat dan Anda otomatis masuk ke Dashboard.",
        ],
        en: [
          "Open the app, then click Sign Up.",
          "Fill in Store Name, Full Name, email, and password, then submit.",
          "Your account is created and you are taken straight to the Dashboard.",
        ],
      },
      {
        kind: "note",
        id: "Untuk masuk berikutnya, gunakan email dan kata sandi yang sama pada halaman Masuk (Sign In). Data tiap toko terisolasi — hanya Anda yang bisa mengaksesnya.",
        en: "Next time, use the same email and password on the Sign In page. Each store's data is isolated — only you can access it.",
      },
    ],
  },
  {
    id: "dashboard",
    icon: LayoutDashboard,
    title: { id: "2. Dashboard (Ringkasan)", en: "2. Dashboard (Overview)" },
    blocks: [
      {
        kind: "p",
        id: "Dashboard adalah ringkasan kondisi toko. Di bagian atas ada 4 kartu angka, di bawahnya beberapa grafik.",
        en: "The Dashboard summarizes your store at a glance: four metric cards at the top, then several charts below.",
      },
      {
        kind: "steps",
        id: [
          "Saldo Kas Bersih (30 hari): uang masuk dari penjualan dikurangi pembayaran ke pemasok dan beban, selama 30 hari terakhir.",
          "Piutang Usaha: total uang yang belum dibayar pelanggan (dari penjualan tempo).",
          "Hutang Usaha: total yang belum Anda bayar ke pemasok (dari pembelian tempo).",
          "Nilai Persediaan: nilai seluruh stok, dihitung dari harga pokok (HPP).",
        ],
        en: [
          "Net Cash Balance (30d): money in from sales minus payments to suppliers and expenses, over the last 30 days.",
          "Accounts Receivable: total still owed by customers (from credit sales).",
          "Accounts Payable: total you still owe suppliers (from credit purchases).",
          "Inventory Value: the value of all stock, calculated from cost (COGS).",
        ],
      },
      {
        kind: "steps",
        id: [
          "Tren Penjualan vs Beban (grafik garis): satu garis = penjualan harian, garis lain = beban operasional, selama 30 hari. Idealnya garis penjualan berada di atas garis beban.",
          "Produk Terlaris (grafik batang): produk dengan total penjualan tertinggi. Batang makin panjang berarti makin laku.",
          "Komposisi Penjualan (grafik lingkaran/pie): porsi tiap produk terhadap total penjualan. Irisan makin besar = kontribusi makin besar.",
          "Stok Menipis: daftar produk yang stoknya menyentuh atau di bawah stok minimum — pertanda harus segera dibeli ulang.",
        ],
        en: [
          "Sales vs Expenses (line chart): one line = daily sales, the other = operating expenses, over 30 days. Ideally the sales line stays above the expense line.",
          "Top Products (bar chart): products with the highest total sales. A longer bar means it sells more.",
          "Sales Composition (pie chart): each product's share of total sales. A bigger slice means a bigger contribution.",
          "Low Stock: products at or below their minimum stock — a sign to reorder soon.",
        ],
      },
    ],
  },
  {
    id: "products",
    icon: Warehouse,
    title: { id: "3. Persediaan & Stok Awal", en: "3. Inventory & Opening Stock" },
    blocks: [
      {
        kind: "p",
        id: "Menu Persediaan & Stok untuk mengelola daftar barang Anda.",
        en: "The Inventory & Stock menu manages your list of products.",
      },
      {
        kind: "steps",
        id: [
          "Klik Tambah Produk, isi nama, satuan, kategori, harga pokok (HPP), dan harga jual, lalu Simpan. Kolom Stok Saat Ini terkunci 0 — stok awal diisi terpisah.",
          "Untuk barang yang sudah ada stoknya saat pertama memakai aplikasi, klik ikon kotak 📦 pada baris produk, isi jumlah stok awal dan HPP, lalu Simpan.",
          "Setelah disimpan, ikon berubah menjadi gembok 🔒 dan stok awal terkunci (sekali pakai).",
          "Atur Stok Minimum agar produk muncul di peringatan Stok Menipis ketika stok menyentuh batas tersebut.",
        ],
        en: [
          "Click Add Product, fill in name, unit, category, cost (COGS), and selling price, then Save. The Current Stock field is locked at 0 — opening stock is entered separately.",
          "For goods you already have when you first start using the app, click the box icon 📦 on the product row, enter the opening quantity and cost, then Save.",
          "After saving, the icon turns into a lock 🔒 and the opening stock is locked (one-time only).",
          "Set a Minimum Stock so the product appears in the Low Stock warning when it reaches that level.",
        ],
      },
      {
        kind: "note",
        id: "Harga jual diatur di form produk, bukan di kotak stok awal — karena harga jual bisa berubah kapan saja, sedangkan stok awal + HPP menjadi saldo aset awal yang dikunci. Setelah ada transaksi, stok hanya berubah lewat Pembelian, Penjualan, atau Penyesuaian.",
        en: "Selling price is set in the product form, not in the opening-stock box — because the selling price can change anytime, while opening stock + cost become a locked initial asset balance. Once transactions exist, stock only changes via Purchases, Sales, or Adjustments.",
      },
    ],
  },
  {
    id: "purchases",
    icon: Truck,
    title: { id: "4. Pembelian (Barang Masuk)", en: "4. Purchases (Stock In)" },
    blocks: [
      {
        kind: "p",
        id: "Menu Pembelian mencatat barang masuk dari pemasok. Stok bertambah otomatis.",
        en: "The Purchases menu records goods received from suppliers. Stock increases automatically.",
      },
      {
        kind: "steps",
        id: [
          "Klik Pembelian Baru, pilih pemasok, lalu tambah item (produk + qty + HPP).",
          "Pilih metode bayar: Tunai/Transfer untuk lunas, atau Tempo/Hutang untuk berhutang.",
          "Jika Tempo, isi tanggal Jatuh Tempo. Sisa yang belum dibayar otomatis masuk ke Hutang Usaha.",
          "Simpan — stok produk langsung bertambah dan HPP rata-rata diperbarui.",
        ],
        en: [
          "Click New Purchase, choose a supplier, then add items (product + qty + cost).",
          "Choose a payment method: Cash/Transfer for paid in full, or Credit/Debt to owe the balance.",
          "If Credit, set a Due Date. The unpaid balance automatically goes into Accounts Payable.",
          "Save — product stock increases immediately and the average cost is updated.",
        ],
      },
    ],
  },
  {
    id: "sales",
    icon: ClipboardList,
    title: { id: "5. Penjualan (Kasir)", en: "5. Sales (Cashier)" },
    blocks: [
      {
        kind: "p",
        id: "Menu Penjualan berfungsi seperti kasir untuk mencatat barang keluar. Stok berkurang otomatis.",
        en: "The Sales menu works like a cashier to record goods sold. Stock decreases automatically.",
      },
      {
        kind: "steps",
        id: [
          "Klik Penjualan Baru, (opsional) pilih pelanggan, lalu tambah item (produk + qty + harga jual).",
          "Isi diskon atau ongkos kirim bila ada.",
          "Pilih metode bayar. Untuk Tempo, pelanggan wajib dipilih; sistem mengecek sisa batas kredit pelanggan.",
          "Kosongkan Jumlah Dibayar agar dianggap lunas. Sisa yang belum dibayar masuk ke Piutang Usaha.",
          "Simpan — stok berkurang otomatis.",
        ],
        en: [
          "Click New Sale, optionally choose a customer, then add items (product + qty + selling price).",
          "Enter a discount or delivery fee if any.",
          "Choose a payment method. For Credit, a customer is required; the system checks the customer's remaining credit limit.",
          "Leave Amount Paid empty to treat it as paid in full. Any unpaid balance goes into Accounts Receivable.",
          "Save — stock decreases automatically.",
        ],
      },
      {
        kind: "note",
        id: "Bila stok tidak mencukupi atau transaksi melewati batas kredit pelanggan, sistem akan menolak agar data tetap valid.",
        en: "If stock is insufficient or the transaction exceeds the customer's credit limit, the system blocks it to keep the data valid.",
      },
    ],
  },
  {
    id: "adjustments",
    icon: SlidersHorizontal,
    title: { id: "6. Penyesuaian Stok", en: "6. Stock Adjustments" },
    blocks: [
      {
        kind: "p",
        id: "Penyesuaian Stok dipakai untuk mengoreksi stok karena rusak, hilang, atau hasil opname fisik.",
        en: "Stock Adjustments are used to correct stock due to damage, loss, or a physical count.",
      },
      {
        kind: "steps",
        id: [
          "Klik Penyesuaian Baru, lalu pilih produk.",
          "Isi Perubahan Qty: angka minus untuk mengurangi (mis. -2), angka plus untuk menambah (mis. 5).",
          "Isi alasan dan tanggal, lalu Simpan. Stok langsung menyesuaikan.",
        ],
        en: [
          "Click New Adjustment, then choose a product.",
          "Enter the Qty Change: a negative number to reduce (e.g. -2), a positive number to add (e.g. 5).",
          "Enter the reason and date, then Save. Stock adjusts immediately.",
        ],
      },
    ],
  },
  {
    id: "mutation",
    icon: BarChart3,
    title: { id: "7. Mutasi Persediaan", en: "7. Inventory Mutation" },
    blocks: [
      {
        kind: "p",
        id: "Mutasi Persediaan menampilkan pergerakan stok per periode. Pilih rentang tanggal Dari–Sampai (mis. satu bulan), lalu baca tiap kolom:",
        en: "Inventory Mutation shows stock movement per period. Pick a From–To date range (e.g. one month), then read each column:",
      },
      {
        kind: "steps",
        id: [
          "Stok Awal: sisa stok di awal periode (sama dengan stok akhir periode sebelumnya).",
          "Barang Masuk: total dari pembelian dalam periode.",
          "Barang Keluar: total dari penjualan dalam periode.",
          "Penyesuaian: total koreksi stok dalam periode.",
          "Stok Akhir = Stok Awal + Masuk − Keluar ± Penyesuaian.",
        ],
        en: [
          "Opening Stock: stock left at the start of the period (equals the previous period's ending stock).",
          "Stock In: total from purchases within the period.",
          "Stock Out: total from sales within the period.",
          "Adjustment: total stock corrections within the period.",
          "Ending Stock = Opening + In − Out ± Adjustment.",
        ],
      },
      {
        kind: "note",
        id: "Saat Anda berpindah ke periode berikutnya (bulan atau tahun), Stok Awal otomatis diambil dari Stok Akhir periode sebelumnya — Anda tidak perlu memasukkannya manual.",
        en: "When you move to the next period (month or year), the Opening Stock is taken automatically from the previous period's Ending Stock — you don't enter it manually.",
      },
    ],
  },
  {
    id: "contacts",
    icon: ContactRound,
    title: { id: "8. Pelanggan & Pemasok", en: "8. Customers & Suppliers" },
    blocks: [
      {
        kind: "p",
        id: "Menu ini menyimpan data mitra. Untuk pelanggan, Anda bisa mengatur batas kredit dan termin pembayaran.",
        en: "This menu stores your business contacts. For customers, you can set a credit limit and payment terms.",
      },
      {
        kind: "steps",
        id: [
          "Tab Pelanggan: klik Tambah Pelanggan, isi nama, telepon, batas kredit (limit), dan termin (hari).",
          "Tab Pemasok: klik Tambah Pemasok untuk sumber pembelian Anda.",
          "Batas kredit dipakai saat penjualan tempo untuk mencegah piutang melebihi limit pelanggan.",
        ],
        en: [
          "Customers tab: click Add Customer, fill in name, phone, credit limit, and terms (days).",
          "Suppliers tab: click Add Supplier for your purchase sources.",
          "The credit limit is used during credit sales to prevent receivables from exceeding the customer's limit.",
        ],
      },
    ],
  },
  {
    id: "receivables",
    icon: HandCoins,
    title: { id: "9. Piutang & Hutang", en: "9. Receivables & Payables" },
    blocks: [
      {
        kind: "p",
        id: "Menu ini merekap tagihan dari pelanggan (piutang) dan kewajiban ke pemasok (hutang).",
        en: "This menu summarizes amounts owed by customers (receivables) and amounts you owe suppliers (payables).",
      },
      {
        kind: "steps",
        id: [
          "Tab Piutang: daftar penjualan yang belum lunas. Tab Hutang: daftar pembelian yang belum lunas.",
          "Untuk mencatat pembayaran: isi nominal lalu klik Bayar (pembayaran sebagian), atau klik Lunas untuk melunasi seluruh sisa.",
          "Baris yang sudah melewati tanggal jatuh tempo ditandai Terlambat.",
        ],
        en: [
          "Receivables tab: sales not yet paid. Payables tab: purchases not yet paid.",
          "To record a payment: enter the amount then click Pay (partial), or click Pay Off to settle the whole balance.",
          "Rows past their due date are flagged Overdue.",
        ],
      },
    ],
  },
  {
    id: "expenses",
    icon: Receipt,
    title: { id: "10. Beban Operasional", en: "10. Operating Expenses" },
    blocks: [
      {
        kind: "p",
        id: "Beban Operasional mencatat pengeluaran di luar pembelian barang (mis. solar, upah kuli, listrik, sewa).",
        en: "Operating Expenses records spending outside of goods purchases (e.g. fuel, labor wages, electricity, rent).",
      },
      {
        kind: "steps",
        id: [
          "Klik Tambah Beban, pilih kategori, isi jumlah, tanggal, dan catatan, lalu Simpan.",
          "Beban ini ikut mengurangi laba pada Laporan Laba Rugi.",
        ],
        en: [
          "Click Add Expense, choose a category, fill in the amount, date, and notes, then Save.",
          "These expenses reduce profit on the Profit & Loss report.",
        ],
      },
    ],
  },
  {
    id: "reports",
    icon: PieChart,
    title: { id: "11. Laporan Keuangan", en: "11. Financial Reports" },
    blocks: [
      {
        kind: "p",
        id: "Laporan Keuangan menyajikan analisis per periode. Atur tanggal Dari–Sampai di bagian atas, lalu pilih tab:",
        en: "Financial Reports provides per-period analysis. Set the From–To dates at the top, then choose a tab:",
      },
      {
        kind: "steps",
        id: [
          "Harian: ringkasan pembayaran pemasok, solar & transportasi, serta upah & gaji.",
          "Umur Piutang / Umur Hutang: mengelompokkan tagihan berdasarkan usia (0–14, 15–30, > 30 hari) lengkap dengan saran tindakan.",
          "Laba Rugi: Pendapatan − HPP = Laba Kotor; dikurangi Beban Operasional = Laba/Rugi Bersih. Disertai grafik pengeluaran per kategori dan kontribusi laba per kategori.",
          "Posisi Keuangan: ringkasan arus kas serta posisi aset (kas, piutang, persediaan) dan hutang di akhir periode.",
          "Tahunan: laba bersih dan margin untuk periode yang dipilih.",
        ],
        en: [
          "Daily: a summary of supplier payments, fuel & transport, and wages & salary.",
          "AR Aging / AP Aging: groups bills by age (0–14, 15–30, > 30 days) with suggested actions.",
          "Profit & Loss: Revenue − COGS = Gross Profit; minus Operating Expenses = Net Profit/Loss. Includes charts of expenses by category and profit contribution by category.",
          "Financial Position: a summary of cash flow plus the position of assets (cash, receivables, inventory) and payables at period end.",
          "Annual: net profit and margin for the selected period.",
        ],
      },
      {
        kind: "note",
        id: "Cara membaca Laba Rugi: angka positif berarti laba/pemasukan, angka merah (negatif) berarti rugi atau biaya.",
        en: "How to read the P&L: a positive number means profit/income, a red (negative) number means a loss or cost.",
      },
    ],
  },
  {
    id: "export-print",
    icon: Printer,
    title: { id: "12. Cetak & Unduh Laporan", en: "12. Print & Download Reports" },
    blocks: [
      {
        kind: "p",
        id: "Hampir semua tabel dan laporan dapat dicetak atau diunduh sebagai berkas.",
        en: "Almost every table and report can be printed or downloaded as a file.",
      },
      {
        kind: "steps",
        id: [
          "Klik tombol Ekspor (atau Cetak L/R pada halaman Laporan).",
          "Pilih Cetak untuk langsung mencetak, Ekspor PDF untuk berkas PDF, atau Ekspor Excel untuk berkas Excel.",
          "Berkas otomatis terunduh ke perangkat Anda dan siap diserahkan atau diarsipkan.",
        ],
        en: [
          "Click the Export button (or Print P/L on the Reports page).",
          "Choose Print to print directly, Export PDF for a PDF file, or Export Excel for an Excel file.",
          "The file downloads automatically to your device, ready to hand over or archive.",
        ],
      },
    ],
  },
  {
    id: "settings",
    icon: Settings,
    title: { id: "13. Pengaturan", en: "13. Settings" },
    blocks: [
      {
        kind: "p",
        id: "Pengaturan berisi profil akun, pilihan bahasa, dan reset data.",
        en: "Settings contains your account profile, language choice, and data reset.",
      },
      {
        kind: "steps",
        id: [
          "Bahasa: pilih Indonesia atau English; seluruh aplikasi langsung berganti bahasa.",
          "Zona Berbahaya: reset data dapat menghapus kategori data terpilih. Gunakan dengan hati-hati — tindakan ini tidak dapat dibatalkan.",
        ],
        en: [
          "Language: choose Indonesian or English; the whole app switches instantly.",
          "Danger Zone: reset can delete the selected data categories. Use with care — this cannot be undone.",
        ],
      },
    ],
  },
  {
    id: "workflow",
    icon: Lightbulb,
    title: { id: "14. Alur Kerja yang Disarankan", en: "14. Recommended Workflow" },
    blocks: [
      {
        kind: "p",
        id: "Urutan pemakaian yang disarankan agar data rapi dan laporan akurat:",
        en: "A recommended order of use so your data stays clean and reports stay accurate:",
      },
      {
        kind: "steps",
        id: [
          "Tambah produk dan set stok awal + HPP (untuk barang yang sudah Anda miliki).",
          "Tambah data pelanggan & pemasok.",
          "Catat pembelian (barang masuk) dan penjualan (barang keluar) setiap hari.",
          "Catat beban operasional saat terjadi.",
          "Lakukan penyesuaian stok bila ada selisih opname.",
          "Pantau Dashboard, kelola Piutang & Hutang, lalu unduh Laporan di akhir periode.",
        ],
        en: [
          "Add products and set opening stock + cost (for goods you already own).",
          "Add your customers & suppliers.",
          "Record purchases (stock in) and sales (stock out) every day.",
          "Record operating expenses as they happen.",
          "Make stock adjustments whenever a physical count differs.",
          "Watch the Dashboard, manage Receivables & Payables, then download Reports at period end.",
        ],
      },
    ],
  },
];
