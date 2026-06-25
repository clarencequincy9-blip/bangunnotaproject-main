import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DLDX5ALL.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { t as today, i as idr } from "./format-CsoEuMsu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { q as Trash2, t as Plus } from "../_libs/lucide-react.mjs";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function addDays(date, days) {
  const result = /* @__PURE__ */ new Date(`${date}T00:00:00`);
  result.setDate(result.getDate() + days);
  return result.toISOString().slice(0, 10);
}
function NewSaleDialog({ onClose, userId }) {
  const [products, setProducts] = reactExports.useState([]);
  const [customers, setCustomers] = reactExports.useState([]);
  const [customerId, setCustomerId] = reactExports.useState("");
  const [customerOutstanding, setCustomerOutstanding] = reactExports.useState(0);
  const [date, setDate] = reactExports.useState(today());
  const [invoice, setInvoice] = reactExports.useState(`INV-${Date.now().toString().slice(-6)}`);
  const [payment, setPayment] = reactExports.useState("cash");
  const [discount, setDiscount] = reactExports.useState(0);
  const [deliveryFee, setDeliveryFee] = reactExports.useState(0);
  const [dueDate, setDueDate] = reactExports.useState("");
  const [paid, setPaid] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [items, setItems] = reactExports.useState([{ product_id: "", qty: 1, price: 0, cost: 0 }]);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.from("products").select("id, name, unit, stock, sell_price, cost_price").order("name").then(({ data }) => setProducts(data ?? []));
    supabase.from("customers").select("id, name, credit_limit, payment_terms_days").order("name").then(({ data }) => setCustomers(data ?? []));
  }, []);
  reactExports.useEffect(() => {
    if (!customerId) {
      setCustomerOutstanding(0);
      return;
    }
    supabase.from("sales").select("total, paid").eq("customer_id", customerId).then(({ data }) => {
      setCustomerOutstanding(
        (data ?? []).reduce(
          (sum, sale) => sum + Math.max(0, Number(sale.total) - Number(sale.paid)),
          0
        )
      );
    });
  }, [customerId]);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const paidAmount = paid === "" ? total : Number(paid);
  const outstanding = Math.max(0, total - paidAmount);
  const customer = customers.find((entry) => entry.id === customerId);
  const remainingCredit = Math.max(0, Number(customer?.credit_limit ?? 0) - customerOutstanding);
  const overCreditLimit = payment === "credit" && (!customer || outstanding > remainingCredit + 0.01);
  function updateItem(idx, patch) {
    setItems((arr) => arr.map((it, i) => i === idx ? { ...it, ...patch } : it));
  }
  async function save(e) {
    e.preventDefault();
    const valid = items.filter((i) => i.product_id && i.qty > 0);
    if (valid.length === 0) return toast.error("Tambahkan minimal 1 item");
    for (const item of valid) {
      const product = products.find((entry) => entry.id === item.product_id);
      const totalQty = valid.filter((entry) => entry.product_id === item.product_id).reduce((sum, entry) => sum + entry.qty, 0);
      if (!product || totalQty > Number(product.stock))
        return toast.error(`Stok ${product?.name ?? "produk"} tidak mencukupi`);
    }
    if (payment === "credit" && !customerId)
      return toast.error("Pilih pelanggan untuk transaksi tempo");
    if (overCreditLimit) return toast.error("Transaksi melewati sisa batas kredit pelanggan");
    setSaving(true);
    const { data: sale, error } = await supabase.from("sales").insert({
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
      due_date: payment === "credit" ? dueDate || addDays(date, customer?.payment_terms_days ?? 30) : null
    }).select("id").single();
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
        subtotal: i.qty * i.price
      }))
    );
    setSaving(false);
    if (e2) return toast.error(e2.message);
    toast.success("Penjualan tersimpan");
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-3xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Transaksi Penjualan Baru" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "No. Invoice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: invoice, onChange: (e) => setInvoice(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tanggal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value), required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pelanggan / Kontraktor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: customerId,
            onValueChange: (value) => {
              setCustomerId(value);
              const selected = customers.find((entry) => entry.id === value);
              if (selected && payment === "credit")
                setDueDate(addDays(date, selected.payment_terms_days));
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih pelanggan (opsional untuk tunai)" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: customers.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: entry.id, children: entry.name }, entry.id)) })
            ]
          }
        ),
        customer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 rounded-md border bg-muted/30 p-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Limit",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: idr(customer.credit_limit) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Piutang",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: idr(customerOutstanding) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Sisa kredit",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: overCreditLimit ? "text-destructive" : "text-primary", children: idr(remainingCredit) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((it, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-12 items-end gap-2 rounded-md border bg-muted/30 p-2 sm:border-0 sm:bg-transparent sm:p-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-12 sm:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: it.product_id,
                  onValueChange: (v) => {
                    const p = products.find((x) => x.id === v);
                    updateItem(idx, {
                      product_id: v,
                      price: p?.sell_price ?? 0,
                      cost: p?.cost_price ?? 0
                    });
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih produk" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id, children: [
                      p.name,
                      " (",
                      p.unit,
                      ", stok ",
                      p.stock,
                      ")"
                    ] }, p.id)) })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-4 sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  step: "any",
                  placeholder: "Qty",
                  value: it.qty,
                  onChange: (e) => updateItem(idx, { qty: Number(e.target.value) })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-7 sm:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "Harga",
                  value: it.price,
                  onChange: (e) => updateItem(idx, { price: Number(e.target.value) })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "col-span-1",
                  onClick: () => setItems((a) => a.filter((_, i) => i !== idx)),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 text-right text-xs text-muted-foreground sm:hidden", children: [
                "Subtotal: ",
                idr(it.qty * it.price)
              ] })
            ]
          },
          idx
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1",
            onClick: () => setItems((a) => [...a, { product_id: "", qty: 1, price: 0, cost: 0 }]),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              " Tambah Item"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Diskon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: discount,
              onChange: (e) => setDiscount(Number(e.target.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ongkos Kirim" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              value: deliveryFee,
              onChange: (e) => setDeliveryFee(Number(e.target.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Metode Bayar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: payment,
              onValueChange: (value) => {
                setPayment(value);
                if (value === "credit" && customer)
                  setDueDate(addDays(date, customer.payment_terms_days));
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cash", children: "Tunai" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "transfer", children: "Transfer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "qris", children: "QRIS" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "credit", children: "Tempo" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jumlah Dibayar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              placeholder: `${total}`,
              value: paid,
              onChange: (e) => setPaid(e.target.value === "" ? "" : Number(e.target.value))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Kosongkan = lunas." })
        ] })
      ] }),
      payment === "credit" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jatuh Tempo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            required: true,
            value: dueDate,
            onChange: (e) => setDueDate(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Catatan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), rows: 2 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/40 p-4 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "Subtotal: ",
          idr(subtotal),
          " · Diskon: ",
          idr(discount),
          " · Ongkir: ",
          idr(deliveryFee)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold sm:text-2xl", children: [
          "Total: ",
          idr(total)
        ] }),
        outstanding > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-destructive", children: [
          "Piutang: ",
          idr(outstanding)
        ] }),
        overCreditLimit && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-semibold text-destructive", children: "Transaksi dikunci: melebihi sisa batas kredit." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex-col gap-2 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Batal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving || overCreditLimit, children: saving ? "Menyimpan…" : "Simpan Transaksi" })
      ] })
    ] })
  ] });
}
function NewPurchaseDialog({ onClose, userId }) {
  const [products, setProducts] = reactExports.useState([]);
  const [suppliers, setSuppliers] = reactExports.useState([]);
  const [supplierId, setSupplierId] = reactExports.useState("");
  const [date, setDate] = reactExports.useState(today());
  const [invoice, setInvoice] = reactExports.useState(`PO-${Date.now().toString().slice(-6)}`);
  const [notes, setNotes] = reactExports.useState("");
  const [payment, setPayment] = reactExports.useState("cash");
  const [dueDate, setDueDate] = reactExports.useState("");
  const [paid, setPaid] = reactExports.useState("");
  const [items, setItems] = reactExports.useState([
    { product_id: "", qty: 1, cost: 0 }
  ]);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.from("products").select("id, name, unit, stock, sell_price, cost_price").order("name").then(({ data }) => setProducts(data ?? []));
    supabase.from("suppliers").select("id, name").order("name").then(({ data }) => setSuppliers(data ?? []));
  }, []);
  const total = items.reduce((s, i) => s + i.qty * i.cost, 0);
  const paidAmount = paid === "" ? total : Number(paid);
  const outstanding = Math.max(0, total - paidAmount);
  function updateItem(idx, patch) {
    setItems((arr) => arr.map((it, i) => i === idx ? { ...it, ...patch } : it));
  }
  async function save(e) {
    e.preventDefault();
    const valid = items.filter((i) => i.product_id && i.qty > 0);
    if (valid.length === 0) return toast.error("Tambahkan minimal 1 item");
    if (!supplierId) return toast.error("Pilih supplier");
    if (payment === "credit" && !dueDate) return toast.error("Isi tanggal jatuh tempo");
    setSaving(true);
    const { data: po, error } = await supabase.from("purchases").insert({
      user_id: userId,
      invoice_no: invoice,
      purchase_date: date,
      total,
      notes,
      paid: paidAmount,
      payment_method: payment,
      supplier_id: supplierId,
      due_date: payment === "credit" ? dueDate : null
    }).select("id").single();
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
        subtotal: i.qty * i.cost
      }))
    );
    setSaving(false);
    if (e2) return toast.error(e2.message);
    toast.success("Pembelian tersimpan, stok diperbarui");
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-3xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Transaksi Pembelian Baru" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "No. Nota" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: invoice, onChange: (e) => setInvoice(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tanggal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value), required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Supplier / Distributor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: supplierId, onValueChange: setSupplierId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih supplier" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: suppliers.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: entry.id, children: entry.name }, entry.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Item" }),
        items.map((it, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-12 items-end gap-2 rounded-md border bg-muted/30 p-2 sm:border-0 sm:bg-transparent sm:p-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-12 sm:col-span-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: it.product_id,
                  onValueChange: (v) => {
                    const p = products.find((x) => x.id === v);
                    updateItem(idx, { product_id: v, cost: p?.cost_price ?? 0 });
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih produk" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id, children: [
                      p.name,
                      " (",
                      p.unit,
                      ")"
                    ] }, p.id)) })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-4 sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  step: "any",
                  placeholder: "Qty",
                  value: it.qty,
                  onChange: (e) => updateItem(idx, { qty: Number(e.target.value) })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-7 sm:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "HPP / Cost",
                  value: it.cost,
                  onChange: (e) => updateItem(idx, { cost: Number(e.target.value) })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "col-span-1",
                  onClick: () => setItems((a) => a.filter((_, i) => i !== idx)),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ]
          },
          idx
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1",
            onClick: () => setItems((a) => [...a, { product_id: "", qty: 1, cost: 0 }]),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              " Tambah Item"
            ]
          }
        )
      ] }),
      payment === "credit" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jatuh Tempo Sisa Hutang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            required: true,
            value: dueDate,
            onChange: (e) => setDueDate(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Metode Bayar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: payment, onValueChange: setPayment, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cash", children: "Tunai" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "transfer", children: "Transfer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "credit", children: "Tempo / Hutang" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jumlah Dibayar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              placeholder: `${total}`,
              value: paid,
              onChange: (e) => setPaid(e.target.value === "" ? "" : Number(e.target.value))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Kosongkan = lunas." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Catatan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), rows: 2 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/40 p-4 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold sm:text-2xl", children: [
          "Total: ",
          idr(total)
        ] }),
        outstanding > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-destructive", children: [
          "Hutang: ",
          idr(outstanding)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex-col gap-2 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Batal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? "Menyimpan…" : "Simpan Pembelian" })
      ] })
    ] })
  ] });
}
export {
  Badge as B,
  NewSaleDialog as N,
  NewPurchaseDialog as a
};
