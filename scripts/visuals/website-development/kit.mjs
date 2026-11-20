// scripts/visuals/website-development/kit.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Shared drawing kit for the /services/website-development infographics.
// Every visual is built from these primitives so the set stays consistent:
// one palette, one icon set (drawn here, no third-party logos), one window
// chrome, one node/chip/connector style.
// ─────────────────────────────────────────────────────────────────────────────

// Palette — page tokens (--wdev-ink, --wdev-blue, --wdev-green) plus the
// brand orange, on a dark navy base.
export const C = {
  navy0: '#060B17',
  navy1: '#0A1224',
  panel: '#0F1A30',
  panel2: '#14213D',
  panel3: '#1B2A4A',
  line: 'rgba(148,170,220,0.16)',
  line2: 'rgba(148,170,220,0.28)',
  text: '#EAF0FB',
  muted: '#8D9BB8',
  dim: '#5E6C8A',
  blue: '#2E5CFF',
  blue2: '#5C82FF',
  blue3: '#9DB4FF',
  green: '#37D67A',
  orange: '#F97316',
  amber: '#FFB547',
  red: '#FF6B6B',
  white: '#FFFFFF',
};

export const FONT = "Inter, 'DejaVu Sans', sans-serif";
export const MONO = "'DejaVu Sans Mono', monospace";

let uid = 0;
const id = (p) => `${p}${++uid}`;

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Approximate rendered width of Inter text (good enough for chip sizing). */
export const textWidth = (s, size, weight = 500) => s.length * size * (weight >= 600 ? 0.61 : 0.58);

export function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
}

/** Navy background with a faint dot grid and one soft light source. */
export function bg(w, h, { glowX = 0.7, glowY = 0.35, glow = 0.22, grid = true, r = 0 } = {}) {
  const g = id('bg'), rg = id('rg'), pt = id('pt');
  return `
  <defs>
    <linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.navy1}"/><stop offset="1" stop-color="${C.navy0}"/>
    </linearGradient>
    <radialGradient id="${rg}" cx="${glowX}" cy="${glowY}" r="0.6">
      <stop offset="0" stop-color="${C.blue}" stop-opacity="${glow}"/>
      <stop offset="1" stop-color="${C.blue}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="${pt}" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="#9DB4FF" fill-opacity="0.07"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" rx="${r}" fill="url(#${g})"/>
  ${grid ? `<rect width="${w}" height="${h}" rx="${r}" fill="url(#${pt})"/>` : ''}
  <rect width="${w}" height="${h}" rx="${r}" fill="url(#${rg})"/>`;
}

export function shadowDef(name = 'sh', { dy = 10, blur = 18, op = 0.45 } = {}) {
  return `<defs><filter id="${name}" x="-20%" y="-20%" width="140%" height="160%">
    <feDropShadow dx="0" dy="${dy}" stdDeviation="${blur}" flood-color="#000814" flood-opacity="${op}"/></filter></defs>`;
}

export function text(x, y, s, { size = 32, weight = 500, fill = C.text, anchor = 'start', family = FONT, ls = 0, op = 1 } = {}) {
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" fill-opacity="${op}" text-anchor="${anchor}" letter-spacing="${ls}">${esc(s)}</text>`;
}

