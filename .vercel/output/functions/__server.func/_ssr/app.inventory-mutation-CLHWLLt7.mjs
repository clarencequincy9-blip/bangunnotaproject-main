import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth } from "./router-CswNqt6p.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { n as num } from "./format-CsoEuMsu.mjs";
import { E as ExportMenu } from "./export-menu-BmXHofII.mjs";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
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
import "./button-DA2gxxPy.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
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
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./export-OXCswqgj.mjs";
import "../_libs/xlsx.mjs";
import "../_libs/lucide-react.mjs";
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
function firstOfMonth() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(1);
  return d.toISOString().slice(0, 10);
}
function todayStr() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function MutationPage() {
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
    queryKey: ["mutation", user.id, from, to],
    queryFn: async () => {
      const [prodRes, purItemsRes, saleItemsRes, adjRes] = await Promise.all([supabase.from("products").select("id, name, unit, stock, min_stock, opening_stock"), supabase.from("purchase_items").select("product_id, qty, purchase:purchases!inner(purchase_date)"), supabase.from("sale_items").select("product_id, qty, sale:sales!inner(sale_date)"), supabase.from("stock_adjustments").select("product_id, qty_delta, adjusted_at")]);
      const products = prodRes.data ?? [];
      const purItems = purItemsRes.data ?? [];
      const saleItems = saleItemsRes.data ?? [];
      const adj = adjRes.data ?? [];
      return products.map((p) => {
        let inPeriod = 0, outPeriod = 0, adjPeriod = 0;
        let inAfter = 0, outAfter = 0, adjAfter = 0;
        purItems.filter((i) => i.product_id === p.id).forEach((i) => {
          const d = i.purchase?.purchase_date;
          if (!d) return;
          if (d >= from && d <= to) inPeriod += Number(i.qty);
          else if (d > to) inAfter += Number(i.qty);
        });
        saleItems.filter((i) => i.product_id === p.id).forEach((i) => {
          const d = i.sale?.sale_date;
          if (!d) return;
          if (d >= from && d <= to) outPeriod += Number(i.qty);
          else if (d > to) outAfter += Number(i.qty);
        });
        adj.filter((a) => a.product_id === p.id).forEach((a) => {
          const d = a.adjusted_at;
          if (!d) return;
          if (d >= from && d <= to) adjPeriod += Number(a.qty_delta);
          else if (d > to) adjAfter += Number(a.qty_delta);
        });
        const ending = Number(p.stock) - inAfter + outAfter - adjAfter;
        const opening = ending - inPeriod + outPeriod - adjPeriod;
        return {
          id: p.id,
          name: p.name,
          unit: p.unit,
          min_stock: Number(p.min_stock ?? 0),
          opening,
          inPeriod,
          outPeriod,
          adjPeriod,
          ending
        };
      });
    }
  });
  const rows = data ?? [];
  const exportSpec = reactExports.useMemo(() => () => ({
    title: t("mutation.exportTitle"),
    subtitle: `${t("common.period")}: ${from} → ${to}`,
    filename: `Mutasi-Persediaan_${from}_${to}`,
    head: [t("mutation.product"), t("mutation.unit"), t("mutation.openingPeriod"), t("mutation.stockIn"), t("mutation.stockOut"), t("mutation.adjustment"), t("mutation.endingPeriod"), t("common.status")],
    body: rows.map((r) => [r.name, r.unit, r.opening, r.inPeriod, r.outPeriod, r.adjPeriod, r.ending, r.ending <= 0 ? t("mutation.statusOut") : r.min_stock > 0 && r.ending <= r.min_stock ? t("mutation.statusLow") : t("mutation.statusOk")]),
    cols: [28, 8, 12, 12, 12, 12, 12, 12]
  }), [rows, from, to, t]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight sm:text-3xl", children: t("mutation.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground sm:text-base", children: t("mutation.subtitle") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ExportMenu, { spec: exportSpec, label: t("common.export") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-wrap items-end gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("common.from") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: from, onChange: (e) => setFrom(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("common.to") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: to, onChange: (e) => setTo(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground sm:ml-auto sm:max-w-md", children: t("mutation.carryNote") })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("mutation.product") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("mutation.unit") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("mutation.openingPeriod") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("mutation.stockIn") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("mutation.stockOut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("mutation.adjustment") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("mutation.endingPeriod") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("common.status") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "py-8 text-center text-muted-foreground", children: t("common.noData") }) }) : rows.map((r) => {
        const status = r.ending <= 0 ? {
          label: t("mutation.statusOut"),
          cls: "bg-destructive/10 text-destructive"
        } : r.min_stock > 0 && r.ending <= r.min_stock ? {
          label: t("mutation.statusLow"),
          cls: "bg-amber-500/10 text-amber-700"
        } : {
          label: t("mutation.statusOk"),
          cls: "bg-emerald-500/10 text-emerald-700"
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: r.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.unit }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: num(r.opening) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right text-emerald-700", children: [
            "+",
            num(r.inPeriod)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right text-destructive", children: [
            "-",
            num(r.outPeriod)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right", children: [
            r.adjPeriod >= 0 ? "+" : "",
            num(r.adjPeriod)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold", children: num(r.ending) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex rounded px-2 py-0.5 text-xs font-medium ${status.cls}`, children: status.label }) })
        ] }, r.id);
      }) })
    ] }) }) }) })
  ] });
}
export {
  MutationPage as component
};
