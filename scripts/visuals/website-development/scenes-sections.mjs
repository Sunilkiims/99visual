// Hero, process, technology stack, industries and benefits visuals.
import {
  C, MONO, svg, bg, shadowDef, text, rect, bar, icon, iconTile, windowFrame, chip,
  connector, arrow, lineChart,
} from './kit.mjs';

// ── Hero (2400×1280) ─────────────────────────────────────────────────────────
// Devices on the right; the left ~45% stays dark for the hero copy, which
// sits on top of this image.
function siteMock(x, y, w, h, { cols = 3, k = 1 } = {}) {
  const pad = 22 * k;
  const nav = `${rect(x + pad, y + pad, w - pad * 2, 44 * k, { r: 8 * k, fill: C.panel3 })}${bar(x + pad * 2, y + pad + 17 * k, 80 * k, { h: 11 * k, fill: C.text })}
    ${[0, 1, 2].map((i) => bar(x + w - pad * 2 - (3 - i) * 64 * k, y + pad + 18 * k, 46 * k, { h: 8 * k })).join('')}`;
  const heroH = h * 0.36;
  const hy = y + pad + 60 * k;
  const hero = `${rect(x + pad, hy, w - pad * 2, heroH, { r: 12 * k, fill: C.blue, op: 0.9, stroke: '' })}
    ${bar(x + pad * 2, hy + heroH * 0.28, (w - pad * 4) * 0.55, { h: 18 * k, fill: C.white })}
    ${bar(x + pad * 2, hy + heroH * 0.28 + 30 * k, (w - pad * 4) * 0.4, { h: 18 * k, fill: C.white })}
    ${rect(x + pad * 2, hy + heroH * 0.28 + 66 * k, 130 * k, 36 * k, { r: 18 * k, fill: C.orange, stroke: '' })}`;
  const cy = hy + heroH + 18 * k, cw = (w - pad * 2 - (cols - 1) * 14 * k) / cols, ch = y + h - pad - cy;
  const cards = Array.from({ length: cols }, (_, i) => {
    const cx = x + pad + i * (cw + 14 * k);
    return `${rect(cx, cy, cw, ch, { r: 10 * k, fill: C.panel3 })}${rect(cx + 10 * k, cy + 10 * k, cw - 20 * k, ch * 0.45, { r: 8 * k, fill: [C.blue2, C.green, C.orange][i % 3], op: 0.45, stroke: '' })}
      ${bar(cx + 12 * k, cy + ch * 0.62, cw * 0.6, { h: 10 * k, fill: C.text })}${bar(cx + 12 * k, cy + ch * 0.62 + 22 * k, cw * 0.4, { h: 8 * k })}`;
  }).join('');
  return nav + hero + cards;
}

