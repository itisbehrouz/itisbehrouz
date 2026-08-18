import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export type NavDropdownItem =
  | { type: "route"; to: string; hash?: string; params?: Record<string, string>; label: string; summary: string }
  | { type: "external"; href: string; label: string; summary: string };

export function NavDropdown({ label, items }: { label: string; items: NavDropdownItem[] }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };

  const closeMenu = () => {
    timerRef.current = setTimeout(() => setOpen(false), 150);
  };

  const cancelClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        open &&
        panelRef.current &&
        triggerRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open]);

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setTimeout(() => {
        const first = panelRef.current?.querySelector<HTMLElement>("a, button");
        first?.focus();
      }, 0);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleItemKeyDown = (e: KeyboardEvent<HTMLElement>, i: number) => {
    const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusable[i + 1]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (i === 0) {
        triggerRef.current?.focus();
        setOpen(false);
      } else {
        focusable[i - 1]?.focus();
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      focusable[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      focusable[focusable.length - 1]?.focus();
    } else if (e.key === "Tab" && !e.shiftKey && i === focusable.length - 1) {
      setOpen(false);
    } else if (e.key === "Tab" && e.shiftKey && i === 0) {
      setOpen(false);
    }
  };

  const baseItemClass =
    "block px-4 py-3 hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/30 transition-colors";

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
        className="underline decoration-1 underline-offset-4 decoration-border hover:text-foreground hover:decoration-2 hover:decoration-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        {label}
      </button>
      {open && (
        <div
          ref={panelRef}
          role="menu"
          aria-label={label}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 border border-border bg-background/95 backdrop-blur-xl shadow-sm py-2 z-50"
          onMouseEnter={cancelClose}
          onMouseLeave={closeMenu}
        >
          {items.map((item, i) => {
            const content = (
              <span className="block">
                <span
                  className="text-xs uppercase tracking-widest text-foreground block"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.label}
                </span>
                <span className="mt-1 text-xs leading-snug text-muted-foreground block">
                  {item.summary}
                </span>
              </span>
            );
            const commonProps = {
              role: "menuitem",
              tabIndex: 0,
              className: baseItemClass,
              onKeyDown: (e: KeyboardEvent<HTMLElement>) => handleItemKeyDown(e, i),
              onClick: () => setOpen(false),
            } as const;

            return item.type === "route" ? (
              <Link
                key={item.label + item.to}
                to={item.to as never}
                hash={item.hash}
                params={item.params as never}
                {...commonProps}
              >
                {content}
              </Link>
            ) : (
              <a
                key={item.label + item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                {...commonProps}
              >
                {content}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
