import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLang } from "@/hooks/use-lang";
import { useLocalizedMeta } from "@/hooks/use-localized-meta";
import { ui, advisoryI18n } from "@/lib/i18n";
import { ContactDialog } from "@/components/contact-dialog";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { HeroLineMotif } from "@/components/motion/hero-line-motif";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { Logo } from "@/components/logo";



export const Route = createFileRoute("/advisory")({
  component: AdvisoryPage,
  head: () => ({
    meta: [
      { title: "Advisory & Fractional Leadership — Behrouz Bagherzadeh" },
      {
        name: "description",
        content:
          "Selective advisory and fractional leadership engagements in digital transformation, BI and AI-driven process automation.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const mono = { fontFamily: "var(--font-mono)" } as const;

function AdvisoryPage() {
  const { theme, toggle } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const t = ui[lang];
  const a = advisoryI18n[lang];
  const [contactOpen, setContactOpen] = useState(false);
  useLocalizedMeta(a.metaTitle, a.metaDesc);

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

      <main id="main">
        <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 md:px-10 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, var(--muted-foreground) 0, transparent 50%), radial-gradient(circle at 80% 70%, var(--muted-foreground) 0, transparent 40%)",
            }}
          />
          <HeroLineMotif className="hero-motif" />
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10" style={mono}>
              <span className="w-8 h-px bg-foreground" />
              <span>{a.label}</span>
            </div>
            <Reveal>
              <h1
                className="font-normal leading-[0.95] tracking-tight max-w-[24ch]"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
              >
                {a.headline}
              </h1>
              <p className="mt-8 max-w-3xl text-xl md:text-2xl leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)" }}>
                {a.subtext}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 md:py-28 px-6 md:px-10 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground tracking-[0.3em]" style={mono}>/ 01</span>
              <h2 className="text-4xl md:text-6xl font-normal tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {a.servicesLabel}
              </h2>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-px bg-border">
              {a.services.map((s, i) => (
                <Reveal key={s.title} delay={(i % 2) * 0.1} className="bg-background">
                  <TiltCard className="h-full p-8 md:p-10">
                    <div className="text-xs text-muted-foreground tracking-[0.3em]" style={mono}>
                      / {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-5 text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{s.desc}</p>
                    <div className="mt-6 pt-5 border-t border-border">
                      <span className="block text-xs uppercase tracking-widest text-muted-foreground" style={mono}>{a.drawsOn}</span>
                      <span className="mt-2 block text-sm text-foreground">{s.proof}</span>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 px-6 md:px-10 border-t border-border bg-card/40">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground" style={mono}>{a.formatLabel}</span>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <Reveal>
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90">{a.formatText}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 px-6 md:px-10 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {a.ctaLabel}
              </h2>
              <div className="mt-8">
                <ContactDialog
                  theme={theme}
                  open={contactOpen}
                  onOpenChange={setContactOpen}
                  defaultSubject={a.ctaSubject}
                  triggerLabel={t.nav.getInTouch}
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground uppercase tracking-widest" style={mono}>
          <div className="flex items-center gap-4">
            <Logo title={t.name.full} height={18} width={14} className="text-muted-foreground" />
            <span>© 2026 {t.name.full}</span>
          </div>
          <div>{t.footerLoc}</div>
        </div>
      </footer>
    </div>
  );
}
