import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/hooks/use-lang";
import { useLocalizedMeta } from "@/hooks/use-localized-meta";
import { lumaI18n } from "@/lib/i18n";
import { LumaLegalPage } from "@/components/luma/luma-shell";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/luma/terms")({
  component: LumaTermsPage,
  head: () => {
    const url = `${SITE_URL}/luma/terms`;
    const title = "Luma — Terms of Use";
    const desc = "Terms of Use and end user licence agreement for Luma, an ambient display app for Apple tvOS.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
});

function LumaTermsPage() {
  const { lang } = useLang();
  const l = lumaI18n[lang];
  useLocalizedMeta(l.terms.metaTitle, l.terms.metaDesc);
  return (
    <LumaLegalPage
      label={`${l.name} · ${l.terms.title}`}
      title={l.terms.title}
      intro={l.terms.intro}
      updated={l.updated}
      sections={l.terms.sections}
      backLabel={l.backApp}
    />
  );
}
