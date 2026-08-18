import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { ui } from "@/lib/i18n";
import { caseStudies } from "@/lib/case-studies";

const mono = { fontFamily: "var(--font-mono)" } as const;

export function MobileNav({
  hashPrefix = "",
  onGetInTouch,
}: {
  /** "" on the homepage (plain hash links), "/" elsewhere (absolute hash links). */
  hashPrefix?: "" | "/";
  onGetInTouch?: () => void;
}) {
  const { lang } = useLang();
  const t = ui[lang];
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  const sectionClass =
    "block py-3 border-b border-border/60 text-xs uppercase tracking-widest text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center min-h-9 min-w-9 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        {open ? (
          <X aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
        ) : (
          <Menu aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
        )}
      </button>

      {mounted && open && createPortal(
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          className="fixed left-0 right-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-border bg-background/95 backdrop-blur-xl px-6 py-6"
        >
          <nav aria-label={t.nav.openMenu}>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground" style={mono}>
              {t.nav.work}
            </div>
            <p className="mt-2 text-xs leading-snug text-muted-foreground">{t.navDropdowns.work.summary}</p>
            <a href={`${hashPrefix}#work`} onClick={close} className={`${sectionClass} mt-3`} style={mono}>
              {t.navDropdowns.work.all}
            </a>
            {caseStudies.slice(0, 3).map((c) => (
              <Link
                key={c.slug}
                to="/work/$slug"
                params={{ slug: c.slug }}
                onClick={close}
                className={sectionClass}
                style={mono}
              >
                {c.title}
              </Link>
            ))}

            <div className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground" style={mono}>
              {t.nav.projects}
            </div>
            <p className="mt-2 text-xs leading-snug text-muted-foreground">{t.navDropdowns.projects.summary}</p>
            <Link to="/luma" onClick={close} className={`${sectionClass} mt-3`} style={mono}>
              {t.navDropdowns.projects.luma}
            </Link>

            <div className="mt-8 space-y-0">
              <a href={`${hashPrefix}#capabilities`} onClick={close} className={sectionClass} style={mono}>
                {t.nav.capabilities}
              </a>
              <a href={`${hashPrefix}#impact`} onClick={close} className={sectionClass} style={mono}>
                {t.nav.impact}
              </a>
              <a href={`${hashPrefix}#contact`} onClick={close} className={sectionClass} style={mono}>
                {t.nav.contact}
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                if (onGetInTouch) onGetInTouch();
                else window.location.assign(`${hashPrefix || "/"}#contact`);
              }}
              className="mt-8 w-full text-xs px-3 py-3 border border-foreground/40 text-foreground hover:bg-foreground hover:text-background transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              style={mono}
            >
              {t.nav.getInTouch}
            </button>
          </nav>
        </div>,
        document.body,
      )}
    </div>
  );
}