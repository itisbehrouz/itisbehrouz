import { motion, useReducedMotion } from "framer-motion";

/**
 * Abstract architectural "signal steadying out" line motif for the hero.
 * Draws itself in on mount via stroke-dashoffset.
 */
export function HeroLineMotif({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const draw = (delay: number) =>
    reduced
      ? { pathLength: 1 }
      : {
          pathLength: 1,
          transition: { duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        };

  return (
    <svg
      className={className}
      viewBox="0 0 1200 400"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <motion.path
        d="M0 320 C 90 320, 120 90, 200 250 S 300 60, 380 260 C 450 380, 500 120, 580 210 C 660 300, 720 150, 820 190 C 930 232, 1040 196, 1200 200"
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={draw(0.1)}
      />
      <motion.path
        d="M0 360 C 120 360, 160 200, 260 300 S 380 180, 500 280 C 620 360, 700 220, 840 250 C 980 278, 1060 252, 1200 258"
        stroke="var(--chart-2)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={draw(0.35)}
      />
      <motion.path
        d="M0 120 C 140 120, 220 40, 360 110 S 560 170, 760 130 C 940 96, 1060 140, 1200 128"
        stroke="var(--chart-3)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={draw(0.55)}
      />
    </svg>
  );
}