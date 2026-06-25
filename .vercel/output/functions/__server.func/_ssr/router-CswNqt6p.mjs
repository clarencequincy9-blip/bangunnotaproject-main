import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { i as instance } from "../_libs/i18next.mjs";
import { i as initReactI18next } from "../_libs/react-i18next.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/use-sync-external-store.mjs";
const appCss = "/assets/styles-CH6QMuRY.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Ctx = reactExports.createContext({ user: null, session: null, loading: true, signOut: async () => {
} });
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Ctx.Provider,
    {
      value: {
        user: session?.user ?? null,
        session,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        }
      },
      children
    }
  );
}
const useAuth = () => reactExports.useContext(Ctx);
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const common$1 = { "save": "Simpan", "cancel": "Batal", "delete": "Hapus", "edit": "Edit", "add": "Tambah", "print": "Cetak", "exportPdf": "Ekspor PDF", "exportExcel": "Ekspor Excel", "export": "Ekspor", "search": "Cari", "loading": "Memuat…", "noData": "Belum ada data.", "yes": "Ya", "no": "Tidak", "total": "Total", "date": "Tanggal", "notes": "Catatan", "status": "Status", "amount": "Jumlah", "paid": "Dibayar", "balance": "Saldo", "dueDate": "Jatuh Tempo", "paidOff": "Lunas", "overdue": "Terlambat", "actions": "Aksi", "name": "Nama", "phone": "Telepon", "address": "Alamat", "category": "Kategori", "saving": "Menyimpan…", "deleted": "Data dihapus", "confirmDelete": "Hapus data ini?", "new": "Baru", "filter": "Filter", "from": "Dari", "to": "Sampai", "period": "Periode", "all": "Semua" };
const nav$1 = { "dashboard": "Dashboard Utama", "purchases": "1. Pembelian (Barang Masuk)", "products": "2. Persediaan & Stok", "sales": "3. Penjualan (Kasir)", "receivables": "Piutang & Hutang Usaha", "contacts": "Pelanggan & Pemasok", "expenses": "4. Beban Operasional", "adjustments": "Penyesuaian Stok", "inventoryMutation": "Mutasi Persediaan", "reports": "5. Laporan Keuangan", "settings": "Pengaturan", "signOut": "Keluar" };
const groups$1 = { "main": "Dashboard Utama", "inbound": "Alur Hulu (Inbound & Persediaan)", "outbound": "Alur Hilir (Outbound & Kas)", "financial": "Finansial & Evaluasi", "account": "Akun" };
const dashboard$1 = { "title": "Dashboard", "subtitle": "Ringkasan kinerja toko Anda 30 hari terakhir.", "netCash": "Saldo Kas Bersih 30 hari", "receivables": "Piutang Usaha", "payables": "Hutang Usaha", "inventoryValue": "Nilai Persediaan", "salesVsExpense": "Tren Penjualan vs Beban Operasional", "lowStock": "Stok Menipis", "topProducts": "Produk Terlaris", "salesComposition": "Komposisi Penjualan", "last30": "30 hari terakhir", "stockSafe": "Semua stok aman.", "noSales": "Belum ada data penjualan.", "startTip": "Mulai dengan menambah produk", "startTipDesc": "Tambahkan produk Anda dulu, lalu catat pembelian & penjualan untuk melihat analisis.", "sales": "Penjualan", "expensesLine": "Beban Operasional", "tooltipDate": "Tanggal {{d}}", "summaryProducts": "{{n}} produk", "summaryStockValue": "Nilai persediaan", "minLabel": "Min" };
const products$1 = { "title": "Persediaan & Stok", "subtitle": "Kelola seluruh produk material bangunan Anda.", "add": "Tambah Produk", "edit": "Edit Produk", "name": "Nama Produk", "sku": "SKU", "category": "Kategori", "unit": "Satuan", "rack": "Lokasi Rak", "stock": "Stok", "minStock": "Stok Minimum", "cost": "Harga Pokok (HPP)", "sell": "Harga Jual", "openingStock": "Stok Awal", "openingStockTitle": "Atur Stok Awal", "openingStockHint": "Hanya untuk implementasi awal — tidak bisa diubah lagi setelah ada transaksi.", "openingLocked": "Stok awal terkunci — gunakan Pembelian / Penyesuaian", "openingTooltip": "Atur stok awal (sekali pakai)", "currentStock": "Stok Saat Ini", "currentStockHintEdit": "Stok diubah lewat Pembelian / Penyesuaian.", "currentStockHintNew": "Kosongkan (0) jika belum ada stok. Atur Stok Awal lewat tombol khusus setelah produk dibuat.", "categoryMaterial": "Kategori Material", "rackHint": "Sektor A-1 / Area Terbuka C", "search": "Cari nama / SKU…", "noProducts": "Belum ada produk.", "deleteConfirm": "Hapus {{name}}?", "deleted": "Produk dihapus", "updated": "Produk diperbarui", "created": "Produk ditambahkan", "categoryCreateFail": "Kategori gagal dibuat", "openingSaved": "Stok awal disimpan & dikunci", "openingNonNegative": "Nilai tidak boleh negatif", "exportTitle": "Daftar Persediaan", "exportFile": "Persediaan" };
const sales$1 = { "title": "Penjualan", "subtitle": "Catat dan lihat seluruh transaksi penjualan.", "new": "Penjualan Baru", "invoice": "No. Invoice", "payMethod": "Metode Bayar", "noSales": "Belum ada transaksi penjualan." };
const purchases$1 = { "title": "Pembelian", "subtitle": "Catat pembelian dari pemasok — stok otomatis bertambah.", "new": "Pembelian Baru", "invoice": "No. Nota", "noPurchases": "Belum ada pembelian." };
const expenses$1 = { "title": "Beban Operasional", "subtitle": "Catat beban toko di luar pembelian barang.", "new": "Tambah Beban", "category": "Kategori", "noExpenses": "Belum ada beban operasional.", "addShort": "Baru", "newDialog": "Beban Operasional Baru", "saved": "Beban dicatat" };
const contacts$1 = { "title": "Pelanggan & Pemasok", "subtitle": "Kelola pelanggan, batas kredit, termin, dan pemasok toko.", "customers": "Pelanggan", "suppliers": "Pemasok", "addCustomer": "Tambah Pelanggan", "addSupplier": "Tambah Pemasok", "creditLimit": "Limit Kredit", "receivable": "Piutang", "riskStatus": "Status Risiko", "termDays": "Termin", "termDaysUnit": "{{n}} hari", "riskSafe": "Aman", "riskCritical": "Kritis", "riskOver": "Over Limit", "added": "Kontak ditambahkan", "newCustomer": "Tambah Pelanggan / Kontraktor", "newSupplier": "Tambah Pemasok" };
const receivables$1 = { "title": "Piutang & Hutang Usaha", "subtitle": "Pantau tagihan dari pelanggan dan kewajiban ke pemasok.", "totalAR": "Total Piutang Usaha", "totalAP": "Total Hutang Usaha", "arHelp": "{{count}} faktur belum lunas", "apHelp": "{{count}} nota belum lunas", "tabAR": "Piutang", "tabAP": "Hutang", "addPayment": "Pelunasan", "pay": "Bayar", "settle": "Lunaskan", "allSettled": "Semua sudah lunas 🎉" };
const reports$1 = { "title": "Laporan Keuangan", "subtitle": "Laba rugi periodik dan analisis beban operasional.", "from": "Dari", "to": "Sampai", "revenue": "Pendapatan Penjualan", "cogs": "Harga Pokok Penjualan (HPP)", "grossProfit": "Laba Kotor", "opex": "Beban Operasional", "netIncome": "Laba / Rugi Bersih", "openingBalance": "Saldo Awal Periode", "endingBalance": "Saldo Akhir Periode", "tabDaily": "Harian", "tabAgingAR": "Umur Piutang", "tabAgingAP": "Umur Hutang", "tabPL": "Laba Rugi", "tabAnnual": "Tahunan", "tabBalance": "Posisi Keuangan" };
const adjustments$1 = { "title": "Penyesuaian Stok", "subtitle": "Koreksi stok karena kerusakan, kehilangan, atau opname fisik.", "new": "Penyesuaian Baru", "qtyDelta": "Perubahan Qty (+/-)", "reason": "Alasan", "product": "Produk" };
const mutation$1 = { "title": "Mutasi Persediaan", "subtitle": "Pergerakan stok per periode: stok awal, barang masuk, barang keluar, penyesuaian, dan stok akhir.", "product": "Nama Barang", "unit": "Satuan", "openingPeriod": "Stok Awal Periode", "stockIn": "Barang Masuk", "stockOut": "Barang Keluar", "adjustment": "Penyesuaian", "endingPeriod": "Stok Akhir", "statusOk": "Aman", "statusLow": "Menipis", "statusOut": "Habis", "carryNote": "Stok Awal periode berikut otomatis diambil dari Stok Akhir periode ini.", "exportTitle": "Mutasi Persediaan" };
const settings$1 = { "title": "Pengaturan", "subtitle": "Kelola preferensi akun dan data toko Anda.", "profile": "Profil Akun", "language": "Bahasa Aplikasi", "danger": "Zona Berbahaya — Reset Data", "dangerHint": "Hapus seluruh data transaksi & inventaris toko Anda. Tindakan ini tidak dapat dibatalkan.", "userId": "ID Pengguna", "presetFull": "Pilih Semua (Reset Total)", "presetTx": "Hanya Transaksi (Pertahankan Master)", "presetNone": "Kosongkan Pilihan", "resetBtn": "Reset Data Terpilih", "resetOk": "Data berhasil direset", "resetFail": "Gagal mereset data", "confirmTitle": "Konfirmasi Reset Data", "confirmBody": "Anda akan menghapus permanen kategori data yang dipilih. Ketik", "confirmYes": "Ya, Hapus Sekarang", "confirmHint": 'Ketik "{{phrase}}" untuk konfirmasi', "scope": { "sales": "Transaksi Penjualan", "salesDesc": "Semua nota penjualan, item, dan piutang", "purchases": "Transaksi Pembelian", "purchasesDesc": "Semua nota pembelian, item, dan hutang", "expenses": "Beban Operasional", "expensesDesc": "Semua catatan beban operasional", "adjustments": "Penyesuaian Stok", "adjustmentsDesc": "Riwayat koreksi stok", "products": "Produk / Master Persediaan", "productsDesc": "Hapus juga master produk (hati-hati)", "contacts": "Pelanggan & Pemasok", "contactsDesc": "Semua pelanggan, batas kredit, dan pemasok" } };
const id = {
  common: common$1,
  nav: nav$1,
  groups: groups$1,
  dashboard: dashboard$1,
  products: products$1,
  sales: sales$1,
  purchases: purchases$1,
  expenses: expenses$1,
  contacts: contacts$1,
  receivables: receivables$1,
  reports: reports$1,
  adjustments: adjustments$1,
  mutation: mutation$1,
  settings: settings$1
};
const common = { "save": "Save", "cancel": "Cancel", "delete": "Delete", "edit": "Edit", "add": "Add", "print": "Print", "exportPdf": "Export PDF", "exportExcel": "Export Excel", "export": "Export", "search": "Search", "loading": "Loading…", "noData": "No data yet.", "yes": "Yes", "no": "No", "total": "Total", "date": "Date", "notes": "Notes", "status": "Status", "amount": "Amount", "paid": "Paid", "balance": "Balance", "dueDate": "Due Date", "paidOff": "Paid Off", "overdue": "Overdue", "actions": "Actions", "name": "Name", "phone": "Phone", "address": "Address", "category": "Category", "saving": "Saving…", "deleted": "Deleted", "confirmDelete": "Delete this item?", "new": "New", "filter": "Filter", "from": "From", "to": "To", "period": "Period", "all": "All" };
const nav = { "dashboard": "Main Dashboard", "purchases": "1. Purchases (Stock In)", "products": "2. Inventory & Stock", "sales": "3. Sales (Cashier)", "receivables": "Receivables & Payables", "contacts": "Customers & Suppliers", "expenses": "4. Operating Expenses", "adjustments": "Stock Adjustments", "inventoryMutation": "Inventory Mutation", "reports": "5. Financial Reports", "settings": "Settings", "signOut": "Sign Out" };
const groups = { "main": "Main Dashboard", "inbound": "Upstream (Inbound & Inventory)", "outbound": "Downstream (Outbound & Cash)", "financial": "Financial & Review", "account": "Account" };
const dashboard = { "title": "Dashboard", "subtitle": "Your store performance over the last 30 days.", "netCash": "Net Cash Balance (30d)", "receivables": "Accounts Receivable", "payables": "Accounts Payable", "inventoryValue": "Inventory Value", "salesVsExpense": "Sales vs Operating Expenses Trend", "lowStock": "Low Stock", "topProducts": "Top Products", "salesComposition": "Sales Composition", "last30": "Last 30 days", "stockSafe": "All stock is safe.", "noSales": "No sales data yet.", "startTip": "Start by adding products", "startTipDesc": "Add your products first, then record purchases & sales to see analytics.", "sales": "Sales", "expensesLine": "Operating Expenses", "tooltipDate": "Date {{d}}", "summaryProducts": "{{n}} products", "summaryStockValue": "Inventory value", "minLabel": "Min" };
const products = { "title": "Inventory & Stock", "subtitle": "Manage all your building material products.", "add": "Add Product", "edit": "Edit Product", "name": "Product Name", "sku": "SKU", "category": "Category", "unit": "Unit", "rack": "Rack Location", "stock": "Stock", "minStock": "Minimum Stock", "cost": "Cost (COGS)", "sell": "Selling Price", "openingStock": "Opening Stock", "openingStockTitle": "Set Opening Stock", "openingStockHint": "For initial setup only — cannot be changed once transactions exist.", "openingLocked": "Opening stock locked — use Purchases / Adjustments", "openingTooltip": "Set opening stock (one-time only)", "currentStock": "Current Stock", "currentStockHintEdit": "Stock changes via Purchases / Adjustments.", "currentStockHintNew": "Leave at 0 if no stock yet. Set Opening Stock from the dedicated button after the product is created.", "categoryMaterial": "Material Category", "rackHint": "Sector A-1 / Outdoor Area C", "search": "Search name / SKU…", "noProducts": "No products yet.", "deleteConfirm": "Delete {{name}}?", "deleted": "Product deleted", "updated": "Product updated", "created": "Product added", "categoryCreateFail": "Failed to create category", "openingSaved": "Opening stock saved & locked", "openingNonNegative": "Values cannot be negative", "exportTitle": "Inventory List", "exportFile": "Inventory" };
const sales = { "title": "Sales", "subtitle": "Record and view all sales transactions.", "new": "New Sale", "invoice": "Invoice No.", "payMethod": "Payment Method", "noSales": "No sales transactions yet." };
const purchases = { "title": "Purchases", "subtitle": "Record purchases from suppliers — stock increases automatically.", "new": "New Purchase", "invoice": "Bill No.", "noPurchases": "No purchases yet." };
const expenses = { "title": "Operating Expenses", "subtitle": "Record store expenses outside of goods purchases.", "new": "Add Expense", "category": "Category", "noExpenses": "No operating expenses yet.", "addShort": "New", "newDialog": "New Operating Expense", "saved": "Expense recorded" };
const contacts = { "title": "Customers & Suppliers", "subtitle": "Manage customers, credit limits, terms, and suppliers.", "customers": "Customers", "suppliers": "Suppliers", "addCustomer": "Add Customer", "addSupplier": "Add Supplier", "creditLimit": "Credit Limit", "receivable": "Receivable", "riskStatus": "Risk Status", "termDays": "Term", "termDaysUnit": "{{n}} days", "riskSafe": "Safe", "riskCritical": "Critical", "riskOver": "Over Limit", "added": "Contact added", "newCustomer": "Add Customer / Contractor", "newSupplier": "Add Supplier" };
const receivables = { "title": "Receivables & Payables", "subtitle": "Track customer invoices and supplier obligations.", "totalAR": "Total Receivables", "totalAP": "Total Payables", "arHelp": "{{count}} unpaid invoices", "apHelp": "{{count}} unpaid bills", "tabAR": "Receivables", "tabAP": "Payables", "addPayment": "Settle", "pay": "Pay", "settle": "Pay Off", "allSettled": "All settled 🎉" };
const reports = { "title": "Financial Reports", "subtitle": "Periodic profit & loss and operating expense analysis.", "from": "From", "to": "To", "revenue": "Sales Revenue", "cogs": "Cost of Goods Sold (COGS)", "grossProfit": "Gross Profit", "opex": "Operating Expenses", "netIncome": "Net Profit / Loss", "openingBalance": "Opening Balance", "endingBalance": "Ending Balance", "tabDaily": "Daily", "tabAgingAR": "AR Aging", "tabAgingAP": "AP Aging", "tabPL": "Profit & Loss", "tabAnnual": "Annual", "tabBalance": "Financial Position" };
const adjustments = { "title": "Stock Adjustments", "subtitle": "Correct stock due to damage, loss, or physical count.", "new": "New Adjustment", "qtyDelta": "Qty Change (+/-)", "reason": "Reason", "product": "Product" };
const mutation = { "title": "Inventory Mutation", "subtitle": "Per-period stock movement: beginning, stock in, stock out, adjustments, and ending.", "product": "Item Name", "unit": "Unit", "openingPeriod": "Beginning Inventory", "stockIn": "Stock In", "stockOut": "Stock Out", "adjustment": "Adjustment", "endingPeriod": "Ending Inventory", "statusOk": "Safe", "statusLow": "Low", "statusOut": "Out", "carryNote": "Next period's Beginning Inventory will be auto-carried from this period's Ending Inventory.", "exportTitle": "Inventory Mutation" };
const settings = { "title": "Settings", "subtitle": "Manage account preferences and your store data.", "profile": "Account Profile", "language": "Application Language", "danger": "Danger Zone — Reset Data", "dangerHint": "Erase all your store's transactions and inventory. This action cannot be undone.", "userId": "User ID", "presetFull": "Select All (Full Reset)", "presetTx": "Transactions Only (Keep Master)", "presetNone": "Clear Selection", "resetBtn": "Reset Selected Data", "resetOk": "Data reset successfully", "resetFail": "Failed to reset data", "confirmTitle": "Confirm Data Reset", "confirmBody": "You will permanently delete the selected data categories. Type", "confirmYes": "Yes, Delete Now", "confirmHint": 'Type "{{phrase}}" to confirm', "scope": { "sales": "Sales Transactions", "salesDesc": "All sales invoices, items, and receivables", "purchases": "Purchase Transactions", "purchasesDesc": "All purchase bills, items, and payables", "expenses": "Operating Expenses", "expensesDesc": "All operating expense records", "adjustments": "Stock Adjustments", "adjustmentsDesc": "Stock correction history", "products": "Products / Inventory Master", "productsDesc": "Also delete product master (be careful)", "contacts": "Customers & Suppliers", "contactsDesc": "All customers, credit limits, and suppliers" } };
const en = {
  common,
  nav,
  groups,
  dashboard,
  products,
  sales,
  purchases,
  expenses,
  contacts,
  receivables,
  reports,
  adjustments,
  mutation,
  settings
};
const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
instance.use(initReactI18next).init({
  resources: { id: { translation: id }, en: { translation: en } },
  lng: stored || "id",
  fallbackLng: "id",
  interpolation: { escapeValue: false },
  returnNull: false,
  // Initialize synchronously so i18n.isInitialized is true before the first
  // (SSR/initial) render. Otherwise t() runs before resources are ready and
  // returns the raw key (e.g. "nav.dashboard"), which is what showed the
  // "nav." prefix until the language was toggled.
  initImmediate: false,
  parseMissingKeyHandler: (key) => {
    const seg = key.split(".").pop() || key;
    return seg.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim();
  }
});
function setLanguage(lang) {
  instance.changeLanguage(lang);
  if (typeof window !== "undefined") localStorage.setItem("lang", lang);
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$e = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bangun Kelola — Pembukuan Toko Bangunan" },
      { name: "description", content: "Aplikasi SaaS pencatatan, pembukuan, dan analisis untuk toko bangunan modern." },
      { property: "og:title", content: "Bangun Kelola — Pembukuan Toko Bangunan" },
      { property: "og:description", content: "Aplikasi SaaS pencatatan, pembukuan, dan analisis untuk toko bangunan modern." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Bangun Kelola — Pembukuan Toko Bangunan" },
      { name: "twitter:description", content: "Aplikasi SaaS pencatatan, pembukuan, dan analisis untuk toko bangunan modern." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/bf637fe7-3882-46bf-8e01-998e3c452a7c" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/bf637fe7-3882-46bf-8e01-998e3c452a7c" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$e.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$d = () => import("./auth-CYQl-CtL.mjs");
const Route$d = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Masuk / Daftar — Bangun Kelola"
    }, {
      name: "description",
      content: "Masuk atau daftar akun untuk mulai mengelola pembukuan toko bangunan Anda."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./app-fiuYuUYY.mjs");
const Route$c = createFileRoute("/app")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./index-CQrJzeFR.mjs");
const Route$b = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Bangun Kelola — Pembukuan & Analisis Toko Bangunan"
    }, {
      name: "description",
      content: "Aplikasi SaaS modern untuk pencatatan stok, penjualan, pembelian, pembukuan, dan visualisasi laba toko bangunan Anda."
    }, {
      property: "og:title",
      content: "Bangun Kelola — Pembukuan Toko Bangunan"
    }, {
      property: "og:description",
      content: "Pencatatan, pembukuan, visualisasi & analisis lengkap untuk toko bangunan."
    }, {
      property: "og:image",
      content: "/__og.jpg"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./app.index-DW4aq4vm.mjs");
const Route$a = createFileRoute("/app/")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./app.settings-DQ7bFf0Z.mjs");
const Route$9 = createFileRoute("/app/settings")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./app.sales-wrHNKPzN.mjs");
const Route$8 = createFileRoute("/app/sales")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./app.reports-CtVWzg0Y.mjs");
const Route$7 = createFileRoute("/app/reports")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./app.receivables-CRTV6IS2.mjs");
const Route$6 = createFileRoute("/app/receivables")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./app.purchases-fA7P64ZA.mjs");
const Route$5 = createFileRoute("/app/purchases")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./app.products-DNf8yePd.mjs");
const Route$4 = createFileRoute("/app/products")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./app.inventory-mutation-CLHWLLt7.mjs");
const Route$3 = createFileRoute("/app/inventory-mutation")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./app.expenses-DellQwtB.mjs");
const Route$2 = createFileRoute("/app/expenses")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./app.contacts-DYnM12jm.mjs");
const Route$1 = createFileRoute("/app/contacts")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./app.adjustments-BCP1w_t0.mjs");
const Route = createFileRoute("/app/adjustments")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AuthRoute = Route$d.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$e
});
const AppRoute = Route$c.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$e
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const AppIndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRoute
});
const AppSettingsRoute = Route$9.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AppRoute
});
const AppSalesRoute = Route$8.update({
  id: "/sales",
  path: "/sales",
  getParentRoute: () => AppRoute
});
const AppReportsRoute = Route$7.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => AppRoute
});
const AppReceivablesRoute = Route$6.update({
  id: "/receivables",
  path: "/receivables",
  getParentRoute: () => AppRoute
});
const AppPurchasesRoute = Route$5.update({
  id: "/purchases",
  path: "/purchases",
  getParentRoute: () => AppRoute
});
const AppProductsRoute = Route$4.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => AppRoute
});
const AppInventoryMutationRoute = Route$3.update({
  id: "/inventory-mutation",
  path: "/inventory-mutation",
  getParentRoute: () => AppRoute
});
const AppExpensesRoute = Route$2.update({
  id: "/expenses",
  path: "/expenses",
  getParentRoute: () => AppRoute
});
const AppContactsRoute = Route$1.update({
  id: "/contacts",
  path: "/contacts",
  getParentRoute: () => AppRoute
});
const AppAdjustmentsRoute = Route.update({
  id: "/adjustments",
  path: "/adjustments",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppAdjustmentsRoute,
  AppContactsRoute,
  AppExpensesRoute,
  AppInventoryMutationRoute,
  AppProductsRoute,
  AppPurchasesRoute,
  AppReceivablesRoute,
  AppReportsRoute,
  AppSalesRoute,
  AppSettingsRoute,
  AppIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  AuthRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  setLanguage as s,
  useAuth as u
};
