// scripts/visuals/automation-testing/scenes-services.mjs
// Service-card infographics for /services/automation-testing (960×600, shown
// at ~520×325 in the 2-column cards). Same kit, palette and rules as the
// website-development set: ≥26px labels, few per image, no third-party
// logos, and no invented results — states are shown as bars, rings, ticks.
import {
  C, MONO, ICONS, svg, bg, shadowDef, text, rect, bar, icon, iconTile, windowFrame, chip,
  connector, arrow, lineChart, barChart, ring,
} from '../website-development/kit.mjs';
import { hnode } from '../website-development/scenes-services.mjs';

// QA-specific icons on the kit's 24×24 stroke grid.
Object.assign(ICONS, {
  flask: '<path d="M9.5 3.5h5M10.5 3.5v6L5 19a1.5 1.5 0 0 0 1.3 2.2h11.4A1.5 1.5 0 0 0 19 19l-5.5-9.5v-6"/><path d="M7.5 15h9"/>',
  play: '<circle cx="12" cy="12" r="8.5"/><path d="M10 8.5l5.5 3.5-5.5 3.5z"/>',
  keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/>',
  contrast: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17A8.5 8.5 0 0 0 12 3.5z" fill="currentColor"/>',
  chat: '<path d="M4 5.5h16v10H10l-4.5 4v-4H4z"/><path d="M8 10.5h8"/>',
  robot: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9.5 16.5h5M3 12v3M21 12v3"/><circle cx="12" cy="3.5" r="1"/>',
  gate: '<path d="M4 20V6M20 20V6M4 9h16M4 14h16"/><circle cx="12" cy="4" r="1.6"/>',
  quarantine: '<rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke-dasharray="3 2.5"/><path d="M9 9l6 6M15 9l-6 6"/>',
  seed: '<ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M12 18v3M9 21h6M8.5 18.5l3.5-2 3.5 2"/>',
});

const W = 960, H = 600;
const frame = (body, opts) => svg(W, H, `${bg(W, H, opts)}${shadowDef('sh')}${body}`);
const tick = (cx, cy, r = 14, color = C.green) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>${icon('check', cx, cy, r * 1.15, { color: C.navy0, sw: 3.2 })}`;
const cross = (cx, cy, r = 14) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.red}"/><path d="M${cx - r * .38} ${cy - r * .38}l${r * .76} ${r * .76}M${cx + r * .38} ${cy - r * .38}l-${r * .76} ${r * .76}" stroke="${C.navy0}" stroke-width="3.2" stroke-linecap="round"/>`;

