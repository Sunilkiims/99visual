// app/services/page.tsx
//
// THIS REVISION:
//   1. Recolored from the dark near-black + orange + serif system (which
//      the standalone /services/visualization page intentionally keeps)
//      to the light "analytics" system shared by /services/website-development,
//      /services/it-consulting, /services/digital-marketing-seo,
//      /services/cad-gis-photogrammetry, and /services/automation-testing:
//      cool paper background, ink text, Space Grotesk / Inter / IBM Plex
//      Mono typefaces, one blue signal accent. The per-service card accent
//      colors (indigo, orange, green, cyan, purple, amber) are unchanged —
//      those were never tied to the old orange theme and still work here.
//   2. Added the "docked ticker" mechanism now used on all five of those
//      pages: an illustrative service-catalog ticker sits as a flex child
//      pinned to the bottom edge of the hero itself, one line per service
//      discipline. The hero switched from min-height:100vh to a fixed
//      height:100vh (with dvh/svh refinements) so it can never grow taller
//      than one screen and push that ticker below the fold.
//   3. Added a sticky mobile CTA bar, matching the other redesigned pages.
//   4. FIX: all "contact us" intent CTAs (hero, Why Us, CTA strip, sticky
//      mobile) now open the ContactPopup modal via the ConsultationCTA
//      client wrapper instead of navigating to /contact. Updated the
//      import to point at components/ConsultationCTA.tsx (renamed from
//      Contactcta.tsx) and removed a stray, prop-less <CotactCTA />
//      that was accidentally left before <Footer />.
//   5. The hero "What We Do" eyebrow badge (and its pulsing dot) is now
//      orange instead of blue, matching the EST. 2020 · BANGALORE, INDIA
//      badge reference — everything else in the blue accent system
//      (rule, buttons, corners, cards, stats, etc.) is unchanged.
//
//   The full-bleed photo banner, gradient overlay, grain texture, corner
//   brackets, and single left-aligned hero column (all added in the prior
//   revision) are unchanged. No copy, schema, or metadata changes.
//   Save your banner image to: /public/images/services/services-hub-hero-banner.jpg
//
import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import Link from "next/link";
import Header           from "@/app/components/header";
import Footer           from "@/app/components/footer";
import ConsultationCTA  from "@/app/components/ConsultationCTA";
import Image from "next/image";
import GlowCard from "@/app/components/ui/GlowCard";
import { SectionHeading } from "@/app/components/ui/primitives";
import { Breadcrumbs, ServiceIntro, ServiceCTA, StickyCTA } from "@/app/components/premium/service/ServiceBlocks";



import {
  FaCode, FaBullhorn, FaBug,
  FaCubes, FaDraftingCompass, FaCloud,
} from "react-icons/fa";

import type { Metadata } from "next";
import {
  BASE,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
  jsonLdString,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// BASE SAFE — strips trailing slash to prevent double-slash canonicals
// ─────────────────────────────────────────────────────────────────────────────
const BASE_SAFE = BASE.replace(/\/$/, "");

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Services: Web, 3D, QA, SEO & IT Consulting",

  description:
    "Web development, AI-powered QA and test automation, digital marketing & SEO, IT consulting, 3D visualization and CAD/GIS services from 99 Visual Solutions.",

  alternates: {
    canonical: `${BASE_SAFE}/services`,
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
    title:       "Our Services | Web, 3D Viz, AI QA, SEO & IT Consulting — 99 Visual",
    description: "Full-spectrum technology and creative services: web development, AI-powered QA testing, digital marketing & SEO, IT consulting, 3D visualization, and CAD/GIS — all under one roof.",
    url:         `${BASE_SAFE}/services`,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE_SAFE}/images/services/services-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "Services by 99 Visual Solutions",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Our Services | 99 Visual Solutions",
    description: "Web development, AI QA testing, digital marketing, IT consulting, 3D visualization, and CAD/GIS — explore all services by 99 Visual Solutions.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE_SAFE}/images/services/services-og.jpg`,
        alt: "Services by 99 Visual Solutions",
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

// ─────────────────────────────────────────────────────────────────────────────
// DATES
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = PAGE_LAST_MODIFIED['/services']; // shared with app/sitemap.ts — edit lib/page-dates.ts

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
const svBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",     url: "/" },
  { name: "Services", url: "/services" },
]);

