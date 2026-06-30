// app/contact/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Contact page — 99 Visual Solutions
//
// FIX: Duplicate field "FAQPage"
//   BEFORE: contactFaqNode used spread faqSchema() which injected a second
//           @type:"FAQPage" object into the graph alongside contactPageNode's
//           mainEntity reference — Google flagged the duplicate.
//   AFTER:  contactFaqNode is a plain object with @type:"FAQPage" and a
//           mainEntity array of Question objects built inline. faqSchema()
//           helper is no longer called here (it is still used on other pages).
//           The graph now has exactly ONE FAQPage node.
//
// CHANGE: FAQ section moved below <ContactForm /> for better UX flow.
//         ContactPageClient no longer renders the FAQ section.
//         FAQ is now rendered as a server-side section directly in page.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import ContactPageClient from "../components/ContactPageClient";
import Header         from "../components/header";
import Footer         from "../components/footer";
import ScrollDown     from "../components/scrolldown";
import Chatbot        from "../components/chatbot";
import Whatsappbutton from "../components/wahtsappbutton";

import ContactForm    from "../components/contactform";

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Contact 99 Visual Solutions | Free Quote — Web, 3D & SEO",

  description:
    "Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing. We respond within 24 business hours.",

  metadataBase: new URL(BASE),

  alternates: {
    canonical: `${BASE}/contact`,
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
    title: "Contact 99 Visual Solutions | Free Consultation for Web, 3D & SEO",
    description:
      "Have a project in mind? Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing services.",
    url: `${BASE}/contact`,
    siteName: "99 Visual Solutions",
    images: [
      {
        url:    `${BASE}/images/og/contact-og.jpg`,
        width:  1200,
        height: 630,
        alt:    "Contact 99 Visual Solutions — Free Project Consultation",
        type:   "image/jpeg",
      },
    ],
    locale: "en_US",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Contact 99 Visual Solutions | Free Quote for Web, 3D & SEO",
    description: "Reach 99 Visual Solutions in Bangalore for expert web development, 3D visualization, and digital marketing. Free consultation, 24hr response.",
    site:        "@99VisualSoluti1",
    creator:     "@99VisualSoluti1",
    images: [
      {
        url: `${BASE}/images/og/contact-og.jpg`,
        alt: "Contact 99 Visual Solutions",
      },
    ],
  },

  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "" },

  authors:         [{ name: "99 Visual Solutions", url: BASE }],
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
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

// ─────────────────────────────────────────────────────────────────────────────
// FAQ DATA
// Keep in sync with faqItems[] in ContactPageClient.tsx (used for microdata).
// ─────────────────────────────────────────────────────────────────────────────
const faqItems = [
  {
    question: "Does 99 Visual Solutions offer a free consultation?",
    answer:
      `Yes, 99 Visual Solutions offers a completely free initial consultation for web development, 3D visualisation, SEO, and digital marketing projects. Simply fill out the contact form or email us at ${CONTACT_EMAIL} and our team will respond within one business day. All initial consultations are obligation-free and tailored specifically to your project needs and goals.`,
  },
  {
    question: "How quickly does 99 Visual Solutions respond to enquiries?",
    answer:
      "We respond to all form and email enquiries within 24 business hours (Monday to Friday, 9 AM to 6:30 PM IST). For the fastest reply, use the contact form on this page or reach us on WhatsApp. If your enquiry is urgent, please mark it as high priority in the message field so our team can prioritise it accordingly and get back to you sooner.",
  },
  {
    question: "What services can I request a quote for?",
    answer:
      "You can request a quote for any of our services including web development, UI/UX design, 3D architectural visualisation, SEO, digital marketing, GIS and LiDAR services, CAD drafting, AI-powered QA and automation testing, and IT consulting. We provide detailed, tailored project proposals after a short discovery call to understand your requirements, timeline, and budget.",
  },
  {
    question: "Does 99 Visual Solutions work with international clients?",
    answer:
      "Yes, 99 Visual Solutions actively serves startups and enterprises across India, the USA, UK, UAE, and Australia. We offer competitive offshore IT services with fast turnaround times, dedicated account managers, and working-hours overlap for real-time communication. Our international clients benefit from world-class quality at highly competitive Indian IT market rates.",
  },
  {
    question: "Where is 99 Visual Solutions located?",
    answer:
      "99 Visual Solutions is headquartered in Bengaluru (Bangalore), Karnataka, India. As a remote-first agency, we have successfully delivered over 150 projects for clients both locally in Bangalore and globally across the USA, UK, UAE, and Australia. We use agile delivery methods and time-zone-friendly communication to ensure smooth collaboration with every client.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
//
// FIX — contactFaqNode is a plain FAQPage object (NOT spread from faqSchema()).
// This guarantees exactly one @type:"FAQPage" in the graph.
// ─────────────────────────────────────────────────────────────────────────────
const contactBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",    url: "/" },
  { name: "Contact", url: "/contact" },
]);

