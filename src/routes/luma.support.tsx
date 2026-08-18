import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useLang } from "@/hooks/use-lang";
import { useLocalizedMeta } from "@/hooks/use-localized-meta";
import { lumaI18n, ui } from "@/lib/i18n";
import { LumaShell } from "@/components/luma/luma-shell";
import { ContactDialog } from "@/components/contact-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/luma/support")({
  component: LumaSupportPage,
  head: () => {
    const url = `${SITE_URL}/luma/support`;
    const title = "Luma — Support & FAQ";
    const desc = "Support, frequently asked questions and contact form for Luma, the ambient display app for Apple tvOS.";
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

function LumaSupportPage() {
  const { theme } = useTheme();
  const { lang } = useLang();
  const t = ui[lang];
  const l = lumaI18n[lang];
  const [contactOpen, setContactOpen] = useState(false);
  useLocalizedMeta(l.support.metaTitle, l.support.metaDesc);

  return (
    <LumaShell>
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/luma"
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
            style={mono}
          >
            {l.backApp}
          </Link>
          <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground" style={mono}>
            <span className="w-8 h-px bg-foreground" />
            <span>{l.name} · {l.support.title}</span>
          </div>
          <h1
            className="mt-8 font-normal leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
          >
            {l.support.title}
          </h1>
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)" }}>
            {l.support.intro}
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground" style={mono}>{l.support.faqLabel}</span>
          <Accordion type="single" collapsible className="mt-8 border-t border-border">
            {l.support.faq.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-lg md:text-xl" style={{ fontFamily: "var(--font-display)" }}>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-10 border-t border-border">
        <div className="max-w-3xl mx-auto">
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
          <div className="mt-12 flex flex-wrap gap-6 text-xs uppercase tracking-widest text-muted-foreground" style={mono}>
            <Link to="/luma/privacy" className="hover:text-foreground transition-colors">{l.privacyLink}</Link>
            <Link to="/luma/terms" className="hover:text-foreground transition-colors">{l.termsLink}</Link>
          </div>
        </div>
      </section>
    </LumaShell>
  );
}
