// app/contact/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import ContactForm from "../components/contactform";
import ContactUsBanner from "../components/contactus-banner";
import Header from "../components/header";
import Footer from "../components/footer";
import ScrollDown from "../components/scrolldown";
import Chatbot from "../components/chatbot";
import Whatsappbutton from "../components/wahtsappbutton";
import PageLoader from "../components/PageLoader";
import { BASE, breadcrumb, faqSchema } from "@/lib/schema";

/* =====================================================
   SEO METADATA
===================================================== */

export const metadata: Metadata = {
  title: "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing - Bangalore India",
  description:
    "Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing. Reach out today and let's build something great together.",
  metadataBase: new URL(BASE),
  alternates: { canonical: `${BASE}/contact` },
  keywords: [
    // Primary
    "Contact 99 Visual",
    "Contact 99 Visual Solutions",
    // Quote & Consultation
    "Get Free Quote Web Development India",
    "Free Consultation Digital Marketing",
    "Request Quote 3D Visualization",
    "Hire Web Developers India",
    "Website Development Enquiry India",
    // Service-Specific Contact
    "Contact Web Development Company India",
    "Contact Digital Marketing Agency India",
    "Contact SEO Company India",
    "3D Visualization Company Contact India",
    "IT Consulting Contact Bangalore",
    // Location
    "Web Development Company Bangalore Contact",
    "Digital Agency Bangalore Enquiry",
    "Bangalore IT Company Contact",
    // General
    "Business Enquiry Digital Services India",
    "Digital Agency Contact Page",
    "Start a Project 99Visual",
  ],
  openGraph: {
    title: "Contact 99 Visual | Free Consultation for Web, 3D & Digital Marketing - Bangalore",
    description:
      "Have a project in mind? Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing services.",
    url: `${BASE}/contact`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url: `${BASE}/images/og/contact-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact 99 Visual Solutions - Free Consultation for Web, 3D & Digital Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact 99 Visual | Free Quote for Web, 3D & Digital Marketing",
    description:
      "Get in touch with 99 Visual Solutions in Bangalore for expert web development, 3D visualization, and digital marketing. Free consultation available.",
    site: "@99VisualSoluti1",
    creator: "@99VisualSoluti1",
    images: [`${BASE}/images/og/contact-og.jpg`],
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
  authors: [{ name: "99 Visual Solutions", url: BASE }],
  category: "Technology",
};

/* =====================================================
   JSON-LD — unified @graph block
===================================================== */

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [

    // 1. Organization
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "99 Visual Solutions",
      alternateName: "99Visual",
      description:
        "Bangalore-based IT solutions company specialising in web development, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing since 2015.",
      url: BASE,
      logo: {
        "@type": "ImageObject",
        "@id": `${BASE}/#logo`,
        url: `${BASE}/logo.png`,
        contentUrl: `${BASE}/logo.png`,
        width: 300,
        height: 60,
        caption: "99 Visual Solutions Logo",
      },
      image: { "@id": `${BASE}/#logo` },
      foundingDate: "2015",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560087",
        addressCountry: "IN",
      },
      areaServed: ["IN", "US", "GB", "AU", "AE"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Sales",
          url: `${BASE}/contact`,
          email: "contact@99visual.com",
          availableLanguage: ["English", "Kannada", "Hindi"],
          areaServed: ["IN", "US", "GB", "AU", "AE"],
        },
        {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          url: `${BASE}/contact`,
          email: "contact@99visual.com",
          availableLanguage: ["English", "Kannada", "Hindi"],
          areaServed: ["IN", "US", "GB", "AU", "AE"],
        },
      ],
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
      ],
      knowsAbout: [
        "Web Development",
        "Search Engine Optimisation",
        "Digital Marketing",
        "3D Visualisation",
        "CAD Drafting",
        "GIS Mapping",
        "LiDAR Data Processing",
        "QA Testing",
        "IT Consulting",
      ],
    },

    // 2. LocalBusiness
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${BASE}/#localbusiness`,
      name: "99 Visual Solutions",
      image: `${BASE}/images/og/contact-og.jpg`,
      url: BASE,
      email: "contact@99visual.com",
      description:
        "Full-service digital agency in Bengaluru offering web development, 3D visualisation, SEO, and digital marketing with free initial consultations.",
      priceRange: "$$",
      currenciesAccepted: "INR, USD, GBP, AED, AUD",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560087",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.9716,
        longitude: 77.5946,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      parentOrganization: { "@id": `${BASE}/#organization` },
      sameAs: [
        "https://x.com/99VisualSoluti1",
        "https://www.linkedin.com/company/99-visual-solutions/",
        "https://www.facebook.com/profile.php?id=100093639888151",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Services",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Free Consultation",
            description:
              "Free initial consultation for web development, 3D visualisation, SEO, and digital marketing services.",
            price: "0",
            priceCurrency: "INR",
            url: `${BASE}/contact`,
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Web & App Development" },
            url: `${BASE}/services`,
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "3D Visualisation & Architectural Rendering" },
            url: `${BASE}/services`,
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "SEO & Digital Marketing" },
            url: `${BASE}/services`,
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "CAD, GIS & Photogrammetry" },
            url: `${BASE}/services`,
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "AI-Powered QA & Automation Testing" },
            url: `${BASE}/services`,
          },
        ],
      },
    },

    // 3. WebSite
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "99 Visual Solutions",
      description:
        "Web development, SEO, digital marketing, 3D visualisation, CAD/GIS, and QA testing services.",
      publisher: { "@id": `${BASE}/#organization` },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/?s={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // 4. ContactPage
    {
      "@type": "ContactPage",
      "@id": `${BASE}/contact#webpage`,
      url: `${BASE}/contact`,
      name: "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing - Bangalore India",
      description:
        "Get in touch with 99 Visual Solutions in Bengaluru for a free consultation on web development, 3D visualisation, SEO, and digital marketing services.",
      inLanguage: "en-IN",
      datePublished: "2023-01-01",
      dateModified: "2025-01-01",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${BASE}/images/og/contact-og.jpg`,
        width: 1200,
        height: 630,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".ct-hero__sub", ".ct-hero__h1"],
      },
      breadcrumb: { "@id": `${BASE}/contact#breadcrumb` },
    },

    // 5. BreadcrumbList
    {
      ...breadcrumb([
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" },
      ]),
      "@id": `${BASE}/contact#breadcrumb`,
    },

    // 6. FAQPage
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
      "@id": `${BASE}/contact#faq`,
    },

  ],
};

