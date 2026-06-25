import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth } from "./router-CswNqt6p.mjs";
import { i as idr, n as num } from "./format-CsoEuMsu.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DIV666p3.mjs";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { k as Wallet, l as HandCoins, m as Landmark, P as Package, n as ArrowUpRight, o as ArrowDownRight } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Legend, b as Line, B as BarChart, c as Bar, d as Cell, P as PieChart, e as Pie } from "../_libs/recharts.mjs";
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
function Dashboard() {
  const {
    user
  } = useAuth();
  const {
    t
  } = useTranslation();
  const uid = user.id;
  const {
    data: stats
  } = useQuery({
    queryKey: ["dash-stats", uid],
    queryFn: async () => {
      const start = /* @__PURE__ */ new Date();
      start.setDate(start.getDate() - 29);
      const startStr = start.toISOString().slice(0, 10);
      const [salesRes, expRes, prodRes, itemsRes, purchaseRes, allSalesRes, allPurchasesRes] = await Promise.all([supabase.from("sales").select("id, sale_date, total, paid, invoice_no, created_at").gte("sale_date", startStr), supabase.from("expenses").select("amount, expense_date").gte("expense_date", startStr), supabase.from("products").select("id, name, stock, min_stock, sell_price, cost_price"), supabase.from("sale_items").select("qty, price, cost, subtotal, product_id, sale:sales!inner(sale_date, user_id)").gte("sale.sale_date", startStr), supabase.from("purchases").select("id, purchase_date, total, paid, invoice_no, created_at").gte("purchase_date", startStr), supabase.from("sales").select("total, paid"), supabase.from("purchases").select("total, paid")]);
      const sales = salesRes.data ?? [];
      const expenses = expRes.data ?? [];
      const products = prodRes.data ?? [];
      const items = itemsRes.data ?? [];
      const purchases = purchaseRes.data ?? [];
      const totalRevenue = sales.reduce((s, r) => s + Number(r.total), 0);
      const totalExpense = expenses.reduce((s, r) => s + Number(r.amount), 0);
      const cogs = items.reduce((s, i) => s + Number(i.qty) * Number(i.cost ?? 0), 0);
      const grossProfit = totalRevenue - cogs;
      const netProfit = grossProfit - totalExpense;
      const map = /* @__PURE__ */ new Map();
      for (let i = 0; i < 30; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const k = d.toISOString().slice(0, 10);
        map.set(k, {
          date: k,
          sales: 0,
          expenses: 0
        });
      }
      sales.forEach((s) => {
        const k = s.sale_date;
        if (map.has(k)) map.get(k).sales += Number(s.total);
      });
      expenses.forEach((e) => {
        const k = e.expense_date;
        if (map.has(k)) map.get(k).expenses += Number(e.amount);
      });
      const series = Array.from(map.values());
      const byProd = /* @__PURE__ */ new Map();
      items.forEach((i) => byProd.set(i.product_id, (byProd.get(i.product_id) ?? 0) + Number(i.subtotal)));
      const top = [...byProd.entries()].map(([pid, total]) => ({
        name: products.find((p) => p.id === pid)?.name ?? "—",
        total
      })).sort((a, b) => b.total - a.total).slice(0, 5);
      const lowStock = products.filter((p) => Number(p.stock) <= Number(p.min_stock) && Number(p.min_stock) > 0);
      const stockValue = products.reduce((s, p) => s + Number(p.stock) * Number(p.cost_price), 0);
      const receivables = (allSalesRes.data ?? []).reduce((sum, sale) => sum + Math.max(0, Number(sale.total) - Number(sale.paid)), 0);
      const payables = (allPurchasesRes.data ?? []).reduce((sum, purchase) => sum + Math.max(0, Number(purchase.total) - Number(purchase.paid)), 0);
      const cashBalance = sales.reduce((sum, sale) => sum + Number(sale.paid), 0) - purchases.reduce((sum, purchase) => sum + Number(purchase.paid), 0) - totalExpense;
      return {
        totalRevenue,
        totalExpense,
        grossProfit,
        netProfit,
        series,
        top,
        lowStock,
        productCount: products.length,
        stockValue,
        receivables,
        payables,
        cashBalance
      };
    }
  });
  const cards = [{
    label: t("dashboard.netCash"),
    value: idr(stats?.cashBalance ?? 0),
    icon: Wallet,
    trend: (stats?.cashBalance ?? 0) >= 0 ? "up" : "down"
  }, {
    label: t("dashboard.receivables"),
    value: idr(stats?.receivables ?? 0),
    icon: HandCoins,
    trend: "up"
  }, {
    label: t("dashboard.payables"),
    value: idr(stats?.payables ?? 0),
    icon: Landmark,
    trend: "down"
  }, {
    label: t("dashboard.inventoryValue"),
    value: idr(stats?.stockValue ?? 0),
    icon: Package,
    trend: "up"
  }];
  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight sm:text-3xl", children: t("dashboard.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground sm:text-base", children: t("dashboard.subtitle") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: c.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-2xl font-bold", children: c.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1 text-xs text-muted-foreground", children: [
        c.trend === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3 text-emerald-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "h-3 w-3 text-red-500" }),
        " ",
        t("dashboard.last30")
      ] })
    ] }) }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: t("dashboard.salesVsExpense") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: stats?.series ?? [], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tickFormatter: (d) => d.slice(5), fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tickFormatter: (v) => (v / 1e3).toFixed(0) + "k", fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => idr(v), labelFormatter: (l) => t("dashboard.tooltipDate", {
            d: l
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "sales", name: t("dashboard.sales"), stroke: "var(--chart-1)", strokeWidth: 2.5, dot: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "expenses", name: t("dashboard.expensesLine"), stroke: "var(--chart-5)", strokeWidth: 2.5, dot: false })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: t("dashboard.lowStock") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          (stats?.lowStock ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("dashboard.stockSafe") }) : stats.lowStock.slice(0, 6).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-md border bg-card p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                t("dashboard.minLabel"),
                ": ",
                num(p.min_stock)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive", children: num(p.stock) })
          ] }, p.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t pt-3 text-xs text-muted-foreground", children: [
            t("dashboard.summaryProducts", {
              n: stats?.productCount ?? 0
            }),
            " · ",
            t("dashboard.summaryStockValue"),
            ": ",
            idr(stats?.stockValue ?? 0)
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: t("dashboard.topProducts") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: stats?.top ?? [], layout: "vertical", margin: {
          left: 60
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", tickFormatter: (v) => (v / 1e3).toFixed(0) + "k", fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { type: "category", dataKey: "name", fontSize: 11, width: 80 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => idr(v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "total", radius: [0, 4, 4, 0], children: (stats?.top ?? []).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: colors[i % colors.length] }, i)) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: t("dashboard.salesComposition") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: (stats?.top ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-12 text-center text-sm text-muted-foreground", children: t("dashboard.noSales") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: stats.top, dataKey: "total", nameKey: "name", outerRadius: 90, label: (e) => e.name, children: stats.top.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: colors[i % colors.length] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => idr(v) })
        ] }) }) })
      ] })
    ] }),
    (stats?.totalRevenue ?? 0) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed bg-accent/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-4 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: t("dashboard.startTip") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("dashboard.startTipDesc") })
      ] })
    ] }) })
  ] });
}
export {
  Dashboard as component
};
