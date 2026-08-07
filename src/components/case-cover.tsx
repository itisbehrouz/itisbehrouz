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

/** 05 — branding: a single letterform evolving into a composed mark */
function BrandingCover({ className }: { className?: string }) {
  const x = 260, y = 140, w = 280, h = 220;
  return (
    <Frame label="Abstract brand mark formed by layered geometric shapes" className={className}>
      <rect x={x} y={y} width={w} height={h} rx={16} {...stroke} stroke="var(--border)" strokeWidth={0.75} />
      <g transform={`translate(${x + w / 2} ${y + h / 2})`}>
        <rect x={-70} y={-60} width={40} height={120} rx={4} {...stroke} stroke="var(--border)" strokeWidth={0.75} />
        <rect x={-10} y={-60} width={40} height={120} rx={4} {...stroke} stroke="var(--muted-foreground)" strokeWidth={0.75} />
        <circle cx={55} cy={-35} r={18} {...stroke} stroke="var(--foreground)" strokeWidth={2} />
        <path d="M 37 10 L 73 10 L 55 55 Z" {...stroke} stroke="var(--foreground)" strokeWidth={2} />
      </g>
    </Frame>
  );
}

/** 06 — architecture: horizon line with rising verticals */
function ArchitectureCover({ className }: { className?: string }) {
  const baseY = 380;
  const towers = [80, 140, 200, 280, 360, 440, 520, 600, 680, 740];
  const heights = [140, 220, 180, 260, 110, 200, 150, 240, 170, 130];
  return (
    <Frame label="Abstract skyline of vertical forms rising from a shared horizon" className={className}>
      <line x1={60} y1={baseY} x2={740} y2={baseY} stroke="var(--border)" strokeWidth={0.75} />
      {towers.map((tx, i) => (
        <g key={tx}>
          <rect x={tx - 16} y={baseY - heights[i]} width={32} height={heights[i]} rx={3} {...stroke} stroke="var(--border)" strokeWidth={0.75} />
          <line x1={tx} y1={baseY - heights[i] - 18} x2={tx} y2={baseY - heights[i]} stroke="var(--foreground)" strokeWidth={1.5} />
        </g>
      ))}
      <path d="M 60 340 Q 230 260 400 320 T 740 300" {...stroke} stroke="var(--muted-foreground)" strokeWidth={1} />
    </Frame>
  );
}

/** 07 — 360 feedback: concentric rings with radial spokes */
function FeedbackCover({ className }: { className?: string }) {
  const cx = 400, cy = 250;
  const radii = [60, 110, 160, 210];
  const spokes = 12;
  return (
    <Frame label="Abstract 360-degree feedback diagram with concentric rings" className={className}>
      {radii.map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} {...stroke} stroke="var(--border)" strokeWidth={0.75} />
      ))}
      {Array.from({ length: spokes }).map((_, i) => {
        const a = (i * 2 * Math.PI) / spokes;
        const x2 = cx + Math.cos(a) * 220;
        const y2 = cy + Math.sin(a) * 220;
        return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="var(--border)" strokeWidth={0.5} />;
      })}
      <circle cx={cx} cy={cy} r={10} fill="var(--foreground)" />
      <circle cx={cx + 110} cy={cy - 80} r={6} fill="var(--card)" stroke="var(--foreground)" strokeWidth={1.5} />
      <circle cx={cx - 130} cy={cy + 60} r={6} fill="var(--card)" stroke="var(--foreground)" strokeWidth={1.5} />
      <circle cx={cx + 80} cy={cy + 130} r={6} fill="var(--card)" stroke="var(--foreground)" strokeWidth={1.5} />
    </Frame>
  );
}

