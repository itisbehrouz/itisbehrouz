import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useLang } from "@/hooks/use-lang";
import { useLocalizedMeta } from "@/hooks/use-localized-meta";
import { lumaI18n, ui } from "@/lib/i18n";
import { LumaShell } from "@/components/luma/luma-shell";
import { ContactDialog } from "@/components/contact-dialog";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { HeroLineMotif } from "@/components/motion/hero-line-motif";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/luma/")({
  component: LumaPage,
  head: () => {
    const url = `${SITE_URL}/luma`;
    const title = "Luma — Ambient display app for Apple TV";
    const desc =
      "Luma is an ambient display app for Apple tvOS: slow-moving light, time and place on the largest screen in your home.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
});

const mono = { fontFamily: "var(--font-mono)" } as const;

function LumaPage() {
  const { theme } = useTheme();
  const { lang } = useLang();
  const t = ui[lang];
  const l = lumaI18n[lang];
  const [contactOpen, setContactOpen] = useState(false);
  useLocalizedMeta(l.metaTitle, l.metaDesc);

  const meta = [
    { k: l.platform, v: l.platformVal },
    { k: l.category, v: l.categoryVal },
    { k: l.price, v: l.priceVal },
    { k: l.statusLabel, v: l.statusVal },
  ];

  return (
    <LumaShell>
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
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
            style={mono}
          >
            {l.backHome}
          </Link>
          <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground" style={mono}>
            <span className="w-8 h-px bg-foreground" />
            <span>{l.label}</span>
          </div>
          <div className="mt-10 grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7">
              <Reveal>
                <h1
                  className="font-normal leading-[0.95] tracking-tight"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 7rem)" }}
                >
                  {l.name}
                </h1>
                <p className="mt-8 text-xl md:text-2xl leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)" }}>
                  {l.tagline}
                </p>
                <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">{l.subtext}</p>
              </Reveal>
            </div>
            <div className="md:col-span-4 md:col-start-9 space-y-3 text-sm text-muted-foreground" style={mono}>
              {meta.map((r) => (
                <div key={r.k} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-2 last:border-b-0">
                  <span className="whitespace-nowrap">{r.k}</span>
                  <span className="min-w-0 text-right text-[0.85em] sm:text-[0.95em] text-foreground">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-6">
            <span className="text-xs text-muted-foreground tracking-[0.3em]" style={mono}>/ 01</span>
            <h2 className="text-4xl md:text-6xl font-normal tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              {l.featuresLabel}
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-px bg-border">
            {l.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 0.1} className="bg-background">
                <TiltCard className="h-full p-8 md:p-10">
                  <div className="text-xs text-muted-foreground tracking-[0.3em]" style={mono}>
                    / {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-5 text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{f.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-10 border-t border-border bg-card/40">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground" style={mono}>{l.legalLabel}</span>
          </div>
          <div className="md:col-span-7 md:col-start-6 grid sm:grid-cols-3 gap-px bg-border border border-border">
            <Link to="/luma/privacy" className="bg-background p-5 hover:bg-card transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground" style={mono}>01</span>
              <span className="mt-2 block text-sm text-foreground">{l.privacyLink}</span>
            </Link>
            <Link to="/luma/support" className="bg-background p-5 hover:bg-card transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground" style={mono}>02</span>
              <span className="mt-2 block text-sm text-foreground">{l.supportLink}</span>
            </Link>
            <Link to="/luma/terms" className="bg-background p-5 hover:bg-card transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground" style={mono}>03</span>
              <span className="mt-2 block text-sm text-foreground">{l.termsLink}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              {l.support.contactLabel}
            </h2>
            <div className="mt-8">
              <ContactDialog
                theme={theme}
                open={contactOpen}
                onOpenChange={setContactOpen}
                defaultSubject={l.support.contactSubject}
                triggerLabel={t.nav.getInTouch}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </LumaShell>
  );
}
