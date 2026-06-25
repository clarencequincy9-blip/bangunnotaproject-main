import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth } from "./router-CswNqt6p.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DIV666p3.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { i as idr } from "./format-CsoEuMsu.mjs";
import { u as utils, w as writeFileSync } from "../_libs/xlsx.mjs";
import { p as printDocument, t as tableHtml, e as exportPDF } from "./export-OXCswqgj.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { u as Printer, F as FileText, D as Download } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, c as Bar, d as Cell } from "../_libs/recharts.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/use-sync-external-store.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function downloadExcel(filename, sheets) {
  const wb = utils.book_new();
  for (const s of sheets) {
    const ws = utils.aoa_to_sheet(s.rows);
    if (s.cols) ws["!cols"] = s.cols.map((wch) => ({ wch }));
    const range = utils.decode_range(ws["!ref"] ?? "A1");
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = utils.encode_cell({ r: 0, c });
      if (ws[addr]) ws[addr].s = { font: { bold: true } };
    }
    utils.book_append_sheet(wb, ws, s.name.slice(0, 31));
  }
  writeFileSync(wb, filename);
}
function Row({
  label,
  value,
  bold,
  big
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between ${bold ? "font-semibold" : ""} ${big ? "text-lg text-primary" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: value < 0 ? "text-destructive" : "", children: idr(value) })
  ] });
}
function firstOfMonth() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(1);
  return d.toISOString().slice(0, 10);
}
function todayStr() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function ReportsPage() {
  const {
    user
  } = useAuth();
  const {
    t
  } = useTranslation();
  const [from, setFrom] = reactExports.useState(firstOfMonth());
  const [to, setTo] = reactExports.useState(todayStr());
  const {
    data
  } = useQuery({
    queryKey: ["report", user.id, from, to],
    queryFn: async () => {
      const [salesRes, expRes, itemsRes, purRes, openSalesRes, openPurRes, priorSalesRes, priorPurRes, priorExpRes, productsRes] = await Promise.all([supabase.from("sales").select("invoice_no, sale_date, subtotal, discount, delivery_fee, total, paid, payment_method, due_date, notes").gte("sale_date", from).lte("sale_date", to).order("sale_date"), supabase.from("expenses").select("amount, category, expense_date, notes").gte("expense_date", from).lte("expense_date", to), supabase.from("sale_items").select("qty, cost, subtotal, product:products(category:categories(name)), sale:sales!inner(sale_date)").gte("sale.sale_date", from).lte("sale.sale_date", to), supabase.from("purchases").select("invoice_no, purchase_date, total, paid, payment_method, due_date, notes").gte("purchase_date", from).lte("purchase_date", to).order("purchase_date"), supabase.from("sales").select("invoice_no, sale_date, due_date, total, paid").order("sale_date"), supabase.from("purchases").select("invoice_no, purchase_date, due_date, total, paid").order("purchase_date"), supabase.from("sales").select("total, paid, sale_date").lt("sale_date", from), supabase.from("purchases").select("total, paid, purchase_date").lt("purchase_date", from), supabase.from("expenses").select("amount, expense_date").lt("expense_date", from), supabase.from("products").select("stock, cost_price")]);
      const sales = salesRes.data ?? [];
      const expenses = expRes.data ?? [];
      const items = itemsRes.data ?? [];
      const purchases = purRes.data ?? [];
      const openSales = (openSalesRes.data ?? []).filter((sale) => Number(sale.total) - Number(sale.paid) > 0.01);
      const openPur = (openPurRes.data ?? []).filter((p) => Number(p.total) - Number(p.paid) > 0.01);
      const products = productsRes.data ?? [];
      const inventoryValue = products.reduce((sum, p) => sum + Number(p.stock) * Number(p.cost_price), 0);
      const priorSales = priorSalesRes.data ?? [];
      const priorPur = priorPurRes.data ?? [];
      const priorExp = priorExpRes.data ?? [];
      const openingCash = priorSales.reduce((s, r) => s + Number(r.paid), 0) - priorPur.reduce((s, r) => s + Number(r.paid), 0) - priorExp.reduce((s, r) => s + Number(r.amount), 0);
      const revenue = sales.reduce((s, r) => s + Number(r.total), 0);
      const cogs = items.reduce((s, i) => s + Number(i.qty) * Number(i.cost ?? 0), 0);
      const expense = expenses.reduce((s, r) => s + Number(r.amount), 0);
      const gross = revenue - cogs;
      const net = gross - expense;
      const cashIn = sales.reduce((s, r) => s + Number(r.paid), 0);
      const cashOut = purchases.reduce((s, r) => s + Number(r.paid), 0) + expense;
      const endingCash = openingCash + cashIn - cashOut;
      const byCat = /* @__PURE__ */ new Map();
      expenses.forEach((e) => byCat.set(e.category, (byCat.get(e.category) ?? 0) + Number(e.amount)));
      const expenseByCat = [...byCat.entries()].map(([category, amount]) => ({
        category,
        amount
      }));
      const profitByCategory = /* @__PURE__ */ new Map();
      items.forEach((item) => {
        const category = item.product?.category?.name ?? "Tanpa Kategori";
        const current = profitByCategory.get(category) ?? {
          revenue: 0,
          cogs: 0
        };
        current.revenue += Number(item.subtotal);
        current.cogs += Number(item.qty) * Number(item.cost ?? 0);
        profitByCategory.set(category, current);
      });
      const categoryProfit = [...profitByCategory.entries()].map(([category, value]) => ({
        category,
        ...value,
        profit: value.revenue - value.cogs
      }));
      const now = (/* @__PURE__ */ new Date(`${to}T00:00:00`)).getTime();
      const buildAging = () => [{
        label: "0–14 hari",
        amount: 0,
        action: "Supply lancar"
      }, {
        label: "15–30 hari",
        amount: 0,
        action: "Kirim pengingat tagihan"
      }, {
        label: "> 30 hari",
        amount: 0,
        action: "Tinjau penghentian kredit"
      }];
      const aging = buildAging();
      const apAging = buildAging().map((entry) => ({
        ...entry,
        action: entry.label === "0–14 hari" ? "Jadwalkan pelunasan" : entry.label === "15–30 hari" ? "Hubungi pemasok" : "Negosiasi ulang termin"
      }));
      openSales.forEach((sale) => {
        const basis = sale.due_date ?? sale.sale_date;
        const days = Math.max(0, Math.floor((now - (/* @__PURE__ */ new Date(`${basis}T00:00:00`)).getTime()) / 864e5));
        const index = days <= 14 ? 0 : days <= 30 ? 1 : 2;
        aging[index].amount += Number(sale.total) - Number(sale.paid);
      });
      openPur.forEach((p) => {
        const basis = p.due_date ?? p.purchase_date;
        const days = Math.max(0, Math.floor((now - (/* @__PURE__ */ new Date(`${basis}T00:00:00`)).getTime()) / 864e5));
        const index = days <= 14 ? 0 : days <= 30 ? 1 : 2;
        apAging[index].amount += Number(p.total) - Number(p.paid);
      });
      const supplierPayments = purchases.reduce((sum, purchase) => sum + Number(purchase.paid), 0);
      const fuelExpense = expenses.filter((entry) => entry.category.includes("Solar") || entry.category.includes("Transportasi")).reduce((sum, entry) => sum + Number(entry.amount), 0);
      const laborExpense = expenses.filter((entry) => entry.category.includes("Kuli") || entry.category.includes("Gaji")).reduce((sum, entry) => sum + Number(entry.amount), 0);
      const totalAR = openSales.reduce((s, r) => s + (Number(r.total) - Number(r.paid)), 0);
      const totalAP = openPur.reduce((s, r) => s + (Number(r.total) - Number(r.paid)), 0);
      return {
        revenue,
        cogs,
        gross,
        expense,
        net,
        expenseByCat,
        categoryProfit,
        aging,
        apAging,
        supplierPayments,
        fuelExpense,
        laborExpense,
        sales,
        expenses,
        purchases,
        openingCash,
        endingCash,
        cashIn,
        cashOut,
        inventoryValue,
        totalAR,
        totalAP
      };
    }
  });
  const rows = [{
    label: "Pendapatan Penjualan",
    value: data?.revenue ?? 0,
    bold: false,
    big: false
  }, {
    label: "Harga Pokok Penjualan (HPP)",
    value: -(data?.cogs ?? 0),
    bold: false,
    big: false
  }, {
    label: "Laba Kotor",
    value: data?.gross ?? 0,
    bold: true,
    big: false
  }, {
    label: "Total Beban Operasional",
    value: -(data?.expense ?? 0),
    bold: false,
    big: false
  }, {
    label: "Laba / Rugi Bersih",
    value: data?.net ?? 0,
    bold: true,
    big: true
  }];
  function exportExcel() {
    if (!data) return;
    const period = `${from} s/d ${to}`;
    const pl = [["LAPORAN LABA RUGI"], ["Periode", period], [], ["Keterangan", "Jumlah (Rp)"], ["Pendapatan Penjualan", data.revenue], ["Harga Pokok Penjualan", -data.cogs], ["Laba Kotor", data.gross], ["Beban Operasional", -data.expense], ["Laba / Rugi Bersih", data.net]];
    const salesRows = [["Tanggal", "No. Invoice", "Subtotal", "Diskon", "Ongkir", "Total", "Dibayar", "Sisa", "Jatuh Tempo", "Metode", "Catatan"], ...data.sales.map((s) => [s.sale_date, s.invoice_no, Number(s.subtotal), Number(s.discount), Number(s.delivery_fee), Number(s.total), Number(s.paid), Number(s.total) - Number(s.paid), s.due_date ?? "", s.payment_method, s.notes ?? ""])];
    const purRows = [["Tanggal", "No. Nota", "Total", "Dibayar", "Sisa", "Jatuh Tempo", "Metode", "Catatan"], ...data.purchases.map((p) => [p.purchase_date, p.invoice_no, Number(p.total), Number(p.paid), Number(p.total) - Number(p.paid), p.due_date ?? "", p.payment_method, p.notes ?? ""])];
    const expRows = [["Tanggal", "Kategori", "Jumlah", "Catatan"], ...data.expenses.map((e) => [e.expense_date, e.category, Number(e.amount), e.notes ?? ""])];
    const catRows = [["Kategori", "Total"], ...data.expenseByCat.map((c) => [c.category, c.amount])];
    const agingRows = [["Umur", "Saldo", "Tindakan"], ...data.aging.map((entry) => [entry.label, entry.amount, entry.action])];
    const profitRows = [["Kategori", "Pendapatan", "HPP", "Laba Kotor"], ...data.categoryProfit.map((entry) => [entry.category, entry.revenue, entry.cogs, entry.profit])];
    downloadExcel(`Laporan-Keuangan_${from}_${to}.xlsx`, [{
      name: "Laba Rugi",
      rows: pl,
      cols: [30, 18]
    }, {
      name: "Penjualan",
      rows: salesRows,
      cols: [12, 18, 14, 12, 12, 14, 14, 14, 14, 12, 28]
    }, {
      name: "Pembelian",
      rows: purRows,
      cols: [12, 18, 14, 14, 14, 14, 12, 28]
    }, {
      name: "Pengeluaran",
      rows: expRows,
      cols: [12, 18, 14, 28]
    }, {
      name: "Per Kategori",
      rows: catRows,
      cols: [20, 16]
    }, {
      name: "Aging Piutang",
      rows: agingRows,
      cols: [16, 18, 30]
    }, {
      name: "Laba per Kategori",
      rows: profitRows,
      cols: [24, 18, 18, 18]
    }]);
    toast.success("File Excel diunduh");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight sm:text-3xl", children: t("reports.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground sm:text-base", children: t("reports.subtitle") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", onClick: () => {
          if (!data) return;
          printDocument(tableHtml({
            title: "Laporan Laba Rugi",
            subtitle: `Periode ${from} s/d ${to}`,
            head: ["Keterangan", "Jumlah (Rp)"],
            body: [["Pendapatan Penjualan", idr(data.revenue)], ["Harga Pokok Penjualan", `(${idr(data.cogs)})`], ["Laba Kotor", idr(data.gross)], ["Beban Operasional", `(${idr(data.expense)})`]],
            totalRow: ["LABA / RUGI BERSIH", idr(data.net)]
          }), "Laporan Laba Rugi");
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
          " Cetak L/R"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", onClick: () => {
          if (!data) return;
          exportPDF({
            title: "Laporan Laba Rugi",
            subtitle: `Periode ${from} s/d ${to}`,
            head: ["Keterangan", "Jumlah (Rp)"],
            body: [["Pendapatan Penjualan", idr(data.revenue)], ["Harga Pokok Penjualan", `(${idr(data.cogs)})`], ["Laba Kotor", idr(data.gross)], ["Beban Operasional", `(${idr(data.expense)})`], ["Laba / Rugi Bersih", idr(data.net)]],
            filename: `Laba-Rugi_${from}_${to}.pdf`
          });
          toast.success("PDF diunduh");
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          " PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: exportExcel, className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " Excel"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-wrap items-end gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 sm:flex-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Dari" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: from, onChange: (e) => setFrom(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 sm:flex-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Sampai" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: to, onChange: (e) => setTo(e.target.value) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "monthly", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid h-auto w-full grid-cols-2 sm:grid-cols-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "daily", children: "Harian" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "aging", children: "Umur Piutang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "apaging", children: "Umur Hutang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "monthly", children: "Laba Rugi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "balance", children: "Posisi Keuangan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "annual", children: "Tahunan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "daily", className: "grid gap-4 sm:grid-cols-3", children: [["Pembayaran Supplier", data?.supplierPayments ?? 0], ["Solar & Transportasi", data?.fuelExpense ?? 0], ["Upah Muat & Gaji", data?.laborExpense ?? 0]].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold", children: idr(Number(value)) })
      ] }) }, String(label))) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "aging", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Umur Keterlambatan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Saldo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tindakan" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (data?.aging ?? []).map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: entry.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold", children: idr(entry.amount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: entry.action })
        ] }, entry.label)) })
      ] }) }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "apaging", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Umur Hutang ke Pemasok" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Saldo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tindakan" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (data?.apAging ?? []).map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: entry.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold text-destructive", children: idr(entry.amount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: entry.action })
        ] }, entry.label)) })
      ] }) }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "balance", className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Arus Kas Ringkas" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Saldo Kas Awal Periode", value: data?.openingCash ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "(+) Penerimaan Kas", value: data?.cashIn ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "(−) Pembayaran Pemasok & Beban", value: -(data?.cashOut ?? 0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2 border-t" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Saldo Kas Akhir Periode", value: data?.endingCash ?? 0, bold: true, big: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Posisi Keuangan (Saldo Akhir)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Kas & Setara Kas", value: data?.endingCash ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Piutang Usaha", value: data?.totalAR ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Nilai Persediaan (HPP)", value: data?.inventoryValue ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2 border-t" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Total Aset Lancar", value: (data?.endingCash ?? 0) + (data?.totalAR ?? 0) + (data?.inventoryValue ?? 0), bold: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Hutang Usaha", value: data?.totalAP ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-xs text-muted-foreground", children: "Saldo awal periode berikutnya akan otomatis diambil dari nilai akhir periode ini." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "monthly", className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Laporan Laba / Rugi" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between ${r.bold ? "border-t pt-3 font-semibold" : ""} ${r.big ? "border-t-2 border-primary text-lg" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: r.value < 0 ? "text-destructive" : r.big && r.value > 0 ? "text-primary" : "", children: idr(r.value) })
          ] }, r.label)) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Pengeluaran per Kategori" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: (data?.expenseByCat ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-12 text-center text-sm text-muted-foreground", children: "Belum ada pengeluaran pada periode ini." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: data.expenseByCat, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.2 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "category", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tickFormatter: (v) => (v / 1e3).toFixed(0) + "k", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => idr(v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "amount", radius: [4, 4, 0, 0], children: data.expenseByCat.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: `var(--chart-${i % 5 + 1})` }, i)) })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Kontribusi Laba per Kategori" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: (data?.categoryProfit ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Belum ada data kategori produk." }) : data.categoryProfit.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b pb-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: entry.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: idr(entry.profit) })
          ] }, entry.category)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "annual", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Kinerja Tahunan / Periode Terpilih" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Laba operasional aktual berdasarkan transaksi pada periode, tanpa angka proyeksi simulasi." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-bold", children: idr(data?.net ?? 0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm", children: [
            "Margin laba bersih:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              (data?.revenue ?? 0) > 0 ? ((data?.net ?? 0) / (data?.revenue ?? 1) * 100).toFixed(1) : "0.0",
              "%"
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ReportsPage as component
};
