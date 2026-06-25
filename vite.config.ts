// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Outside a Lovable sandbox the wrapper skips the Nitro deploy plugin unless
  // `nitro` is set explicitly — without it Vercel gets no SSR handler / Build
  // Output and every route 404s. Force the Vercel preset so `vite build`
  // emits a `.vercel/output` (Build Output API v3) that Vercel serves directly.
  nitro: { preset: "vercel" },
});
