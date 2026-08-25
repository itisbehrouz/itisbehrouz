# Career Timeline Update from the New CV

Refresh the career timeline (and the closely tied role/title text) so it matches the latest CV in both English and Turkish. All monetary figures are excluded — no €1M budget, no $100K cost avoidance, no 5M/1.5M/270K TRY, and no money-derived percentages (the 82% cost reduction). Non-financial metrics stay (450+ employees, 9 offices, 7 entities, 40%, 67%, 70%, 18→6 months, 99.9% uptime).

## Timeline changes

New entry at the top:
- 2026 — Present · Independent Consulting / Product Development, Istanbul — project-based digital transformation, enterprise AI and BI advisory; AI deployment strategy, BI ecosystem architecture, multi-entity digital governance.

Yiğitoğlu Group (2022 — 2026), title updated to "Head of Digital Transformation, BI & Enterprise AI":
- Directed the group IT, ERP and digital transformation roadmap across 7 international entities (Germany, Russia, India, China, Malaysia, Türkiye incl. Rubin Kimya), with steering authority over IT architecture, ERP selection and software deployment across 12+ departments.
- Led the secure in-house deployment of "Yigi AI", an LLM-powered enterprise knowledge assistant integrating HR, Finance, Sales and Purchasing data — fully private, cutting routine query overhead and speeding up onboarding.
- Made the build-vs-buy call to develop the regional Power BI ecosystem entirely in-house, keeping full data ownership and custom architecture.
- Directed in-house engineering of a custom PWA Digital Workplace, removing recurring licensing and vendor maintenance dependencies.
- Evaluated build vs. licensed platforms for enterprise CRM and logistics tracking, then procured and integrated the licensed option to accelerate deployment.
- Designed and engineered "Insight360", a performance evaluation and incentive platform with automated data harvesting and real-time Power BI tracking — accelerating evaluation workflows by 70%.
- Built the Valory Vista digital brand and technology stack end to end: web platforms, CRM pipeline and automated Power BI reporting for executive steering.
- Steered the in-house digital rebranding and web development of Rubin Kimya.
- Built, coached and upskilled a 5-person DX & BI team; established a company-wide data literacy framework and promoted from within.
- Rolled out SAP SuccessFactors for 450+ employees across 9 offices, unifying ERP, HRIS, CRM and BI into one Digital Workplace.
- Standardized operational workflows across EMEA/MENA business units with shared data-governance models.

Yiğitoğlu (2021 — 2022), title "Digital Transformation & BI Analyst":
- Re-engineered the corporate PMO delivery framework, compressing project lifecycles from 18 months to 6 (67% faster).
- Ran end-to-end process reviews across commercial and operational departments to build automation roadmaps.
- Delivered tailored automations and data visualization that lifted team productivity and internal satisfaction.

Kiğılı (2019 — 2021), title "International E-Commerce & Digital Transformation Lead": keeps the existing four bullets, with the ERP integration bullet reworded to reflect partnering with international logistics and engineering teams.

Edgers (2019), title "E-Commerce Platform Director (D2C Launch)": zero-to-one launch of the first direct digital sales channel across EMEA/MENA, US and the Balkans; payment and logistics systems designed for regional regulations, duties, VAT and data-privacy rules.

Additional experience, titles aligned to the CV:
- Orka Holding (2018) — Senior Business Developer, Digital Commerce Strategy.
- Finesse (2016 — 2017) — Business Development Specialist & Technical Liaison.
- Mercedes-Benz AG, Tabriz (2013 — 2016) — Senior IT Infrastructure Lead & Specialist; IT infrastructure for heavy assembly operations at 99.9% uptime, in collaboration with European corporate departments.
- EghtesadNovin Bank, Tabriz (2011 — 2013) — IT Systems Engineer; secure regional bank network architecture and branch network modernization.

## Supporting copy kept consistent

- Hero role value and screen-reader suffix: "Head of Digital Transformation, BI & Enterprise AI" (TR equivalent), so the timeline and header don't contradict each other.
- Capabilities: add "Enterprise AI & LLM Deployment", "PMO Re-engineering" and "Technology Roadmap Design" under Transformation & Strategy; add "Vendor & SLA Management" under Automation & Systems. No budget or ROI wording.
- Certifications: PL-300 shown as achieved (2026) per the CV, and Scrum Foundations plus Agile Project Management with Jira added.
- Education stays as is (already matches).
- Work authorization / residency details from the CV are not published on the site.

## Technical notes

- All content lives in `src/lib/i18n.tsx`: `experienceI18n`, `capabilitiesI18n`, `certificationsI18n`, and the `hero.roleVal` / `hero.srSuffix` fields in `ui`. Both `en` and `tr` arrays are updated in parallel and kept the same length/order.
- No layout, component, or styling changes; `src/routes/index.tsx` renders the arrays as-is.
- Existing metrics band and case studies remain untouched.
