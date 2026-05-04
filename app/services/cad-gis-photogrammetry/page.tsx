import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ScrollDown from "@/app/components/scrolldown";
import Chatbot from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";
import PageLoader from "@/app/components/PageLoader";

import {
  FaDraftingCompass,
  FaMapMarkedAlt,
  FaCubes,
  FaSatellite,
  FaLayerGroup,
  FaProjectDiagram,
} from "react-icons/fa";

import type { Metadata } from "next";

import { BASE, breadcrumb, webPage, faqSchema } from "@/lib/schema";

/* =====================================================
   SEO METADATA
===================================================== */

export const metadata: Metadata = {
  title:
    "CAD, GIS & Photogrammetry Services | LiDAR, 3D Mapping, Spatial Analysis & Geospatial Solutions - 99 Visual Solutions",
  description:
    "99 Visual Solutions delivers precision-driven CAD drafting, GIS mapping, photogrammetry, LiDAR data processing, spatial analysis, 3D modeling, and end-to-end geospatial solutions. Trusted by infrastructure, engineering, construction, urban planning, and government projects worldwide.",
  keywords: [
    "CAD Drafting Services",
    "Engineering CAD Services",
    "2D CAD Drafting Services",
    "3D CAD Modeling Services",
    "CAD Design and Drafting",
    "Architectural CAD Services",
    "Infrastructure CAD Services",
    "GIS Mapping Services",
    "GIS Data Management Services",
    "Geographic Information System Services",
    "Spatial Analysis Services",
    "Geospatial Data Solutions",
    "GIS Consulting Services",
    "Urban GIS Planning Services",
    "GIS for Infrastructure Projects",
    "Photogrammetry Services",
    "Drone Photogrammetry Services",
    "Aerial Photogrammetry Services",
    "3D Photogrammetry Modeling",
    "Orthomosaic Mapping Services",
    "LiDAR Data Processing Services",
    "LiDAR Point Cloud Processing",
    "LiDAR 3D Mapping Services",
    "Digital Terrain Model Services",
    "Digital Surface Model Services",
    "Airborne LiDAR Services",
    "3D Mapping Services",
    "Topographic Mapping Services",
    "Survey Mapping Services",
    "Remote Sensing Services",
    "Satellite Mapping Services",
    "Land Mapping Services",
    "Geospatial Solutions for Infrastructure",
    "Geospatial Solutions for Construction",
    "Geospatial Solutions for Urban Planning",
    "Geospatial Solutions for Environmental Analysis",
    "Engineering Mapping Services",
    "Asset Management GIS Solutions",
    "99 Visual Solutions",
    "99 Visual Geospatial Services",
    "99 Visual CAD GIS",
  ],
  metadataBase: new URL(BASE),
  alternates: { canonical: `${BASE}/services/cad-gis-photogrammetry` },
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
    title:
      "CAD, GIS & Photogrammetry Services | LiDAR, 3D Mapping & Geospatial Solutions - 99 Visual Solutions",
    description:
      "From CAD drafting and GIS mapping to LiDAR processing, photogrammetry, spatial analysis, and 3D modeling — 99 Visual Solutions delivers precision geospatial services for infrastructure, engineering, urban planning, and environmental projects worldwide.",
    url: `${BASE}/services/cad-gis-photogrammetry`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url: `${BASE}/images/services/cad-gis-og.jpg`,
        width: 1200,
        height: 630,
        alt: "CAD, GIS & Photogrammetry Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "CAD, GIS & Photogrammetry Services | LiDAR, 3D Mapping & Geospatial Solutions - 99 Visual Solutions",
    description:
      "CAD drafting, GIS mapping, LiDAR processing, photogrammetry, spatial analysis & 3D modeling — precision geospatial solutions by 99 Visual Solutions for projects worldwide.",
    site: "@99VisualSoluti1",
    creator: "@99VisualSoluti1",
    images: [`${BASE}/images/services/cad-gis-og.jpg`],
  },
};

/* =====================================================
   JSON-LD SCHEMA DATA
===================================================== */

const cadGisBreadcrumb = breadcrumb([
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "CAD, GIS & Photogrammetry", url: "/services/cad-gis-photogrammetry" },
]);

