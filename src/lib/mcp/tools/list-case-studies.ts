import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { caseStudies } from "@/lib/case-studies";
import { caseStudyI18n } from "@/lib/i18n";

export default defineTool({
  name: "list_case_studies",
  title: "List case studies",
  description:
    "List the published portfolio case studies with slug, title, tagline, client, period, category and tech stack.",
  inputSchema: {
    lang: z
      .enum(["en", "tr"])
      .nullable()
      .describe("Content language: 'en' or 'tr'. Defaults to 'en'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ lang }) => {
    const l = lang ?? "en";
    const items = caseStudies.map((c) => {
      const t = caseStudyI18n[l]?.[c.slug];
      return {
        slug: c.slug,
        title: t?.title ?? c.title,
        tagline: t?.tagline ?? c.tagline,
        client: c.client,
        role: c.role,
        period: c.period,
        category: c.category,
        stack: c.stack,
        url: `/work/${c.slug}`,
      };
    });
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { caseStudies: items },
    };
  },
});