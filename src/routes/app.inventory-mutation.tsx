import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { num } from "@/lib/format";
import { ExportMenu } from "@/components/export-menu";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/inventory-mutation")({ component: MutationPage });

function firstOfMonth() {
  const d = new Date();
  d.setDate(1);
  return d.toISOString().slice(0, 10);
}
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function MutationPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [from, setFrom] = useState(firstOfMonth());
  const [to, setTo] = useState(todayStr());

  const { data } = useQuery({
    queryKey: ["mutation", user!.id, from, to],
    queryFn: async () => {
      const [prodRes, purItemsRes, saleItemsRes, adjRes] = await Promise.all([
        supabase.from("products").select("id, name, unit, stock, min_stock, opening_stock"),
        supabase
          .from("purchase_items")
          .select("product_id, qty, purchase:purchases!inner(purchase_date)"),
        supabase
          .from("sale_items")
          .select("product_id, qty, sale:sales!inner(sale_date)"),
        supabase.from("stock_adjustments").select("product_id, qty_delta, adjusted_at"),
      ]);
      const products = prodRes.data ?? [];
      const purItems = (purItemsRes.data ?? []) as any[];
      const saleItems = (saleItemsRes.data ?? []) as any[];
      const adj = (adjRes.data ?? []) as any[];

      // For each product, compute opening/in/out/adj/ending for [from, to]
      // ending_now = product.stock (cumulative as of "now").
      // afterTo = changes strictly after `to`
      // ending(to) = stock - afterTo
      // opening(from) = ending(to) - inPeriod + outPeriod - adjPeriod
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
          id: p.id, name: p.name, unit: p.unit,
          min_stock: Number(p.min_stock ?? 0),
          opening, inPeriod, outPeriod, adjPeriod, ending,
        };
      });
    },
  });

  const rows = data ?? [];
  const exportSpec = useMemo(
    () => () => ({
      title: t("mutation.exportTitle"),
      subtitle: `${t("common.period")}: ${from} → ${to}`,
      filename: `Mutasi-Persediaan_${from}_${to}`,
      head: [
        t("mutation.product"), t("mutation.unit"),
        t("mutation.openingPeriod"), t("mutation.stockIn"),
        t("mutation.stockOut"), t("mutation.adjustment"),
        t("mutation.endingPeriod"), t("common.status"),
      ],
      body: rows.map((r) => [
        r.name, r.unit, r.opening, r.inPeriod, r.outPeriod,
        r.adjPeriod, r.ending,
        r.ending <= 0 ? t("mutation.statusOut") :
          r.min_stock > 0 && r.ending <= r.min_stock ? t("mutation.statusLow") :
          t("mutation.statusOk"),
      ]),
      cols: [28, 8, 12, 12, 12, 12, 12, 12],
    }),
    [rows, from, to, t],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("mutation.title")}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">{t("mutation.subtitle")}</p>
        </div>
        <ExportMenu spec={exportSpec} label={t("common.export")} />
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-end gap-4 p-4">
          <div className="space-y-2">
            <Label>{t("common.from")}</Label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t("common.to")}</Label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <p className="text-xs text-muted-foreground sm:ml-auto sm:max-w-md">
            {t("mutation.carryNote")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("mutation.product")}</TableHead>
                  <TableHead>{t("mutation.unit")}</TableHead>
                  <TableHead className="text-right">{t("mutation.openingPeriod")}</TableHead>
                  <TableHead className="text-right">{t("mutation.stockIn")}</TableHead>
                  <TableHead className="text-right">{t("mutation.stockOut")}</TableHead>
                  <TableHead className="text-right">{t("mutation.adjustment")}</TableHead>
                  <TableHead className="text-right">{t("mutation.endingPeriod")}</TableHead>
                  <TableHead>{t("common.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                      {t("common.noData")}
                    </TableCell>
                  </TableRow>
                ) : rows.map((r) => {
                  const status = r.ending <= 0
                    ? { label: t("mutation.statusOut"), cls: "bg-destructive/10 text-destructive" }
                    : r.min_stock > 0 && r.ending <= r.min_stock
                    ? { label: t("mutation.statusLow"), cls: "bg-amber-500/10 text-amber-700" }
                    : { label: t("mutation.statusOk"), cls: "bg-emerald-500/10 text-emerald-700" };
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell>{r.unit}</TableCell>
                      <TableCell className="text-right">{num(r.opening)}</TableCell>
                      <TableCell className="text-right text-emerald-700">+{num(r.inPeriod)}</TableCell>
                      <TableCell className="text-right text-destructive">-{num(r.outPeriod)}</TableCell>
                      <TableCell className="text-right">{r.adjPeriod >= 0 ? "+" : ""}{num(r.adjPeriod)}</TableCell>
                      <TableCell className="text-right font-semibold">{num(r.ending)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${status.cls}`}>
                          {status.label}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
