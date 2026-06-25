const idr = (n) => {
  const v = Number(n ?? 0);
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);
};
const num = (n) => new Intl.NumberFormat("id-ID").format(Number(n ?? 0));
const today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
export {
  idr as i,
  num as n,
  today as t
};
