// Service-card infographics (960×600, shown at ~320×200 in a 16:10 card).
// Labels are kept large (≥26px here ≈ 9–11px on screen) and few per image.
import {
  C, MONO, svg, bg, shadowDef, text, rect, bar, icon, iconTile, windowFrame, chip,
  connector, arrow, lineChart, barChart, ring,
} from './kit.mjs';

const W = 960, H = 600;
const frame = (body, opts) => svg(W, H, `${bg(W, H, opts)}${shadowDef('sh')}${body}`);

/** Vertical node: icon tile on top, label below. */
export function vnode(x, y, w, h, ic, label, { accent = C.blue, color = C.blue2, size = 28, tile = 64 } = {}) {
  return `${rect(x, y, w, h, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
  ${iconTile(ic, x + w / 2, y + h * 0.4, tile, { tint: accent, color })}
  ${text(x + w / 2, y + h * 0.4 + tile / 2 + size + 10, label, { size, weight: 600, anchor: 'middle' })}`;
}
/** Compact horizontal node. */
export function hnode(x, y, w, h, ic, label, { accent = C.blue, color = C.blue2, size = 27 } = {}) {
  const t = h * 0.6;
  return `${rect(x, y, w, h, { r: 14, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
  ${iconTile(ic, x + h / 2, y + h / 2, t, { tint: accent, color })}
  ${text(x + h - 2, y + h / 2 + size * 0.36, label, { size, weight: 600 })}`;
}

function miniDashboard(x, y, w, h) {
  const sb = 92;
  return `${rect(x, y, sb, h, { r: 0, fill: C.navy1, stroke: '' , op: 0.7})}
  ${[0, 1, 2, 3, 4].map((i) => bar(x + 20, y + 26 + i * 36, i === 1 ? 52 : 44, { h: 10, fill: i === 1 ? C.blue2 : C.dim })).join('')}
  ${[0, 1, 2].map((i) => {
    const cw = (w - sb - 60) / 3, cx = x + sb + 20 + i * (cw + 10);
    return `${rect(cx, y + 18, cw, 70, { r: 10, fill: C.panel2 })}${bar(cx + 14, y + 36, cw * 0.4, { h: 8 })}${bar(cx + 14, y + 56, cw * 0.62, { h: 14, fill: i === 0 ? C.blue2 : i === 1 ? C.green : C.text, op: 0.9 })}`;
  }).join('')}
  ${rect(x + sb + 20, y + 102, w - sb - 40, h - 120, { r: 10, fill: C.panel2 })}
  ${lineChart(x + sb + 40, y + 124, w - sb - 80, h - 165, [0.2, 0.35, 0.3, 0.52, 0.46, 0.7, 0.62, 0.85])}`;
}

