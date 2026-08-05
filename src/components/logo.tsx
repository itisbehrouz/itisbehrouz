import type { SVGProps } from "react";

/**
 * Brand mark — simplified two-bar version (same as the small favicon sizes).
 * Inline SVG with fill="currentColor" so it inherits the theme's text colour.
 * No background plate: the navy plate exists only in the favicon files.
 */
export function Logo({ title = "Behruz Bagirzade", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 90 115" fill="currentColor" role="img" aria-label={title} {...props}>
      <rect x="0" y="0" width="15" height="115" rx="1" />
      <rect x="25" y="0" width="15" height="115" rx="1" />
      <path d="M50 0 H62 A28 28 0 0 1 62 56 H50 Z" />
      <path d="M50 59 H62 A28 28 0 0 1 62 115 H50 Z" />
    </svg>
  );
}
