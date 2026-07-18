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
  }, []);

  const setTheme = (next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("light", next === "light");
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setThemeState(next);
  };

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return { theme, setTheme, toggle };
}