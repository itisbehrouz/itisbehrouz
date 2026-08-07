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
  "Web & Branding",
  "HR Tech",
  "Product & ERP",
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
  {
    slug: "rubin-kimya-rebranding",
    index: "05",
    title: "Rubin Kimya — Rebranding & Web Development",
    tagline: "A complete corporate identity and digital presence built from scratch.",
    client: "Rubin Kimya",
    role: "Digital Transformation & BI Manager",
    period: "Jun 2025 — Dec 2025",
    location: "Istanbul, TR",
    stack: ["Brand Identity", "UI/UX Design", "Custom Web Development", "Responsive Design"],
    category: "Web & Branding",
    overview:
      "Rubin Kimya needed a modern face for an industrial legacy. Working under Yiğitoğlu, I led the full digital transformation of the brand: a refreshed logo and visual identity system, accessible UI/UX, and a custom-built, high-performance website that matches the company's technical standards.",
    challenges: [
      "The brand had no unified digital identity — logo, website, and visual language were fragmented or outdated.",
      "Industrial buyers expect precision and credibility; the design had to feel modern without losing authority.",
      "The website needed to be performant and accessible across devices, not a template-heavy brochure.",
      "Stakeholders needed confidence that a B2B industrial site could also be visually distinctive.",
    ],
    approach: [
      "Designed a new logo and visual identity system that balanced industrial heritage with contemporary clarity.",
      "Created accessible, intuitive interfaces focused on product credibility and easy navigation.",
      "Built a responsive, custom-coded website with performance and maintainability in mind.",
      "Aligned the digital experience with the company's commercial goals and technical expectations.",
    ],
    outcomes: [
      { value: "1", label: "Unified brand identity system" },
      { value: "100%", label: "Custom-coded website" },
      { value: "End-to-end", label: "Design-to-deployment delivery" },
    ],
    reflection:
      "Industrial brands often hide behind old aesthetics. The real win was proving that credibility and modern design can share the same page.",
  },
  {
    slug: "valory-vista-digital-branding",
    index: "06",
    title: "Valory Vista — Digital Branding",
    tagline: "Architecture, lifestyle, and a digital presence built to convert.",
    client: "Valory Vista",
    role: "Digital Transformation & BI Manager",
    period: "Apr 2025 — May 2025",
    location: "Istanbul, TR",
    stack: ["Brand Identity", "Web Design", "Social Media", "Digital Ads", "Lead Generation"],
    category: "Web & Branding",
    overview:
      "Valory Vista needed a digital presence that matched the quality of its architecture and lifestyle positioning. I crafted a distinctive visual identity, built a cohesive online experience across website and social channels, and designed data-driven campaigns to attract qualified buyers.",
    challenges: [
      "The project needed a visual identity that reflected premium architecture and lifestyle appeal, not generic real estate styling.",
      "Multiple touchpoints — website, social, ads — had to tell the same story without silos.",
      "Campaigns needed to generate leads, not just impressions.",
      "Timeline was short; the brand had to go to market quickly and coherently.",
    ],
    approach: [
      "Developed a visual identity system rooted in the project's architecture and lifestyle promise.",
      "Built a cohesive digital presence across website, social media, and digital advertising.",
      "Used data-driven content and targeted campaigns to engage buyers at each stage of the journey.",
      "Tracked conversion signals to iterate messaging and media placement quickly.",
    ],
    outcomes: [
      { value: "Cohesive", label: "Cross-channel brand presence" },
      { value: "Targeted", label: "Data-driven campaigns" },
      { value: "Qualified", label: "Lead generation focus" },
    ],
    reflection:
      "In real estate, the product is already premium. The work is making sure the digital experience feels just as considered before the first visit.",
  },
  {
    slug: "insight360",
    index: "07",
    title: "Insight360 — Performance Evaluation System",
    tagline: "360-degree feedback designed to improve accountability and growth.",
    client: "Yiğitoğlu",
    role: "Digital Transformation & BI Manager",
    period: "Feb 2025 — Mar 2025",
    location: "Istanbul, TR",
    stack: ["360° Feedback", "Performance Management", "HR Tech", "Process Design"],
    category: "HR Tech",
    overview:
      "Performance reviews were one-directional and infrequent. We built Insight360, a comprehensive 360-degree performance evaluation system that enables cross-departmental feedback, manager reviews, upward evaluations, and peer-to-peer assessments in one structured process.",
    challenges: [
      "Performance feedback was limited to top-down reviews, missing peer and upward perspectives.",
      "Different departments used different criteria, making comparisons and decisions inconsistent.",
      "The process was manual and time-consuming, creating resistance rather than engagement.",
      "Feedback had to be actionable, not just a scorecard, to drive real development.",
    ],
    approach: [
      "Designed a structured evaluation workflow covering manager, peer, upward, and cross-departmental feedback.",
      "Standardized competency criteria so reviews could be compared fairly across teams.",
      "Built a digital interface that made giving and receiving feedback easier and more transparent.",
      "Positioned insights as development inputs, not just evaluation outputs.",
    ],
    outcomes: [
      { value: "360°", label: "Multi-source feedback model" },
      { value: "Org-wide", label: "Cross-departmental coverage" },
      { value: "Actionable", label: "Development-focused insights" },
    ],
    reflection:
      "Feedback systems fail when people feel judged. The design had to make the process feel like a mirror, not a verdict.",
  },
  {
    slug: "yigitoglu-digital-evolution",
    index: "08",
    title: "Yiğitoğlu Digital Evolution",
    tagline: "A user-centric, globally visible web platform for an industry leader.",
    client: "Yiğitoğlu",
    role: "Digital Transformation & BI Manager",
    period: "May 2024 — Dec 2024",
    location: "Istanbul, TR",
    stack: ["Web Platform", "UX/UI Design", "Accessibility", "Global SEO"],
    category: "Web & Branding",
    overview:
      "Yiğitoğlu's digital presence no longer reflected the scale of its industrial leadership. I led the transformation into a user-centric, accessible, and globally visible web platform that positions the company as a leader in the chemical industry's digital transformation.",
    challenges: [
      "The existing web presence was dated and did not reflect the company's strategic position.",
      "Global visibility required a platform that worked across languages, devices, and accessibility standards.",
      "Internal stakeholders needed a site that served both credibility and commercial conversion.",
      "The project had to modernize without losing the trust built over decades.",
    ],
    approach: [
      "Ran a user-centric design process to restructure information architecture and navigation.",
      "Built a high-performance, accessible, and responsive web platform with global standards.",
      "Aligned the digital experience with Yiğitoğlu's brand authority and multi-market reach.",
      "Instrumented analytics to continuously improve content and conversion paths.",
    ],
    outcomes: [
      { value: "Global", label: "Accessible, multi-market platform" },
      { value: "Modern", label: "Industry-leading digital presence" },
      { value: "User-centric", label: "Design and information architecture" },
    ],
    reflection:
      "A corporate website is often treated as a signpost. The real value is turning it into a proof point for the transformation you claim to lead.",
  },
  {
    slug: "digital-product-management-app",
    index: "09",
    title: "Digital Product Management App",
    tagline: "Centralized product data integrated with ERP and BI.",
    client: "Yiğitoğlu",
    role: "Digital Transformation & BI Manager",
    period: "2024",
    location: "Istanbul, TR",
    stack: ["Product Information Management", "ERP Integration", "Power BI", "Data Architecture"],
    category: "Product & ERP",
    overview:
      "Product information was scattered across systems, making it hard for Sales, Marketing, and Supply Chain to rely on a single source. I built a digital product management application that centralizes product data and integrates it directly with ERP and business intelligence systems.",
    challenges: [
      "Product data lived in multiple systems, creating version conflicts and delays.",
      "Sales and Marketing teams struggled to access accurate, up-to-date technical and commercial details.",
      "The product data model had to align with ERP structures without duplicating master records.",
      "Adoption depended on the app being faster than the spreadsheets it replaced.",
    ],
    approach: [
      "Centralized product information into a single application with clear ownership and update workflows.",
      "Integrated the app with ERP to keep master data consistent and authoritative.",
      "Connected product data to BI so commercial and operational teams could analyze it in context.",
      "Designed the interface around speed and clarity so teams would choose it over informal tools.",
    ],
    outcomes: [
      { value: "1", label: "Single source of product truth" },
      { value: "ERP", label: "Integrated master data" },
      { value: "BI-ready", label: "Contextual analytics access" },
    ],
    reflection:
      "The hardest part of product data is not building the database; it is getting every function to agree on who owns each field.",
  },
  {
    slug: "supply-chain-bi-dashboard",
    index: "10",
    title: "BI Dashboard for Supply Chain Optimization",
    tagline: "Real-time procurement visibility by integrating ERP and CRM data.",
    client: "Yiğitoğlu",
    role: "Digital Transformation & BI Manager",
    period: "2023",
    location: "Istanbul, TR",
    stack: ["Power BI", "ERP", "CRM", "Supply Chain Analytics", "Procurement"],
    category: "Data & BI",
    overview:
      "Purchasing and supply chain decisions were slowed by disconnected ERP and CRM data. I designed a BI dashboard that integrated both sources to give procurement and operations a real-time view of purchasing performance, supplier behaviour, and inventory signals.",
    challenges: [
      "ERP and CRM data were siloed, making end-to-end supply chain visibility impossible.",
      "Procurement teams relied on static reports that were outdated by the time they were reviewed.",
      "Key metrics like supplier performance and inventory health were calculated differently across functions.",
      "The dashboard had to serve both operational buyers and strategic planning.",
    ],
    approach: [
      "Mapped the full procurement data flow from ERP orders and CRM supplier interactions to inventory signals.",
      "Built a unified data model that aligned purchasing, operations, and finance on the same definitions.",
      "Delivered a Power BI dashboard with real-time refresh and role-based views.",
      "Focused the interface on decisions: what to buy, from whom, and when.",
    ],
    outcomes: [
      { value: "Real-time", label: "Procurement visibility" },
      { value: "ERP+CRM", label: "Unified data model" },
      { value: "Faster", label: "Purchasing decisions" },
    ],
    reflection:
      "Supply chain dashboards are only useful when they answer the next question before the buyer has to ask it.",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
