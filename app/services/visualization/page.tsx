// app/services/visualization/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// 3D Visualization & Architectural Rendering — 99 Visual Solutions
//
// THIS REVISION: Recolored from the dark near-black + orange + serif system
//   to the light "analytics" system shared by every other redesigned page
//   (website-development, it-consulting, digital-marketing-seo,
//   cad-gis-photogrammetry, automation-testing, and the /services hub):
//   cool paper background, ink text, Space Grotesk / Inter / IBM Plex Mono
//   typefaces, one blue signal accent. This resolves the last remaining
//   inconsistency — the "Services" component rendered inside this page
//   (app/components/services.tsx) was already converted to this same blue
//   system, so this page's own sections now match it instead of clashing.
//
//   The hero keeps the full-bleed photo banner + dark gradient overlay
//   treatment used everywhere else (a dark banner sits fine on top of a
//   light page, same as on website-development, it-consulting, etc.) —
//   only its accent color moved from orange to blue. Custom properties
//   are now scoped to a `.viz-page` wrapper class instead of the bare
//   `:root`, matching the scoping convention used on every other
//   redesigned page.
//
//   No copy, schema, metadata, layout, or section structure changed —
//   only color and typography tokens.
//
//   NOTE (latest tweak): the hero eyebrow badge ("● Architectural
//   Rendering & 3D Visualization") was switched from the shared blue
//   accent to a dedicated orange (--viz-orange) so it stands out against
//   the photo banner. This is scoped to just the eyebrow badge + its
//   pulsing dot — every other blue accent on the page (rules, headings,
//   CTAs, cards, ticker) is unchanged.
// ─────────────────────────────────────────────────────────────────────────────

import RelatedInsights from '@/app/components/RelatedInsights';
import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import type { Metadata } from "next";
import Header         from "@/app/components/header";
import Footer         from "@/app/components/footer";
import Services       from "@/app/components/services";
import { ServiceHero, ServiceIntro, ServiceCluster, FeatureGrid, ProcessList, FaqList, ServiceCTA, StickyCTA } from "@/app/components/premium/service/ServiceBlocks";

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
  faqSchema,
  serviceSchema,
  jsonLdString,
} from "@/lib/schema";

const BASE_SAFE = BASE.replace(/\/$/, "");
const PAGE_CANONICAL = `${BASE_SAFE}/services/visualization`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
// Re-render at most hourly so newly published related articles appear
// without a redeploy (see RelatedInsights).
export const revalidate = 3600;

