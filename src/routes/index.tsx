import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CASE_CATEGORIES, caseStudies, type CaseCategory } from "@/lib/case-studies";
import { useTheme } from "@/hooks/use-theme";
import { useLang } from "@/hooks/use-lang";
import { ui, metricsI18n, capabilitiesI18n, experienceI18n, educationI18n, certificationsI18n, tCase } from "@/lib/i18n";
import { submitContact, type ContactFormData } from "@/lib/contact.functions";
import { CaseCover } from "@/components/case-cover";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { CountUp } from "@/components/motion/count-up";
import { HeroLineMotif } from "@/components/motion/hero-line-motif";
import { TiltCard } from "@/components/motion/tilt-card";

const LINKEDIN_URL = "https://www.linkedin.com/in/itisbehrouz";
const CV_URL = "/cv/behrouz-bagherzadeh-cv.pdf";
const CALL_URL = "https://calendar.app.google/Ez1RC2T2CYESgqN8A";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.82-1.95 3.75-1.95C21.1 8.75 22 11 22 14.1V21h-4v-6.1c0-1.5-.55-2.5-1.9-2.5-1.15 0-1.85.77-2.15 1.52-.1.27-.13.64-.13 1.02V21h-4z" />
    </svg>
  );
}

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => {
    const url = `${SITE_URL}/`;
    const ogImage = absoluteUrl("/og-image.png");
    const personLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Behrouz Bagherzadeh",
      jobTitle: "Digital Transformation & BI Manager",
      url,
      address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" },
      sameAs: ["https://www.linkedin.com/in/itisbehrouz"],
    };
    const websiteLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Behrouz Bagherzadeh — Portfolio",
      url,
    };
    return {
      meta: [
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(personLd) },
        { type: "application/ld+json", children: JSON.stringify(websiteLd) },
      ],
    };
  },
});

