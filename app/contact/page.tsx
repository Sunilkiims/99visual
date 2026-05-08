// app/contact/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Contact page — 99 Visual Solutions
//
// Animation upgrade:
//   ✅ Orb/grid/grain decorative background REPLACED with letter-to-mailbox SVG
//      animation: glowing paper envelope flies an arc through the air and drops
//      into an indigo-lit mailbox with spark burst on arrival.
//   ✅ prefers-reduced-motion guard preserved (WCAG 2.1 AA)
//   ✅ Entire animation block is aria-hidden="true" — no a11y regression
//   ✅ Animation anchored to right half of hero; text stays left — no layout shift
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import ContactForm        from "../components/contactform";
import ContactUsBanner    from "../components/contactus-banner";
import Header             from "../components/header";
import Footer             from "../components/footer";
import ScrollDown         from "../components/scrolldown";
import Chatbot            from "../components/chatbot";
import Whatsappbutton     from "../components/wahtsappbutton";
import PageLoader         from "../components/PageLoader";
import { BASE, breadcrumb, faqSchema } from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing — Bangalore",

  description:
    "Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing. Reach out today and let's build something great together.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: "/contact",
    languages: {
      "en-IN":     `${BASE}/contact`,
      "en-US":     `${BASE}/contact`,
      "en-GB":     `${BASE}/contact`,
      "en-AE":     `${BASE}/contact`,
      "en-AU":     `${BASE}/contact`,
      "x-default": `${BASE}/contact`,
    },
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
    title: "Contact 99 Visual | Free Consultation for Web, 3D & Digital Marketing",
    description:
      "Have a project in mind? Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing services.",
    url:      `${BASE}/contact`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/og/contact-og.jpg`,
        width:  1200,
        height: 630,
        alt:    "Contact 99 Visual Solutions — Free Consultation for Web, 3D & Digital Services",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Contact 99 Visual | Free Quote for Web, 3D & Digital Marketing",
    description: "Get in touch with 99 Visual Solutions in Bangalore for expert web development, 3D visualization, and digital marketing. Free consultation available.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/og/contact-og.jpg`,
        alt: "Contact 99 Visual Solutions — Free Consultation Bangalore",
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },

  authors:         [{ name: "99 Visual Solutions", url: BASE }],
  creator:         "99 Visual Solutions",
  publisher:       "99 Visual Solutions",
  category:        "Technology",
  applicationName: "99 Visual Solutions",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA — unified @graph
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [

    // ── 1. Organization ─────────────────────────────────────────────────────
    {
      "@type": "Organization",
      "@id":   `${BASE}/#organization`,
      name:    "99 Visual Solutions",
      alternateName: ["99Visual", "99VS"],
      description:
        "Bangalore-based IT solutions company specialising in web development, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing since 2015.",
      url: BASE,
      logo: {
        "@type":    "ImageObject",
        "@id":      `${BASE}/#logo`,
        url:        `${BASE}/images/logo.png`,
        contentUrl: `${BASE}/images/logo.png`,
        width:      300,
        height:     60,
        caption:    "99 Visual Solutions Logo",
      },
      image:        { "@id": `${BASE}/#logo` },
      foundingDate: "2015",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
      address: {
        "@type":         "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion:   "Karnataka",
        postalCode:      "560087",
        addressCountry:  "IN",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Australia" },
      ],
      contactPoint: [
        {
          "@type":           "ContactPoint",
          contactType:       "Sales",
          url:               `${BASE}/contact`,
          email:             "contact@99visual.com",
          availableLanguage: ["English", "Kannada", "Hindi"],
          areaServed:        ["IN", "US", "GB", "AU", "AE"],
        },
        {
          "@type":           "ContactPoint",
          contactType:       "Customer Support",
          url:               `${BASE}/contact`,
          email:             "contact@99visual.com",
          availableLanguage: ["English", "Kannada", "Hindi"],
          areaServed:        ["IN", "US", "GB", "AU", "AE"],
        },
      ],
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
      ],
      knowsAbout: [
        "Web Development", "Search Engine Optimisation", "Digital Marketing",
        "3D Visualisation", "CAD Drafting", "GIS Mapping", "LiDAR Data Processing",
        "QA Testing", "IT Consulting",
      ],
    },

    // ── 2. LocalBusiness ────────────────────────────────────────────────────
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id":   `${BASE}/#localbusiness`,
      name:    "99 Visual Solutions",
      image:   `${BASE}/images/og/contact-og.jpg`,
      url:     BASE,
      email:   "contact@99visual.com",
      description:
        "Full-service digital agency in Bengaluru offering web development, 3D visualisation, SEO, and digital marketing with free initial consultations.",
      priceRange:         "$$",
      currenciesAccepted: "INR, USD, GBP, AED, AUD",
      paymentAccepted:    "Bank Transfer, Credit Card, UPI, PayPal",
      address: {
        "@type":         "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion:   "Karnataka",
        postalCode:      "560087",
        addressCountry:  "IN",
      },
      geo: {
        "@type":   "GeoCoordinates",
        latitude:  12.9716,
        longitude: 77.5946,
      },
      hasMap: "https://maps.google.com/?q=99+Visual+Solutions+Bengaluru",
      openingHoursSpecification: [
        {
          "@type":   "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens:     "09:00",
          closes:    "18:30",
        },
        {
          "@type":   "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens:     "10:00",
          closes:    "14:00",
        },
      ],
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Australia" },
      ],
      parentOrganization: { "@id": `${BASE}/#organization` },
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name:    "Digital Services",
        itemListElement: [
          {
            "@type":       "Offer",
            name:          "Free Consultation",
            description:   "Free initial consultation for web development, 3D visualisation, SEO, and digital marketing services.",
            price:         "0",
            priceCurrency: "INR",
            url:           `${BASE}/contact`,
          },
          {
            "@type":     "Offer",
            itemOffered: { "@type": "Service", name: "Web & App Development" },
            url:         `${BASE}/services`,
          },
          {
            "@type":     "Offer",
            itemOffered: { "@type": "Service", name: "3D Visualisation & Architectural Rendering" },
            url:         `${BASE}/services`,
          },
          {
            "@type":     "Offer",
            itemOffered: { "@type": "Service", name: "SEO & Digital Marketing" },
            url:         `${BASE}/services`,
          },
          {
            "@type":     "Offer",
            itemOffered: { "@type": "Service", name: "CAD, GIS & Photogrammetry" },
            url:         `${BASE}/services`,
          },
          {
            "@type":     "Offer",
            itemOffered: { "@type": "Service", name: "AI-Powered QA & Automation Testing" },
            url:         `${BASE}/services`,
          },
        ],
      },
    },

    // ── 3. WebSite ──────────────────────────────────────────────────────────
    {
      "@type":     "WebSite",
      "@id":       `${BASE}/#website`,
      url:         BASE,
      name:        "99 Visual Solutions",
      description: "Web development, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing services.",
      publisher:   { "@id": `${BASE}/#organization` },
      inLanguage:  "en",
      potentialAction: {
        "@type": "SearchAction",
        target:  { "@type": "EntryPoint", urlTemplate: `${BASE}/?s={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },

    // ── 4. ContactPage ──────────────────────────────────────────────────────
    {
      "@type":       "ContactPage",
      "@id":         `${BASE}/contact#webpage`,
      url:           `${BASE}/contact`,
      name:          "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing — Bangalore",
      description:   "Get in touch with 99 Visual Solutions in Bengaluru for a free consultation on web development, 3D visualisation, SEO, and digital marketing services.",
      inLanguage:    "en",
      datePublished: DATE_PUBLISHED,
      dateModified:  DATE_MODIFIED,
      isPartOf:      { "@id": `${BASE}/#website` },
      about:         { "@id": `${BASE}/#organization` },
      publisher:     { "@id": `${BASE}/#organization` },
      primaryImageOfPage: {
        "@type":  "ImageObject",
        url:      `${BASE}/images/og/contact-og.jpg`,
        width:    1200,
        height:   630,
        caption:  "Contact 99 Visual Solutions — Free Consultation Bangalore",
      },
      speakable: {
        "@type":     "SpeakableSpecification",
        cssSelector: [".ct-hero__h1", ".ct-hero__sub"],
      },
      breadcrumb:      { "@id": `${BASE}/contact#breadcrumb` },
      potentialAction: {
        "@type": "ReadAction",
        target:  [`${BASE}/contact`],
      },
    },

    // ── 5. BreadcrumbList ───────────────────────────────────────────────────
    {
      ...breadcrumb([
        { name: "Home",    url: "/" },
        { name: "Contact", url: "/contact" },
      ]),
      "@id": `${BASE}/contact#breadcrumb`,
    },

    // ── 6. FAQPage ──────────────────────────────────────────────────────────
    {
      ...faqSchema([
        {
          question: "Does 99 Visual offer a free consultation?",
          answer:
            "Yes. 99 Visual Solutions offers a free initial consultation for web development, 3D visualisation, SEO, and digital marketing projects. Simply fill out the contact form and the team will get back to you within one business day.",
        },
        {
          question: "Where is 99 Visual Solutions located?",
          answer:
            "99 Visual Solutions is based in Bengaluru, Karnataka, India. The team works with clients both locally and globally across the USA, UK, UAE, and Australia.",
        },
        {
          question: "How quickly does 99 Visual respond to enquiries?",
          answer:
            "The team typically responds to all enquiries within one business day. You can reach out via the contact form at 99visual.com/contact or by emailing contact@99visual.com.",
        },
        {
          question: "What services can I get a quote for?",
          answer:
            "You can request a quote for web development, UI/UX design, 3D visualisation, SEO, digital marketing, GIS services, CAD drafting, and IT consulting. Use the contact form to describe your project requirements.",
        },
        {
          question: "Does 99 Visual work with international clients?",
          answer:
            "Yes. 99 Visual Solutions serves startups and enterprises across India, the USA, UK, UAE, and Australia, offering competitive offshore IT services with fast turnaround times.",
        },
      ]),
      "@id":            `${BASE}/contact#faq`,
      mainEntityOfPage: { "@id": `${BASE}/contact#webpage` },
    },

  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <PageLoader />

      {/* ── Unified @graph JSON-LD ─────────────────────────────────────────── */}
      <script
        id="schema-contact-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* ── Styles ────────────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-indigo:  #6366f1;
          --c-muted:   rgba(255,255,255,0.45);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        /* ── sr-only ─────────────────────────────────────────────────────── */
        .sr-only {
          position: absolute !important;
          width: 1px !important; height: 1px !important;
          padding: 0 !important; margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        /* ── Hero shell ──────────────────────────────────────────────────── */
        .ct-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--c-bg);
          overflow: hidden;
          padding: 8rem 1.5rem 6rem;
          text-align: center;
        }

        /* Subtle dot-grid backdrop — lightweight, no orbs */
        .ct-hero__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        /* ── Letter-to-mailbox animation stage ───────────────────────────── */
        /*
          Positioned absolutely in the hero, anchored right.
          On mobile (<768 px) the stage shrinks and sits behind the text
          so it never crowds the headline.
        */
        .ct-anim {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8%;
          pointer-events: none;
          overflow: hidden;
        }
        .ct-anim__stage {
          position: relative;
          width: 240px;
          height: 320px;
          opacity: 0.9;
        }
        @media (max-width: 768px) {
          .ct-anim {
            justify-content: center;
            padding-right: 0;
            opacity: 0.35;          /* ghost it on mobile so text stays readable */
          }
          .ct-anim__stage {
            width: 180px;
            height: 240px;
          }
        }

        /* ── Mailbox ─────────────────────────────────────────────────────── */
        .ct-mailbox {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        /* Arrival glow ring */
        .ct-mailbox__glow {
          position: absolute;
          inset: -14px;
          border-radius: 16px;
          border: 1.5px solid rgba(99,102,241,0);
          pointer-events: none;
          animation: mbGlow 3s ease-in-out infinite;
        }
        @keyframes mbGlow {
          0%,  60% { border-color: rgba(99,102,241,0);   box-shadow: none; }
          75%       { border-color: rgba(99,102,241,.65); box-shadow: 0 0 32px rgba(99,102,241,.3); }
          100%      { border-color: rgba(99,102,241,0);   box-shadow: none; }
        }
        /* Roof / lid */
        .ct-mailbox__roof {
          width: 0; height: 0;
          border-left:  55px solid transparent;
          border-right: 55px solid transparent;
          border-bottom: 22px solid #1a1a2e;
          filter: drop-shadow(0 -1px 0 rgba(99,102,241,.35));
        }
        /* Body */
        .ct-mailbox__body {
          width: 110px; height: 72px;
          background: linear-gradient(160deg, #1e1e2e 55%, #14142a);
          border: 1.5px solid rgba(99,102,241,.5);
          border-radius: 10px 10px 6px 6px;
          position: relative;
          box-shadow:
            0 0 24px rgba(99,102,241,.15),
            inset 0 1px 0 rgba(255,255,255,.06);
        }
        /* Mail slot */
        .ct-mailbox__slot {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 52px; height: 5px;
          background: rgba(0,0,0,.75);
          border-radius: 3px;
          box-shadow: inset 0 1px 4px rgba(0,0,0,.95);
        }
        /* Engraved envelope icon */
        .ct-mailbox__icon {
          position: absolute;
          bottom: 8px; right: 10px;
          opacity: .2;
        }
        /* Post */
        .ct-mailbox__post {
          width: 10px; height: 28px;
          background: linear-gradient(to right, #1a1a2e, #232340);
          border: 1px solid rgba(99,102,241,.25);
          border-top: none;
          border-radius: 0 0 4px 4px;
        }

        /* ── Spark burst on arrival ───────────────────────────────────────── */
        .ct-spark {
          position: absolute;
          border-radius: 50%;
          bottom: 90px; left: 50%;
          opacity: 0;
        }
        .ct-spark-1 { width:3px;height:3px; background:#6366f1; animation: sp1 3s ease-out infinite; }
        .ct-spark-2 { width:3px;height:3px; background:#f97316; animation: sp2 3s ease-out infinite; }
        .ct-spark-3 { width:3px;height:3px; background:#a78bfa; animation: sp3 3s ease-out infinite; }
        .ct-spark-4 { width:2px;height:2px; background:#6366f1; animation: sp4 3s ease-out infinite; }
        .ct-spark-5 { width:2px;height:2px; background:#fbbf24; animation: sp5 3s ease-out infinite; }
        @keyframes sp1{0%,70%{opacity:0;transform:translate(0,0) scale(1)} 75%{opacity:1;transform:translate(-18px,-14px) scale(1.3)} 95%{opacity:0;transform:translate(-28px,-4px) scale(.4)} 100%{opacity:0}}
        @keyframes sp2{0%,72%{opacity:0;transform:translate(0,0) scale(1)} 77%{opacity:1;transform:translate(16px,-20px) scale(1.3)} 95%{opacity:0;transform:translate(26px,-6px) scale(.4)} 100%{opacity:0}}
        @keyframes sp3{0%,71%{opacity:0;transform:translate(0,0) scale(1)} 76%{opacity:1;transform:translate(-8px,-24px) scale(1.3)} 95%{opacity:0;transform:translate(-14px,-6px) scale(.4)} 100%{opacity:0}}
        @keyframes sp4{0%,73%{opacity:0;transform:translate(0,0)} 78%{opacity:1;transform:translate(12px,-12px)} 95%{opacity:0;transform:translate(20px,2px)} 100%{opacity:0}}
        @keyframes sp5{0%,74%{opacity:0;transform:translate(0,0)} 79%{opacity:1;transform:translate(-14px,-10px)} 95%{opacity:0;transform:translate(-22px,4px)} 100%{opacity:0}}

        /* ── Flying letter ────────────────────────────────────────────────── */
        .ct-letter {
          position: absolute;
          top: 18px; left: 50%;
          width: 58px; height: 44px;
          transform-origin: center center;
          animation: letterFly 3s cubic-bezier(.4,0,.2,1) infinite;
        }
        @keyframes letterFly {
          0%   { transform: translateX(-66px) translateY(0px)   rotate(-16deg) scale(.88); opacity: 0;   }
          7%   { opacity: 1; }
          38%  { transform: translateX(-28px) translateY(32px)  rotate(9deg)   scale(1.06); opacity: 1; }
          63%  { transform: translateX(0px)   translateY(150px) rotate(-5deg)  scale(.93);  opacity: 1; }
          76%  { transform: translateX(4px)   translateY(188px) rotate(-1deg)  scale(.55);  opacity: .8; }
          86%  { transform: translateX(4px)   translateY(204px) rotate(0deg)   scale(.18);  opacity: 0;  }
          87%  { transform: translateX(-66px) translateY(0px)   rotate(-16deg) scale(.88);  opacity: 0;  }
          100% { transform: translateX(-66px) translateY(0px)   rotate(-16deg) scale(.88);  opacity: 0;  }
        }
        /* Glow shifts orange → indigo as letter nears the mailbox */
        .ct-letter svg {
          width: 100%; height: 100%;
          animation: ltGlow 3s ease-in-out infinite;
        }
        @keyframes ltGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(249,115,22,.55))  drop-shadow(0 0 22px rgba(249,115,22,.22)); }
          42%       { filter: drop-shadow(0 0 18px rgba(249,115,22,.95)) drop-shadow(0 0 44px rgba(249,115,22,.5)); }
          76%       { filter: drop-shadow(0 0 12px rgba(99,102,241,.85)) drop-shadow(0 0 30px rgba(99,102,241,.45)); }
        }

        /* ── Orange trail particles ───────────────────────────────────────── */
        .ct-trail {
          position: absolute;
          border-radius: 50%;
          background: var(--c-orange);
          pointer-events: none;
          top: 38px;
          left: calc(50% - 64px);
        }
        .ct-trail-1 { width:4px; height:4px; animation: tr1 3s ease-in-out infinite; opacity:0; }
        .ct-trail-2 { width:3px; height:3px; animation: tr2 3s ease-in-out infinite; opacity:0; animation-delay:.06s; }
        .ct-trail-3 { width:2px; height:2px; animation: tr3 3s ease-in-out infinite; opacity:0; animation-delay:.12s; }
        .ct-trail-4 { width:2px; height:2px; animation: tr4 3s ease-in-out infinite; opacity:0; animation-delay:.18s; background: rgba(249,115,22,.5); }
        @keyframes tr1 { 0%,6%{transform:translate(0,0);opacity:0} 22%{transform:translate(26px,24px);opacity:.75} 56%{transform:translate(54px,154px);opacity:.35} 72%{opacity:0} 100%{opacity:0} }
        @keyframes tr2 { 0%,6%{transform:translate(0,0);opacity:0} 22%{transform:translate(18px,16px);opacity:.55} 56%{transform:translate(40px,142px);opacity:.25} 70%{opacity:0} 100%{opacity:0} }
        @keyframes tr3 { 0%,6%{transform:translate(0,0);opacity:0} 22%{transform:translate(10px, 8px);opacity:.4}  56%{transform:translate(28px,128px);opacity:.18} 68%{opacity:0} 100%{opacity:0} }
        @keyframes tr4 { 0%,6%{transform:translate(0,0);opacity:0} 22%{transform:translate( 4px, 2px);opacity:.25} 56%{transform:translate(16px,110px);opacity:.1}  66%{opacity:0} 100%{opacity:0} }

        /* ── Hero content ────────────────────────────────────────────────── */
        .ct-hero__content {
          position: relative; z-index: 10; max-width: 760px; margin: 0 auto;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes ctFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ct-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange);
          border: 1px solid rgba(249,115,22,.28);
          background: rgba(249,115,22,.07);
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 1.8rem; backdrop-filter: blur(8px);
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;
        }
        .ct-hero__dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--c-orange);
          animation: ctPulse 2s ease-in-out infinite;
        }
        @keyframes ctPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.65); }
        }

        .ct-hero__h1 {
          font-family: var(--ff-serif);
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .ct-hero__h1 em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 0.2px var(--c-orange);
        }

        .ct-hero__rule {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto 1.5rem;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;
        }

        .ct-hero__sub {
          font-family: var(--ff-sans);
          font-size: clamp(.95rem, 2vw, 1.12rem);
          font-weight: 300; line-height: 1.75; color: var(--c-muted);
          max-width: 520px; margin: 0 auto 2.6rem;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;
        }

        .ct-hero__cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--ff-sans); font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          color: #080808;
          background: linear-gradient(135deg, #fb923c, #f97316);
          padding: 14px 34px; border-radius: 100px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(249,115,22,.35);
          transition: transform .2s ease, box-shadow .2s ease;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
        }
        .ct-hero__cta:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 14px 40px rgba(249,115,22,.5);
        }

        .ct-hero__scroll {
          position: absolute; bottom: 2rem; left: 50%;
          transform: translateX(-50%);
          z-index: 20; display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          text-decoration: none;
          animation: ctFadeUp .9s ease .8s both;
        }
        .ct-hero__scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,.3), transparent);
          animation: ctScrollLine 1.8s ease-in-out infinite;
        }
        @keyframes ctScrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .ct-hero__scroll-lbl {
          font-family: var(--ff-sans); font-size: 9px; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: rgba(255,255,255,.22);
        }

        /* Corner brackets */
        .ct-corner {
          position: absolute; width: 28px; height: 28px; z-index: 5;
          opacity: .2; pointer-events: none;
        }
        .ct-corner--tl { top: 24px; left: 24px;     border-top: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .ct-corner--tr { top: 24px; right: 24px;    border-top: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .ct-corner--bl { bottom: 64px; left: 24px;  border-bottom: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .ct-corner--br { bottom: 64px; right: 24px; border-bottom: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }

        /* ── WCAG 2.1 AA — respect user motion preferences ───────────────── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration:       0.01ms !important;
            animation-iteration-count: 1     !important;
            transition-duration:      0.01ms !important;
          }
        }
      `}</style>

      <Header />

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        className="ct-hero"
        aria-labelledby="ct-hero-heading"
        id="contact-hero"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        {/* Subtle grid backdrop */}
        <div className="ct-hero__grid" aria-hidden="true" />

        {/* Corner brackets */}
        <div className="ct-corner ct-corner--tl" aria-hidden="true" />
        <div className="ct-corner ct-corner--tr" aria-hidden="true" />
        <div className="ct-corner ct-corner--bl" aria-hidden="true" />
        <div className="ct-corner ct-corner--br" aria-hidden="true" />

        {/* ── Letter-to-mailbox animation ─────────────────────────────────
            Entire block is aria-hidden — decorative only.
            prefers-reduced-motion collapses all keyframes to 0.01 ms.
        ── */}
        <div className="ct-anim" aria-hidden="true">
          <div className="ct-anim__stage">

            {/* Orange trail particles */}
            <div className="ct-trail ct-trail-1" />
            <div className="ct-trail ct-trail-2" />
            <div className="ct-trail ct-trail-3" />
            <div className="ct-trail ct-trail-4" />

            {/* Flying letter / envelope */}
            <div className="ct-letter">
              <svg viewBox="0 0 58 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Envelope body */}
                <rect x="1" y="1" width="56" height="42" rx="4.5"
                      fill="#1e1032" stroke="#f97316" strokeWidth="1.3"/>
                {/* Paper peek */}
                <rect x="6" y="5" width="46" height="30" rx="2"
                      fill="#ffffff" opacity="0.07"/>
                {/* Ruled lines on paper */}
                <line x1="11" y1="13" x2="47" y2="13" stroke="#f97316" strokeWidth="0.8" opacity="0.45"/>
                <line x1="11" y1="19" x2="41" y2="19" stroke="#f97316" strokeWidth="0.8" opacity="0.32"/>
                <line x1="11" y1="25" x2="35" y2="25" stroke="#f97316" strokeWidth="0.8" opacity="0.22"/>
                {/* Envelope flap fold */}
                <path d="M1 6 L29 26 L57 6" stroke="#f97316" strokeWidth="1.1"
                      opacity="0.65" fill="none"/>
                {/* Wax seal */}
                <circle cx="29" cy="24" r="5"   fill="#f97316" opacity="0.72"/>
                <circle cx="29" cy="24" r="2.8" fill="#fde68a" opacity="0.95"/>
                {/* Gloss sheen */}
                <rect x="3" y="2" width="52" height="3" rx="2"
                      fill="white" opacity="0.04"/>
              </svg>
            </div>

            {/* Mailbox */}
            <div className="ct-mailbox">
              {/* Arrival glow ring */}
              <div className="ct-mailbox__glow" />

              {/* Roof */}
              <div className="ct-mailbox__roof" />

              {/* Body */}
              <div className="ct-mailbox__body">
                {/* Mail slot */}
                <div className="ct-mailbox__slot" />
                {/* Engraved icon */}
                <svg
                  className="ct-mailbox__icon"
                  width="16" height="11"
                  viewBox="0 0 16 11"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect x=".5" y=".5" width="15" height="10" rx="1.5"
                        stroke="white" strokeWidth="1"/>
                  <path d="M.5 1.5 L8 7 L15.5 1.5"
                        stroke="white" strokeWidth="1" fill="none"/>
                </svg>
              </div>

              {/* Post */}
              <div className="ct-mailbox__post" />

              {/* Spark burst particles */}
              <div className="ct-spark ct-spark-1" />
              <div className="ct-spark ct-spark-2" />
              <div className="ct-spark ct-spark-3" />
              <div className="ct-spark ct-spark-4" />
              <div className="ct-spark ct-spark-5" />
            </div>

          </div>
        </div>

        {/* ── Breadcrumb — sr-only ──────────────────────────────────────── */}
        <nav className="sr-only" aria-label="Breadcrumb" aria-hidden="true">
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <a href="/contact" itemProp="item" aria-current="page">
                <span itemProp="name">Contact</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── Main hero content ─────────────────────────────────────────── */}
        <div className="ct-hero__content">
          <p className="ct-hero__eyebrow" aria-hidden="true">
            <span className="ct-hero__dot" />
            Contact · Bangalore &amp; Beyond
          </p>

          <h1
            className="ct-hero__h1"
            id="ct-hero-heading"
            itemProp="name"
          >
            Let&apos;s build something<br /><em>great</em> together
          </h1>

          <div className="ct-hero__rule" aria-hidden="true" />

          <p className="ct-hero__sub" itemProp="description">
            We believe collaboration drives innovation. We partner with forward-thinking
            organisations to create impactful, future-ready solutions.
          </p>

          <a
            href="#contact-form"
            className="ct-hero__cta"
            aria-label="Scroll to contact form — get in touch with 99 Visual Solutions"
          >
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4"
                    stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <a
          href="#contact-form"
          className="ct-hero__scroll"
          aria-label="Scroll to contact form"
        >
          <div className="ct-hero__scroll-line" aria-hidden="true" />
          <span className="ct-hero__scroll-lbl" aria-hidden="true">Scroll</span>
        </a>
      </section>

      {/* ══ CONTACT US BANNER ═══════════════════════════════════════════════ */}
      <ContactUsBanner />

      {/* ══ CONTACT FORM ════════════════════════════════════════════════════ */}
      <section
        id="contact-form"
        aria-label="Contact form — send 99 Visual Solutions a message"
      >
        <ContactForm />
      </section>

      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}