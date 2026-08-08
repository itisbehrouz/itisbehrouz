import { getCookieConsent } from "@/components/cookie-consent";

const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let injected = false;

function canLoad() {
  if (typeof window === "undefined") return false;
  const consent = getCookieConsent();
  // Only load GA when the visitor has explicitly accepted cookies.
  return consent === "accepted";
}

function doInject() {
  if (injected || !measurementId || typeof window === "undefined") return;
  injected = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (!measurementId) {
    console.warn("Google Analytics measurement ID is not configured");
    return;
  }
  doInject();
}

export function listenForConsent() {
  if (typeof window === "undefined") return;

  const handler = (e: Event) => {
    const choice = (e as CustomEvent).detail;
    if (choice === "accepted") {
      doInject();
    }
  };

  window.addEventListener("cookie-consent", handler);
  return () => window.removeEventListener("cookie-consent", handler);
}

export function trackPageView(path: string) {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
