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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
    if (valid.length === 0) return toast.error(t("tx.minItem"));
    for (const item of valid) {
      const product = products.find((entry) => entry.id === item.product_id);
      const totalQty = valid
        .filter((entry) => entry.product_id === item.product_id)
        .reduce((sum, entry) => sum + entry.qty, 0);
      if (!product || totalQty > Number(product.stock))
        return toast.error(t("tx.insufficientStock", { name: product?.name ?? t("tx.productFallback") }));
    }
    if (payment === "credit" && !customerId)
      return toast.error(t("tx.selectCustomerCredit"));
    if (overCreditLimit) return toast.error(t("tx.overCredit"));
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
      return toast.error(error?.message ?? t("common.failed"));
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
    toast.success(t("tx.saleSaved"));
    onClose();
  }

  return (
    <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{t("tx.saleTitle")}</DialogTitle>
      </DialogHeader>
      <form onSubmit={save} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-2">
            <Label>{t("sales.invoice")}</Label>
            <Input value={invoice} onChange={(e) => setInvoice(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>{t("common.date")}</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label>{t("tx.customer")}</Label>
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
              <SelectValue placeholder={t("tx.selectCustomer")} />
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
                {t("tx.limit")}
                <br />
                <strong>{idr(customer.credit_limit)}</strong>
              </span>
              <span>
                {t("contacts.receivable")}
                <br />
                <strong>{idr(customerOutstanding)}</strong>
              </span>
              <span>
                {t("tx.remainingCredit")}
                <br />
                <strong className={overCreditLimit ? "text-destructive" : "text-primary"}>
                  {idr(remainingCredit)}
                </strong>
              </span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label>{t("common.item")}</Label>
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
                      <SelectValue placeholder={t("tx.selectProduct")} />
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
                    placeholder={t("common.qty")}
                    value={it.qty}
                    onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}
                  />
                </div>
                <div className="col-span-7 sm:col-span-3">
                  <Input
                    type="number"
                    placeholder={t("common.price")}
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
                  {t("common.subtotal")}: {idr(it.qty * it.price)}
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
            <Plus className="h-4 w-4" /> {t("tx.addItem")}
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          <div className="space-y-2">
            <Label>{t("common.discount")}</Label>
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("common.deliveryFee")}</Label>
            <Input
              type="number"
              min="0"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("sales.payMethod")}</Label>
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
                <SelectItem value="cash">{t("tx.cash")}</SelectItem>
                <SelectItem value="transfer">{t("tx.transfer")}</SelectItem>
                <SelectItem value="qris">QRIS</SelectItem>
                <SelectItem value="credit">{t("tx.credit")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("tx.amountPaid")}</Label>
            <Input
              type="number"
              placeholder={`${total}`}
              value={paid}
              onChange={(e) => setPaid(e.target.value === "" ? "" : Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">{t("tx.emptyPaidHint")}</p>
          </div>
        </div>
        {payment === "credit" && (
          <div className="space-y-2">
            <Label>{t("common.dueDate")}</Label>
            <Input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        )}
        <div className="space-y-2">
          <Label>{t("common.notes")}</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
        </div>
        <div className="rounded-lg border bg-muted/40 p-4 text-right">
          <div className="text-sm text-muted-foreground">
            {t("tx.summary", { sub: idr(subtotal), disc: idr(discount), del: idr(deliveryFee) })}
          </div>
          <div className="text-xl font-bold sm:text-2xl">{t("common.total")}: {idr(total)}</div>
          {outstanding > 0 && (
            <div className="text-sm font-semibold text-destructive">
              {t("contacts.receivable")}: {idr(outstanding)}
            </div>
          )}
          {overCreditLimit && (
            <div className="mt-1 text-sm font-semibold text-destructive">
              {t("tx.lockedOverCredit")}
            </div>
          )}
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" disabled={saving || overCreditLimit}>
            {saving ? t("common.saving") : t("tx.saveTransaction")}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export function NewPurchaseDialog({ onClose, userId }: { onClose: () => void; userId: string }) {
  const { t } = useTranslation();
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
    if (valid.length === 0) return toast.error(t("tx.minItem"));
    if (!supplierId) return toast.error(t("tx.errSupplier"));
    if (payment === "credit" && !dueDate) return toast.error(t("tx.errDueDate"));
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
      return toast.error(error?.message ?? t("common.failed"));
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
    toast.success(t("tx.purchaseSaved"));
    onClose();
  }

  return (
    <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{t("tx.purchaseTitle")}</DialogTitle>
      </DialogHeader>
      <form onSubmit={save} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-2">
            <Label>{t("purchases.invoice")}</Label>
            <Input value={invoice} onChange={(e) => setInvoice(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>{t("common.date")}</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label>{t("tx.supplier")}</Label>
          <Select value={supplierId} onValueChange={setSupplierId}>
            <SelectTrigger>
              <SelectValue placeholder={t("tx.selectSupplier")} />
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
          <Label>{t("common.item")}</Label>
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
                    <SelectValue placeholder={t("tx.selectProduct")} />
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
                  placeholder={t("common.qty")}
                  value={it.qty}
                  onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}
                />
              </div>
              <div className="col-span-7 sm:col-span-3">
                <Input
                  type="number"
                  placeholder={t("tx.costPlaceholder")}
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
            <Plus className="h-4 w-4" /> {t("tx.addItem")}
          </Button>
        </div>
        {payment === "credit" && (
          <div className="space-y-2">
            <Label>{t("tx.dueDateDebt")}</Label>
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
            <Label>{t("sales.payMethod")}</Label>
            <Select value={payment} onValueChange={setPayment}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">{t("tx.cash")}</SelectItem>
                <SelectItem value="transfer">{t("tx.transfer")}</SelectItem>
                <SelectItem value="credit">{t("tx.creditDebt")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("tx.amountPaid")}</Label>
            <Input
              type="number"
              placeholder={`${total}`}
              value={paid}
              onChange={(e) => setPaid(e.target.value === "" ? "" : Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">{t("tx.emptyPaidHint")}</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label>{t("common.notes")}</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
        </div>
        <div className="rounded-lg border bg-muted/40 p-4 text-right">
          <div className="text-xl font-bold sm:text-2xl">{t("common.total")}: {idr(total)}</div>
          {outstanding > 0 && (
            <div className="text-sm font-semibold text-destructive">{t("tx.debt")}: {idr(outstanding)}</div>
          )}
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? t("common.saving") : t("tx.savePurchase")}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
