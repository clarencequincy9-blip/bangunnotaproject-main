import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth } from "./router-CswNqt6p.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DLDX5ALL.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { i as idr } from "./format-CsoEuMsu.mjs";
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
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
function ContactsPage() {
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight sm:text-3xl", children: t("nav.contacts") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground sm:text-base", children: t("contacts.subtitle") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "customers", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2 sm:w-80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "customers", children: t("contacts.customers") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "suppliers", children: t("contacts.suppliers") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "customers", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPanel, { kind: "customers" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "suppliers", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPanel, { kind: "suppliers" }) })
    ] })
  ] });
}
function PartyPanel({
  kind
}) {
  const {
    user
  } = useAuth();
  const {
    t
  } = useTranslation();
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const isCustomer = kind === "customers";
  const {
    data: rows = []
  } = useQuery({
    queryKey: [kind, user?.id],
    enabled: !!user,
    queryFn: async () => {
      const result = isCustomer ? await supabase.from("customers").select("*, sales(total, paid)").order("name") : await supabase.from("suppliers").select("*").order("name");
      const {
        data,
        error
      } = result;
      if (error) throw error;
      return data;
    }
  });
  async function remove(row) {
    if (!confirm(`${t("common.confirmDelete")} (${row.name})`)) return;
    const {
      error
    } = await supabase.from(kind).delete().eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success(t("common.deleted"));
    qc.invalidateQueries({
      queryKey: [kind]
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " ",
        isCustomer ? t("contacts.addCustomer") : t("contacts.addSupplier")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PartyDialog, { kind, userId: user?.id ?? "", onClose: () => {
        setOpen(false);
        qc.invalidateQueries({
          queryKey: [kind]
        });
      } })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("common.name") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("common.phone") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("common.address") }),
        isCustomer && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("contacts.creditLimit") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("contacts.receivable") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: t("contacts.riskStatus") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: t("contacts.termDays") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-16" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: isCustomer ? 8 : 4, className: "py-8 text-center text-muted-foreground", children: t("common.noData") }) }) : rows.map((row) => {
        const outstanding = (row.sales ?? []).reduce((sum, sale) => sum + Math.max(0, Number(sale.total) - Number(sale.paid)), 0);
        const ratio = Number(row.credit_limit ?? 0) > 0 ? outstanding / Number(row.credit_limit) : 0;
        const riskKey = ratio >= 1 ? "riskOver" : ratio >= 0.8 ? "riskCritical" : "riskSafe";
        const risk = t(`contacts.${riskKey}`);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: row.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.phone ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.address ?? "—" }),
          isCustomer && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right whitespace-nowrap", children: idr(row.credit_limit ?? 0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right whitespace-nowrap", children: idr(outstanding) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: riskKey === "riskSafe" ? "text-emerald-600" : riskKey === "riskCritical" ? "text-primary" : "text-destructive", children: risk }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: t("contacts.termDaysUnit", {
              n: row.payment_terms_days ?? 30
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(row), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] }, row.id);
      }) })
    ] }) })
  ] }) });
}
function PartyDialog({
  kind,
  userId,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const isCustomer = kind === "customers";
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    address: "",
    credit_limit: 0,
    payment_terms_days: 30
  });
  const [saving, setSaving] = reactExports.useState(false);
  async function save(e) {
    e.preventDefault();
    setSaving(true);
    const payload = isCustomer ? {
      ...form,
      user_id: userId
    } : {
      name: form.name,
      phone: form.phone,
      address: form.address,
      user_id: userId
    };
    const {
      error
    } = await supabase.from(kind).insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(t("contacts.added"));
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: isCustomer ? t("contacts.newCustomer") : t("contacts.newSupplier") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("common.name") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("common.phone") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.phone, onChange: (e) => setForm({
            ...form,
            phone: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("common.address") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.address, onChange: (e) => setForm({
            ...form,
            address: e.target.value
          }) })
        ] })
      ] }),
      isCustomer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("contacts.creditLimit") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", value: form.credit_limit, onChange: (e) => setForm({
            ...form,
            credit_limit: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("contacts.termDays") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", max: "365", value: form.payment_terms_days, onChange: (e) => setForm({
            ...form,
            payment_terms_days: Number(e.target.value)
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
export {
  ContactsPage as component
};
