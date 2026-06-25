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
              title: "Penyesuaian Stok",
              subtitle: `Total ${rows.length} catatan`,
              filename: `Penyesuaian-Stok_${today()}`,
              head: ["Tanggal", "Produk", "Satuan", "Perubahan", "Alasan"],
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
                <Plus className="h-4 w-4" /> Penyesuaian Baru
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
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead className="text-right">Perubahan</TableHead>
                  <TableHead>Alasan</TableHead>
                  <TableHead className="w-16" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      Belum ada penyesuaian.
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
                            if (!confirm("Hapus penyesuaian ini? Stok akan dikembalikan."))
                              return;
                            const { error } = await supabase
                              .from("stock_adjustments")
                              .delete()
                              .eq("id", r.id);
                            if (error) toast.error(error.message);
                            else {
                              toast.success("Dihapus");
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
    if (!productId) return toast.error("Pilih produk");
    if (!qty || Number(qty) === 0) return toast.error("Isi perubahan qty (tidak boleh 0)");
    if (!reason.trim()) return toast.error("Isi alasan penyesuaian");
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
    toast.success("Penyesuaian tersimpan");
    onClose();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Penyesuaian Stok Baru</DialogTitle>
      </DialogHeader>
      <form onSubmit={save} className="space-y-4">
        <div className="space-y-2">
          <Label>Produk</Label>
          <Select value={productId} onValueChange={setProductId}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih produk" />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} (stok {p.stock} {p.unit})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Perubahan Qty (+/-)</Label>
            <Input
              type="number"
              step="any"
              value={qty}
              placeholder="-2 untuk kurangi, 5 untuk tambah"
              onChange={(e) => setQty(e.target.value === "" ? "" : Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Tanggal</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Alasan</Label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Pecah saat bongkar, hilang, opname fisik, dll."
            rows={2}
            required
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Menyimpan…" : "Simpan"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}