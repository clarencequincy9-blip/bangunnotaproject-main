import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth, s as setLanguage } from "./router-CswNqt6p.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DIV666p3.mjs";
import { B as Button, b as buttonVariants } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { R as Root2, T as Trigger2, P as Portal2, C as Content2, a as Title2, D as Description2, b as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/i18next.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { p as TriangleAlert, q as Trash2, L as LoaderCircle, h as Check } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const AlertDialog = Root2;
const AlertDialogTrigger = Trigger2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
function SettingsPage() {
  const {
    i18n,
    t
  } = useTranslation();
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const [confirm, setConfirm] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [scope, setScope] = reactExports.useState({
    sales: true,
    purchases: true,
    expenses: true,
    products: false,
    contacts: false,
    adjustments: true
  });
  async function resetData() {
    const phrase = i18n.language === "en" ? "DELETE ALL" : "HAPUS SEMUA";
    if (confirm !== phrase) return toast.error(t("settings.confirmHint", {
      phrase
    }));
    setLoading(true);
    try {
      const {
        error
      } = await supabase.rpc("reset_user_data", {
        _sales: scope.sales,
        _purchases: scope.purchases,
        _expenses: scope.expenses,
        _adjustments: scope.adjustments,
        _products: scope.products,
        _contacts: scope.contacts
      });
      if (error) throw error;
      toast.success(t("settings.resetOk"));
      setConfirm("");
      await qc.invalidateQueries();
    } catch (e) {
      toast.error(e.message ?? t("settings.resetFail"));
    } finally {
      setLoading(false);
    }
  }
  const items = [{
    key: "sales",
    label: t("settings.scope.sales"),
    desc: t("settings.scope.salesDesc")
  }, {
    key: "purchases",
    label: t("settings.scope.purchases"),
    desc: t("settings.scope.purchasesDesc")
  }, {
    key: "expenses",
    label: t("settings.scope.expenses"),
    desc: t("settings.scope.expensesDesc")
  }, {
    key: "adjustments",
    label: t("settings.scope.adjustments"),
    desc: t("settings.scope.adjustmentsDesc")
  }, {
    key: "products",
    label: t("settings.scope.products"),
    desc: t("settings.scope.productsDesc")
  }, {
    key: "contacts",
    label: t("settings.scope.contacts"),
    desc: t("settings.scope.contactsDesc")
  }];
  function applyPreset(p) {
    if (p === "full") setScope({
      sales: true,
      purchases: true,
      expenses: true,
      products: true,
      contacts: true,
      adjustments: true
    });
    else if (p === "tx") setScope({
      sales: true,
      purchases: true,
      expenses: true,
      products: false,
      contacts: false,
      adjustments: true
    });
    else setScope({
      sales: false,
      purchases: false,
      expenses: false,
      products: false,
      contacts: false,
      adjustments: false
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight sm:text-3xl", children: t("settings.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground sm:text-base", children: t("settings.subtitle") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: t("settings.profile") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-3 text-sm sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-medium", children: user?.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground", children: t("settings.userId") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 break-all font-mono text-xs", children: user?.id })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: t("settings.language") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bahasa / Language" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: i18n.language, onValueChange: (v) => setLanguage(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "id", children: "🇮🇩 Bahasa Indonesia" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "en", children: "🇬🇧 English" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Preferensi tersimpan di perangkat ini. Tambah bahasa baru via",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "src/i18n/locales" }),
          "."
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
        " ",
        t("settings.danger")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("settings.dangerHint") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => applyPreset("full"), children: t("settings.presetFull") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => applyPreset("tx"), children: t("settings.presetTx") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => applyPreset("none"), children: t("settings.presetNone") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: scope[it.key], onCheckedChange: (v) => setScope((s) => ({
            ...s,
            [it.key]: !!v
          })) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: it.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: it.desc })
          ] })
        ] }, it.key)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", className: "gap-2", disabled: !Object.values(scope).some(Boolean), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
            " ",
            t("settings.resetBtn")
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: t("settings.confirmTitle") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                t("settings.confirmBody"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: i18n.language === "en" ? "DELETE ALL" : "HAPUS SEMUA" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: i18n.language === "en" ? "DELETE ALL" : "HAPUS SEMUA", value: confirm, onChange: (e) => setConfirm(e.target.value) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { onClick: () => setConfirm(""), children: t("common.cancel") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogAction, { disabled: confirm !== (i18n.language === "en" ? "DELETE ALL" : "HAPUS SEMUA") || loading, onClick: (e) => {
                e.preventDefault();
                resetData();
              }, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: [
                loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                " ",
                t("settings.confirmYes")
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  SettingsPage as component
};
