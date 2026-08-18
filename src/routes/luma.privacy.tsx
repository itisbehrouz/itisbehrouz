import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/hooks/use-lang";
import { useLocalizedMeta } from "@/hooks/use-localized-meta";
import { lumaI18n } from "@/lib/i18n";
import { LumaLegalPage } from "@/components/luma/luma-shell";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/luma/privacy")({
  component: LumaPrivacyPage,
  head: () => {
    const url = `${SITE_URL}/luma/privacy`;
    const title = "Luma — Privacy Policy";
    const desc = "Privacy Policy for Luma, an ambient display app for Apple tvOS. Luma collects no personal data.";
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

function LumaPrivacyPage() {
  const { lang } = useLang();
  const l = lumaI18n[lang];
  useLocalizedMeta(l.privacy.metaTitle, l.privacy.metaDesc);
  return (
    <LumaLegalPage
      label={`${l.name} · ${l.privacy.title}`}
      title={l.privacy.title}
      intro={l.privacy.intro}
      updated={l.updated}
      sections={l.privacy.sections}
      backLabel={l.backApp}
    />
  );
}
