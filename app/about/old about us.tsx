import type { Metadata } from "next";
import Script from "next/script";
import Header from "../components/header";
import Footer from "../components/footer";
import TabAbout from "../components/tabstory";
import WhyChooseUs from "../components/whychooseus";
import DataPrivacy from "../components/dataprivacy";

export const metadata: Metadata = {
  title: "About 99 Visual | IT, Web & 3D Visualization Company in Bangalore, India",
  description:
    "99 Visual is a Bangalore-based IT solutions company specializing in web development, SEO, digital marketing, 3D visualization, CAD/GIS, and QA testing.",
  metadataBase: new URL("https://www.99visual.com"),
  alternates: { canonical: "/about" },
};


// ✅ Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.99visual.com/#organization",
  name: "99Visual",
  alternateName: "99 Visual Solutions",
  url: "https://www.99visual.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.99visual.com/images/logo.png",
  },
  foundingDate: "2015",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [
    "https://twitter.com/99visual",
    "https://www.linkedin.com/company/99visual",
    "https://www.instagram.com/99visual",
  ],
};


// ✅ Website Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.99visual.com/#website",
  url: "https://www.99visual.com",
  name: "99Visual",
  publisher: {
    "@id": "https://www.99visual.com/#organization",
  },
};


// ✅ WebPage Schema
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.99visual.com/about#webpage",
  url: "https://www.99visual.com/about",
  name: "About 99Visual",
  isPartOf: {
    "@id": "https://www.99visual.com/#website",
  },
  about: {
    "@id": "https://www.99visual.com/#organization",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.99visual.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://www.99visual.com/about",
      },
    ],
  },
};


export default function AboutPage() {
  return (
    <>
      {/* ✅ JSON-LD */}
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <Header />

      {/* ✅ Hero Section */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            About <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We turn bold ideas into powerful digital experiences through web development, SEO, and advanced visualization.
          </p>
        </div>

        {/* ✅ FIXED BUTTON */}
        <a
          href="#about-content"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 arrowSwing z-20 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-orange-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </section>

      <div id="about-content">
        <TabAbout />
        <WhyChooseUs />
        <DataPrivacy />
      </div>

      <Footer />
    </>
  );
}