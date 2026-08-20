import { useEffect, useState } from "react";

export type Lang = "en" | "tr";

const LANG_CHANGE_EVENT = "site-language-change";

function readLang(): Lang {
  if (typeof document === "undefined") return "en";
  const attr = document.documentElement.getAttribute("data-lang");
  return attr === "tr" ? "tr" : "en";
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // The blocking head script already resolved stored choice / browser detection
    // and wrote it onto <html>. Just adopt it after hydration.
    const initial = readLang();
    document.documentElement.setAttribute("data-lang", initial);
    document.documentElement.lang = initial;
    setLangState(initial);

    const syncLang = (event: Event) => {
      const next = event instanceof CustomEvent && (event.detail === "tr" || event.detail === "en")
        ? event.detail
        : readLang();
      setLangState(next);
    };
    const syncStoredLang = (event: StorageEvent) => {
      if (event.key === "lang") syncLang(event);
    };

    window.addEventListener(LANG_CHANGE_EVENT, syncLang);
    window.addEventListener("storage", syncStoredLang);
    return () => {
      window.removeEventListener(LANG_CHANGE_EVENT, syncLang);
      window.removeEventListener("storage", syncStoredLang);
    };
  }, []);

  const setLang = (next: Lang) => {
    const root = document.documentElement;
    root.setAttribute("data-lang", next);
    root.lang = next;
    try {
      localStorage.setItem("lang", next);
    } catch {}
    root.removeAttribute("data-lang-auto");
    setLangState(next);
    window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: next }));
  };

  const toggle = () => setLang(lang === "tr" ? "en" : "tr");

  return { lang, setLang, toggle };
}