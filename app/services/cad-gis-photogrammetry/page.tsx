// app/services/cad-gis-photogrammetry/page.tsx
//
// CAD, GIS, LiDAR & Photogrammetry (geospatial engineering) service page.
//
// REBUILD NOTES (this revision):
//   - The previous "services" array had 5 largely-overlapping, generic
//     descriptions ("Advanced CAD, GIS & Geospatial Services" vs. "End-to-
//     End CAD, GIS & Mapping Solutions" vs. "Precision CAD, GIS & LiDAR
//     Services") that didn't actually name distinct services. Replaced with
//     8 concrete, non-overlapping offerings (CAD drafting, GIS mapping,
//     drone/aerial photogrammetry, LiDAR point cloud processing, terrain
//     modeling, utility/asset mapping, CAD↔GIS conversion, survey/
//     topographic mapping).
//   - Removed the hero ticker's fabricated precision claims ("RMSE 0.03m",
//     "0 flagged points", "2.4M points classified", "GSD 2.1cm/px") that
//     were styled as real project telemetry. Replaced with non-quantitative
//     process labels, matching the same fix applied to the QA/automation-
//     testing page.
//   - Added: a "What We Deliver" section (concrete deliverable/format list),
//     a software/tooling section explaining when each tool applies (not a
//     logo wall), a 10-step geospatial project workflow, an industries/use-
//     case section framed as supported mapping scenarios (not client
//     claims), an FAQ expanded from 4 to 12 questions, and a "Related
//     Services & Reading" internal-linking section.
//   - Tool/format terminology (AutoCAD, Civil 3D, Revit, ArcGIS Pro, QGIS,
//     LAStools, TerraScan, CloudCompare, Pix4D, Agisoft Metashape, DJI
//     Terra; DWG/DXF, Shapefile/GDB/GeoJSON, LAS/LAZ, GeoTIFF, KML) is
//     standard industry terminology, not invented.
//   - Hero, header/footer, breadcrumb markup, CSS design tokens (cg-*
//     custom properties), card/section visual language, ConsultationCTA
//     wiring and JSON-LD plumbing are reused from the existing 99 Visual
//     design system — only content, structure and claims changed. Hero
//     layout also carries forward the height/overflow fixes already applied
//     to the QA page (min-height instead of fixed height, no clipping).
//
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import ScrollDown     from "@/app/components/scrolldown";
import ConsultationCTA from "@/app/components/ConsultationCTA";

import {
  FaDraftingCompass, FaMapMarkedAlt, FaCubes, FaSatellite, FaLayerGroup,
  FaProjectDiagram, FaMountain, FaRoad, FaExchangeAlt, FaRulerCombined,
  FaCity, FaTree, FaHardHat, FaBolt, FaTractor, FaBuilding,
  FaBroadcastTower, FaCheckCircle, FaDatabase, FaFileAlt,
} from "react-icons/fa";

import type { Metadata } from "next";
import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
  faqSchema,
} from "@/lib/schema";

const BASE_SAFE = BASE.replace(/\/$/, "");
const PAGE_PATH = "/services/cad-gis-photogrammetry";
const PAGE_URL  = `${BASE_SAFE}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "CAD, GIS & Photogrammetry Services | LiDAR — 99 Visual",

  description:
    "CAD drafting, GIS mapping, drone photogrammetry, LiDAR point cloud processing, terrain modeling, and spatial analysis for infrastructure, engineering, construction, and land development projects.",

  metadataBase: new URL(BASE_SAFE),

  alternates: {
    canonical: PAGE_PATH,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:       "CAD, GIS & Photogrammetry Services | LiDAR, 3D Mapping & Geospatial Solutions",
    description: "CAD drafting, GIS mapping, drone photogrammetry, LiDAR point cloud processing, terrain modeling, and spatial analysis — precision geospatial engineering by 99 Visual Solutions.",
    url: PAGE_URL,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE_SAFE}/images/services/cad-gis-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "CAD, GIS & Photogrammetry Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "CAD, GIS & Photogrammetry | LiDAR, 3D Mapping — 99 Visual Solutions",
    description: "CAD drafting, GIS mapping, drone photogrammetry, LiDAR processing, terrain modeling & spatial analysis by 99 Visual Solutions.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE_SAFE}/images/services/cad-gis-og.jpg`,
        alt: "CAD, GIS & Photogrammetry Services by 99 Visual Solutions",
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
  authors:         [{ name: "99 Visual Solutions", url: BASE_SAFE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = "2026-09-25"; // <- Update this when content changes (must match app/sitemap.ts lastModified for this route)

const FAQ_ITEMS = [
  {
    question: "What CAD drafting services does 99 Visual Solutions provide?",
    answer:
      `We offer 2D CAD drafting, 3D CAD modelling, engineering design support, and architectural CAD services for infrastructure, construction, and industrial projects. Our CAD team works with AutoCAD, Civil 3D, Revit, and SolidWorks to deliver precise, project-ready drawings. Contact us at ${CONTACT_EMAIL} for a free consultation and quote.`,
  },
  {
    question: "What GIS services does 99 Visual Solutions offer?",
    answer:
      "Our GIS services include geospatial data management, spatial analysis, thematic and urban planning mapping, asset management GIS, and custom GIS solutions for infrastructure and environmental projects. We work with ArcGIS Pro and QGIS to transform raw geographic data into actionable insights that support planning, decision-making, and resource management.",
  },
  {
    question: "Does 99 Visual Solutions process LiDAR data?",
    answer:
      "Yes — we process airborne and terrestrial LiDAR point clouds: classification (ground, buildings, vegetation), strip alignment, and generation of digital terrain models (DTM) and digital surface models (DSM). Our team works with LAStools, TerraScan, and CloudCompare to deliver clean, classified point cloud data and terrain outputs for infrastructure, engineering, and environmental monitoring projects.",
  },
  {
    question: "What's the difference between a DTM, DSM and DEM?",
    answer:
      "A Digital Surface Model (DSM) represents the earth's surface including everything on it — buildings, trees, structures. A Digital Terrain Model (DTM) represents the bare ground with those surface features stripped out, which is what's needed for hydrology, drainage, and grading analysis. \"DEM\" (Digital Elevation Model) is often used as a general term covering both — we'll confirm which one your project actually needs before processing, since using the wrong one is a common source of downstream errors.",
  },
  {
    question: "What photogrammetry services are available?",
    answer:
      `We provide drone and aerial photogrammetry, orthomosaic mapping, 3D photogrammetric modelling, and survey-grade mapping for construction, engineering, and environmental monitoring. Outputs include georeferenced GeoTIFF orthomosaics, LAS/LAZ point clouds, DSM/DTM elevation models, contour lines, and textured 3D mesh models. Email us at ${CONTACT_EMAIL} to discuss your project requirements.`,
  },
  {
    question: "Can you convert CAD files to GIS formats, or GIS data to CAD?",
    answer:
      "Yes. We convert between CAD formats (DWG/DXF) and GIS formats (Shapefile, File Geodatabase, GeoJSON, KML) in both directions, including coordinate system alignment and georeferencing, so engineering drawings and geospatial datasets can move between AutoCAD/Civil 3D and ArcGIS/QGIS workflows without manual rebuilding.",
  },
  {
    question: "What formats do you deliver data in?",
    answer:
      "Whatever your workflow needs: DWG/DXF for CAD, Shapefile/File Geodatabase/GeoJSON for GIS, LAS/LAZ for point clouds, GeoTIFF for orthomosaics and raster elevation models, and OBJ/FBX for 3D mesh models, among others. We confirm required formats, coordinate reference systems, and datum during project scoping so deliverables load directly into your existing systems.",
  },
  {
    question: "Do you provide survey-grade accuracy?",
    answer:
      "Achievable accuracy depends on ground control points (GCPs), sensor quality, and flight/survey parameters — we'll tell you plainly what accuracy is realistic for your project's constraints before you commit, rather than promising a number that depends on decisions not yet made. Where survey-grade accuracy is required, we plan GCP placement and GNSS post-processing (PPK/RTK) accordingly.",
  },
  {
    question: "Can you work with drone or LiDAR data we've already captured?",
    answer:
      "Yes. If you already have raw drone imagery, LiDAR point clouds, or survey data, we can process it directly — classification, terrain modelling, orthomosaic generation, or CAD/GIS conversion — without needing to recapture the data, as long as it meets basic quality requirements we'll confirm upfront.",
  },
  {
    question: "How long does a typical CAD, GIS or LiDAR project take?",
    answer:
      "It depends heavily on project scope — site size, data volume, required accuracy, and deliverable complexity all matter more than a single average would suggest. We provide a project-specific timeline as part of scoping, rather than a generic estimate that wouldn't reflect your actual project.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "Infrastructure, civil engineering, construction, urban planning, utilities, transportation, mining, environmental and land management, agriculture, and government/public works projects most commonly need this combination of CAD, GIS, LiDAR and photogrammetry services — see the industries section below for specifics on the kinds of mapping challenges each typically presents.",
  },
  {
    question: "Do you sign NDAs and handle geospatial data securely?",
    answer:
      `Yes — we're glad to sign an NDA before you share project data, and can walk through our data-handling approach for sensitive sites (government, utilities, defense-adjacent infrastructure) on request. Contact us at ${CONTACT_EMAIL} to start that conversation before sending any files.`,
  },
];

const cgBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",                      url: "/" },
  { name: "Services",                  url: "/services" },
  { name: "CAD, GIS & Photogrammetry", url: PAGE_PATH },
]);

