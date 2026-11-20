// scripts/visuals/automation-testing/scenes-sections.mjs
// Hero, lifecycle and strategy-banner visuals for /services/automation-testing.
import {
  C, MONO, svg, bg, shadowDef, text, rect, bar, icon, iconTile, windowFrame, chip,
  connector, lineChart,
} from '../website-development/kit.mjs';
import './scenes-services.mjs'; // registers the QA icons on ICONS

const tick = (cx, cy, r = 14, color = C.green) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>${icon('check', cx, cy, r * 1.15, { color: C.navy0, sw: 3.2 })}`;

// ── Hero (2400×1280) ─────────────────────────────────────────────────────────
// CI pipeline + test runner + browser under test on the right; the left ~45%
// stays dark for the hero copy.
function hero() {
  const W = 2400, H = 1280;
  const stages = []; let sx = 1390;
  for (const [ic, l] of [['branch', 'Commit'], ['flask', 'Unit'], ['braces', 'API'], ['monitor', 'E2E'], ['upload', 'Deploy']]) {
    const w = 110 + l.length * 15; stages.push([ic, l, sx + w / 2, w]); sx += w + 22;
  }
  return svg(W, H, `${bg(W, H, { glowX: 0.8, glowY: 0.45, glow: 0.3 })}${shadowDef('sh', { dy: 24, blur: 40, op: 0.6 })}
  <defs><linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="${C.navy0}"/><stop offset=".45" stop-color="${C.navy0}" stop-opacity=".9"/><stop offset=".58" stop-color="${C.navy0}" stop-opacity="0"/></linearGradient></defs>
  <path d="M${stages[0][2]} 190H${stages[4][2]}" stroke="${C.green}" stroke-opacity=".5" stroke-width="2.5" stroke-dasharray="4 10"/>
  ${stages.map(([ic, l, x, w], i) => `${rect(x - w / 2, 150, w, 80, { r: 40, fill: C.panel2, stroke: i === 4 ? C.green : C.line2, filter: 'sh' })}${iconTile(ic, x - w / 2 + 42, 190, 48, { tint: i === 4 ? C.green : C.blue, color: i === 4 ? C.green : C.blue2 })}${text(x - w / 2 + 76, 200, l, { size: 26, weight: 600 })}`).join('')}
  ${connector(`M${stages[3][2]} 230V300`, { dash: '3 9', ends: [[stages[3][2], 300]] })}
  <!-- test runner -->
  ${windowFrame(1440, 300, 560, 640, { k: 1.25, url: 'test results' })}
  ${[['checkout.spec', 1], ['login.spec', 1], ['search.spec', 1], ['cart.spec', 1], ['profile.spec', 2], ['orders.spec', 1], ['api/orders', 1]].map(([n, st], i) => {
    const y = 384 + i * 74;
    return `${rect(1476, y, 488, 58, { r: 12, fill: C.panel3 })}${text(1500, y + 37, n, { size: 24, family: MONO, fill: C.text })}
    ${bar(1740, y + 24, 120, { h: 10, fill: st === 2 ? C.amber : C.green, op: 0.7 })}${st === 2 ? `<circle cx="1928" cy="${y + 29}" r="15" fill="${C.amber}"/>${text(1928, y + 37, '!', { size: 22, weight: 800, anchor: 'middle', fill: C.navy0 })}` : tick(1928, y + 29, 15)}`;
  }).join('')}
  <!-- browser under test -->
  <g filter="url(#sh)">${rect(1960, 580, 400, 380, { r: 24, fill: C.panel2, stroke: C.line2, sw: 2 })}</g>
  ${rect(1984, 620, 352, 56, { r: 10, fill: C.panel3 })}${bar(2004, 642, 150, { h: 12, fill: C.text })}
  ${rect(1984, 692, 170, 140, { r: 10, fill: C.blue2, op: 0.4, stroke: '' })}${bar(2170, 710, 140, { h: 12, fill: C.text })}${bar(2170, 736, 100, { h: 10 })}
  ${rect(1984, 856, 352, 64, { r: 32, fill: C.orange, stroke: '' })}${bar(2095, 882, 130, { h: 12, fill: C.white })}
  <circle cx="2160" cy="888" r="52" fill="none" stroke="${C.green}" stroke-width="3" stroke-dasharray="7 7"/>
  ${icon('cursor', 2195, 915, 52, { color: C.white, fill: C.navy0, sw: 1.8 })}
  ${chip(1440, 990, 'Quality gate passed', { size: 26, dot: C.green }).svg}
  ${chip(1820, 990, 'Flaky test quarantined', { size: 26, dot: C.amber }).svg}
  <rect width="${W}" height="${H}" fill="url(#fadeL)"/>`);
}

// ── Lifecycle (wide 1800×760 in two rows, tall 720×2000) ────────────────────
const STEPS = [
  ['search', 'Discovery', 'Risk map'],
  ['file', 'Strategy', 'Test plan'],
  ['sitemap', 'Architecture', 'Framework design'],
  ['gear', 'Framework', 'CI-ready setup'],
  ['code', 'Development', 'Test suites'],
  ['branch', 'CI/CD', 'Quality gates'],
  ['play', 'Execution', 'Reports'],
  ['bug', 'Defects', 'Root causes'],
  ['refresh', 'Maintenance', 'Healthy suite'],
  ['trend', 'Improvement', 'Release metrics'],
];

function lifecycleWide() {
  const W = 1800, H = 760;
  const pos = (i) => {
    const row = Math.floor(i / 5), col = row === 0 ? i % 5 : 4 - (i % 5);
    return [180 + col * 360, row === 0 ? 170 : 520];
  };
  const p = STEPS.map((_, i) => pos(i));
  return svg(W, H, `${bg(W, H, { glowX: 0.5, glowY: 0.1, glow: 0.18, r: 28 })}${shadowDef('sh')}
  <defs><linearGradient id="lw" x1="0" x2="1"><stop offset="0" stop-color="${C.blue2}"/><stop offset="1" stop-color="${C.green}"/></linearGradient></defs>
  <path d="M${p[0][0]} 170H${p[4][0]} C ${p[4][0] + 185} 170, ${p[4][0] + 185} 520, ${p[5][0]} 520 H${p[9][0]}" fill="none" stroke="url(#lw)" stroke-width="4" stroke-opacity=".75"/>
  ${STEPS.map(([ic, t, d], i) => {
    const [x, y] = p[i], last = i === 9;
    return `<circle cx="${x}" cy="${y}" r="70" fill="${C.navy0}"/><circle cx="${x}" cy="${y}" r="62" fill="${C.panel2}" stroke="${last ? C.green : C.blue2}" stroke-width="3" filter="url(#sh)"/>
    ${icon(ic, x, y, 52, { color: last ? C.green : C.blue3 })}
    <circle cx="${x + 48}" cy="${y - 48}" r="23" fill="${last ? C.green : C.blue}"/>${text(x + 48, y - 40, String(i + 1).padStart(2, '0'), { size: 20, weight: 700, anchor: 'middle', fill: last ? C.navy0 : C.white, family: MONO })}
    ${text(x, y + 112, t, { size: 32, weight: 700, anchor: 'middle' })}
    ${chip(x, y + 132, d, { size: 23, anchor: 'middle', fill: C.panel3 }).svg}`;
  }).join('')}`);
}

function lifecycleTall() {
  const W = 720, H = 2000;
  return svg(W, H, `${bg(W, H, { glowX: 0.2, glowY: 0.1, glow: 0.18, r: 28 })}${shadowDef('sh')}
  <defs><linearGradient id="lt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.blue2}"/><stop offset="1" stop-color="${C.green}"/></linearGradient></defs>
  <path d="M130 110V1890" stroke="url(#lt)" stroke-width="4" stroke-opacity=".8"/>
  ${STEPS.map(([ic, t, d], i) => {
    const y = 110 + i * 197.8, last = i === 9;
    return `<circle cx="130" cy="${y}" r="66" fill="${C.navy0}"/><circle cx="130" cy="${y}" r="58" fill="${C.panel2}" stroke="${last ? C.green : C.blue2}" stroke-width="3" filter="url(#sh)"/>
    ${icon(ic, 130, y, 50, { color: last ? C.green : C.blue3 })}
    <circle cx="176" cy="${y - 44}" r="22" fill="${last ? C.green : C.blue}"/>${text(176, y - 36, String(i + 1).padStart(2, '0'), { size: 20, weight: 700, anchor: 'middle', fill: last ? C.navy0 : C.white, family: MONO })}
    ${text(236, y - 6, t, { size: 38, weight: 700 })}
    ${chip(236, y + 20, d, { size: 27 }).svg}`;
  }).join('')}`);
}

// ── Strategy banners (960×540 each, no text) ───────────────────────────────
const BW = 960, BH = 540;
const banner = (body, opts) => svg(BW, BH, `${bg(BW, BH, { glow: 0.24, ...opts })}${shadowDef('sh')}${body}`);
const benefits = {
  // Where each check lives — the test pyramid
  'strategy-test-pyramid': () => banner(`
    ${[[0, 560, C.green], [1, 420, C.blue2], [2, 280, C.orange]].map(([i, w, c]) => {
      const y = 380 - i * 110;
      return `${rect(480 - w / 2, y, w, 90, { r: 16, fill: c, op: 0.18, stroke: c, sw: 2.5, filter: 'sh' })}
      ${Array.from({ length: [9, 5, 2][i] }, (_, k) => `<circle cx="${480 - w / 2 + 40 + k * ((w - 80) / Math.max(1, [9, 5, 2][i] - 1))}" cy="${y + 45}" r="${[10, 13, 16][i]}" fill="${c}" fill-opacity=".85"/>`).join('')}`;
    }).join('')}
    ${icon('bolt', 840, 420, 54, { color: C.green, sw: 2 })}${icon('monitor', 840, 205, 54, { color: C.orange, sw: 2 })}
    <path d="M840 260V380" stroke="${C.muted}" stroke-width="3" stroke-dasharray="4 8"/>`, { glowX: 0.5, glowY: 0.6 }),
  // What blocks a release — gates
  'strategy-release-gates': () => banner(`
    <path d="M80 300H880" stroke="${C.blue2}" stroke-opacity=".5" stroke-width="5" stroke-dasharray="6 12"/>
    ${[['flask', C.green, 1], ['gauge', C.green, 1], ['eye', C.green, 1], ['gate', C.amber, 0]].map(([ic, c, ok], i) => {
      const x = 140 + i * 180;
      return `${rect(x - 70, 200, 140, 200, { r: 22, fill: C.panel2, stroke: c, sw: 2.5, filter: 'sh' })}${icon(ic, x, 280, 64, { color: c, sw: 1.8 })}
      ${ok ? tick(x, 360, 20) : `<circle cx="${x}" cy="360" r="20" fill="${C.amber}"/>${icon('lock', x, 360, 22, { color: C.navy0, sw: 2.4 })}`}`;
    }).join('')}
    ${rect(820, 250, 110, 100, { r: 18, fill: C.green, op: 0.18, stroke: C.green, sw: 2.5 })}${icon('upload', 875, 300, 50, { color: C.green, sw: 2 })}`, { glowX: 0.5 }),
  // A flaky-test policy — quarantine
  'strategy-flaky-tests': () => banner(`
    ${[0, 1, 2, 3].map((i) => `${rect(110, 110 + i * 84, 380, 64, { r: 14, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${bar(140, 136 + i * 84, 200, { h: 12, fill: C.text, op: 0.7 })}${tick(450, 142 + i * 84, 16)}`).join('')}
    <rect x="560" y="120" width="300" height="300" rx="26" fill="${C.amber}" fill-opacity=".08" stroke="${C.amber}" stroke-width="3" stroke-dasharray="10 10"/>
    ${rect(600, 220, 220, 100, { r: 18, fill: C.panel2, stroke: C.amber, sw: 2.5, filter: 'sh' })}${icon('bug', 650, 270, 52, { color: C.amber, sw: 1.8 })}
    ${[0, 1, 2].map((k) => `<circle cx="${710 + k * 30}" cy="270" r="9" fill="${k === 1 ? C.red : C.green}"/>`).join('')}
    ${connector('M490 270 C 530 270, 540 270, 590 270', { dash: '3 8', color: C.amber, op: 0.8 })}`, { glowX: 0.7 }),
  // Test data & environments — seeded, resettable
  'strategy-test-data': () => banner(`
    <circle cx="330" cy="270" r="150" fill="none" stroke="${C.blue2}" stroke-opacity=".45" stroke-width="4" stroke-dasharray="6 14"/>
    <circle cx="330" cy="270" r="96" fill="${C.panel2}" stroke="${C.blue2}" stroke-width="3" filter="url(#sh)"/>${icon('db', 330, 270, 96, { color: C.blue3, sw: 1.6 })}
    ${[['upload', 330, 120, C.green], ['refresh', 480, 270, C.amber], ['check', 330, 420, C.green]].map(([ic, x, y, c]) => `<circle cx="${x}" cy="${y}" r="40" fill="${C.panel3}" stroke="${c}" stroke-width="2.5" filter="url(#sh)"/>${icon(ic, x, y, 38, { color: c, sw: 2 })}`).join('')}
    ${rect(600, 160, 260, 220, { r: 22, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${icon('server', 660, 230, 54, { color: C.blue3, sw: 1.8 })}${bar(700, 220, 120, { h: 12, fill: C.text })}
    ${rect(630, 300, 200, 50, { r: 25, fill: C.navy1, stroke: C.blue2, sw: 2, op: 0.9 })}${icon('braces', 668, 325, 26, { color: C.blue3, sw: 2 })}${bar(694, 320, 110, { h: 10, fill: C.blue3 })}`, { glowX: 0.4, glowY: 0.5 }),
  // Maintainable test code — role-based locators
  'strategy-maintainable-code': () => banner(`
    ${windowFrame(110, 80, 440, 380, { url: 'checkout.spec.ts' })}
    ${[['getByRole(\'button\')', C.green], ['getByLabel(\'Email\')', C.green], ['page.checkout()', C.blue3], ['expect(total)', C.amber]].map(([l, c], i) => `${text(140, 180 + i * 64, l, { size: 26, family: MONO, fill: c })}`).join('')}
    ${rect(600, 120, 260, 300, { r: 22, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${[0, 1, 2].map((i) => `${rect(624, 150 + i * 86, 212, 66, { r: 12, fill: C.panel3 })}${icon(['grid', 'layers', 'branch'][i], 660, 183 + i * 86, 32, { color: C.blue3, sw: 2 })}${bar(690, 176 + i * 86, 120, { h: 12, fill: C.text, op: 0.7 })}`).join('')}
    ${connector('M550 270 C 575 270, 580 270, 600 270', { dash: '3 8', op: 0.8 })}`, { glowX: 0.5 }),
  // Reporting & handover — CI report with traces
  'strategy-reporting': () => banner(`
    ${rect(150, 60, 420, 420, { r: 22, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${bar(182, 96, 180, { h: 16, fill: C.text })}
    ${[[C.green], [C.red], [C.amber]].map(([c], i) => `<circle cx="${200 + i * 120}" cy="156" r="12" fill="${c}"/>${bar(220 + i * 120, 151, 60, { h: 10, fill: C.text, op: 0.6 })}`).join('')}
    ${rect(182, 196, 356, 120, { r: 12, fill: C.panel3 })}${lineChart(200, 214, 320, 84, [0.6, 0.55, 0.62, 0.5, 0.48, 0.45, 0.42], { color: C.green })}
    ${[0, 1].map((i) => `${rect(182, 340 + i * 64, 356, 50, { r: 10, fill: C.panel3 })}${bar(202, 360 + i * 64, 160, { h: 10, fill: C.text, op: 0.6 })}${icon(i ? 'monitor' : 'play', 500, 365 + i * 64, 26, { color: C.blue3, sw: 2 })}`).join('')}
    ${rect(620, 120, 220, 160, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${rect(640, 140, 180, 100, { r: 10, fill: C.blue2, op: 0.35, stroke: '' })}${icon('cursor', 720, 200, 36, { color: C.white, fill: C.navy0 })}${bar(640, 254, 120, { h: 10 })}
    ${rect(620, 310, 220, 130, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${icon('file', 670, 375, 50, { color: C.green, sw: 1.8 })}${bar(706, 362, 100, { h: 12, fill: C.text })}${bar(706, 386, 70, { h: 10 })}`, { glowX: 0.5 }),
};

export const sections = {
  'automation-testing-hero': hero,
  'lifecycle-wide': lifecycleWide,
  'lifecycle-tall': lifecycleTall,
  ...benefits,
};