const cadGisWebPage = webPage({
  url: "/services/cad-gis-photogrammetry",
  name: "CAD, GIS & Photogrammetry Services | LiDAR, 3D Mapping & Geospatial Solutions — 99 Visual Solutions",
  description:
    "Precision-driven CAD drafting, GIS mapping, photogrammetry, LiDAR data processing, spatial analysis, and 3D modeling for infrastructure, engineering, construction, urban planning, and government projects worldwide.",
});

const cadGisFaq = faqSchema([
  {
    question: "What CAD drafting services does 99 Visual Solutions provide?",
    answer:
      "We offer 2D CAD drafting, 3D CAD modeling, engineering design support, and architectural CAD services for infrastructure, construction, and industrial projects.",
  },
  {
    question: "What GIS services does 99 Visual Solutions offer?",
    answer:
      "Our GIS services include geospatial data management, spatial analysis, urban planning mapping, asset management GIS, and custom GIS solutions for infrastructure and environmental projects.",
  },
  {
    question: "Does 99 Visual Solutions process LiDAR data?",
    answer:
      "Yes. We specialize in LiDAR point cloud processing, digital terrain model (DTM) generation, digital surface model (DSM) creation, and 3D mapping from airborne and terrestrial LiDAR data.",
  },
  {
    question: "What photogrammetry services are available?",
    answer:
      "We provide drone and aerial photogrammetry, orthomosaic mapping, 3D photogrammetric modeling, and survey-grade mapping for construction, engineering, and environmental monitoring.",
  },
]);

/* =====================================================
   PAGE DATA
===================================================== */

const benefits = [
  {
    icon: <FaDraftingCompass />,
    title: "Accurate CAD Drafting",
    description:
      "We provide precise CAD drawings and drafting services for engineering, architecture, and infrastructure projects.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Comprehensive GIS Solutions",
    description:
      "Our GIS services transform raw geospatial data into actionable insights for urban planning and resource management.",
  },
  {
    icon: <FaSatellite />,
    title: "Advanced Photogrammetry",
    description:
      "We deliver accurate 3D models and orthomosaics using drone and satellite imagery for surveying and analysis.",
  },
  {
    icon: <FaCubes />,
    title: "LiDAR Data Processing",
    description:
      "We process LiDAR point cloud data to generate precise digital terrain models and surface mapping outputs.",
  },
  {
    icon: <FaLayerGroup />,
    title: "Multi-Layer Mapping",
    description:
      "Our layered mapping solutions allow integration of CAD, GIS, and photogrammetry data for holistic insights.",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Project-Ready Deliverables",
    description:
      "We deliver data in client-specified formats, ensuring compatibility and readiness for project implementation.",
  },
];