const cgFaqNode = {
  ...faqSchema(FAQ_ITEMS),
  "@id":            `${PAGE_URL}#faq`,
  mainEntityOfPage: { "@id": `${PAGE_URL}#webpage` },
};

const cgServiceNode = {
  "@type":     "Service",
  "@id":       `${PAGE_URL}#service`,
  name:        "CAD, GIS & Photogrammetry Services",
  description: "CAD drafting, GIS mapping, drone photogrammetry, LiDAR point cloud processing, terrain modeling, utility/asset mapping, CAD-GIS data conversion, and survey/topographic mapping for infrastructure, engineering, construction, and government projects.",
  provider:    { "@id": `${BASE_SAFE}/#organization` },
  areaServed:  [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Australia" },
  ],
  url:         PAGE_URL,
  serviceType: "Geospatial & CAD Engineering Services",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "CAD, GIS & Photogrammetry Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CAD Drafting & 3D Modeling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "GIS Mapping & Spatial Analysis" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drone & Aerial Photogrammetry" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LiDAR Point Cloud Processing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Terrain & Surface Modeling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Utility, Infrastructure & Asset Mapping" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CAD to GIS Data Conversion" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Survey & Topographic Mapping" } },
    ],
  },
};

const cgPageNode = {
  "@type":       "WebPage",
  "@id":         `${PAGE_URL}#webpage`,
  url:           PAGE_URL,
  name:          "CAD, GIS & Photogrammetry Services | LiDAR — 99 Visual Solutions",
  description:   "CAD drafting, GIS mapping, drone photogrammetry, LiDAR point cloud processing, terrain modeling, and spatial analysis for infrastructure, engineering, construction, and government projects.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE_SAFE}/#website` },
  about:         { "@id": `${BASE_SAFE}/#organization` },
  publisher:     { "@id": `${BASE_SAFE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE_SAFE}/images/services/cad-gis-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "CAD, GIS & Photogrammetry Services by 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".cg-hero__h1", ".cg-hero__sub"],
  },
  breadcrumb:      { "@id": `${PAGE_URL}#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [PAGE_URL] },
};

const cgGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  cgPageNode,
  cgBreadcrumbNode,
  cgServiceNode,
  cgFaqNode,
);

const benefits = [
  { icon: <FaDraftingCompass />, title: "Accurate CAD Drafting",       description: "Precise CAD drawings and drafting for engineering, architecture, and infrastructure projects, delivered to the standards your downstream design and construction teams need." },
  { icon: <FaMapMarkedAlt />,    title: "GIS Data You Can Act On",     description: "Raw geospatial data transformed into structured, analysis-ready GIS datasets for urban planning, resource management, and infrastructure decisions." },
  { icon: <FaSatellite />,       title: "Reliable Photogrammetry",     description: "Drone-captured orthomosaics and 3D models processed with attention to ground control and georeferencing, not just raw image stitching." },
  { icon: <FaCubes />,           title: "Clean LiDAR Outputs",         description: "Classified LiDAR point clouds and terrain models that arrive ready to use — not raw data your team has to clean up first." },
  { icon: <FaLayerGroup />,      title: "CAD & GIS That Talk to Each Other", description: "Seamless conversion between CAD and GIS formats so data moves between your engineering and mapping workflows without manual rebuilding." },
  { icon: <FaProjectDiagram />,  title: "Deliverables in Your Format", description: "Data handed over in the format and coordinate system your systems already use, confirmed during scoping so nothing needs reworking on delivery." },
];