function hero() {
  const W = 2400, H = 1280;
  // Everything sits right of x≈1450 so it clears the headline at common
  // desktop widths (the image is cropped from the left by object-fit).
  const arch = [['code', 'Frontend', 1560], ['braces', 'API', 1790], ['db', 'Database', 2010], ['cloud', 'Cloud', 2250]];
  return svg(W, H, `${bg(W, H, { glowX: 0.8, glowY: 0.45, glow: 0.3 })}${shadowDef('sh', { dy: 24, blur: 40, op: 0.6 })}
  <defs><linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="${C.navy0}"/><stop offset=".45" stop-color="${C.navy0}" stop-opacity=".9"/><stop offset=".58" stop-color="${C.navy0}" stop-opacity="0"/></linearGradient></defs>
  <!-- architecture strip -->
  <path d="M${arch[0][2]} 190H${arch[3][2]}" stroke="${C.blue2}" stroke-opacity=".45" stroke-width="2.5" stroke-dasharray="4 10"/>
  ${arch.map(([ic, l, x]) => `${rect(x - 104, 150, 208, 80, { r: 40, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${iconTile(ic, x - 62, 190, 48, {})}${text(x - 30, 200, l, { size: 26, weight: 600 })}`).join('')}
  ${connector('M1900 230V300', { dash: '3 9', ends: [[1900, 300]] })}
  <!-- desktop -->
  ${windowFrame(1520, 300, 800, 500, { k: 1.25, url: 'yourbrand.com' })}
  ${siteMock(1520, 350, 800, 450, { cols: 3, k: 1.15 })}
  <path d="M1880 800h80l22 76h-124z" fill="${C.panel2}" stroke="${C.line2}" stroke-width="1.5"/>
  ${rect(1790, 872, 260, 20, { r: 10, fill: C.panel2 })}
  <!-- tablet -->
  <g filter="url(#sh)">${rect(1440, 640, 320, 440, { r: 28, fill: '#0C1426', stroke: C.line2, sw: 2 })}</g>
  ${rect(1458, 660, 284, 400, { r: 14, fill: C.panel })}
  ${siteMock(1458, 660, 284, 400, { cols: 2, k: 0.78 })}
  <!-- phone -->
  <g filter="url(#sh)">${rect(2170, 690, 200, 380, { r: 32, fill: '#0C1426', stroke: C.line2, sw: 2 })}</g>
  ${rect(2184, 710, 172, 340, { r: 20, fill: C.panel })}
  ${siteMock(2184, 722, 172, 328, { cols: 1, k: 0.56 })}
  <!-- status chips -->
  ${chip(1990, 960, 'HTTPS', { size: 26, dot: C.green }).svg}
  ${chip(1760, 960, 'Responsive', { size: 26, dot: C.blue2 }).svg}
  <rect width="${W}" height="${H}" fill="url(#fadeL)"/>`);
}

// ── Process (wide 1800×560, tall 720×1260) ─────────────────────────────────
const STAGES = [
  ['search', ['Discovery', '& Scoping'], 'Scope & goals'],
  ['sitemap', ['Strategy', '& UX'], 'Wireframes'],
  ['code', ['Design', '& Build'], 'Staging builds'],
  ['check', ['Testing', '& Launch'], 'QA report'],
  ['trend', ['Support', '& Growth'], 'Monitoring'],
];

function processWide() {
  const W = 1800, H = 560, xs = STAGES.map((_, i) => 180 + i * 360);
  return svg(W, H, `${bg(W, H, { glowX: 0.5, glowY: 0.1, glow: 0.18, r: 28 })}${shadowDef('sh')}
  <defs><linearGradient id="pl" x1="0" x2="1"><stop offset="0" stop-color="${C.blue2}"/><stop offset="1" stop-color="${C.green}"/></linearGradient></defs>
  <path d="M${xs[0]} 170H${xs[4]}" stroke="url(#pl)" stroke-width="4" stroke-opacity=".8"/>
  ${STAGES.map(([ic, [a, b], d], i) => {
    const x = xs[i], last = i === 4;
    return `<circle cx="${x}" cy="170" r="82" fill="${C.navy0}"/><circle cx="${x}" cy="170" r="74" fill="${C.panel2}" stroke="${last ? C.green : C.blue2}" stroke-width="3" filter="url(#sh)"/>
    ${icon(ic, x, 170, 62, { color: last ? C.green : C.blue3 })}
    <circle cx="${x + 56}" cy="${114}" r="26" fill="${last ? C.green : C.blue}"/>${text(x + 56, 124, `0${i + 1}`, { size: 24, weight: 700, anchor: 'middle', fill: last ? C.navy0 : C.white, family: MONO })}
    ${text(x, 310, a, { size: 36, weight: 700, anchor: 'middle' })}${text(x, 354, b, { size: 36, weight: 700, anchor: 'middle' })}
    ${chip(x, 410, d, { size: 27, anchor: 'middle', fill: C.panel3 }).svg}`;
  }).join('')}`);
}

function processTall() {
  const W = 720, H = 1260;
  return svg(W, H, `${bg(W, H, { glowX: 0.2, glowY: 0.1, glow: 0.18, r: 28 })}${shadowDef('sh')}
  <defs><linearGradient id="pt2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.blue2}"/><stop offset="1" stop-color="${C.green}"/></linearGradient></defs>
  <path d="M136 140V1120" stroke="url(#pt2)" stroke-width="4" stroke-opacity=".8"/>
  ${STAGES.map(([ic, [a, b], d], i) => {
    const y = 140 + i * 245, last = i === 4;
    return `<circle cx="136" cy="${y}" r="76" fill="${C.navy0}"/><circle cx="136" cy="${y}" r="68" fill="${C.panel2}" stroke="${last ? C.green : C.blue2}" stroke-width="3" filter="url(#sh)"/>
    ${icon(ic, 136, y, 58, { color: last ? C.green : C.blue3 })}
    <circle cx="188" cy="${y - 52}" r="24" fill="${last ? C.green : C.blue}"/>${text(188, y - 43, `0${i + 1}`, { size: 22, weight: 700, anchor: 'middle', fill: last ? C.navy0 : C.white, family: MONO })}
    ${text(250, y - 6, `${a} ${b}`, { size: 36, weight: 700 })}
    ${chip(250, y + 22, d, { size: 27 }).svg}`;
  }).join('')}`);
}

// ── Technology stack (wide 2000×820, tall 720×1560) ────────────────────────
// Shows how the categories fit together. Individual tools are NOT repeated
// here: the page lists them as real text badges right below the image.
function archCard(x, y, w, h, ic, title, sub, accent = C.blue, { ts = 40, ss = 27, tile = 84 } = {}) {
  return `${rect(x, y, w, h, { r: 24, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
  ${iconTile(ic, x + 30 + tile / 2, y + h / 2, tile, { tint: accent, color: accent === C.blue ? C.blue2 : accent })}
  ${text(x + 52 + tile, sub ? y + h / 2 - 4 : y + h / 2 + ts * 0.36, title, { size: ts, weight: 700 })}
  ${sub ? text(x + 52 + tile, y + h / 2 + ss + 6, sub, { size: ss, fill: C.muted, weight: 400 }) : ''}`;
}

function techWide() {
  const W = 2000, H = 820;
  const cy = 360, ch = 170, cw = 450;
  const cols = [ ['monitor', 'Frontend', 'Interfaces & UI', C.blue, 350], ['braces', 'Backend & APIs', 'Logic & integrations', C.orange, 880], ['db', 'Databases', 'Records & caching', C.green, 1410] ];
  return svg(W, H, `${bg(W, H, { glowX: 0.5, glowY: 0.45, glow: 0.18, r: 28 })}${shadowDef('sh')}
  <!-- users -->
  ${rect(60, cy - 95, 220, 190, { r: 24, fill: C.panel, stroke: C.line2, filter: 'sh' })}
  ${icon('monitor', 140, cy - 18, 64, { color: C.blue3 })}${icon('phone', 210, cy - 10, 48, { color: C.blue3 })}
  ${text(170, cy + 62, 'Users', { size: 32, weight: 700, anchor: 'middle' })}
  ${arrow(290, cy, 340, cy, { sw: 4, head: 14 })}
  ${cols.map(([ic, t, s2, a, x], i) => `${archCard(x, cy - ch / 2, cw, ch, ic, t, s2, a, { ts: 36 })}${i < 2 ? arrow(x + cw + 14, cy, x + cw + 66, cy, { sw: 4, head: 14 }) : ''}`).join('')}
  <!-- CMS feeding frontend + backend -->
  ${archCard(600, 60, 480, 150, 'file', 'Content (CMS)', 'Edited by your team', C.blue, { tile: 76, ts: 36 })}
  ${connector(`M720 210V${cy - ch / 2}`, { dash: '3 10', ends: [[720, cy - ch / 2]] })}
  ${connector(`M940 210V${cy - ch / 2}`, { dash: '3 10', ends: [[940, cy - ch / 2]] })}
  <!-- cloud platform -->
  ${rect(350, 560, 1510, 200, { r: 28, fill: C.panel, stroke: C.blue2, sw: 2, filter: 'sh' })}
  ${iconTile('cloud', 440, 660, 92, { tint: C.green, color: C.green })}
  ${text(510, 650, 'Cloud & hosting', { size: 40, weight: 700 })}${text(510, 692, 'Deploy, scale, monitor, back up', { size: 27, fill: C.muted })}
  ${[1000, 1180, 1360].map((x) => `${rect(x, 610, 150, 100, { r: 14, fill: C.panel3 })}${[0, 1].map((j) => `<circle cx="${x + 26}" cy="${638 + j * 40}" r="7" fill="${C.green}"/>${bar(x + 44, 633 + j * 40, 80, { h: 10 })}`).join('')}`).join('')}
  ${lineChart(1560, 620, 220, 80, [0.5, 0.55, 0.52, 0.6, 0.58, 0.63, 0.61], { color: C.green })}
  ${cols.map(([, , , , x]) => connector(`M${x + cw / 2} ${cy + ch / 2}V560`, { dash: '2 10', op: 0.4 })).join('')}
  <!-- devops -->
  ${archCard(40, 590, 250, 140, 'terminal', 'DevOps', '', C.orange, { tile: 60, ts: 32 })}
  ${arrow(296, 660, 342, 660, { sw: 4, head: 14, color: C.orange })}`);
}

function techTall() {
  const W = 720, H = 1560, x = 30, w = 660;
  const rows = [
    ['braces', 'Backend & APIs', 'Logic & integrations', C.orange, 690],
    ['db', 'Databases', 'Records & caching', C.green, 920],
  ];
  return svg(W, H, `${bg(W, H, { glowX: 0.5, glowY: 0.3, glow: 0.16, r: 28 })}${shadowDef('sh')}
  ${rect(x, 30, w, 150, { r: 24, fill: C.panel, stroke: C.line2, filter: 'sh' })}
  ${icon('monitor', 110, 105, 60, { color: C.blue3 })}${icon('phone', 174, 112, 44, { color: C.blue3 })}${text(230, 118, 'Users', { size: 38, weight: 700 })}
  ${arrow(360, 190, 360, 236, { sw: 4, head: 14 })}
  ${archCard(x, 246, w, 170, 'monitor', 'Frontend', 'Interfaces & UI', C.blue, { ts: 38, ss: 26 })}
  ${archCard(x, 470, w, 150, 'file', 'Content (CMS)', 'Edited by your team', C.blue, { ts: 36, ss: 26, tile: 76 })}
  ${connector('M600 470V416', { dash: '3 10', ends: [[600, 416]] })}
  ${arrow(360, 630, 360, 680, { sw: 4, head: 14 })}
  ${rows.map(([ic, t, s2, a, y], i) => `${archCard(x, y, w, 170, ic, t, s2, a, { ts: 38, ss: 26 })}${i === 0 ? arrow(360, y + 180, 360, y + 222, { sw: 4, head: 14 }) : ''}`).join('')}
  ${rect(x, 1140, w, 230, { r: 28, fill: C.panel, stroke: C.blue2, sw: 2, filter: 'sh' })}
  ${iconTile('cloud', 110, 1220, 84, { tint: C.green, color: C.green })}
  ${text(176, 1212, 'Cloud & hosting', { size: 36, weight: 700 })}${text(176, 1250, 'Deploy, scale, back up', { size: 26, fill: C.muted })}
  ${[70, 280, 490].map((bx) => `${rect(bx, 1288, 160, 56, { r: 12, fill: C.panel3 })}<circle cx="${bx + 26}" cy="1316" r="7" fill="${C.green}"/>${bar(bx + 44, 1311, 90, { h: 10 })}`).join('')}
  ${archCard(x, 1410, w, 120, 'terminal', 'DevOps', 'Build, test, ship', C.orange, { ts: 34, ss: 24, tile: 64 })}
  ${arrow(360, 1404, 360, 1378, { sw: 4, head: 12, color: C.orange })}`);
}

// ── Industries (480×360 each, no text — shown at ~140px) ───────────────────
const IW = 480, IH = 360;
const tile = (body, opts) => svg(IW, IH, `${bg(IW, IH, { glow: 0.24, ...opts })}${shadowDef('sh', { dy: 8, blur: 14 })}${body}`);
const industries = {
  'industry-healthcare': () => tile(`
    ${rect(70, 70, 250, 190, { r: 22, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    <path d="M96 170h50l20-44 30 88 22-58 16 14h60" fill="none" stroke="${C.green}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    ${rect(268, 160, 150, 140, { r: 20, fill: C.panel3, stroke: C.line2, filter: 'sh' })}
    ${icon('calendar', 343, 220, 64, { color: C.blue3, sw: 2 })}<circle cx="398" cy="174" r="24" fill="${C.green}"/>${icon('check', 398, 174, 26, { color: C.navy0, sw: 3 })}
    ${icon('heart', 110, 296, 54, { color: C.red, sw: 2 })}`),
  'industry-ecommerce': () => tile(`
    ${rect(60, 70, 170, 220, { r: 20, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${rect(76, 86, 138, 110, { r: 14, fill: C.blue2, op: 0.5, stroke: '' })}
    ${bar(80, 216, 100, { h: 14, fill: C.text })}${bar(80, 244, 60, { h: 14, fill: C.green, op: 0.9 })}
    ${rect(250, 110, 170, 180, { r: 20, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${icon('bag', 335, 192, 96, { color: C.orange, sw: 1.8 })}
    <circle cx="398" cy="118" r="26" fill="${C.blue}"/>${icon('cart', 398, 118, 28, { color: C.white, sw: 2.2 })}`),
  'industry-education': () => tile(`
    ${rect(60, 120, 360, 170, { r: 22, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    <circle cx="140" cy="205" r="44" fill="${C.blue}" fill-opacity=".9"/><path d="M128 184l34 21-34 21z" fill="${C.white}"/>
    ${bar(210, 172, 170, { h: 14, fill: C.text })}${bar(210, 202, 120, { h: 12 })}
    ${rect(210, 238, 170, 16, { r: 8, fill: C.panel3, stroke: '' })}${rect(210, 238, 112, 16, { r: 8, fill: C.green, stroke: '' })}
    <circle cx="345" cy="96" r="58" fill="${C.panel3}" stroke="${C.line2}" stroke-width="2"/>${icon('cap', 345, 96, 78, { color: C.amber, sw: 1.8 })}`),
  'industry-real-estate': () => tile(`
    ${rect(56, 80, 230, 230, { r: 22, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    <path d="M56 230c60-30 110 20 230-40" stroke="${C.dim}" stroke-width="3" fill="none"/><path d="M120 80v230M56 160h230" stroke="${C.line2}" stroke-width="2"/>
    ${icon('pin', 190, 170, 90, { color: C.orange, sw: 1.8 })}
    ${rect(260, 120, 170, 170, { r: 20, fill: C.panel3, stroke: C.line2, filter: 'sh' })}${icon('house', 345, 186, 80, { color: C.blue3, sw: 1.8 })}
    ${bar(286, 252, 110, { h: 12, fill: C.text })}`),
  'industry-hospitality': () => tile(`
    ${rect(60, 76, 220, 220, { r: 110, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${icon('cutlery', 170, 186, 110, { color: C.amber, sw: 1.6 })}
    ${rect(250, 130, 180, 150, { r: 20, fill: C.panel3, stroke: C.line2, filter: 'sh' })}
    ${icon('calendar', 300, 182, 54, { color: C.blue3, sw: 2 })}${bar(340, 172, 66, { h: 12, fill: C.text })}${bar(340, 196, 44, { h: 10 })}
    ${[0, 1, 2, 3, 4].map((i) => icon('star', 282 + i * 30, 248, 26, { color: C.amber, fill: i < 4 ? C.amber : 'none', sw: 1.6 })).join('')}`),
  'industry-travel-logistics': () => tile(`
    <path d="M70 280 C 150 280, 150 130, 250 160 S 360 90, 410 90" fill="none" stroke="${C.blue2}" stroke-width="5" stroke-dasharray="4 14" stroke-linecap="round"/>
    ${icon('pin', 70, 250, 60, { color: C.green, sw: 2 })}${icon('pin', 410, 64, 60, { color: C.orange, sw: 2 })}
    ${rect(150, 190, 200, 120, { r: 20, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${icon('truck', 250, 250, 96, { color: C.blue3, sw: 1.6 })}
    ${icon('plane', 300, 120, 56, { color: C.text, sw: 1.6 })}`),
};

// ── Benefits (960×540 each, no text) ───────────────────────────────────────
const BW = 960, BH = 540;
const banner = (body, opts) => svg(BW, BH, `${bg(BW, BH, { glow: 0.24, ...opts })}${shadowDef('sh')}${body}`);
const benefits = {
  'benefit-custom-solutions': () => banner(`
    ${[0, 1, 2, 3, 4, 5].map((i) => {
      const x = 170 + (i % 3) * 170, y = 120 + Math.floor(i / 3) * 170, hot = i === 4;
      return hot ? '' : `${rect(x, y, 150, 150, { r: 22, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${icon(['grid', 'layers', 'gear', 'code', '', 'palette'][i], x + 75, y + 75, 60, { color: C.blue3 })}`;
    }).join('')}
    <rect x="340" y="290" width="150" height="150" rx="22" fill="none" stroke="${C.orange}" stroke-width="3" stroke-dasharray="8 8"/>
    <g transform="translate(40 -40) rotate(-6 555 400)">${rect(480, 330, 150, 150, { r: 22, fill: C.orange, stroke: '', filter: 'sh' })}${icon('gear', 555, 405, 66, { color: C.white })}</g>
    ${icon('cursor', 650, 450, 56, { color: C.white, fill: C.navy0 })}`, { glowX: 0.5 }),
  'benefit-seo': () => banner(`
    ${rect(150, 80, 520, 380, { r: 22, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${rect(180, 110, 460, 56, { r: 28, fill: C.navy1, stroke: C.line2 })}${icon('search', 214, 138, 30, { color: C.muted })}${bar(244, 133, 200, { h: 10 })}
    ${rect(180, 190, 460, 96, { r: 14, fill: C.blue, op: 0.16, stroke: C.blue2, sw: 2.5 })}${bar(204, 214, 120, { h: 10, fill: C.green })}${bar(204, 236, 300, { h: 14, fill: C.blue3 })}${bar(204, 262, 220, { h: 10 })}
    ${[0, 1].map((i) => `${bar(204, 318 + i * 64, 260, { h: 14, op: 0.5 })}${bar(204, 342 + i * 64, 180, { h: 10, op: 0.35 })}`).join('')}
    <circle cx="760" cy="238" r="80" fill="${C.green}" fill-opacity=".14" stroke="${C.green}" stroke-width="3"/>${icon('trend', 760, 238, 80, { color: C.green, sw: 2 })}`, { glowX: 0.4 }),
  'benefit-mobile-responsive': () => banner(`
    ${rect(110, 120, 440, 300, { r: 20, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${rect(134, 148, 392, 70, { r: 10, fill: C.blue, op: 0.85, stroke: '' })}${[0, 1, 2].map((i) => rect(134 + i * 134, 236, 124, 160, { r: 10, fill: C.panel3 })).join('')}
    ${rect(590, 140, 190, 280, { r: 22, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${rect(606, 160, 158, 54, { r: 8, fill: C.blue, op: 0.85, stroke: '' })}${[0, 1].map((i) => rect(606 + i * 82, 228, 76, 170, { r: 8, fill: C.panel3 })).join('')}
    ${rect(810, 190, 110, 230, { r: 22, fill: C.panel2, stroke: C.blue2, sw: 2.5, filter: 'sh' })}
    ${rect(822, 212, 86, 44, { r: 8, fill: C.blue, op: 0.85, stroke: '' })}${[0, 1, 2].map((i) => rect(822, 266 + i * 46, 86, 38, { r: 8, fill: C.panel3 })).join('')}`, { glowX: 0.7 }),
  'benefit-performance': () => banner(`
    <path d="M300 380a180 180 0 1 1 360 0" fill="none" stroke="${C.panel3}" stroke-width="36" stroke-linecap="round"/>
    <path d="M300 380a180 180 0 0 1 52-127" fill="none" stroke="${C.red}" stroke-width="36" stroke-linecap="round" stroke-opacity=".75"/>
    <path d="M370 236a180 180 0 0 1 150-36" fill="none" stroke="${C.amber}" stroke-width="36" stroke-opacity=".8"/>
    <path d="M545 205a180 180 0 0 1 115 175" fill="none" stroke="${C.green}" stroke-width="36" stroke-linecap="round"/>
    <path d="M480 380L600 268" stroke="${C.text}" stroke-width="10" stroke-linecap="round"/><circle cx="480" cy="380" r="22" fill="${C.text}"/>
    <circle cx="760" cy="150" r="56" fill="${C.amber}" fill-opacity=".16" stroke="${C.amber}" stroke-width="3"/>${icon('bolt', 760, 150, 60, { color: C.amber, sw: 2 })}
    ${rect(300, 440, 360, 20, { r: 10, fill: C.panel3, stroke: '' })}${rect(300, 440, 330, 20, { r: 10, fill: C.green, stroke: '' })}`, { glowX: 0.5, glowY: 0.6 }),
  'benefit-user-experience': () => banner(`
    ${[0, 1, 2].map((i) => {
      const x = 110 + i * 270, y = 130 + (i === 1 ? -20 : 0);
      return `${rect(x, y, 200, 280, { r: 20, fill: C.panel2, stroke: i === 2 ? C.green : C.line2, sw: i === 2 ? 2.5 : 1.5, filter: 'sh' })}
      ${rect(x + 18, y + 22, 164, 60, { r: 10, fill: C.panel3 })}${bar(x + 18, y + 104, 120, { h: 12, fill: C.text })}${bar(x + 18, y + 128, 150, { h: 10 })}
      ${rect(x + 18, y + 210, 120, 40, { r: 20, fill: i === 2 ? C.green : C.blue, stroke: '' })}`;
    }).join('')}
    ${connector('M238 360 C 300 440, 340 440, 380 350', { dash: '4 10', color: C.blue2 })}
    ${connector('M508 340 C 570 440, 610 440, 650 360', { dash: '4 10', color: C.blue2 })}
    ${icon('cursor', 250, 380, 46, { color: C.white, fill: C.navy0 })}
    <circle cx="760" cy="140" r="34" fill="${C.green}"/>${icon('check', 760, 140, 40, { color: C.navy0, sw: 3 })}`, { glowX: 0.5 }),
  'benefit-ongoing-support': () => banner(`
    <circle cx="480" cy="270" r="170" fill="none" stroke="${C.blue2}" stroke-opacity=".5" stroke-width="4" stroke-dasharray="6 14"/>
    <circle cx="480" cy="270" r="92" fill="${C.panel2}" stroke="${C.blue2}" stroke-width="3" filter="url(#sh)"/>${icon('refresh', 480, 270, 92, { color: C.blue3, sw: 1.8 })}
    ${[['shieldCheck', 480, 100, C.green], ['wrench', 650, 270, C.amber], ['gauge', 480, 440, C.blue2], ['bell', 310, 270, C.orange]].map(([ic, x, y, c]) =>
      `<circle cx="${x}" cy="${y}" r="56" fill="${C.panel3}" stroke="${c}" stroke-width="2.5" filter="url(#sh)"/>${icon(ic, x, y, 54, { color: c, sw: 1.8 })}`).join('')}`, { glowX: 0.5, glowY: 0.5 }),
};

export const sections = {
  'website-development-hero': hero,
  'development-process-wide': processWide,
  'development-process-tall': processTall,
  'technology-stack-wide': techWide,
  'technology-stack-tall': techTall,
  ...industries,
  ...benefits,
};
