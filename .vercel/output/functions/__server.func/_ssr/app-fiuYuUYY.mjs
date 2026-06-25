import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth } from "./router-CswNqt6p.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogPortal, d as DialogContent, g as DialogClose, h as DialogOverlay, e as DialogTitle, f as DialogDescription } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { L as LoaderCircle, b as LogOut, H as Hammer, M as Menu, c as LayoutDashboard, T as Truck, W as Warehouse, S as SlidersHorizontal, C as ChartColumn, d as ClipboardList, e as ContactRound, R as Receipt, f as ChartPie, g as Settings, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/use-sync-external-store.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
const Sheet = Dialog;
const SheetTrigger = DialogTrigger;
const SheetPortal = DialogPortal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogOverlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = DialogContent.displayName;
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogTitle.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogDescription.displayName;
function buildNavGroups(t) {
  return [{
    title: t("groups.main"),
    items: [{
      to: "/app",
      label: t("nav.dashboard"),
      icon: LayoutDashboard,
      exact: true
    }]
  }, {
    title: t("groups.inbound"),
    items: [{
      to: "/app/purchases",
      label: t("nav.purchases"),
      icon: Truck
    }, {
      to: "/app/products",
      label: t("nav.products"),
      icon: Warehouse
    }, {
      to: "/app/adjustments",
      label: t("nav.adjustments"),
      icon: SlidersHorizontal,
      indent: true
    }, {
      to: "/app/inventory-mutation",
      label: t("nav.inventoryMutation"),
      icon: ChartColumn,
      indent: true
    }]
  }, {
    title: t("groups.outbound"),
    items: [{
      to: "/app/sales",
      label: t("nav.sales"),
      icon: ClipboardList
    }, {
      to: "/app/receivables",
      label: t("nav.receivables"),
      icon: ClipboardList,
      indent: true
    }, {
      to: "/app/contacts",
      label: t("nav.contacts"),
      icon: ContactRound,
      indent: true
    }, {
      to: "/app/expenses",
      label: t("nav.expenses"),
      icon: Receipt
    }]
  }, {
    title: t("groups.financial"),
    items: [{
      to: "/app/reports",
      label: t("nav.reports"),
      icon: ChartPie
    }]
  }, {
    title: t("groups.account"),
    items: [{
      to: "/app/settings",
      label: t("nav.settings"),
      icon: Settings
    }]
  }];
}
function AppLayout() {
  const {
    t
  } = useTranslation();
  const navGroups = buildNavGroups(t);
  const {
    user,
    loading,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth"
    });
  }, [user, loading, navigate]);
  const {
    data: profile
  } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => (await supabase.from("profiles").select("full_name, store_name").eq("id", user.id).maybeSingle()).data
  });
  if (loading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  }
  const fullName = profile?.full_name || user.email?.split("@")[0] || "Pengguna";
  const initials = fullName.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
  const UserCard = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-3 mt-3 flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sm font-bold text-primary", children: initials }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-sidebar-foreground/60", children: "Selamat Bekerja," }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate text-sm font-semibold text-sidebar-foreground", children: [
        fullName,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "(Admin)" })
      ] })
    ] })
  ] });
  const NavList = () => /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-5 overflow-y-auto p-3", children: navGroups.map((g, gi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    g.title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50", children: g.title }),
    g.items.map((item) => {
      const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, className: cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition", item.indent && "ml-6 text-xs normal-case tracking-normal", active ? "bg-primary text-primary-foreground shadow-md" : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
      ] }, item.to);
    })
  ] }, gi)) });
  const Brand = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-sidebar-border px-5 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-lg", style: {
      background: "var(--gradient-primary)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-5 w-5 text-primary-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-base font-extrabold tracking-tight text-sidebar-foreground", children: [
        "BukuToko ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Jaya" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/60", children: "ERP Toko Bangunan" })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-muted/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-72 flex-col bg-sidebar text-sidebar-foreground md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Brand, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCard, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavList, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-sidebar-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 truncate px-2 text-xs text-sidebar-foreground/60", children: user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground", onClick: async () => {
          await signOut();
          navigate({
            to: "/auth"
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
          " ",
          t("nav.signOut")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 border-b bg-sidebar px-3 py-2 text-sidebar-foreground md:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-md", style: {
            background: "var(--gradient-primary)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-4 w-4 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
            "BukuToko ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Jaya" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-sidebar-foreground hover:bg-sidebar-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "right", className: "w-80 bg-sidebar p-0 text-sidebar-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brand, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserCard, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(NavList, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-sidebar-border p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 truncate px-2 text-xs text-sidebar-foreground/60", children: user.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground", onClick: async () => {
                await signOut();
                navigate({
                  to: "/auth"
                });
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
                " ",
                t("nav.signOut")
              ] })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-w-0 p-4 sm:p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AppLayout as component
};