const services = [
  {
    id: "cad-drafting",
    title: "CAD Drafting & 3D Modeling",
    description: "2D CAD drafting and 3D CAD modeling for engineering, architecture, and infrastructure projects — including design support, as-built drawings, and drawing conversion between CAD formats and versions.",
    highlight: "Built with AutoCAD, Civil 3D, Revit and SolidWorks, so drawings arrive in the version and layer structure your team already works in.",
    bullets: ["2D drafting & 3D CAD modeling", "Engineering design & as-built drawings", "AutoCAD, Civil 3D, Revit & SolidWorks"],
    icon: <FaDraftingCompass />,
  },
  {
    id: "gis-mapping",
    title: "GIS Mapping & Spatial Analysis",
    description: "Geospatial data management, spatial analysis, and thematic/urban planning mapping — turning raw geographic data into structured GIS datasets that support planning and resource-management decisions.",
    highlight: "We build GIS layers and databases with the attribute structure your analysis actually needs, not just a map that looks right at a glance.",
    bullets: ["Geospatial data management & structuring", "Spatial analysis & thematic mapping", "ArcGIS Pro & QGIS workflows"],
    icon: <FaMapMarkedAlt />,
  },
  {
    id: "photogrammetry",
    title: "Drone & Aerial Photogrammetry",
    description: "UAV image capture and processing into georeferenced orthomosaics and 3D photogrammetric models, using ground control points (GCPs) for accuracy rather than raw image stitching alone.",
    highlight: "Accuracy is a function of flight planning and GCP placement, not just software — we plan for the accuracy your project actually needs before flying.",
    bullets: ["Drone image capture & orthomosaic generation", "GCP-based georeferencing", "Pix4D, Agisoft Metashape & DJI Terra"],
    icon: <FaSatellite />,
  },
  {
    id: "lidar-processing",
    title: "LiDAR Point Cloud Processing",
    description: "Airborne and terrestrial LiDAR point cloud classification (ground, buildings, vegetation), strip alignment, and cleaning — producing usable classified point clouds, not raw unfiltered data.",
    highlight: "Classified, clean point cloud data is what makes accurate terrain modeling possible downstream — this is the step most raw LiDAR data still needs.",
    bullets: ["Point cloud classification & cleaning", "Airborne & terrestrial LiDAR", "LAStools, TerraScan & CloudCompare"],
    icon: <FaCubes />,
  },
  {
    id: "terrain-modeling",
    title: "Digital Terrain & Surface Modeling",
    description: "Digital Terrain Model (DTM) and Digital Surface Model (DSM) generation, contour extraction, and hydrological/drainage analysis from LiDAR or photogrammetric elevation data.",
    highlight: "We confirm whether your project needs a DTM (bare ground) or DSM (surface with structures/vegetation) before processing — using the wrong one is a common, costly mistake.",
    bullets: ["DTM & DSM generation", "Contour extraction & elevation mapping", "Hydrological & drainage analysis"],
    icon: <FaMountain />,
  },
  {
    id: "utility-mapping",
    title: "Utility, Infrastructure & Asset Mapping",
    description: "Mapping of utility networks, infrastructure assets, and construction sites — including as-built mapping and asset inventories for ongoing management, not just a one-time survey.",
    highlight: "Asset data structured for GIS from the start, so it's ready for ongoing asset-management use rather than a static map that goes stale.",
    bullets: ["Utility & infrastructure network mapping", "Asset inventories & as-built mapping", "Construction site & progress mapping"],
    icon: <FaRoad />,
  },
  {
    id: "cad-gis-conversion",
    title: "CAD to GIS Data Conversion",
    description: "Conversion between CAD formats (DWG/DXF) and GIS formats (Shapefile, File Geodatabase, GeoJSON, KML) in both directions, with coordinate system alignment and georeferencing.",
    highlight: "This is the step that lets engineering drawings and geospatial datasets move between AutoCAD/Civil 3D and ArcGIS/QGIS workflows without manual rebuilding on either side.",
    bullets: ["CAD ↔ GIS format conversion", "Coordinate system alignment & georeferencing", "DWG/DXF, Shapefile, GDB & GeoJSON"],
    icon: <FaExchangeAlt />,
  },
  {
    id: "survey-mapping",
    title: "Survey & Topographic Mapping",
    description: "Processing of ground survey data into topographic and land maps, including volumetric and earthwork calculations for construction and land-development planning.",
    highlight: "Whether the source is total station survey, GNSS, drone, or LiDAR data, the output is a topographic map or volumetric report your team can plan against.",
    bullets: ["Topographic & land mapping", "Survey data processing", "Volumetric & earthwork calculations"],
    icon: <FaRulerCombined />,
  },
];

function serviceById(id: string) {
  return services.find((s) => s.id === id)!;
}

const clusters = [
  {
    id: "cad-gis",
    eyebrow: "CAD Engineering & GIS Analysis",
    heading: <>Engineering precision, <em>spatial context</em></>,
    intro: "CAD drafting and 3D modeling for engineering deliverables, paired with GIS mapping and spatial analysis for the geographic context around them.",
    cols: 2,
    ids: ["cad-drafting", "gis-mapping"],
  },
  {
    id: "aerial-lidar",
    eyebrow: "Aerial & LiDAR Data Capture",
    heading: <>From the air, <em>classified and clean</em></>,
    intro: "Drone photogrammetry and LiDAR point cloud processing that turns raw captured data into usable, classified geospatial datasets.",
    cols: 2,
    ids: ["photogrammetry", "lidar-processing"],
  },
  {
    id: "terrain-assets",
    eyebrow: "Terrain Modeling & Asset Mapping",
    heading: <>Model the ground, <em>map what&apos;s on it</em></>,
    intro: "DTM/DSM terrain modeling for elevation and drainage analysis, plus utility and infrastructure asset mapping for what sits on that terrain.",
    cols: 2,
    ids: ["terrain-modeling", "utility-mapping"],
  },
  {
    id: "conversion-survey",
    eyebrow: "Data Conversion & Survey Mapping",
    heading: <>Data that moves <em>between your systems</em></>,
    intro: "CAD-to-GIS conversion that keeps formats interoperable, and survey/topographic mapping that turns field data into planning-ready maps.",
    cols: 2,
    ids: ["cad-gis-conversion", "survey-mapping"],
  },
];

// "What We Deliver" — concrete deliverable/format types, not a vague promise.
const deliverables = [
  { icon: <FaFileAlt />,     label: "Orthomosaics (GeoTIFF)" },
  { icon: <FaCubes />,       label: "Point clouds (LAS/LAZ)" },
  { icon: <FaMountain />,    label: "DTM / DSM / DEM rasters" },
  { icon: <FaRulerCombined />, label: "Contour & topographic maps" },
  { icon: <FaLayerGroup />,  label: "3D mesh models (OBJ/FBX)" },
  { icon: <FaDraftingCompass />, label: "CAD drawings (DWG/DXF)" },
  { icon: <FaDatabase />,    label: "GIS datasets (SHP/GDB/GeoJSON)" },
  { icon: <FaCheckCircle />, label: "Volumetric & earthwork reports" },
  { icon: <FaRoad />,        label: "Utility & asset maps" },
  { icon: <FaMapMarkedAlt />, label: "Survey & land maps" },
];

// Software/tooling guidance — when each tool applies, not a logo wall.
const toolStack = [
  {
    name: "CAD Software — AutoCAD, Civil 3D, Revit",
    bestFor:
      "The right choice when the deliverable is an engineering drawing, as-built, or design-ready CAD file that needs to plug into a civil, architectural or MEP workflow.",
  },
  {
    name: "GIS Platforms — ArcGIS Pro, QGIS",
    bestFor:
      "Used when the deliverable is a structured, analyzable geospatial dataset — spatial analysis, thematic mapping, or asset/utility databases rather than a single drawing.",
  },
  {
    name: "LiDAR Processing — LAStools, TerraScan, CloudCompare",
    bestFor:
      "Applied to classify and clean raw point cloud data from airborne or terrestrial LiDAR before it's usable for terrain modeling or CAD/GIS integration.",
  },
  {
    name: "Photogrammetry — Pix4D, Agisoft Metashape, DJI Terra",
    bestFor:
      "Used to process drone-captured imagery into orthomosaics, point clouds and 3D models — accuracy here depends as much on flight planning and GCPs as on the software.",
  },
  {
    name: "Format & Coordinate Interoperability",
    bestFor:
      "DWG/DXF, Shapefile/GDB/GeoJSON, LAS/LAZ, GeoTIFF and KML conversions with coordinate reference system alignment, so deliverables load correctly in whatever system you're standardized on.",
  },
];

