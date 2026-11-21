// app/components/infographics/geoScene.ts
// One illustrative terrain cross-section shared by PointCloudSection and
// DtmDsmProfile, so both graphics describe the same imaginary site. Values are
// generated with a seeded PRNG: the output is identical on every render (no
// hydration drift) and is a drawing, not survey data.

export const W = 800;
export const H = 260;

// Bare-ground height (SVG y, larger = lower) along the section.
export function groundY(x: number) {
  return 196 - 26 * Math.sin(x / 150) - 12 * Math.sin(x / 47 + 1.3) + (x > 560 && x < 650 ? 10 * Math.sin(((x - 560) / 90) * Math.PI) : 0);
}

export const BUILDINGS = [
  { x0: 150, x1: 228, h: 74 },
  { x0: 250, x1: 300, h: 46 },
  { x0: 690, x1: 752, h: 58 },
];
export const TREES = [
  { x: 92, r: 26, h: 52 },
  { x: 356, r: 30, h: 60 },
  { x: 402, r: 22, h: 44 },
  { x: 470, r: 28, h: 56 },
];
export const WATER = { x0: 566, x1: 646 };

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type PointClass = "ground" | "veg" | "building" | "water" | "noise";
export type ScenePoint = { x: number; y: number; c: PointClass };

function inBuilding(x: number) { return BUILDINGS.find((b) => x >= b.x0 && x <= b.x1); }
function inWater(x: number) { return x >= WATER.x0 && x <= WATER.x1; }
function waterY() { return groundY(WATER.x0) + 6; }

export function scenePoints(): ScenePoint[] {
  const rnd = mulberry32(99);
  const pts: ScenePoint[] = [];
  for (let x = 6; x < W - 4; x += 5.5) {
    const jx = x + (rnd() - 0.5) * 3;
    const b = inBuilding(jx);
    if (b) {
      pts.push({ x: jx, y: groundY(b.x0) - b.h + (rnd() - 0.5) * 2, c: "building" });
      continue;
    }
    if (inWater(jx)) {
      pts.push({ x: jx, y: waterY() + (rnd() - 0.5) * 1.5, c: "water" });
      continue;
    }
    pts.push({ x: jx, y: groundY(jx) + (rnd() - 0.5) * 3, c: "ground" });
  }
  // Building walls (sparse returns)
  for (const b of BUILDINGS) {
    for (let y = groundY(b.x0) - b.h + 8; y < groundY(b.x0) - 4; y += 11) {
      pts.push({ x: b.x0 + rnd() * 2, y, c: "building" });
      pts.push({ x: b.x1 - rnd() * 2, y, c: "building" });
    }
  }
  // Tree canopies: points scattered inside an ellipse above the trunk
  for (const t of TREES) {
    const base = groundY(t.x);
    const cy = base - t.h;
    for (let i = 0; i < 34; i++) {
      const a = rnd() * Math.PI * 2;
      const r = Math.sqrt(rnd());
      pts.push({ x: t.x + Math.cos(a) * t.r * r, y: cy + Math.sin(a) * t.r * 0.72 * r, c: "veg" });
    }
    for (let y = cy + t.r * 0.6; y < base - 4; y += 9) pts.push({ x: t.x + (rnd() - 0.5) * 3, y, c: "veg" });
  }
  // A few stray returns (birds, sensor noise)
  [[60, 30], [318, 18], [538, 44], [612, 26], [770, 38], [436, 236]].forEach(([x, y]) => pts.push({ x, y, c: "noise" }));
  return pts;
}

// Elevation lines for the DTM / DSM profile.
export function dtmPath() {
  let d = "";
  for (let x = 0; x <= W; x += 8) d += `${x === 0 ? "M" : "L"}${x} ${groundY(x).toFixed(1)}`;
  return d;
}

export function dsmPath() {
  let d = "";
  for (let x = 0; x <= W; x += 4) {
    let y = groundY(x);
    const b = inBuilding(x);
    if (b) y = groundY(b.x0) - b.h;
    else if (inWater(x)) y = waterY();
    for (const t of TREES) {
      const dx = Math.abs(x - t.x);
      if (dx < t.r) y = Math.min(y, groundY(t.x) - t.h - Math.sqrt(t.r * t.r - dx * dx) * 0.72);
    }
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
  }
  return d;
}

export function groundFill() {
  return `${dtmPath()}L${W} ${H}L0 ${H}Z`;
}

export function waterRect() {
  return { x: WATER.x0, y: waterY(), w: WATER.x1 - WATER.x0 };
}
