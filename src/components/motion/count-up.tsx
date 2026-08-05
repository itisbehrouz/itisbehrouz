import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Token = { text: string; num: number | null };

function tokenize(value: string): Token[] {
  return value
    .split(/(\d+)/)
    .filter((s) => s.length > 0)
    .map((s) => (/^\d+$/.test(s) ? { text: s, num: Number(s) } : { text: s, num: null }));
}

/**
 * Animates the numeric parts of a metric string into view. Suffixes/prefixes
 * such as "%", "+" or "→" stay static. Ranges (e.g. "18→6") count the second
 * number down from the first.
 */
export function CountUp({ value, className, style }: { value: string; className?: string; style?: React.CSSProperties }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const tokens = tokenize(value);
  const numeric = tokens.filter((t) => t.num !== null);
  const [display, setDisplay] = useState<string>(() =>
    reduced || numeric.length === 0 ? value : tokens.map((t) => (t.num === null ? t.text : "0")).join(""),
  );

  useEffect(() => {
    if (reduced || numeric.length === 0) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const isRange = numeric.length === 2;
    const current = numeric.map(() => 0);
    const controls = numeric.map((t, i) => {
      const from = isRange && i === 1 ? (numeric[0].num as number) : 0;
      current[i] = from;
      return animate(from, t.num as number, {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => {
          current[i] = v;
          let n = -1;
          setDisplay(
            tokens
              .map((tok) => {
                if (tok.num === null) return tok.text;
                n += 1;
                return String(Math.round(current[n]));
              })
              .join(""),
          );
        },
      });
    });

    return () => controls.forEach((c) => c.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className} style={style}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}