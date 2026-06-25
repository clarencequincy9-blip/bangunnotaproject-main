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

export type ExportSpec = {
  title: string;
  subtitle?: string;
  filename: string;
  head: string[];
  body: (string | number)[][];
  cols?: number[];
  totalRow?: (string | number)[];
};

export function ExportMenu({ spec, label = "Ekspor" }: { spec: () => ExportSpec; label?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> {label}
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
          <Printer className="mr-2 h-4 w-4" /> Cetak
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
            toast.success("PDF diunduh");
          }}
        >
          <FileText className="mr-2 h-4 w-4" /> Ekspor PDF
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
            toast.success("Excel diunduh");
          }}
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Ekspor Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}