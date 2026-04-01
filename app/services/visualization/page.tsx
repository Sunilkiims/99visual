import Header from "@/app/components/header";
import Seriously from "@/app/components/seriously";
import Footer from "@/app/components/footer";
import Services from "@/app/components/services";

/* =====================================================
SEO METADATA
===================================================== */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Visualization Services | Architectural Rendering, CAD & Animation - 99Visual Solutions",
  
  description:
    "Transform ideas into reality with 99Visual’s 3D visualization services including architectural rendering, CAD modeling, photorealistic renders, walkthroughs, and product visualization. Boost project presentations and client engagement.",
  
  keywords: [
    "3D Visualization Services",
    "Architectural Rendering Services",
    "3D Rendering Company",
    "CAD Modeling Services",
    "3D Walkthrough Animation",
    "Photorealistic Rendering",
    "Product Visualization",
    "Exterior Interior Rendering",
    "Real Estate Visualization",
    "3D Design Services India",
    "Visualization Studio",
    "99Visual Solutions"
  ],

  openGraph: {
    title: "3D Visualization & Rendering Services - 99Visual Solutions",
    description:
      "High-quality 3D rendering, architectural visualization, CAD modeling, and animation services to elevate your projects and presentations.",
    url: "https://www.99visual.com/services/visualization",
    siteName: "99Visual",
    images: [
      {
        url: "https://www.99visual.com/images/services/visualization-og.jpg",
        width: 1200,
        height: 630,
        alt: "3D Visualization Services by 99Visual",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "3D Visualization Services | 99 Visual Solutions",
    description:
      "Architectural rendering, CAD modeling, and 3D animation services designed to impress clients and win projects.",
    site: "@99visual",
    creator: "@99visual",
    images: [
      "https://www.99visual.com/images/services/visualization-og.jpg",
    ],
  },

  metadataBase: new URL("https://www.99visual.com"),

  alternates: {
    canonical: "/services/visualization",
  },
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