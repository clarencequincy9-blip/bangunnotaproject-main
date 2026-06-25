import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { idr, today } from "@/lib/format";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  unit: string;
  stock: number;
  sell_price: number;
  cost_price: number;
};
type Customer = { id: string; name: string; credit_limit: number; payment_terms_days: number };
type Supplier = { id: string; name: string };

function addDays(date: string, days: number) {
  const result = new Date(`${date}T00:00:00`);
  result.setDate(result.getDate() + days);
  return result.toISOString().slice(0, 10);
}

export function NewSaleDialog({ onClose, userId }: { onClose: () => void; userId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [customerOutstanding, setCustomerOutstanding] = useState(0);
  const [date, setDate] = useState(today());
  const [invoice, setInvoice] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [payment, setPayment] = useState("cash");
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [paid, setPaid] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<
    { product_id: string; qty: number; price: number; cost: number }[]
  >([{ product_id: "", qty: 1, price: 0, cost: 0 }]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("id, name, unit, stock, sell_price, cost_price")
      .order("name")
      .then(({ data }) => setProducts((data ?? []) as Product[]));
    supabase
      .from("customers")
      .select("id, name, credit_limit, payment_terms_days")
      .order("name")
      .then(({ data }) => setCustomers((data ?? []) as Customer[]));
  }, []);

  useEffect(() => {
    if (!customerId) {
      setCustomerOutstanding(0);
      return;
    }
    supabase
      .from("sales")
      .select("total, paid")
      .eq("customer_id", customerId)
      .then(({ data }) => {
        setCustomerOutstanding(
          (data ?? []).reduce(
            (sum, sale) => sum + Math.max(0, Number(sale.total) - Number(sale.paid)),
            0,
          ),
        );
      });
  }, [customerId]);

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const paidAmount = paid === "" ? total : Number(paid);
  const outstanding = Math.max(0, total - paidAmount);
  const customer = customers.find((entry) => entry.id === customerId);
  const remainingCredit = Math.max(0, Number(customer?.credit_limit ?? 0) - customerOutstanding);
  const overCreditLimit =
    payment === "credit" && (!customer || outstanding > remainingCredit + 0.01);

  function updateItem(idx: number, patch: Partial<(typeof items)[0]>) {
    setItems((arr) => arr.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const valid = items.filter((i) => i.product_id && i.qty > 0);
    if (valid.length === 0) return toast.error("Tambahkan minimal 1 item");
    for (const item of valid) {
      const product = products.find((entry) => entry.id === item.product_id);
      const totalQty = valid
        .filter((entry) => entry.product_id === item.product_id)
        .reduce((sum, entry) => sum + entry.qty, 0);
      if (!product || totalQty > Number(product.stock))
        return toast.error(`Stok ${product?.name ?? "produk"} tidak mencukupi`);
    }
    if (payment === "credit" && !customerId)
      return toast.error("Pilih pelanggan untuk transaksi tempo");
    if (overCreditLimit) return toast.error("Transaksi melewati sisa batas kredit pelanggan");
    setSaving(true);
    const { data: sale, error } = await supabase
      .from("sales")
      .insert({
        user_id: userId,
        invoice_no: invoice,
        sale_date: date,
        subtotal,
        discount,
        delivery_fee: deliveryFee,
        total,
        paid: paidAmount,
        payment_method: payment,
        notes,
        customer_id: customerId || null,
        due_date:
          payment === "credit"
            ? dueDate || addDays(date, customer?.payment_terms_days ?? 30)
            : null,
      })
      .select("id")
      .single();
    if (error || !sale) {
      setSaving(false);
      return toast.error(error?.message ?? "Gagal");
    }
    const { error: e2 } = await supabase.from("sale_items").insert(
      valid.map((i) => ({
        sale_id: sale.id,
        product_id: i.product_id,
        qty: i.qty,
        price: i.price,
        cost: i.cost,
        subtotal: i.qty * i.price,
      })),
    );
    setSaving(false);
    if (e2) return toast.error(e2.message);
    toast.success("Penjualan tersimpan");
    onClose();
  }

  return (
    <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Transaksi Penjualan Baru</DialogTitle>
      </DialogHeader>
      <form onSubmit={save} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-2">
            <Label>No. Invoice</Label>
            <Input value={invoice} onChange={(e) => setInvoice(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Tanggal</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Pelanggan / Kontraktor</Label>
          <Select
            value={customerId}
            onValueChange={(value) => {
              setCustomerId(value);
              const selected = customers.find((entry) => entry.id === value);
              if (selected && payment === "credit")
                setDueDate(addDays(date, selected.payment_terms_days));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih pelanggan (opsional untuk tunai)" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((entry) => (
                <SelectItem key={entry.id} value={entry.id}>
                  {entry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {customer && (
            <div className="grid grid-cols-3 gap-2 rounded-md border bg-muted/30 p-3 text-xs">
              <span>
                Limit
                <br />
                <strong>{idr(customer.credit_limit)}</strong>
              </span>
              <span>
                Piutang
                <br />
                <strong>{idr(customerOutstanding)}</strong>
              </span>
              <span>
                Sisa kredit
                <br />
                <strong className={overCreditLimit ? "text-destructive" : "text-primary"}>
                  {idr(remainingCredit)}
                </strong>
              </span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label>Item</Label>
          <div className="space-y-2">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 items-end gap-2 rounded-md border bg-muted/30 p-2 sm:border-0 sm:bg-transparent sm:p-0"
              >
                <div className="col-span-12 sm:col-span-5">
                  <Select
                    value={it.product_id}
                    onValueChange={(v) => {
                      const p = products.find((x) => x.id === v);
                      updateItem(idx, {
                        product_id: v,
                        price: p?.sell_price ?? 0,
                        cost: p?.cost_price ?? 0,
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih produk" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} ({p.unit}, stok {p.stock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Input
                    type="number"
                    step="any"
                    placeholder="Qty"
                    value={it.qty}
                    onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}
                  />
                </div>
                <div className="col-span-7 sm:col-span-3">
                  <Input
                    type="number"
                    placeholder="Harga"
                    value={it.price}
                    onChange={(e) => updateItem(idx, { price: Number(e.target.value) })}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="col-span-1"
                  onClick={() => setItems((a) => a.filter((_, i) => i !== idx))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="col-span-12 text-right text-xs text-muted-foreground sm:hidden">
                  Subtotal: {idr(it.qty * it.price)}
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => setItems((a) => [...a, { product_id: "", qty: 1, price: 0, cost: 0 }])}
          >
            <Plus className="h-4 w-4" /> Tambah Item
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          <div className="space-y-2">
            <Label>Diskon</Label>
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Ongkos Kirim</Label>
            <Input
              type="number"
              min="0"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Metode Bayar</Label>
            <Select
              value={payment}
              onValueChange={(value) => {
                setPayment(value);
                if (value === "credit" && customer)
                  setDueDate(addDays(date, customer.payment_terms_days));
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Tunai</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="qris">QRIS</SelectItem>
                <SelectItem value="credit">Tempo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Jumlah Dibayar</Label>
            <Input
              type="number"
              placeholder={`${total}`}
              value={paid}
              onChange={(e) => setPaid(e.target.value === "" ? "" : Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Kosongkan = lunas.</p>
          </div>
        </div>
        {payment === "credit" && (
          <div className="space-y-2">
            <Label>Jatuh Tempo</Label>
            <Input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        )}
        <div className="space-y-2">
          <Label>Catatan</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
        </div>
        <div className="rounded-lg border bg-muted/40 p-4 text-right">
          <div className="text-sm text-muted-foreground">
            Subtotal: {idr(subtotal)} · Diskon: {idr(discount)} · Ongkir: {idr(deliveryFee)}
          </div>
          <div className="text-xl font-bold sm:text-2xl">Total: {idr(total)}</div>
          {outstanding > 0 && (
            <div className="text-sm font-semibold text-destructive">
              Piutang: {idr(outstanding)}
            </div>
          )}
          {overCreditLimit && (
            <div className="mt-1 text-sm font-semibold text-destructive">
              Transaksi dikunci: melebihi sisa batas kredit.
            </div>
          )}
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" disabled={saving || overCreditLimit}>
            {saving ? "Menyimpan…" : "Simpan Transaksi"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export function NewPurchaseDialog({ onClose, userId }: { onClose: () => void; userId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplierId, setSupplierId] = useState("");
  const [date, setDate] = useState(today());
  const [invoice, setInvoice] = useState(`PO-${Date.now().toString().slice(-6)}`);
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("cash");
  const [dueDate, setDueDate] = useState("");
  const [paid, setPaid] = useState<number | "">("");
  const [items, setItems] = useState<{ product_id: string; qty: number; cost: number }[]>([
    { product_id: "", qty: 1, cost: 0 },
  ]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("id, name, unit, stock, sell_price, cost_price")
      .order("name")
      .then(({ data }) => setProducts((data ?? []) as Product[]));
    supabase
      .from("suppliers")
      .select("id, name")
      .order("name")
      .then(({ data }) => setSuppliers((data ?? []) as Supplier[]));
  }, []);

  const total = items.reduce((s, i) => s + i.qty * i.cost, 0);
  const paidAmount = paid === "" ? total : Number(paid);
  const outstanding = Math.max(0, total - paidAmount);

  function updateItem(idx: number, patch: Partial<(typeof items)[0]>) {
    setItems((arr) => arr.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const valid = items.filter((i) => i.product_id && i.qty > 0);
    if (valid.length === 0) return toast.error("Tambahkan minimal 1 item");
    if (!supplierId) return toast.error("Pilih supplier");
    if (payment === "credit" && !dueDate) return toast.error("Isi tanggal jatuh tempo");
    setSaving(true);
    const { data: po, error } = await supabase
      .from("purchases")
      .insert({
        user_id: userId,
        invoice_no: invoice,
        purchase_date: date,
        total,
        notes,
        paid: paidAmount,
        payment_method: payment,
        supplier_id: supplierId,
        due_date: payment === "credit" ? dueDate : null,
      })
      .select("id")
      .single();
    if (error || !po) {
      setSaving(false);
      return toast.error(error?.message ?? "Gagal");
    }
    const { error: e2 } = await supabase.from("purchase_items").insert(
      valid.map((i) => ({
        purchase_id: po.id,
        product_id: i.product_id,
        qty: i.qty,
        cost: i.cost,
        subtotal: i.qty * i.cost,
      })),
    );
    setSaving(false);
    if (e2) return toast.error(e2.message);
    toast.success("Pembelian tersimpan, stok diperbarui");
    onClose();
  }

  return (
    <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Transaksi Pembelian Baru</DialogTitle>
      </DialogHeader>
      <form onSubmit={save} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-2">
            <Label>No. Nota</Label>
            <Input value={invoice} onChange={(e) => setInvoice(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Tanggal</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Supplier / Distributor</Label>
          <Select value={supplierId} onValueChange={setSupplierId}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((entry) => (
                <SelectItem key={entry.id} value={entry.id}>
                  {entry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Item</Label>
          {items.map((it, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 items-end gap-2 rounded-md border bg-muted/30 p-2 sm:border-0 sm:bg-transparent sm:p-0"
            >
              <div className="col-span-12 sm:col-span-6">
                <Select
                  value={it.product_id}
                  onValueChange={(v) => {
                    const p = products.find((x) => x.id === v);
                    updateItem(idx, { product_id: v, cost: p?.cost_price ?? 0 });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih produk" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} ({p.unit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <Input
                  type="number"
                  step="any"
                  placeholder="Qty"
                  value={it.qty}
                  onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}
                />
              </div>
              <div className="col-span-7 sm:col-span-3">
                <Input
                  type="number"
                  placeholder="HPP / Cost"
                  value={it.cost}
                  onChange={(e) => updateItem(idx, { cost: Number(e.target.value) })}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="col-span-1"
                onClick={() => setItems((a) => a.filter((_, i) => i !== idx))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => setItems((a) => [...a, { product_id: "", qty: 1, cost: 0 }])}
          >
            <Plus className="h-4 w-4" /> Tambah Item
          </Button>
        </div>
        {payment === "credit" && (
          <div className="space-y-2">
            <Label>Jatuh Tempo Sisa Hutang</Label>
            <Input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-2">
            <Label>Metode Bayar</Label>
            <Select value={payment} onValueChange={setPayment}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Tunai</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="credit">Tempo / Hutang</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Jumlah Dibayar</Label>
            <Input
              type="number"
              placeholder={`${total}`}
              value={paid}
              onChange={(e) => setPaid(e.target.value === "" ? "" : Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Kosongkan = lunas.</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Catatan</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
        </div>
        <div className="rounded-lg border bg-muted/40 p-4 text-right">
          <div className="text-xl font-bold sm:text-2xl">Total: {idr(total)}</div>
          {outstanding > 0 && (
            <div className="text-sm font-semibold text-destructive">Hutang: {idr(outstanding)}</div>
          )}
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Menyimpan…" : "Simpan Pembelian"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
