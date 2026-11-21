// app/components/infographics/ConversionBridge.tsx
// CAD ⇄ GIS conversion: drawing layers on one side, feature classes on the
// other, coordinate alignment in the middle. Reuses the FrontBackSplit card
// and wire styles; packets travel in both directions while on screen.
import { FaDraftingCompass, FaDatabase, FaGlobeAsia } from "react-icons/fa";
import s from "./infographics.module.css";

const MAP = [
  ["Layer C-UTIL-WATR", "Feature class WaterMains (line)"],
  ["Closed polylines on A-BLDG", "Buildings (polygon)"],
  ["Block attributes", "Attribute fields and domains"],
  ["Drawing units and origin", "EPSG code and vertical datum"],
];

export default function ConversionBridge({ className = "" }: { className?: string }) {
  return (
    <figure className={`${s.ig} ${s.split} ${className}`} data-ig="" aria-labelledby="ig-conv-cap">
      <div className={s.splitHead}>
        <span className={s.badge}>CAD ⇄ GIS conversion</span>
        <span className={s.flowLegend} aria-hidden="true">
          <span><i data-dir="out" />CAD to GIS</span>
          <span><i data-dir="back" />GIS to CAD</span>
        </span>
      </div>
      <div className={s.splitGrid}>
        <div className={`${s.splitCard} ${s.rev}`} data-tone="blue" style={{ ["--d" as string]: 0 }}>
          <span className={s.splitKicker}>CAD · AutoCAD, Civil 3D</span>
          <span className={s.splitTitle}><span className={s.splitIcon} aria-hidden="true"><FaDraftingCompass /></span>Drawings</span>
          <ul className={s.splitList}>
            <li>Layers, blocks and linework</li>
            <li>Drawing units and a local origin</li>
            <li>Built for plotting and design</li>
          </ul>
          <span className={s.splitTech}>DWG · DXF</span>
        </div>
        <div className={s.splitChannel}>
          <span className={s.splitApi}><FaGlobeAsia aria-hidden="true" /> CRS</span>
          <span className={s.splitWire} aria-hidden="true"><i className={s.flowPacket} /><i className={s.flowPacketBack} /></span>
          <span className={s.splitApiNote}>georeference · align</span>
        </div>
        <div className={`${s.splitCard} ${s.rev}`} data-tone="green" style={{ ["--d" as string]: 1 }}>
          <span className={s.splitKicker}>GIS · ArcGIS Pro, QGIS</span>
          <span className={s.splitTitle}><span className={s.splitIcon} aria-hidden="true"><FaDatabase /></span>Feature classes</span>
          <ul className={s.splitList}>
            <li>Points, lines and polygons</li>
            <li>Attributes, domains and metadata</li>
            <li>Built for analysis and queries</li>
          </ul>
          <span className={s.splitTech}>Shapefile · GDB · GeoPackage · GeoJSON · KML</span>
        </div>
      </div>
      <ul className={s.convMap} aria-label="Typical conversion mapping">
        {MAP.map(([a, b], i) => (
          <li key={a} className={s.rev} style={{ ["--d" as string]: 2 + i * 0.5 }}>
            <span>{a}</span><i aria-hidden="true">⇄</i><span>{b}</span>
          </li>
        ))}
      </ul>
      <figcaption id="ig-conv-cap" className={s.caption}>
        The hard part of conversion isn&apos;t the file format. It&apos;s placing drawings in the right
        coordinate system and deciding which layers become which feature classes, so nothing has to
        be redrawn on either side.
      </figcaption>
    </figure>
  );
}