const services = [
  {
    id: "advanced-cad-gis",
    title: "Advanced CAD, GIS & Geospatial Services",
    image: "/images/advanced-cad-gis.png",
    imageAlt: "Advanced CAD, GIS & Geospatial",
    description:
      "Transform complex spatial data into actionable insights with our advanced CAD, GIS, and geospatial solutions. We help businesses, infrastructure projects, and government organizations visualize, analyze, and manage geographic and engineering data with precision.",
    highlight:
      "By combining cutting-edge tools, accurate data processing, and domain expertise, we deliver high-quality mapping, modeling, and analysis that support smarter planning and decision-making.",
    bullets: [
      "CAD drafting, 2D/3D modeling & engineering design support",
      "GIS mapping, spatial analysis & geospatial data management",
      "LiDAR, photogrammetry & high-precision data processing",
    ],
    imageLeft: false,
  },
  {
    id: "end-to-end-mapping",
    title: "End-to-End CAD, GIS & Mapping Solutions",
    image: "/images/GIS-Mapping.png",
    imageAlt: "GIS mapping solutions",
    description:
      "From data capture to final visualization, we deliver comprehensive CAD, GIS, and mapping solutions tailored to your project needs. Our end-to-end approach ensures seamless integration of geospatial data, engineering design, and advanced mapping technologies.",
    highlight:
      "Whether it's infrastructure development, urban planning, or asset management, we provide scalable and precise solutions that streamline workflows, reduce errors, and enhance decision-making.",
    bullets: [
      "Complete workflow from data collection to final map delivery",
      "Integrated CAD, GIS & mapping for accurate planning & execution",
      "Scalable solutions for infrastructure, utilities & land management",
    ],
    imageLeft: true,
  },
  {
    id: "lidar-services",
    title: "Precision CAD, GIS & LiDAR Services",
    image: "/images/Precision-CAD-GIS.png",
    imageAlt: "Precision CAD, GIS & LiDAR",
    description:
      "Achieve unmatched accuracy and detail with our precision-driven CAD, GIS, and LiDAR services. We specialize in transforming complex spatial and survey data into highly accurate models, maps, and actionable insights.",
    highlight:
      "By leveraging advanced LiDAR technology alongside expert CAD drafting and GIS analysis, we deliver reliable outputs that support critical decision-making across infrastructure, engineering, and environmental projects.",
    bullets: [
      "High-precision LiDAR data processing & 3D modeling",
      "Accurate CAD drafting & GIS-based spatial analysis",
      "Reliable data outputs for infrastructure, planning & surveying projects",
    ],
    imageLeft: false,
  },
  {
    id: "gis-data-management",
    title: "GIS Data Management & Spatial Analysis",
    image: "/images/GIS-Data-Management.png",
    imageAlt: "GIS Data Management & Spatial Analysis",
    description:
      "Turn complex geographic data into meaningful insights with our advanced GIS data management and spatial analysis services. We help organizations collect, organize, and analyze spatial data to support smarter planning, decision-making, and resource management.",
    highlight:
      "By leveraging powerful GIS tools and analytical techniques, we uncover patterns, trends, and relationships that drive efficiency and strategic growth.",
    bullets: [
      "Geospatial data collection, cleaning & database management",
      "Spatial pattern analysis, trend identification & reporting",
      "Data-driven decision support for planning & operations",
    ],
    imageLeft: true,
  },
  {
    id: "engineering-mapping",
    title: "Engineering, Mapping & Geospatial Solutions",
    image: "/images/Engineering-Mapping.png",
    imageAlt: "Engineering, Mapping & Geospatial",
    description:
      "Bridge the gap between engineering precision and geospatial intelligence with our integrated solutions. We deliver comprehensive engineering, mapping, and geospatial services that support accurate planning, design, and execution across infrastructure and development projects.",
    highlight:
      "By combining advanced technologies with domain expertise, we transform complex data into clear, actionable insights—helping you improve efficiency, reduce risks, and make informed decisions at every stage.",
    bullets: [
      "Integrated engineering design, mapping & geospatial analysis",
      "High-accuracy data processing for infrastructure & development projects",
      "Scalable solutions for planning, execution & asset management",
    ],
    imageLeft: false,
  },
];

/* =====================================================
   PAGE COMPONENT
===================================================== */

