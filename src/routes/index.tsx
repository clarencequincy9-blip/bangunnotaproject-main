import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BarChart3, Boxes, FileText, ShieldCheck, TrendingUp, Hammer, ArrowRight, Check } from "lucide-react";
import heroImg from "@/assets/hero-toko.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bangun Kelola — Pembukuan & Analisis Toko Bangunan" },
      { name: "description", content: "Aplikasi SaaS modern untuk pencatatan stok, penjualan, pembelian, pembukuan, dan visualisasi laba toko bangunan Anda." },
      { property: "og:title", content: "Bangun Kelola — Pembukuan Toko Bangunan" },
      { property: "og:description", content: "Pencatatan, pembukuan, visualisasi & analisis lengkap untuk toko bangunan." },
      { property: "og:image", content: "/__og.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "var(--gradient-primary)" }}>
              <Hammer className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">Bangun Kelola</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/auth"><Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Masuk</Button></Link>
            <Link to="/auth"><Button>Daftar Gratis</Button></Link>
          </div>
        </nav>
      </header>

      <section className="relative isolate overflow-hidden">
        <img src={heroImg} alt="Toko bangunan modern" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/85 via-black/70 to-black/50" />
        <div className="mx-auto max-w-7xl px-6 pb-28 pt-44 sm:pt-52 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> SaaS Akuntansi Toko Bangunan
            </span>
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Bangun bisnis Anda di atas <span className="text-primary">pondasi data</span> yang kokoh.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              Catat penjualan, pembelian, stok semen-besi-cat, kelola arus kas, dan analisis laba toko bangunan Anda — semua dalam satu aplikasi.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Mulai Sekarang <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  Sudah punya akun? Masuk
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {["Gratis untuk memulai", "Tanpa kartu kredit", "Data aman & terenkripsi"].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" /> {t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Semua yang dibutuhkan toko bangunan</h2>
          <p className="mt-4 text-muted-foreground">Dari catatan stok semen sampai laporan laba rugi bulanan — siap pakai.</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Boxes, title: "Manajemen Stok", desc: "Pantau stok semen, besi, cat, pipa, dll. lengkap dengan satuan & stok minimum." },
            { icon: FileText, title: "Penjualan & Pembelian", desc: "Buat nota dengan banyak item, otomatis update stok dan harga pokok." },
            { icon: TrendingUp, title: "Visualisasi Penjualan", desc: "Grafik tren penjualan harian, produk terlaris, dan margin keuntungan." },
            { icon: BarChart3, title: "Laporan Keuangan", desc: "Laporan laba/rugi, arus kas, dan pengeluaran operasional siap unduh." },
            { icon: ShieldCheck, title: "Data Aman", desc: "Setiap toko punya data terisolasi. Hanya Anda yang bisa mengaksesnya." },
            { icon: Hammer, title: "Khusus Toko Bangunan", desc: "Dirancang untuk alur kerja toko material bangunan, bukan generik." },
          ].map((f) => (
            <div key={f.title} className="group rounded-xl border bg-card p-6 transition hover:shadow-[var(--shadow-elegant)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-20 text-center lg:px-8">
          <h2 className="text-4xl font-bold">Siap kelola toko Anda lebih rapi?</h2>
          <p className="max-w-xl text-sidebar-foreground/70">Daftar gratis hari ini dan rasakan kemudahan pembukuan digital untuk toko bangunan.</p>
          <Link to="/auth"><Button size="lg" className="gap-2">Buat Akun Toko <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
      </section>

      <footer className="border-t bg-background py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Bangun Kelola — Pembukuan untuk Toko Bangunan
      </footer>
    </div>
  );
}
