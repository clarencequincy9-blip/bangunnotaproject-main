import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Hammer,
  LayoutDashboard,
  Warehouse,
  Truck,
  ClipboardList,
  Receipt,
  PieChart,
  LogOut,
  Loader2,
  Menu,
  Settings,
  ContactRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal } from "lucide-react";
import { BarChart3 } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  indent?: boolean;
};
type NavGroup = { title?: string; items: NavItem[] };
function buildNavGroups(t: (k: string) => string): NavGroup[] {
  return [
    {
      title: t("groups.main"),
      items: [{ to: "/app", label: t("nav.dashboard"), icon: LayoutDashboard, exact: true }],
    },
    {
      title: t("groups.inbound"),
      items: [
        { to: "/app/purchases", label: t("nav.purchases"), icon: Truck },
        { to: "/app/products", label: t("nav.products"), icon: Warehouse },
        { to: "/app/adjustments", label: t("nav.adjustments"), icon: SlidersHorizontal, indent: true },
        { to: "/app/inventory-mutation", label: t("nav.inventoryMutation"), icon: BarChart3, indent: true },
      ],
    },
    {
      title: t("groups.outbound"),
      items: [
        { to: "/app/sales", label: t("nav.sales"), icon: ClipboardList },
        { to: "/app/receivables", label: t("nav.receivables"), icon: ClipboardList, indent: true },
        { to: "/app/contacts", label: t("nav.contacts"), icon: ContactRound, indent: true },
        { to: "/app/expenses", label: t("nav.expenses"), icon: Receipt },
      ],
    },
    {
      title: t("groups.financial"),
      items: [{ to: "/app/reports", label: t("nav.reports"), icon: PieChart }],
    },
    { title: t("groups.account"), items: [{ to: "/app/settings", label: t("nav.settings"), icon: Settings }] },
  ];
}

function AppLayout() {
  const { t } = useTranslation();
  const navGroups = buildNavGroups(t);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (
        await supabase
          .from("profiles")
          .select("full_name, store_name")
          .eq("id", user!.id)
          .maybeSingle()
      ).data,
  });

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const fullName = profile?.full_name || user.email?.split("@")[0] || "Pengguna";
  const initials = fullName
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const UserCard = () => (
    <div className="mx-3 mt-3 flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sm font-bold text-primary">
        {initials}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-sidebar-foreground/60">Selamat Bekerja,</div>
        <div className="truncate text-sm font-semibold text-sidebar-foreground">
          {fullName} <span className="text-primary">(Admin)</span>
        </div>
      </div>
    </div>
  );

  const NavList = () => (
    <nav className="flex-1 space-y-5 overflow-y-auto p-3">
      {navGroups.map((g, gi) => (
        <div key={gi} className="space-y-1">
          {g.title && (
            <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              {g.title}
            </div>
          )}
          {g.items.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to as never}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition",
                  item.indent && "ml-6 text-xs normal-case tracking-normal",
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );

  const Brand = () => (
    <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-lg"
        style={{ background: "var(--gradient-primary)" }}
      >
        <Hammer className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="leading-tight">
        <div className="text-base font-extrabold tracking-tight text-sidebar-foreground">
          BukuToko <span className="text-primary">Jaya</span>
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/60">
          ERP Toko Bangunan
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="hidden w-72 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <Brand />
        <UserCard />
        <NavList />
        <div className="border-t border-sidebar-border p-3">
          <div className="mb-2 truncate px-2 text-xs text-sidebar-foreground/60">{user.email}</div>
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={async () => {
              await signOut();
              navigate({ to: "/auth" });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> {t("nav.signOut")}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between gap-2 border-b bg-sidebar px-3 py-2 text-sidebar-foreground md:hidden">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-md"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Hammer className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">
              BukuToko <span className="text-primary">Jaya</span>
            </span>
          </div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-sidebar p-0 text-sidebar-foreground">
              <div className="flex h-full flex-col">
                <Brand />
                <UserCard />
                <NavList />
                <div className="border-t border-sidebar-border p-3">
                  <div className="mb-2 truncate px-2 text-xs text-sidebar-foreground/60">
                    {user.email}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    onClick={async () => {
                      await signOut();
                      navigate({ to: "/auth" });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> {t("nav.signOut")}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <main className="min-w-0 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
