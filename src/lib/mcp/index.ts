import { defineMcp } from "@lovable.dev/mcp-js";
import listCaseStudies from "./tools/list-case-studies";
import getCaseStudy from "./tools/get-case-study";
import getProfile from "./tools/get-profile";

export default defineMcp({
  name: "your-creative-spark",
  title: "Your Creative Spark",
  version: "0.1.0",
  instructions:
    "Read-only tools over Behrouz Bagherzadeh's public portfolio. Use `get_profile` for the career timeline, capabilities, impact metrics and education; `list_case_studies` to browse projects; `get_case_study` for one project's challenges, approach and outcomes. All content is available in English ('en') and Turkish ('tr').",
  tools: [getProfile, listCaseStudies, getCaseStudy],
});