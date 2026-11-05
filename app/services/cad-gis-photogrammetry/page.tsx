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
import RelatedInsights from '@/app/components/RelatedInsights';
import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import Link from "next/link";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import { ServiceHero, ServiceIntro, ServiceCluster, FeatureGrid, ProcessList, FaqList, ServiceCTA, StickyCTA, RelatedLinks, IconLabelGrid } from "@/app/components/premium/service/ServiceBlocks";

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
  jsonLdString,
} from "@/lib/schema";

const BASE_SAFE = BASE.replace(/\/$/, "");
const PAGE_PATH = "/services/cad-gis-photogrammetry";
const PAGE_URL  = `${BASE_SAFE}${PAGE_PATH}`;

// Re-render at most hourly so newly published related articles appear
// without a redeploy (see RelatedInsights).
export const revalidate = 3600;

export const metadata: Metadata = {
  // Brand suffix is appended by the root layout's title template.
  title: "CAD, GIS, LiDAR & Photogrammetry Services",

  description:
    "CAD drafting, GIS mapping, drone photogrammetry, LiDAR point cloud processing and terrain modeling for infrastructure, engineering and construction projects.",

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

  authors:         [{ name: "99 Visual Solutions", url: BASE_SAFE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = PAGE_LAST_MODIFIED['/services/cad-gis-photogrammetry']; // shared with app/sitemap.ts — edit lib/page-dates.ts

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
    { "@type": "Country", name: "Australia" }, { "@type": "Country", name: "South Korea" }, { "@type": "Country", name: "Japan" },
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

export default function CADGISPhotogrammetry() {
  const T = "CAD, GIS & Photogrammetry";
  return (
    <>
      <script
        id="schema-cg-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(cgGraph) }}
      />
      <div className="vz">
        <Header />
        <main id="main">
          <ServiceHero
            id="cg-hero-heading"
            crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: PAGE_PATH, label: "CAD, GIS & Photogrammetry" }]}
            title="CAD, GIS, LiDAR & Photogrammetry Services"
            tagline={<>Precision mapping, measured in <em>millimeters</em></>}
            sub="CAD drafting, GIS mapping, drone photogrammetry, LiDAR point cloud processing, and spatial analysis — precision geospatial engineering for infrastructure, engineering, and land development worldwide."
            image="/images/services/cad-gis-photogrammetry-hero-banner.jpg"
            imageAlt="Geospatial mapping of an urban area with GIS and LiDAR data"
            ctaLabel="Talk to a Geospatial Specialist"
            ctaAria="Talk to a geospatial specialist at 99 Visual Solutions"
            postTitle={T}
            postUrl={PAGE_PATH}
            secondary={{ href: "#cg-services", label: "Explore Services" }}
            points={["CAD drafting", "GIS mapping", "LiDAR point clouds", "Drone photogrammetry", "Spatial analysis"]}
          />

          <ServiceIntro
            id="cg-intro-heading"
            eyebrow="Our Approach"
            title={<>Geospatial engineering, not just <em>mapping</em> and drafting</>}
            aside={
              <p className="vz-small">
                Further reading:{" "}
                <Link className="vz-prose-link" href="/insights/gis-mapping-vs-traditional-surveying-which-is-better">
                  GIS mapping vs traditional surveying
                </Link>
              </p>
            }
          >
            <p className="vz-lead">
              At <strong>99 Visual Solutions</strong>, CAD, GIS, LiDAR and photogrammetry aren&apos;t treated as separate disciplines handed off between teams — they&apos;re one workflow. Data captured from drones, LiDAR sensors, or ground survey is processed, classified, and structured into the <strong>CAD drawings and GIS datasets</strong> your project actually needs, in formats that load directly into your existing systems.
            </p>
            <p>
              Whether the deliverable is a design-ready CAD file, a structured GIS database, or a classified LiDAR point cloud, we confirm <strong>accuracy requirements, formats, and coordinate systems</strong> before work starts — so what you receive is ready to use, not raw data your team has to clean up first.
            </p>
          </ServiceIntro>

          <IconLabelGrid
            id="cg-del-heading"
            eyebrow="What We Deliver"
            title={<>Real deliverables, in <em>your format</em></>}
            items={deliverables.map((d) => ({ label: d.label, icon: d.icon }))}
            surface
          />

          <div id="cg-services">
            {clusters.map((cluster, ci) => (
              <ServiceCluster
                key={cluster.id}
                id={`cg-cluster-h-${cluster.id}`}
                eyebrow={cluster.eyebrow}
                title={cluster.heading}
                intro={cluster.intro}
                surface={ci % 2 === 1}
                columns={cluster.cols === 3 ? 3 : 2}
                items={cluster.ids.map((id) => {
                  const svc = serviceById(id);
                  return { id: svc.id, title: svc.title, description: svc.description, highlight: svc.highlight, bullets: svc.bullets, icon: svc.icon };
                })}
              />
            ))}
          </div>

          <FeatureGrid
            id="cg-tech-heading"
            eyebrow="Software & Tooling"
            title={<>The right tool for <em>the deliverable</em></>}
            lead="Which software matters depends on what you need out the other end — a design-ready drawing, an analyzable dataset, or a classified point cloud each call for a different part of the stack. Here's how we think about it."
            items={toolStack.map((t) => ({ title: t.name, description: t.bestFor }))}
            surface
          />

          <ProcessList
            id="cg-flow-heading"
            eyebrow="How We Work"
            title={<>The geospatial project <em>workflow</em></>}
            steps={workflow.map((w) => ({ title: w.title, description: w.desc }))}
          />

          <IconLabelGrid
            id="cg-ind-heading"
            eyebrow="Industries"
            title={<>Mapping scenarios we can <em>support</em></>}
            note="These reflect the kinds of mapping and modeling challenges each sector typically presents — not a claim of prior client work in every sector listed."
            items={industries.map((ind) => ({ label: ind.name, icon: ind.icon, description: ind.note }))}
            surface
          />

          <FeatureGrid
            id="cg-benefits-heading"
            eyebrow="Why Choose Us?"
            title={<>CAD and GIS that fit <em>your workflow</em></>}
            lead="Partnering with 99 Visual Solutions gives your team geospatial and CAD engineering expertise that plugs directly into the systems and formats you already use."
            items={benefits.map((b) => ({ title: b.title, description: b.description, icon: b.icon }))}
          />

          <div id="cg-faq">
            <FaqList
              id="cg-faq-heading"
              eyebrow="Got Questions?"
              title="Frequently Asked Questions"
              faqs={FAQ_ITEMS.map(({ question, answer }) => ({ q: question, a: <p>{answer}</p> }))}
              surface
            />
          </div>

          <RelatedLinks
            id="cg-related-heading"
            title={<>Related services &amp; <em>reading</em></>}
            links={[
              { href: "/services/visualization", label: "3D Visualization", description: "Turn processed CAD, GIS and point cloud data into 3D visualizations and digital twins." },
              { href: "/services/it-consulting", label: "IT Consulting", description: "Infrastructure and systems guidance for teams managing large geospatial datasets." },
              { href: "/services/website-development", label: "Web Development", description: "Web-based GIS dashboards and mapping portals built to serve your processed data." },
              { href: "/insights", label: "Insights", description: "Engineering articles on CAD, GIS, LiDAR and photogrammetry from the 99 Visual team." },
            ]}
          />

          <ServiceCTA
            id="cg-cta-heading"
            title={<>Ready to start your <em>mapping project</em>?</>}
            sub="Book a short call with a geospatial specialist. We'll review your project area, required accuracy, and deliverable formats, and outline a practical data capture and processing plan for your team — no obligation."
            ctaLabel="Request a Project Consultation"
            ctaAria="Request a CAD, GIS and photogrammetry consultation from 99 Visual Solutions"
            postTitle={T}
            postUrl={PAGE_PATH}
          />
          <RelatedInsights serviceHref="/services/cad-gis-photogrammetry" />
        </main>
        <Footer />
        <StickyCTA postTitle={T} postUrl={PAGE_PATH} label="Talk to a Specialist" />
      </div>
    </>
  );
}
