import { u as utils, w as writeFileSync } from "../_libs/xlsx.mjs";
import { j as jsPDF } from "../_libs/jspdf.mjs";
import { a as autoTable } from "../_libs/jspdf-autotable.mjs";
function exportExcel(filename, sheets) {
  const wb = utils.book_new();
  for (const s of sheets) {
    const ws = utils.aoa_to_sheet(s.rows);
    if (s.cols) ws["!cols"] = s.cols.map((wch) => ({ wch }));
    utils.book_append_sheet(wb, ws, s.name.slice(0, 31));
  }
  writeFileSync(wb, filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`);
}
function exportPDF(opts) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  doc.setFontSize(14);
  doc.text(opts.title, 40, 40);
  if (opts.subtitle) {
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(opts.subtitle, 40, 58);
    doc.setTextColor(0);
  }
  autoTable(doc, {
    startY: 75,
    head: [opts.head],
    body: opts.body.map((r) => r.map((c) => c == null ? "" : String(c))),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [234, 88, 12] },
    margin: { left: 40, right: 40 }
  });
  if (opts.footer) {
    const pageCount = doc.getNumberOfPages?.() ?? 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(opts.footer, 40, doc.internal.pageSize.getHeight() - 20);
    }
  }
  doc.save(opts.filename ?? `${opts.title}.pdf`);
}
function printDocument(html, title = "Cetak") {
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) return;
  w.document.write(`<!doctype html><html><head><title>${title}</title>
    <style>
      body{font-family:system-ui,sans-serif;padding:24px;color:#111}
      h1{font-size:18px;margin:0 0 4px}
      h2{font-size:13px;margin:0 0 16px;color:#555;font-weight:500}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th,td{border:1px solid #ddd;padding:6px 8px;text-align:left}
      th{background:#f5f5f5}
      .right{text-align:right}
      .total-row td{font-weight:600;background:#fafafa}
      @media print{button{display:none}}
    </style>
  </head><body>${html}
  <div style="margin-top:24px;text-align:right">
    <button onclick="window.print()" style="padding:8px 16px;background:#ea580c;color:#fff;border:0;border-radius:6px;cursor:pointer">Cetak</button>
  </div>
  </body></html>`);
  w.document.close();
  setTimeout(() => w.focus(), 100);
}
function tableHtml(opts) {
  const headHtml = opts.head.map((h) => `<th>${h}</th>`).join("");
  const bodyHtml = opts.body.map((r) => `<tr>${r.map((c) => `<td>${c ?? ""}</td>`).join("")}</tr>`).join("");
  const totalHtml = opts.totalRow ? `<tr class="total-row">${opts.totalRow.map((c) => `<td>${c ?? ""}</td>`).join("")}</tr>` : "";
  return `<h1>${opts.title}</h1>${opts.subtitle ? `<h2>${opts.subtitle}</h2>` : ""}
    <table><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}${totalHtml}</tbody></table>`;
}
export {
  exportExcel as a,
  exportPDF as e,
  printDocument as p,
  tableHtml as t
};