/** 08 — web platform: stacked browser planes suggesting depth */
function WebPlatformCover({ className }: { className?: string }) {
  const planes = [
    { x: 220, y: 150, w: 360, h: 220, o: 1 },
    { x: 190, y: 120, w: 360, h: 220, o: 0.55 },
    { x: 160, y: 90, w: 360, h: 220, o: 0.3 },
  ];
  return (
    <Frame label="Abstract stacked web platform layers" className={className}>
      {planes.map((p, i) => (
        <g key={i} opacity={p.o}>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={12} {...stroke} stroke="var(--border)" strokeWidth={0.75} />
          <line x1={p.x + 24} y1={p.y + 36} x2={p.x + p.w - 24} y2={p.y + 36} stroke="var(--border)" strokeWidth={0.75} />
          <circle cx={p.x + 22} cy={p.y + 18} r={3} fill="var(--border)" />
          <circle cx={p.x + 36} cy={p.y + 18} r={3} fill="var(--border)" />
          <circle cx={p.x + 50} cy={p.y + 18} r={3} fill="var(--border)" />
          <rect x={p.x + 32} y={p.y + 72} width={p.w - 64} height={16} rx={3} {...stroke} stroke="var(--muted-foreground)" strokeWidth={0.75} />
          <rect x={p.x + 32} y={p.y + 104} width={p.w - 64} height={16} rx={3} {...stroke} stroke="var(--muted-foreground)" strokeWidth={0.75} />
          <rect x={p.x + 32} y={p.y + 136} width={p.w * 0.55} height={16} rx={3} {...stroke} stroke="var(--foreground)" strokeWidth={0.75} />
        </g>
      ))}
    </Frame>
  );
}

/** 09 — product hub: central node connected to product cards */
function ProductHubCover({ className }: { className?: string }) {
  const cx = 400, cy = 250;
  const cards = [
    { x: 120, y: 110, w: 110, h: 70 },
    { x: 120, y: 320, w: 110, h: 70 },
    { x: 570, y: 110, w: 110, h: 70 },
    { x: 570, y: 320, w: 110, h: 70 },
  ];
  return (
    <Frame label="Abstract product data hub connected to four product records" className={className}>
      <rect x={cx - 80} y={cy - 55} width={160} height={110} rx={14} {...stroke} stroke="var(--foreground)" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={12} fill="var(--foreground)" />
      {cards.map((c, i) => {
        const tx = c.x + c.w / 2;
        const ty = c.y + c.h / 2;
        return (
          <g key={i}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={8} {...stroke} stroke="var(--border)" strokeWidth={0.75} />
            <path d={`M ${cx} ${cy} L ${tx} ${ty}`} {...stroke} stroke="var(--muted-foreground)" strokeWidth={1} />
            <circle cx={tx} cy={ty} r={4} fill="var(--card)" stroke="var(--border)" strokeWidth={0.75} />
          </g>
        );
      })}
    </Frame>
  );
}

/** 10 — supply chain: flowing stages with directional arrows */
function SupplyChainCover({ className }: { className?: string }) {
  const stages = [120, 280, 440, 600];
  const y = 220;
  const h = 120;
  return (
    <Frame label="Abstract supply chain flow with connected stages" className={className}>
      {stages.map((x, i) => {
        const isFirst = i === 0;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={120}
              height={h}
              rx={10}
              {...stroke}
              stroke={isFirst ? "var(--foreground)" : "var(--border)"}
              strokeWidth={isFirst ? 2 : 0.75}
            />
            <circle
              cx={x + 60}
              cy={y + h / 2}
              r={isFirst ? 8 : 5}
              fill={isFirst ? "var(--foreground)" : "var(--card)"}
              stroke="var(--border)"
              strokeWidth={0.75}
            />
          </g>
        );
      })}
      {stages.slice(0, -1).map((x, i) => {
        const sx = x + 120;
        const ex = stages[i + 1];
        return (
          <g key={`a-${i}`}>
            <line x1={sx} y1={y + h / 2} x2={ex - 8} y2={y + h / 2} stroke="var(--muted-foreground)" strokeWidth={1} />
            <path d={`M ${ex - 8} ${y + h / 2 - 6} L ${ex} ${y + h / 2} L ${ex - 8} ${y + h / 2 + 6}`} {...stroke} stroke="var(--muted-foreground)" strokeWidth={1} />
          </g>
        );
      })}
      <line x1={80} y1={y + h + 40} x2={720} y2={y + h + 40} stroke="var(--border)" strokeWidth={0.75} strokeDasharray="6 6" />
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
    case "rubin-kimya-rebranding":
      return <BrandingCover className={className} />;
    case "valory-vista-digital-branding":
      return <ArchitectureCover className={className} />;
    case "insight360":
      return <FeedbackCover className={className} />;
    case "yigitoglu-digital-evolution":
      return <WebPlatformCover className={className} />;
    case "digital-product-management-app":
      return <ProductHubCover className={className} />;
    case "supply-chain-bi-dashboard":
      return <SupplyChainCover className={className} />;
    default:
      return <BiCover className={className} />;
  }
}
