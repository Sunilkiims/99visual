// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from '../components/contactform';
import ContactUsBanner from '../components/contactus-banner';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata: Metadata = {
  title: "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing - Bangalore India",

  description:
    "Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing. Reach out today and let's build something great together.",

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
      "Have a project in mind? Contact 99Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing services.",
    url: "https://www.99visual.com/contact",
    siteName: "99Visual Solutions",
    images: [
      {
        url: "https://www.99visual.com/images/og/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact 99Visual Solutions - Free Consultation for Web, 3D & Digital Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact 99 Visual | Free Quote for Web, 3D & Digital Marketing",
    description:
      "Get in touch with 99 Visual Solutions in Bangalore for expert web development, 3D visualization, and digital marketing. Free consultation available.",
    site: "@99visual",
    creator: "@99visual",
    images: ["https://www.99visual.com/images/og/contact-og.jpg"],
  },

  metadataBase: new URL("https://www.99visual.com"),
  alternates: { canonical: "/contact" },
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
  authors: [{ name: "99 Visual Solutions", url: "https://www.99visual.com" }],
  category: "Technology",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      {/* ── JSON-LD: Organization ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.99visual.com/#organization",
            "name": "99 Visual Solutions",
            "url": "https://www.99visual.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.99visual.com/images/logo.png",
              "width": 200,
              "height": 60,
            },
            "description":
              "99 Visual Solutions is a digital agency based in Bangalore, India, specializing in web development, 3D visualization, SEO, and digital marketing.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "postalCode": "560001",
              "addressCountry": "IN",
            },
            "areaServed": "Worldwide",
            "sameAs": [
              "https://twitter.com/99visual",
              "https://www.linkedin.com/company/99visual",
            ],
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "contactType": "Sales",
                "url": "https://www.99visual.com/contact",
                "areaServed": "Worldwide",
                "availableLanguage": "English",
              },
              {
                "@type": "ContactPoint",
                "contactType": "Customer Support",
                "url": "https://www.99visual.com/contact",
                "areaServed": "Worldwide",
                "availableLanguage": "English",
              },
            ],
          }),
        }}
      />

      {/* ── JSON-LD: ContactPage ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://www.99visual.com/contact#webpage",
            "name": "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing - Bangalore India",
            "description":
              "Get in touch with 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing services.",
            "url": "https://www.99visual.com/contact",
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://www.99visual.com/#website",
              "url": "https://www.99visual.com",
              "name": "99 Visual Solutions",
              "publisher": { "@id": "https://www.99visual.com/#organization" },
            },
            "about": { "@id": "https://www.99visual.com/#organization" },
            "breadcrumb": { "@id": "https://www.99visual.com/contact#breadcrumb" },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": "https://www.99visual.com/images/og/contact-og.jpg",
              "width": 1200,
              "height": 630,
            },
          }),
        }}
      />

      {/* ── JSON-LD: BreadcrumbList ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": "https://www.99visual.com/contact#breadcrumb",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.99visual.com" },
              { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.99visual.com/contact" },
            ],
          }),
        }}
      />

      {/* ── JSON-LD: LocalBusiness ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://www.99visual.com/#localbusiness",
            "name": "99 Visual Solutions",
            "url": "https://www.99visual.com",
            "image": "https://www.99visual.com/images/og/contact-og.jpg",
            "logo": "https://www.99visual.com/images/logo.png",
            "description":
              "Full-service digital agency in Bangalore offering web development, 3D visualization, SEO, and digital marketing with free initial consultations.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "postalCode": "560001",
              "addressCountry": "IN",
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 12.9716,
              "longitude": 77.5946,
            },
            "areaServed": [
              { "@type": "Country", "name": "India" },
              { "@type": "AdministrativeArea", "name": "Worldwide" },
            ],
            "priceRange": "$$",
            "currenciesAccepted": "INR, USD",
            "paymentAccepted": "Bank Transfer, Online Payment",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00",
              },
            ],
            "sameAs": [
              "https://twitter.com/99visual",
              "https://www.linkedin.com/company/99visual",
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Digital Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "name": "Free Consultation",
                  "description": "Free initial consultation for web development, 3D visualization, SEO, and digital marketing services.",
                  "price": "0",
                  "priceCurrency": "INR",
                  "url": "https://www.99visual.com/contact",
                },
                {
                  "@type": "Offer",
                  "name": "Web Development",
                  "description": "Custom web development services including frontend, backend, and full-stack solutions.",
                  "url": "https://www.99visual.com/services",
                },
                {
                  "@type": "Offer",
                  "name": "3D Visualization",
                  "description": "Photorealistic 3D rendering and visualization for architecture, product, and digital projects.",
                  "url": "https://www.99visual.com/services",
                },
                {
                  "@type": "Offer",
                  "name": "SEO & Digital Marketing",
                  "description": "End-to-end SEO, paid campaigns, and digital marketing strategies to drive growth.",
                  "url": "https://www.99visual.com/services",
                },
              ],
            },
          }),
        }}
      />

      {/* ── JSON-LD: FAQPage ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Does 99 Visual offer a free consultation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. 99 Visual Solutions offers a free initial consultation for web development, 3D visualization, SEO, and digital marketing projects. Simply fill out the contact form and the team will get back to you.",
                },
              },
              {
                "@type": "Question",
                "name": "Where is 99 Visual Solutions located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "99 Visual Solutions is based in Bangalore, Karnataka, India. The team works with clients both locally and globally.",
                },
              },
              {
                "@type": "Question",
                "name": "How quickly does 99 Visual respond to enquiries?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The team typically responds to all enquiries within one business day. You can reach out via the contact form at https://www.99visual.com/contact.",
                },
              },
              {
                "@type": "Question",
                "name": "What services can I get a quote for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can request a quote for web development, UI/UX design, 3D visualization, SEO, digital marketing, GIS services, and IT consulting. Use the contact form to describe your project requirements.",
                },
              },
            ],
          }),
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ─── Shared tokens (mirrors careers page) ─── */
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
        .ct-hero__bg { position: absolute; inset: 0; z-index: 0; }
        .ct-hero__orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          animation: ctOrbDrift 16s ease-in-out infinite alternate;
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
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .ct-hero__grain {
          position: absolute; inset: 0; opacity: .03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

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
          font-size: clamp(3rem, 8.5vw, 6.8rem);
          font-weight: 700; line-height: 1.0; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1.1rem;
          animation: ctFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;
        }
        .ct-hero__h1 em {
          font-style: italic; color: transparent;
          -webkit-text-stroke: 1.5px var(--c-orange);
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
        }
        .ct-corner--tl { top: 24px; left: 24px; border-top: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .ct-corner--tr { top: 24px; right: 24px; border-top: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .ct-corner--bl { bottom: 64px; left: 24px; border-bottom: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .ct-corner--br { bottom: 64px; right: 24px; border-bottom: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
      `}</style>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="ct-hero">
        <div className="ct-hero__bg">
          <div className="ct-hero__orb ct-hero__orb--1" />
          <div className="ct-hero__orb ct-hero__orb--2" />
          <div className="ct-hero__grid" />
          <div className="ct-hero__grain" />
        </div>

        <div className="ct-corner ct-corner--tl" />
        <div className="ct-corner ct-corner--tr" />
        <div className="ct-corner ct-corner--bl" />
        <div className="ct-corner ct-corner--br" />

        <div className="ct-hero__content">
          <div className="ct-hero__eyebrow">
            <span className="ct-hero__dot" />
            Contact · Bangalore &amp; Beyond
          </div>

          <h1 className="ct-hero__h1">
            Let&apos;s build something<br /><em>great</em> together
          </h1>

          <div className="ct-hero__rule" />

          <p className="ct-hero__sub">
            We believe collaboration drives innovation. We partner with forward-thinking organisations to create impactful, future-ready solutions.
          </p>

          <a href="#contact-form" className="ct-hero__cta">
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <a href="#contact-form" className="ct-hero__scroll" aria-label="Scroll down">
          <div className="ct-hero__scroll-line" />
          <span className="ct-hero__scroll-lbl">Scroll</span>
        </a>
      </section>

      {/* Contact Form */}
      <section id="contact-form">
        <ContactForm />
      </section>

      <Footer />
    </>
  );
}