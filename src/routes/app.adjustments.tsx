import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
import { today, num } from "@/lib/format";
import { toast } from "sonner";
import { ExportMenu } from "@/components/export-menu";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/adjustments")({ component: AdjustmentsPage });

type Adj = {
  id: string;
  product_id: string;
  qty_delta: number;
  reason: string;
  adjusted_at: string;
  product?: { name: string; unit: string } | null;
};

function AdjustmentsPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: rows = [] } = useQuery({
    queryKey: ["adjustments", user!.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stock_adjustments")
        .select("*, product:products(name, unit)")
        .order("adjusted_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Adj[];
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("adjustments.title")}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">{t("adjustments.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <ExportMenu
            spec={() => ({
              title: t("adjustments.title"),
              subtitle: t("adjustments.exportRecords", { n: rows.length }),
              filename: `Penyesuaian-Stok_${today()}`,
              head: [t("common.date"), t("adjustments.product"), t("products.unit"), t("adjustments.change"), t("adjustments.reason")],
              body: rows.map((r) => [
                r.adjusted_at,
                r.product?.name ?? "—",
                r.product?.unit ?? "—",
                Number(r.qty_delta),
                r.reason,
              ]),
              cols: [12, 28, 10, 14, 40],
            })}
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> {t("adjustments.new")}
              </Button>
            </DialogTrigger>
            <NewAdjustmentDialog
              onClose={() => {
                setOpen(false);
                qc.invalidateQueries({ queryKey: ["adjustments"] });
                qc.invalidateQueries({ queryKey: ["products"] });
                qc.invalidateQueries({ queryKey: ["dash-stats"] });
              }}
              userId={user!.id}
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
                  <TableHead>{t("adjustments.product")}</TableHead>
                  <TableHead className="text-right">{t("adjustments.change")}</TableHead>
                  <TableHead>{t("adjustments.reason")}</TableHead>
                  <TableHead className="w-16" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      {t("adjustments.noAdjustments")}
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap">{r.adjusted_at}</TableCell>
                      <TableCell>
                        {r.product?.name ?? "—"}{" "}
                        <span className="text-xs text-muted-foreground">({r.product?.unit})</span>
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${Number(r.qty_delta) < 0 ? "text-destructive" : "text-emerald-600"}`}
                      >
                        {Number(r.qty_delta) > 0 ? "+" : ""}
                        {num(r.qty_delta)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{r.reason}</TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={async () => {
                            if (!confirm(t("adjustments.deleteConfirm")))
                              return;
                            const { error } = await supabase
                              .from("stock_adjustments")
                              .delete()
                              .eq("id", r.id);
                            if (error) toast.error(error.message);
                            else {
                              toast.success(t("common.deleted"));
                              qc.invalidateQueries({ queryKey: ["adjustments"] });
                              qc.invalidateQueries({ queryKey: ["products"] });
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

function NewAdjustmentDialog({ onClose, userId }: { onClose: () => void; userId: string }) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<{ id: string; name: string; unit: string; stock: number }[]>(
    [],
  );
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState<number | "">("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState(today());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("id, name, unit, stock")
      .order("name")
      .then(({ data }) => setProducts((data ?? []) as any));
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!productId) return toast.error(t("adjustments.errProduct"));
    if (!qty || Number(qty) === 0) return toast.error(t("adjustments.errQty"));
    if (!reason.trim()) return toast.error(t("adjustments.errReason"));
    setSaving(true);
    const { error } = await supabase.from("stock_adjustments").insert({
      user_id: userId,
      product_id: productId,
      qty_delta: Number(qty),
      reason: reason.trim(),
      adjusted_at: date,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(t("adjustments.saved"));
    onClose();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t("adjustments.newTitle")}</DialogTitle>
      </DialogHeader>
      <form onSubmit={save} className="space-y-4">
        <div className="space-y-2">
          <Label>{t("adjustments.product")}</Label>
          <Select value={productId} onValueChange={setProductId}>
            <SelectTrigger>
              <SelectValue placeholder={t("adjustments.selectProduct")} />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} ({t("adjustments.stockOption", { n: p.stock, unit: p.unit })})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("adjustments.qtyDelta")}</Label>
            <Input
              type="number"
              step="any"
              value={qty}
              placeholder={t("adjustments.qtyHint")}
              onChange={(e) => setQty(e.target.value === "" ? "" : Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>{t("common.date")}</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>{t("adjustments.reason")}</Label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t("adjustments.reasonHint")}
            rows={2}
            required
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? t("common.saving") : t("common.save")}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}