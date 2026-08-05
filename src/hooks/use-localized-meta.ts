import { useEffect } from "react";

function setMeta(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute("content", content);
}

/**
 * Route head() is evaluated per-route, not per-language, so the document title
 * and social meta cannot follow the client-side language toggle on their own.
 * This syncs them after hydration whenever the active language changes.
 */
export function useLocalizedMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:description"]', description);
  }, [title, description]);
}
