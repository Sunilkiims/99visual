// scripts/visuals/about/scenes.mjs
// Hero visual for /about — same kit and composition rules as the service
// pages: Bengaluru HQ on a schematic globe, linked to the countries the page
// already lists (India, USA, UK, UAE, Australia), plus the six disciplines.
// The left ~45% stays dark for the hero copy.
import { C, svg, bg, shadowDef, text, rect, icon, iconTile, chip } from '../website-development/kit.mjs';
import '../automation-testing/scenes-services.mjs'; // registers extra icons (flask, …)

function hero() {
  const W = 2400, H = 1280;
  const gx = 1800, gy = 640, R = 330;
  // Schematic positions on the globe face (not geographic projection).
  const hq = [gx + 150, gy + 40];
  const places = [
    ['USA', gx - 250, gy - 110, C.blue2],
    ['UK', gx - 40, gy - 230, C.blue2],
    ['UAE', gx + 60, gy - 10, C.green],
    ['Australia', gx + 250, gy + 230, C.green],
  ];
  // Web & app, 3D, CAD & GIS, SEO, QA, IT consulting
  const disc = [['code'], ['layers'], ['sitemap'], ['trend'], ['flask'], ['server']];
  return svg(W, H, `${bg(W, H, { glowX: 0.76, glowY: 0.5, glow: 0.3 })}${shadowDef('sh', { dy: 24, blur: 40, op: 0.6 })}
  <defs>
    <radialGradient id="gl" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="${C.panel3}"/><stop offset="1" stop-color="${C.navy1}"/></radialGradient>
    <linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="${C.navy0}"/><stop offset=".45" stop-color="${C.navy0}" stop-opacity=".9"/><stop offset=".58" stop-color="${C.navy0}" stop-opacity="0"/></linearGradient>
    <clipPath id="gc"><circle cx="${gx}" cy="${gy}" r="${R}"/></clipPath>
  </defs>
  <circle cx="${gx}" cy="${gy}" r="${R + 40}" fill="${C.blue}" fill-opacity=".06"/>
  <circle cx="${gx}" cy="${gy}" r="${R}" fill="url(#gl)" stroke="${C.line2}" stroke-width="2" filter="url(#sh)"/>
  <g clip-path="url(#gc)" fill="none" stroke="${C.blue3}" stroke-opacity=".14" stroke-width="2">
    ${[-2, -1, 0, 1, 2].map((k) => `<ellipse cx="${gx}" cy="${gy}" rx="${Math.abs(R * Math.cos(k * 0.55))}" ry="${R}"/>`).join('')}
    ${[-2, -1, 0, 1, 2].map((k) => `<path d="M${gx - R} ${gy + k * 120}H${gx + R}"/>`).join('')}
  </g>
  ${places.map(([, x, y, c]) => `<path d="M${hq[0]} ${hq[1]} Q ${(hq[0] + x) / 2} ${Math.min(hq[1], y) - 140} ${x} ${y}" fill="none" stroke="${c}" stroke-width="3" stroke-dasharray="6 9" stroke-opacity=".85"/>`).join('')}
  ${places.map(([l, x, y, c]) => `<circle cx="${x}" cy="${y}" r="13" fill="${c}"/><circle cx="${x}" cy="${y}" r="26" fill="none" stroke="${c}" stroke-opacity=".4" stroke-width="2"/>
    ${chip(x, y + 34, l, { size: 24, anchor: 'middle', fill: C.panel2 }).svg}`).join('')}
  <circle cx="${hq[0]}" cy="${hq[1]}" r="50" fill="${C.orange}" fill-opacity=".18"/>
  ${icon('pin', hq[0], hq[1] - 26, 62, { color: C.orange, fill: C.orange, sw: 1.4 })}<circle cx="${hq[0]}" cy="${hq[1] - 30}" r="9" fill="${C.navy0}"/>
  ${chip(hq[0], hq[1] + 26, 'Bengaluru HQ', { size: 26, anchor: 'middle', fill: C.orange, stroke: C.orange, color: C.white, weight: 700 }).svg}
  <!-- disciplines strip -->
  <g filter="url(#sh)">${rect(1440, 1040, 900, 120, { r: 60, fill: C.panel2, stroke: C.line2 })}</g>
  ${disc.map(([ic], i) => iconTile(ic, 1500 + i * 146, 1100, 52, { tint: i % 2 ? C.green : C.blue, color: i % 2 ? C.green : C.blue2 })).join('')}
  ${text(1890, 205, 'One team · five countries', { size: 30, weight: 700, anchor: 'middle', fill: C.text })}
  <path d="M1650 225H2130" stroke="${C.blue2}" stroke-opacity=".4" stroke-width="2" stroke-dasharray="4 10"/>
  <rect width="${W}" height="${H}" fill="url(#fadeL)"/>`);
}

export const sections = { 'about-hero': hero };
