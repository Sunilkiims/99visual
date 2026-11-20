// app/components/infographics/iso.ts
// Tiny isometric-projection helpers so the 3D illustrations are generated from
// box dimensions instead of hand-typed polygon coordinates.

export type Pt = [number, number];

export function iso(x: number, y: number, z: number, ox = 80, oy = 40, k = 1): Pt {
  return [ox + (x - y) * 0.866 * k, oy + (x + y) * 0.5 * k - z * k];
}

export const pts = (p: Pt[]) => p.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

/** Visible faces (top, +y "left" face, +x "right" face) of an axis-aligned box. */
export function box(x: number, y: number, z: number, w: number, d: number, h: number, ox = 80, oy = 40) {
  const P = (a: number, b: number, c: number) => iso(a, b, c, ox, oy);
  return {
    top:   pts([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]),
    left:  pts([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)]),
    right: pts([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)]),
    topCenter: P(x + w / 2, y + d / 2, z + h),
  };
}

export type Tone = { top: string; left: string; right: string };

export const TONES: Record<"paper" | "blue" | "green" | "orange" | "ink", Tone> = {
  paper:  { top: "#FFFFFF", left: "#E6EAF3", right: "#CCD3E4" },
  blue:   { top: "#9DB3FF", left: "#2E5CFF", right: "#1D3FC4" },
  green:  { top: "#9CEBBE", left: "#37D67A", right: "#22A65A" },
  orange: { top: "#FFC596", left: "#FF8A2E", right: "#D96A12" },
  ink:    { top: "#3A3F4D", left: "#232631", right: "#12141A" },
};
