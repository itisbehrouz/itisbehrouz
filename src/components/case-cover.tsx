type Props = { slug: string; className?: string };

const VB = "0 0 800 500";
const stroke = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Frame({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox={VB}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ display: "block", width: "100%", height: "100%", background: "var(--card)" }}
    >
      {children}
    </svg>
  );
}

/** 01 — reporting: bars + trend polyline */
function BiCover({ className }: { className?: string }) {
  const heights = [64, 108, 82, 146, 118, 190, 152, 214, 178, 246, 206, 268, 232, 292, 258];
  const baseY = 400;
  const x0 = 120;
  const gap = 38;
  return (
    <Frame label="Abstract bar chart with a single trend line" className={className}>
      <line x1={x0 - 24} y1={baseY} x2={x0 + gap * (heights.length - 1) + 24} y2={baseY} stroke="var(--border)" strokeWidth={0.75} />
      {heights.map((h, i) => (
        <line
          key={i}
          x1={x0 + i * gap}
          y1={baseY}
          x2={x0 + i * gap}
          y2={baseY - h}
          stroke="var(--border)"
          strokeWidth={5}
          strokeLinecap="butt"
        />
      ))}
      <polyline
        {...stroke}
        points={heights.map((h, i) => `${x0 + i * gap},${baseY - h - 44}`).join(" ")}
        stroke="var(--foreground)"
        strokeWidth={2}
      />
      <circle cx={x0 + gap * (heights.length - 1)} cy={baseY - heights[heights.length - 1] - 44} r={5} fill="var(--foreground)" />
    </Frame>
  );
}

/** 02 — automation loop: nodes on a rounded-rect path with arrowheads */
function AutomationCover({ className }: { className?: string }) {
  const x = 220, y = 130, w = 360, h = 240, r = 60;
  const nodes = [
    { cx: x, cy: y, focal: true },
    { cx: x + w, cy: y, focal: false },
    { cx: x + w, cy: y + h, focal: false },
    { cx: x + w / 2, cy: y + h, focal: false },
    { cx: x, cy: y + h, focal: false },
  ];
  const arrow = (cx: number, cy: number, rot: number) => (
    <path
      key={`${cx}-${cy}`}
      d="M -7 -6 L 0 0 L -7 6"
      {...stroke}
      stroke="var(--muted-foreground)"
      strokeWidth={0.75}
      transform={`translate(${cx} ${cy}) rotate(${rot})`}
    />
  );
  return (
    <Frame label="Abstract cycle diagram of connected nodes in a loop" className={className}>
      <rect x={x} y={y} width={w} height={h} rx={r} ry={r} {...stroke} stroke="var(--border)" strokeWidth={0.75} />
      {arrow(x + w * 0.55, y, 0)}
      {arrow(x + w, y + h * 0.55, 90)}
      {arrow(x + w * 0.3, y + h, 180)}
      {arrow(x, y + h * 0.45, 270)}
      {nodes.map((n) =>
        n.focal ? (
          <circle key={`${n.cx}-${n.cy}`} cx={n.cx} cy={n.cy} r={13} fill="var(--foreground)" />
        ) : (
          <circle key={`${n.cx}-${n.cy}`} cx={n.cx} cy={n.cy} r={11} fill="var(--card)" stroke="var(--muted-foreground)" strokeWidth={0.75} />
        )
      )}
    </Frame>
  );
}

/** 03 — consolidation: five small rects converging into one */
function WorkplaceCover({ className }: { className?: string }) {
  const smalls = [90, 170, 250, 330, 410].map((cy) => ({ x: 120, y: cy - 22, w: 110, h: 44, cy }));
  const target = { x: 500, y: 175, w: 180, h: 150 };
  const tx = target.x;
  const tcy = target.y + target.h / 2;
  return (
    <Frame label="Abstract diagram of five systems converging into one surface" className={className}>
      {smalls.map((s) => (
        <g key={s.cy}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={8} {...stroke} stroke="var(--border)" strokeWidth={0.75} />
          <path
            d={`M ${s.x + s.w} ${s.cy} C ${s.x + s.w + 110} ${s.cy}, ${tx - 110} ${tcy}, ${tx} ${tcy}`}
            {...stroke}
            stroke="var(--muted-foreground)"
            strokeWidth={1}
          />
        </g>
      ))}
      <rect x={target.x} y={target.y} width={target.w} height={target.h} rx={12} {...stroke} stroke="var(--foreground)" strokeWidth={2} />
    </Frame>
  );
}

/** 04 — reach: arcs of differing spans from one origin */
function B2BCover({ className }: { className?: string }) {
  const baseY = 390;
  const ox = 140;
  const spans = [150, 250, 350, 460, 560];
  const lifts = [90, 150, 200, 245, 285];
  return (
    <Frame label="Abstract diagram of arcs radiating from a single origin point" className={className}>
      <line x1={70} y1={baseY} x2={730} y2={baseY} stroke="var(--border)" strokeWidth={0.75} />
      {spans.map((s, i) => {
        const ex = ox + s;
        return (
          <g key={s}>
            <path
              d={`M ${ox} ${baseY} Q ${(ox + ex) / 2} ${baseY - lifts[i] * 2} ${ex} ${baseY}`}
              {...stroke}
              stroke="var(--muted-foreground)"
              strokeWidth={1}
            />
            <circle cx={ex} cy={baseY} r={4} fill="var(--card)" stroke="var(--border)" strokeWidth={0.75} />
          </g>
        );
      })}
      <circle cx={ox} cy={baseY} r={10} fill="var(--foreground)" />
    </Frame>
  );
}

export function CaseCover({ slug, className }: Props) {
  switch (slug) {
    case "executive-bi-suite":
      return <BiCover className={className} />;
    case "ai-automation-platform":
      return <AutomationCover className={className} />;
    case "digital-workplace-pwa":
      return <WorkplaceCover className={className} />;
    case "b2b-ecommerce-launch":
      return <B2BCover className={className} />;
    default:
      return <BiCover className={className} />;
  }
}