export default function CADGISPhotogrammetry() {
  return (
    <>
      <PageLoader />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cadGisBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cadGisWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cadGisFaq) }}
      />

      {/* ─── Styles ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── HERO ── */
        .wd-hero {
          position: relative; min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: #080808; overflow: hidden;
          padding: 8rem 1.5rem 6rem; text-align: center;
        }
        .wd-hero__orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: wdOrbDrift 16s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .wd-hero__orb--1 {
          width: 540px; height: 540px;
          background: radial-gradient(circle, #6366f1, #4f46e5);
          top: -160px; left: -100px; opacity: .13;
        }
        .wd-hero__orb--2 {
          width: 460px; height: 460px;
          background: radial-gradient(circle, #f97316, #ea580c);
          bottom: -130px; right: -80px; opacity: .12;
          animation-delay: -8s;
        }
        .wd-hero__orb--3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #06b6d4, #0891b2);
          top: 40%; right: 15%; opacity: .07;
          animation-delay: -4s;
        }
        @keyframes wdOrbDrift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(32px,24px) scale(1.06); }
        }
        .wd-hero__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .wd-hero__grain {
          position: absolute; inset: 0; opacity: .03; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        /* Breadcrumb — inside hero, matches dm-hero__breadcrumb pattern */
        .wd-hero__breadcrumb {
          position: relative; z-index: 10;
          display: flex; align-items: center; gap: 6px; justify-content: center;
          font-family: 'DM Sans', sans-serif; font-size: .75rem;
          color: rgba(255,255,255,0.3); letter-spacing: .04em;
          margin-bottom: 2rem;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .05s both;
        }
        .wd-hero__breadcrumb a {
          color: #f97316; text-decoration: none; font-weight: 500;
        }
        .wd-hero__breadcrumb a:hover { text-decoration: underline; }
        .wd-hero__breadcrumb span { opacity: .4; }

        .wd-hero__content {
          position: relative; z-index: 10; max-width: 860px; margin: 0 auto;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes wdFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wd-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase; color: #f97316;
          border: 1px solid rgba(249,115,22,.28); background: rgba(249,115,22,.07);
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 1.8rem; backdrop-filter: blur(8px);
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .wd-hero__dot {
          width: 5px; height: 5px; border-radius: 50%; background: #f97316;
          animation: wdPulse 2s ease-in-out infinite;
        }
        @keyframes wdPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.65); }
        }
        .wd-hero__h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .wd-hero__h1 em { font-style: italic; color: transparent; -webkit-text-stroke: 0.2px #f97316; }
        .wd-hero__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #f97316, transparent);
          margin: 0 auto 1.4rem;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }
        .wd-hero__sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(.95rem, 2vw, 1.1rem);
          font-weight: 300; line-height: 1.85; color: rgba(255,255,255,0.45);
          max-width: 680px; margin: 0 auto 2.6rem;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }
        .wd-hero__cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase; color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
          animation: wdFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .wd-hero__cta:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 14px 40px rgba(249,115,22,.5); }

        .wd-hero__scroll {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          z-index: 20; display: flex; flex-direction: column;
          align-items: center; gap: 6px; text-decoration: none;
          animation: wdFadeUp .9s ease .8s both;
        }
        .wd-hero__scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,.3), transparent);
          animation: wdScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes wdScrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .wd-hero__scroll-lbl {
          font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.22);
        }

        /* corner marks */
        .wd-corner {
          position: absolute; width: 28px; height: 28px;
          z-index: 5; opacity: .2; pointer-events: none;
        }
        .wd-corner--tl { top: 24px; left: 24px; border-top: 1px solid #f97316; border-left: 1px solid #f97316; }
        .wd-corner--tr { top: 24px; right: 24px; border-top: 1px solid #f97316; border-right: 1px solid #f97316; }
        .wd-corner--bl { bottom: 64px; left: 24px; border-bottom: 1px solid #f97316; border-left: 1px solid #f97316; }
        .wd-corner--br { bottom: 64px; right: 24px; border-bottom: 1px solid #f97316; border-right: 1px solid #f97316; }

        /* ── INTRO ── */
        .wd-intro {
          background: #0f0f0f; border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 5rem 1.5rem;
        }
        .wd-intro__inner { max-width: 860px; margin: 0 auto; text-align: center; }
        .wd-intro__label {
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: #f97316; margin-bottom: 1.2rem; display: block;
        }
        .wd-intro__h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 700; line-height: 1.15; letter-spacing: -.015em;
          color: #fff; margin: 0 0 1.5rem;
        }
        .wd-intro__h2 em { font-style: italic; color: #f97316; }
        .wd-intro__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #f97316, transparent);
          margin: 0 auto 1.8rem;
        }
        .wd-intro__p {
          font-family: 'DM Sans', sans-serif; font-size: 1rem;
          font-weight: 300; line-height: 1.85; color: rgba(255,255,255,0.45);
          max-width: 680px; margin: 0 auto .9rem;
        }
        .wd-intro__p strong { color: rgba(255,255,255,0.65); font-weight: 500; }

        /* ── SERVICE SECTIONS ── */
        .wd-services { background: #080808; }

        .wd-svc {
          padding: 5rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.07);
          position: relative;
        }
        .wd-svc:nth-child(odd)  { background: #0f0f0f; }
        .wd-svc:nth-child(even) { background: #080808; }

        .wd-svc__inner--img-left {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 3fr 4fr;
          gap: 4rem; align-items: center;
        }
        .wd-svc__inner--img-right {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 4fr 3fr;
          gap: 4rem; align-items: center;
        }
        @media (max-width: 768px) {
          .wd-svc__inner--img-left,
          .wd-svc__inner--img-right { grid-template-columns: 1fr; gap: 2.5rem; }
          .wd-svc__img-wrap { order: 2 !important; }
          .wd-svc__body    { order: 1 !important; }
        }

        .wd-svc__img-wrap {
          position: relative; border-radius: 16px; overflow: hidden;
        }
        .wd-svc__img-wrap::before {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(135deg, rgba(249,115,22,.08), transparent 60%);
          border-radius: 16px;
        }
        .wd-svc__img-wrap img {
          width: 100%; height: auto; display: block;
          border-radius: 16px; border: 1px solid rgba(255,255,255,0.07);
          transition: transform .4s ease;
        }
        .wd-svc__img-wrap:hover img { transform: scale(1.03); }

        .wd-svc__num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          font-weight: 700; line-height: 1;
          color: transparent; -webkit-text-stroke: 1px rgba(249,115,22,.18);
          position: absolute; top: -1.5rem; left: 0;
          pointer-events: none; user-select: none;
        }
        .wd-svc__body { position: relative; }
        .wd-svc__eyebrow {
          font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: #f97316; margin-bottom: .9rem; display: block;
        }
        .wd-svc__h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700; line-height: 1.15; letter-spacing: -.01em;
          color: #fff; margin: 0 0 .6rem;
        }
        .wd-svc__rule {
          width: 32px; height: 1px;
          background: linear-gradient(90deg, #f97316, transparent);
          margin: 0 0 1.4rem;
        }
        .wd-svc__p {
          font-family: 'DM Sans', sans-serif; font-size: .95rem;
          font-weight: 300; line-height: 1.85; color: rgba(255,255,255,0.45);
          margin-bottom: .8rem;
        }
        .wd-svc__highlight {
          font-family: 'DM Sans', sans-serif; font-size: .93rem;
          font-weight: 400; line-height: 1.8; color: rgba(255,255,255,.6);
          border-left: 2px solid rgba(249,115,22,.4);
          padding-left: 1rem; margin-bottom: 1.6rem; font-style: italic;
        }
        .wd-svc__bullets {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: .5rem;
        }
        .wd-svc__bullets li {
          font-family: 'DM Sans', sans-serif; font-size: .88rem;
          font-weight: 400; color: rgba(255,255,255,0.65);
          display: flex; align-items: flex-start; gap: .6rem;
        }
        .wd-svc__bullets li::before {
          content: ''; width: 5px; height: 5px; border-radius: 50%;
          background: #f97316; margin-top: .45rem; flex-shrink: 0;
        }

        /* ── BENEFITS ── */
        .wd-benefits {
          background: #0f0f0f; padding: 6rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .wd-benefits__inner { max-width: 1200px; margin: 0 auto; }
        .wd-benefits__head  { text-align: center; margin-bottom: 3.5rem; }
        .wd-benefits__label {
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: #f97316; margin-bottom: 1rem; display: block;
        }
        .wd-benefits__h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 700; line-height: 1.15; letter-spacing: -.015em;
          color: #fff; margin: 0 0 1rem;
        }
        .wd-benefits__h2 em { font-style: italic; color: #f97316; }
        .wd-benefits__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #f97316, transparent);
          margin: 0 auto 1.4rem;
        }
        .wd-benefits__sub {
          font-family: 'DM Sans', sans-serif; font-size: .95rem;
          font-weight: 300; line-height: 1.8; color: rgba(255,255,255,0.45);
          max-width: 520px; margin: 0 auto;
        }
        .wd-benefits__grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
        }
        @media (max-width: 1024px) { .wd-benefits__grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 640px)  { .wd-benefits__grid { grid-template-columns: 1fr; } }

        .wd-benefit-card {
          background: #141414; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 2rem 1.75rem;
          transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
          position: relative; overflow: hidden;
        }
        .wd-benefit-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,.5), transparent);
          opacity: 0; transition: opacity .25s ease;
        }
        .wd-benefit-card:hover { border-color: rgba(249,115,22,.25); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,.4); }
        .wd-benefit-card:hover::before { opacity: 1; }
        .wd-benefit-card__icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: rgba(249,115,22,0.12); border: 1px solid rgba(249,115,22,.2);
          display: flex; align-items: center; justify-content: center;
          color: #f97316; font-size: 1.1rem; margin-bottom: 1.2rem;
        }
        .wd-benefit-card__title {
          font-family: 'DM Sans', sans-serif; font-size: .95rem; font-weight: 600;
          color: #fff; margin-bottom: .5rem;
        }
        .wd-benefit-card__desc {
          font-family: 'DM Sans', sans-serif; font-size: .85rem;
          font-weight: 300; line-height: 1.75; color: rgba(255,255,255,0.45);
        }

        /* ── CTA STRIP ── */
        .wd-cta {
          background: #080808; border-top: 1px solid rgba(255,255,255,0.07);
          padding: 5rem 1.5rem; text-align: center;
          position: relative; overflow: hidden;
        }
        .wd-cta__orb {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, #f97316, transparent 70%);
          opacity: .05; top: 50%; left: 50%; transform: translate(-50%,-50%);
          filter: blur(60px); pointer-events: none;
        }
        .wd-cta__inner { position: relative; z-index: 10; max-width: 560px; margin: 0 auto; }
        .wd-cta__eyebrow {
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: #f97316; margin-bottom: 1.2rem; display: block;
        }
        .wd-cta__h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 4vw, 3.2rem);
          font-weight: 700; line-height: 1.15; letter-spacing: -.015em;
          color: #fff; margin: 0 0 1rem;
        }
        .wd-cta__h2 em { font-style: italic; color: #f97316; }
        .wd-cta__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #f97316, transparent);
          margin: 0 auto 1.4rem;
        }
        .wd-cta__sub {
          font-family: 'DM Sans', sans-serif; font-size: .95rem;
          font-weight: 300; line-height: 1.8; color: rgba(255,255,255,0.45);
          margin-bottom: 2.4rem;
        }
        .wd-cta__btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase; color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .wd-cta__btn:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 14px 40px rgba(249,115,22,.5); }
      `}</style>

      <Header />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="wd-hero" aria-label="CAD, GIS & Photogrammetry Services Hero">
        {/* Decorative background — hidden from AT */}
        <div aria-hidden="true">
          <div className="wd-hero__orb wd-hero__orb--1" />
          <div className="wd-hero__orb wd-hero__orb--2" />
          <div className="wd-hero__orb wd-hero__orb--3" />
          <div className="wd-hero__grid" />
          <div className="wd-hero__grain" />
        </div>

        <div className="wd-corner wd-corner--tl" aria-hidden="true" />
        <div className="wd-corner wd-corner--tr" aria-hidden="true" />
        <div className="wd-corner wd-corner--bl" aria-hidden="true" />
        <div className="wd-corner wd-corner--br" aria-hidden="true" />

        {/* Breadcrumb — inside hero, matches dm-hero__breadcrumb pattern */}
        <nav
  className="wd-hero__breadcrumb"
  aria-label="Breadcrumb"
  style={{ display: "none" }}
>
  <a href="/">Home</a>
  <span aria-hidden="true">›</span>
  <a href="/services">Services</a>
  <span aria-hidden="true">›</span>
  <span aria-current="page" style={{ color: "rgba(255,255,255,0.5)" }}>
    CAD, GIS &amp; Photogrammetry
  </span>
</nav>

        <div className="wd-hero__content">
          <div className="wd-hero__eyebrow" aria-hidden="true">
            <span className="wd-hero__dot" />
            Services · CAD, GIS &amp; Photogrammetry
          </div>

          <h1 className="wd-hero__h1">
            Precision mapping for<br />
            a smarter <em>world</em>
          </h1>

          <div className="wd-hero__rule" aria-hidden="true" />

          <p className="wd-hero__sub">
            From CAD drafting and GIS mapping to LiDAR processing, photogrammetry, and spatial
            analysis — we deliver precision-driven geospatial solutions for infrastructure,
            engineering, and urban planning worldwide.
          </p>

          <a href="#services" className="wd-hero__cta">
            Explore Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <a href="#services" className="wd-hero__scroll" aria-label="Scroll to services">
          <div className="wd-hero__scroll-line" aria-hidden="true" />
          <span className="wd-hero__scroll-lbl" aria-hidden="true">Scroll</span>
        </a>
      </section>

      {/* ══ INTRO ══════════════════════════════════════════════ */}
      <section className="wd-intro" aria-labelledby="wd-intro-heading">
        <div className="wd-intro__inner">
          <span className="wd-intro__label">Our Expertise</span>
          <h2 className="wd-intro__h2" id="wd-intro-heading">
            Precision, innovation &amp; data-driven<br />
            geospatial <em>intelligence</em>
          </h2>
          <div className="wd-intro__rule" aria-hidden="true" />
          <p className="wd-intro__p">
            At <strong>99 Visual Solutions</strong>, we specialize in{" "}
            <strong>Computer-Aided Design (CAD)</strong>,{" "}
            <strong>Geographic Information Systems (GIS)</strong>, and{" "}
            <strong>Photogrammetry</strong>, delivering data-rich and high-accuracy solutions
            that empower businesses, government agencies, and planners to make informed decisions.
          </p>
          <p className="wd-intro__p">
            Whether it&apos;s{" "}
            <strong>surveying, infrastructure planning, urban development, or environmental analysis</strong>,
            our advanced tools and expertise provide actionable insights that drive efficiency,
            precision, and project success.
          </p>
        </div>
      </section>

      {/* ══ SERVICE SECTIONS ══════════════════════════════════ */}
      <div id="services" className="wd-services">
        {services.map((svc, idx) => (
          <section
            key={svc.id}
            id={svc.id}
            className="wd-svc"
            aria-labelledby={`wd-svc-heading-${svc.id}`}
          >
            <div className={`wd-svc__inner--img-${svc.imageLeft ? "left" : "right"}`}>

              {/* Image */}
              <div
                className="wd-svc__img-wrap"
                style={{ order: svc.imageLeft ? 1 : 2 }}
              >
                <Image
                  src={svc.image}
                  alt={svc.imageAlt}
                  width={600}
                  height={460}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              {/* Text */}
              <div
                className="wd-svc__body"
                style={{ order: svc.imageLeft ? 2 : 1 }}
              >
                <span className="wd-svc__num" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="wd-svc__eyebrow">
                  Service {String(idx + 1).padStart(2, "0")}
                </span>
                <h3
                  className="wd-svc__h3"
                  id={`wd-svc-heading-${svc.id}`}
                >
                  {svc.title}
                </h3>
                <div className="wd-svc__rule" aria-hidden="true" />
                <p className="wd-svc__p">{svc.description}</p>
                <p className="wd-svc__highlight">{svc.highlight}</p>
                <ul className="wd-svc__bullets">
                  {svc.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ══ BENEFITS ══════════════════════════════════════════ */}
      <section className="wd-benefits" aria-labelledby="wd-benefits-heading">
        <div className="wd-benefits__inner">
          <div className="wd-benefits__head">
            <span className="wd-benefits__label">Why Choose Us?</span>
            <h2 className="wd-benefits__h2" id="wd-benefits-heading">
              Benefits of partnering with<br /><em>99 Visual</em> CAD, GIS &amp; Photogrammetry
            </h2>
            <div className="wd-benefits__rule" aria-hidden="true" />
            <p className="wd-benefits__sub">
              With 99 Visual Solutions, precision and innovation go hand in hand. Our services
              are designed to provide reliable, scalable, and accurate geospatial insights for
              complex projects.
            </p>
          </div>

          <div className="wd-benefits__grid">
            {benefits.map((b, i) => (
              <div className="wd-benefit-card" key={i}>
                <div className="wd-benefit-card__icon" aria-hidden="true">{b.icon}</div>
                <div className="wd-benefit-card__title">{b.title}</div>
                <p className="wd-benefit-card__desc">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA STRIP ═════════════════════════════════════════ */}
      <section className="wd-cta" aria-labelledby="wd-cta-heading">
        <div className="wd-cta__orb" aria-hidden="true" />
        <div className="wd-cta__inner">
          <span className="wd-cta__eyebrow">Start a Project</span>
          <h2 className="wd-cta__h2" id="wd-cta-heading">
            Ready to map your next big <em>project</em>?
          </h2>
          <div className="wd-cta__rule" aria-hidden="true" />
          <p className="wd-cta__sub">
            Get in touch with our team for a free consultation. We&apos;ll help you design
            the right CAD, GIS, or geospatial strategy to meet your project goals.
          </p>
          <Link href="/contact" className="wd-cta__btn">
            Get a Free Consultation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}