// 10-step geospatial project workflow.
const workflow = [
  { n: "01", title: "Project Scoping & Requirements",      desc: "We confirm project area, required accuracy, deliverable formats, and coordinate reference system before any data capture is planned." },
  { n: "02", title: "Data Acquisition Planning",            desc: "Flight plans, LiDAR mission parameters, or ground survey routes are designed around the accuracy and coverage the project needs." },
  { n: "03", title: "Field Data Capture",                   desc: "Drone flights, LiDAR scanning, or ground survey are carried out, with ground control points placed where survey-grade accuracy is required." },
  { n: "04", title: "Georeferencing & Ground Control",      desc: "Captured data is aligned to real-world coordinates using GCPs and/or GNSS post-processing (PPK/RTK)." },
  { n: "05", title: "Point Cloud Processing & Classification", desc: "LiDAR or photogrammetric point clouds are classified (ground, structures, vegetation) and cleaned of noise." },
  { n: "06", title: "Terrain & Surface Model Generation",   desc: "DTM/DSM rasters, contours, and elevation models are generated from the classified point cloud data." },
  { n: "07", title: "CAD Drafting / GIS Data Structuring",  desc: "Data is drafted into CAD drawings or structured into GIS datasets, depending on what the deliverable requires." },
  { n: "08", title: "Quality Control & Accuracy Validation", desc: "Outputs are checked against ground control and project accuracy requirements before delivery." },
  { n: "09", title: "Deliverable Packaging & Format Export", desc: "Final data is exported in the agreed formats and coordinate system, ready to load into your existing systems." },
  { n: "10", title: "Ongoing Support & Data Updates",       desc: "For projects with recurring capture needs (construction progress, asset management), we support periodic updates to keep data current." },
];

// Industries — framed as mapping scenarios we can support, not client claims.
const industries = [
  { icon: <FaHardHat />,          name: "Civil Engineering & Infrastructure", note: "As-built CAD drawings, terrain modeling for design, and utility mapping for existing site conditions." },
  { icon: <FaCity />,             name: "Urban & Regional Planning",  note: "GIS-based thematic mapping, land-use analysis, and topographic mapping to support planning decisions." },
  { icon: <FaBuilding />,         name: "Construction & Real Estate", note: "Construction progress mapping, volumetric/earthwork calculations, and as-built site documentation." },
  { icon: <FaBolt />,             name: "Utilities & Energy",         note: "Utility network mapping, asset inventories, and infrastructure mapping for ongoing asset management." },
  { icon: <FaRoad />,             name: "Transportation",             note: "Corridor mapping, topographic survey for route planning, and CAD drafting for transportation infrastructure." },
  { icon: <FaMountain />,         name: "Mining & Earthworks",        note: "Volumetric calculations for stockpiles and excavation, terrain modeling, and drone-based progress monitoring." },
  { icon: <FaTree />,             name: "Environmental & Land Management", note: "LiDAR-based terrain and vegetation analysis, land mapping, and spatial analysis for environmental assessment." },
  { icon: <FaTractor />,          name: "Agriculture",                note: "Orthomosaic mapping and terrain analysis to support precision agriculture and land planning." },
  { icon: <FaProjectDiagram />,   name: "Government & Public Works",  note: "GIS data management, asset mapping, and CAD/GIS conversion for public infrastructure records." },
  { icon: <FaBroadcastTower />,   name: "Telecommunications",         note: "Infrastructure mapping and asset inventories for network planning and existing site documentation." },
];

// Illustrative CLI-style log lines for the hero ticker band — process labels,
// not quantitative claims about real project accuracy, point counts or QC results.
const pipeline = [
  { cmd: "lidar_classify",    out: "points classified" },
  { cmd: "orthomosaic_build", out: "mosaic generated" },
  { cmd: "dtm_generate",      out: "surface modeled" },
  { cmd: "cad_export",        out: "drawing exported" },
  { cmd: "gis_overlay",       out: "layers merged" },
  { cmd: "survey_qc",         out: "quality checked" },
];

