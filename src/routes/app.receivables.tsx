import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { idr } from "@/lib/format";
import { toast } from "sonner";
import { useState } from "react";
import { Check } from "lucide-react";
import { ExportMenu } from "@/components/export-menu";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/receivables")({ component: ReceivablesPage });

function ReceivablesPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const qc = useQueryClient();

  const { data: sales = [] } = useQuery({
    queryKey: ["ar", user!.id],
    queryFn: async () =>
      (await supabase.from("sales").select("*").order("sale_date", { ascending: false })).data ??
      [],
  });
  const { data: purchases = [] } = useQuery({
    queryKey: ["ap", user!.id],
    queryFn: async () =>
      (await supabase.from("purchases").select("*").order("purchase_date", { ascending: false }))
        .data ?? [],
  });

  const ar = sales.filter((s) => Number(s.total) - Number(s.paid) > 0.01);
  const ap = purchases.filter((p) => Number(p.total) - Number(p.paid) > 0.01);
  const totalAR = ar.reduce((s, r) => s + (Number(r.total) - Number(r.paid)), 0);
  const totalAP = ap.reduce((s, r) => s + (Number(r.total) - Number(r.paid)), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("receivables.title")}</h1>
        <p className="text-sm text-muted-foreground sm:text-base">{t("receivables.subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground">{t("receivables.totalAR")}</div>
            <div className="mt-2 text-2xl font-bold text-emerald-600">{idr(totalAR)}</div>
            <div className="mt-1 text-xs text-muted-foreground">{ar.length} faktur belum lunas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground">Total Hutang Usaha</div>
            <div className="mt-2 text-2xl font-bold text-destructive">{idr(totalAP)}</div>
            <div className="mt-1 text-xs text-muted-foreground">{ap.length} nota belum lunas</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ar">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto">
            <TabsTrigger value="ar">Piutang</TabsTrigger>
            <TabsTrigger value="ap">Hutang</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <ExportMenu
              spec={() => ({
                title: "Piutang Usaha",
                subtitle: `${ar.length} faktur belum lunas`,
                filename: "Piutang-Usaha",
                head: ["Tanggal", "Invoice", "Jatuh Tempo", "Total", "Dibayar", "Saldo Piutang"],
                body: ar.map((r) => [
                  r.sale_date,
                  r.invoice_no,
                  r.due_date ?? "",
                  Number(r.total),
                  Number(r.paid),
                  Number(r.total) - Number(r.paid),
                ]),
                cols: [12, 16, 14, 14, 14, 14],
                totalRow: ["TOTAL", "", "", "", "", totalAR],
              })}
              label="Ekspor Piutang"
            />
            <ExportMenu
              spec={() => ({
                title: "Hutang Usaha",
                subtitle: `${ap.length} nota belum lunas`,
                filename: "Hutang-Usaha",
                head: ["Tanggal", "No. Nota", "Jatuh Tempo", "Total", "Dibayar", "Saldo Hutang"],
                body: ap.map((r) => [
                  r.purchase_date,
                  r.invoice_no,
                  r.due_date ?? "",
                  Number(r.total),
                  Number(r.paid),
                  Number(r.total) - Number(r.paid),
                ]),
                cols: [12, 16, 14, 14, 14, 14],
                totalRow: ["TOTAL", "", "", "", "", totalAP],
              })}
              label="Ekspor Hutang"
            />
          </div>
        </div>
        <TabsContent value="ar">
          <DebtTable kind="sales" rows={ar} qc={qc} />
        </TabsContent>
        <TabsContent value="ap">
          <DebtTable kind="purchases" rows={ap} qc={qc} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DebtTable({
  kind,
  rows,
  qc,
}: {
  kind: "sales" | "purchases";
  rows: any[];
  qc: ReturnType<typeof useQueryClient>;
}) {
  const dateKey = kind === "sales" ? "sale_date" : "purchase_date";
  const queryKey = kind === "sales" ? "ar" : "ap";

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Nomor</TableHead>
                <TableHead>Jatuh Tempo</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Dibayar</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
                <TableHead className="w-48">Pelunasan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    Semua sudah lunas 🎉
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((r) => (
                  <PayRow
                    key={r.id}
                    row={r}
                    kind={kind}
                    dateKey={dateKey}
                    onPaid={() => {
                      qc.invalidateQueries({ queryKey: [queryKey] });
                      qc.invalidateQueries({ queryKey: [kind] });
                    }}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function PayRow({
  row,
  kind,
  dateKey,
  onPaid,
}: {
  row: any;
  kind: "sales" | "purchases";
  dateKey: string;
  onPaid: () => void;
}) {
  const sisa = Number(row.total) - Number(row.paid);
  const [amount, setAmount] = useState<number | "">("");

  async function pay(full: boolean) {
    const add = full ? sisa : Number(amount || 0);
    if (add <= 0) return toast.error("Masukkan jumlah pembayaran");
    if (add > sisa + 0.01) return toast.error("Pembayaran melebihi sisa");
    const { error } = await supabase
      .from(kind)
      .update({ paid: Number(row.paid) + add })
      .eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success("Pelunasan tercatat");
    setAmount("");
    onPaid();
  }

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">{row[dateKey]}</TableCell>
      <TableCell className="font-medium">{row.invoice_no}</TableCell>
      <TableCell className="whitespace-nowrap">
        {row.due_date ?? "—"}
        {row.due_date && row.due_date < new Date().toISOString().slice(0, 10) && (
          <span className="ml-2 rounded bg-destructive/10 px-2 py-0.5 text-xs text-destructive">
            Terlambat
          </span>
        )}
      </TableCell>
      <TableCell className="text-right">{idr(row.total)}</TableCell>
      <TableCell className="text-right text-muted-foreground">{idr(row.paid)}</TableCell>
      <TableCell className="text-right font-semibold text-destructive">{idr(sisa)}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-1 sm:flex-row">
          <Input
            type="number"
            placeholder={`${sisa}`}
            className="h-9 sm:w-28"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          />
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={() => pay(false)}>
              Bayar
            </Button>
            <Button size="sm" onClick={() => pay(true)} className="gap-1">
              <Check className="h-3 w-3" />
              Lunas
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
