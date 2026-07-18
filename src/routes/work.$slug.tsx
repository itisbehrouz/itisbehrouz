import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { caseStudies, getCaseStudy, type CaseStudy } from "@/lib/case-studies";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Case study not found" }, { name: "robots", content: "noindex" }] };
    }
    const { study } = loaderData;
    const title = `${study.title} — Behrouz Bagherzadeh`;
    return {
      meta: [
        { title },
        { name: "description", content: study.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: study.tagline },
      ],
    };
  },
  component: CaseStudyPage,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-md text-center">
        <div className="text-xs tracking-[0.3em] uppercase text-[var(--ember)]" style={{ fontFamily: "var(--font-mono)" }}>
          / 404
        </div>
        <h1 className="mt-6 text-4xl md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
          Case study not found.
        </h1>
        <Link to="/" className="inline-block mt-8 text-sm text-[var(--ember)] border-b border-[var(--ember)]/40 pb-1">
          ← Back to portfolio
        </Link>
      </div>
    </div>
  );
}

function CaseStudyPage() {
  const { study } = Route.useLoaderData() as { study: CaseStudy };
  const currentIdx = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(currentIdx + 1) % caseStudies.length];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-[var(--ember)] transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
            ← BB — 001
          </Link>
          <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
            Case · {study.index}
          </div>
          <Link to="/" hash="contact" className="text-xs px-3 py-1.5 border border-[var(--ember)]/40 text-[var(--ember)] hover:bg-[var(--ember)] hover:text-primary-foreground transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
            GET IN TOUCH
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, var(--ember) 0, transparent 50%)" }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="w-8 h-px bg-[var(--ember)]" />
            <span>Case {study.index} · {study.client}</span>
          </div>
          <h1 className="font-normal leading-[0.95] tracking-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}>
            {study.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl md:text-2xl leading-relaxed text-foreground/85" style={{ fontFamily: "var(--font-display)" }}>
            {study.tagline}
          </p>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            <Meta label="Client" value={study.client} />
            <Meta label="Role" value={study.role} />
            <Meta label="Period" value={study.period} />
            <Meta label="Location" value={study.location} />
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <figure className="relative overflow-hidden border border-border">
            <img
              src={study.cover}
              alt={`${study.title} — visual`}
              width={1600}
              height={1000}
              className="w-full h-auto object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-foreground/70 bg-background/60 backdrop-blur px-2 py-1" style={{ fontFamily: "var(--font-mono)" }}>
              Fig. {study.index} — {study.client}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <SectionLabel index="A" title="Overview" />
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <p className="text-xl md:text-2xl leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)" }}>
              {study.overview}
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <span key={s} className="text-xs uppercase tracking-wider px-3 py-1.5 border border-border text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <SectionLabel index="B" title="Challenges" />
          </div>
          <ul className="md:col-span-8 md:col-start-5 divide-y divide-border">
            {study.challenges.map((c, i) => (
              <li key={i} className="py-6 flex gap-6">
                <span className="text-xs text-[var(--ember)] tracking-widest pt-2" style={{ fontFamily: "var(--font-mono)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg md:text-xl leading-relaxed text-foreground/85" style={{ fontFamily: "var(--font-display)" }}>
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <SectionLabel index="C" title="Approach" />
          </div>
          <ol className="md:col-span-8 md:col-start-5 space-y-8">
            {study.approach.map((a, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-6 items-start">
                <span className="text-4xl md:text-5xl text-[var(--ember)] leading-none" style={{ fontFamily: "var(--font-display)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg md:text-xl leading-relaxed text-foreground/90 pt-2">
                  {a}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="D" title="Outcomes" />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border-y border-border">
            {study.outcomes.map((o) => (
              <div key={o.label} className="bg-background p-10 md:p-14">
                <div className="text-6xl md:text-7xl font-normal text-[var(--ember)] leading-none" style={{ fontFamily: "var(--font-display)" }}>
                  {o.value}
                </div>
                <div className="mt-5 text-sm text-muted-foreground max-w-[24ch]">{o.label}</div>
              </div>
            ))}
          </div>

          <blockquote className="mt-20 max-w-4xl border-l-2 border-[var(--ember)] pl-6 md:pl-10">
            <p className="text-2xl md:text-3xl leading-relaxed italic text-foreground/90" style={{ fontFamily: "var(--font-display)" }}>
              "{study.reflection}"
            </p>
            <footer className="mt-6 text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
              — Behrouz Bagherzadeh, on the project
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Next case */}
      <section className="border-t border-border">
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group block py-20 md:py-32 px-6 md:px-10 hover:bg-card transition-colors"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                Next case · {next.index}
              </div>
              <h2 className="mt-4 font-normal tracking-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 6vw, 5rem)" }}>
                {next.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--ember)]">{next.client}</p>
            </div>
            <div className="text-[var(--ember)] text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform" style={{ fontFamily: "var(--font-mono)" }}>
              Read →
            </div>
          </div>
        </Link>
      </section>

      <footer className="border-t border-border py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
          <Link to="/" className="hover:text-[var(--ember)] transition-colors">← All work</Link>
          <div>© 2026 Behrouz Bagherzadeh · Istanbul</div>
        </div>
      </footer>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{label}</div>
      <div className="mt-2 text-base md:text-lg text-foreground" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
    </div>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="md:sticky md:top-24">
      <span className="text-xs text-[var(--ember)] tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)" }}>
        / {index}
      </span>
      <h2 className="mt-3 text-3xl md:text-4xl font-normal tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
    </div>
  );
}