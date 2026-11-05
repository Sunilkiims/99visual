// app/about/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// About page — 99 Visual Solutions
//
// THIS REVISION — brings Hero + CTA in line with the Services page design
// system (app/services/page.tsx), per the site-wide design-system rollout:
//   1. Hero rebuilt on the same mechanism as Services: full-bleed photo
//      banner background, fixed 100vh/100dvh/100svh (never pushes content
//      below the fold), single left-aligned column, corner brackets, grain
//      texture, and a docked "ticker" bar pinned to the hero's bottom edge.
//   2. Recolored from the page-local dark/orange/Cormorant system to the
//      shared Space Grotesk / Inter / IBM Plex Mono type system with the
//      one blue signal accent (--ab-blue). The orange "eyebrow" badge is
//      kept, matching the Services page's own eyebrow treatment.
//   3. CTA section rebuilt to match Services' .sv-cta exactly (light
//      surface, radial orb glow, same heading/button treatment). The old
//      <ContactCTA /> (Contactcta.tsx, navigates to /contact) is replaced
//      with <ConsultationCTA /> (opens the ContactPopup modal) — same
//      component the Services page now uses — plus a sticky mobile CTA bar.
//   4. Content sections (TabAbout, WhyChooseUs, DataPrivacy), all metadata,
//      and all JSON-LD schema are UNCHANGED. Class names on the H1/sub
//      (.ab-hero__h1 / .ab-hero__sub) are preserved so the existing
//      `speakable.cssSelector` entries in aboutPageNode keep working.
//
//   HERO BACKGROUND — now a flat black screen at every breakpoint
//   (banner image + gradient overlays removed; see .ab-hero below).
// ─────────────────────────────────────────────────────────────────────────────

import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import type { Metadata } from "next";
import Header           from "../components/header";
import Footer           from "../components/footer";


import TabAbout         from "../components/tabstory";
import WhyChooseUs      from "../components/Story";
import DataPrivacy      from "../components/dataprivacy";
import ConsultationCTA  from "@/app/components/ConsultationCTA";
import { Breadcrumbs, ServiceCTA, StickyCTA } from "@/app/components/premium/service/ServiceBlocks";
import { TechnologyCloud } from "@/app/components/premium/home/HomeSections";

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
// METADATA — unchanged from prior revision
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // `absolute` — this title already names the brand, so the root layout's
  // "%s | 99 Visual Solutions" template must not append it a second time.
  title: { absolute: "About 99 Visual Solutions | IT & 3D Visualization Bangalore" },

  description:
    "Meet 99 Visual Solutions, a Bengaluru IT company founded in 2020, with 500+ projects in web development, 3D visualisation, CAD, GIS, SEO and IT consulting.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: `${BASE}/about`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:       "About 99 Visual Solutions | IT & 3D Visualization Bangalore",
    description: "Bengaluru IT company founded in 2020 with 500+ projects. Full-service digital transformation — web, app, 3D visualisation, CAD, GIS, SEO & IT consulting.",
    url:         `${BASE}/about`,
    siteName:    "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/about-og.jpg`,
        width:  1200,
        height: 630,
        alt:    "99 Visual Solutions team — IT & Digital Transformation Company, Bengaluru India",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "About 99 Visual Solutions | IT & 3D Visualization Bangalore",
    description: "Founded 2020 · 500+ projects · 6 specialisations. Bengaluru IT company serving India, USA, UK, UAE & Australia.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/about-og.jpg`,
        alt: "99 Visual Solutions — Global IT & Digital Transformation Company, Bengaluru",
      },
    ],
  },


  authors:         [{ name: "99 Visual Solutions", url: BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// DATES — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01T00:00:00+05:30";
const DATE_MODIFIED  = PAGE_LAST_MODIFIED['/about']; // shared with app/sitemap.ts — edit lib/page-dates.ts

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA NODES — unchanged from prior revision
// ─────────────────────────────────────────────────────────────────────────────
const aboutBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",  url: "/" },
  { name: "About", url: "/about" },
]);

