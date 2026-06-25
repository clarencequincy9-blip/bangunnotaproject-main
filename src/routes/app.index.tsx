import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { idr, num } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Package, Wallet, HandCoins, Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const uid = user!.id;

  const { data: stats } = useQuery({
    queryKey: ["dash-stats", uid],
    queryFn: async () => {
      const start = new Date();
      start.setDate(start.getDate() - 29);
      const startStr = start.toISOString().slice(0, 10);

      const [salesRes, expRes, prodRes, itemsRes, purchaseRes, allSalesRes, allPurchasesRes] =
        await Promise.all([
          supabase
            .from("sales")
            .select("id, sale_date, total, paid, invoice_no, created_at")
            .gte("sale_date", startStr),
          supabase.from("expenses").select("amount, expense_date").gte("expense_date", startStr),
          supabase.from("products").select("id, name, stock, min_stock, sell_price, cost_price"),
          supabase
            .from("sale_items")
            .select("qty, price, cost, subtotal, product_id, sale:sales!inner(sale_date, user_id)")
            .gte("sale.sale_date", startStr),
          supabase
            .from("purchases")
            .select("id, purchase_date, total, paid, invoice_no, created_at")
            .gte("purchase_date", startStr),
          supabase.from("sales").select("total, paid"),
          supabase.from("purchases").select("total, paid"),
        ]);

      const sales = salesRes.data ?? [];
      const expenses = expRes.data ?? [];
      const products = prodRes.data ?? [];
      const items = (itemsRes.data ?? []) as any[];
      const purchases = purchaseRes.data ?? [];

      const totalRevenue = sales.reduce((s, r) => s + Number(r.total), 0);
      const totalExpense = expenses.reduce((s, r) => s + Number(r.amount), 0);
      const cogs = items.reduce((s, i) => s + Number(i.qty) * Number(i.cost ?? 0), 0);
      const grossProfit = totalRevenue - cogs;
      const netProfit = grossProfit - totalExpense;

      // 30 day series
      const map = new Map<string, { date: string; sales: number; expenses: number }>();
      for (let i = 0; i < 30; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const k = d.toISOString().slice(0, 10);
        map.set(k, { date: k, sales: 0, expenses: 0 });
      }
      sales.forEach((s) => {
        const k = s.sale_date;
        if (map.has(k)) map.get(k)!.sales += Number(s.total);
      });
      expenses.forEach((e) => {
        const k = e.expense_date;
        if (map.has(k)) map.get(k)!.expenses += Number(e.amount);
      });
      const series = Array.from(map.values());

      // Top products
      const byProd = new Map<string, number>();
      items.forEach((i) =>
        byProd.set(i.product_id, (byProd.get(i.product_id) ?? 0) + Number(i.subtotal)),
      );
      const top = [...byProd.entries()]
        .map(([pid, total]) => ({ name: products.find((p) => p.id === pid)?.name ?? "—", total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

      const lowStock = products.filter(
        (p) => Number(p.stock) <= Number(p.min_stock) && Number(p.min_stock) > 0,
      );
      const stockValue = products.reduce((s, p) => s + Number(p.stock) * Number(p.cost_price), 0);
      const receivables = (allSalesRes.data ?? []).reduce(
        (sum, sale) => sum + Math.max(0, Number(sale.total) - Number(sale.paid)),
        0,
      );
      const payables = (allPurchasesRes.data ?? []).reduce(
        (sum, purchase) => sum + Math.max(0, Number(purchase.total) - Number(purchase.paid)),
        0,
      );
      const cashBalance =
        sales.reduce((sum, sale) => sum + Number(sale.paid), 0) -
        purchases.reduce((sum, purchase) => sum + Number(purchase.paid), 0) -
        totalExpense;

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
        cashBalance,
      };
    },
  });

  const cards = [
    {
      label: t("dashboard.netCash"),
      value: idr(stats?.cashBalance ?? 0),
      icon: Wallet,
      trend: (stats?.cashBalance ?? 0) >= 0 ? ("up" as const) : ("down" as const),
    },
    {
      label: t("dashboard.receivables"),
      value: idr(stats?.receivables ?? 0),
      icon: HandCoins,
      trend: "up" as const,
    },
    {
      label: t("dashboard.payables"),
      value: idr(stats?.payables ?? 0),
      icon: Landmark,
      trend: "down" as const,
    },
    {
      label: t("dashboard.inventoryValue"),
      value: idr(stats?.stockValue ?? 0),
      icon: Package,
      trend: "up" as const,
    },
  ];

  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("dashboard.title")}</h1>
        <p className="text-sm text-muted-foreground sm:text-base">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{c.label}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <c.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 text-2xl font-bold">{c.value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                {c.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}{" "}
                {t("dashboard.last30")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("dashboard.salesVsExpense")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.series ?? []}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} fontSize={11} />
                <YAxis tickFormatter={(v) => (v / 1000).toFixed(0) + "k"} fontSize={11} />
                <Tooltip formatter={(v: number) => idr(v)} labelFormatter={(l) => t("dashboard.tooltipDate", { d: l })} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name={t("dashboard.sales")}
                  stroke="var(--chart-1)"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  name={t("dashboard.expensesLine")}
                  stroke="var(--chart-5)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.lowStock")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(stats?.lowStock ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("dashboard.stockSafe")}</p>
            ) : (
              stats!.lowStock.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-md border bg-card p-3"
                >
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{t("dashboard.minLabel")}: {num(p.min_stock)}</div>
                  </div>
                  <span className="rounded-md bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive">
                    {num(p.stock)}
                  </span>
                </div>
              ))
            )}
            <div className="border-t pt-3 text-xs text-muted-foreground">
              {t("dashboard.summaryProducts", { n: stats?.productCount ?? 0 })} · {t("dashboard.summaryStockValue")}: {idr(stats?.stockValue ?? 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.topProducts")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stats?.top ?? []} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  type="number"
                  tickFormatter={(v) => (v / 1000).toFixed(0) + "k"}
                  fontSize={11}
                />
                <YAxis type="category" dataKey="name" fontSize={11} width={80} />
                <Tooltip formatter={(v: number) => idr(v)} />
                <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                  {(stats?.top ?? []).map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.salesComposition")}</CardTitle>
          </CardHeader>
          <CardContent>
            {(stats?.top ?? []).length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                {t("dashboard.noSales")}
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={stats!.top}
                    dataKey="total"
                    nameKey="name"
                    outerRadius={90}
                    label={(e: any) => e.name}
                  >
                    {stats!.top.map((_, i) => (
                      <Cell key={i} fill={colors[i % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => idr(v)} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {(stats?.totalRevenue ?? 0) === 0 && (
        <Card className="border-dashed bg-accent/30">
          <CardContent className="flex items-center gap-4 p-5">
            <Package className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">{t("dashboard.startTip")}</h3>
              <p className="text-sm text-muted-foreground">{t("dashboard.startTipDesc")}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