export const services = {
  // 1 ─ Functional & regression: traceable test cases + regression run
  'functional-testing': () => frame(`
    ${rect(40, 40, 500, 520, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${icon('file', 78, 92, 34, { color: C.blue3, sw: 2 })}${text(108, 102, 'Test cases', { size: 28, weight: 700 })}
    ${[['REQ-12', 1], ['REQ-13', 1], ['REQ-14', 1], ['REQ-15', 0], ['REQ-16', 1]].map(([id, ok], i) => {
      const y = 140 + i * 78;
      return `${rect(64, y, 452, 62, { r: 12, fill: C.panel3 })}
      ${text(86, y + 40, id, { size: 22, family: MONO, fill: C.blue3 })}
      ${bar(200, y + 22, 180 - (i % 3) * 30, { h: 10, fill: C.text })}${bar(200, y + 40, 120, { h: 8 })}
      ${ok ? tick(486, y + 31) : cross(486, y + 31)}`;
    }).join('')}
    ${rect(570, 40, 350, 300, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${text(596, 88, 'Regression run', { size: 28, weight: 700 })}
    ${ring(680, 210, 64, 0.86, { color: C.green, sw: 16 })}${icon('refresh', 680, 210, 50, { color: C.green, sw: 2 })}
    ${[[C.green, 120], [C.red, 30], [C.amber, 54]].map(([c, w], i) => `<circle cx="${790}" cy="${172 + i * 38}" r="8" fill="${c}"/>${bar(808, 167 + i * 38, w * 0.7, { h: 10, fill: C.text, op: 0.6 })}`).join('')}
    ${rect(570, 370, 350, 190, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${icon('users', 612, 416, 32, { color: C.blue3, sw: 2 })}${text(642, 426, 'UAT sign-off', { size: 26, weight: 600 })}
    ${[0, 1, 2].map((i) => `${rect(596 + i * 104, 460, 90, 70, { r: 12, fill: C.panel3 })}${tick(641 + i * 104, 495, 16, i < 2 ? C.green : C.amber)}`).join('')}`,
    { glowX: 0.75, glowY: 0.3 }),

  // 2 ─ Test automation: test code → browser runner across browsers
  'test-automation': () => {
    const code = [['test(', C.blue3], ["'checkout works'", C.green], ['goto(/cart)', C.text], ['getByRole(button)', C.text], ['expect(order)', C.amber]];
    return frame(`
    ${windowFrame(40, 40, 420, 380, { url: 'checkout.spec.ts' })}
    ${code.map(([c, col], i) => `${text(70, 128 + i * 52, String(i + 1), { size: 20, family: MONO, fill: C.dim })}${text(104 + (i > 1 && i < 4 ? 24 : 0), 128 + i * 52, c, { size: 22, family: MONO, fill: col })}`).join('')}
    ${arrow(476, 230, 532, 230, { sw: 4, head: 16 })}
    ${windowFrame(548, 40, 372, 380, { url: 'yourapp.com/cart' })}
    ${rect(572, 100, 324, 70, { r: 10, fill: C.panel3 })}${bar(592, 124, 160, { h: 12, fill: C.text })}${bar(592, 146, 100, { h: 8 })}
    ${rect(572, 186, 324, 110, { r: 10, fill: C.panel3 })}${rect(588, 202, 90, 78, { r: 8, fill: C.blue2, op: 0.4, stroke: '' })}${bar(694, 214, 150, { h: 10, fill: C.text })}${bar(694, 236, 110, { h: 8 })}
    ${rect(572, 316, 324, 52, { r: 26, fill: C.orange, stroke: '' })}${bar(680, 337, 108, { h: 10, fill: C.white })}
    <circle cx="734" cy="342" r="38" fill="none" stroke="${C.green}" stroke-width="3" stroke-dasharray="6 6"/>
    ${icon('cursor', 760, 362, 40, { color: C.white, fill: C.navy0, sw: 1.8 })}
    ${['Chromium', 'Firefox', 'WebKit'].map((b, i) => {
      const c = chip(40 + i * 230, 470, b, { size: 26, fill: C.panel3 });
      return `${c.svg}${tick(40 + i * 230 + c.w + 22, 495, 15)}`;
    }).join('')}`,
    { glowX: 0.6, glowY: 0.3 });
  },

  // 3 ─ API & contract testing: request/response + consumer–provider contract
  'api-testing': () => frame(`
    ${rect(40, 40, 520, 300, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${chip(64, 64, 'POST', { size: 22, h: 38, fill: C.green, stroke: C.green, color: C.navy0, weight: 700 }).svg}
    ${text(160, 91, '/api/orders', { size: 24, family: MONO, fill: C.text })}
    ${[['{', 0, C.muted], ['"id": 1042,', 1, C.blue3], ['"status": "paid",', 1, C.green], ['"total": 2499', 1, C.amber], ['}', 0, C.muted]].map(([l, ind, col], i) =>
      text(76 + ind * 28, 150 + i * 36, l, { size: 22, family: MONO, fill: col })).join('')}
    ${chip(400, 280, '201 Created', { size: 22, h: 38, dot: C.green, fill: C.panel3 }).svg}
    ${rect(590, 40, 330, 300, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${text(616, 88, 'Edge cases', { size: 28, weight: 700 })}
    ${[['400', 'Bad input'], ['401', 'No token'], ['404', 'Missing'], ['429', 'Rate limit']].map(([code, l], i) => {
      const y = 116 + i * 52;
      return `${text(616, y + 26, code, { size: 22, family: MONO, fill: C.amber })}${text(686, y + 26, l, { size: 22, fill: C.muted })}${tick(884, y + 18, 13)}`;
    }).join('')}
    ${hnode(40, 420, 270, 90, 'monitor', 'Consumer', { accent: C.blue })}
    ${hnode(650, 420, 270, 90, 'server', 'Provider', { accent: C.green, color: C.green })}
    ${connector('M310 465 H650', { dash: '4 10', op: 0.7 })}
    ${rect(400, 436, 160, 58, { r: 29, fill: C.panel3, stroke: C.blue2, sw: 2 })}${icon('file', 436, 465, 28, { color: C.blue3, sw: 2 })}${text(460, 474, 'Contract', { size: 22, weight: 600 })}`,
    { glowX: 0.5, glowY: 0.3 }),

  // 4 ─ Performance: virtual-user ramp + latency vs threshold
  'performance-testing': () => frame(`
    ${rect(40, 40, 880, 360, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${text(70, 92, 'Load profile', { size: 28, weight: 700 })}
    ${[['Ramp-up', C.blue2], ['Peak', C.orange], ['Soak', C.green]].map(([l, c], i) => chip(360 + i * 180, 62, l, { size: 22, h: 38, dot: c, fill: C.panel3 }).svg).join('')}
    <path d="M70 360 L250 180 L420 180 L470 130 L520 180 L860 180" fill="none" stroke="${C.blue2}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M70 360 L250 180 L420 180 L470 130 L520 180 L860 180 L860 370 L70 370Z" fill="${C.blue2}" fill-opacity=".12"/>
    ${icon('users', 470, 112, 30, { color: C.orange, sw: 2 })}
    <path d="M70 250 H860" stroke="${C.red}" stroke-width="2.5" stroke-dasharray="8 8" stroke-opacity=".8"/>
    ${chip(700, 214, 'p95 budget', { size: 22, h: 34, fill: C.red, stroke: C.red, color: C.navy0, weight: 700 }).svg}
    ${lineChart(70, 270, 790, 90, [0.25, 0.3, 0.32, 0.35, 0.62, 0.38, 0.36, 0.37, 0.38, 0.36], { color: C.green, area: false })}
    ${rect(40, 430, 420, 130, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${iconTile('gauge', 100, 495, 66, { tint: C.amber, color: C.amber })}${text(150, 486, 'Bottleneck', { size: 28, weight: 700 })}${text(150, 522, 'found & explained', { size: 22, fill: C.muted })}
    ${rect(500, 430, 420, 130, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${iconTile('db', 560, 495, 66, { tint: C.blue, color: C.blue2 })}${bar(612, 476, 200, { h: 12, fill: C.text })}${rect(612, 500, 260, 16, { r: 8, fill: C.panel3, stroke: '' })}${rect(612, 500, 210, 16, { r: 8, fill: C.amber, stroke: '' })}`,
    { glowX: 0.5, glowY: 0.2 }),

  // 5 ─ Mobile: device matrix
  'mobile-testing': () => {
    const devices = [[60, 1, 'Android'], [270, 1, 'iOS'], [480, 0, 'Tablet']];
    return frame(`
    ${devices.map(([x, phone, l], i) => {
      const w = phone ? 170 : 260, h = phone ? 330 : 300, y = phone ? 50 : 80;
      return `<g filter="url(#sh)">${rect(x, y, w, h, { r: phone ? 30 : 22, fill: '#0C1426', stroke: C.line2, sw: 2 })}</g>
      ${rect(x + 12, y + 20, w - 24, h - 40, { r: phone ? 18 : 12, fill: C.panel })}
      ${rect(x + 24, y + 36, w - 48, 46, { r: 8, fill: C.blue, op: 0.85, stroke: '' })}
      ${[0, 1, 2].map((k) => rect(x + 24, y + 96 + k * 54, w - 48, 42, { r: 8, fill: C.panel3 })).join('')}
      ${tick(x + w - 10, y + 10, 18, i === 2 ? C.amber : C.green)}
      ${text(x + w / 2, y + h + 44, l, { size: 26, weight: 600, anchor: 'middle' })}`;
    }).join('')}
    ${rect(780, 50, 140, 380, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${['wifi', '4G', '3G'].map((n, i) => `${text(850, 112 + i * 110, n, { size: 24, weight: 700, anchor: 'middle', family: MONO, fill: [C.green, C.blue3, C.amber][i] })}${barChart(816, 126 + i * 110, 68, 36, [0.3, 0.55, 0.8, 1].map((v, k) => (k <= 3 - i ? v : 0.08)), { color: [C.green, C.blue2, C.amber][i] })}`).join('')}
    ${chip(60, 510, 'Real devices', { size: 26, dot: C.green }).svg}
    ${chip(330, 510, 'Responsive layouts', { size: 26, fill: C.blue, stroke: C.blue, color: C.white }).svg}`,
    { glowX: 0.4, glowY: 0.3 });
  },

  // 6 ─ Accessibility: keyboard focus, contrast, screen reader, axe
  'accessibility-testing': () => frame(`
    ${windowFrame(40, 40, 520, 420, { url: 'yourapp.com/signup' })}
    ${bar(70, 112, 220, { h: 18, fill: C.text })}
    ${[0, 1].map((i) => `${text(70, 172 + i * 92, ['Email', 'Password'][i], { size: 22, fill: C.muted })}${rect(70, 184 + i * 92, 460, 50, { r: 10, fill: C.navy1, stroke: i === 0 ? C.amber : C.line2, sw: i === 0 ? 3.5 : 1.5 })}`).join('')}
    <rect x="64" y="178" width="472" height="62" rx="14" fill="none" stroke="${C.amber}" stroke-opacity=".35" stroke-width="6"/>
    ${rect(70, 380, 200, 54, { r: 27, fill: C.blue, stroke: '' })}${bar(124, 401, 90, { h: 12, fill: C.white })}
    ${rect(590, 40, 330, 130, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${iconTile('keyboard', 650, 105, 64, { tint: C.amber, color: C.amber })}${text(700, 98, 'Keyboard', { size: 26, weight: 700 })}${text(700, 132, 'Tab order', { size: 22, fill: C.muted })}
    ${rect(590, 190, 330, 130, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${iconTile('contrast', 650, 255, 64, { tint: C.blue, color: C.blue3 })}${text(700, 248, 'Contrast', { size: 26, weight: 700 })}${text(700, 282, '4.5 : 1 text', { size: 22, fill: C.muted })}
    ${rect(590, 340, 330, 120, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${iconTile('eye', 650, 400, 60, { tint: C.green, color: C.green })}
    ${[14, 26, 40, 22, 34, 18, 30, 12].map((h, i) => `<rect x="${704 + i * 22}" y="${400 - h / 2}" width="10" height="${h}" rx="5" fill="${C.green}" fill-opacity=".8"/>`).join('')}
    ${chip(40, 500, 'WCAG 2.2 AA', { size: 26, fill: C.green, stroke: C.green, color: C.navy0, weight: 700 }).svg}
    ${chip(296, 500, 'Screen readers', { size: 26, dot: C.green }).svg}`,
    { glowX: 0.8, glowY: 0.3 }),

  // 7 ─ Application security: auth flow + OWASP checks
  'security-testing': () => frame(`
    <circle cx="230" cy="250" r="160" fill="${C.blue}" fill-opacity=".08" stroke="${C.blue2}" stroke-opacity=".35" stroke-width="2" stroke-dasharray="6 10"/>
    <circle cx="230" cy="250" r="110" fill="${C.panel2}" stroke="${C.blue2}" stroke-width="3" filter="url(#sh)"/>
    ${icon('shieldCheck', 230, 240, 120, { color: C.green, sw: 1.6 })}
    ${[['lock', 230, 70], ['key', 70, 300], ['user', 390, 300]].map(([ic, x, y]) => `<circle cx="${x}" cy="${y}" r="38" fill="${C.panel3}" stroke="${C.line2}" stroke-width="2" filter="url(#sh)"/>${icon(ic, x, y, 38, { color: C.blue3, sw: 2 })}`).join('')}
    ${rect(480, 40, 440, 400, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${text(506, 90, 'OWASP checks', { size: 28, weight: 700 })}
    ${[['Access control', 1], ['Injection', 1], ['Auth & sessions', 1], ['Misconfiguration', 0], ['Known issues', 1]].map(([l, ok], i) => {
      const y = 118 + i * 62;
      return `${rect(506, y, 388, 50, { r: 10, fill: C.panel3 })}${text(528, y + 33, l, { size: 23, weight: 500 })}${ok ? tick(866, y + 25, 14) : `<circle cx="866" cy="${y + 25}" r="14" fill="${C.amber}"/>${text(866, y + 33, '!', { size: 22, weight: 800, anchor: 'middle', fill: C.navy0 })}`}`;
    }).join('')}
    ${chip(480, 480, 'Security regression', { size: 26, fill: C.blue, stroke: C.blue, color: C.white }).svg}
    ${chip(40, 480, 'Auth & roles', { size: 26, dot: C.green }).svg}`,
    { glowX: 0.25, glowY: 0.4 }),

  // 8 ─ AI & LLM testing: prompts → evaluated responses
  'ai-application-testing': () => frame(`
    ${rect(40, 40, 470, 520, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${rect(150, 70, 330, 70, { r: 18, fill: C.blue, op: 0.85, stroke: '' })}${bar(172, 96, 200, { h: 10, fill: C.white })}${bar(172, 116, 140, { h: 8, fill: C.white, op: 0.6 })}
    ${rect(70, 160, 360, 96, { r: 18, fill: C.panel3, stroke: C.line2 })}${icon('robot', 104, 208, 36, { color: C.blue3, sw: 2 })}${bar(140, 188, 250, { h: 10, fill: C.text })}${bar(140, 208, 210, { h: 8 })}${bar(140, 226, 160, { h: 8 })}
    ${tick(450, 208, 16)}
    ${rect(150, 280, 330, 70, { r: 18, fill: C.orange, op: 0.85, stroke: '' })}${bar(172, 306, 180, { h: 10, fill: C.white })}${bar(172, 326, 220, { h: 8, fill: C.white, op: 0.6 })}
    ${rect(70, 370, 360, 82, { r: 18, fill: C.panel3, stroke: C.red, sw: 2 })}${icon('shield', 104, 411, 34, { color: C.red, sw: 2 })}${text(140, 420, 'Injection blocked', { size: 24, weight: 600 })}
    ${chip(70, 486, 'Prompt suite', { size: 24, dot: C.blue2, fill: C.panel }).svg}
    ${rect(540, 40, 380, 520, { r: 18, fill: C.panel2, stroke: C.line2, filter: 'sh' })}
    ${text(566, 90, 'Evaluation', { size: 28, weight: 700 })}
    ${[['Accuracy', 0.82, C.green], ['Grounded', 0.76, C.green], ['Tone', 0.9, C.blue2], ['Safety', 0.94, C.green]].map(([l, v, c], i) => {
      const y = 130 + i * 80;
      return `${text(566, y + 22, l, { size: 23, weight: 600, fill: C.muted })}${rect(566, y + 36, 320, 16, { r: 8, fill: C.panel3, stroke: '' })}${rect(566, y + 36, 320 * v, 16, { r: 8, fill: c, stroke: '' })}`;
    }).join('')}
    ${rect(566, 470, 328, 60, { r: 14, fill: C.panel3 })}${icon('refresh', 600, 500, 28, { color: C.blue3, sw: 2 })}${text(628, 509, 'Regression baseline', { size: 22, weight: 600 })}`,
    { glowX: 0.6, glowY: 0.3 }),
};