/* =====================================================
   PAGE COMPONENT
===================================================== */

export default function ContactPage() {
  return (
    <>
      <PageLoader />

      {/* Single unified JSON-LD @graph block */}
      <Script
        id="schema-contact-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* ─── Styles ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ─── Shared tokens ─── */
        :root {
          --c-bg:      #080808;
          --c-surface: #0f0f0f;
          --c-border:  rgba(255,255,255,0.07);
          --c-orange:  #f97316;
          --c-muted:   rgba(255,255,255,0.45);
          --ff-serif:  'Cormorant Garamond', serif;
          --ff-sans:   'DM Sans', sans-serif;
        }

        /* ─── HERO ─── */
        .ct-hero {
          position: relative;
          min-height: 90vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--c-bg);
          overflow: hidden;
          padding: 8rem 1.5rem 6rem;
          text-align: center;
        }
        .ct-hero__orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: ctOrbDrift 16s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .ct-hero__orb--1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, #6366f1, #4f46e5);
          top: -160px; left: -100px; opacity: .13;
        }
        .ct-hero__orb--2 {
          width: 440px; height: 440px;
          background: radial-gradient(circle, #f97316, #ea580c);
          bottom: -130px; right: -80px; opacity: .12;
          animation-delay: -8s;
        }
        @keyframes ctOrbDrift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(32px, 24px) scale(1.06); }
        }

        .ct-hero__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .ct-hero__grain {
          position: absolute; inset: 0; opacity: .03; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        /* Breadcrumb — inside hero, matches site-wide pattern */
        .ct-hero__breadcrumb {
          position: relative; z-index: 10;
          display: flex; align-items: center; gap: 6px; justify-content: center;
          font-family: 'DM Sans', sans-serif; font-size: .75rem;
          color: rgba(255,255,255,0.3); letter-spacing: .04em;
          margin-bottom: 2rem;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .05s both;
        }
        .ct-hero__breadcrumb a {
          color: #f97316; text-decoration: none; font-weight: 500;
        }
        .ct-hero__breadcrumb a:hover { text-decoration: underline; }
        .ct-hero__breadcrumb span { opacity: .4; }

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
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
          /* Fixed: was cFadeUp (undefined) — corrected to ctFadeUp */
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .ct-hero__h1 em {
          font-style: italic; color: transparent;
          /* Fixed: was 0.2px (too thin) — aligned to site-wide 1.5px standard */
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

        /* corner marks */
        .ct-corner {
          position: absolute; width: 28px; height: 28px; z-index: 5; opacity: .2;
          pointer-events: none;
        }
        .ct-corner--tl { top: 24px; left: 24px; border-top: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .ct-corner--tr { top: 24px; right: 24px; border-top: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .ct-corner--bl { bottom: 64px; left: 24px; border-bottom: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .ct-corner--br { bottom: 64px; right: 24px; border-bottom: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
      `}</style>

      <Header />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="ct-hero" aria-label="Contact 99 Visual Solutions Hero">
        {/* Decorative background — hidden from AT */}
        <div aria-hidden="true">
          <div className="ct-hero__orb ct-hero__orb--1" />
          <div className="ct-hero__orb ct-hero__orb--2" />
          <div className="ct-hero__grid" />
          <div className="ct-hero__grain" />
        </div>

        <div className="ct-corner ct-corner--tl" aria-hidden="true" />
        <div className="ct-corner ct-corner--tr" aria-hidden="true" />
        <div className="ct-corner ct-corner--bl" aria-hidden="true" />
        <div className="ct-corner ct-corner--br" aria-hidden="true" />

        {/* Breadcrumb — inside hero, matches site-wide pattern */}
        <nav
  className="ct-hero__breadcrumb"
  aria-label="Breadcrumb"
  style={{ display: "none" }}
>
  <a href="/">Home</a>
  <span aria-hidden="true">›</span>
  <span aria-current="page" style={{ color: "rgba(255,255,255,0.5)" }}>
    Contact
  </span>
</nav>

        <div className="ct-hero__content">
          <div className="ct-hero__eyebrow" aria-hidden="true">
            <span className="ct-hero__dot" />
            Contact · Bangalore &amp; Beyond
          </div>

          <h1 className="ct-hero__h1">
            Let&apos;s build something<br /><em>great</em> together
          </h1>

          <div className="ct-hero__rule" aria-hidden="true" />

          <p className="ct-hero__sub">
            We believe collaboration drives innovation. We partner with forward-thinking
            organisations to create impactful, future-ready solutions.
          </p>

          <a href="#contact-form" className="ct-hero__cta">
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <a href="#contact-form" className="ct-hero__scroll" aria-label="Scroll to contact form">
          <div className="ct-hero__scroll-line" aria-hidden="true" />
          <span className="ct-hero__scroll-lbl" aria-hidden="true">Scroll</span>
        </a>
      </section>

      {/* ══ CONTACT US BANNER ═════════════════════════════════ */}
      <ContactUsBanner />

      {/* ══ CONTACT FORM ══════════════════════════════════════ */}
      <section id="contact-form" aria-label="Contact form">
        <ContactForm />
      </section>

      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}