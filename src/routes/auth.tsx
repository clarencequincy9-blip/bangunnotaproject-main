import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Hammer, Loader2, Eye, EyeOff } from "lucide-react";
import heroImg from "@/assets/hero-toko.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Masuk / Daftar — Bangun Kelola" },
      { name: "description", content: "Masuk atau daftar akun untuk mulai mengelola pembukuan toko bangunan Anda." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/app" });
  }, [user, loading, navigate]);

  return (
    <div className="relative min-h-screen w-full">
      <img src={heroImg} alt="Toko bangunan" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/60" />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-2">
          <div className="hidden flex-col justify-between p-2 text-white lg:flex">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md" style={{ background: "var(--gradient-primary)" }}>
                <Hammer className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Bangun Kelola</span>
            </Link>
            <div>
              <h1 className="text-4xl font-bold leading-tight">
                Pembukuan toko bangunan, <span className="text-primary">tanpa ribet.</span>
              </h1>
              <p className="mt-4 text-white/70">Catat transaksi, kelola stok, dan lihat performa toko Anda secara real-time.</p>
            </div>
            <div className="text-sm text-white/50">© {new Date().getFullYear()} Bangun Kelola</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card/95 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 lg:hidden">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "var(--gradient-primary)" }}>
                  <Hammer className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">Bangun Kelola</span>
              </Link>
            </div>
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Masuk</TabsTrigger>
                <TabsTrigger value="signup">Daftar</TabsTrigger>
              </TabsList>
              <TabsContent value="signin"><SignInForm /></TabsContent>
              <TabsContent value="signup"><SignUpForm /></TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Selamat datang kembali!");
    navigate({ to: "/app" });
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="si-email">Email</Label>
        <Input id="si-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email@toko.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="si-pw">Password</Label>
        <div className="relative">
          <Input id="si-pw" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="pr-10" />
          <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"}>
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Masuk
      </Button>
    </form>
  );
}

function SignUpForm() {
  const [storeName, setStoreName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password minimal 6 karakter");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/app",
        data: { full_name: fullName, store_name: storeName },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Akun berhasil dibuat!");
    navigate({ to: "/app" });
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="su-store">Nama Toko</Label>
        <Input id="su-store" value={storeName} onChange={(e) => setStoreName(e.target.value)} required placeholder="TB Sumber Rejeki" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="su-name">Nama Lengkap</Label>
        <Input id="su-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="su-email">Email</Label>
        <Input id="su-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="su-pw">Password</Label>
        <div className="relative">
          <Input id="su-pw" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="pr-10" />
          <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPw ? "Sembunyikan password" : "Tampilkan password"}>
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Daftar
      </Button>
    </form>
  );
}