export function rect(x, y, w, h, { r = 12, fill = C.panel, stroke = C.line, sw = 1.5, op = 1, filter = '' } = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" fill-opacity="${op}" ${stroke ? `stroke="${stroke}" stroke-width="${sw}"` : ''} ${filter ? `filter="url(#${filter})"` : ''}/>`;
}

/** Placeholder text line ("lorem bar"). */
export const bar = (x, y, w, { h = 10, fill = C.dim, op = 0.7, r } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r ?? h / 2}" fill="${fill}" fill-opacity="${op}"/>`;

// ── Icons (24×24 grid, stroke-based, drawn for this set) ──────────────────────
function gearPath() {
  const pts = [];
  const teeth = 8, ro = 9.2, ri = 7.2;
  for (let i = 0; i < teeth * 2; i++) {
    const a1 = (i / (teeth * 2)) * Math.PI * 2 - Math.PI / 2;
    const a2 = ((i + 1) / (teeth * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? ro : ri;
    pts.push([12 + r * Math.cos(a1), 12 + r * Math.sin(a1)], [12 + r * Math.cos(a2), 12 + r * Math.sin(a2)]);
  }
  return `<path d="M${pts.map((p) => p.map((v) => v.toFixed(2)).join(' ')).join('L')}Z"/><circle cx="12" cy="12" r="3"/>`;
}
function starPath() {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 3.9 : 8.6;
    p.push(`${(12 + r * Math.cos(a)).toFixed(2)} ${(12.6 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `<path d="M${p.join('L')}Z"/>`;
}

export const ICONS = {
  db: '<ellipse cx="12" cy="5.5" rx="7" ry="2.8"/><path d="M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13"/><path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><circle cx="12" cy="15.5" r="1.3"/>',
  shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.4-7.5 9.5-4.3-1.1-7.5-4.9-7.5-9.5V6z"/>',
  shieldCheck: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.4-7.5 9.5-4.3-1.1-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12.2l2.3 2.3 4.2-4.6"/>',
  cloud: '<path d="M7.5 18.5h9.5a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.6a4.5 4.5 0 0 0 .5 8.9z"/>',
  server: '<rect x="4" y="4" width="16" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="16" height="6.5" rx="1.6"/><path d="M7.5 7.25h.01M7.5 16.75h.01M11 7.25h6M11 16.75h6"/>',
  user: '<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"/>',
  users: '<circle cx="9" cy="9" r="3.2"/><path d="M3 19.5c.7-3.2 3.1-5 6-5s5.3 1.8 6 5"/><path d="M15.5 6.2a3 3 0 0 1 0 5.6M17.5 14.8c1.8.6 3 2.2 3.5 4.7"/>',
  gear: gearPath(),
  bars: '<path d="M5 20V12M10 20V6M15 20v-9M20 20V9"/>',
  chart: '<path d="M4 17l5-6 4 3 7-8"/><path d="M4 20.5h16"/>',
  cart: '<path d="M3.5 4.5h2.3l2.2 10.2h10l2-7.2H7"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="16.5" cy="19" r="1.4"/>',
  code: '<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 5l-3 14"/>',
  braces: '<path d="M9 4.5c-2 0-2.5 1-2.5 2.5v2.5c0 1.2-.8 2-2 2.5 1.2.5 2 1.3 2 2.5V17c0 1.5.5 2.5 2.5 2.5M15 4.5c2 0 2.5 1 2.5 2.5v2.5c0 1.2.8 2 2 2.5-1.2.5-2 1.3-2 2.5V17c0 1.5-.5 2.5-2.5 2.5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
  gauge: '<path d="M4.5 17a8 8 0 1 1 15 0"/><path d="M12 13l3.5-4"/><circle cx="12" cy="13" r="1.2"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><ellipse cx="12" cy="12" rx="3.8" ry="8.5"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2.5 2.5M14 9l2 2"/>',
  card: '<rect x="3" y="6" width="18" height="12.5" rx="2"/><path d="M3 10.5h18M7 15h4"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.8 7l8.2 6 8.2-6"/>',
  bell: '<path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 2H5z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  layers: '<path d="M12 4l8.5 4.5L12 13 3.5 8.5z"/><path d="M3.5 12.5L12 17l8.5-4.5"/><path d="M3.5 16.5L12 21l8.5-4.5"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2.2"/><path d="M11 18h2"/>',
  tablet: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M11 18h2"/>',
  monitor: '<rect x="3" y="4" width="18" height="12.5" rx="1.8"/><path d="M9 20.5h6M12 16.5v4"/>',
  wall: '<rect x="3.5" y="5" width="17" height="14" rx="1.5"/><path d="M3.5 9.7h17M3.5 14.3h17M9 5v4.7M15 5v4.7M6.5 9.7v4.6M12 9.7v4.6M17.5 9.7v4.6M9 14.3V19M15 14.3V19"/>',
  eye: '<path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
  bug: '<rect x="7.5" y="8" width="9" height="11" rx="4.5"/><path d="M12 11v8M9.5 8a2.5 2.5 0 0 1 5 0M7.5 12.5H4M20 12.5h-3.5M7.6 16.5l-3 1.5M16.4 16.5l3 1.5M8 9.5L5.5 7.5M16 9.5l2.5-2"/>',
  branch: '<circle cx="6.5" cy="5.5" r="2"/><circle cx="6.5" cy="18.5" r="2"/><circle cx="17.5" cy="8" r="2"/><path d="M6.5 7.5v9M17.5 10c0 4-5 3.5-9.5 6.5"/>',
  box: '<path d="M12 3l8 4.3v9.4L12 21l-8-4.3V7.3z"/><path d="M4 7.3l8 4.4 8-4.4M12 11.7V21"/>',
  bolt: '<path d="M13 3L5.5 13.5H11L10 21l7.5-10.5H12z"/>',
  cursor: '<path d="M6 3.5l12.5 7.3-5.4 1.4-2.6 5.3z"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/><path d="M6.2 12.5h3l1.5-2.5 2 4 1.5-1.5h3.6"/>',
  cap: '<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4M21.5 9.5v5"/>',
  house: '<path d="M3.5 11L12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
  pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  cutlery: '<path d="M7 3v7a2 2 0 0 0 2 2v9M11 3v7a2 2 0 0 1-2 2M9 3v6M16.5 21V3c-2 1.5-3 4-3 7 0 1.5 1 2.5 3 2.5"/>',
  truck: '<path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  bag: '<path d="M5 8h14l-1 12.5H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  star: starPath(),
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v3.8h-3.8"/>',
  wrench: '<path d="M14.5 5.5a4 4 0 0 0-5 5L4 16l4 4 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  terminal: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M7 9.5l3 2.5-3 2.5M12 15h5"/>',
  upload: '<path d="M12 16V5M7.5 9.5L12 5l4.5 4.5M5 19.5h14"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  file: '<path d="M6 3.5h8l4 4V20.5H6z"/><path d="M14 3.5v4h4M9 12h6M9 16h6"/>',
  sitemap: '<rect x="9" y="3.5" width="6" height="4.5" rx="1"/><rect x="3" y="16" width="6" height="4.5" rx="1"/><rect x="15" y="16" width="6" height="4.5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.2"/>',
  trend: '<path d="M3.5 17l6-6 4 4 7-7.5"/><path d="M15 7.5h5.5V13"/>',
  pencil: '<path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="M13.5 7l3 3"/>',
  palette: '<path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.3 0 2-.8 2-1.8 0-1.4-1.2-1.6-1.2-2.9 0-1 .8-1.8 1.9-1.8h2.1a3.7 3.7 0 0 0 3.7-3.7C20.5 6.6 16.7 3.5 12 3.5z"/><circle cx="7.8" cy="11" r="1"/><circle cx="10" cy="7.3" r="1"/><circle cx="14.5" cy="7.3" r="1"/>',
  plane: '<path d="M10.5 13.5L3 11l1.5-1.5 7.5 1L16.5 6c1-1 2.6-1.3 3.2-.7s.3 2.2-.7 3.2L14.5 13l1 7.5L14 22l-2.5-7.5L7.5 18.5V21L6 22l-1-3.5L1.5 17.5 3 16h2.5z" transform="scale(0.92) translate(1.2 0.4)"/>',
  bed: '<path d="M3 18.5V7M3 14h18v4.5M21 14v-2.5a3 3 0 0 0-3-3h-7V14"/><circle cx="7" cy="11" r="2"/>',
  toggle: '<rect x="2.5" y="7" width="19" height="10" rx="5"/><circle cx="16.5" cy="12" r="3"/>',
};

/** Draws an icon centred on (cx, cy) at the given pixel size. */
export function icon(name, cx, cy, size, { color = C.blue2, sw = 1.8, fill = 'none' } = {}) {
  const s = size / 24;
  return `<g transform="translate(${cx - size / 2} ${cy - size / 2}) scale(${s})" fill="${fill}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;
}

/** Icon inside a tinted rounded square. */
export function iconTile(name, cx, cy, size, { color = C.blue2, tint = C.blue, r } = {}) {
  return `${rect(cx - size / 2, cy - size / 2, size, size, { r: r ?? size * 0.28, fill: tint, op: 0.16, stroke: tint, sw: 1.2 })}
    ${icon(name, cx, cy, size * 0.56, { color })}`;
}

/** Browser window with chrome; returns markup. Content area starts at y + 44*k. */
export function windowFrame(x, y, w, h, { k = 1, url = '', filter = 'sh', fill = C.panel } = {}) {
  const bh = 40 * k;
  return `
  ${rect(x, y, w, h, { r: 16 * k, fill, stroke: C.line2, sw: 1.5, filter })}
  <path d="M${x} ${y + bh}h${w}" stroke="${C.line}" stroke-width="1.5"/>
  <circle cx="${x + 22 * k}" cy="${y + bh / 2}" r="${5.5 * k}" fill="${C.dim}" fill-opacity=".9"/>
  <circle cx="${x + 40 * k}" cy="${y + bh / 2}" r="${5.5 * k}" fill="${C.dim}" fill-opacity=".6"/>
  <circle cx="${x + 58 * k}" cy="${y + bh / 2}" r="${5.5 * k}" fill="${C.dim}" fill-opacity=".4"/>
  ${url ? `${rect(x + 80 * k, y + 10 * k, Math.min(w - 110 * k, 300 * k), bh - 20 * k, { r: (bh - 20 * k) / 2, fill: C.navy1, stroke: C.line, sw: 1 })}
  ${text(x + 96 * k, y + bh / 2 + 5 * k, url, { size: 13 * k, fill: C.muted, family: MONO })}` : ''}`;
}

/** Labelled node card: icon tile + label. */
export function node(x, y, w, h, iconName, label, { accent = C.blue, iconColor = C.blue2, size = 30, weight = 600, filter = 'sh', sub } = {}) {
  const t = h * 0.62;
  return `
  ${rect(x, y, w, h, { r: 14, fill: C.panel2, stroke: C.line2, sw: 1.5, filter })}
  ${iconTile(iconName, x + h / 2 + 2, y + h / 2, t, { color: iconColor, tint: accent })}
  ${text(x + h + 12, y + h / 2 + (sub ? -2 : size * 0.36), label, { size, weight })}
  ${sub ? text(x + h + 12, y + h / 2 + size * 0.95, sub, { size: size * 0.7, fill: C.muted, weight: 400 }) : ''}`;
}

export function nodeWidth(label, h, size = 30) {
  return h + 12 + textWidth(label, size, 600) + 22;
}

/** Pill chip with text. */
export function chip(x, y, label, { size = 26, color = C.text, fill = C.panel3, stroke = C.line2, h, padX, anchor = 'start', weight = 500, dot } = {}) {
  const ch = h ?? size * 1.9;
  const px = padX ?? size * 0.75;
  const dw = dot ? size * 0.75 : 0;
  const w = textWidth(label, size, weight) + px * 2 + dw;
  const x0 = anchor === 'middle' ? x - w / 2 : x;
  return {
    w,
    svg: `${rect(x0, y, w, ch, { r: ch / 2, fill, stroke, sw: 1.3 })}
    ${dot ? `<circle cx="${x0 + px + size * 0.22}" cy="${y + ch / 2}" r="${size * 0.22}" fill="${dot}"/>` : ''}
    ${text(x0 + px + dw, y + ch / 2 + size * 0.36, label, { size, color, fill: color, weight })}`,
  };
}

/** Connector path with soft blue stroke and endpoint dots. */
export function connector(d, { color = C.blue2, op = 0.6, sw = 2.2, dash = '', ends = [] } = {}) {
  return `<path d="${d}" fill="none" stroke="${color}" stroke-opacity="${op}" stroke-width="${sw}" ${dash ? `stroke-dasharray="${dash}"` : ''} stroke-linecap="round"/>
  ${ends.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${C.navy0}" stroke="${color}" stroke-width="2"/>`).join('')}`;
}

/** Straight arrow with a small chevron head. */
export function arrow(x1, y1, x2, y2, { color = C.blue2, sw = 3, op = 0.9, head = 12 } = {}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx1 = x2 - head * Math.cos(a - 0.5), hy1 = y2 - head * Math.sin(a - 0.5);
  const hx2 = x2 - head * Math.cos(a + 0.5), hy2 = y2 - head * Math.sin(a + 0.5);
  return `<path d="M${x1} ${y1}L${x2} ${y2}M${hx1} ${hy1}L${x2} ${y2}L${hx2} ${hy2}" fill="none" stroke="${color}" stroke-opacity="${op}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/** Simple line chart inside a box. */
export function lineChart(x, y, w, h, pts, { color = C.blue2, area = true } = {}) {
  const n = pts.length;
  const xy = pts.map((v, i) => [x + (i / (n - 1)) * w, y + h - v * h]);
  const d = 'M' + xy.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join('L');
  const gid = id('lc');
  return `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".35"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
  ${area ? `<path d="${d}L${x + w} ${y + h}L${x} ${y + h}Z" fill="url(#${gid})"/>` : ''}
  <path d="${d}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
}

/** Bar chart inside a box. */
export function barChart(x, y, w, h, vals, { color = C.blue2, gap = 0.35, accentIdx = -1 } = {}) {
  const n = vals.length, bw = w / (n + (n - 1) * gap);
  return vals.map((v, i) => {
    const bx = x + i * bw * (1 + gap), bh = v * h;
    return `<rect x="${bx}" y="${y + h - bh}" width="${bw}" height="${bh}" rx="${Math.min(4, bw / 3)}" fill="${i === accentIdx ? C.orange : color}" fill-opacity="${i === accentIdx ? 1 : 0.85}"/>`;
  }).join('');
}

/** Circular progress ring (0..1). */
export function ring(cx, cy, r, v, { color = C.green, sw = 10, track = C.panel3 } = {}) {
  const c = 2 * Math.PI * r;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${track}" stroke-width="${sw}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"
    stroke-dasharray="${(c * v).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`;
}
