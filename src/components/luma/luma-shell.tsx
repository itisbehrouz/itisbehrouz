import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLang } from "@/hooks/use-lang";
import { ui } from "@/lib/i18n";
import { caseStudies } from "@/lib/case-studies";
import { Logo } from "@/components/logo";
import { NavDropdown } from "@/components/nav-dropdown";
import { CursorGlow } from "@/components/motion/cursor-glow";

const mono = { fontFamily: "var(--font-mono)" } as const;

export function LumaShell({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const t = ui[lang];

  return (
    <div className="isolate min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
      <CursorGlow />
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link
            to="/"
            aria-label={t.name.full}
            className="flex items-center gap-[10px] text-foreground hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <Logo title={t.name.full} height={22} width={17} aria-hidden="false" />
            <span className="hidden sm:inline text-xs tracking-[0.14em] uppercase" style={mono}>
              {t.name.full}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <NavDropdown
              label={t.nav.work}
              items={[
                { type: "route", to: "/", hash: "work", label: t.navDropdowns.work.all, summary: t.navDropdowns.work.allSummary },
                ...caseStudies.slice(0, 3).map((c) => ({
                  type: "route" as const,
                  to: "/work/$slug" as const,
                  params: { slug: c.slug },
                  label: c.title,
                  summary: c.tagline,
                })),
              ]}
            />
            <a href="/#capabilities" className="underline decoration-1 underline-offset-4 decoration-border hover:text-foreground hover:decoration-2 hover:decoration-foreground transition-colors">{t.nav.capabilities}</a>
            <NavDropdown
              label={t.nav.projects}
              items={[
                { type: "route", to: "/luma", label: t.navDropdowns.projects.luma, summary: t.navDropdowns.projects.lumaSummary },
              ]}
            />
            <a href="/#impact" className="underline decoration-1 underline-offset-4 decoration-border hover:text-foreground hover:decoration-2 hover:decoration-foreground transition-colors">{t.nav.impact}</a>
            <a href="/#contact" className="underline decoration-1 underline-offset-4 decoration-border hover:text-foreground hover:decoration-2 hover:decoration-foreground transition-colors">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={`Switch language to ${lang === "tr" ? "English" : "Türkçe"}`}
              className="inline-flex items-center justify-center min-h-9 px-2 border border-border text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              style={mono}
            >
              {lang === "tr" ? "EN" : "TR"}
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              aria-pressed={theme === "light"}
              className="inline-flex items-center justify-center min-h-9 min-w-9 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              {theme === "light" ? (
                <Moon aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
              ) : (
                <Sun aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="border-t border-border py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground uppercase tracking-widest" style={mono}>
          <div className="flex items-center gap-4">
            <Logo title={t.name.full} height={18} width={14} className="text-muted-foreground" />
            <span>© 2026 {t.name.full}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/luma/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/luma/support" className="hover:text-foreground transition-colors">Support</Link>
            <Link to="/luma/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function LumaLegalPage({
  label,
  title,
  intro,
  updated,
  sections,
  backLabel,
}: {
  label: string;
  title: string;
  intro: string;
  updated: string;
  sections: { h: string; p: string[] }[];
  backLabel: string;
}) {
  return (
    <LumaShell>
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/luma"
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
            style={mono}
          >
            {backLabel}
          </Link>
          <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground" style={mono}>
            <span className="w-8 h-px bg-foreground" />
            <span>{label}</span>
          </div>
          <h1
            className="mt-8 font-normal leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
          >
            {title}
          </h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground" style={mono}>{updated}</p>
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)" }}>
            {intro}
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((s, i) => (
            <article key={s.h}>
              <div className="text-xs text-muted-foreground tracking-[0.3em]" style={mono}>
                / {String(i + 1).padStart(2, "0")}
              </div>
              <h2 className="mt-4 text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{s.h}</h2>
              <div className="mt-4 space-y-4">
                {s.p.map((para, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed">{para}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </LumaShell>
  );
}
