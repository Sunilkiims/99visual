// app/components/infographics/PointCloudSection.tsx
// A classified LiDAR / photogrammetry point cloud, seen as a cross-section.
// Each point is coloured by its ASPRS class; a scan line sweeps across while
// the graphic is on screen. Illustrative drawing only (see geoScene.ts).
import s from "./infographics.module.css";
import { W, H, scenePoints, type PointClass } from "./geoScene";

const CLASSES: { key: PointClass; code: string; label: string }[] = [
  { key: "ground",   code: "2",     label: "Ground" },
  { key: "veg",      code: "3–5",   label: "Vegetation" },
  { key: "building", code: "6",     label: "Building" },
  { key: "water",    code: "9",     label: "Water" },
  { key: "noise",    code: "7 / 18", label: "Noise" },
];

const POINTS = scenePoints();

export default function PointCloudSection({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.pc} ${className}`} data-ig="" aria-labelledby="ig-pc-cap">
      <div className={s.pcHead}>
        <span className={s.badge}>Point cloud classification</span>
        <ul className={s.pcLegend} aria-label="ASPRS point classes">
          {CLASSES.map((c) => (
            <li key={c.key} data-c={c.key}><i aria-hidden="true" />{c.label} <span>class {c.code}</span></li>
          ))}
        </ul>
      </div>
      <div className={s.pcStage}>
        <div className={s.wipe}>
          <svg className={s.pcSvg} viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="ig-pc-t">
            <title id="ig-pc-t">Cross-section of a classified point cloud: ground, trees, buildings, a pond and a few noise points, each shown in its own colour.</title>
            {POINTS.map((p, i) => (
              <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={p.c === "noise" ? 3 : 2.3} className={s.pcPt} data-c={p.c} />
            ))}
          </svg>
        </div>
        <span className={s.pcScan} aria-hidden="true" />
      </div>
      <figcaption id="ig-pc-cap" className={s.caption}>
        Raw LiDAR arrives as millions of unlabelled points. Classification sorts them into ground,
        vegetation, buildings, water and noise, so a terrain model can be built from the ground
        points alone.
      </figcaption>
    </figure>
  );
}
