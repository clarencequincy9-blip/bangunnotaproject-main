import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { idr } from "@/lib/format";
import { toast } from "sonner";
import { NewPurchaseDialog } from "@/lib/transaction-dialog";
import { ExportMenu } from "@/components/export-menu";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/purchases")({ component: PurchasesPage });

function PurchasesPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: purchases = [] } = useQuery({
    queryKey: ["purchases", user!.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .order("purchase_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("purchases.title")}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">{t("purchases.subtitle")}</p>
        </div>
        <div className="flex gap-2 shrink-0">
        <ExportMenu
          spec={() => ({
            title: "Daftar Pembelian",
            subtitle: `${purchases.length} nota`,
            filename: "Pembelian",
            head: ["Tanggal", "No. Nota", "Status", "Jatuh Tempo", "Total", "Dibayar", "Saldo Hutang"],
            body: purchases.map((p) => [
              p.purchase_date,
              p.invoice_no,
              Number(p.total) - Number(p.paid) < 0.01 ? "Lunas" : "Hutang",
              p.due_date ?? "",
              Number(p.total),
              Number(p.paid),
              Math.max(0, Number(p.total) - Number(p.paid)),
            ]),
            cols: [12, 16, 10, 14, 14, 14, 14],
            totalRow: [
              "TOTAL",
              "",
              "",
              "",
              purchases.reduce((s, p) => s + Number(p.total), 0),
              purchases.reduce((s, p) => s + Number(p.paid), 0),
              purchases.reduce((s, p) => s + Math.max(0, Number(p.total) - Number(p.paid)), 0),
            ],
          })}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Pembelian Baru</span>
              <span className="sm:hidden">Baru</span>
            </Button>
          </DialogTrigger>
          <NewPurchaseDialog
            userId={user!.id}
            onClose={() => {
              setOpen(false);
              qc.invalidateQueries({ queryKey: ["purchases"] });
              qc.invalidateQueries({ queryKey: ["products"] });
              qc.invalidateQueries({ queryKey: ["dash-stats"] });
              qc.invalidateQueries({ queryKey: ["ap"] });
            }}
          />
        </Dialog>
        </div>
      </div>
      <Card>
        <CardContent className="p-0 sm:p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>No. Nota</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Jatuh Tempo</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                      Belum ada pembelian.
                    </TableCell>
                  </TableRow>
                ) : (
                  purchases.map((p) => {
                    const lunas = Number(p.total) - Number(p.paid) < 0.01;
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="whitespace-nowrap text-xs sm:text-sm">
                          {p.purchase_date}
                        </TableCell>
                        <TableCell className="font-medium">{p.invoice_no}</TableCell>
                        <TableCell>
                          {lunas ? (
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                              Lunas
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Hutang</Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden whitespace-nowrap md:table-cell">
                          {p.due_date ?? "—"}
                        </TableCell>
                        <TableCell className="text-right font-semibold whitespace-nowrap">
                          {idr(p.total)}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={async () => {
                              if (!confirm(`Hapus ${p.invoice_no}?`)) return;
                              const { error } = await supabase
                                .from("purchases")
                                .delete()
                                .eq("id", p.id);
                              if (error) toast.error(error.message);
                              else {
                                toast.success("Dihapus");
                                qc.invalidateQueries({ queryKey: ["purchases"] });
                                qc.invalidateQueries({ queryKey: ["products"] });
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
