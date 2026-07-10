// app/services/visualization/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// 3D Visualization & Architectural Rendering — 99 Visual Solutions
//
// THIS REVISION: Hero background updated to a full-bleed photo banner
//   (sunset villa/infinity-pool image) with a dark gradient overlay so
//   text stays readable. Right-column product-shot image removed since
//   the banner now carries the visual. Everything else (layout of other
//   sections, image, other sections, schema, SEO, written content) is
//   unchanged from the previous revision.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image          from "next/image";
import Header         from "@/app/components/header";
import Seriously      from "@/app/components/seriously";
import Footer         from "@/app/components/footer";
import Services       from "@/app/components/services";
import ContactCTA     from "@/app/components/Contactcta";
import ScrollDown     from "@/app/components/scrolldown";
import Chatbot        from "@/app/components/chatbot";
import Whatsappbutton from "@/app/components/wahtsappbutton";

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
} from "@/lib/schema";

const BASE_SAFE = BASE.replace(/\/$/, "");
const PAGE_CANONICAL = `${BASE_SAFE}/services/visualization`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "3D Visualization & Architectural Rendering | 99 Visual",

  description:
    "Photorealistic architectural rendering, 3D walkthrough animation, CAD drafting, BIM modeling, and LiDAR point cloud processing for architects, developers, and product designers. In-house team, transparent revision cycles, fixed turnaround.",

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

  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "" },
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
const DATE_MODIFIED  = "2025-06-01"; // ← Update this when content changes

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
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="viz-hero"
      aria-labelledby="viz-hero-heading"
      id="viz-hero"
    >
      <div aria-hidden="true">
        <div className="viz-hero__grain" />
      </div>

      <div className="viz-corner viz-corner--tl" aria-hidden="true" />
      <div className="viz-corner viz-corner--tr" aria-hidden="true" />
      <div className="viz-corner viz-corner--bl" aria-hidden="true" />
      <div className="viz-corner viz-corner--br" aria-hidden="true" />

      <nav className="viz-sr-only" aria-label="Breadcrumb">
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="/" itemProp="item"><span itemProp="name">Home</span></a>
            <meta itemProp="position" content="1" />
          </li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="/services" itemProp="item"><span itemProp="name">Services</span></a>
            <meta itemProp="position" content="2" />
          </li>
          <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
            <a href="/services/visualization" itemProp="item" aria-current="page">
              <span itemProp="name">3D Visualization</span>
            </a>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/*
        Hero content now sits on top of a full-bleed photo banner
        (set as the section's CSS background — see .viz-hero in <style>
        below) instead of the previous two-column layout with a separate
        product-shot image. A dark gradient overlay (also in CSS) keeps
        the white/orange text legible over the photo.
      */}
      <div className="viz-hero__inner">
        <div className="viz-hero__content">
          <p className="viz-hero__eyebrow" aria-hidden="true">
            <span className="viz-hero__dot" />
            Architectural Rendering & 3D Visualization
          </p>

          <h1 className="viz-hero__h1" id="viz-hero-heading">
            See it before<br />
            it's <em>built</em>
          </h1>

          <div className="viz-hero__rule" aria-hidden="true" />

          <p className="viz-hero__sub">
            Photorealistic architectural rendering, walkthrough animation, and
            product visualization for teams who need buyers, planners, and
            stakeholders to say yes before construction starts — not after.
          </p>

          <a
            href="/contact"
            className="viz-hero__cta"
            aria-label="Request a project quote for 3D visualization services from 99 Visual Solutions"
          >
            Request a Project Quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTRO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function IntroSection() {
  return (
    <section className="viz-intro" aria-labelledby="viz-intro-heading">
      <div className="viz-intro__inner">
        <span className="viz-intro__label">The Problem We Solve</span>
        <h2 className="viz-intro__h2" id="viz-intro-heading">
          Decisions get delayed when<br />people can't <em>picture the outcome</em>
        </h2>
        <div className="viz-intro__rule" aria-hidden="true" />
        <p className="viz-intro__p">
          A floor plan communicates dimensions. It doesn't communicate what a
          lobby feels like at golden hour, whether a facade material reads as
          premium from the street, or whether a proposed tower actually fits
          its skyline context. That gap is where projects stall — buyers hesitate,
          planning committees ask for clarification, and stakeholders delay
          sign-off because the drawings alone don't answer their real question:
          <em> what will this actually look like?</em>
        </p>
        <p className="viz-intro__p">
          <strong>99 Visual Solutions</strong> closes that gap with photorealistic
          rendering, walkthrough animation, and precision 3D modeling built
          in-house — from CAD files, drawing sets, hand sketches, or LiDAR scans
          — so architects, developers, and product designers can put a decision
          in front of the people who need to approve it, months before ground is
          broken or a physical prototype exists.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function WhoSection() {
  return (
    <section className="viz-who" aria-labelledby="viz-who-heading" id="viz-who">
      <div className="viz-who__inner">
        <div className="viz-who__head">
          <span className="viz-who__label">Who This Is Built For</span>
          <h2 className="viz-who__h2" id="viz-who-heading">
            Built for teams who need<br />a decision made <em>on time</em>
          </h2>
          <div className="viz-who__rule" aria-hidden="true" />
        </div>
        <div className="viz-who__grid">
          {audiences.map((a) => (
            <div className="viz-who-card" key={a.id}>
              <h3 className="viz-who-card__title">{a.title}</h3>
              <p className="viz-who-card__desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OFFERINGS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function OfferingsSection() {
  return (
    <section className="viz-offerings" aria-labelledby="viz-offerings-heading" id="viz-offerings">
      <div className="viz-offerings__inner">
        <div className="viz-offerings__head">
          <span className="viz-offerings__label">What We Deliver</span>
          <h2 className="viz-offerings__h2" id="viz-offerings-heading">
            Seven disciplines,<br />one <em>production team</em>
          </h2>
          <div className="viz-offerings__rule" aria-hidden="true" />
        </div>
        <div className="viz-offerings__grid">
          {offerings.map((o) => (
            <div className="viz-offering-card" key={o.id} id={o.id}>
              <h3 className="viz-offering-card__title">{o.title}</h3>
              <p className="viz-offering-card__desc">{o.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function ProcessSection() {
  return (
    <section className="viz-process" aria-labelledby="viz-process-heading" id="viz-process">
      <div className="viz-process__inner">
        <div className="viz-process__head">
          <span className="viz-process__label">How A Project Runs</span>
          <h2 className="viz-process__h2" id="viz-process-heading">
            From CAD file to<br />final delivery — <em>six stages</em>
          </h2>
          <div className="viz-process__rule" aria-hidden="true" />
        </div>
        <div className="viz-process__list">
          {processSteps.map((s) => (
            <div className="viz-process-item" key={s.step}>
              <span className="viz-process-item__num">{s.step}</span>
              <div>
                <h3 className="viz-process-item__title">{s.title}</h3>
                <p className="viz-process-item__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BENEFITS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function BenefitsSection() {
  return (
    <section className="viz-benefits" aria-labelledby="viz-benefits-heading" id="viz-benefits">
      <div className="viz-benefits__inner">
        <div className="viz-benefits__head">
          <span className="viz-benefits__label">Business Impact</span>
          <h2 className="viz-benefits__h2" id="viz-benefits-heading">
            What accurate visualization<br />actually <em>changes</em>
          </h2>
          <div className="viz-benefits__rule" aria-hidden="true" />
        </div>
        <div className="viz-benefits__grid">
          {benefits.map((b) => (
            <div className="viz-benefit-card" key={b.title}>
              <h3 className="viz-benefit-card__title">{b.title}</h3>
              <p className="viz-benefit-card__desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ SECTION
// ─────────────────────────────────────────────────────────────────────────────
function FaqSection() {
  return (
    <section className="viz-faq" aria-labelledby="viz-faq-heading" id="viz-faq">
      <div className="viz-faq__inner">
        <div className="viz-faq__head">
          <span className="viz-faq__label">FAQ</span>
          <h2 className="viz-faq__h2" id="viz-faq-heading">
            Common <em>questions</em>
          </h2>
          <div className="viz-faq__rule" aria-hidden="true" />
        </div>
        <div className="viz-faq__list">
          {vizFaqs.map((f) => (
            <div className="viz-faq-item" key={f.question}>
              <h3 className="viz-faq-item__q">{f.question}</h3>
              <p className="viz-faq-item__a">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function VisualizationPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-muted:   rgba(255,255,255,0.45);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        .viz-sr-only {
          position:absolute!important;width:1px!important;height:1px!important;
          padding:0!important;margin:-1px!important;overflow:hidden!important;
          clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;
        }

        /* ══ HERO ════════════════════════════════════════════════════════
           Full-bleed photo banner as the background, with a dark
           left-to-right + top-to-bottom gradient overlay so the text
           column stays legible over the photo. Swap the url() below for
           your saved banner file path. */
        .viz-hero {
          position:relative;min-height:90vh;display:flex;align-items:center;
          background:
            linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.42) 64%, rgba(8,8,8,.18) 100%),
            linear-gradient(180deg, rgba(8,8,8,.20) 0%, rgba(8,8,8,.10) 40%, rgba(8,8,8,.55) 100%),
            url('/images/services/visualization-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#080808;
          overflow:hidden;padding:8rem 1.5rem 6rem;
        }
        /* Modern browsers: use dynamic viewport height so mobile browser
           chrome (address bar show/hide) doesn't cause the hero to jump
           or leave a gap. Falls back silently on older browsers. */
        @supports (min-height: 100svh) {
          .viz-hero { min-height: 90svh; }
        }
        /* Tablet & mobile: the two-way horizontal gradient above is tuned
           for a wide viewport with left-aligned text over a visible right
           side of the photo. Below 960px the text column centers and can
           span the full width, so swap to a more uniform top-to-bottom
           overlay that keeps the whole banner legible behind centered
           text at any crop position. */
        @media(max-width:960px){
          .viz-hero {
            background:
              linear-gradient(180deg, rgba(8,8,8,.60) 0%, rgba(8,8,8,.38) 38%, rgba(8,8,8,.82) 100%),
              linear-gradient(0deg, rgba(8,8,8,.30), rgba(8,8,8,.30)),
              url('/images/services/visualization-hero-banner.jpg') center center / cover no-repeat;
            min-height:auto;
            padding:7rem 1.25rem 4.5rem;
          }
        }
        @media(max-width:640px){
          .viz-hero { padding:6.5rem 1rem 4rem; }
        }
        @media(max-width:960px) and (orientation:landscape){
          .viz-hero { min-height:100vh;padding-top:5.5rem;padding-bottom:3rem; }
        }
        .viz-hero__grain{position:absolute;inset:0;opacity:.025;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .viz-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.2;pointer-events:none;}
        .viz-corner--tl{top:24px;left:24px;border-top:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .viz-corner--tr{top:24px;right:24px;border-top:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}
        /* nudged up from the standard bottom offset to clear a bottom-left chatbot launcher icon */
        .viz-corner--bl{bottom:112px;left:260px;border-bottom:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        @media(max-width:480px){ .viz-corner--bl{ left:24px; } }
        .viz-corner--br{bottom:64px;right:24px;border-bottom:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}

        /* Hero content column — sits on top of the photo banner background.
           Single column now (no right-side product image); text is capped
           to a comfortable reading width so it doesn't stretch across the
           whole photo. */
        .viz-hero__inner{
          position:relative;z-index:10;max-width:1280px;margin:0 auto;width:100%;
          display:grid;grid-template-columns:1fr;
        }

        .viz-hero__content{animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:620px;}
        @keyframes vizFadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.viz-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .viz-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.07);padding:6px 16px;border-radius:100px;margin-bottom:1.8rem;backdrop-filter:blur(8px);animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .viz-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--c-orange);animation:vizPulse 2s ease-in-out infinite;}
        @keyframes vizPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .viz-hero__h1{font-family:var(--ff-serif);font-size:clamp(1.9rem,3.6vw,3.1rem);font-weight:700;line-height:1.16;letter-spacing:-.01em;color:#fff;margin:0 0 .9rem;animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .viz-hero__h1 em{font-style:italic;color:var(--c-orange);}
        .viz-hero__rule{width:40px;height:1px;background:linear-gradient(90deg,var(--c-orange),transparent);margin:0 0 1.2rem;animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.viz-hero__rule{margin:0 auto 1.2rem;background:linear-gradient(90deg,transparent,var(--c-orange),transparent);}}
        .viz-hero__sub{font-family:var(--ff-sans);font-size:clamp(.86rem,1.2vw,.98rem);font-weight:300;line-height:1.75;color:rgba(255,255,255,0.75);max-width:520px;margin:0 0 2.2rem;animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.viz-hero__sub{margin:0 auto 2.2rem;}}
        .viz-hero__cta{display:inline-flex;align-items:center;gap:9px;font-family:var(--ff-sans);font-size:10.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#080808;background:linear-gradient(135deg,#fb923c,#f97316);padding:12px 28px;border-radius:100px;text-decoration:none;box-shadow:0 8px 32px rgba(249,115,22,.35);transition:transform .2s ease,box-shadow .2s ease;animation:vizFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        .viz-hero__cta:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 40px rgba(249,115,22,.5);}

        /* ══ INTRO ═══════════════════════════════════════════════════════ */
        .viz-intro{background:#0f0f0f;border-bottom:1px solid rgba(255,255,255,0.07);padding:5.5rem 1.5rem;}
        .viz-intro__inner{max-width:860px;margin:0 auto;text-align:center;}
        .viz-intro__label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);margin-bottom:1.2rem;display:block;}
        .viz-intro__h2{font-family:var(--ff-serif);font-size:clamp(1.9rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1.5rem;}
        .viz-intro__h2 em{font-style:italic;color:var(--c-orange);}
        .viz-intro__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--c-orange),transparent);margin:0 auto 1.8rem;}
        .viz-intro__p{font-family:var(--ff-sans);font-size:1rem;font-weight:300;line-height:1.85;color:var(--c-muted);max-width:680px;margin:0 auto .9rem;}
        .viz-intro__p strong{color:rgba(255,255,255,0.65);font-weight:500;}
        .viz-intro__p em{color:var(--c-orange);font-style:italic;}

        /* ══ WHO ═════════════════════════════════════════════════════════ */
        .viz-who{background:#080808;padding:6rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);}
        .viz-who__inner{max-width:1200px;margin:0 auto;}
        .viz-who__head{text-align:center;margin-bottom:3.5rem;}
        .viz-who__label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);margin-bottom:1rem;display:block;}
        .viz-who__h2{font-family:var(--ff-serif);font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .viz-who__h2 em{font-style:italic;color:var(--c-orange);}
        .viz-who__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--c-orange),transparent);margin:0 auto;}
        .viz-who__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        @media(max-width:1024px){.viz-who__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.viz-who__grid{grid-template-columns:1fr;}}
        .viz-who-card{background:#141414;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:2rem 1.75rem;transition:border-color .25s ease,transform .25s ease;}
        .viz-who-card:hover{border-color:rgba(249,115,22,.25);transform:translateY(-4px);}
        .viz-who-card__title{font-family:var(--ff-sans);font-size:.95rem;font-weight:600;color:#fff;margin-bottom:.6rem;}
        .viz-who-card__desc{font-family:var(--ff-sans);font-size:.85rem;font-weight:300;line-height:1.75;color:var(--c-muted);}

        /* ══ OFFERINGS ═══════════════════════════════════════════════════ */
        .viz-offerings{background:#0f0f0f;padding:6rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);}
        .viz-offerings__inner{max-width:1200px;margin:0 auto;}
        .viz-offerings__head{text-align:center;margin-bottom:3.5rem;}
        .viz-offerings__label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);margin-bottom:1rem;display:block;}
        .viz-offerings__h2{font-family:var(--ff-serif);font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .viz-offerings__h2 em{font-style:italic;color:var(--c-orange);}
        .viz-offerings__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--c-orange),transparent);margin:0 auto;}
        .viz-offerings__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        @media(max-width:1024px){.viz-offerings__grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.viz-offerings__grid{grid-template-columns:1fr;}}
        .viz-offering-card{background:#141414;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:2rem 1.75rem;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;position:relative;overflow:hidden;}
        .viz-offering-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(249,115,22,.5),transparent);opacity:0;transition:opacity .25s ease;}
        .viz-offering-card:hover{border-color:rgba(249,115,22,.25);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4);}
        .viz-offering-card:hover::before{opacity:1;}
        .viz-offering-card__title{font-family:var(--ff-sans);font-size:.95rem;font-weight:600;color:#fff;margin-bottom:.6rem;}
        .viz-offering-card__desc{font-family:var(--ff-sans);font-size:.85rem;font-weight:300;line-height:1.75;color:var(--c-muted);}

        /* ══ PROCESS ═════════════════════════════════════════════════════ */
        .viz-process{background:#080808;padding:6rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);}
        .viz-process__inner{max-width:820px;margin:0 auto;}
        .viz-process__head{text-align:center;margin-bottom:3.5rem;}
        .viz-process__label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);margin-bottom:1rem;display:block;}
        .viz-process__h2{font-family:var(--ff-serif);font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .viz-process__h2 em{font-style:italic;color:var(--c-orange);}
        .viz-process__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--c-orange),transparent);margin:0 auto;}
        .viz-process__list{display:flex;flex-direction:column;gap:0;}
        .viz-process-item{display:flex;gap:1.75rem;padding:1.75rem 0;border-bottom:1px solid rgba(255,255,255,0.06);}
        .viz-process-item:last-child{border-bottom:none;}
        .viz-process-item__num{font-family:var(--ff-serif);font-size:1.8rem;font-weight:700;color:var(--c-orange);opacity:.55;min-width:44px;flex-shrink:0;}
        .viz-process-item__title{font-family:var(--ff-sans);font-size:.95rem;font-weight:600;color:#fff;margin:0 0 .5rem;}
        .viz-process-item__desc{font-family:var(--ff-sans);font-size:.85rem;font-weight:300;line-height:1.75;color:var(--c-muted);margin:0;}

        /* ══ BENEFITS ════════════════════════════════════════════════════ */
        .viz-benefits{background:#0f0f0f;padding:6rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06);}
        .viz-benefits__inner{max-width:1100px;margin:0 auto;}
        .viz-benefits__head{text-align:center;margin-bottom:3.5rem;}
        .viz-benefits__label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);margin-bottom:1rem;display:block;}
        .viz-benefits__h2{font-family:var(--ff-serif);font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.15;letter-spacing:-.015em;color:#fff;margin:0 0 1rem;}
        .viz-benefits__h2 em{font-style:italic;color:var(--c-orange);}
        .viz-benefits__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--c-orange),transparent);margin:0 auto;}
        .viz-benefits__grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;}
        @media(max-width:768px){.viz-benefits__grid{grid-template-columns:1fr;}}
        .viz-benefit-card{background:#141414;border:1px solid rgba(255,255,255,0.07);border-left:2px solid var(--c-orange);border-radius:12px;padding:1.75rem;}
        .viz-benefit-card__title{font-family:var(--ff-sans);font-size:.95rem;font-weight:600;color:#fff;margin-bottom:.6rem;}
        .viz-benefit-card__desc{font-family:var(--ff-sans);font-size:.85rem;font-weight:300;line-height:1.75;color:var(--c-muted);}

        /* ══ FAQ ═════════════════════════════════════════════════════════ */
        .viz-faq{background:#080808;border-bottom:1px solid rgba(255,255,255,0.07);padding:6rem 1.5rem;}
        .viz-faq__inner{max-width:820px;margin:0 auto;}
        .viz-faq__head{text-align:center;margin-bottom:3rem;}
        .viz-faq__label{font-family:var(--ff-sans);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);margin-bottom:1rem;display:block;}
        .viz-faq__h2{font-family:var(--ff-serif);font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;line-height:1.15;color:#fff;margin:0 0 1rem;}
        .viz-faq__h2 em{font-style:italic;color:var(--c-orange);}
        .viz-faq__rule{width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--c-orange),transparent);margin:0 auto;}
        .viz-faq__list{display:flex;flex-direction:column;gap:1.25rem;}
        .viz-faq-item{background:#141414;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:1.6rem 1.8rem;}
        .viz-faq-item__q{font-family:var(--ff-sans);font-size:.98rem;font-weight:600;color:#fff;margin:0 0 .7rem;}
        .viz-faq-item__a{font-family:var(--ff-sans);font-size:.88rem;font-weight:300;line-height:1.8;color:var(--c-muted);margin:0;}

        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
      `}</style>

      <Header />

      <script
        id="schema-visualization-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vizGraph) }}
      />

      <HeroSection />

      <IntroSection />

      <WhoSection />

      <OfferingsSection />

      <div id="services">
        <Services />
      </div>

      <ProcessSection />

      <BenefitsSection />

      <FaqSection />

      <Seriously />
      <ContactCTA />
      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}