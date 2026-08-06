import { useEffect, useState } from "react";
import { useLang } from "@/hooks/use-lang";
import { ui } from "@/lib/i18n";

const STORAGE_KEY = "cookie-consent";
export type CookieConsent = "accepted" | "rejected";

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

const mono = { fontFamily: "var(--font-mono)" } as const;
const btn =
  "text-[0.65rem] uppercase tracking-[0.2em] px-4 py-2 border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export function CookieConsent() {
  const { lang } = useLang();
  const t = ui[lang].cookie;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);
  }, []);

  const decide = (choice: CookieConsent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
      window.localStorage.setItem(`${STORAGE_KEY}-at`, new Date().toISOString());
    } catch {
      /* storage unavailable — banner simply reappears next visit */
    }
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: choice }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={t.aria}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground" style={mono}>
          {t.text}
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className={`${btn} border-border text-foreground hover:border-foreground`}
            style={mono}
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className={`${btn} border-foreground bg-foreground text-background hover:bg-foreground/90`}
            style={mono}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
