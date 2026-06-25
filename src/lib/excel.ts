import * as XLSX from "xlsx";

export function downloadExcel(filename: string, sheets: { name: string; rows: (string | number)[][]; cols?: number[] }[]) {
  const wb = XLSX.utils.book_new();
  for (const s of sheets) {
    const ws = XLSX.utils.aoa_to_sheet(s.rows);
    if (s.cols) ws["!cols"] = s.cols.map((wch) => ({ wch }));
    // bold header row
    const range = XLSX.utils.decode_range(ws["!ref"] ?? "A1");
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r: 0, c });
      if (ws[addr]) ws[addr].s = { font: { bold: true } };
    }
    XLSX.utils.book_append_sheet(wb, ws, s.name.slice(0, 31));
  }
  XLSX.writeFile(wb, filename);
}

export const fmtMoney = (n: number) =>
  new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(n || 0));