import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { capabilitiesI18n, educationI18n, experienceI18n, metricsI18n } from "@/lib/i18n";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get Behrouz Bagherzadeh's public professional profile: career timeline, capabilities, impact metrics and education.",
  inputSchema: {
    lang: z
      .enum(["en", "tr"])
      .nullable()
      .describe("Content language: 'en' or 'tr'. Defaults to 'en'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ lang }) => {
    const l = lang ?? "en";
    const profile = {
      name: "Behrouz Bagherzadeh",
      headline: "Digital Transformation & Business Intelligence Leader",
      metrics: metricsI18n[l],
      capabilities: capabilitiesI18n[l],
      experience: experienceI18n[l],
      education: educationI18n[l],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
      structuredContent: { profile },
    };
  },
});