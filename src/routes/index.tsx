import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { CASE_CATEGORIES, caseStudies, type CaseCategory } from "@/lib/case-studies";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => {
    const url = "https://itisbehrouz.lovable.app/";
    const personLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Behrouz Bagherzadeh",
      jobTitle: "Digital Transformation & BI Manager",
      url,
      sameAs: ["https://linkedin.com/in/itisbehrouz"],
      address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" },
      email: "mailto:itisbehrouz@outlook.com",
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
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(personLd) },
        { type: "application/ld+json", children: JSON.stringify(websiteLd) },
      ],
    };
  },
});

const experience = [
  {
    period: "2022 — 2026",
    role: "Digital Transformation & BI Manager",
    company: "Yiğitoğlu",
    location: "Istanbul",
    bullets: [
      "Led enterprise-wide transformation across 7 international entities, aligning strategy, data, and technology.",
      "Built and led a 5-person transformation & BI team, owning delivery and capability development.",
      "Architected an executive Power BI suite across Finance, HR, Sales, and Supply Chain — cutting manual reporting by 80%.",
      "Directed AI-enabled automation on Microsoft Power Platform, lifting operational productivity by 67%.",
      "Delivered SAP SuccessFactors HR digitalization for 450+ employees across 9 locations.",
      "Launched a company-wide Digital Workplace PWA consolidating ERP, HR, CRM, BI, and IT Service Desk.",
    ],
  },
  {
    period: "2021 — 2022",
    role: "Digital Transformation Analyst",
    company: "Yiğitoğlu",
    location: "Istanbul",
    bullets: [
      "Compressed average transformation delivery from 18 to 6 months — a 67% faster path to impact.",
      "Mapped end-to-end processes across departments to surface automation and digitalization opportunities.",
    ],
  },
  {
    period: "2019 — 2021",
    role: "Digital Transformation Analyst",
    company: "Kiğılı",
    location: "Istanbul",
    bullets: [
      "Integrated e-commerce operations with ERP, streamlining order fulfillment.",
      "Automated inventory & order workflows with Power Automate — cutting manual processing time by 40%.",
      "Supported CRM transformation that lifted customer engagement and marketing effectiveness.",
    ],
  },
  {
    period: "2019",
    role: "E-Commerce Manager",
    company: "Edgers",
    location: "Istanbul",
    bullets: [
      "Built and launched the company's first B2B e-commerce platform end-to-end.",
      "Managed international B2B operations across Iran, the Balkans, Egypt, the US, and multiple African markets.",
    ],
  },
  {
    period: "2018",
    role: "Senior Business Developer",
    company: "Orka Holding — Damat / Tween / D'S",
    location: "Istanbul",
    bullets: [
      "Surfaced new opportunities through market and competitive analysis across multiple retail brands.",
    ],
  },
  {
    period: "2016 — 2017",
    role: "Business Development Specialist",
    company: "Finesse",
    location: "Istanbul",
    bullets: [
      "Developed strategic partnerships and managed client relationships to support expansion.",
    ],
  },
  {
    period: "2013 — 2016",
    role: "IT Engineer → Senior IT Engineer",
    company: "Mercedes-Benz AG",
    location: "Tabriz",
    bullets: [
      "Led enterprise IT infrastructure operations, ensuring high availability and stability.",
      "Implemented security and process improvements, reducing incident resolution time.",
    ],
  },
  {
    period: "2011 — 2013",
    role: "IT System Engineer",
    company: "EghtesadNovin Bank",
    location: "Tabriz",
    bullets: [],
  },
];

const metrics = [
  { value: "80%", label: "Reduction in manual reporting effort" },
  { value: "67%", label: "Lift in operational productivity" },
  { value: "18→6", label: "Months to transformation impact" },
  { value: "7", label: "International entities led" },
];

const capabilities = [
  {
    title: "Transformation & Strategy",
    items: ["Digital Transformation Strategy", "AI Strategy & Adoption", "Change Management", "Business Process Reengineering", "Operating Model Design", "Executive Stakeholder Management"],
  },
  {
    title: "Data & Analytics",
    items: ["Power BI", "Data Strategy & Governance", "KPI Framework Design", "Executive Reporting", "Data Analytics"],
  },
  {
    title: "Automation & Systems",
    items: ["Microsoft Power Platform", "Power Automate", "ERP / CRM Integration", "SAP SuccessFactors", "E-Commerce & B2B Platforms", "IT Infrastructure"],
  },
  {
    title: "Leadership",
    items: ["Team Building", "Cross-Functional Leadership", "Multi-Entity Delivery", "Project Management", "Requirements Analysis"],
  },
];

