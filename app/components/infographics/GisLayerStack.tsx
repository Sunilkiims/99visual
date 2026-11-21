// app/components/infographics/GisLayerStack.tsx
// A GIS project as stacked, aligned layers in isometric view. The layers
// start collapsed and fan apart when the graphic scrolls into view; each is
// numbered to match the list beside it.
import s from "./infographics.module.css";

const LAYERS = [
  { name: "Annotation & CAD linework", note: "Labels, dimensions and design lines brought in from DWG", tone: "orange" },
  { name: "Buildings",                 note: "Footprint polygons with use, floors and ID",               tone: "blue" },
  { name: "Utilities",                 note: "Water, power and drainage networks with valves and nodes", tone: "blue" },
  { name: "Parcels & land use",        note: "Polygons carrying ownership and zoning attributes",        tone: "green" },
  { name: "Imagery & terrain",         note: "Orthomosaic and elevation model as the base",              tone: "green" },
];

// Plane coordinates 0–100 mapped to an isometric diamond.
const ISO = (base: number) => `matrix(1.9 0.72 -1.9 0.72 300 ${base})`;
const GAP = 74;

function LayerArt({ i }: { i: number }) {
  switch (i) {
    case 0: return (<g className={s.gisArt} data-t="orange">
      <path d="M8 70 L46 40 L92 52" /><path d="M20 20 L20 46 M14 20 L26 20 M14 46 L26 46" />
      <circle cx="46" cy="40" r="2.5" /><circle cx="92" cy="52" r="2.5" />
    </g>);
    case 1: return (<g className={s.gisArt} data-t="blue" data-fill="">
      <rect x="14" y="12" width="18" height="14" /><rect x="40" y="10" width="12" height="22" /><rect x="62" y="56" width="22" height="16" /><rect x="18" y="62" width="14" height="18" />
    </g>);
    case 2: return (<g className={s.gisArt} data-t="blue">
      <path d="M0 50 H100 M50 0 V100 M50 30 H86 V90" /><circle cx="50" cy="50" r="3" /><circle cx="86" cy="30" r="3" /><circle cx="50" cy="80" r="3" />
    </g>);
    case 3: return (<g className={s.gisArt} data-t="green" data-fill="">
      <path d="M4 4 H46 V38 H4 Z M54 4 H96 V46 H54 Z M4 46 H40 V96 H4 Z M48 54 H96 V96 H48 Z" />
    </g>);
    default: return (<g className={s.gisArt} data-t="green">
      <path d="M0 64 C20 52 34 70 52 58 S82 44 100 52" /><path d="M0 80 C24 70 40 86 60 76 S86 66 100 72" /><path d="M0 34 C18 26 40 40 60 30 S90 22 100 28" />
    </g>);
  }
}

export default function GisLayerStack({ className = "" }: { className?: string }) {
  const n = LAYERS.length;
  const top = 18;
  return (
    <figure className={`${s.ig} ${s.gis} ${className}`} data-ig="" aria-labelledby="ig-gis-cap">
      <div className={s.gisHead}><span className={s.badge}>One site, many layers</span></div>
      <div className={s.gisGrid}>
        <svg className={s.gisSvg} viewBox={`0 0 600 ${top + (n - 1) * GAP + 160}`} role="img" aria-labelledby="ig-gis-t">
          <title id="ig-gis-t">Five aligned GIS layers stacked over the same site: CAD annotation, buildings, utilities, parcels, and imagery with terrain at the base.</title>
          {[...LAYERS].reverse().map((l, ri) => {
            const i = n - 1 - ri;
            const base = top + i * GAP;
            return (
              <g key={l.name} className={s.gisLayer} style={{ ["--i" as string]: i, ["--mid" as string]: (n - 1) / 2, ["--gap" as string]: `${GAP}px` }}>
                <g transform={ISO(base)}>
                  <rect x="0" y="0" width="100" height="100" className={s.gisPlane} data-t={l.tone} />
                  <LayerArt i={i} />
                </g>
                <g transform={`translate(${300 - 190 - 26} ${base + 72})`}>
                  <circle r="15" className={s.gisNum} data-t={l.tone} />
                  <text y="5" textAnchor="middle" className={s.gisNumT}>{i + 1}</text>
                </g>
              </g>
            );
          })}
        </svg>
        <ol className={s.gisList}>
          {LAYERS.map((l, i) => (
            <li key={l.name} className={s.rev} data-t={l.tone} style={{ ["--d" as string]: i }}>
              <span className={s.gisListN} aria-hidden="true">{i + 1}</span>
              <span><b>{l.name}</b><span>{l.note}</span></span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption id="ig-gis-cap" className={s.caption}>
        Every layer shares one coordinate system, so a pipe, a parcel boundary and a building line
        up exactly. That alignment is what lets you query across them, for example every building
        within 10 m of a water main.
      </figcaption>
    </figure>
  );
}
