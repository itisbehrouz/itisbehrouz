Plan: Work and Projects / Apps dropdown menus in the header

Goal
Add hover/click-activated dropdown menus for “Work” and “Projects / Apps” in the fixed header. Each menu shows a link with a short summary line. Apply the same menu to the homepage, case study pages, and Luma pages.

Scope
- Only frontend/presentation changes.
- Reuse the existing monochrome design system (border, muted-foreground, underline, mono font, focus outlines).
- Add minimal i18n keys in both EN and TR.
- Keep the existing mobile header pattern (no mobile nav menu; dropdowns are desktop-only).

Changes

1. src/lib/i18n.tsx
- Add a `navDropdowns` object to the `UI` type with EN/TR copy for each menu.
- Work dropdown:
  - Label: uses existing `t.nav.work`.
  - Summary: one-line overview of the Work section.
  - Items: “All case studies” linking to `/#work` (or `/work`) with a short summary; optionally the first 3–4 case-study titles linking to `/work/$slug`. Keep the list short so the panel stays compact.
- Projects / Apps dropdown:
  - Label: uses existing `t.nav.projects`.
  - Summary: one-line overview of side projects/apps.
  - Items: Luma linking to `/luma` with a short summary; optional external link to the App Store (if available) with a short summary.
- Ensure every new string is mirrored in both languages.

2. Reusable dropdown component
- Create a new client component (e.g., `src/components/nav-dropdown.tsx`).
- Accept a trigger label and an array of items `{ label, href, summary, external? }`.
- Behavior: open on hover (desktop) or click/tap; close on mouse leave, Escape, or focus outside. Keep it accessible and SSR-safe.
- Keyboard support: arrow keys move between items, Enter/Space activates, Escape closes, Tab moves out.
- Visuals: a panel under the header with a subtle border, background matching the header (`bg-background/95 backdrop-blur`), mono uppercase labels, and short summaries in muted text. Use the same underline hover style as the existing nav links.
- Do not use a heavy third-party library; implement with state + native events. No animation library required, but a small fade/translate transition can be added via Tailwind if desired.

3. Update homepage header — src/routes/index.tsx
- Replace the current `<a href="#work">` with the Work dropdown.
- Replace the current `<a href="#projects">` with the Projects / Apps dropdown.
- Keep the order of nav items: Work, Capabilities, Projects / Apps, Impact, Contact.
- Preserve the “GET IN TOUCH” button and the language/theme/LinkedIn controls.

4. Update case study page header — src/routes/work.$slug.tsx
- Replace the centered `Case · 01` label with a left-aligned nav block containing the dropdowns.
- Layout: logo/wordmark on the left, Work + Projects / Apps dropdowns in the middle, and the existing language/LinkedIn/Get In Touch controls on the right.
- Ensure the dropdown is only visible on desktop (`hidden md:flex`); mobile keeps the existing minimal header.

5. Update Luma shell header — src/components/luma/luma-shell.tsx
- Add the same two dropdowns to the Luma header between the logo/wordmark and the language/theme controls.
- Only on desktop; Luma shell currently has no desktop nav, so this adds one.
- Keep the Luma footer unchanged.

6. Accessibility and consistency
- Add `aria-expanded`, `aria-haspopup`, and role attributes to each dropdown trigger.
- Use `aria-label` or visible text to describe the menu.
- Ensure focus is visible and consistent with the existing focus outline.
- Ensure no hydration mismatch by only measuring window size inside an effect if needed.

7. Verification
- Run the dev build and check that the dropdowns render on `/`, `/work/$slug`, and `/luma`.
- Verify hover/click open, Escape closes, and links navigate correctly.
- Verify both EN and TR copy.
- Confirm the existing mobile header remains unchanged.

Out of scope
- No mobile hamburger menu or mobile-specific nav redesign.
- No new animation libraries; keep it lightweight.
- No changes to the existing Work or Luma content sections.
- No redesign of the global color system or typography.
