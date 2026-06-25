import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth } from "./router-CswNqt6p.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { i as idr } from "./format-CsoEuMsu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { E as ExportMenu } from "./export-menu-BmXHofII.mjs";
import "../_libs/i18next.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { h as Check } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./export-OXCswqgj.mjs";
import "../_libs/xlsx.mjs";
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
function ReceivablesPage() {
  const {
    user
  } = useAuth();
  const {
    t
  } = useTranslation();
  const qc = useQueryClient();
  const {
    data: sales = []
  } = useQuery({
    queryKey: ["ar", user.id],
    queryFn: async () => (await supabase.from("sales").select("*").order("sale_date", {
      ascending: false
    })).data ?? []
  });
  const {
    data: purchases = []
  } = useQuery({
    queryKey: ["ap", user.id],
    queryFn: async () => (await supabase.from("purchases").select("*").order("purchase_date", {
      ascending: false
    })).data ?? []
  });
  const ar = sales.filter((s) => Number(s.total) - Number(s.paid) > 0.01);
  const ap = purchases.filter((p) => Number(p.total) - Number(p.paid) > 0.01);
  const totalAR = ar.reduce((s, r) => s + (Number(r.total) - Number(r.paid)), 0);
  const totalAP = ap.reduce((s, r) => s + (Number(r.total) - Number(r.paid)), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight sm:text-3xl", children: t("receivables.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground sm:text-base", children: t("receivables.subtitle") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: t("receivables.totalAR") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold text-emerald-600", children: idr(totalAR) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
          ar.length,
          " faktur belum lunas"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Total Hutang Usaha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold text-destructive", children: idr(totalAP) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
          ap.length,
          " nota belum lunas"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "ar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2 sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "ar", children: "Piutang" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "ap", children: "Hutang" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExportMenu, { spec: () => ({
            title: "Piutang Usaha",
            subtitle: `${ar.length} faktur belum lunas`,
            filename: "Piutang-Usaha",
            head: ["Tanggal", "Invoice", "Jatuh Tempo", "Total", "Dibayar", "Saldo Piutang"],
            body: ar.map((r) => [r.sale_date, r.invoice_no, r.due_date ?? "", Number(r.total), Number(r.paid), Number(r.total) - Number(r.paid)]),
            cols: [12, 16, 14, 14, 14, 14],
            totalRow: ["TOTAL", "", "", "", "", totalAR]
          }), label: "Ekspor Piutang" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExportMenu, { spec: () => ({
            title: "Hutang Usaha",
            subtitle: `${ap.length} nota belum lunas`,
            filename: "Hutang-Usaha",
            head: ["Tanggal", "No. Nota", "Jatuh Tempo", "Total", "Dibayar", "Saldo Hutang"],
            body: ap.map((r) => [r.purchase_date, r.invoice_no, r.due_date ?? "", Number(r.total), Number(r.paid), Number(r.total) - Number(r.paid)]),
            cols: [12, 16, 14, 14, 14, 14],
            totalRow: ["TOTAL", "", "", "", "", totalAP]
          }), label: "Ekspor Hutang" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "ar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DebtTable, { kind: "sales", rows: ar, qc }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "ap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DebtTable, { kind: "purchases", rows: ap, qc }) })
    ] })
  ] });
}
function DebtTable({
  kind,
  rows,
  qc
}) {
  const dateKey = kind === "sales" ? "sale_date" : "purchase_date";
  const queryKey = kind === "sales" ? "ar" : "ap";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tanggal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nomor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Jatuh Tempo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Total" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Dibayar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Saldo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-48", children: "Pelunasan" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "py-8 text-center text-muted-foreground", children: "Semua sudah lunas 🎉" }) }) : rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(PayRow, { row: r, kind, dateKey, onPaid: () => {
      qc.invalidateQueries({
        queryKey: [queryKey]
      });
      qc.invalidateQueries({
        queryKey: [kind]
      });
    } }, r.id)) })
  ] }) }) }) });
}
function PayRow({
  row,
  kind,
  dateKey,
  onPaid
}) {
  const sisa = Number(row.total) - Number(row.paid);
  const [amount, setAmount] = reactExports.useState("");
  async function pay(full) {
    const add = full ? sisa : Number(amount || 0);
    if (add <= 0) return toast.error("Masukkan jumlah pembayaran");
    if (add > sisa + 0.01) return toast.error("Pembayaran melebihi sisa");
    const {
      error
    } = await supabase.from(kind).update({
      paid: Number(row.paid) + add
    }).eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success("Pelunasan tercatat");
    setAmount("");
    onPaid();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap", children: row[dateKey] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: row.invoice_no }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "whitespace-nowrap", children: [
      row.due_date ?? "—",
      row.due_date && row.due_date < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 rounded bg-destructive/10 px-2 py-0.5 text-xs text-destructive", children: "Terlambat" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: idr(row.total) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-muted-foreground", children: idr(row.paid) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold text-destructive", children: idr(sisa) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", placeholder: `${sisa}`, className: "h-9 sm:w-28", value: amount, onChange: (e) => setAmount(e.target.value === "" ? "" : Number(e.target.value)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => pay(false), children: "Bayar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => pay(true), className: "gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
          "Lunas"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ReceivablesPage as component
};
