import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { idr } from "@/lib/format";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { downloadExcel } from "@/lib/excel";
import { exportPDF, printDocument, tableHtml } from "@/lib/export";
import { Download, Printer, FileText } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/reports")({ component: ReportsPage });

function Row({ label, value, bold, big }: { label: string; value: number; bold?: boolean; big?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "font-semibold" : ""} ${big ? "text-lg text-primary" : ""}`}>
      <span>{label}</span>
      <span className={value < 0 ? "text-destructive" : ""}>{idr(value)}</span>
    </div>
  );
}

function firstOfMonth() {
  const d = new Date();
  d.setDate(1);
  return d.toISOString().slice(0, 10);
}
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function ReportsPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [from, setFrom] = useState(firstOfMonth());
  const [to, setTo] = useState(todayStr());

  const { data } = useQuery({
    queryKey: ["report", user!.id, from, to],
    queryFn: async () => {
      const [
        salesRes,
        expRes,
        itemsRes,
        purRes,
        openSalesRes,
        openPurRes,
        priorSalesRes,
        priorPurRes,
        priorExpRes,
        productsRes,
      ] = await Promise.all([
        supabase
          .from("sales")
          .select(
            "invoice_no, sale_date, subtotal, discount, delivery_fee, total, paid, payment_method, due_date, notes",
          )
          .gte("sale_date", from)
          .lte("sale_date", to)
          .order("sale_date"),
        supabase
          .from("expenses")
          .select("amount, category, expense_date, notes")
          .gte("expense_date", from)
          .lte("expense_date", to),
        supabase
          .from("sale_items")
          .select(
            "qty, cost, subtotal, product:products(category:categories(name)), sale:sales!inner(sale_date)",
          )
          .gte("sale.sale_date", from)
          .lte("sale.sale_date", to),
        supabase
          .from("purchases")
          .select("invoice_no, purchase_date, total, paid, payment_method, due_date, notes")
          .gte("purchase_date", from)
          .lte("purchase_date", to)
          .order("purchase_date"),
        supabase
          .from("sales")
          .select("invoice_no, sale_date, due_date, total, paid")
          .order("sale_date"),
        supabase
          .from("purchases")
          .select("invoice_no, purchase_date, due_date, total, paid")
          .order("purchase_date"),
        supabase.from("sales").select("total, paid, sale_date").lt("sale_date", from),
        supabase.from("purchases").select("total, paid, purchase_date").lt("purchase_date", from),
        supabase.from("expenses").select("amount, expense_date").lt("expense_date", from),
        supabase.from("products").select("stock, cost_price"),
      ]);
      const sales = salesRes.data ?? [];
      const expenses = expRes.data ?? [];
      const items = (itemsRes.data ?? []) as any[];
      const purchases = purRes.data ?? [];
      const openSales = (openSalesRes.data ?? []).filter(
        (sale) => Number(sale.total) - Number(sale.paid) > 0.01,
      );
      const openPur = (openPurRes.data ?? []).filter(
        (p) => Number(p.total) - Number(p.paid) > 0.01,
      );
      const products = productsRes.data ?? [];
      const inventoryValue = products.reduce(
        (sum, p) => sum + Number(p.stock) * Number(p.cost_price),
        0,
      );
      // Carry-over saldo awal periode (sebelum tanggal "from")
      const priorSales = priorSalesRes.data ?? [];
      const priorPur = priorPurRes.data ?? [];
      const priorExp = priorExpRes.data ?? [];
      const openingCash =
        priorSales.reduce((s, r) => s + Number(r.paid), 0) -
        priorPur.reduce((s, r) => s + Number(r.paid), 0) -
        priorExp.reduce((s, r) => s + Number(r.amount), 0);
      const revenue = sales.reduce((s, r) => s + Number(r.total), 0);
      const cogs = items.reduce((s, i) => s + Number(i.qty) * Number(i.cost ?? 0), 0);
      const expense = expenses.reduce((s, r) => s + Number(r.amount), 0);
      const gross = revenue - cogs;
      const net = gross - expense;
      // Saldo akhir kas periode = saldo awal + kas masuk - kas keluar (dalam periode)
      const cashIn = sales.reduce((s, r) => s + Number(r.paid), 0);
      const cashOut =
        purchases.reduce((s, r) => s + Number(r.paid), 0) + expense;
      const endingCash = openingCash + cashIn - cashOut;
      const byCat = new Map<string, number>();
      expenses.forEach((e) =>
        byCat.set(e.category, (byCat.get(e.category) ?? 0) + Number(e.amount)),
      );
      const expenseByCat = [...byCat.entries()].map(([category, amount]) => ({ category, amount }));
      const profitByCategory = new Map<string, { revenue: number; cogs: number }>();
      items.forEach((item) => {
        const category = item.product?.category?.name ?? t("reports.uncategorized");
        const current = profitByCategory.get(category) ?? { revenue: 0, cogs: 0 };
        current.revenue += Number(item.subtotal);
        current.cogs += Number(item.qty) * Number(item.cost ?? 0);
        profitByCategory.set(category, current);
      });
      const categoryProfit = [...profitByCategory.entries()].map(([category, value]) => ({
        category,
        ...value,
        profit: value.revenue - value.cogs,
      }));
      const now = new Date(`${to}T00:00:00`).getTime();
      const buildAging = () => [
        { label: t("reports.age0"), amount: 0, action: t("reports.actSupplyOk") },
        { label: t("reports.age1"), amount: 0, action: t("reports.actSendReminder") },
        { label: t("reports.age2"), amount: 0, action: t("reports.actReviewCredit") },
      ];
      const aging = buildAging();
      const apAging = buildAging().map((entry) => ({
        ...entry,
        action:
          entry.label === t("reports.age0")
            ? t("reports.actSchedule")
            : entry.label === t("reports.age1")
              ? t("reports.actContactSupplier")
              : t("reports.actRenegotiate"),
      }));
      openSales.forEach((sale) => {
        const basis = sale.due_date ?? sale.sale_date;
        const days = Math.max(
          0,
          Math.floor((now - new Date(`${basis}T00:00:00`).getTime()) / 86400000),
        );
        const index = days <= 14 ? 0 : days <= 30 ? 1 : 2;
        aging[index].amount += Number(sale.total) - Number(sale.paid);
      });
      openPur.forEach((p) => {
        const basis = p.due_date ?? p.purchase_date;
        const days = Math.max(
          0,
          Math.floor((now - new Date(`${basis}T00:00:00`).getTime()) / 86400000),
        );
        const index = days <= 14 ? 0 : days <= 30 ? 1 : 2;
        apAging[index].amount += Number(p.total) - Number(p.paid);
      });
      const supplierPayments = purchases.reduce((sum, purchase) => sum + Number(purchase.paid), 0);
      const fuelExpense = expenses
        .filter(
          (entry) => entry.category.includes("Solar") || entry.category.includes("Transportasi"),
        )
        .reduce((sum, entry) => sum + Number(entry.amount), 0);
      const laborExpense = expenses
        .filter((entry) => entry.category.includes("Kuli") || entry.category.includes("Gaji"))
        .reduce((sum, entry) => sum + Number(entry.amount), 0);
      const totalAR = openSales.reduce(
        (s, r) => s + (Number(r.total) - Number(r.paid)),
        0,
      );
      const totalAP = openPur.reduce(
        (s, r) => s + (Number(r.total) - Number(r.paid)),
        0,
      );
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
        totalAP,
      };
    },
  });

  const rows = [
    { label: t("reports.revenue"), value: data?.revenue ?? 0, bold: false, big: false },
    { label: t("reports.cogs"), value: -(data?.cogs ?? 0), bold: false, big: false },
    { label: t("reports.grossProfit"), value: data?.gross ?? 0, bold: true, big: false },
    { label: t("reports.totalOpex"), value: -(data?.expense ?? 0), bold: false, big: false },
    { label: t("reports.netIncome"), value: data?.net ?? 0, bold: true, big: true },
  ];

  function exportExcel() {
    if (!data) return;
    const period = t("reports.periodLabel", { from, to });
    const pl = [
      [t("reports.plTitle")],
      [t("common.period"), period],
      [],
      [t("reports.plReport"), t("reports.amountRp")],
      [t("reports.revenue"), data.revenue],
      [t("reports.cogs"), -data.cogs],
      [t("reports.grossProfit"), data.gross],
      [t("reports.opex"), -data.expense],
      [t("reports.netIncome"), data.net],
    ];
    const salesRows = [
      [
        t("common.date"),
        t("sales.invoice"),
        t("common.subtotal"),
        t("common.discount"),
        t("common.deliveryFee"),
        t("common.total"),
        t("common.paid"),
        t("common.remaining"),
        t("common.dueDate"),
        t("common.method"),
        t("common.notes"),
      ],
      ...data.sales.map((s) => [
        s.sale_date,
        s.invoice_no,
        Number(s.subtotal),
        Number(s.discount),
        Number(s.delivery_fee),
        Number(s.total),
        Number(s.paid),
        Number(s.total) - Number(s.paid),
        s.due_date ?? "",
        s.payment_method,
        s.notes ?? "",
      ]),
    ];
    const purRows = [
      [t("common.date"), t("purchases.invoice"), t("common.total"), t("common.paid"), t("common.remaining"), t("common.dueDate"), t("common.method"), t("common.notes")],
      ...data.purchases.map((p) => [
        p.purchase_date,
        p.invoice_no,
        Number(p.total),
        Number(p.paid),
        Number(p.total) - Number(p.paid),
        p.due_date ?? "",
        p.payment_method,
        p.notes ?? "",
      ]),
    ];
    const expRows = [
      [t("common.date"), t("common.category"), t("common.amount"), t("common.notes")],
      ...data.expenses.map((e: any) => [
        e.expense_date,
        e.category,
        Number(e.amount),
        e.notes ?? "",
      ]),
    ];
    const catRows = [
      [t("common.category"), t("common.total")],
      ...data.expenseByCat.map((c) => [c.category, c.amount]),
    ];
    const agingRows = [
      [t("reports.agingAge"), t("common.balance"), t("reports.action")],
      ...data.aging.map((entry) => [entry.label, entry.amount, entry.action]),
    ];
    const profitRows = [
      [t("common.category"), t("reports.revenue"), t("reports.cogs"), t("reports.grossProfit")],
      ...data.categoryProfit.map((entry) => [
        entry.category,
        entry.revenue,
        entry.cogs,
        entry.profit,
      ]),
    ];
    downloadExcel(`Laporan-Keuangan_${from}_${to}.xlsx`, [
      { name: t("reports.tabPL"), rows: pl, cols: [30, 18] },
      { name: t("dashboard.sales"), rows: salesRows, cols: [12, 18, 14, 12, 12, 14, 14, 14, 14, 12, 28] },
      { name: t("purchases.title"), rows: purRows, cols: [12, 18, 14, 14, 14, 14, 12, 28] },
      { name: t("expenses.title"), rows: expRows, cols: [12, 18, 14, 28] },
      { name: t("reports.expByCat"), rows: catRows, cols: [20, 16] },
      { name: t("reports.tabAgingAR"), rows: agingRows, cols: [16, 18, 30] },
      { name: t("reports.profitByCat"), rows: profitRows, cols: [24, 18, 18, 18] },
    ]);
    toast.success(t("common.excelDownloaded"));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("reports.title")}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">{t("reports.subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              if (!data) return;
              printDocument(
                tableHtml({
                  title: t("reports.plTitle"),
                  subtitle: t("reports.periodLabel", { from, to }),
                  head: [t("reports.plReport"), t("reports.amountRp")],
                  body: [
                    [t("reports.revenue"), idr(data.revenue)],
                    [t("reports.cogs"), `(${idr(data.cogs)})`],
                    [t("reports.grossProfit"), idr(data.gross)],
                    [t("reports.opex"), `(${idr(data.expense)})`],
                  ],
                  totalRow: [t("reports.netLossUpper"), idr(data.net)],
                }),
                t("reports.plTitle"),
              );
            }}
          >
            <Printer className="h-4 w-4" /> {t("reports.printPL")}
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              if (!data) return;
              exportPDF({
                title: t("reports.plTitle"),
                subtitle: t("reports.periodLabel", { from, to }),
                head: [t("reports.plReport"), t("reports.amountRp")],
                body: [
                  [t("reports.revenue"), idr(data.revenue)],
                  [t("reports.cogs"), `(${idr(data.cogs)})`],
                  [t("reports.grossProfit"), idr(data.gross)],
                  [t("reports.opex"), `(${idr(data.expense)})`],
                  [t("reports.netIncome"), idr(data.net)],
                ],
                filename: `Laba-Rugi_${from}_${to}.pdf`,
              });
              toast.success(t("common.pdfDownloaded"));
            }}
          >
            <FileText className="h-4 w-4" /> PDF
          </Button>
          <Button onClick={exportExcel} className="gap-2">
            <Download className="h-4 w-4" /> Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-end gap-4 p-4">
          <div className="flex-1 space-y-2 sm:flex-none">
            <Label>{t("reports.from")}</Label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="flex-1 space-y-2 sm:flex-none">
            <Label>{t("reports.to")}</Label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="monthly">
        <TabsList className="grid h-auto w-full grid-cols-2 sm:grid-cols-6">
          <TabsTrigger value="daily">{t("reports.tabDaily")}</TabsTrigger>
          <TabsTrigger value="aging">{t("reports.tabAgingAR")}</TabsTrigger>
          <TabsTrigger value="apaging">{t("reports.tabAgingAP")}</TabsTrigger>
          <TabsTrigger value="monthly">{t("reports.tabPL")}</TabsTrigger>
          <TabsTrigger value="balance">{t("reports.tabBalance")}</TabsTrigger>
          <TabsTrigger value="annual">{t("reports.tabAnnual")}</TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="grid gap-4 sm:grid-cols-3">
          {[
            [t("reports.cardSupplierPay"), data?.supplierPayments ?? 0],
            [t("reports.cardFuel"), data?.fuelExpense ?? 0],
            [t("reports.cardLabor"), data?.laborExpense ?? 0],
          ].map(([label, value]) => (
            <Card key={String(label)}>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-2 text-2xl font-bold">{idr(Number(value))}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="aging">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("reports.agingAge")}</TableHead>
                      <TableHead className="text-right">{t("common.balance")}</TableHead>
                      <TableHead>{t("reports.action")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(data?.aging ?? []).map((entry) => (
                      <TableRow key={entry.label}>
                        <TableCell className="font-medium">{entry.label}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {idr(entry.amount)}
                        </TableCell>
                        <TableCell>{entry.action}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="apaging">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("reports.apAgingAge")}</TableHead>
                      <TableHead className="text-right">{t("common.balance")}</TableHead>
                      <TableHead>{t("reports.action")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(data?.apAging ?? []).map((entry) => (
                      <TableRow key={entry.label}>
                        <TableCell className="font-medium">{entry.label}</TableCell>
                        <TableCell className="text-right font-semibold text-destructive">
                          {idr(entry.amount)}
                        </TableCell>
                        <TableCell>{entry.action}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="balance" className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("reports.cashFlow")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label={t("reports.openingCash")} value={data?.openingCash ?? 0} />
              <Row label={t("reports.cashIn")} value={data?.cashIn ?? 0} />
              <Row
                label={t("reports.cashOut")}
                value={-(data?.cashOut ?? 0)}
              />
              <div className="my-2 border-t" />
              <Row label={t("reports.endingCash")} value={data?.endingCash ?? 0} bold big />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("reports.financialPosition")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label={t("reports.cash")} value={data?.endingCash ?? 0} />
              <Row label={t("dashboard.receivables")} value={data?.totalAR ?? 0} />
              <Row label={t("reports.inventoryValueCogs")} value={data?.inventoryValue ?? 0} />
              <div className="my-2 border-t" />
              <Row
                label={t("reports.currentAssets")}
                value={(data?.endingCash ?? 0) + (data?.totalAR ?? 0) + (data?.inventoryValue ?? 0)}
                bold
              />
              <Row label={t("dashboard.payables")} value={data?.totalAP ?? 0} />
              <p className="pt-2 text-xs text-muted-foreground">
                {t("reports.carryNote")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly" className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("reports.plReport")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className={`flex items-center justify-between ${r.bold ? "border-t pt-3 font-semibold" : ""} ${r.big ? "border-t-2 border-primary text-lg" : ""}`}
                  >
                    <span>{r.label}</span>
                    <span
                      className={
                        r.value < 0
                          ? "text-destructive"
                          : r.big && r.value > 0
                            ? "text-primary"
                            : ""
                      }
                    >
                      {idr(r.value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("reports.expByCat")}</CardTitle>
            </CardHeader>
            <CardContent>
              {(data?.expenseByCat ?? []).length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  {t("reports.noExpInPeriod")}
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data!.expenseByCat}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="category" fontSize={11} />
                    <YAxis tickFormatter={(v) => (v / 1000).toFixed(0) + "k"} fontSize={11} />
                    <Tooltip formatter={(v: number) => idr(v)} />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {data!.expenseByCat.map((_, i) => (
                        <Cell key={i} fill={`var(--chart-${(i % 5) + 1})`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("reports.profitByCat")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(data?.categoryProfit ?? []).length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  {t("reports.noCatData")}
                </p>
              ) : (
                data!.categoryProfit.map((entry) => (
                  <div
                    key={entry.category}
                    className="flex items-center justify-between border-b pb-2 text-sm"
                  >
                    <span>{entry.category}</span>
                    <span className="font-semibold">{idr(entry.profit)}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="annual">
          <Card>
            <CardHeader>
              <CardTitle>{t("reports.annualPerf")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("reports.annualDesc")}
              </p>
              <p className="mt-3 text-3xl font-bold">{idr(data?.net ?? 0)}</p>
              <p className="mt-2 text-sm">
                {t("reports.netMargin")}{" "}
                <strong>
                  {(data?.revenue ?? 0) > 0
                    ? (((data?.net ?? 0) / (data?.revenue ?? 1)) * 100).toFixed(1)
                    : "0.0"}
                  %
                </strong>
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