export const services = {
  // 1 ─ Web application development
  'web-application-development': () => {
    const nodes = [['lock', 'Login'], ['braces', 'API'], ['db', 'Database'], ['branch', 'Workflows']];
    const nw = 196, gap = 22, x0 = (W - (nodes.length * nw + (nodes.length - 1) * gap)) / 2;
    return frame(`
    ${windowFrame(190, 34, 580, 300, { url: 'app.yourcompany.com' })}
    ${miniDashboard(190, 74, 580, 260)}
    ${nodes.map(([ic, l], i) => {
      const nx = x0 + i * (nw + gap), cx = nx + nw / 2;
      return `${connector(`M${cx} 412 C ${cx} 372, ${480 + (cx - 480) * 0.35} 372, ${480 + (cx - 480) * 0.35} 336`, { dash: '2 8', ends: [[cx, 412]] })}
      ${vnode(nx, 412, nw, 160, ic, l)}`;
    }).join('')}`, { glowX: 0.5, glowY: 0.2 });
  },

  // 2 ─ UX / UI design
  'ux-ui-design': () => frame(`
    ${rect(48, 54, 360, 300, { r: 16, fill: 'none', stroke: C.muted, sw: 2 })}
    <g stroke="${C.muted}" stroke-width="2" stroke-dasharray="8 8" fill="none" stroke-opacity=".8">
      <rect x="76" y="84" width="304" height="70" rx="8"/><rect x="76" y="172" width="140" height="150" rx="8"/>
      <rect x="236" y="172" width="144" height="68" rx="8"/><rect x="236" y="254" width="144" height="68" rx="8"/>
      <path d="M76 84l304 70M380 84L76 154"/>
    </g>
    ${arrow(430, 204, 520, 204, { sw: 4, head: 16 })}
    ${windowFrame(540, 54, 372, 300, {})}
    ${rect(564, 112, 324, 70, { r: 10, fill: C.blue, op: 0.9, stroke: '' })}
    ${bar(584, 134, 150, { h: 12, fill: C.white, op: 0.95 })}${bar(584, 156, 96, { h: 8, fill: C.white, op: 0.6 })}
    ${rect(564, 196, 156, 136, { r: 10, fill: C.panel3 })}${bar(580, 300, 90, { h: 10, fill: C.text })}
    <circle cx="642" cy="250" r="30" fill="${C.green}" fill-opacity=".85"/>
    ${rect(732, 196, 156, 62, { r: 10, fill: C.panel3 })}${rect(732, 270, 156, 62, { r: 10, fill: C.orange, op: 0.9, stroke: '' })}
    ${bar(752, 296, 90, { h: 10, fill: C.white, op: 0.95 })}
    ${chip(228, 372, 'Wireframe', { size: 27, anchor: 'middle' }).svg}
    ${chip(726, 372, 'Polished UI', { size: 27, anchor: 'middle', fill: C.blue, stroke: C.blue, color: C.white }).svg}
    ${rect(48, 456, 864, 112, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${text(80, 522, 'Design system', { size: 28, weight: 600 })}
    ${[C.blue, C.blue2, C.green, C.orange, C.text].map((c, i) => `<circle cx="${400 + i * 54}" cy="512" r="20" fill="${c}"/>`).join('')}
    ${text(700, 527, 'Aa', { size: 46, weight: 700 })}
    ${[0, 1, 2].map((i) => bar(790, 488 + i * 20, 90 - i * 24, { h: 10, fill: C.blue3, op: 0.8 })).join('')}`,
    { glowX: 0.75, glowY: 0.3 }),

  // 3 ─ Website customisation
  'website-customisation': () => {
    const comps = [
      (x, y) => `${rect(x + 26, y + 40, 128, 44, { r: 22, fill: C.orange, stroke: '' })}${bar(x + 56, y + 57, 68, { h: 10, fill: C.white, op: 0.95 })}`,
      (x, y) => `${rect(x + 40, y + 38, 100, 48, { r: 24, fill: C.blue, stroke: '' })}<circle cx="${x + 116}" cy="${y + 62}" r="18" fill="${C.white}"/>`,
      (x, y) => `${rect(x + 30, y + 22, 120, 80, { r: 10, fill: C.panel3 })}${rect(x + 30, y + 22, 120, 38, { r: 10, fill: C.blue2, op: 0.6, stroke: '' })}${bar(x + 44, y + 74, 70, { h: 9, fill: C.text })}`,
      (x, y) => `${rect(x + 22, y + 42, 136, 40, { r: 10, fill: C.navy1, stroke: C.line2 })}${bar(x + 36, y + 58, 60, { h: 8 })}<path d="M${x + 136} ${y + 56}l6 6 6-6" stroke="${C.muted}" stroke-width="2.5" fill="none"/>`,
    ];
    const tiles = comps.map((f, i) => {
      const x = 48 + (i % 2) * 196, y = 48 + Math.floor(i / 2) * 140;
      return `${rect(x, y, 180, 124, { r: 14, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${f(x, y)}`;
    }).join('');
    return frame(`
    ${tiles}
    ${windowFrame(520, 40, 392, 380, { url: 'yourbrand.com' })}
    ${rect(544, 100, 344, 96, { r: 10, fill: C.panel3 })}${bar(564, 124, 170, { h: 14, fill: C.text })}${bar(564, 150, 120, { h: 9 })}
    ${rect(564, 166, 100, 20, { r: 10, fill: C.orange, stroke: '' })}
    ${rect(544, 212, 166, 120, { r: 10, fill: C.panel3 })}${rect(544, 212, 166, 54, { r: 10, fill: C.blue2, op: 0.6, stroke: '' })}${bar(560, 286, 90, { h: 9, fill: C.text })}
    ${rect(722, 212, 166, 120, { r: 10, fill: C.panel3 })}${rect(722, 212, 166, 54, { r: 10, fill: C.blue2, op: 0.6, stroke: '' })}${bar(738, 286, 90, { h: 9, fill: C.text })}
    ${rect(544, 346, 344, 50, { r: 10, fill: C.navy1, stroke: C.line2 })}${rect(800, 354, 76, 34, { r: 17, fill: C.blue, stroke: '' })}
    ${connector('M424 132 C 480 132, 480 182, 548 162', { dash: '3 9', ends: [[424, 132]] })}
    ${connector('M424 272 C 480 272, 480 262, 548 262', { dash: '3 9', ends: [[424, 272]] })}
    ${chip(48, 368, 'Reusable components', { size: 27 }).svg}
    ${chip(48, 456, 'Brand tokens', { size: 27, dot: C.orange }).svg}
    ${chip(520, 456, 'Your layout', { size: 27, fill: C.blue, stroke: C.blue, color: C.white }).svg}
    ${[C.blue, C.green, C.orange].map((c, i) => `<circle cx="${330 + i * 40}" cy="${483}" r="14" fill="${c}"/>`).join('')}`,
    { glowX: 0.8, glowY: 0.3 });
  },

  // 4 ─ Front-end development
  'frontend-development': () => {
    const tree = [[0, '<App />'], [1, '<Header />'], [1, '<Page />'], [2, '<Card />'], [2, '<Card />']];
    return frame(`
    ${tree.map(([d, l], i) => {
      const x = 48 + d * 44, y = 52 + i * 70;
      return `${d ? `<path d="M${x - 24} ${y - 30}V${y + 24}H${x}" fill="none" stroke="${C.line2}" stroke-width="2"/>` : ''}
      ${rect(x, y, 230 - d * 20, 50, { r: 10, fill: d === 0 ? C.blue : C.panel2, stroke: d === 0 ? '' : C.line2, op: d === 0 ? 0.9 : 1 })}
      ${text(x + 18, y + 33, l, { size: 24, family: MONO, fill: d === 0 ? C.white : C.blue3 })}`;
    }).join('')}
    ${arrow(320, 200, 420, 200, { sw: 4, head: 16 })}
    ${windowFrame(440, 40, 472, 330, { url: 'localhost:3000' })}
    ${rect(464, 100, 424, 40, { r: 8, fill: C.panel3 })}${bar(480, 115, 70, { h: 10, fill: C.text })}${[0, 1, 2].map((i) => bar(700 + i * 58, 116, 42, { h: 8 })).join('')}
    ${rect(464, 154, 424, 70, { r: 10, fill: C.blue, op: 0.85, stroke: '' })}${bar(484, 176, 200, { h: 12, fill: C.white })}${bar(484, 198, 120, { h: 8, fill: C.white, op: 0.6 })}
    ${[0, 1].map((i) => `${rect(464 + i * 218, 238, 206, 110, { r: 10, fill: C.panel3 })}${rect(464 + i * 218, 238, 206, 50, { r: 10, fill: C.blue2, op: 0.5, stroke: '' })}${bar(480 + i * 218, 304, 120, { h: 9, fill: C.text })}${bar(480 + i * 218, 324, 80, { h: 8 })}`).join('')}
    ${icon('phone', 820, 410, 38, { color: C.muted })}${icon('tablet', 866, 410, 38, { color: C.muted })}${icon('monitor', 914, 410, 40, { color: C.blue2 })}
    ${(() => {
      let x = 48; return ['React', 'Next.js', 'TypeScript', 'Tailwind'].map((l) => { const c = chip(x, 476, l, { size: 27 }); x += c.w + 16; return c.svg; }).join('');
    })()}`, { glowX: 0.7, glowY: 0.25 });
  },

  // 5 ─ Back-end development
  'backend-development': () => frame(`
    ${vnode(36, 196, 170, 190, 'monitor', 'Client')}
    ${connector('M206 291H262', { ends: [] })}${arrow(240, 291, 262, 291, { sw: 3, head: 10 })}
    ${vnode(264, 196, 170, 190, 'braces', 'API', { accent: C.orange, color: C.orange })}
    ${[['lock', 'Auth', 96], ['box', 'Orders', 246], ['search', 'Search', 396]].map(([ic, l, y]) =>
      `${connector(`M434 291 C 470 291, 470 ${y + 43}, 496 ${y + 43}`, {})}${hnode(496, y, 210, 86, ic, l)}`).join('')}
    ${[['db', 'Database', 150, C.blue, C.blue2], ['bolt', 'Cache', 360, C.green, C.green]].map(([ic, l, y, a, c]) =>
      `${connector(`M706 ${y < 300 ? 139 : 439} C 730 ${y < 300 ? 139 : 439}, 730 ${y + 80}, 752 ${y + 80}`, { dash: '2 7' })}
      ${connector(`M706 289 C 730 289, 730 ${y + 80}, 752 ${y + 80}`, { dash: '2 7' })}
      ${vnode(752, y, 172, 168, ic, l, { accent: a, color: c, tile: 58 })}`).join('')}
    ${text(321, 452, 'Gateway', { size: 24, fill: C.muted, anchor: 'middle' })}
    ${text(601, 530, 'Services', { size: 24, fill: C.muted, anchor: 'middle' })}`, { glowX: 0.55, glowY: 0.5 }),

  // 6 ─ E-commerce & CMS
  'ecommerce-cms': () => {
    let fx = 48;
    const flow = ['Catalogue', 'Cart', 'Checkout', 'Payment'].map((l, i, a) => {
      const c = chip(fx, 500, l, { size: 25, fill: i === 3 ? C.green : C.panel3, stroke: i === 3 ? C.green : C.line2, color: i === 3 ? C.navy0 : C.text, weight: 600 });
      const out = c.svg + (i < a.length - 1 ? arrow(fx + c.w + 8, 524, fx + c.w + 34, 524, { sw: 3, head: 9 }) : '');
      fx += c.w + 44; return out;
    }).join('');
    return frame(`
    ${windowFrame(48, 36, 560, 420, { url: 'shop.yourbrand.com' })}
    ${rect(72, 92, 512, 44, { r: 8, fill: C.panel3 })}${bar(88, 109, 80, { h: 10, fill: C.text })}
    ${icon('cart', 548, 114, 30, { color: C.text })}<circle cx="562" cy="102" r="10" fill="${C.orange}"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => {
      const x = 72 + (i % 3) * 172, y = 152 + Math.floor(i / 3) * 146;
      const tint = [C.blue2, C.green, C.orange, C.blue3, C.blue2, C.amber][i];
      return `${rect(x, y, 160, 134, { r: 10, fill: C.panel3 })}${rect(x + 10, y + 10, 140, 70, { r: 8, fill: tint, op: 0.45, stroke: '' })}${bar(x + 12, y + 94, 90, { h: 9, fill: C.text })}${bar(x + 12, y + 112, 50, { h: 9, fill: C.green, op: 0.9 })}`;
    }).join('')}
    ${rect(640, 36, 272, 420, { r: 16, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${text(664, 82, 'CMS', { size: 28, weight: 700 })}
    ${[0, 1, 2, 3].map((i) => `${rect(664, 106 + i * 66, 224, 52, { r: 10, fill: C.panel3 })}${rect(676, 118 + i * 66, 28, 28, { r: 6, fill: C.blue2, op: 0.5, stroke: '' })}${bar(716, 126 + i * 66, 96, { h: 9, fill: C.text })}
      ${rect(836, 120 + i * 66, 40, 22, { r: 11, fill: i === 2 ? C.dim : C.green, op: 0.9, stroke: '' })}<circle cx="${i === 2 ? 848 : 864}" cy="${131 + i * 66}" r="8" fill="${C.white}"/>`).join('')}
    ${rect(664, 384, 224, 48, { r: 24, fill: C.blue, stroke: '' })}${text(776, 416, 'Publish', { size: 25, weight: 600, anchor: 'middle', fill: C.white })}
    ${flow}`, { glowX: 0.3, glowY: 0.3 });
  },

  // 7 ─ Web app modernisation
  'web-app-modernisation': () => frame(`
    ${rect(48, 108, 280, 300, { r: 18, fill: '#1A1D26', stroke: 'rgba(255,255,255,0.12)', filter: 'sh' })}
    ${[0, 1, 2].map((i) => `${rect(78, 140 + i * 72, 220, 56, { r: 8, fill: '#262A35', stroke: 'rgba(255,255,255,0.1)' })}<circle cx="102" cy="${168 + i * 72}" r="7" fill="${i === 1 ? C.amber : '#4A5060'}"/>${bar(122, 163 + i * 72, 110, { h: 10, fill: '#4A5060', op: 1 })}`).join('')}
    <path d="M188 372l18-32 18 32z" fill="${C.amber}"/><path d="M206 352v8M206 366v1" stroke="#1A1D26" stroke-width="3" stroke-linecap="round"/>
    ${chip(188, 430, 'Legacy app', { size: 27, anchor: 'middle', fill: '#262A35', stroke: 'rgba(255,255,255,0.14)', color: '#C9CED8' }).svg}
    <defs><linearGradient id="mg" x1="0" x2="1"><stop offset="0" stop-color="${C.amber}" stop-opacity=".5"/><stop offset="1" stop-color="${C.blue2}"/></linearGradient></defs>
    <path d="M352 258H560" stroke="url(#mg)" stroke-width="6" stroke-linecap="round"/>
    <path d="M548 240l22 18-22 18" fill="none" stroke="${C.blue2}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    ${[['search', 392], ['refresh', 456], ['trend', 520]].map(([ic, x]) => `<circle cx="${x}" cy="208" r="22" fill="${C.panel2}" stroke="${C.line2}" stroke-width="1.5"/>${icon(ic, x, 208, 24, { color: C.blue3 })}`).join('')}
    <g filter="url(#sh)"><path d="M640 400h200a80 80 0 0 0 10-159A110 110 0 0 0 640 214a90 90 0 0 0 0 186z" fill="${C.panel2}" stroke="${C.blue2}" stroke-width="2.5"/></g>
    ${[0, 1, 2].map((i) => `${rect(650 + i * 72, 280, 60, 76, { r: 10, fill: C.blue, op: 0.25, stroke: C.blue2, sw: 1.5 })}${icon('box', 680 + i * 72, 318, 32, { color: C.blue3 })}`).join('')}
    ${chip(744, 430, 'Cloud-native', { size: 27, anchor: 'middle', fill: C.blue, stroke: C.blue, color: C.white }).svg}
    ${text(480, 540, 'Audit · migrate in stages · scale', { size: 26, anchor: 'middle', fill: C.muted })}`, { glowX: 0.78, glowY: 0.45 }),

  // 8 ─ SEO & performance optimisation
  'seo-performance': () => frame(`
    ${windowFrame(48, 40, 500, 400, {})}
    ${rect(72, 96, 452, 52, { r: 26, fill: C.navy1, stroke: C.line2 })}${icon('search', 102, 122, 26, { color: C.muted })}${bar(126, 117, 180, { h: 10 })}
    ${rect(72, 168, 452, 92, { r: 12, fill: C.blue, op: 0.14, stroke: C.blue2, sw: 2 })}
    ${bar(92, 190, 160, { h: 9, fill: C.green, op: 0.9 })}${bar(92, 210, 300, { h: 13, fill: C.blue3, op: 1 })}${bar(92, 234, 240, { h: 9 })}
    <circle cx="486" cy="214" r="22" fill="${C.green}"/>${icon('trend', 486, 214, 24, { color: C.navy0, sw: 2.6 })}
    ${[0, 1].map((i) => `${bar(92, 286 + i * 70, 140, { h: 9, op: 0.5 })}${bar(92, 304 + i * 70, 280, { h: 12, op: 0.6 })}${bar(92, 326 + i * 70, 220, { h: 9, op: 0.4 })}`).join('')}
    ${[['LCP', 0.82, 64], ['INP', 0.88, 200], ['CLS', 0.94, 336]].map(([l, v, y]) =>
      `${rect(588, y, 324, 118, { r: 16, fill: C.panel2, stroke: C.line2, filter: 'sh' })}${ring(648, y + 59, 34, v, { sw: 9 })}
      ${icon('check', 648, y + 59, 26, { color: C.green, sw: 2.6 })}
      ${text(704, y + 54, l, { size: 32, weight: 700 })}${text(704, y + 88, 'Good', { size: 24, fill: C.green, weight: 500 })}`).join('')}
    ${rect(48, 468, 864, 100, { r: 16, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${text(76, 528, 'Analytics', { size: 27, weight: 600 })}
    ${lineChart(250, 488, 630, 62, [0.15, 0.25, 0.22, 0.4, 0.38, 0.55, 0.6, 0.78, 0.9], { color: C.green })}`, { glowX: 0.3, glowY: 0.4 }),

  // 9 ─ Web security services
  'web-security': () => {
    const left = [['lock', 'SSL / TLS'], ['key', 'Login & MFA'], ['wall', 'Firewall']];
    const right = [['shield', 'Encryption'], ['eye', 'Monitoring'], ['bug', 'Scanning']];
    const ys = [70, 258, 446];
    return frame(`
    <circle cx="480" cy="300" r="150" fill="${C.blue}" fill-opacity=".08"/><circle cx="480" cy="300" r="112" fill="${C.panel2}" stroke="${C.blue2}" stroke-width="2.5" filter="url(#sh)"/>
    ${icon('shieldCheck', 480, 300, 120, { color: C.green, sw: 1.6 })}
    ${left.map(([ic, l], i) => `${connector(`M${296} ${ys[i] + 42} C 340 ${ys[i] + 42}, 340 300, 370 300`, { dash: '2 8' })}${hnode(36, ys[i], 260, 84, ic, l, { size: 25 })}`).join('')}
    ${right.map(([ic, l], i) => `${connector(`M${664} ${ys[i] + 42} C 620 ${ys[i] + 42}, 620 300, 590 300`, { dash: '2 8' })}${hnode(664, ys[i], 260, 84, ic, l, { size: 25, accent: C.green, color: C.green })}`).join('')}`,
    { glowX: 0.5, glowY: 0.5, glow: 0.18 });
  },

  // 10 ─ Hosting & deployment
  'hosting-deployment': () => {
    const steps = [['branch', 'Commit'], ['box', 'Build'], ['check', 'Test'], ['upload', 'Deploy']];
    return frame(`
    ${steps.map(([ic, l], i) => {
      const cx = 130 + i * 233;
      return `${i ? arrow(cx - 233 + 58, 120, cx - 58, 120, { sw: 3, head: 10, op: 0.7 }) : ''}
      <circle cx="${cx}" cy="120" r="48" fill="${i === 3 ? C.green : C.panel2}" fill-opacity="${i === 3 ? 0.18 : 1}" stroke="${i === 3 ? C.green : C.blue2}" stroke-width="2.5"/>
      ${icon(ic, cx, 120, 44, { color: i === 3 ? C.green : C.blue3 })}
      ${text(cx, 206, l, { size: 28, weight: 600, anchor: 'middle' })}`;
    }).join('')}
    ${rect(36, 258, 888, 310, { r: 20, fill: C.panel, stroke: C.line2, filter: 'sh' })}
    ${icon('cloud', 76, 300, 36, { color: C.blue2 })}${text(104, 311, 'Cloud', { size: 26, weight: 600, fill: C.muted })}
    ${[0, 1, 2].map((i) => `${rect(68, 342 + i * 64, 230, 50, { r: 10, fill: C.panel3 })}<circle cx="92" cy="${367 + i * 64}" r="7" fill="${C.green}"/>${bar(112, 362 + i * 64, 120, { h: 10 })}`).join('')}
    ${rect(330, 330, 330, 210, { r: 14, fill: C.panel2 })}${text(352, 372, 'Monitoring', { size: 25, weight: 600 })}
    ${lineChart(352, 396, 286, 120, [0.6, 0.62, 0.58, 0.64, 0.61, 0.66, 0.63, 0.65, 0.64], { color: C.green })}
    ${rect(690, 330, 206, 210, { r: 14, fill: C.panel2 })}${icon('db', 793, 404, 70, { color: C.blue3 })}
    <circle cx="830" cy="436" r="22" fill="${C.panel2}" stroke="${C.blue2}" stroke-width="2"/>${icon('refresh', 830, 436, 26, { color: C.blue2 })}
    ${text(793, 512, 'Backups', { size: 25, weight: 600, anchor: 'middle' })}`, { glowX: 0.5, glowY: 0.1 });
  },

  // 11 ─ API & third-party integrations
  'api-integrations': () => {
    const top = [['card', 'Payments'], ['users', 'CRM'], ['chart', 'Analytics']];
    const bot = [['mail', 'Email'], ['pin', 'Maps'], ['braces', 'APIs']];
    const xs = [70, 370, 670], nw = 220;
    return frame(`
    ${rect(150, 252, 660, 96, { r: 48, fill: C.blue, op: 0.95, stroke: '', filter: 'sh' })}
    ${icon('globe', 214, 300, 46, { color: C.white })}${text(500, 312, 'Your website', { size: 34, weight: 700, anchor: 'middle', fill: C.white })}
    ${top.map(([ic, l], i) => `${connector(`M${xs[i] + nw / 2} 196V252`, { ends: [[xs[i] + nw / 2, 196]] })}${vnode(xs[i], 36, nw, 160, ic, l, { tile: 58 })}`).join('')}
    ${bot.map(([ic, l], i) => `${connector(`M${xs[i] + nw / 2} 348V404`, { ends: [[xs[i] + nw / 2, 404]] })}${vnode(xs[i], 404, nw, 160, ic, l, { tile: 58, accent: C.green, color: C.green })}`).join('')}`,
    { glowX: 0.5, glowY: 0.5, glow: 0.2 });
  },

  // 12 ─ Landing page development
  'landing-page-development': () => frame(`
    ${windowFrame(310, 30, 340, 540, {})}
    ${rect(332, 88, 296, 170, { r: 12, fill: C.panel3 })}${bar(352, 116, 200, { h: 16, fill: C.text })}${bar(352, 146, 150, { h: 16, fill: C.text })}${bar(352, 178, 180, { h: 9 })}
    ${rect(352, 204, 150, 38, { r: 19, fill: C.orange, stroke: '' })}
    <circle cx="470" cy="230" r="34" fill="none" stroke="${C.orange}" stroke-opacity=".5" stroke-width="2"/>
    <circle cx="470" cy="230" r="52" fill="none" stroke="${C.orange}" stroke-opacity=".25" stroke-width="2"/>
    ${icon('cursor', 486, 250, 40, { color: C.white, fill: C.navy0, sw: 1.8 })}
    ${[0, 1, 2].map((i) => `${rect(332 + i * 102, 276, 90, 96, { r: 10, fill: C.panel3 })}<circle cx="${377 + i * 102}" cy="306" r="14" fill="${C.blue2}" fill-opacity=".7"/>${bar(348 + i * 102, 334, 58, { h: 8 })}`).join('')}
    ${rect(332, 388, 296, 82, { r: 10, fill: C.panel3 })}${bar(352, 410, 180, { h: 10 })}${bar(352, 432, 220, { h: 9, op: 0.5 })}
    ${rect(332, 486, 296, 60, { r: 10, fill: C.blue, op: 0.85, stroke: '' })}${bar(400, 511, 160, { h: 10, fill: C.white })}
    ${chip(48, 196, 'One clear CTA', { size: 26, dot: C.orange }).svg}
    ${connector('M272 222 C 300 222, 310 222, 352 222', { dash: '2 7', color: C.orange })}
    ${chip(48, 400, 'Fast load', { size: 26 }).svg}${icon('bolt', 236, 427, 32, { color: C.amber })}
    ${rect(686, 150, 238, 300, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${[['Visits', 1, C.blue2], ['Engaged', 0.68, C.blue3], ['Leads', 0.4, C.green]].map(([l, v, c], i) =>
      `${text(710, 198 + i * 86, l, { size: 24, weight: 600, fill: C.muted })}${rect(710, 210 + i * 86, 190 * v, 24, { r: 12, fill: c, stroke: '' })}`).join('')}`,
    { glowX: 0.5, glowY: 0.3 }),

  // 13 ─ Dashboard & admin panel
  'dashboard-admin-panel': () => frame(`
    ${windowFrame(36, 36, 560, 528, { url: 'admin' })}
    ${[0, 1, 2].map((i) => `${rect(60 + i * 176, 96, 162, 86, { r: 12, fill: C.panel3 })}${bar(78 + i * 176, 118, 60, { h: 8 })}${bar(78 + i * 176, 142, 96, { h: 16, fill: [C.text, C.green, C.blue3][i] })}`).join('')}
    ${rect(60, 198, 330, 200, { r: 12, fill: C.panel3 })}${barChart(84, 226, 282, 150, [0.4, 0.55, 0.48, 0.7, 0.62, 0.85, 0.74], { accentIdx: 5 })}
    ${rect(404, 198, 168, 200, { r: 12, fill: C.panel3 })}${ring(488, 298, 52, 0.68, { color: C.blue2, sw: 18 })}
    ${rect(60, 414, 512, 126, { r: 12, fill: C.panel3 })}${[0, 1, 2].map((i) => `${bar(80, 438 + i * 34, 120, { h: 9 })}${bar(240, 438 + i * 34, 80, { h: 9, op: 0.5 })}${bar(380, 438 + i * 34, 60, { h: 9, fill: C.green, op: 0.8 })}`).join('')}
    ${rect(628, 36, 296, 398, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${text(656, 84, 'Users & roles', { size: 27, weight: 700 })}
    ${[['Admin', C.blue], ['Editor', C.green], ['Viewer', C.dim]].map(([r, c], i) => {
      const y = 112 + i * 100;
      return `${rect(652, y, 248, 84, { r: 12, fill: C.panel3 })}<circle cx="690" cy="${y + 42}" r="20" fill="${C.blue3}" fill-opacity=".35"/>${icon('user', 690, y + 42, 22, { color: C.blue3 })}
      ${bar(722, y + 24, 70, { h: 9, fill: C.text })}${chip(722, y + 42, r, { size: 18, h: 28, fill: c, stroke: c, color: c === C.dim ? C.text : C.white, padX: 12 }).svg}
      <path d="M870 ${y + 34}l6 6 12-12" stroke="${i < 2 ? C.green : C.dim}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    }).join('')}
    ${rect(628, 462, 296, 72, { r: 36, fill: C.blue, stroke: '', filter: 'sh' })}${icon('file', 676, 498, 30, { color: C.white })}
    ${text(800, 508, 'Export report', { size: 25, weight: 600, anchor: 'middle', fill: C.white })}`,
    { glowX: 0.4, glowY: 0.3 }),
};
