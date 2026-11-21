// app/components/infographics/DtmDsmProfile.tsx
// DTM vs DSM on the same cross-section as PointCloudSection: the DSM line
// follows rooftops and tree canopies, the DTM line follows bare ground. Both
// lines draw in when the graphic scrolls into view.
import s from "./infographics.module.css";
import { W, H, BUILDINGS, TREES, groundY, dtmPath, dsmPath, groundFill, waterRect } from "./geoScene";

export default function DtmDsmProfile({ className = "" }: { className?: string }) {
  const water = waterRect();
  return (
    <figure className={`${s.ig} ${s.dem} ${className}`} data-ig="" aria-labelledby="ig-dem-cap">
      <div className={s.demHead}>
        <span className={s.badge}>DTM vs DSM</span>
        <ul className={s.demLegend}>
          <li data-l="dsm"><i aria-hidden="true" /><b>DSM</b> surface: rooftops and tree tops</li>
          <li data-l="dtm"><i aria-hidden="true" /><b>DTM</b> bare ground, features removed</li>
        </ul>
      </div>
      <svg className={s.demSvg} viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="ig-dem-t">
        <title id="ig-dem-t">Elevation profile: the digital surface model runs over buildings and trees, while the digital terrain model follows the ground underneath them.</title>
        {BUILDINGS.map((b) => {
          const g = groundY(b.x0);
          return <rect key={b.x0} x={b.x0} y={g - b.h} width={b.x1 - b.x0} height={b.h + 30} rx="3" className={s.demBuilding} />;
        })}
        {TREES.map((t) => {
          const g = groundY(t.x);
          return (
            <g key={t.x} className={s.demTree}>
              <rect x={t.x - 3} y={g - t.h} width="6" height={t.h} />
              <ellipse cx={t.x} cy={g - t.h} rx={t.r} ry={t.r * 0.72} />
            </g>
          );
        })}
        <path d={groundFill()} className={s.demGround} />
        <rect x={water.x} y={water.y} width={water.w} height={H - water.y} className={s.demWater} />
        <path d={dsmPath()} pathLength={100} className={`${s.demLine} ${s.draw}`} data-l="dsm" />
        <path d={dtmPath()} pathLength={100} className={`${s.demLine} ${s.draw}`} data-l="dtm" />
        {/* height-above-ground marker on the tallest building */}
        <g className={s.demDim}>
          <line x1={BUILDINGS[0].x1 + 14} x2={BUILDINGS[0].x1 + 14} y1={groundY(BUILDINGS[0].x0) - BUILDINGS[0].h} y2={groundY(BUILDINGS[0].x1)} />
          <line x1={BUILDINGS[0].x1 + 8} x2={BUILDINGS[0].x1 + 20} y1={groundY(BUILDINGS[0].x0) - BUILDINGS[0].h} y2={groundY(BUILDINGS[0].x0) - BUILDINGS[0].h} />
          <line x1={BUILDINGS[0].x1 + 8} x2={BUILDINGS[0].x1 + 20} y1={groundY(BUILDINGS[0].x1)} y2={groundY(BUILDINGS[0].x1)} />
        </g>
      </svg>
      <figcaption id="ig-dem-cap" className={s.caption}>
        Drainage, grading and flood studies need the DTM. Line-of-sight, solar and obstruction
        studies need the DSM. The gap between the two (marked on the tallest building) is the
        height of whatever stands on the ground.
      </figcaption>
    </figure>
  );
}