function Portfolio() {
  const [category, setCategory] = useState<CaseCategory | "All">("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const { theme, toggle } = useTheme();
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const chipValues = ["All", ...CASE_CATEGORIES] as const;

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
    return caseStudies.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (!q) return true;
      const hay = [c.title, c.tagline, c.client, c.overview, c.category, ...c.stack]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [category, q]);

  const filteredExperience = useMemo(() => {
    if (!q) return experience;
    return experience.filter((e) =>
      [e.role, e.company, e.location, e.period, ...e.bullets]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-[var(--ember)] transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
            BB — 001
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#work" className="hover:text-[var(--ember)] transition-colors">Work</a>
            <a href="#capabilities" className="hover:text-[var(--ember)] transition-colors">Capabilities</a>
            <a href="#impact" className="hover:text-[var(--ember)] transition-colors">Impact</a>
            <a href="#contact" className="hover:text-[var(--ember)] transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              aria-pressed={theme === "light"}
              title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              className="inline-flex items-center justify-center min-h-9 min-w-9 border border-border text-muted-foreground hover:text-[var(--ember)] hover:border-[var(--ember)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span aria-hidden="true" className="text-sm">
                {theme === "light" ? "☾" : "☀"}
              </span>
            </button>
            <a href="mailto:itisbehrouz@outlook.com" className="hidden sm:inline-block text-xs px-3 py-1.5 border border-[var(--ember)]/40 text-[var(--ember)] hover:bg-[var(--ember)] hover:text-primary-foreground transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
              GET IN TOUCH
            </a>
          </div>
        </div>
      </header>

      <main id="main">
      <section id="top" className="relative pt-40 pb-24 md:pt-48 md:pb-32 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, var(--ember) 0, transparent 50%), radial-gradient(circle at 80% 70%, var(--ember) 0, transparent 40%)" }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="w-8 h-px bg-[var(--ember)]" />
            <span>Portfolio · Istanbul, TR</span>
          </div>
          <h1
            className="font-normal leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
          >
            Behrouz
            <br />
            <span className="italic text-[var(--ember)]">Bagher</span>zadeh
            <span className="sr-only"> — Digital Transformation & BI Leader</span>
          </h1>
          <div className="mt-12 grid md:grid-cols-12 gap-8">
            <p className="md:col-span-7 text-xl md:text-2xl leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)" }}>
              Digital transformation & business intelligence leader with{" "}
              <span className="text-[var(--ember)]">15+ years</span> bridging enterprise technology and business strategy — turning AI and analytics investments into outcomes leadership can measure.
            </p>
            <div className="md:col-span-4 md:col-start-9 space-y-3 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
              <Row k="ROLE" v="DX & BI Manager" />
              <Row k="BASED" v="Istanbul, TR" />
              <Row k="LANGS" v="TR · FA · AZ · EN" />
              <Row k="STATUS" v="Open to leadership roles" ember />
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="border-y border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`py-10 md:py-14 px-4 ${i > 0 ? "md:border-l border-border" : ""} ${i === 1 || i === 3 ? "border-l border-border" : ""} ${i >= 2 ? "border-t md:border-t-0 border-border" : ""}`}
            >
              <div className="text-5xl md:text-6xl font-normal text-[var(--ember)]" style={{ fontFamily: "var(--font-display)" }}>
                {m.value}
              </div>
              <div className="mt-3 text-sm text-muted-foreground max-w-[18ch]">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="02" title="Capabilities" />
          <div className="mt-12 grid md:grid-cols-2 gap-px bg-border">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-background p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  {c.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {c.items.map((it) => (
                    <li key={it} className="text-xs uppercase tracking-wider px-3 py-1.5 border border-border text-muted-foreground hover:border-[var(--ember)] hover:text-[var(--ember)] transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="03" title="Case Studies" />
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Four projects that turned enterprise ambition into measurable outcomes.
          </p>

          <div
            role="group"
            aria-labelledby="work-filters-label"
            className="mt-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8"
          >
            <span id="work-filters-label" className="sr-only">
              Filter and search case studies
            </span>
            <div
              role="radiogroup"
              aria-label="Filter case studies by category"
              className="flex flex-wrap gap-2"
            >
              {chipValues.map((cat, i) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    ref={(el) => {
                      chipRefs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setCategory(cat)}
                    onKeyDown={(e) => handleChipKeyDown(e, i)}
                    className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      active
                        ? "border-[var(--ember)] bg-[var(--ember)] text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-[var(--ember)] hover:text-[var(--ember)]"
                    }`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <div className="relative lg:ml-auto lg:w-80">
              <label htmlFor="work-search" className="sr-only">
                Search case studies and roles
              </label>
              <input
                id="work-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && query) {
                    e.preventDefault();
                    setQuery("");
                  }
                }}
                placeholder="Search projects, tools, outcomes…"
                aria-describedby="work-search-hint work-results-count"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent border border-border focus:border-[var(--ember)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              />
              <span id="work-search-hint" className="sr-only">
                Press Escape to clear the search.
              </span>
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  aria-controls="work-search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center min-h-8 min-w-8 text-base text-muted-foreground hover:text-[var(--ember)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </div>
          </div>

          <div
            id="work-results-count"
            role="status"
            aria-live="polite"
            className="mt-4 text-xs uppercase tracking-widest text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {filteredCases.length} {filteredCases.length === 1 ? "case" : "cases"}
            {category !== "All" ? ` · ${category}` : ""}
            {q ? ` · "${query}"` : ""}
          </div>

          {filteredCases.length === 0 ? (
            <div className="mt-10 border border-dashed border-border p-10 text-center text-muted-foreground">
              No case studies match your filters.{" "}
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
                className="text-[var(--ember)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Reset
              </button>
            </div>
          ) : (
          <div className="mt-10 grid md:grid-cols-2 gap-px bg-border border-y border-border">
            {filteredCases.map((c) => (
              <Link
                key={c.slug}
                to="/work/$slug"
                params={{ slug: c.slug }}
                className="group bg-background p-8 md:p-10 hover:bg-card transition-colors block"
              >
                <div className="relative overflow-hidden border border-border aspect-[16/10]">
                  <img
                    src={c.cover}
                    alt={c.title}
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="text-xs text-[var(--ember)] tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>
                    / {c.index}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                    {c.client} · {c.period} · {c.category}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl md:text-3xl leading-tight group-hover:text-[var(--ember)] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {c.title}
                </h3>
                <p className="mt-3 text-base text-foreground/80">{c.tagline}</p>
                <div className="mt-6 text-xs tracking-[0.3em] uppercase text-[var(--ember)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  Read case →
                </div>
              </Link>
            ))}
          </div>
          )}

          <div className="mt-24">
            <SectionLabel index="03·b" title="Career Timeline" />
          </div>
          {filteredExperience.length === 0 ? (
            <div className="mt-10 border border-dashed border-border p-10 text-center text-muted-foreground">
              No roles match "{query}".
            </div>
          ) : (
          <div className="mt-16 space-y-px bg-border">
            {filteredExperience.map((e, i) => (
              <article key={i} className="group bg-background hover:bg-card transition-colors py-8 md:py-10 px-2 md:px-6">
                <div className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-2 text-xs uppercase tracking-widest text-muted-foreground pt-2" style={{ fontFamily: "var(--font-mono)" }}>
                    {e.period}
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-2xl md:text-3xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                      {e.role}
                    </h3>
                    <div className="mt-2 text-sm text-[var(--ember)]">{e.company}</div>
                    <div className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "var(--font-mono)" }}>{e.location}</div>
                  </div>
                  <ul className="md:col-span-6 space-y-3">
                    {e.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm md:text-base leading-relaxed text-foreground/85">
                        <span className="text-[var(--ember)] mt-2 shrink-0">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          )}
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="04" title="Education" />
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <EduCard period="2023 — 2024" title="Digital Transformation Leadership" school="Boston University · MicroMasters" loc="Boston, USA (Online)" />
            <EduCard period="2010 — 2014" title="Computer & Information Systems Security" school="University of Applied Science and Technology · BASc" loc="Tabriz, Iran" />
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 md:py-40 px-6 md:px-10 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--ember) 0, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto relative">
          <SectionLabel index="05" title="Contact" />
          <h2 className="mt-12 font-normal leading-[0.95] tracking-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
            Let's build the <span className="italic text-[var(--ember)]">next</span>
            <br />
            transformation.
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <ContactItem label="Email" value="itisbehrouz@outlook.com" href="mailto:itisbehrouz@outlook.com" />
            <ContactItem label="Phone" value="+90 553 678 4486" href="tel:+905536784486" />
            <ContactItem label="LinkedIn" value="linkedin.com/in/itisbehrouz" href="https://linkedin.com/in/itisbehrouz" />
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
          <div>© 2026 Behrouz Bagherzadeh</div>
          <div>Istanbul · Türkiye</div>
        </div>
      </footer>
      </main>
    </div>
  );
}

function Row({ k, v, ember }: { k: string; v: string; ember?: boolean }) {
  return (
    <div className="flex justify-between border-b border-border pb-2 last:border-b-0">
      <span>{k}</span>
      <span className={ember ? "text-[var(--ember)]" : "text-foreground"}>{v}</span>
    </div>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-6">
      <span className="text-xs text-[var(--ember)] tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>
        / {index}
      </span>
      <h2 className="text-4xl md:text-6xl font-normal tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
    </div>
  );
}

function EduCard({ period, title, school, loc }: { period: string; title: string; school: string; loc: string }) {
  return (
    <div className="p-8 border border-border hover:border-[var(--ember)] transition-colors">
      <div className="text-xs text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>{period}</div>
      <h3 className="mt-4 text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      <div className="text-[var(--ember)] mt-2">{school}</div>
      <div className="text-sm text-muted-foreground mt-1">{loc}</div>
    </div>
  );
}

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a href={href} className="group block border-t border-border pt-6 hover:border-[var(--ember)] transition-colors">
      <div className="text-xs text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>{label}</div>
      <div className="mt-2 text-lg md:text-xl text-foreground group-hover:text-[var(--ember)] transition-colors break-all" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
    </a>
  );
}