export const metadata: Metadata = {
  // Brand suffix is appended by the root layout's title template.
  title: "3D Visualization & Architectural Rendering",

  description:
    "Photorealistic architectural rendering, 3D walkthrough animation, BIM modeling and LiDAR processing for architects, developers and product designers.",

  metadataBase: new URL(BASE_SAFE),

  alternates: {
    canonical: PAGE_CANONICAL,
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-image-preview": "large",
      "max-snippet":       -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type:        "website",
    url:         PAGE_CANONICAL,
    siteName:    "99 Visual Solutions",
    locale:      "en_US",
    title:       "3D Visualization & Architectural Rendering Services | 99 Visual Solutions",
    description: "Photorealistic architectural renders, 3D walkthrough animation, CAD drafting, BIM modeling, and LiDAR processing — built in-house, delivered on a fixed production timeline.",
    images: [
      {
        url:    `${BASE_SAFE}/images/services/visualization-og.jpg`,
        width:  1200,
        height: 630,
        type:   "image/jpeg",
        alt:    "3D architectural rendering and visualization services by 99 Visual Solutions",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    title:       "3D Visualization & Architectural Rendering | 99 Visual Solutions",
    description: "Photorealistic architectural renders, CAD modeling, product visualization & 3D walkthroughs — crafted for architects, developers & designers worldwide.",
    images: [
      {
        url: `${BASE_SAFE}/images/services/visualization-og.jpg`,
        alt: "3D architectural rendering and visualization services by 99 Visual Solutions",
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
const DATE_MODIFIED  = PAGE_LAST_MODIFIED['/services/visualization']; // shared with app/sitemap.ts — edit lib/page-dates.ts

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
const vizBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",             url: `${BASE_SAFE}/` },
  { name: "Services",         url: `${BASE_SAFE}/services` },
  { name: "3D Visualization", url: PAGE_CANONICAL },
]);

const vizServiceNode = {
  ...serviceSchema({
    name:        "3D Visualization & Architectural Rendering",
    description: "Photorealistic exterior and interior architectural renders, 3D walkthrough animations, product visualization, CAD drafting, BIM modeling, and LiDAR data processing.",
    pathname:    "/services/visualization",
    image:       `${BASE_SAFE}/images/services/visualization-og.jpg`,
  }),
  "@id": `${PAGE_CANONICAL}#service`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "3D Visualization Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Architectural Exterior Rendering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Architectural Interior Rendering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Walkthrough Animation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product Visualization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CAD Drafting & Modeling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "BIM Modeling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LiDAR Data Processing" } },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FAQ — exact copy rendered visibly in <FaqSection /> below, matching schema.
// ─────────────────────────────────────────────────────────────────────────────
const vizFaqs = [
  {
    question: "What types of 3D visualization services do you offer?",
    answer:
      `We produce photorealistic exterior and interior architectural renders, 3D walkthrough animations, product visualization for manufacturing and marketing, CAD drafting, BIM modeling, and LiDAR point cloud processing. Our team works directly with architects, real estate developers, product designers, and urban planners. Email ${CONTACT_EMAIL} with your project brief and we'll respond with scope, timeline, and pricing within one business day.`,
  },
  {
    question: "How long does a typical rendering or animation project take?",
    answer:
      "A single still render is generally delivered in 3–5 business days once modeling references are confirmed. A full interior-plus-exterior package usually takes 7–10 business days. Walkthrough animations run 2–4 weeks depending on runtime, camera complexity, and revision rounds. You receive a dated production schedule before any work begins, not an estimate after the fact.",
  },
  {
    question: "Can you produce accurate renders from hand sketches or incomplete plans?",
    answer:
      `Yes. We routinely build from architectural drawing sets, DWG/DXF CAD files, PDF floor plans, hand sketches, or site reference photography. Detailed CAD files reduce modeling time and cost, but they aren't a requirement — our team can reconstruct geometry from partial documentation. Send materials to ${CONTACT_EMAIL} and we'll confirm exactly what's usable before quoting.`,
  },
  {
    question: "Which software and rendering engines does your team use?",
    answer:
      "Modeling is done in 3ds Max, SketchUp, and Revit depending on the project's source files, with rendering handled through V-Ray and Corona for photoreal stills, and Unreal Engine for real-time walkthroughs and interactive fly-throughs. This lets us match render fidelity to the project's purpose — planning submission, marketing collateral, or interactive client presentation.",
  },
  {
    question: "What file formats and resolutions do you deliver?",
    answer:
      "Stills are delivered as high-resolution JPEG or TIFF (print-ready up to A1/A0), with layered PSD files available on request for post-production flexibility. Animations are delivered as 4K MP4 (H.264) by default, with ProRes masters available for broadcast or cinema use. CAD and BIM deliverables come in DWG, DXF, RVT, or IFC as required by your workflow.",
  },
  {
    question: "How many revision rounds are included, and who owns the final files?",
    answer:
      "Every project includes two structured revision rounds at defined checkpoints — after the initial camera-angle/composition approval, and after the first color-graded render pass — so feedback is captured before final output, not after. Once final payment is made, you own full rights to the delivered visuals and source scene files if included in your package.",
  },
  {
    question: "Do you serve clients outside India?",
    answer:
      "Yes. We currently deliver projects to architecture and real estate clients across India, the USA, UK, UAE, and Australia, coordinating entirely through email, scheduled video reviews, and cloud file transfer. Time zone differences are handled with async review checkpoints so a project doesn't stall waiting on a live call.",
  },
];

const vizFaqNode = {
  ...faqSchema(vizFaqs),
  "@id":            `${PAGE_CANONICAL}#faq`,
  mainEntityOfPage: { "@id": `${PAGE_CANONICAL}#webpage` },
};

const vizPageNode = {
  "@type":       "WebPage",
  "@id":         `${PAGE_CANONICAL}#webpage`,
  url:           PAGE_CANONICAL,
  name:          "3D Visualization & Architectural Rendering | 99 Visual Solutions",
  description:   "Photorealistic architectural rendering, 3D walkthrough animation, CAD drafting, BIM modeling, and LiDAR processing for architects, developers & product designers worldwide.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE_SAFE}/#website` },
  about:         { "@id": `${BASE_SAFE}/#organization` },
  publisher:     { "@id": `${BASE_SAFE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE_SAFE}/images/services/visualization-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "3D architectural rendering and visualization services by 99 Visual Solutions",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".viz-hero__h1", ".viz-hero__sub"],
  },
  breadcrumb:      { "@id": `${PAGE_CANONICAL}#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [PAGE_CANONICAL] },
};

const vizGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  vizPageNode,
  vizBreadcrumbNode,
  vizServiceNode,
  vizFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// OFFERINGS DATA — problem → what we do → outcome, per discipline
// ─────────────────────────────────────────────────────────────────────────────
const offerings = [
  {
    id:          "exterior-rendering",
    title:       "Architectural Exterior Rendering",
    description: "Buyers and planning committees can't approve what they can't picture. We build photorealistic exterior renders — correct material specification, accurate sun-path lighting for the site's actual latitude, and true-to-scale landscaping — so a facade reads exactly as it will once built, not as an artist's impression.",
  },
  {
    id:          "interior-rendering",
    title:       "Architectural Interior Rendering",
    description: "Interior finishes are the hardest sell before construction — clients hesitate on material and lighting decisions they can't visualize. Our interior renders resolve material palettes, fixture placement, and natural-versus-artificial light balance in advance, so sign-off happens before procurement, not after a costly on-site change order.",
  },
  {
    id:          "walkthrough-animation",
    title:       "3D Walkthrough Animation",
    description: "A floor plan tells a viewer where rooms are; it doesn't tell them how a space feels to move through. Walkthrough animation choreographs camera movement through circulation paths, entry sequences, and key sightlines, giving investors and pre-sale buyers a spatial understanding that static stills can't provide.",
  },
  {
    id:          "product-visualization",
    title:       "Product Visualization",
    description: "Physical prototyping is expensive to iterate on. We render products at manufacturing-accurate scale and material finish — brushed metal, injection-molded plastic, glass, fabric — so marketing, e-commerce, and packaging teams can finalize visual direction before a single physical unit exists.",
  },
  {
    id:          "cad-drafting",
    title:       "CAD Drafting & Modeling",
    description: "Renders and construction documentation both fail without accurate underlying geometry. We produce precise 2D drafting and 3D modeling from site surveys, as-built measurements, or rough sketches, giving contractors and fabricators dimensionally reliable drawings to build from.",
  },
  {
    id:          "bim-modeling",
    title:       "BIM Modeling",
    description: "Design conflicts caught after construction starts cost far more than conflicts caught on screen. Our BIM modeling coordinates architectural, structural, and MEP elements in a shared model, surfacing clashes — a duct crossing a beam, a pipe run through a load-bearing wall — before they become change orders.",
  },
  {
    id:          "lidar-processing",
    title:       "LiDAR Data Processing",
    description: "Renovation and heritage projects often start with no reliable as-built documentation. We process raw LiDAR point cloud scans into clean, usable 3D models and CAD drawings, giving renovation teams accurate existing-condition data instead of decades-old drawings that no longer match the building.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// WHO THIS SERVICE IS FOR
// ─────────────────────────────────────────────────────────────────────────────
const audiences = [
  {
    id:    "architects",
    title: "Architecture & Design Studios",
    desc:  "Need client-ready visuals for design review meetings and planning submissions before a design is locked, without pulling design staff off active project work to build renders internally.",
  },
  {
    id:    "developers",
    title: "Real Estate Developers",
    desc:  "Need pre-construction marketing visuals — exterior hero shots, interior unit renders, walkthrough animation — to open pre-sales and secure early bookings before the first slab is poured.",
  },
  {
    id:    "agents",
    title: "Real Estate Marketing Teams",
    desc:  "Need a consistent library of high-resolution stills and animation clips for brochures, listing pages, and social campaigns that match the finished product, not a stock-photo approximation.",
  },
  {
    id:    "manufacturers",
    title: "Product Designers & Manufacturers",
    desc:  "Need accurate product renders for catalogs, e-commerce listings, and packaging design before tooling or physical prototypes are finalized, so marketing timelines don't wait on production timelines.",
  },
  {
    id:    "contractors",
    title: "Contractors & Renovation Firms",
    desc:  "Need reliable as-built documentation — from CAD drafting or LiDAR scan processing — for buildings where original drawings are missing, outdated, or don't match current site conditions.",
  },
  {
    id:    "planners",
    title: "Urban Planners & Public Agencies",
    desc:  "Need clear, community-facing visuals of proposed developments for public consultation and planning board presentations, where technical drawings alone don't communicate scale or impact.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTION WORKFLOW
// ─────────────────────────────────────────────────────────────────────────────
const processSteps = [
  {
    step:  "01",
    title: "Brief & Scope Confirmation",
    desc:  "We review your drawings, references, and intended use case — planning submission, marketing, or internal review — and confirm camera angles, deliverable formats, and a dated production schedule before work starts.",
  },
  {
    step:  "02",
    title: "Reference Collation & Base Modeling",
    desc:  "CAD files, drawing sets, site photography, or LiDAR scans are consolidated into an accurate 3D base model, resolving dimensional discrepancies before any texturing or lighting begins.",
  },
  {
    step:  "03",
    title: "Materials, Texturing & Lighting",
    desc:  "Material specifications, finishes, and site-accurate lighting (sun-path for exteriors, fixture layout for interiors) are applied so the render reflects real construction specification rather than generic stock materials.",
  },
  {
    step:  "04",
    title: "First Review Checkpoint",
    desc:  "A draft render or animatic is shared for composition and camera-angle sign-off. This is the first of two included revision rounds, catching structural feedback before final rendering time is spent.",
  },
  {
    step:  "05",
    title: "Final Render & Color Grade",
    desc:  "Approved scenes go through final high-resolution rendering and post-production color grading, with the second revision round reserved for finishing notes rather than structural changes.",
  },
  {
    step:  "06",
    title: "Delivery & Handover",
    desc:  "Final files are delivered in the agreed formats and resolutions, with source scene files and CAD/BIM data included where specified in scope.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BENEFITS / ROI
// ─────────────────────────────────────────────────────────────────────────────
const benefits = [
  {
    title: "Faster Pre-Sales Cycles",
    desc:  "Developers open bookings against finished-quality visuals during construction instead of waiting for a show unit or completed structure, compressing the sales timeline by months.",
  },
  {
    title: "Fewer Costly Change Orders",
    desc:  "Material and lighting decisions get resolved on screen before procurement and construction, and BIM clash detection catches coordination conflicts before they reach the site.",
  },
  {
    title: "Higher-Converting Marketing Assets",
    desc:  "Photoreal stills and walkthrough animation outperform floor plans and mood boards in listing engagement, giving marketing teams assets that hold up across print, web, and social formats.",
  },
  {
    title: "Faster Planning Approvals",
    desc:  "Clear, accurate exterior visualization gives planning committees and public consultations a realistic basis for review, reducing back-and-forth caused by ambiguous technical drawings.",
  },
  {
    title: "Reliable As-Built Data",
    desc:  "LiDAR-processed point clouds and CAD drafting give renovation and heritage teams dimensionally accurate existing-condition data, removing guesswork from scope estimation.",
  },
];


// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function VisualizationPage() {
  return (
    <>
      <script
        id="schema-visualization-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(vizGraph) }}
      />
      <div className="vz">
        <Header />
        <main id="main">
          <ServiceHero
            id="viz-hero-heading"
            crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/services/visualization", label: "3D Visualization" }]}
            title="Architectural Rendering & 3D Visualization"
            tagline={<>See it before it&apos;s <em>built</em></>}
            sub="Photorealistic architectural rendering, walkthrough animation, and product visualization for teams who need buyers, planners, and stakeholders to say yes before construction starts — not after."
            image="/images/services/visualization-hero-banner.jpg"
            imageAlt="Photorealistic architectural visualization of a modern building"
            ctaLabel="Request a Project Quote"
            ctaAria="Request a project quote for 3D visualization services from 99 Visual Solutions"
            postTitle="3D Visualization"
            postUrl={PAGE_CANONICAL}
            secondary={{ href: "#viz-offerings", label: "What we deliver" }}
            points={["Exterior & interior renders", "Walkthrough animation", "Product visualization", "CAD, BIM & LiDAR"]}
          />

          <ServiceIntro id="viz-intro-heading" eyebrow="The Problem We Solve" title={<>Decisions get delayed when people can&apos;t <em>picture the outcome</em></>}>
            <p className="vz-lead">
              A floor plan communicates dimensions. It doesn&apos;t communicate what a lobby feels like at golden hour, whether a facade material reads as premium from the street, or whether a proposed tower actually fits its skyline context. That gap is where projects stall — buyers hesitate, planning committees ask for clarification, and stakeholders delay sign-off because the drawings alone don&apos;t answer their real question: <em>what will this actually look like?</em>
            </p>
            <p>
              <strong>99 Visual Solutions</strong> closes that gap with photorealistic rendering, walkthrough animation, and precision 3D modeling built in-house — from CAD files, drawing sets, hand sketches, or LiDAR scans — so architects, developers, and product designers can put a decision in front of the people who need to approve it, months before ground is broken or a physical prototype exists.
            </p>
          </ServiceIntro>

          <FeatureGrid
            id="viz-who-heading"
            eyebrow="Who This Is Built For"
            title={<>Built for teams who need a decision made <em>on time</em></>}
            items={audiences.map((a) => ({ title: a.title, description: a.desc }))}
            surface
          />

          <div id="viz-offerings">
            <ServiceCluster
              id="viz-offerings-heading"
              eyebrow="What We Deliver"
              title={<>Seven disciplines, one <em>production team</em></>}
              items={offerings.map((o) => ({ id: o.id, title: o.title, description: o.description }))}
              columns={3}
            />
          </div>

          <div id="services" className="vz-legacy-portfolio">
            <Services />
          </div>

          <ProcessList
            id="viz-process-heading"
            eyebrow="How A Project Runs"
            title={<>From CAD file to final delivery — <em>six stages</em></>}
            steps={processSteps.map((s) => ({ title: s.title, description: s.desc }))}
          />

          <FeatureGrid
            id="viz-benefits-heading"
            eyebrow="Business Impact"
            title={<>What accurate visualization actually <em>changes</em></>}
            items={benefits.map((b) => ({ title: b.title, description: b.desc }))}
            numbered
            surface
          />

          <FaqList
            id="viz-faq-heading"
            title="Common questions"
            faqs={vizFaqs.map((f) => ({ q: f.question, a: <p>{f.answer}</p> }))}
          />

          <ServiceCTA
            id="viz-cta-heading"
            title={<>Have drawings ready? Let&apos;s <em>visualize</em> them.</>}
            sub="Share your CAD files, drawing sets or sketches and the deliverables you need. We reply with a scope, camera list and a dated production schedule."
            ctaLabel="Request a Project Quote"
            postTitle="3D Visualization"
            postUrl={PAGE_CANONICAL}
          />
          <RelatedInsights serviceHref="/services/visualization" />
        </main>
        <Footer />
        <StickyCTA postTitle="3D Visualization" postUrl={PAGE_CANONICAL} label="Request a Quote" />
      </div>
    </>
  );
}