export default function CADGISPhotogrammetry() {
  return (
    <>
      <script
        id="schema-cg-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cgGraph) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .cg-page{
          --cg-ink:#12141A; --cg-muted:#5B6172; --cg-paper:#F5F6F8; --cg-surface:#FFFFFF;
          --cg-line:#E4E6EC; --cg-blue:#2E5CFF; --cg-green:#37D67A; --cg-orange:#F97316;
          background:var(--cg-paper);
        }
        .cg-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}

        .cg-label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.04em;color:var(--cg-blue);margin-bottom:.9rem;display:block;text-align:center;}
        .cg-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.6vw,2.5rem);font-weight:700;line-height:1.2;letter-spacing:-.015em;color:var(--cg-ink);margin:0 0 1rem;text-align:center;}
        .cg-h2 em{font-style:normal;color:var(--cg-blue);}

        /* ══ HERO — min-height (not fixed height), no inner clipping ═════ */
        .cg-hero{
          position:relative;min-height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/cad-gis-photogrammetry-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;background-size:cover;
          overflow:hidden;
        }
        @supports (height: 100svh) { .cg-hero { min-height: 100svh; } }
        @supports (height: 100dvh) { .cg-hero { min-height: 100dvh; } }
        @media(max-width:960px){
          .cg-hero{
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/services/cad-gis-photogrammetry-hero-banner.jpg') center center / cover no-repeat;
          }
        }

        .cg-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;
          max-width:1280px;margin:0 auto;width:100%;
          padding:5rem 1.5rem 1.5rem;
          padding-top:max(5rem, calc(env(safe-area-inset-top) + 4rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .cg-hero__inner{ padding:3.25rem 1.25rem 1rem; padding-top:max(3.25rem, calc(env(safe-area-inset-top) + 2.5rem)); } }
        @media(max-width:640px){ .cg-hero__inner{ padding:2.75rem 1rem .75rem; padding-top:max(2.75rem, calc(env(safe-area-inset-top) + 2.25rem)); } }
        @media(max-width:380px){ .cg-hero__inner{ padding:2.5rem .85rem .65rem; padding-top:max(2.5rem, calc(env(safe-area-inset-top) + 2rem)); } }
        @media(max-width:640px){ .cg-hero__actions{ margin-bottom:.5rem; } }
        @media(max-height:520px){
          .cg-hero__inner{ padding-top:1.75rem; padding-bottom:.5rem; }
          .cg-hero__eyebrow{ margin-bottom:.85rem; }
          .cg-hero__h1{ margin-bottom:.6rem; font-size:clamp(1.3rem,4vh,2.2rem); }
          .cg-hero__rule{ margin-bottom:.65rem; }
          .cg-hero__sub{ margin-bottom:.9rem; }
          .cg-hero__actions{ margin-bottom:.25rem; }
        }

        .cg-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .cg-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.2;pointer-events:none;}
        .cg-corner--tl{top:28px;left:28px;border-top:1px solid var(--cg-blue);border-left:1px solid var(--cg-blue);}
        .cg-corner--tr{top:28px;right:28px;border-top:1px solid var(--cg-blue);border-right:1px solid var(--cg-blue);}
        .cg-corner--bl{bottom:120px;left:264px;border-bottom:1px solid var(--cg-blue);border-left:1px solid var(--cg-blue);}
        @media(max-width:480px){ .cg-corner--bl{ left:28px; } }
        .cg-corner--br{bottom:72px;right:28px;border-bottom:1px solid var(--cg-blue);border-right:1px solid var(--cg-blue);}

        .cg-hero__content{animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes cgFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.cg-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .cg-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--cg-orange);border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.08);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .cg-breadcrumb{position:relative;z-index:2;padding:1.6rem 0 0;}
        .cg-breadcrumb ol{display:flex;flex-wrap:wrap;align-items:center;list-style:none;margin:0;padding:0;gap:6px;font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.02em;}
        .cg-breadcrumb li{display:flex;align-items:center;gap:6px;}
        .cg-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s ease;}
        .cg-breadcrumb a:hover{color:var(--cg-orange);}
        .cg-breadcrumb a[aria-current="page"]{color:rgba(255,255,255,.85);pointer-events:none;}
        .cg-breadcrumb__sep{color:rgba(255,255,255,.25);}
        @media(max-width:640px){.cg-breadcrumb{padding-top:1.1rem;}}
        .cg-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--cg-orange);animation:cgPulse 2s ease-in-out infinite;}
        @keyframes cgPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .cg-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3.4vw,2.7rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .cg-hero__h1 em{font-style:normal;color:var(--cg-blue);}
        .cg-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--cg-blue),transparent);margin:0 0 1.4rem;animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.cg-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--cg-blue),transparent);}}
        .cg-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.cg-hero__sub{margin:0 auto 2.6rem;}}

        .cg-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:cgFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.cg-hero__actions{justify-content:center;}}
        .cg-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#080808;background:linear-gradient(135deg,#6a8bff,var(--cg-blue));padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;cursor:pointer;border:none;}
        .cg-hero__cta:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .cg-hero__cta--ghost{color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);padding:13px 28px;box-shadow:none;gap:8px;}
        .cg-hero__cta--ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);box-shadow:none;transform:none;}

        .cg-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.72) 30%, rgba(8,8,8,.92) 100%);
          padding-top:1.75rem;
          margin-top:.25rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .cg-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .cg-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:cgScroll 34s linear infinite;}
        .cg-hero__ticker-bar:hover .cg-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .cg-ticker__track{ animation-duration:22s; } }
        @keyframes cgScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .cg-ticker__item{display:flex;align-items:center;gap:.4rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .cg-ticker__item b{color:rgba(255,255,255,.45);}
        .cg-ticker__pass{color:var(--cg-green);}
        @media(max-height:520px){
          .cg-hero__ticker-bar{ padding-top:.75rem; }
        }

        /* ══ STICKY MOBILE CTA ══════════════════════════════════════════ */
        .cg-sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:60;display:none;padding:.85rem 1rem;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-top:1px solid var(--cg-line);}
        @media(max-width:760px){.cg-sticky-cta{display:flex;justify-content:center;}}
        .cg-sticky-cta__btn{width:100%;max-width:420px;text-align:center;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:#fff;background:var(--cg-ink);padding:13px 20px;border-radius:10px;text-decoration:none;border:none;cursor:pointer;}

        /* ══ INTRO ═════════════════════════════════════════════════════ */
        .cg-intro{background:var(--cg-surface);border-bottom:1px solid var(--cg-line);padding:5.5rem 1.5rem;}
        .cg-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .cg-intro__p{font-family:'Inter',sans-serif;font-size:1rem;font-weight:300;line-height:1.85;color:var(--cg-muted);max-width:700px;margin:0 auto .9rem;}
        .cg-intro__p strong{color:var(--cg-ink);font-weight:500;}

        /* ══ WHAT WE DELIVER ═══════════════════════════════════════════ */
        .cg-del{background:var(--cg-paper);padding:4.5rem 1.5rem;border-bottom:1px solid var(--cg-line);}
        .cg-del__inner{max-width:1180px;margin:0 auto;}
        .cg-del__grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-top:2.5rem;}
        @media(max-width:960px){.cg-del__grid{grid-template-columns:repeat(3,1fr);}}
        @media(max-width:600px){.cg-del__grid{grid-template-columns:repeat(2,1fr);}}
        .cg-del__card{background:var(--cg-surface);border:1px solid var(--cg-line);border-radius:14px;padding:1.4rem 1rem;text-align:center;transition:border-color .2s ease,transform .2s ease;}
        .cg-del__card:hover{border-color:var(--cg-blue);transform:translateY(-2px);}
        .cg-del__icon{width:38px;height:38px;margin:0 auto .8rem;border-radius:10px;background:rgba(46,92,255,.08);color:var(--cg-blue);display:flex;align-items:center;justify-content:center;font-size:.95rem;}
        .cg-del__label{font-family:'Inter',sans-serif;font-size:.82rem;font-weight:500;color:var(--cg-ink);line-height:1.4;}

        /* ══ SERVICE CLUSTERS ══════════════════════════════════════════ */
        .cg-cluster{padding:4.5rem 1.5rem;border-bottom:1px solid var(--cg-line);}
        .cg-cluster:nth-child(even){background:var(--cg-surface);}
        .cg-cluster__inner{max-width:1180px;margin:0 auto;}
        .cg-cluster__head{max-width:640px;margin-bottom:2.5rem;}
        .cg-cluster__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--cg-blue);letter-spacing:.04em;display:block;margin-bottom:.7rem;}
        .cg-cluster__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.4rem,2.6vw,1.9rem);font-weight:700;line-height:1.25;color:var(--cg-ink);margin:0 0 .6rem;}
        .cg-cluster__h2 em{font-style:normal;color:var(--cg-blue);}
        .cg-cluster__intro{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.7;color:var(--cg-muted);margin:0;}
        .cg-cluster__grid{display:grid;gap:1.25rem;}
        .cg-cluster__grid--2{grid-template-columns:repeat(2,1fr);}
        @media(max-width:860px){.cg-cluster__grid--2{grid-template-columns:1fr;}}

        .cg-card{background:var(--cg-surface);border:1px solid var(--cg-line);border-radius:16px;padding:1.9rem 1.9rem 2rem;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;scroll-margin-top:6rem;}
        .cg-cluster:nth-child(even) .cg-card{background:var(--cg-paper);}
        .cg-card:hover{border-color:var(--cg-blue);transform:translateY(-3px);box-shadow:0 20px 40px -24px rgba(18,20,26,.25);}
        .cg-card__icon{width:42px;height:42px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--cg-blue);display:flex;align-items:center;justify-content:center;font-size:1.05rem;margin-bottom:1.1rem;}
        .cg-card__title{font-family:'Space Grotesk',sans-serif;font-size:1.05rem;font-weight:600;color:var(--cg-ink);margin:0 0 .7rem;}
        .cg-card__desc{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--cg-muted);margin:0 0 .8rem;}
        .cg-card__highlight{font-family:'Inter',sans-serif;font-size:.84rem;font-weight:400;line-height:1.7;color:var(--cg-ink);border-left:2px solid var(--cg-blue);padding-left:.9rem;margin:0 0 1.2rem;}
        .cg-card__bullets{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;}
        .cg-card__bullets li{font-family:'Inter',sans-serif;font-size:.81rem;color:var(--cg-ink);display:flex;align-items:flex-start;gap:.55rem;}
        .cg-card__bullets li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--cg-blue);margin-top:.5rem;flex-shrink:0;}

        /* ══ TOOLING / SOFTWARE GUIDANCE ═══════════════════════════════ */
        .cg-tech{background:var(--cg-paper);padding:5.5rem 1.5rem;border-bottom:1px solid var(--cg-line);}
        .cg-tech__inner{max-width:1000px;margin:0 auto;}
        .cg-tech__head{max-width:680px;margin:0 auto 1.4rem;text-align:center;}
        .cg-tech__note{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--cg-muted);max-width:680px;margin:0 auto 2.8rem;text-align:center;}
        .cg-tech__note strong{color:var(--cg-ink);font-weight:500;}
        .cg-tech__list{display:flex;flex-direction:column;gap:1px;background:var(--cg-line);border:1px solid var(--cg-line);border-radius:16px;overflow:hidden;}
        .cg-tech__row{background:var(--cg-surface);padding:1.5rem 1.75rem;display:grid;grid-template-columns:280px 1fr;gap:1.5rem;align-items:start;}
        @media(max-width:700px){.cg-tech__row{grid-template-columns:1fr;gap:.4rem;padding:1.25rem 1.4rem;}}
        .cg-tech__name{font-family:'Space Grotesk',sans-serif;font-size:.98rem;font-weight:600;color:var(--cg-ink);}
        .cg-tech__best{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--cg-muted);}

        /* ══ PROJECT WORKFLOW ═════════════════════════════════════════ */
        .cg-flow{background:var(--cg-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--cg-line);}
        .cg-flow__inner{max-width:1000px;margin:0 auto;}
        .cg-flow__head{max-width:640px;margin:0 auto 3rem;text-align:center;}
        .cg-flow__list{display:flex;flex-direction:column;}
        .cg-flow__step{display:grid;grid-template-columns:64px 1fr;gap:1.4rem;padding:1.4rem 0;border-bottom:1px solid var(--cg-line);}
        .cg-flow__step:last-child{border-bottom:none;}
        .cg-flow__n{font-family:'IBM Plex Mono',monospace;font-size:1.1rem;font-weight:500;color:var(--cg-blue);}
        .cg-flow__title{font-family:'Space Grotesk',sans-serif;font-size:.98rem;font-weight:600;color:var(--cg-ink);margin:0 0 .4rem;}
        .cg-flow__desc{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;line-height:1.75;color:var(--cg-muted);margin:0;}

        /* ══ INDUSTRIES / USE CASES ════════════════════════════════════ */
        .cg-ind{background:var(--cg-paper);padding:5.5rem 1.5rem;}
        .cg-ind__inner{max-width:1200px;margin:0 auto;}
        .cg-ind__head{max-width:640px;margin:0 auto 1rem;text-align:center;}
        .cg-ind__note{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;color:var(--cg-muted);text-align:center;max-width:600px;margin:0 auto 2.8rem;}
        .cg-ind__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:900px){.cg-ind__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:560px){.cg-ind__grid{grid-template-columns:1fr;}}
        .cg-ind__card{background:var(--cg-surface);border:1px solid var(--cg-line);border-radius:16px;padding:1.6rem 1.6rem;transition:border-color .2s ease,transform .2s ease;}
        .cg-ind__card:hover{border-color:var(--cg-blue);transform:translateY(-3px);}
        .cg-ind__icon{width:38px;height:38px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--cg-blue);display:flex;align-items:center;justify-content:center;font-size:.9rem;margin-bottom:.9rem;}
        .cg-ind__name{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;color:var(--cg-ink);margin:0 0 .5rem;}
        .cg-ind__desc{font-family:'Inter',sans-serif;font-size:.82rem;font-weight:300;line-height:1.7;color:var(--cg-muted);margin:0;}

        /* ══ BENEFITS ═══════════════════════════════════════════════════ */
        .cg-benefits{background:var(--cg-surface);padding:5.5rem 1.5rem;border-bottom:1px solid var(--cg-line);}
        .cg-benefits__inner{max-width:1200px;margin:0 auto;}
        .cg-benefits__head{max-width:560px;margin:0 auto 3rem;text-align:center;}
        .cg-benefits__label{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--cg-blue);letter-spacing:.04em;display:block;margin-bottom:.8rem;}
        .cg-benefits__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;line-height:1.22;color:var(--cg-ink);margin:0 0 .8rem;}
        .cg-benefits__h2 em{font-style:normal;color:var(--cg-blue);}
        .cg-benefits__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.75;color:var(--cg-muted);max-width:520px;margin:0 auto;}
        .cg-benefits__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        @media(max-width:1024px){.cg-benefits__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.cg-benefits__grid{grid-template-columns:1fr;}}
        .cg-benefit-card{background:var(--cg-paper);border:1px solid var(--cg-line);border-radius:16px;padding:1.8rem 1.7rem;transition:border-color .2s ease,transform .2s ease;}
        .cg-benefit-card:hover{border-color:var(--cg-blue);transform:translateY(-3px);}
        .cg-benefit-card__icon{width:40px;height:40px;border-radius:10px;background:rgba(46,92,255,.08);color:var(--cg-blue);display:flex;align-items:center;justify-content:center;font-size:1rem;margin-bottom:1.1rem;}
        .cg-benefit-card__title{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:600;color:var(--cg-ink);margin-bottom:.5rem;}
        .cg-benefit-card__desc{font-family:'Inter',sans-serif;font-size:.85rem;font-weight:300;line-height:1.75;color:var(--cg-muted);}

        /* ══ FAQ — native details/summary ══════════════════════════════ */
        .cg-faq{background:var(--cg-paper);padding:5.5rem 1.5rem;border-top:1px solid var(--cg-line);}
        .cg-faq__inner{max-width:800px;margin:0 auto;}
        .cg-faq__header{text-align:center;margin-bottom:3rem;}
        .cg-faq__list{display:flex;flex-direction:column;gap:0;border:1px solid var(--cg-line);border-radius:16px;overflow:hidden;}
        .cg-faq__item{border-bottom:1px solid var(--cg-line);background:var(--cg-surface);transition:background .2s ease;}
        .cg-faq__item:last-child{border-bottom:none;}
        .cg-faq__item[open]{background:#fff;}
        .cg-faq__q{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 1.75rem;cursor:pointer;user-select:none;}
        .cg-faq__q::-webkit-details-marker{display:none;}.cg-faq__q::marker{display:none;}
        .cg-faq__q-text{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:600;color:var(--cg-ink);line-height:1.35;flex:1;transition:color .2s ease;}
        .cg-faq__item[open] .cg-faq__q-text,.cg-faq__q:hover .cg-faq__q-text{color:var(--cg-blue);}
        .cg-faq__chevron{flex-shrink:0;color:var(--cg-blue);opacity:.8;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .2s ease;}
        .cg-faq__item[open] .cg-faq__chevron{transform:rotate(180deg);opacity:1;}
        .cg-faq__a{padding:0 1.75rem 1.5rem;animation:cgFaqOpen .3s cubic-bezier(.22,1,.36,1) both;}
        @keyframes cgFaqOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .cg-faq__a p{font-family:'Inter',sans-serif;font-size:.88rem;font-weight:300;line-height:1.8;color:var(--cg-muted);margin:0;}

        /* ══ RELATED SERVICES & READING (internal linking) ═════════════ */
        .cg-related{background:var(--cg-surface);padding:5rem 1.5rem;border-top:1px solid var(--cg-line);}
        .cg-related__inner{max-width:1100px;margin:0 auto;}
        .cg-related__head{max-width:600px;margin:0 auto 2.5rem;text-align:center;}
        .cg-related__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.1rem;}
        @media(max-width:900px){.cg-related__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:520px){.cg-related__grid{grid-template-columns:1fr;}}
        .cg-related__card{display:block;background:var(--cg-paper);border:1px solid var(--cg-line);border-radius:14px;padding:1.4rem 1.3rem;text-decoration:none;transition:border-color .2s ease,transform .2s ease;}
        .cg-related__card:hover{border-color:var(--cg-blue);transform:translateY(-2px);}
        .cg-related__title{font-family:'Space Grotesk',sans-serif;font-size:.92rem;font-weight:600;color:var(--cg-ink);margin:0 0 .45rem;}
        .cg-related__desc{font-family:'Inter',sans-serif;font-size:.78rem;font-weight:300;line-height:1.6;color:var(--cg-muted);margin:0;}

        /* ══ CTA ═══════════════════════════════════════════════════════ */
        .cg-cta{background:var(--cg-paper);border-top:1px solid var(--cg-line);padding:5.5rem 1.5rem;text-align:center;}
        .cg-cta__inner{max-width:600px;margin:0 auto;}
        .cg-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;color:var(--cg-blue);letter-spacing:.04em;display:block;margin-bottom:1rem;}
        .cg-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:700;line-height:1.2;color:var(--cg-ink);margin:0 0 1rem;}
        .cg-cta__h2 em{font-style:normal;color:var(--cg-blue);}
        .cg-cta__sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;line-height:1.8;color:var(--cg-muted);margin-bottom:2.2rem;}
        .cg-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--cg-ink);padding:14px 30px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;border:none;cursor:pointer;}
        .cg-cta__btn:hover{background:var(--cg-blue);transform:translateY(-2px);}

        @media(max-width:600px){.cg-faq__q{padding:1.25rem;}.cg-faq__a{padding:0 1.25rem 1.25rem;}}
        @media(prefers-reduced-motion:reduce){
          .cg-page *,.cg-page *::before,.cg-page *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
        }
      `}</style>

      <Header />

      <div className="cg-page">
        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="cg-hero" aria-labelledby="cg-hero-heading">
          <div aria-hidden="true">
            <div className="cg-hero__grain" />
          </div>
          <div className="cg-corner cg-corner--tl" aria-hidden="true" />
          <div className="cg-corner cg-corner--tr" aria-hidden="true" />
          <div className="cg-corner cg-corner--bl" aria-hidden="true" />
          <div className="cg-corner cg-corner--br" aria-hidden="true" />

          <nav className="cg-breadcrumb" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="cg-breadcrumb__sep" aria-hidden="true">/</li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <Link href="/services" itemProp="item"><span itemProp="name">Services</span></Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="cg-breadcrumb__sep" aria-hidden="true">/</li>
              <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                <Link href={PAGE_PATH} itemProp="item" aria-current="page">
                  <span itemProp="name">CAD, GIS &amp; Photogrammetry</span>
                </Link>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="cg-hero__inner">
            <div className="cg-hero__content">
              <div className="cg-hero__eyebrow">
                <span className="cg-hero__dot" />
                Services · CAD, GIS &amp; Photogrammetry
              </div>
              <h1 className="cg-hero__h1" id="cg-hero-heading">
                Precision mapping,<br />measured in <em>millimeters</em>
              </h1>
              <div className="cg-hero__rule" aria-hidden="true" />
              <p className="cg-hero__sub">
                CAD drafting, GIS mapping, drone photogrammetry, LiDAR point cloud
                processing, and spatial analysis — precision geospatial engineering
                for infrastructure, engineering, and land development worldwide.
              </p>

              <div className="cg-hero__actions">
                <ConsultationCTA className="cg-hero__cta" ariaLabel="Talk to a geospatial specialist at 99 Visual Solutions" postTitle="CAD, GIS & Photogrammetry" postUrl={PAGE_PATH}>
                  Talk to a Geospatial Specialist
                </ConsultationCTA>
                <a href="#cg-services" className="cg-hero__cta cg-hero__cta--ghost" aria-label="Explore CAD, GIS and photogrammetry services">
                  Explore Services
                </a>
              </div>
            </div>
          </div>

          <div className="cg-hero__ticker-bar" aria-hidden="true">
            <div className="cg-ticker">
              <div className="cg-ticker__track">
                {[...pipeline, ...pipeline].map((p, i) => (
                  <span className="cg-ticker__item" key={i}>
                    <b>$</b> {p.cmd} <span className="cg-ticker__pass">→ {p.out} ✓</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ INTRO ═════════════════════════════════════════════════════════ */}
        <section className="cg-intro" aria-labelledby="cg-intro-heading">
          <div className="cg-intro__inner">
            <span className="cg-label">Our Approach</span>
            <h2 className="cg-h2" id="cg-intro-heading">
              Geospatial engineering, not just<br />
              <em>mapping</em> and drafting
            </h2>
            <p className="cg-intro__p">
              At <strong>99 Visual Solutions</strong>, CAD, GIS, LiDAR and photogrammetry aren&apos;t
              treated as separate disciplines handed off between teams — they&apos;re one workflow.
              Data captured from drones, LiDAR sensors, or ground survey is processed, classified,
              and structured into the <strong>CAD drawings and GIS datasets</strong> your project
              actually needs, in formats that load directly into your existing systems.
            </p>
            <p className="cg-intro__p">
              Whether the deliverable is a design-ready CAD file, a structured GIS database, or a
              classified LiDAR point cloud, we confirm <strong>accuracy requirements, formats, and
              coordinate systems</strong> before work starts — so what you receive is ready to use,
              not raw data your team has to clean up first.
            </p>
          </div>
        </section>

        {/* ══ WHAT WE DELIVER ══════════════════════════════════════════════ */}
        <section className="cg-del" aria-labelledby="cg-del-heading">
          <div className="cg-del__inner">
            <span className="cg-label">What We Deliver</span>
            <h2 className="cg-h2" id="cg-del-heading">
              Real deliverables, in <em>your format</em>
            </h2>
            <div className="cg-del__grid">
              {deliverables.map((d) => (
                <div className="cg-del__card" key={d.label}>
                  <div className="cg-del__icon" aria-hidden="true">{d.icon}</div>
                  <div className="cg-del__label">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICE CLUSTERS ═════════════════════════════════════════════ */}
        <div id="cg-services">
          {clusters.map((cluster) => (
            <section key={cluster.id} className="cg-cluster" aria-labelledby={`cg-cluster-h-${cluster.id}`}>
              <div className="cg-cluster__inner">
                <div className="cg-cluster__head">
                  <span className="cg-cluster__eyebrow">{cluster.eyebrow}</span>
                  <h2 className="cg-cluster__h2" id={`cg-cluster-h-${cluster.id}`}>{cluster.heading}</h2>
                  <p className="cg-cluster__intro">{cluster.intro}</p>
                </div>
                <div className={`cg-cluster__grid cg-cluster__grid--${cluster.cols}`}>
                  {cluster.ids.map((id) => {
                    const svc = serviceById(id);
                    return (
                      <article className="cg-card" id={svc.id} key={svc.id} aria-labelledby={`cg-svc-heading-${svc.id}`}>
                        <div className="cg-card__icon" aria-hidden="true">{svc.icon}</div>
                        <h3 className="cg-card__title" id={`cg-svc-heading-${svc.id}`}>{svc.title}</h3>
                        <p className="cg-card__desc">{svc.description}</p>
                        <p className="cg-card__highlight">{svc.highlight}</p>
                        <ul className="cg-card__bullets">
                          {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* ══ TOOLING / SOFTWARE GUIDANCE ══════════════════════════════════ */}
        <section className="cg-tech" aria-labelledby="cg-tech-heading">
          <div className="cg-tech__inner">
            <div className="cg-tech__head">
              <span className="cg-label">Software &amp; Tooling</span>
              <h2 className="cg-h2" id="cg-tech-heading">
                The right tool for <em>the deliverable</em>
              </h2>
            </div>
            <p className="cg-tech__note">
              Which software matters depends on what you need out the other end — a design-ready
              drawing, an analyzable dataset, or a classified point cloud each call for a different
              part of the stack. <strong>Here&apos;s how we think about it.</strong>
            </p>
            <div className="cg-tech__list">
              {toolStack.map((t) => (
                <div className="cg-tech__row" key={t.name}>
                  <div className="cg-tech__name">{t.name}</div>
                  <div className="cg-tech__best">{t.bestFor}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROJECT WORKFLOW ═════════════════════════════════════════════ */}
        <section className="cg-flow" aria-labelledby="cg-flow-heading">
          <div className="cg-flow__inner">
            <div className="cg-flow__head">
              <span className="cg-label">How We Work</span>
              <h2 className="cg-h2" id="cg-flow-heading">
                The geospatial project <em>workflow</em>
              </h2>
            </div>
            <div className="cg-flow__list">
              {workflow.map((step) => (
                <div className="cg-flow__step" key={step.n}>
                  <div className="cg-flow__n">{step.n}</div>
                  <div>
                    <h3 className="cg-flow__title">{step.title}</h3>
                    <p className="cg-flow__desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ INDUSTRIES / USE CASES ══════════════════════════════════════════ */}
        <section className="cg-ind" aria-labelledby="cg-ind-heading">
          <div className="cg-ind__inner">
            <div className="cg-ind__head">
              <span className="cg-label">Industries</span>
              <h2 className="cg-h2" id="cg-ind-heading">
                Mapping scenarios we can <em>support</em>
              </h2>
            </div>
            <p className="cg-ind__note">
              These reflect the kinds of mapping and modeling challenges each sector typically
              presents — not a claim of prior client work in every sector listed.
            </p>
            <div className="cg-ind__grid">
              {industries.map((ind) => (
                <div className="cg-ind__card" key={ind.name}>
                  <div className="cg-ind__icon" aria-hidden="true">{ind.icon}</div>
                  <h3 className="cg-ind__name">{ind.name}</h3>
                  <p className="cg-ind__desc">{ind.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BENEFITS ═════════════════════════════════════════════════════ */}
        <section className="cg-benefits" aria-labelledby="cg-benefits-heading">
          <div className="cg-benefits__inner">
            <div className="cg-benefits__head">
              <span className="cg-benefits__label">Why Choose Us?</span>
              <h2 className="cg-benefits__h2" id="cg-benefits-heading">
                CAD and GIS that fit <em>your workflow</em>
              </h2>
              <p className="cg-benefits__sub">
                Partnering with 99 Visual Solutions gives your team geospatial and CAD engineering
                expertise that plugs directly into the systems and formats you already use.
              </p>
            </div>
            <div className="cg-benefits__grid">
              {benefits.map((b, i) => (
                <div className="cg-benefit-card" key={i}>
                  <div className="cg-benefit-card__icon" aria-hidden="true">{b.icon}</div>
                  <div className="cg-benefit-card__title">{b.title}</div>
                  <p className="cg-benefit-card__desc">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQPage structured data is handled exclusively via JSON-LD in the
            <script> tag above (cgFaqNode); no microdata attributes here. */}
        <section id="cg-faq" className="cg-faq" aria-labelledby="cg-faq-heading">
          <div className="cg-faq__inner">
            <div className="cg-faq__header">
              <span className="cg-label">Got Questions?</span>
              <h2 className="cg-h2" id="cg-faq-heading">Frequently Asked Questions</h2>
            </div>
            <dl className="cg-faq__list">
              {FAQ_ITEMS.map(({ question, answer }, i) => (
                <details key={i} className="cg-faq__item">
                  <summary className="cg-faq__q">
                    <span className="cg-faq__q-text">{question}</span>
                    <span className="cg-faq__chevron" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="cg-faq__a">
                    <p>{answer}</p>
                  </div>
                </details>
              ))}
            </dl>
          </div>
        </section>

        {/* ══ RELATED SERVICES & READING — internal linking ═══════════════════ */}
        <section className="cg-related" aria-labelledby="cg-related-heading">
          <div className="cg-related__inner">
            <div className="cg-related__head">
              <span className="cg-label">Keep Exploring</span>
              <h2 className="cg-h2" id="cg-related-heading">Related services &amp; reading</h2>
            </div>
            <div className="cg-related__grid">
              <Link href="/services/visualization" className="cg-related__card">
                <div className="cg-related__title">3D Visualization</div>
                <p className="cg-related__desc">Turn processed CAD, GIS and point cloud data into 3D visualizations and digital twins.</p>
              </Link>
              <Link href="/services/it-consulting" className="cg-related__card">
                <div className="cg-related__title">IT Consulting</div>
                <p className="cg-related__desc">Infrastructure and systems guidance for teams managing large geospatial datasets.</p>
              </Link>
              <Link href="/services/website-development" className="cg-related__card">
                <div className="cg-related__title">Web Development</div>
                <p className="cg-related__desc">Web-based GIS dashboards and mapping portals built to serve your processed data.</p>
              </Link>
              <Link href="/insights" className="cg-related__card">
                <div className="cg-related__title">Insights</div>
                <p className="cg-related__desc">Engineering articles on CAD, GIS, LiDAR and photogrammetry from the 99 Visual team.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
        <section className="cg-cta" aria-labelledby="cg-cta-heading">
          <div className="cg-cta__inner">
            <span className="cg-cta__eyebrow">Start a Project</span>
            <h2 className="cg-cta__h2" id="cg-cta-heading">
              Ready to start your <em>mapping project</em>?
            </h2>
            <p className="cg-cta__sub">
              Book a short call with a geospatial specialist. We&apos;ll review your project area,
              required accuracy, and deliverable formats, and outline a practical data capture and
              processing plan for your team — no obligation.
            </p>
            <ConsultationCTA className="cg-cta__btn" ariaLabel="Request a CAD, GIS and photogrammetry consultation from 99 Visual Solutions" postTitle="CAD, GIS & Photogrammetry" postUrl={PAGE_PATH}>
              Request a Project Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ConsultationCTA>
          </div>
        </section>

        {/* ══ STICKY MOBILE CTA ═════════════════════════════════════════════ */}
        <div className="cg-sticky-cta">
          <ConsultationCTA className="cg-sticky-cta__btn" postTitle="CAD, GIS & Photogrammetry" postUrl={PAGE_PATH}>Talk to a Specialist</ConsultationCTA>
        </div>
      </div>

      <Footer />
      <ScrollDown />

    </>
  );
}
