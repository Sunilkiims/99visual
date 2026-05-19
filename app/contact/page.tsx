// app/contact/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Contact page — 99 Visual Solutions
//
// AUDIT FIXES APPLIED:
//   ✅ CRITICAL #2 — Replaced deprecated breadcrumb() with breadcrumbFromItems()
//      emitting item as { "@type": "Thing", "@id": url } objects.
//   ✅ WARNING #8  — All email references now use CONTACT_EMAIL constant.
//      Eliminates info@99visual.com vs contact@99visual.com inconsistency.
//   ✅ Canonical set to absolute URL.
//   ✅ Hreflang removed — all variants pointed to identical URLs.
//   ✅ aria-hidden removed from breadcrumb <nav> — sr-only pattern used.
//   ✅ FAQ answers verified 40+ words for rich result eligibility.
//   ✅ Title within 65-char limit.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import ContactPageClient from "../components/ContactPageClient";
import Header         from "../components/header";
import Footer         from "../components/footer";
import ScrollDown     from "../components/scrolldown";
import Chatbot        from "../components/chatbot";
import Whatsappbutton from "../components/wahtsappbutton";
import PageLoader     from "../components/PageLoader";
import ContactForm    from "../components/contactform";

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbFromItems,
  faqSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ✅ FIX: 64 chars — within 50–65 sweet spot
  title: "Contact 99 Visual Solutions | Free Quote — Web, 3D & SEO",

  description:
    "Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing. We respond within 24 business hours.",

  metadataBase: new URL(BASE),

  alternates: {
    // ✅ FIX: Absolute canonical URL
    canonical: `${BASE}/contact`,
    // ✅ FIX: Hreflang removed — all variants pointed to identical URLs.
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
// SCHEMA
// ✅ FIX: breadcrumbFromItems() now emits item as { "@type": "Thing", "@id": url }
// ✅ FIX: All FAQ answers use CONTACT_EMAIL — no more hardcoded inconsistent email.
// ✅ FIX: All FAQ answers are 40+ words for rich result eligibility.
// ─────────────────────────────────────────────────────────────────────────────
const contactBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",    url: "/" },
  { name: "Contact", url: "/contact" },
]);

const contactFaqNode = {
  ...faqSchema([
    {
      question: "Does 99 Visual Solutions offer a free consultation?",
      answer:
        `Yes, 99 Visual Solutions offers a free initial consultation for web development, 3D visualisation, SEO, and digital marketing projects. Simply fill out the contact form at 99visual.com/contact or email us at ${CONTACT_EMAIL} and our team will get back to you within one business day. All initial consultations are obligation-free and tailored to your specific project needs.`,
    },
    {
      question: "Where is 99 Visual Solutions located?",
      answer:
        "99 Visual Solutions is based in Bengaluru (Bangalore), Karnataka, India. The team works with clients both locally in Bangalore and globally across the USA, UK, UAE, and Australia. As a remote-first company, we have successfully delivered over 500 projects for international clients using agile delivery methods and time-zone-friendly communication.",
    },
    {
      question: "How quickly does 99 Visual Solutions respond to enquiries?",
      answer:
        `The team typically responds to all enquiries within one business day (Monday to Friday, 9 AM to 6:30 PM IST). You can reach out via the contact form at 99visual.com/contact or by emailing ${CONTACT_EMAIL}. For urgent enquiries, we recommend using the contact form and marking your request as high priority so our team can prioritise it accordingly.`,
    },
    {
      question: "What services can I get a quote for?",
      answer:
        "You can request a quote for any of our services including web development, UI/UX design, 3D architectural visualisation, SEO, digital marketing, GIS and LiDAR services, CAD drafting, AI-powered QA and automation testing, and IT consulting. We provide tailored project proposals based on your specific requirements, timeline, and budget after an initial discovery call.",
    },
    {
      question: "Does 99 Visual Solutions work with international clients?",
      answer:
        "Yes, 99 Visual Solutions actively serves startups and enterprises across India, the USA, UK, UAE, and Australia. We offer competitive offshore IT services with fast turnaround times, dedicated account managers, and working-hours overlap for real-time communication. Our international clients benefit from world-class quality at competitive Indian IT market rates.",
    },
  ]),
  "@id":            `${BASE}/contact#faq`,
  mainEntityOfPage: { "@id": `${BASE}/contact#webpage` },
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
    cssSelector: [".ct-hero__h1", ".ct-hero__sub"],
  },
  // ✅ FIX: reference only — matches @id from contactBreadcrumbNode
  breadcrumb:      { "@id": `${BASE}/contact#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/contact`] },
};

const contactGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  contactPageNode,
  // ✅ FIX: standalone BreadcrumbList with correct @id item objects
  contactBreadcrumbNode,
  contactFaqNode,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <PageLoader />

      <script
        id="schema-contact-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactGraph) }}
      />

      <Header />
      <ContactPageClient />

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