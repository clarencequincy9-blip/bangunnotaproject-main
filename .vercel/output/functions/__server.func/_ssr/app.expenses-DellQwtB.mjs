import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth } from "./router-CswNqt6p.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DLDX5ALL.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { t as today, i as idr } from "./format-CsoEuMsu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { t as Plus, q as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const CATEGORIES = ["Solar & Armada Truk", "Upah Kuli Muat Harian", "Komisi Makelar & Mandor", "Gaji Karyawan", "Listrik & Air Gudang", "Sewa", "Transportasi", "Konsumsi", "Perawatan", "Lainnya"];
function ExpensesPage() {
  const {
    user
  } = useAuth();
  const {
    t
  } = useTranslation();
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    category: "Lainnya",
    amount: 0,
    expense_date: today(),
    notes: ""
  });
  const {
    data: expenses = []
  } = useQuery({
    queryKey: ["expenses", user.id],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("expenses").select("*").order("expense_date", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  async function save(e) {
    e.preventDefault();
    const {
      error
    } = await supabase.from("expenses").insert({
      ...form,
      user_id: user.id
    });
    if (error) return toast.error(error.message);
    toast.success(t("expenses.saved"));
    setOpen(false);
    setForm({
      category: "Lainnya",
      amount: 0,
      expense_date: today(),
      notes: ""
    });
    qc.invalidateQueries({
      queryKey: ["expenses"]
    });
    qc.invalidateQueries({
      queryKey: ["dash-stats"]
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight sm:text-3xl", children: t("expenses.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground sm:text-base", children: t("expenses.subtitle") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: t("expenses.new") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: t("expenses.addShort") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("expenses.newDialog") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("common.category") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.category, onValueChange: (v) => setForm({
                  ...form,
                  category: v
                }), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("common.date") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", required: true, value: form.expense_date, onChange: (e) => setForm({
                  ...form,
                  expense_date: e.target.value
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("common.amount") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", required: true, value: form.amount, onChange: (e) => setForm({
                ...form,
                amount: Number(e.target.value)
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("common.notes") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.notes, onChange: (e) => setForm({
                ...form,
                notes: e.target.value
              }), rows: 2 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: t("common.save") }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 sm:p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("common.date") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("common.category") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("common.notes") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("common.amount") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-16" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: expenses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "py-8 text-center text-muted-foreground", children: t("expenses.noExpenses") }) }) : expenses.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: e.expense_date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: e.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: e.notes ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold", children: idr(e.amount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: async () => {
          if (!confirm(t("common.confirmDelete"))) return;
          const {
            error
          } = await supabase.from("expenses").delete().eq("id", e.id);
          if (error) toast.error(error.message);
          else {
            toast.success(t("common.deleted"));
            qc.invalidateQueries({
              queryKey: ["expenses"]
            });
          }
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
      ] }, e.id)) })
    ] }) }) }) })
  ] });
}
export {
  ExpensesPage as component
};
