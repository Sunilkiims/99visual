import Header from "@/app/components/header";
import Seriously from "@/app/components/seriously";
import Footer from "@/app/components/footer";
import Services from "@/app/components/services";

/* =====================================================
SEO METADATA
===================================================== */
import type { Metadata } from "next";

export const metadata: Metadata = {
  // ── Title ──────────────────────────────────────────────────────────────────
  // Under 60 chars · Primary keyword first · Brand at end
  title: "3D Visualization & Architectural Rendering Services | 99 Visual",

  // ── Description ────────────────────────────────────────────────────────────
  // 150–160 chars · Action-oriented · Includes primary keywords & CTA
  description:
    "Expert 3D visualization, architectural rendering, CAD modeling, and walkthrough animations. Helping architects, developers & designers make confident decisions with stunning visuals.",

  // ── Canonical ──────────────────────────────────────────────────────────────
  // Prevents duplicate-content penalties
  alternates: {
    canonical: "https://www.99visual.com/services/visualization",
  },

  // ── Metadata Base ──────────────────────────────────────────────────────────
  metadataBase: new URL("https://www.99visual.com"),

  // ── Robots ─────────────────────────────────────────────────────────────────
  // Explicitly allow indexing and link-following
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

  // ── Keywords ───────────────────────────────────────────────────────────────
  // Grouped by intent · Avoid stuffing · Prioritise high-value terms
  keywords: [
    // Core services
    "3D visualization services",
    "architectural rendering services",
    "CAD modeling services",
    "3D walkthrough animation",
    "photorealistic rendering",
    "product visualization",

    // Architectural
    "exterior architectural rendering",
    "interior architectural rendering",
    "real estate 3D visualization",
    "building rendering services",
    "construction visualization",
    "architectural visualization studio",

    // CAD & Product
    "3D CAD design services",
    "product design rendering",
    "industrial 3D rendering",
    "mechanical CAD modeling",

    // Audience
    "3D rendering for architects",
    "3D rendering for real estate developers",
    "3D rendering for product designers",

    // Brand
    "99 Visual Solutions",
    "99 Visual",
  ],

  // ── Open Graph ─────────────────────────────────────────────────────────────
  // Controls how the page appears when shared on LinkedIn, Facebook, WhatsApp, etc.
  openGraph: {
    type: "website",
    url: "https://www.99visual.com/services/visualization",
    siteName: "99 Visual Solutions",
    locale: "en_US",

    // OG title: can be slightly longer than the <title> tag — up to ~90 chars
    title: "3D Visualization & Architectural Rendering Services | 99 Visual Solutions",

    // OG description: up to 200 chars for social previews
    description:
      "From photorealistic architectural renders and 3D walkthroughs to precision CAD modeling and product visualization — 99 Visual Solutions turns your concepts into stunning visual realities.",

    images: [
      {
        url: "https://www.99visual.com/images/services/visualization-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "3D architectural rendering and visualization services by 99 Visual Solutions",
      },
    ],
  },

  // ── Twitter / X Card ───────────────────────────────────────────────────────
  // summary_large_image gives the full-width preview card
  twitter: {
    card: "summary_large_image",
    site: "@99visual",        // ← fixed: removed the space in the handle
    creator: "@99visual",     // ← fixed: removed the space in the handle
    title: "3D Visualization & Architectural Rendering Services | 99 Visual Solutions",
    description:
      "Photorealistic architectural renders, CAD modeling, product visualization & 3D walkthroughs — crafted for architects, developers & designers worldwide.",
    images: {
      url: "https://www.99visual.com/images/services/visualization-og.jpg",
      alt: "3D architectural rendering and visualization services by 99 Visual Solutions",
    },
  },

  // ── Structured Data (JSON-LD) ──────────────────────────────────────────────
  // Helps Google display rich results (service cards, breadcrumbs, etc.)
  // Add this inside your <head> via a <script> tag in layout.tsx or using
  // Next.js Script component. Example schema below:
  //
  // {
  //   "@context": "https://schema.org",
  //   "@type": "ProfessionalService",
  //   "name": "99 Visual Solutions",
  //   "url": "https://www.99visual.com",
  //   "description": "3D visualization, architectural rendering, CAD modeling and walkthrough animations.",
  //   "serviceType": ["3D Visualization", "Architectural Rendering", "CAD Modeling", "Product Visualization"],
  //   "areaServed": "Worldwide",
  //   "image": "https://www.99visual.com/images/services/visualization-og.jpg"
  // }
};

/* =====================================================
HERO SECTION COMPONENT
===================================================== */

function HeroSection() {
  return (
    <section className="relative py-24 text-center overflow-hidden bg-black text-white">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-4">

        <h1 className="text-2xl md:text-4xl font-bold mb-6">
          Visualization <span className="text-orange-500">Services</span>
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          We transform ideas, drawings and concepts into immersive visual experiences that drive clarity, confidence and decisions.
        </p>

        <a
          href="#architecture"
          className="inline-block mt-8 bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Explore Our Services
        </a>

      </div>

      {/* 🔽 Arrow Swing Scroll Indicator */}
      <a
        href="#architecture"
        className="absolute bottom-6 left-1/2 arrowSwing"
        style={{ transform: "translateX(-50%)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>

    </section>
  );
}

/* =====================================================
PAGE COMPONENT
===================================================== */

export default function DigitalMarketingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <Services />
      <Seriously />
      <Footer />
    </>
  );
}