function Portfolio() {
  const [category, setCategory] = useState<CaseCategory | "All">("All");
  const reduced = useReducedMotion();
  const { theme, toggle } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const t = ui[lang];
  const metrics = metricsI18n[lang];
  const capabilities = capabilitiesI18n[lang];
  const experience = experienceI18n[lang];
  const education = educationI18n[lang];
  const certifications = certificationsI18n[lang];

  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const chipValues = ["All", ...CASE_CATEGORIES] as const;

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(
      z.object({
        name: z.string().trim().min(2, t.errors.nameReq).max(100, t.errors.nameLong),
        email: z.string().trim().email(t.errors.emailInv).max(255, t.errors.emailLong),
        subject: z.string().trim().min(2, t.errors.subjectReq).max(200, t.errors.subjectLong),
        message: z.string().trim().min(10, t.errors.messageMin).max(2000, t.errors.messageMax),
      }),
    ),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const onContactSubmit = async (data: ContactFormData) => {
    setContactStatus("submitting");
    try {
      await submitContact({ data });
      setContactStatus("success");
      contactForm.reset();
    } catch {
      setContactStatus("error");
    }
  };

  const handleChipKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = chipValues.length - 1;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    const btn = chipRefs.current[next];
    if (btn) {
      btn.focus();
      setCategory(chipValues[next]);
    }
  };

  const filteredCases = useMemo(() => {
    if (category === "All") return caseStudies;
    return caseStudies.filter((c) => c.category === category);
  }, [category]);

  const catLabel = (c: string) => (c === "All" ? t.work.all : t.categories[c] ?? c);

  const heroContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.85 } },
  };
  const heroItem = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
      };
  const lineVariant = reduced
    ? { hidden: { y: "0%", opacity: 1 }, show: { y: "0%", opacity: 1 } }
    : {
        hidden: { y: "110%", opacity: 0 },
        show: { y: "0%", opacity: 1, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
      };

  return (
    <div className="isolate min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
      <CursorGlow />
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
            BB — 001
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#work" className="hover:text-foreground transition-colors">{t.nav.work}</a>
            <a href="#capabilities" className="hover:text-foreground transition-colors">{t.nav.capabilities}</a>
            <a href="#impact" className="hover:text-foreground transition-colors">{t.nav.impact}</a>
            <a href="#contact" className="hover:text-foreground transition-colors">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={`Switch language to ${lang === "tr" ? "English" : "Türkçe"}`}
              title={`Switch language to ${lang === "tr" ? "English" : "Türkçe"}`}
              className="inline-flex items-center justify-center min-h-9 px-2 border border-border text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {lang === "tr" ? "EN" : "TR"}
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              aria-pressed={theme === "light"}
              title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              className="inline-flex items-center justify-center min-h-9 min-w-9 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <span aria-hidden="true" className="text-sm">{theme === "light" ? "☾" : "☀"}</span>
            </button>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
              className="inline-flex items-center justify-center min-h-9 min-w-9 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <LinkedInIcon />
            </a>
            <a href="#contact" className="hidden sm:inline-block text-xs px-3 py-1.5 border border-foreground/40 text-foreground hover:bg-foreground hover:text-background transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
              {t.nav.getInTouch}
            </a>
          </div>
        </div>
      </header>

      <main id="main">
      <section id="top" className="relative pt-40 pb-24 md:pt-48 md:pb-32 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, var(--muted-foreground) 0, transparent 50%), radial-gradient(circle at 80% 70%, var(--muted-foreground) 0, transparent 40%)" }} />
        <HeroLineMotif className="hero-motif" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="w-8 h-px bg-foreground" />
            <span>{t.hero.location}</span>
          </motion.div>
          <motion.h1
            className="font-normal leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" variants={lineVariant}>Behrouz</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" variants={lineVariant}>
                <span className="italic text-foreground">Bagher</span>zadeh
              </motion.span>
            </span>
            <span className="sr-only">{t.hero.srSuffix}</span>
          </motion.h1>
          <motion.div initial="hidden" animate="show" variants={heroContainer}>
            <div className="mt-12 grid md:grid-cols-12 gap-8">
              <motion.p variants={heroItem} className="md:col-span-7 text-xl md:text-2xl leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)" }}>
                {t.hero.intro(t.hero.years)}
              </motion.p>
              <div className="md:col-span-4 md:col-start-9 space-y-3 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                {[
                  { k: t.hero.role, v: t.hero.roleVal },
                  { k: t.hero.based, v: t.hero.basedVal },
                  { k: t.hero.langs, v: t.hero.langsVal },
                  { k: t.hero.scope, v: t.hero.scopeVal },
                  { k: t.hero.status, v: t.hero.statusVal, ember: true },
                ].map((r) => (
                  <motion.div key={r.k} variants={heroItem}>
                    <Row k={r.k} v={r.v} ember={r.ember} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="impact" className="border-y border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.09} className={`py-10 md:py-14 px-4 ${i > 0 ? "md:border-l border-border" : ""} ${i === 1 || i === 3 ? "border-l border-border" : ""} ${i >= 2 ? "border-t md:border-t-0 border-border" : ""}`}>
              <CountUp value={m.value} className="block text-5xl md:text-6xl font-normal text-foreground" style={{ fontFamily: "var(--font-display)" }} />
              <div className="mt-3 text-sm text-muted-foreground max-w-[18ch]">{m.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="capabilities" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="02" title={t.sections.capabilities} />
          <div className="mt-12 grid md:grid-cols-2 gap-px bg-border">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.1} className="bg-background p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: "var(--font-display)" }}>{c.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {c.items.map((it) => (
                    <li key={it} className="text-xs uppercase tracking-wider px-3 py-1.5 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-mono)" }}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="03" title={t.sections.caseStudies} />
          <p className="mt-6 max-w-2xl text-muted-foreground">{t.work.intro}</p>

          <div role="group" aria-labelledby="work-filters-label" className="mt-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
            <span id="work-filters-label" className="sr-only">{t.work.filterLabel}</span>
            <div role="radiogroup" aria-label={t.work.filterLabel} className="flex flex-wrap gap-2">
              {chipValues.map((cat, i) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    ref={(el) => { chipRefs.current[i] = el; }}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setCategory(cat)}
                    onKeyDown={(e) => handleChipKeyDown(e, i)}
                    className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
                      active ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {catLabel(cat)}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredCases.length === 0 ? (
            <div className="mt-10 border border-dashed border-border p-10 text-center text-muted-foreground">
              {t.work.noMatches}{" "}
              <button
                type="button"
                onClick={() => setCategory("All")}
                className="text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                {t.work.reset}
              </button>
            </div>
          ) : (
          <div className="mt-10 grid md:grid-cols-2 gap-px bg-border border-y border-border">
            {filteredCases.map((c, i) => {
              const loc = tCase(lang, c.slug);
              return (
              <Reveal key={c.slug} delay={(i % 2) * 0.1} className="bg-background">
              <TiltCard className="h-full">
              <Link to="/work/$slug" params={{ slug: c.slug }} className="group bg-background p-8 md:p-10 hover:bg-card transition-colors block h-full">
                <div className="relative overflow-hidden border border-border aspect-[16/10]">
                  <CaseCover slug={c.slug} className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="text-xs text-foreground tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>/ {c.index}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                    {c.client} · {c.period} · {t.categories[c.category] ?? c.category}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl md:text-3xl leading-tight group-hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-display)" }}>{loc?.title ?? c.title}</h3>
                <p className="mt-3 text-base text-foreground/80">{loc?.tagline ?? c.tagline}</p>
                <div className="mt-6 text-xs tracking-[0.3em] uppercase text-foreground group-hover:translate-x-1 transition-transform inline-flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>{t.work.readCase}</div>
              </Link>
              </TiltCard>
              </Reveal>
              );
            })}
          </div>
          )}

          <div className="mt-24"><SectionLabel index="03·b" title={t.sections.careerTimeline} /></div>
          <div className="mt-16 space-y-px bg-border">
            {experience.map((e, i) => (
              <Reveal key={i} as="article" delay={Math.min(i, 4) * 0.06} className="group bg-background hover:bg-card transition-colors py-8 md:py-10 px-2 md:px-6">
                <div className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-2 text-xs uppercase tracking-widest text-muted-foreground pt-2" style={{ fontFamily: "var(--font-mono)" }}>{e.period}</div>
                  <div className="md:col-span-4">
                    <h3 className="text-2xl md:text-3xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>{e.role}</h3>
                    <div className="mt-2 text-sm text-foreground">{e.company}</div>
                    <div className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "var(--font-mono)" }}>{e.location}</div>
                  </div>
                  <ul className="md:col-span-6 space-y-3">
                    {e.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm md:text-base leading-relaxed text-foreground/85">
                        <span className="text-foreground mt-2 shrink-0">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="04" title={t.sections.education} />
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {education.map((e, i) => (
              <Reveal key={i} delay={(i % 2) * 0.1}>
                <EduCard period={e.period} title={e.title} school={e.school} loc={e.loc} />
              </Reveal>
            ))}
          </div>

          <div className="mt-20">
            <SectionLabel index="04·b" title={t.sections.certifications} />
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {certifications.map((c, i) => (
              <Reveal key={i} delay={(i % 2) * 0.1} className="p-8 border border-border hover:border-foreground transition-colors">
                <div className="text-xs text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>{c.status}</div>
                <h3 className="mt-4 text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{c.title}</h3>
                <div className="text-foreground mt-2">{c.issuer}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 md:py-40 px-6 md:px-10 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--muted-foreground) 0, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto relative">
          <SectionLabel index="05" title={t.sections.contact} />
          <div className="mt-12 grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
              <h2 className="font-normal leading-[0.95] tracking-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
                {t.contact.headingA}<span className="italic text-foreground">{t.contact.headingEm}</span>
                <br />
                {t.contact.headingB}
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed">{t.contact.intro}</p>
              </Reveal>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="mb-10 grid sm:grid-cols-2 gap-px bg-border border border-border">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background p-5 group hover:bg-card transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{t.contact.cta.linkedin}</span>
                  <span className="mt-2 flex items-center gap-2 text-sm text-foreground group-hover:text-foreground transition-colors">
                    <LinkedInIcon /> /itisbehrouz
                  </span>
                </a>
                <a
                  href={CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background p-5 group hover:bg-card transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{t.contact.cta.bookCall}</span>
                  <span className="mt-2 block text-sm text-foreground group-hover:text-foreground transition-colors">{t.contact.cta.bookCallVal}</span>
                </a>
              </div>
              <div className="-mt-6 mb-10">
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  {t.contact.cta.cv}
                </a>
              </div>
              {contactStatus === "success" ? (
                <div className="border border-foreground p-8 md:p-10 bg-card/40">
                  <div className="text-xs text-foreground uppercase tracking-[0.3em] mb-4" style={{ fontFamily: "var(--font-mono)" }}>{t.contact.sent}</div>
                  <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-display)" }}>{t.contact.received}</h3>
                  <p className="text-muted-foreground">{t.contact.thanks}</p>
                  <button type="button" onClick={() => setContactStatus("idle")} className="mt-6 text-xs uppercase tracking-widest text-foreground border-b border-foreground/40 pb-1 hover:text-primary hover:border-primary transition-colors" style={{ fontFamily: "var(--font-mono)" }}>{t.contact.sendAnother}</button>
                </div>
              ) : (
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6" aria-label={t.contact.ariaForm}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{t.contact.name}</label>
                      <input id="contact-name" type="text" {...contactForm.register("name")} className="w-full bg-transparent border border-border focus:border-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors" placeholder={t.contact.namePh} aria-invalid={!!contactForm.formState.errors.name} aria-describedby={contactForm.formState.errors.name ? "contact-name-error" : undefined} />
                      {contactForm.formState.errors.name && (<p id="contact-name-error" className="text-xs text-destructive-foreground" style={{ fontFamily: "var(--font-mono)" }}>{contactForm.formState.errors.name.message}</p>)}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{t.contact.email}</label>
                      <input id="contact-email" type="email" {...contactForm.register("email")} className="w-full bg-transparent border border-border focus:border-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors" placeholder={t.contact.emailPh} aria-invalid={!!contactForm.formState.errors.email} aria-describedby={contactForm.formState.errors.email ? "contact-email-error" : undefined} />
                      {contactForm.formState.errors.email && (<p id="contact-email-error" className="text-xs text-destructive-foreground" style={{ fontFamily: "var(--font-mono)" }}>{contactForm.formState.errors.email.message}</p>)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{t.contact.subject}</label>
                    <input id="contact-subject" type="text" {...contactForm.register("subject")} className="w-full bg-transparent border border-border focus:border-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors" placeholder={t.contact.subjectPh} aria-invalid={!!contactForm.formState.errors.subject} aria-describedby={contactForm.formState.errors.subject ? "contact-subject-error" : undefined} />
                    {contactForm.formState.errors.subject && (<p id="contact-subject-error" className="text-xs text-destructive-foreground" style={{ fontFamily: "var(--font-mono)" }}>{contactForm.formState.errors.subject.message}</p>)}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{t.contact.message}</label>
                    <textarea id="contact-message" {...contactForm.register("message")} rows={5} className="w-full bg-transparent border border-border focus:border-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors resize-none" placeholder={t.contact.messagePh} aria-invalid={!!contactForm.formState.errors.message} aria-describedby={contactForm.formState.errors.message ? "contact-message-error" : undefined} />
                    {contactForm.formState.errors.message && (<p id="contact-message-error" className="text-xs text-destructive-foreground" style={{ fontFamily: "var(--font-mono)" }}>{contactForm.formState.errors.message.message}</p>)}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                    <button type="submit" disabled={contactStatus === "submitting"} className="inline-flex items-center justify-center text-xs uppercase tracking-[0.2em] px-6 py-3 border border-foreground bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                      {contactStatus === "submitting" ? t.contact.submitting : t.contact.submit}
                    </button>
                    {contactStatus === "error" && (<p className="text-sm text-destructive-foreground" role="alert">{t.contact.errorMsg}</p>)}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      </main>
      <footer className="border-t border-border py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
          <div className="flex items-center gap-4">
            <span>© 2026 Behrouz Bagherzadeh</span>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <LinkedInIcon />
            </a>
          </div>
          <div>{t.footerLoc}</div>
        </div>
      </footer>
    </div>
  );
}

function Row({ k, v, ember }: { k: string; v: string; ember?: boolean }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-2 last:border-b-0">
      <span className="whitespace-nowrap">{k}</span>
      <span className={`min-w-0 text-right text-[0.85em] sm:text-[0.95em] sm:whitespace-nowrap ${ember ? "text-foreground" : "text-foreground"}`}>{v}</span>
    </div>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-6">
      <span className="text-xs text-foreground tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>/ {index}</span>
      <h2 className="text-4xl md:text-6xl font-normal tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{title}</h2>
    </div>
  );
}

function EduCard({ period, title, school, loc }: { period: string; title: string; school: string; loc: string }) {
  return (
    <div className="p-8 border border-border hover:border-foreground transition-colors">
      <div className="text-xs text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>{period}</div>
      <h3 className="mt-4 text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      <div className="text-foreground mt-2">{school}</div>
      <div className="text-sm text-muted-foreground mt-1">{loc}</div>
    </div>
  );
}
