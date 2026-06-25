import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { idr } from "@/lib/format";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/contacts")({ component: ContactsPage });

type PartyKind = "customers" | "suppliers";
type Party = {
  id: string;
  name: string;
  phone: string | null;
  address: string | null;
  credit_limit?: number;
  payment_terms_days?: number;
  sales?: { total: number; paid: number }[];
};

function ContactsPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("nav.contacts")}</h1>
        <p className="text-sm text-muted-foreground sm:text-base">{t("contacts.subtitle")}</p>
      </div>
      <Tabs defaultValue="customers">
        <TabsList className="grid w-full grid-cols-2 sm:w-80">
          <TabsTrigger value="customers">{t("contacts.customers")}</TabsTrigger>
          <TabsTrigger value="suppliers">{t("contacts.suppliers")}</TabsTrigger>
        </TabsList>
        <TabsContent value="customers">
          <PartyPanel kind="customers" />
        </TabsContent>
        <TabsContent value="suppliers">
          <PartyPanel kind="suppliers" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PartyPanel({ kind }: { kind: PartyKind }) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const isCustomer = kind === "customers";
  const { data: rows = [] } = useQuery({
    queryKey: [kind, user?.id],
    enabled: !!user,
    queryFn: async () => {
      const result = isCustomer
        ? await supabase.from("customers").select("*, sales(total, paid)").order("name")
        : await supabase.from("suppliers").select("*").order("name");
      const { data, error } = result;
      if (error) throw error;
      return data as Party[];
    },
  });

  async function remove(row: Party) {
    if (!confirm(`${t("common.confirmDelete")} (${row.name})`)) return;
    const { error } = await supabase.from(kind).delete().eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success(t("common.deleted"));
    qc.invalidateQueries({ queryKey: [kind] });
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-4 flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />{" "}
                {isCustomer ? t("contacts.addCustomer") : t("contacts.addSupplier")}
              </Button>
            </DialogTrigger>
            <PartyDialog
              kind={kind}
              userId={user?.id ?? ""}
              onClose={() => {
                setOpen(false);
                qc.invalidateQueries({ queryKey: [kind] });
              }}
            />
          </Dialog>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("common.name")}</TableHead>
                <TableHead>{t("common.phone")}</TableHead>
                <TableHead>{t("common.address")}</TableHead>
                {isCustomer && (
                  <>
                    <TableHead className="text-right">{t("contacts.creditLimit")}</TableHead>
                    <TableHead className="text-right">{t("contacts.receivable")}</TableHead>
                    <TableHead>{t("contacts.riskStatus")}</TableHead>
                    <TableHead className="text-right">{t("contacts.termDays")}</TableHead>
                  </>
                )}
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isCustomer ? 8 : 4}
                    className="py-8 text-center text-muted-foreground"
                  >
                    {t("common.noData")}
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => {
                  const outstanding = (row.sales ?? []).reduce(
                    (sum, sale) => sum + Math.max(0, Number(sale.total) - Number(sale.paid)),
                    0,
                  );
                  const ratio =
                    Number(row.credit_limit ?? 0) > 0 ? outstanding / Number(row.credit_limit) : 0;
                  const riskKey: "riskOver" | "riskCritical" | "riskSafe" =
                    ratio >= 1 ? "riskOver" : ratio >= 0.8 ? "riskCritical" : "riskSafe";
                  const risk = t(`contacts.${riskKey}`);
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.phone ?? "—"}</TableCell>
                      <TableCell>{row.address ?? "—"}</TableCell>
                      {isCustomer && (
                        <>
                          <TableCell className="text-right whitespace-nowrap">
                            {idr(row.credit_limit ?? 0)}
                          </TableCell>
                          <TableCell className="text-right whitespace-nowrap">
                            {idr(outstanding)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={
                                riskKey === "riskSafe"
                                  ? "text-emerald-600"
                                  : riskKey === "riskCritical"
                                    ? "text-primary"
                                    : "text-destructive"
                              }
                            >
                              {risk}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {t("contacts.termDaysUnit", { n: row.payment_terms_days ?? 30 })}
                          </TableCell>
                        </>
                      )}
                      <TableCell>
                        <Button size="icon" variant="ghost" onClick={() => remove(row)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function PartyDialog({
  kind,
  userId,
  onClose,
}: {
  kind: PartyKind;
  userId: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const isCustomer = kind === "customers";
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    credit_limit: 0,
    payment_terms_days: 30,
  });
  const [saving, setSaving] = useState(false);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = isCustomer
      ? { ...form, user_id: userId }
      : { name: form.name, phone: form.phone, address: form.address, user_id: userId };
    const { error } = await supabase.from(kind).insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(t("contacts.added"));
    onClose();
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {isCustomer ? t("contacts.newCustomer") : t("contacts.newSupplier")}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={save} className="space-y-4">
        <div className="space-y-2">
          <Label>{t("common.name")}</Label>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("common.phone")}</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("common.address")}</Label>
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </div>
        {isCustomer && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("contacts.creditLimit")}</Label>
              <Input
                type="number"
                min="0"
                value={form.credit_limit}
                onChange={(e) => setForm({ ...form, credit_limit: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("contacts.termDays")}</Label>
              <Input
                type="number"
                min="0"
                max="365"
                value={form.payment_terms_days}
                onChange={(e) => setForm({ ...form, payment_terms_days: Number(e.target.value) })}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? t("common.saving") : t("common.save")}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
