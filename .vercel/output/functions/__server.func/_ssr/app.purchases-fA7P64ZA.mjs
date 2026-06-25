import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth } from "./router-CswNqt6p.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { D as Dialog, a as DialogTrigger } from "./dialog-DLDX5ALL.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { a as NewPurchaseDialog, B as Badge } from "./transaction-dialog-kSN8oKo_.mjs";
import { i as idr } from "./format-CsoEuMsu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { E as ExportMenu } from "./export-menu-BmXHofII.mjs";
import "../_libs/i18next.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "./input-C0QjszdI.mjs";
import "./label-JU3yqRBo.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "./textarea-DSyJ1nlY.mjs";
import "./select-CZRUt5a6.mjs";
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
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "./export-OXCswqgj.mjs";
import "../_libs/xlsx.mjs";
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
function PurchasesPage() {
  const {
    user
  } = useAuth();
  const {
    t
  } = useTranslation();
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const {
    data: purchases = []
  } = useQuery({
    queryKey: ["purchases", user.id],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("purchases").select("*").order("purchase_date", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight sm:text-3xl", children: t("purchases.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground sm:text-base", children: t("purchases.subtitle") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExportMenu, { spec: () => ({
          title: "Daftar Pembelian",
          subtitle: `${purchases.length} nota`,
          filename: "Pembelian",
          head: ["Tanggal", "No. Nota", "Status", "Jatuh Tempo", "Total", "Dibayar", "Saldo Hutang"],
          body: purchases.map((p) => [p.purchase_date, p.invoice_no, Number(p.total) - Number(p.paid) < 0.01 ? "Lunas" : "Hutang", p.due_date ?? "", Number(p.total), Number(p.paid), Math.max(0, Number(p.total) - Number(p.paid))]),
          cols: [12, 16, 10, 14, 14, 14, 14],
          totalRow: ["TOTAL", "", "", "", purchases.reduce((s, p) => s + Number(p.total), 0), purchases.reduce((s, p) => s + Number(p.paid), 0), purchases.reduce((s, p) => s + Math.max(0, Number(p.total) - Number(p.paid)), 0)]
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Pembelian Baru" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Baru" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NewPurchaseDialog, { userId: user.id, onClose: () => {
            setOpen(false);
            qc.invalidateQueries({
              queryKey: ["purchases"]
            });
            qc.invalidateQueries({
              queryKey: ["products"]
            });
            qc.invalidateQueries({
              queryKey: ["dash-stats"]
            });
            qc.invalidateQueries({
              queryKey: ["ap"]
            });
          } })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 sm:p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tanggal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "No. Nota" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden md:table-cell", children: "Jatuh Tempo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-16" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: purchases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "py-8 text-center text-muted-foreground", children: "Belum ada pembelian." }) }) : purchases.map((p) => {
        const lunas = Number(p.total) - Number(p.paid) < 0.01;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap text-xs sm:text-sm", children: p.purchase_date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: p.invoice_no }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: lunas ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-emerald-100 text-emerald-700", children: "Lunas" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Hutang" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden whitespace-nowrap md:table-cell", children: p.due_date ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold whitespace-nowrap", children: idr(p.total) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: async () => {
            if (!confirm(`Hapus ${p.invoice_no}?`)) return;
            const {
              error
            } = await supabase.from("purchases").delete().eq("id", p.id);
            if (error) toast.error(error.message);
            else {
              toast.success("Dihapus");
              qc.invalidateQueries({
                queryKey: ["purchases"]
              });
              qc.invalidateQueries({
                queryKey: ["products"]
              });
            }
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] }, p.id);
      }) })
    ] }) }) }) })
  ] });
}
export {
  PurchasesPage as component
};