// FAQPage markup removed: Google requires FAQ structured data to mirror
// question/answer text that is visible on the page, and this page renders
// no FAQ section. Markup for invisible content is a structured-data policy
// violation (risk of a manual action). Re-add it alongside a visible FAQ.

const aboutPageNode = {
  "@type":       "AboutPage",
  "@id":         `${BASE}/about#webpage`,
  url:           `${BASE}/about`,
  name:          "About 99 Visual Solutions | IT & 3D Visualization Company Bangalore",
  description:   "Learn about 99 Visual Solutions — Bengaluru IT company founded in 2020 with 500+ projects across web development, SEO, 3D visualisation, CAD/GIS, and QA testing.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE}/images/about-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "99 Visual Solutions — Bengaluru IT Company",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".ab-hero__h1", ".ab-hero__sub"],
  },
  breadcrumb:      { "@id": `${BASE}/about#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/about`] },
};

// ProfilePage removed: it duplicated the AboutPage entity for the same URL
// (two competing page types). ProfilePage is meant for person/creator
// profile pages; AboutPage already describes this page.

const aboutGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  aboutPageNode,
  aboutBreadcrumbNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA — hero ticker + stats strip (content-only, no copy changes to
// existing sections below)
// ─────────────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
// Facts shown here are the verifiable ones (founding year, disciplines,
// countries in the Organization schema). A project count is not shown until
// a single confirmed figure exists (the site previously said both 200+ and 500+).
const facts = [
  { value: "2020", label: "Founded in Bengaluru" },
  { value: "6", label: "Specializations" },
  { value: "5", label: "Countries served" },
];

export default function AboutPage() {
  return (
    <>
      <script
        id="schema-about-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(aboutGraph) }}
      />
      <div className="vz">
        <Header />
        <main id="main">
          <section className="vz-hero vz-hero--page" aria-labelledby="ab-hero-heading">
            <div className="vz-grid-bg" aria-hidden="true" />
            <div className="vz-aurora vz-hero__aurora-a" aria-hidden="true" />
            <div className="vz-container vz-page-hero">
              <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/about", label: "About" }]} />
              <p className="vz-eyebrow">Est. 2020 · Bangalore, India</p>
              <h1 id="ab-hero-heading" className="vz-display">
                We build what <span className="vz-grad-text">matters</span>
              </h1>
              <p className="vz-lead vz-page-hero__lead">
                From bold web experiences to precise spatial data — 99 Visual Solutions turns complex ideas into digital realities that drive real, measurable growth.
              </p>
              <div className="vz-btn-row">
                <ConsultationCTA className="vz-btn vz-btn--primary" postTitle="About" postUrl="/about">Get a Free Quote</ConsultationCTA>
                <a href="/services" className="vz-btn vz-btn--ghost">Our Services</a>
              </div>
              <ul className="vz-hero__facts" aria-label="Company at a glance">
                {facts.map((f) => (
                  <li key={f.label}><strong>{f.value}</strong><span>{f.label}</span></li>
                ))}
              </ul>
            </div>
          </section>

          <div id="about-content" className="vz-legacy">
            <TabAbout />
            <WhyChooseUs />
          </div>

          <TechnologyCloud />

          <div className="vz-legacy">
            <DataPrivacy />
          </div>

          <ServiceCTA
            id="ab-cta-heading"
            eyebrow="Let's Build Together"
            title={<>Ready to bring your <em>vision to life?</em></>}
            sub="Talk to our team for a free, no-obligation strategy consultation. We'll help you scope your project and map a clear path to launch."
            postTitle="About"
            postUrl="/about"
          />
        </main>
        <Footer />
        <StickyCTA postTitle="About" postUrl="/about" />
      </div>
    </>
  );
}
