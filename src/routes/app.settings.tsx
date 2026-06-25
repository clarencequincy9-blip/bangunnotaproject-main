import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/i18n";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

type Scope = {
  sales: boolean;
  purchases: boolean;
  expenses: boolean;
  products: boolean;
  contacts: boolean;
  adjustments: boolean;
};

function SettingsPage() {
  const { i18n, t } = useTranslation();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [scope, setScope] = useState<Scope>({
    sales: true,
    purchases: true,
    expenses: true,
    products: false,
    contacts: false,
    adjustments: true,
  });

  async function resetData() {
    const phrase = i18n.language === "en" ? "DELETE ALL" : "HAPUS SEMUA";
    if (confirm !== phrase) return toast.error(t("settings.confirmHint", { phrase }));
    setLoading(true);
    try {
      // Atomic server-side reset bypasses stock triggers so nothing is left behind.
      const { error } = await (supabase.rpc as any)("reset_user_data", {
        _sales: scope.sales,
        _purchases: scope.purchases,
        _expenses: scope.expenses,
        _adjustments: scope.adjustments,
        _products: scope.products,
        _contacts: scope.contacts,
      });
      if (error) throw error;
      toast.success(t("settings.resetOk"));
      setConfirm("");
      await qc.invalidateQueries();
    } catch (e: any) {
      toast.error(e.message ?? t("settings.resetFail"));
    } finally {
      setLoading(false);
    }
  }

  const items: { key: keyof Scope; label: string; desc: string }[] = [
    { key: "sales", label: t("settings.scope.sales"), desc: t("settings.scope.salesDesc") },
    { key: "purchases", label: t("settings.scope.purchases"), desc: t("settings.scope.purchasesDesc") },
    { key: "expenses", label: t("settings.scope.expenses"), desc: t("settings.scope.expensesDesc") },
    { key: "adjustments", label: t("settings.scope.adjustments"), desc: t("settings.scope.adjustmentsDesc") },
    { key: "products", label: t("settings.scope.products"), desc: t("settings.scope.productsDesc") },
    { key: "contacts", label: t("settings.scope.contacts"), desc: t("settings.scope.contactsDesc") },
  ];

  function applyPreset(p: "full" | "tx" | "none") {
    if (p === "full") setScope({ sales: true, purchases: true, expenses: true, products: true, contacts: true, adjustments: true });
    else if (p === "tx") setScope({ sales: true, purchases: true, expenses: true, products: false, contacts: false, adjustments: true });
    else setScope({ sales: false, purchases: false, expenses: false, products: false, contacts: false, adjustments: false });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("settings.title")}</h1>
        <p className="text-sm text-muted-foreground sm:text-base">{t("settings.subtitle")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("settings.profile")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <Label className="text-muted-foreground">Email</Label>
            <div className="mt-1 font-medium">{user?.email}</div>
          </div>
          <div>
            <Label className="text-muted-foreground">{t("settings.userId")}</Label>
            <div className="mt-1 break-all font-mono text-xs">{user?.id}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("settings.language")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs space-y-2">
            <Label>Bahasa / Language</Label>
            <Select
              value={i18n.language}
              onValueChange={(v) => setLanguage(v as "id" | "en")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">🇮🇩 Bahasa Indonesia</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Preferensi tersimpan di perangkat ini. Tambah bahasa baru via{" "}
              <code>src/i18n/locales</code>.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" /> {t("settings.danger")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{t("settings.dangerHint")}</p>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => applyPreset("full")}>
              {t("settings.presetFull")}
            </Button>
            <Button size="sm" variant="outline" onClick={() => applyPreset("tx")}>
              {t("settings.presetTx")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => applyPreset("none")}>
              {t("settings.presetNone")}
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((it) => (
              <label
                key={it.key}
                className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:bg-muted/40"
              >
                <Checkbox
                  checked={scope[it.key]}
                  onCheckedChange={(v) => setScope((s) => ({ ...s, [it.key]: !!v }))}
                />
                <div>
                  <div className="text-sm font-semibold">{it.label}</div>
                  <div className="text-xs text-muted-foreground">{it.desc}</div>
                </div>
              </label>
            ))}
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="gap-2"
                disabled={!Object.values(scope).some(Boolean)}
              >
                <Trash2 className="h-4 w-4" /> {t("settings.resetBtn")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("settings.confirmTitle")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("settings.confirmBody")}{" "}
                  <strong>{i18n.language === "en" ? "DELETE ALL" : "HAPUS SEMUA"}</strong>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input
                placeholder={i18n.language === "en" ? "DELETE ALL" : "HAPUS SEMUA"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirm("")}>{t("common.cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  disabled={confirm !== (i18n.language === "en" ? "DELETE ALL" : "HAPUS SEMUA") || loading}
                  onClick={(e) => {
                    e.preventDefault();
                    resetData();
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t("settings.confirmYes")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
