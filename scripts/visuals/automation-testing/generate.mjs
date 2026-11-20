#!/usr/bin/env node
// scripts/visuals/automation-testing/generate.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Renders the infographics used on /services/automation-testing to WebP in
// public/images/services/automation-testing/.
//
//   node scripts/visuals/automation-testing/generate.mjs           # all
//   node scripts/visuals/automation-testing/generate.mjs seo hero  # by name match
//   ... --svg <dir>                                                 # also dump SVG sources
//
// Uses `sharp` (installed with Next.js) to rasterise. Text uses the Inter
// font, so Inter must be installed locally for a faithful render; otherwise
// a fallback sans-serif is substituted.
// ─────────────────────────────────────────────────────────────────────────────
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { services } from './scenes-services.mjs';
import { sections } from './scenes-sections.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(here, '../../../public/images/services/automation-testing');

const args = process.argv.slice(2);
const svgIdx = args.indexOf('--svg');
const svgDir = svgIdx >= 0 ? args[svgIdx + 1] : null;
const filters = args.filter((a, i) => !a.startsWith('--') && (svgIdx < 0 || i !== svgIdx + 1));

const all = { ...services, ...sections };
const names = Object.keys(all).filter((n) => !filters.length || filters.some((f) => n.includes(f)));

fs.mkdirSync(OUT, { recursive: true });
if (svgDir) fs.mkdirSync(svgDir, { recursive: true });

for (const name of names) {
  const markup = all[name]();
  if (svgDir) fs.writeFileSync(path.join(svgDir, `${name}.svg`), markup);
  const file = path.join(OUT, `${name}.webp`);
  const info = await sharp(Buffer.from(markup), { density: 72 })
    .webp({ quality: 84, effort: 6, smartSubsample: true })
    .toFile(file);
  console.log(`${name}.webp  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}