const svServiceCollectionNode = {
  "@type":       "ItemList",
  "@id":         `${BASE_SAFE}/services#list`,
  name:          "99 Visual Solutions Service Catalogue",
  description:   "All services offered by 99 Visual Solutions",
  url:           `${BASE_SAFE}/services`,
  numberOfItems: 6,
  itemListElement: [
    { "@type": "ListItem", position: 1, url: `${BASE_SAFE}/services/website-development`,     name: "Website & Web App Development" },
    { "@type": "ListItem", position: 2, url: `${BASE_SAFE}/services/digital-marketing-seo`,   name: "Digital Marketing & SEO" },
    { "@type": "ListItem", position: 3, url: `${BASE_SAFE}/services/automation-testing`,      name: "AI-Powered QA & Automation Testing" },
    { "@type": "ListItem", position: 4, url: `${BASE_SAFE}/services/it-consulting`,           name: "IT Consulting" },
    { "@type": "ListItem", position: 5, url: `${BASE_SAFE}/services/visualization`,           name: "3D Visualization & Architectural Rendering" },
    { "@type": "ListItem", position: 6, url: `${BASE_SAFE}/services/cad-gis-photogrammetry`, name: "CAD, GIS & Photogrammetry" },
  ],
};

const svPageNode = {
  "@type":       "WebPage",
  "@id":         `${BASE_SAFE}/services#webpage`,
  url:           `${BASE_SAFE}/services`,
  name:          "Our Services | Web, 3D Viz, AI QA, SEO & IT Consulting — 99 Visual",
  description:   "Full-spectrum technology and creative services: web development, AI QA testing, digital marketing & SEO, IT consulting, 3D visualization, and CAD/GIS/photogrammetry.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE_SAFE}/#website` },
  about:         { "@id": `${BASE_SAFE}/#organization` },
  publisher:     { "@id": `${BASE_SAFE}/#organization` },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".sv-hero__h1", ".sv-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE_SAFE}/services#breadcrumb` },
  mainEntity:      { "@id": `${BASE_SAFE}/services#list` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE_SAFE}/services`] },
};

const svGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  svPageNode,
  svBreadcrumbNode,
  svServiceCollectionNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────
const services = [
  {
    id:          "website-development",
    href:        "/services/website-development",
    num:         "01",
    icon:        <FaCode />,
    tag:         "Development",
    title:       "Website & Web App Development",
    description: "Custom web applications, front-end & back-end engineering, UX design, e-commerce, CMS, SEO optimization, API integrations, and security — built to perform at every scale.",
    bullets:     ["React / Next.js / Vue.js", "E-Commerce & CMS Platforms", "API Integrations & Web Security"],
    accent:      "#6366f1",
  },
  {
    id:          "digital-marketing-seo",
    href:        "/services/digital-marketing-seo",
    num:         "02",
    icon:        <FaBullhorn />,
    tag:         "Marketing",
    title:       "Digital Marketing & SEO",
    description: "Full-spectrum digital marketing: SEO, PPC, Meta Ads, social media, content marketing, email automation, local SEO, link building, and promotional video — engineered for ROI.",
    bullets:     ["Search Engine Optimization", "PPC & Meta Ads Management", "Content & Email Marketing"],
    accent:      "#386BFF",
  },
  {
    id:          "automation-testing",
    href:        "/services/automation-testing",
    num:         "03",
    icon:        <FaBug />,
    tag:         "QA & Testing",
    title:       "AI-Powered QA & Automation Testing",
    description: "Next-generation quality assurance powered by Agentic AI — autonomous test agents, self-healing automation, LLM-driven exploratory testing, performance, security, and CI/CD integration.",
    bullets:     ["Agentic AI Test Automation", "Self-Healing Test Scripts", "Performance & Security Testing"],
    accent:      "#10b981",
  },
  {
    id:          "it-consulting",
    href:        "/services/it-consulting",
    num:         "04",
    icon:        <FaCloud />,
    tag:         "Consulting",
    title:       "IT Consulting",
    description: "End-to-end IT consulting: infrastructure planning, cloud migration (AWS, Azure, GCP), cybersecurity, IoT integration, software consulting, and IT project management.",
    bullets:     ["Cloud Migration & DevOps", "Cybersecurity & Risk Management", "IoT & Smart Device Integration"],
    accent:      "#06b6d4",
  },
  {
    id:          "visualization",
    href:        "/services/visualization",
    num:         "05",
    icon:        <FaCubes />,
    tag:         "3D & Rendering",
    title:       "3D Visualization & Rendering",
    description: "Photorealistic architectural renders, immersive 3D walkthroughs, product visualization, precision CAD modeling, BIM, and LiDAR data processing.",
    bullets:     ["Architectural Exterior & Interior Renders", "3D Walkthrough Animations", "Product & BIM Visualization"],
    accent:      "#a855f7",
  },
  {
    id:          "cad-gis-photogrammetry",
    href:        "/services/cad-gis-photogrammetry",
    num:         "06",
    icon:        <FaDraftingCompass />,
    tag:         "Geospatial",
    title:       "CAD, GIS & Photogrammetry",
    description: "Precision-driven CAD drafting, GIS mapping, drone & aerial photogrammetry, LiDAR processing, spatial analysis, and 3D modeling for infrastructure and urban planning worldwide.",
    bullets:     ["LiDAR Point Cloud Processing", "Drone & Aerial Photogrammetry", "GIS Mapping & Spatial Analysis"],
    accent:      "#f59e0b",
  },
];


const whyUs = [
  "End-to-end delivery — strategy through execution",
  "AI-native workflows for faster, smarter outcomes",
  "Domain specialists, not generalists",
  "Transparent pricing, no scope surprises",
  "Continuous support post-launch",
  "Proven results across 4 continents",
];


// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      <script
        id="schema-services-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(svGraph) }}
      />
      <div className="vz">
        <Header />
        <main id="main">
          <section className="vz-shero vz-shero--hub" aria-labelledby="sv-hero-heading">
            <div className="vz-shero__media">
              <Image src="/images/services/services-hub-hero-banner.jpg" alt="99 Visual Solutions services: web, 3D, QA, SEO and IT consulting" fill priority fetchPriority="high" sizes="100vw" />
            </div>
            <div className="vz-grid-bg" aria-hidden="true" />
            <div className="vz-container vz-shero__inner">
              <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }]} />
              <p className="vz-eyebrow">What We Do</p>
              <h1 id="sv-hero-heading" className="vz-h1 vz-shero__tagline">
                End-to-end solutions built for the <em>intelligent era</em>
              </h1>
              <p className="vz-lead vz-shero__sub">
                From pixel-perfect web experiences and AI-powered QA to data-driven marketing, geospatial intelligence, and strategic IT consulting — 99 Visual Solutions is your single partner for the full technology stack.
              </p>
              <div className="vz-btn-row">
                <a href="#sv-grid" className="vz-btn vz-btn--primary">Browse Services</a>
                <ConsultationCTA className="vz-btn vz-btn--ghost" postTitle="Services" postUrl="/services">Get a Free Consultation</ConsultationCTA>
              </div>
            </div>
          </section>

          <ServiceIntro id="sv-intro-heading" eyebrow="Our Approach" title={<>One partner. The <em>full spectrum</em> of modern technology.</>}>
            <p className="vz-lead">
              At <strong>99 Visual Solutions</strong>, we believe great technology is indistinguishable from great design. Our multidisciplinary teams combine <strong>creative excellence, engineering rigour, and AI-native thinking</strong> to deliver outcomes that move the needle — not just deliverables.
            </p>
            <p>
              Whether you are a startup launching your first product or an enterprise modernising a legacy stack, we scale with your ambition and operate as a <strong>true extension of your team</strong>.
            </p>
          </ServiceIntro>

          <section className="vz-section vz-section--surface" id="sv-grid" aria-labelledby="sv-services-heading">
            <div className="vz-container">
              <SectionHeading id="sv-services-heading" eyebrow="Our Services" title={<>Everything you need to build, grow &amp; <em>dominate</em></>} />
              <ul className="vz-svc-grid vz-svc-grid--3" role="list">
                {services.map((svc) => (
                  <li key={svc.id}>
                    <GlowCard as="article" className="vz-svc-card">
                      <div className="vz-svc-card__top">
                        <span className="vz-icon-tile">{svc.icon}</span>
                        <span className="vz-chip">{svc.tag}</span>
                      </div>
                      <h3 className="vz-h3">
                        <Link href={svc.href} className="vz-stretched">{svc.title}</Link>
                      </h3>
                      <p className="vz-body">{svc.description}</p>
                      <ul className="vz-checks">
                        {svc.bullets.map((b) => <li key={b}>{b}</li>)}
                      </ul>
                      <span className="vz-link-arrow" aria-hidden="true">Explore Service →</span>
                    </GlowCard>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <ServiceIntro
            id="sv-why-heading"
            eyebrow="Why 99 Visual?"
            title={<>We don&apos;t just deliver projects — we deliver <em>outcomes</em></>}
            aside={
              <>
                <ul className="vz-checks">
                  {whyUs.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <ConsultationCTA className="vz-btn vz-btn--primary" postTitle="Services" postUrl="/services">Start a Project</ConsultationCTA>
              </>
            }
          >
            <p className="vz-lead">
              Partnering with 99 Visual Solutions means you get a team that is as invested in your success as you are. We combine deep domain expertise with agile execution to turn complex requirements into elegant, high-performing solutions — on time and within budget.
            </p>
          </ServiceIntro>

          <ServiceCTA
            id="sv-cta-heading"
            eyebrow="Let's Build Together"
            title={<>Ready to start your next <em>big project?</em></>}
            sub="Talk to our team for a free, no-obligation strategy consultation. We'll help you choose the right services, scope your project, and map a clear path to launch."
            postTitle="Services"
            postUrl="/services"
          />
        </main>
        <Footer />
        <StickyCTA postTitle="Services" postUrl="/services" label="Get a Free Consultation" />
      </div>
    </>
  );
}
