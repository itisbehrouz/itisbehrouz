import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    setThemeState(readTheme());

    // While no manual choice is stored, follow live OS changes.
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {}
    if (stored === "light" || stored === "dark") return;
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      let current: string | null = null;
      try {
        current = localStorage.getItem("theme");
      } catch {}
      if (current === "light" || current === "dark") return;
      const next: Theme = e.matches ? "light" : "dark";
      const root = document.documentElement;
      root.classList.toggle("light", next === "light");
      root.style.colorScheme = next;
      setThemeState(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = (next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("light", next === "light");
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    root.removeAttribute("data-theme-auto");
    setThemeState(next);
  };

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return { theme, setTheme, toggle };
}