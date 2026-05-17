// app/contact/page.tsx  — SERVER COMPONENT (no "use client")
// Exports metadata + renders the client shell

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
  buildGraph,
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumb,
  faqSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:
    "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing — Bangalore",
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
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Contact 99 Visual | Free Consultation for Web, 3D & Digital Marketing",
    description:
      "Have a project in mind? Contact 99 Visual Solutions in Bangalore for a free consultation on web development, 3D visualization, SEO, and digital marketing services.",
    url: `${BASE}/contact`, siteName: "99 Visual Solutions",
    images: [{ url: `${BASE}/images/og/contact-og.jpg`, width: 1200, height: 630, alt: "Contact 99 Visual Solutions", type: "image/jpeg" }],
    locale: "en_US", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact 99 Visual | Free Quote for Web, 3D & Digital Marketing",
    description: "Reach us instantly with 99 Visual Solutions in Bangalore for expert web development, 3D visualization, and digital marketing.",
    site: "@99VisualSoluti1", creator: "@99VisualSoluti1",
    images: [{ url: `${BASE}/images/og/contact-og.jpg`, alt: "Contact 99 Visual Solutions" }],
  },
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "" },
  authors: [{ name: "99 Visual Solutions", url: BASE }],
  creator: "99 Visual Solutions", publisher: "99 Visual Solutions",
  category: "Technology", applicationName: "99 Visual Solutions",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
const DATE_PUBLISHED = "2023-01-01";
const DATE_MODIFIED  = new Date().toISOString().split("T")[0];

const contactBreadcrumbNode = {
  ...breadcrumb([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]),
  "@id": `${BASE}/contact#breadcrumb`,
};

const contactFaqNode = {
  ...faqSchema([
    { question: "Does 99 Visual offer a free consultation?", answer: "Yes. 99 Visual Solutions offers a free initial consultation for web development, 3D visualisation, SEO, and digital marketing projects. Simply fill out the contact form and the team will get back to you within one business day." },
    { question: "Where is 99 Visual Solutions located?", answer: "99 Visual Solutions is based in Bengaluru, Karnataka, India. The team works with clients both locally and globally across the USA, UK, UAE, and Australia." },
    { question: "How quickly does 99 Visual respond to enquiries?", answer: "The team typically responds to all enquiries within one business day. You can reach out via the contact form at 99visual.com/contact or by emailing info@99visual.com." },
    { question: "What services can I get a quote for?", answer: "You can request a quote for web development, UI/UX design, 3D visualisation, SEO, digital marketing, GIS services, CAD drafting, and IT consulting." },
    { question: "Does 99 Visual work with international clients?", answer: "Yes. 99 Visual Solutions serves startups and enterprises across India, the USA, UK, UAE, and Australia, offering competitive offshore IT services with fast turnaround times." },
  ]),
  "@id": `${BASE}/contact#faq`,
  mainEntityOfPage: { "@id": `${BASE}/contact#webpage` },
};

const contactPageNode = {
  "@type": "ContactPage", "@id": `${BASE}/contact#webpage`,
  url: `${BASE}/contact`,
  name: "Contact 99 Visual | Get a Free Quote for Web, 3D & Digital Marketing — Bangalore",
  description: "Reach us instantly with 99 Visual Solutions in Bengaluru for a free consultation on web development, 3D visualisation, SEO, and digital marketing services.",
  inLanguage: "en", datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
  isPartOf: { "@id": `${BASE}/#website` }, about: { "@id": `${BASE}/#organization` }, publisher: { "@id": `${BASE}/#organization` },
  primaryImageOfPage: { "@type": "ImageObject", url: `${BASE}/images/og/contact-og.jpg`, width: 1200, height: 630, caption: "Contact 99 Visual Solutions" },
  speakable: { "@type": "SpeakableSpecification", cssSelector: [".ct-hero__h1", ".ct-hero__sub"] },
  breadcrumb: { "@id": `${BASE}/contact#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: [`${BASE}/contact`] },
};

const contactGraph = buildGraph(orgSchema, localBusinessSchema, websiteSchema, contactPageNode, contactBreadcrumbNode, contactFaqNode);

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