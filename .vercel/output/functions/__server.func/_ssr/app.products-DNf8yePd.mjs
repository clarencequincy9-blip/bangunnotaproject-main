import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth } from "./router-CswNqt6p.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DLDX5ALL.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { n as num, i as idr } from "./format-CsoEuMsu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { E as ExportMenu } from "./export-menu-BmXHofII.mjs";
import { P as Provider, R as Root3, T as Trigger, a as Portal, C as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import "../_libs/i18next.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { t as Plus, y as Search, p as TriangleAlert, z as Lock, G as PackagePlus, I as Pencil, q as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "./export-OXCswqgj.mjs";
import "../_libs/xlsx.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = Content2.displayName;
function ProductsPage() {
  const {
    user
  } = useAuth();
  const {
    t
  } = useTranslation();
  const qc = useQueryClient();
  const [search, setSearch] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  const [edit, setEdit] = reactExports.useState(null);
  const [openingFor, setOpeningFor] = reactExports.useState(null);
  const {
    data: products = [],
    isLoading
  } = useQuery({
    queryKey: ["products", user.id],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("products").select("*, category:categories(name)").order("name");
      if (error) throw error;
      return data;
    }
  });
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || (p.sku ?? "").toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight sm:text-3xl", children: t("products.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground sm:text-base", children: t("products.subtitle") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExportMenu, { spec: () => ({
          title: t("products.exportTitle"),
          subtitle: t("dashboard.summaryProducts", {
            n: products.length
          }),
          filename: t("products.exportFile"),
          head: [t("products.name"), t("products.sku"), t("products.category"), t("products.unit"), t("products.stock"), t("products.cost"), t("products.sell")],
          body: products.map((p) => [p.name, p.sku ?? "", p.category?.name ?? "", p.unit, Number(p.stock), Number(p.cost_price), Number(p.sell_price)]),
          cols: [28, 12, 16, 8, 10, 14, 14]
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (o) => {
          setOpen(o);
          if (!o) setEdit(null);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: t("products.add") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: t("common.new") })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDialog, { edit, onClose: () => {
            setOpen(false);
            setEdit(null);
            qc.invalidateQueries({
              queryKey: ["products"]
            });
          }, userId: user.id })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!openingFor, onOpenChange: (o) => !o && setOpeningFor(null), children: openingFor && /* @__PURE__ */ jsxRuntimeExports.jsx(OpeningStockDialog, { product: openingFor, onClose: () => {
        setOpeningFor(null);
        qc.invalidateQueries({
          queryKey: ["products"]
        });
      } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "pl-9", placeholder: t("products.search"), value: search, onChange: (e) => setSearch(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("products.name") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("products.sku") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("products.category") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("products.unit") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("products.rack") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("products.stock") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("products.cost") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("products.sell") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-32" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 9, className: "py-8 text-center text-muted-foreground", children: t("common.loading") }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 9, className: "py-8 text-center text-muted-foreground", children: t("products.noProducts") }) }) : filtered.map((p) => {
          const low = Number(p.stock) <= Number(p.min_stock) && Number(p.min_stock) > 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: p.sku ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: p.category?.name ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: p.unit }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: p.rack_location ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: low ? "inline-flex items-center gap-1 rounded bg-destructive/10 px-2 py-0.5 text-destructive" : "", children: [
              low && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
              " ",
              num(p.stock)
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: idr(p.cost_price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold", children: idr(p.sell_price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", disabled: !!p.opening_locked, onClick: () => setOpeningFor(p), children: p.opening_locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PackagePlus, { className: "h-4 w-4 text-primary" }) }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: p.opening_locked ? t("products.openingLocked") : t("products.openingTooltip") })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => {
                setEdit(p);
                setOpen(true);
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: async () => {
                if (!confirm(t("products.deleteConfirm", {
                  name: p.name
                }))) return;
                const {
                  error
                } = await supabase.from("products").delete().eq("id", p.id);
                if (error) toast.error(error.message);
                else {
                  toast.success(t("products.deleted"));
                  qc.invalidateQueries({
                    queryKey: ["products"]
                  });
                }
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] }) })
          ] }, p.id);
        }) })
      ] }) })
    ] }) })
  ] });
}
function ProductDialog({
  edit,
  onClose,
  userId
}) {
  const {
    t
  } = useTranslation();
  const [form, setForm] = reactExports.useState({
    name: edit?.name ?? "",
    sku: edit?.sku ?? "",
    unit: edit?.unit ?? "pcs",
    stock: Number(edit?.stock ?? 0),
    min_stock: Number(edit?.min_stock ?? 0),
    cost_price: Number(edit?.cost_price ?? 0),
    sell_price: Number(edit?.sell_price ?? 0),
    rack_location: edit?.rack_location ?? "",
    category: edit?.category?.name ?? ""
  });
  const [saving, setSaving] = reactExports.useState(false);
  async function save(e) {
    e.preventDefault();
    setSaving(true);
    let categoryId = edit?.category_id ?? null;
    if (form.category.trim()) {
      const categoryName = form.category.trim();
      const {
        data: existing
      } = await supabase.from("categories").select("id").eq("name", categoryName).maybeSingle();
      if (existing) categoryId = existing.id;
      else {
        const {
          data: created,
          error: categoryError
        } = await supabase.from("categories").insert({
          name: categoryName,
          user_id: userId
        }).select("id").single();
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
      user_id: userId
    };
    const res = edit ? await supabase.from("products").update(payload).eq("id", edit.id) : await supabase.from("products").insert(payload);
    setSaving(false);
    if (res.error) return toast.error(res.error.message);
    toast.success(edit ? t("products.updated") : t("products.created"));
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: edit ? t("products.edit") : t("products.add") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.name") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), placeholder: "Semen Tiga Roda 50kg" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.sku") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.sku, onChange: (e) => setForm({
            ...form,
            sku: e.target.value
          }), placeholder: "SMN-001" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.unit") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.unit, onChange: (e) => setForm({
            ...form,
            unit: e.target.value
          }), placeholder: "sak / pcs / m / kg" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.categoryMaterial") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.category, onChange: (e) => setForm({
          ...form,
          category: e.target.value
        }), placeholder: "Semen & Mortar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.rack") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.rack_location, onChange: (e) => setForm({
          ...form,
          rack_location: e.target.value
        }), placeholder: t("products.rackHint") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.currentStock") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "any", value: form.stock, onChange: (e) => setForm({
            ...form,
            stock: Number(e.target.value)
          }), disabled: !!edit }),
          edit ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("products.currentStockHintEdit") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("products.currentStockHintNew") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.minStock") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "any", value: form.min_stock, onChange: (e) => setForm({
            ...form,
            min_stock: Number(e.target.value)
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.cost") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.cost_price, onChange: (e) => setForm({
            ...form,
            cost_price: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.sell") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", required: true, value: form.sell_price, onChange: (e) => setForm({
            ...form,
            sell_price: Number(e.target.value)
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: t("common.cancel") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? t("common.saving") : t("common.save") })
      ] })
    ] })
  ] });
}
function OpeningStockDialog({
  product,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const [qty, setQty] = reactExports.useState(Number(product.stock ?? 0));
  const [cost, setCost] = reactExports.useState(Number(product.cost_price ?? 0));
  const [saving, setSaving] = reactExports.useState(false);
  async function save(e) {
    e.preventDefault();
    if (qty < 0 || cost < 0) return toast.error(t("products.openingNonNegative"));
    setSaving(true);
    const {
      error
    } = await supabase.rpc("set_opening_stock", {
      _product_id: product.id,
      _qty: qty,
      _cost: cost
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(t("products.openingSaved"));
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
      t("products.openingStockTitle"),
      " — ",
      product.name
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border bg-muted/40 p-3 text-xs text-muted-foreground", children: t("products.openingStockHint") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.openingStock") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "any", min: "0", value: qty, onChange: (e) => setQty(Number(e.target.value)), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("products.cost") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", value: cost, onChange: (e) => setCost(Number(e.target.value)), required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border p-3 text-sm", children: [
        t("dashboard.inventoryValue"),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: idr(qty * cost) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: t("common.cancel") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? t("common.saving") : t("common.save") })
      ] })
    ] })
  ] });
}
export {
  ProductsPage as component
};
