import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getCaseStudy } from "@/lib/case-studies";
import { caseStudyI18n } from "@/lib/i18n";

export default defineTool({
  name: "get_case_study",
  title: "Get case study",
  description:
    "Get the full detail of one portfolio case study: overview, challenges, approach, measurable outcomes and reflection.",
  inputSchema: {
    slug: z.string().trim().min(1).describe("Case study slug, e.g. 'executive-bi-suite'."),
    lang: z
      .enum(["en", "tr"])
      .nullable()
      .describe("Content language: 'en' or 'tr'. Defaults to 'en'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug, lang }) => {
    const base = getCaseStudy(slug);
    if (!base) throw new ToolError(`No case study found with slug "${slug}".`);
    const l = lang ?? "en";
    const t = caseStudyI18n[l]?.[slug];
    const study = {
      slug: base.slug,
      title: t?.title ?? base.title,
      tagline: t?.tagline ?? base.tagline,
      client: base.client,
      role: base.role,
      period: base.period,
      location: base.location,
      category: base.category,
      stack: base.stack,
      overview: t?.overview ?? base.overview,
      challenges: t?.challenges ?? base.challenges,
      approach: t?.approach ?? base.approach,
      outcomes: t?.outcomes ?? base.outcomes,
      reflection: t?.reflection ?? base.reflection,
      url: `/work/${base.slug}`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(study, null, 2) }],
      structuredContent: { caseStudy: study },
    };
  },
});