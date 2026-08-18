Plan: Add a standalone "Projects / Apps" section on the homepage for Luma

Goal
Add a new, separate "Projects / Apps" section on the homepage between Capabilities and Work, featuring a card for Luma that links to /luma. Do not touch the existing Work/Projeler (CV case studies) section.

Scope
- Only modify presentation / frontend code.
- Reuse existing components, Tailwind classes, and motion patterns.
- Add minimal i18n keys for the new section in both EN and TR.

Changes

1. src/lib/i18n.tsx
- Add `projects` key to `UI.sections`: `Projects / Apps` (EN), `Projeler / Uygulamalar` (TR).
- Add a `projects` block to `UI` with:
  - `intro`: short lead text for the section.
  - `viewProject`: CTA label for the card.
- Populate both EN and TR dictionaries.

2. src/routes/index.tsx
- Add a new `<section id="projects" ...>` between the existing `#capabilities` and `#work` sections.
- Use the existing `SectionLabel` component with the new `projects` title and index `03`.
- Render a single Luma project card using `TiltCard` + `Reveal` (same interaction pattern as existing cards).
- Card content:
  - Tagline / category label from i18n.
  - Title: "Luma".
  - One-line description from i18n.
  - Link to `/luma` using `<Link to="/luma">` (already imported from `@tanstack/react-router`).
- Keep existing card styling: monochrome border, hover states, focus-visible outlines, mono uppercase labels.
- Re-index the following sections only if necessary: current Work uses `03`, Capabilities uses `02`, Impact uses `01`. After adding Projects/Apps, renumber so Projects/Apps is `03` and Work becomes `04`, Career `05`, Education `06`, Certifications `07`, Contact `08`. Check the rendered SectionLabel indices before deciding; only update the numeric labels, not section IDs.

3. Header navigation (same file, header nav block)
- Add a new desktop nav link between Capabilities and Impact: `<a href="#projects">{t.nav.projects}</a>`.
- Add `projects` to the `nav` object in `src/lib/i18n.tsx` for both EN and TR.

4. Verification
- Run the dev build to confirm the new section renders, the link scrolls to `#projects`, and `/luma` route remains accessible.
- Check both EN and TR copy for the new section.

Out of scope
- No redesign, color, font, or layout changes beyond the new section.
- No changes to the existing Work/Projeler case-study section.
- No new styling libraries or global CSS changes.
- No mobile-only hamburger menu; existing header pattern is preserved.
