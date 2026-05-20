// app/contact/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Contact page — 99 Visual Solutions
//
// ORIGINAL AUDIT FIXES (unchanged):
//   ✅ CRITICAL #2 — breadcrumbFromItems() with { "@type": "Thing", "@id" } items.
//   ✅ WARNING #8  — All email refs use CONTACT_EMAIL constant.
//   ✅ Canonical set to absolute URL.
//   ✅ Hreflang removed.
//   ✅ aria-hidden removed from breadcrumb <nav>.
//   ✅ FAQ answers 40+ words.
//   ✅ Title within 65-char limit.
//
// NEW UPGRADES — parity with careers/page.tsx:
//   ✅ UPGRADE #2 — contactFaqNode added to the schema graph.
//      Uses the same faqSchema() helper as careers. FAQ data mirrors the
//      faqItems array in ContactPageClient.tsx exactly — single source of truth
//      for FAQ content across both LD+JSON and DOM microdata.
//   ✅ UPGRADE #3 — contactPageNode updated: mainEntity points to contactFaqNode
//      @id, speakable cssSelector updated to include FAQ heading.
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
// METADATA — unchanged from audit
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
// SCHEMA
// ✅ UPGRADE #2 — contactFaqNode added (was missing from original contact page).
//    FAQ content here must stay in sync with faqItems[] in ContactPageClient.tsx.
//    Both use CONTACT_EMAIL so the email address is always consistent.
// ─────────────────────────────────────────────────────────────────────────────
const contactBreadcrumbNode = breadcrumbFromItems([
  { name: "Home",    url: "/" },
  { name: "Contact", url: "/contact" },
]);

// ✅ UPGRADE #2 — NEW: FAQ schema node, matches careers contactFaqNode pattern exactly.
const contactFaqNode = {
  ...faqSchema([
    {
      question: "Does 99 Visual Solutions offer a free consultation?",
      answer:
        `Yes, 99 Visual Solutions offers a completely free initial consultation for web development, 3D visualisation, SEO, and digital marketing projects. Simply fill out the contact form or email us at ${CONTACT_EMAIL} and our team will respond within one business day. All initial consultations are obligation-free and tailored specifically to your project needs and goals.`,
    },
    {
      question: "How quickly does 99 Visual Solutions respond to enquiries?",
      answer:
        `We respond to all form and email enquiries within 24 business hours (Monday to Friday, 9 AM to 6:30 PM IST). For the fastest reply, use the contact form on this page or reach us on WhatsApp. If your enquiry is urgent, please mark it as high priority in the message field so our team can prioritise it and get back to you as soon as possible.`,
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
  ]),
  "@id":            `${BASE}/contact#faq`,
  mainEntityOfPage: { "@id": `${BASE}/contact#webpage` },
};

// ✅ UPGRADE #3 — contactPageNode: speakable cssSelector updated to include
//    the new FAQ heading; breadcrumb @id reference preserved.
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
    // ✅ UPGRADE #3 — added ct-faq-heading for the new FAQ section
    cssSelector: [".ct-hero__h1", ".ct-hero__sub", "#ct-faq-heading"],
  },
  breadcrumb:      { "@id": `${BASE}/contact#breadcrumb` },
  // ✅ UPGRADE #2 — mainEntity now references the FAQ node (careers pattern)
  mainEntity:      { "@id": `${BASE}/contact#faq` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/contact`] },
};

const contactGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  contactPageNode,
  contactBreadcrumbNode,
  // ✅ UPGRADE #2 — contactFaqNode added to graph (was missing in original)
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