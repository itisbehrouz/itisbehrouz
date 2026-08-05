export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  client: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  overview: string;
  challenges: string[];
  approach: string[];
  outcomes: { value: string; label: string }[];
  reflection: string;
  category: CaseCategory;
};

export const CASE_CATEGORIES = [
  "Data & BI",
  "Automation & AI",
  "Digital Workplace",
  "E-Commerce",
] as const;
export type CaseCategory = (typeof CASE_CATEGORIES)[number];

export const caseStudies: CaseStudy[] = [
  {
    slug: "executive-bi-suite",
    index: "01",
    title: "Executive Power BI Suite",
    tagline: "Real-time KPI visibility for a 7-entity international group.",
    client: "Yiğitoğlu",
    role: "Digital Transformation & BI Manager",
    period: "2022 — 2024",
    location: "Istanbul, TR",
    stack: ["Power BI", "SQL", "Power Query", "Data Governance", "KPI Framework"],
    category: "Data & BI",
    overview:
      "Executive leadership across seven international entities was making decisions from static, hand-assembled slide decks stitched together from Finance, HR, Sales, and Supply Chain. Reporting was slow, brittle, and never quite trusted. The mandate was to give the executive team a single, real-time source of truth.",
    challenges: [
      "Seven entities, seven data cultures — different ERPs, different definitions of the same KPI.",
      "Manual monthly reporting consumed a full week of analyst time across the group.",
      "No shared governance model for metrics; every function defended its own numbers.",
      "Executives needed depth without complexity — one dashboard, four functions, no training.",
    ],
    approach: [
      "Ran a cross-entity KPI alignment programme with function heads to lock definitions before touching a chart.",
      "Designed a governed semantic layer so every dashboard tile traced back to a single source of truth.",
      "Shipped a Power BI suite spanning Finance, HR, Sales, and Supply Chain — layered from a one-page executive view down to operational detail.",
      "Instrumented data refresh SLAs and a governance forum to keep the model honest as the business changed.",
    ],
    outcomes: [
      { value: "80%", label: "Manual reporting effort removed" },
      { value: "7", label: "Entities on a single model" },
      { value: "4", label: "Functions unified" },
    ],
    reflection:
      "The wins weren't the charts — they were the definitions. Once leadership agreed on what a KPI meant, the dashboards stopped being political and started driving decisions.",
  },
  {
    slug: "ai-automation-platform",
    index: "02",
    title: "AI-Enabled Automation Programme",
    tagline: "Compounding productivity gains across back-office operations.",
    client: "Yiğitoğlu",
    role: "Digital Transformation & BI Manager",
    period: "2023 — 2026",
    location: "Istanbul, TR",
    stack: ["Power Automate", "Power Apps", "AI Builder", "SharePoint", "Dataverse"],
    category: "Automation & AI",
    overview:
      "Back-office functions were drowning in repetitive, low-judgement work — approvals, reconciliations, document extraction. Rather than run a one-off automation project, we built a programme: a portfolio of AI-enabled flows on Microsoft Power Platform with a shared operating model behind them.",
    challenges: [
      "Automation opportunities were scattered across every function; no shared prioritisation lens.",
      "Business owners wanted magic, not maintenance — few were prepared for a citizen-developer model.",
      "AI features carried real risk (extraction errors, model drift) that had to be governed, not ignored.",
      "Every quick win had to compound, not create shadow IT.",
    ],
    approach: [
      "Built an intake and scoring model to rank opportunities by hours saved, risk, and reusability.",
      "Established a Power Platform Centre of Excellence: naming, environments, ALM, and reviews.",
      "Rolled out AI Builder-powered flows for document extraction, approvals, and exception routing.",
      "Coached function leads into co-owning their automations, with the team as reviewers, not bottlenecks.",
    ],
    outcomes: [
      { value: "67%", label: "Lift in operational productivity" },
      { value: "40%", label: "Cut in manual processing time on integrated flows" },
      { value: "1", label: "Governed platform, no shadow IT" },
    ],
    reflection:
      "AI didn't replace anyone. It quietly removed the parts of the job nobody wanted, and gave the team back the hours where judgement actually matters.",
  },
  {
    slug: "digital-workplace-pwa",
    index: "03",
    title: "Digital Workplace PWA",
    tagline: "One AI-assisted environment for ERP, HR, CRM, BI, and IT.",
    client: "Yiğitoğlu",
    role: "Digital Transformation & BI Manager",
    period: "2024 — 2026",
    location: "Istanbul, TR",
    stack: ["PWA", "SAP SuccessFactors", "ERP", "CRM", "Power BI", "IT Service Desk"],
    cover: caseWorkplace,
    category: "Digital Workplace",
    overview:
      "Employees juggled six or seven disconnected systems just to get through a normal day. We designed a company-wide Digital Workplace — a progressive web app that consolidates ERP, HR, CRM, BI, and IT Service Desk into a single, AI-assisted surface for 450+ employees across nine locations.",
    challenges: [
      "Nine locations, fragmented device fleets, and inconsistent connectivity — native apps were a non-starter.",
      "Every underlying system had its own identity, permissions model, and design language.",
      "The workforce spans field, retail, and office roles with very different daily journeys.",
      "Change fatigue was real; adoption had to feel like relief, not another rollout.",
    ],
    approach: [
      "Chose a PWA to hit every device with one codebase, offline-tolerant and installable.",
      "Unified identity and role-based navigation so each employee saw only the workflows that matter to them.",
      "Embedded AI assistance for search, requests, and self-service — the same intent, no matter which system answers.",
      "Delivered SAP SuccessFactors HR digitalization for the same 450+ employees inside the same shell.",
    ],
    outcomes: [
      { value: "450+", label: "Employees on one surface" },
      { value: "9", label: "Locations unified" },
      { value: "5", label: "Systems consolidated in-app" },
    ],
    reflection:
      "The right measure wasn't logins — it was how quickly a new hire could get productive without knowing which system did what.",
  },
  {
    slug: "b2b-ecommerce-launch",
    index: "04",
    title: "B2B E-Commerce Platform Launch",
    tagline: "A direct digital sales channel across five continents.",
    client: "Edgers",
    role: "E-Commerce Manager",
    period: "2019",
    location: "Istanbul, TR",
    stack: ["B2B Commerce", "ERP Integration", "Payments", "International Ops"],
    cover: caseB2B,
    category: "E-Commerce",
    overview:
      "Edgers had strong international demand but no direct digital sales channel — orders moved through email, spreadsheets, and phone calls. I built and launched the company's first proprietary B2B e-commerce platform, and ran international operations across Iran, the Balkans, Egypt, the United States, and multiple African markets.",
    challenges: [
      "Very different buyer behaviours, currencies, and compliance rules across five regions.",
      "Existing sales team saw digital as a threat to their relationships.",
      "No existing digital pricing, catalogue, or logistics data — everything had to be modelled from scratch.",
      "Aggressive timeline: a working direct channel had to ship inside the same fiscal year.",
    ],
    approach: [
      "Built the platform end-to-end: catalogue, quoting, order flow, and back-office integration.",
      "Repositioned digital as a tool for existing sellers — they became the first power users, not the last.",
      "Modelled a region-aware pricing and terms engine to respect local commercial reality.",
      "Instrumented every order to feed learning back into sales and supply chain.",
    ],
    outcomes: [
      { value: "1st", label: "Direct digital channel in company history" },
      { value: "5", label: "Continents served from day one" },
      { value: "0→∞", label: "Baseline digital revenue → new stream" },
    ],
    reflection:
      "The platform was the easy part. The real work was giving a traditional sales team a reason to want it.",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);