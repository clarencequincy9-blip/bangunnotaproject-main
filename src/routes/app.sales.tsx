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
import { NewSaleDialog } from "@/lib/transaction-dialog";
import { ExportMenu } from "@/components/export-menu";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/sales")({ component: SalesPage });

function SalesPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: sales = [] } = useQuery({
    queryKey: ["sales", user!.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select("*")
        .order("sale_date", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("sales.title")}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">{t("sales.subtitle")}</p>
        </div>
        <div className="flex gap-2 shrink-0">
        <ExportMenu
          spec={() => ({
            title: t("sales.exportTitle"),
            subtitle: t("sales.invoiceCount", { n: sales.length }),
            filename: t("sales.exportFile"),
            head: [t("common.date"), t("common.invoiceCol"), t("common.method"), t("common.status"), t("common.dueDate"), t("common.total"), t("common.paid"), t("sales.balanceAR")],
            body: sales.map((s) => [
              s.sale_date,
              s.invoice_no,
              s.payment_method,
              Number(s.total) - Number(s.paid) < 0.01 ? t("common.paidOff") : t("receivables.tabAR"),
              s.due_date ?? "",
              Number(s.total),
              Number(s.paid),
              Math.max(0, Number(s.total) - Number(s.paid)),
            ]),
            cols: [12, 16, 10, 10, 14, 14, 14, 14],
            totalRow: [
              "TOTAL",
              "", "", "", "",
              sales.reduce((sum, s) => sum + Number(s.total), 0),
              sales.reduce((sum, s) => sum + Number(s.paid), 0),
              sales.reduce((sum, s) => sum + Math.max(0, Number(s.total) - Number(s.paid)), 0),
            ],
          })}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> <span className="hidden sm:inline">{t("sales.new")}</span>
              <span className="sm:hidden">{t("common.new")}</span>
            </Button>
          </DialogTrigger>
          <NewSaleDialog
            userId={user!.id}
            onClose={() => {
              setOpen(false);
              qc.invalidateQueries({ queryKey: ["sales"] });
              qc.invalidateQueries({ queryKey: ["products"] });
              qc.invalidateQueries({ queryKey: ["dash-stats"] });
              qc.invalidateQueries({ queryKey: ["ar"] });
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
                  <TableHead>{t("common.date")}</TableHead>
                  <TableHead>{t("common.invoiceCol")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("common.payment")}</TableHead>
                  <TableHead>{t("common.status")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("common.dueDate")}</TableHead>
                  <TableHead className="text-right">{t("common.total")}</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                      {t("sales.noSales")}
                    </TableCell>
                  </TableRow>
                ) : (
                  sales.map((s) => {
                    const lunas = Number(s.total) - Number(s.paid) < 0.01;
                    return (
                      <TableRow key={s.id}>
                        <TableCell className="whitespace-nowrap text-xs sm:text-sm">
                          {s.sale_date}
                        </TableCell>
                        <TableCell className="font-medium">{s.invoice_no}</TableCell>
                        <TableCell className="hidden capitalize sm:table-cell">
                          {s.payment_method}
                        </TableCell>
                        <TableCell>
                          {lunas ? (
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                              {t("common.paidOff")}
                            </Badge>
                          ) : (
                            <Badge variant="destructive">{t("receivables.tabAR")}</Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden whitespace-nowrap md:table-cell">
                          {s.due_date ?? "—"}
                        </TableCell>
                        <TableCell className="text-right font-semibold whitespace-nowrap">
                          {idr(s.total)}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={async () => {
                              if (!confirm(t("sales.deleteConfirm", { no: s.invoice_no }))) return;
                              const { error } = await supabase
                                .from("sales")
                                .delete()
                                .eq("id", s.id);
                              if (error) toast.error(error.message);
                              else {
                                toast.success(t("common.deleted"));
                                qc.invalidateQueries({ queryKey: ["sales"] });
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
