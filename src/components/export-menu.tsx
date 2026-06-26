import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText, Printer } from "lucide-react";
import { exportExcel, exportPDF, printDocument, tableHtml } from "@/lib/export";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export type ExportSpec = {
  title: string;
  subtitle?: string;
  filename: string;
  head: string[];
  body: (string | number)[][];
  cols?: number[];
  totalRow?: (string | number)[];
};

export function ExportMenu({ spec, label }: { spec: () => ExportSpec; label?: string }) {
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> {label ?? t("common.export")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            const s = spec();
            printDocument(
              tableHtml({
                title: s.title,
                subtitle: s.subtitle,
                head: s.head,
                body: s.body,
                totalRow: s.totalRow,
              }),
              s.title,
            );
          }}
        >
          <Printer className="mr-2 h-4 w-4" /> {t("common.print")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            const s = spec();
            exportPDF({
              title: s.title,
              subtitle: s.subtitle,
              head: s.head,
              body: s.body,
              filename: `${s.filename}.pdf`,
              footer: s.subtitle,
            });
            toast.success(t("common.pdfDownloaded"));
          }}
        >
          <FileText className="mr-2 h-4 w-4" /> {t("common.exportPdf")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            const s = spec();
            exportExcel(`${s.filename}.xlsx`, [
              {
                name: s.title.slice(0, 30),
                rows: [s.head, ...s.body, ...(s.totalRow ? [s.totalRow] : [])],
                cols: s.cols,
              },
            ]);
            toast.success(t("common.excelDownloaded"));
          }}
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" /> {t("common.exportExcel")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}