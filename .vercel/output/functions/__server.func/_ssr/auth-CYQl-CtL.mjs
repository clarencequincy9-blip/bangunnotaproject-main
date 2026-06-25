import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-BzdGMR5u.mjs";
import { u as useAuth } from "./router-CswNqt6p.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { h as heroImg } from "./hero-toko-zLHz6k9M.mjs";
import "../_libs/i18next.mjs";
import { H as Hammer, E as EyeOff, a as Eye, L as LoaderCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
function AuthPage() {
  const navigate = useNavigate();
  const {
    user,
    loading
  } = useAuth();
  reactExports.useEffect(() => {
    if (!loading && user) navigate({
      to: "/app"
    });
  }, [user, loading, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Toko bangunan", className: "absolute inset-0 h-full w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex min-h-screen items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-5xl gap-10 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden flex-col justify-between p-2 text-white lg:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-md", style: {
            background: "var(--gradient-primary)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold", children: "Bangun Kelola" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold leading-tight", children: [
            "Pembukuan toko bangunan, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "tanpa ribet." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white/70", children: "Catat transaksi, kelola stok, dan lihat performa toko Anda secara real-time." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-white/50", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Bangun Kelola"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-card/95 p-8 shadow-2xl backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-md", style: {
            background: "var(--gradient-primary)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold", children: "Bangun Kelola" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "signin", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signin", children: "Masuk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signup", children: "Daftar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignInForm, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignUpForm, {}) })
        ] })
      ] })
    ] }) })
  ] });
}
function SignInForm() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [showPw, setShowPw] = reactExports.useState(false);
  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Selamat datang kembali!");
    navigate({
      to: "/app"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "si-email", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "si-email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "email@toko.com" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "si-pw", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "si-pw", type: showPw ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "pr-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw((v) => !v), className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", "aria-label": showPw ? "Sembunyikan password" : "Tampilkan password", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
      "Masuk"
    ] })
  ] });
}
function SignUpForm() {
  const [storeName, setStoreName] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [showPw, setShowPw] = reactExports.useState(false);
  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password minimal 6 karakter");
    setLoading(true);
    const {
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/app",
        data: {
          full_name: fullName,
          store_name: storeName
        }
      }
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Akun berhasil dibuat!");
    navigate({
      to: "/app"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "mt-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "su-store", children: "Nama Toko" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "su-store", value: storeName, onChange: (e) => setStoreName(e.target.value), required: true, placeholder: "TB Sumber Rejeki" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "su-name", children: "Nama Lengkap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "su-name", value: fullName, onChange: (e) => setFullName(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "su-email", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "su-email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "su-pw", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "su-pw", type: showPw ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, className: "pr-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw((v) => !v), className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", "aria-label": showPw ? "Sembunyikan password" : "Tampilkan password", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
      "Daftar"
    ] })
  ] });
}
export {
  AuthPage as component
};
