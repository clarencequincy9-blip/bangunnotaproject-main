import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, BookOpen, Lightbulb } from "lucide-react";
import { DOCS_SECTIONS, type DocLang, type DocSection } from "@/lib/docs-content";

export const Route = createFileRoute("/app/docs")({ component: DocsPage });

function sectionText(s: DocSection, lang: DocLang): string {
  const parts: string[] = [s.title[lang]];
  for (const b of s.blocks) {
    if (b.kind === "steps") parts.push(...b[lang]);
    else parts.push(b[lang]);
  }
  return parts.join(" ").toLowerCase();
}

function scrollToSection(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(`doc-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function DocsPage() {
  const { t, i18n } = useTranslation();
  const lang: DocLang = i18n.language === "en" ? "en" : "id";
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const sections = useMemo(
    () => (q ? DOCS_SECTIONS.filter((s) => sectionText(s, lang).includes(q)) : DOCS_SECTIONS),
    [q, lang],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("docs.title")}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">{t("docs.subtitle")}</p>
        </div>
      </div>

      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9 pr-9"
          placeholder={t("docs.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted"
            aria-label={t("docs.clear")}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {q && (
        <p className="text-xs text-muted-foreground">{t("docs.results", { n: sections.length })}</p>
      )}

      <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-lg border bg-card p-3">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("docs.toc")}
            </p>
            <nav className="space-y-0.5">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSection(s.id)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <s.icon className="h-4 w-4 shrink-0 text-primary/70" />
                  <span className="truncate">{s.title[lang]}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="space-y-6">
          {sections.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center text-sm text-muted-foreground">
                {t("docs.noResults")}
              </CardContent>
            </Card>
          ) : (
            sections.map((s) => (
              <Card key={s.id} id={`doc-${s.id}`} className="scroll-mt-6">
                <CardContent className="space-y-4 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold sm:text-xl">{s.title[lang]}</h2>
                  </div>

                  {s.blocks.map((b, i) => {
                    if (b.kind === "p") {
                      return (
                        <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                          {b[lang]}
                        </p>
                      );
                    }
                    if (b.kind === "steps") {
                      return (
                        <ol key={i} className="space-y-2 pl-1">
                          {b[lang].map((step, j) => (
                            <li key={j} className="flex gap-3 text-sm">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                                {j + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <div
                        key={i}
                        className="flex gap-2 rounded-md border-l-4 border-primary bg-primary/5 p-3 text-sm leading-relaxed"
                      >
                        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{b[lang]}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))
          )}

          {q && sections.length > 0 && (
            <div className="flex justify-center">
              <Button variant="outline" size="sm" onClick={() => setQuery("")} className="gap-2">
                <X className="h-4 w-4" /> {t("docs.clear")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
