import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, AlertTriangle, PackagePlus, Lock } from "lucide-react";
import { idr, num } from "@/lib/format";
import { toast } from "sonner";
import { ExportMenu } from "@/components/export-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/products")({ component: ProductsPage });

type Product = {
  id: string;
  name: string;
  sku: string | null;
  unit: string;
  stock: number;
  min_stock: number;
  cost_price: number;
  sell_price: number;
  rack_location: string | null;
  category_id: string | null;
  category: { name: string } | null;
  opening_locked?: boolean;
  opening_stock?: number;
};

function ProductsPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Product | null>(null);
  const [openingFor, setOpeningFor] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", user!.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(name)")
        .order("name");
      if (error) throw error;
      return data as Product[];
    },
  });

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("products.title")}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {t("products.subtitle")}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
        <ExportMenu
          spec={() => ({
            title: t("products.exportTitle"),
            subtitle: t("dashboard.summaryProducts", { n: products.length }),
            filename: t("products.exportFile"),
            head: [t("products.name"), t("products.sku"), t("products.category"), t("products.unit"), t("products.stock"), t("products.cost"), t("products.sell")],
            body: products.map((p) => [
              p.name,
              p.sku ?? "",
              p.category?.name ?? "",
              p.unit,
              Number(p.stock),
              Number(p.cost_price),
              Number(p.sell_price),
            ]),
            cols: [28, 12, 16, 8, 10, 14, 14],
          })}
        />
        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o);
            if (!o) setEdit(null);
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">{t("products.add")}</span>
              <span className="sm:hidden">{t("common.new")}</span>
            </Button>
          </DialogTrigger>
          <ProductDialog
            edit={edit}
            onClose={() => {
              setOpen(false);
              setEdit(null);
              qc.invalidateQueries({ queryKey: ["products"] });
            }}
            userId={user!.id}
          />
        </Dialog>
        </div>
        <Dialog open={!!openingFor} onOpenChange={(o) => !o && setOpeningFor(null)}>
          {openingFor && (
            <OpeningStockDialog
              product={openingFor}
              onClose={() => {
                setOpeningFor(null);
                qc.invalidateQueries({ queryKey: ["products"] });
              }}
            />
          )}
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder={t("products.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("products.name")}</TableHead>
                  <TableHead>{t("products.sku")}</TableHead>
                  <TableHead>{t("products.category")}</TableHead>
                  <TableHead>{t("products.unit")}</TableHead>
                  <TableHead>{t("products.rack")}</TableHead>
                  <TableHead className="text-right">{t("products.stock")}</TableHead>
                  <TableHead className="text-right">{t("products.cost")}</TableHead>
                  <TableHead className="text-right">{t("products.sell")}</TableHead>
                  <TableHead className="w-32"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                      {t("common.loading")}
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                      {t("products.noProducts")}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((p) => {
                    const low = Number(p.stock) <= Number(p.min_stock) && Number(p.min_stock) > 0;
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="text-muted-foreground">{p.sku ?? "—"}</TableCell>
                        <TableCell>{p.category?.name ?? "—"}</TableCell>
                        <TableCell>{p.unit}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.rack_location ?? "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              low
                                ? "inline-flex items-center gap-1 rounded bg-destructive/10 px-2 py-0.5 text-destructive"
                                : ""
                            }
                          >
                            {low && <AlertTriangle className="h-3 w-3" />} {num(p.stock)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{idr(p.cost_price)}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {idr(p.sell_price)}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      disabled={!!p.opening_locked}
                                      onClick={() => setOpeningFor(p)}
                                    >
                                      {p.opening_locked ? (
                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                      ) : (
                                        <PackagePlus className="h-4 w-4 text-primary" />
                                      )}
                                    </Button>
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {p.opening_locked
                                    ? t("products.openingLocked")
                                    : t("products.openingTooltip")}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                setEdit(p);
                                setOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={async () => {
                                if (!confirm(t("products.deleteConfirm", { name: p.name }))) return;
                                const { error } = await supabase
                                  .from("products")
                                  .delete()
                                  .eq("id", p.id);
                                if (error) toast.error(error.message);
                                else {
                                  toast.success(t("products.deleted"));
                                  qc.invalidateQueries({ queryKey: ["products"] });
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
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

function ProductDialog({
  edit,
  onClose,
  userId,
}: {
  edit: Product | null;
  onClose: () => void;
  userId: string;
}) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: edit?.name ?? "",
    sku: edit?.sku ?? "",
    unit: edit?.unit ?? "pcs",
    stock: Number(edit?.stock ?? 0),
    min_stock: Number(edit?.min_stock ?? 0),
    cost_price: Number(edit?.cost_price ?? 0),
    sell_price: Number(edit?.sell_price ?? 0),
    rack_location: edit?.rack_location ?? "",
    category: edit?.category?.name ?? "",
  });
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    let categoryId = edit?.category_id ?? null;
    if (form.category.trim()) {
      const categoryName = form.category.trim();
      const { data: existing } = await supabase
        .from("categories")
        .select("id")
        .eq("name", categoryName)
        .maybeSingle();
      if (existing) categoryId = existing.id;
      else {
        const { data: created, error: categoryError } = await supabase
          .from("categories")
          .insert({ name: categoryName, user_id: userId })
          .select("id")
          .single();
        if (categoryError || !created) {
          setSaving(false);
          return toast.error(categoryError?.message ?? t("products.categoryCreateFail"));
        }
        categoryId = created.id;
      }
    }
    const payload = {
      name: form.name,
      sku: form.sku,
      unit: form.unit,
      stock: form.stock,
      min_stock: form.min_stock,
      cost_price: form.cost_price,
      sell_price: form.sell_price,
      rack_location: form.rack_location,
      category_id: categoryId,
      user_id: userId,
    };
    const res = edit
      ? await supabase.from("products").update(payload).eq("id", edit.id)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (res.error) return toast.error(res.error.message);
    toast.success(edit ? t("products.updated") : t("products.created"));
    onClose();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{edit ? t("products.edit") : t("products.add")}</DialogTitle>
      </DialogHeader>
      <form onSubmit={save} className="space-y-4">
        <div className="space-y-2">
          <Label>{t("products.name")}</Label>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Semen Tiga Roda 50kg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("products.sku")}</Label>
            <Input
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
              placeholder="SMN-001"
            />
          </div>
          <div className="space-y-2">
            <Label>{t("products.unit")}</Label>
            <Input
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              placeholder="sak / pcs / m / kg"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>{t("products.categoryMaterial")}</Label>
          <Input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Semen & Mortar"
          />
        </div>
        <div className="space-y-2">
          <Label>{t("products.rack")}</Label>
          <Input
            value={form.rack_location}
            onChange={(e) => setForm({ ...form, rack_location: e.target.value })}
            placeholder={t("products.rackHint")}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("products.currentStock")}</Label>
            <Input
              type="number"
              step="any"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              disabled={!!edit}
            />
            {edit ? (
              <p className="text-xs text-muted-foreground">
                {t("products.currentStockHintEdit")}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                {t("products.currentStockHintNew")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t("products.minStock")}</Label>
            <Input
              type="number"
              step="any"
              value={form.min_stock}
              onChange={(e) => setForm({ ...form, min_stock: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("products.cost")}</Label>
            <Input
              type="number"
              value={form.cost_price}
              onChange={(e) => setForm({ ...form, cost_price: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("products.sell")}</Label>
            <Input
              type="number"
              required
              value={form.sell_price}
              onChange={(e) => setForm({ ...form, sell_price: Number(e.target.value) })}
            />
          </div>
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

function OpeningStockDialog({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [qty, setQty] = useState<number>(Number(product.stock ?? 0));
  const [cost, setCost] = useState<number>(Number(product.cost_price ?? 0));
  const [saving, setSaving] = useState(false);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (qty < 0 || cost < 0) return toast.error(t("products.openingNonNegative"));
    setSaving(true);
    const { error } = await supabase.rpc("set_opening_stock", {
      _product_id: product.id,
      _qty: qty,
      _cost: cost,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(t("products.openingSaved"));
    onClose();
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t("products.openingStockTitle")} — {product.name}</DialogTitle>
      </DialogHeader>
      <form onSubmit={save} className="space-y-4">
        <p className="rounded-md border bg-muted/40 p-3 text-xs text-muted-foreground">
          {t("products.openingStockHint")}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("products.openingStock")}</Label>
            <Input
              type="number"
              step="any"
              min="0"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>{t("products.cost")}</Label>
            <Input
              type="number"
              min="0"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              required
            />
          </div>
        </div>
        <div className="rounded-md border p-3 text-sm">
          {t("dashboard.inventoryValue")}: <strong>{idr(qty * cost)}</strong>
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
