import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { idr, today } from "@/lib/format";
import { toast } from "sonner";
import { ExportMenu } from "@/components/export-menu";
import { useTranslation } from "react-i18next";

const CATEGORIES = [
  "Solar & Armada Truk",
  "Upah Kuli Muat Harian",
  "Komisi Makelar & Mandor",
  "Gaji Karyawan",
  "Listrik & Air Gudang",
  "Sewa",
  "Transportasi",
  "Konsumsi",
  "Perawatan",
  "Lainnya",
];

export const Route = createFileRoute("/app/expenses")({ component: ExpensesPage });

function ExpensesPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    category: "Lainnya",
    amount: 0,
    expense_date: today(),
    notes: "",
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user!.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("expense_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("expenses").insert({ ...form, user_id: user!.id });
    if (error) return toast.error(error.message);
    toast.success(t("expenses.saved"));
    setOpen(false);
    setForm({ category: "Lainnya", amount: 0, expense_date: today(), notes: "" });
    qc.invalidateQueries({ queryKey: ["expenses"] });
    qc.invalidateQueries({ queryKey: ["dash-stats"] });
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("expenses.title")}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">{t("expenses.subtitle")}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">{t("expenses.new")}</span>
              <span className="sm:hidden">{t("expenses.addShort")}</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("expenses.newDialog")}</DialogTitle>
            </DialogHeader>
            <form onSubmit={save} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("common.category")}</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm({ ...form, category: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t("common.date")}</Label>
                  <Input
                    type="date"
                    required
                    value={form.expense_date}
                    onChange={(e) => setForm({ ...form, expense_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("common.amount")}</Label>
                <Input
                  type="number"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("common.notes")}</Label>
                <Textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                />
              </div>
              <DialogFooter>
                <Button type="submit">{t("common.save")}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardContent className="p-0 sm:p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("common.date")}</TableHead>
                  <TableHead>{t("common.category")}</TableHead>
                  <TableHead>{t("common.notes")}</TableHead>
                  <TableHead className="text-right">{t("common.amount")}</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      {t("expenses.noExpenses")}
                    </TableCell>
                  </TableRow>
                ) : (
                  expenses.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.expense_date}</TableCell>
                      <TableCell>{e.category}</TableCell>
                      <TableCell className="text-muted-foreground">{e.notes ?? "—"}</TableCell>
                      <TableCell className="text-right font-semibold">{idr(e.amount)}</TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={async () => {
                            if (!confirm(t("common.confirmDelete"))) return;
                            const { error } = await supabase
                              .from("expenses")
                              .delete()
                              .eq("id", e.id);
                            if (error) toast.error(error.message);
                            else {
                              toast.success(t("common.deleted"));
                              qc.invalidateQueries({ queryKey: ["expenses"] });
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
