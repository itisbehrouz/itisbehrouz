import { useEffect, useState } from "react";

export type Lang = "en" | "tr";

function readLang(): Lang {
  if (typeof document === "undefined") return "en";
  const attr = document.documentElement.getAttribute("data-lang");
  return attr === "tr" ? "tr" : "en";
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang");
      const initial: Lang = stored === "tr" ? "tr" : stored === "en" ? "en" : readLang();
      document.documentElement.setAttribute("data-lang", initial);
      document.documentElement.lang = initial;
      setLangState(initial);
    } catch {
      setLangState(readLang());
    }
  }, []);

  const setLang = (next: Lang) => {
    const root = document.documentElement;
    root.setAttribute("data-lang", next);
    root.lang = next;
    try {
      localStorage.setItem("lang", next);
    } catch {}
    setLangState(next);
  };

  const toggle = () => setLang(lang === "tr" ? "en" : "tr");

  return { lang, setLang, toggle };
}