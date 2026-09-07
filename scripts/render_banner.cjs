const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

async function generateBanner() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 2400, height: 800 },
    deviceScaleFactor: 1,
  });

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
    }
    body {
      width: 2400px;
      height: 800px;
      background-color: #030712;
      color: #F8FAFC;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 68px 84px;
    }

    /* Technical Coordinate Grid */
    .bg-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.032) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.032) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
      z-index: 1;
    }

    /* Radial glow accents */
    .radial-glow-top {
      position: absolute;
      top: -160px;
      left: 15%;
      width: 900px;
      height: 520px;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, transparent 70%);
      pointer-events: none;
      z-index: 1;
    }

    .radial-glow-right {
      position: absolute;
      top: 40px;
      right: -80px;
      width: 1000px;
      height: 720px;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.09) 0%, transparent 65%);
      pointer-events: none;
      z-index: 1;
    }

    /* Official Achord Mark Watermark */
    .brand-watermark {
      position: absolute;
      right: 44px;
      top: 24px;
      width: 740px;
      height: 770px;
      opacity: 0.085;
      pointer-events: none;
      z-index: 2;
    }

    /* Top Bar */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
    }

    .role-badge {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 10px 22px;
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(56, 189, 248, 0.28);
      border-radius: 9999px;
      font-size: 19px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #E2E8F0;
      backdrop-filter: blur(12px);
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #38BDF8;
      box-shadow: 0 0 12px #38BDF8;
    }

    .meta-location {
      font-size: 19px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #64748B;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    }

    /* Main Identity Center */
    .hero-body {
      position: relative;
      z-index: 10;
      margin-top: 12px;
    }

    .founder-name {
      font-size: 88px;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.04em;
      color: #FFFFFF;
      margin-bottom: 20px;
    }

    .founder-subtitle {
      font-size: 32px;
      line-height: 1.35;
      color: #94A3B8;
      font-weight: 400;
      max-width: 1650px;
      margin-bottom: 34px;
    }

    .founder-subtitle strong {
      color: #F8FAFC;
      font-weight: 600;
    }

    /* CLI Chips */
    .cli-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
    }

    .cli-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 8px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 18px;
      font-weight: 500;
      color: #CBD5E1;
      backdrop-filter: blur(8px);
    }

    .cli-prompt {
      color: #38BDF8;
      font-weight: 600;
    }

    /* 4-Column Bottom Architecture Grid */
    .architecture-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 28px;
      position: relative;
      z-index: 10;
      padding-top: 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.09);
    }

    .grid-col {
      border-left: 2px solid rgba(56, 189, 248, 0.45);
      padding-left: 18px;
      display: flex;
      flex-direction: column;
    }

    .col-header {
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #38BDF8;
      margin-bottom: 8px;
    }

    .col-title {
      font-size: 22px;
      font-weight: 700;
      color: #F8FAFC;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }

    .col-desc {
      font-size: 16px;
      line-height: 1.45;
      color: #94A3B8;
      font-weight: 400;
    }
  </style>
</head>
<body>
  <div class="bg-grid"></div>
  <div class="radial-glow-top"></div>
  <div class="radial-glow-right"></div>

  <!-- Canonical Achord 4-Plate Mark Watermark -->
  <svg class="brand-watermark" viewBox="0 0 1399.79 1461.03" fill="none">
    <g transform="translate(-300.11,-269.48)" fill="#38BDF8">
      <path d="M1699.89,922.22l-269.47,4.96c-194.35,3.58-366.69-164.26-367.92-358.25l-1.89-299.34,636.52-.11,2.77,652.74Z"/>
      <path d="M935.12,1486.53l-3.15,243.36-629.36.62-2.5-661.89,276.05,1.66c209.91,1.26,361.77,199.56,358.97,416.24Z"/>
      <path d="M938.38,493.53c18.87,227.74-139.71,432.4-361.84,433.83l-273.85,1.77-2.04-659.48,423.44,1.96c120.34.56,212.36,94.37,214.29,221.92Z"/>
      <path d="M1699.39,1725.69l-453.35,4.07c-124.07,1.11-186.15-97.18-188.84-211.87-5.35-227.54,142.1-424.51,375.82-447.08l263.72-1.68,2.64,656.55Z"/>
    </g>
  </svg>

  <!-- Top Bar -->
  <div class="top-bar">
    <div class="role-badge">
      <div class="status-dot"></div>
      Founder & Systems Architect • Achord Ltd
    </div>
    <div class="meta-location">
      Achord Bilgi Teknolojileri • Istanbul, TR
    </div>
  </div>

  <!-- Hero Body -->
  <div class="hero-body">
    <h1 class="founder-name">Behrouz Bagherzadeh</h1>
    <p class="founder-subtitle">
      Systems architecture for <strong>enterprise operating platforms</strong>, <strong>developer control planes</strong>, and <strong>native macOS software</strong>.
    </p>
    <div class="cli-chips">
      <div class="cli-chip"><span class="cli-prompt">$</span> ousterhout.deep-modules</div>
      <div class="cli-chip"><span class="cli-prompt">$</span> go.standard-library</div>
      <div class="cli-chip"><span class="cli-prompt">$</span> typescript.strict</div>
      <div class="cli-chip"><span class="cli-prompt">$</span> swift.native-macos</div>
      <div class="cli-chip"><span class="cli-prompt">$</span> postgresql.pgxpool</div>
    </div>
  </div>

  <!-- 4-Column Architecture Grid -->
  <div class="architecture-grid">
    <div class="grid-col">
      <div class="col-header">01 / Architecture</div>
      <div class="col-title">Enterprise Systems</div>
      <div class="col-desc">Distributed backends, event pipelines, and regulatory compliance engines.</div>
    </div>
    <div class="grid-col">
      <div class="col-header">02 / Telemetry</div>
      <div class="col-title">Developer Control Planes</div>
      <div class="col-desc">Master telemetry control planes, real-time SSE streams, and system sentinels.</div>
    </div>
    <div class="grid-col">
      <div class="col-header">03 / Native Clients</div>
      <div class="col-title">macOS Desktop</div>
      <div class="col-desc">Swift 6 and SwiftUI utilities built with Apple HIG and minimal memory footprints.</div>
    </div>
    <div class="grid-col">
      <div class="col-header">04 / Doctrine</div>
      <div class="col-title">Deep Module Seams</div>
      <div class="col-desc">Minimal surface interfaces that hide significant complexity, with zero passthrough.</div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(htmlContent, { waitUntil: "networkidle" });
  const outputPath = path.join(__dirname, "..", "banner.png");
  await page.screenshot({ path: outputPath, type: "png" });
  await browser.close();
  console.log("Successfully generated pixel-perfect banner.png at:", outputPath);
}

generateBanner().catch((err) => {
  console.error("Banner generation failed:", err);
  process.exit(1);
});