// ✅ FIX — plain FAQPage node; no faqSchema() spread, no duplicate @type.
const contactFaqNode = {
  "@type": "FAQPage",
  "@id":   `${BASE}/contact#faq`,
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name:    question,
    acceptedAnswer: {
      "@type": "Answer",
      text:    answer,
    },
  })),
};

const contactPageNode = {
  "@type":       "ContactPage",
  "@id":         `${BASE}/contact#webpage`,
  url:           `${BASE}/contact`,
  name:          "Contact 99 Visual Solutions | Free Quote — Web, 3D & SEO",
  description:   "Contact 99 Visual Solutions in Bengaluru for a free consultation on web development, 3D visualisation, SEO, and digital marketing services. We respond within 24 hours.",
  inLanguage:    "en",
  datePublished: DATE_PUBLISHED,
  dateModified:  DATE_MODIFIED,
  isPartOf:      { "@id": `${BASE}/#website` },
  about:         { "@id": `${BASE}/#organization` },
  publisher:     { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type":   "ImageObject",
    url:       `${BASE}/images/og/contact-og.jpg`,
    width:     1200,
    height:    630,
    caption:   "Contact 99 Visual Solutions — Free Project Consultation",
  },
  speakable: {
    "@type":     "SpeakableSpecification",
    cssSelector: [".ct-hero__h1", ".ct-hero__sub", "#ct-faq-heading"],
  },
  breadcrumb:      { "@id": `${BASE}/contact#breadcrumb` },
  // References the single FAQPage node — no duplication
  mainEntity:      { "@id": `${BASE}/contact#faq` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/contact`] },
};

const contactGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  contactPageNode,
  contactBreadcrumbNode,
  // ✅ FIX — exactly one FAQPage node in the graph
  contactFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// INLINE FAQ STYLES
// Scoped CSS injected server-side for the standalone FAQ section below the form.
// Reuses the same ct-faq* class names from ContactPageClient so visual
// appearance is identical — no extra CSS shipped to the client.
// ─────────────────────────────────────────────────────────────────────────────
const faqStyles = `
  .ct-faq-standalone {
    --c-bg:       #060608;
    --c-surface:  #0c0c10;
    --c-surface2: #111118;
    --c-border:   rgba(255,255,255,0.06);
    --c-orange:   #f97316;
    --c-muted:    rgba(255,255,255,0.42);
    --c-muted2:   rgba(255,255,255,0.22);
    --ff-serif:   'Cormorant Garamond', serif;
    --ff-sans:    'DM Sans', sans-serif;

    position: relative;
    background: var(--c-bg);
    padding: 6rem 0;
    border-top: 1px solid var(--c-border);
    overflow: hidden;
  }
  .ct-faq-standalone::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.012) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .ct-faq-standalone .ct-faq__inner {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 4rem;
  }
  .ct-faq-standalone .ct-faq__header {
    text-align: center;
    margin-bottom: 3.5rem;
  }
  .ct-faq-standalone .ct-section-label {
    font-family: var(--ff-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--c-orange);
    display: block;
    margin-bottom: .8rem;
  }
  .ct-faq-standalone .ct-section-h2 {
    font-family: var(--ff-serif);
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -.015em;
    color: #fff;
    margin-bottom: .8rem;
  }
  .ct-faq-standalone .ct-section-sub {
    font-family: var(--ff-sans);
    font-size: .93rem;
    font-weight: 300;
    line-height: 1.75;
    color: var(--c-muted);
    max-width: 480px;
    margin: 0 auto;
  }
  .ct-faq-standalone .ct-faq__list {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--c-border);
    border-radius: 16px;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .ct-faq-standalone .ct-faq__item {
    border-bottom: 1px solid var(--c-border);
    background: var(--c-surface);
    transition: background .2s ease;
  }
  .ct-faq-standalone .ct-faq__item:last-child { border-bottom: none; }
  .ct-faq-standalone .ct-faq__item[open]      { background: var(--c-surface2); }
  .ct-faq-standalone .ct-faq__q {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem 1.75rem;
    cursor: pointer;
    user-select: none;
  }
  .ct-faq-standalone .ct-faq__q::-webkit-details-marker { display: none; }
  .ct-faq-standalone .ct-faq__q::marker { display: none; }
  .ct-faq-standalone .ct-faq__q-text {
    font-family: var(--ff-serif);
    font-size: 1.15rem;
    font-weight: 600;
    color: rgba(255,255,255,.82);
    line-height: 1.35;
    flex: 1;
    transition: color .2s ease;
  }
  .ct-faq-standalone .ct-faq__item[open] .ct-faq__q-text,
  .ct-faq-standalone .ct-faq__q:hover .ct-faq__q-text { color: #fff; }
  .ct-faq-standalone .ct-faq__chevron {
    flex-shrink: 0;
    color: var(--c-orange);
    opacity: .7;
    transition: transform .3s cubic-bezier(.22,1,.36,1), opacity .2s ease;
  }
  .ct-faq-standalone .ct-faq__item[open] .ct-faq__chevron {
    transform: rotate(180deg);
    opacity: 1;
  }
  .ct-faq-standalone .ct-faq__a {
    padding: 0 1.75rem 1.5rem;
    animation: ctFaqOpenSa .3s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes ctFaqOpenSa {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ct-faq-standalone .ct-faq__a p {
    font-family: var(--ff-sans);
    font-size: .92rem;
    font-weight: 300;
    line-height: 1.8;
    color: var(--c-muted);
    margin: 0;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .ct-faq-standalone { padding: 4rem 0; }
    .ct-faq-standalone .ct-faq__inner { padding: 0 1.5rem; }
    .ct-faq-standalone .ct-faq__q    { padding: 1.25rem; }
    .ct-faq-standalone .ct-faq__a    { padding: 0 1.25rem 1.25rem; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      

      <script
        id="schema-contact-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactGraph) }}
      />

      {/* FAQ section styles — injected once, server-side */}
      <style dangerouslySetInnerHTML={{ __html: faqStyles }} />

      <Header />

      {/*
        ContactPageClient renders:
          1. Hero
          2. Proof strip (stats)
          3. Reach + Testimonials
          4. CTA
        NOTE: FAQ has been REMOVED from ContactPageClient.
      */}
      <ContactPageClient />

      {/* ── Contact Form ─────────────────────────────────────────────────── */}
      <section
        id="contact-form"
        aria-label="Contact form — send 99 Visual Solutions a message"
      >
        <ContactForm />
      </section>

      {/* ── FAQ — now below the contact form ─────────────────────────────── */}
      {/*
        itemScope / itemType intentionally omitted here.
        The JSON-LD contactFaqNode above is the sole authoritative FAQPage
        declaration. Individual Question/Answer microdata is on each <details>.
      */}
      <section
        id="faq"
        className="ct-faq-standalone"
        aria-labelledby="ct-faq-heading"
      >
        <div className="ct-faq__inner">
          <div className="ct-faq__header">
            <span className="ct-section-label">Common questions</span>
            <h2 className="ct-section-h2" id="ct-faq-heading">
              Frequently Asked Questions
            </h2>
            <p className="ct-section-sub">
              Everything you need to know about working with 99 Visual Solutions.
            </p>
          </div>

          <dl className="ct-faq__list">
            {faqItems.map(({ question, answer }, i) => (
              <details
                key={i}
                className="ct-faq__item"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary className="ct-faq__q" itemProp="name">
                  <span className="ct-faq__q-text">{question}</span>
                  <span className="ct-faq__chevron" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M4.5 6.75L9 11.25L13.5 6.75"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div
                  className="ct-faq__a"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{answer}</p>
                </div>
              </details>
            ))}
          </dl>
        </div>
      </section>

      <Footer />
      <ScrollDown />
      <Chatbot />
      <Whatsappbutton />
    </>
  );
}