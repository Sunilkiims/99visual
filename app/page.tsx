// app/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade home page for 99 Visual Solutions
//
// LOADER FIX APPLIED:
//   ✅ Page content now actually gated behind PageLoader instead of being
//      rendered as an unrelated sibling underneath it. See HomeContent.tsx
//      for the client-side reveal logic — PageLoader reports completion via
//      onComplete, and only then does the page body mount/reveal.
//   ✅ This file stays a server component (no 'use client') so all metadata
//      and JSON-LD structured data continue to be present in the initial
//      server-rendered HTML for crawlers/SEO, completely independent of the
//      client-side loading animation.
//   ✅ InsightsSection (async Server Component, queries Postgres via Prisma)
//      is imported and rendered HERE — in the server component — and passed
//      into <HomeContent> as the `insights` prop. It must not be imported
//      directly inside HomeContent.tsx, since that file is a Client
//      Component: doing so drags the `pg` driver into the browser bundle
//      and breaks the build ("Module not found: pg/lib/...").
//
// PRIOR AUDIT FIXES (unchanged):
//   ✅ CRITICAL #5 — breadcrumbFromPath('/') is the standalone BreadcrumbList
//      node. webPage() now emits only a { @id } reference — no longer embeds
//      a second BreadcrumbList object. Duplicate @id eliminated.
//   ✅ Title shortened to under 65 characters.
//   ✅ Canonical set to absolute URL (not root-relative '/').
//   ✅ Hreflang block removed — all languages pointed to identical URL which
//      provides no signal value; geographic targeting via GSC instead.
//   ✅ Description updated: "5+ years" (matches foundingDate 2020) not "10+".
//   ✅ CONTACT_EMAIL imported from schema.ts — single source of truth.
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import HomeContent from './components/HomeContent';
import InsightsSection from './components/InsightsSection';

// InsightsSection is an async Server Component (it awaits a Prisma query
// before returning JSX). Some @types/react versions don't model async
// components as valid JSX element types, which throws a type-only error
// here even though Next.js's App Router runs this pattern correctly at
// build/runtime. This cast is the standard workaround — it does not change
// any runtime behavior, only satisfies the type checker. Using
// `React.ReactElement` (imported directly) instead of the ambient `JSX`
// namespace, since that namespace isn't globally available in every
// React/TypeScript version combination.
const InsightsSectionAsync = InsightsSection as unknown as () => ReactElement;

export const revalidate = 60

import {
  BASE,
  CONTACT_EMAIL,
  buildGraph,
  orgSchema,
  websiteSchema,
  localBusinessSchema,
  breadcrumbFromPath,
  webPage,
  faqSchema,
} from '@/lib/schema';

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    // ✅ FIX: Shortened to 62 chars — within Google's 50–65 char sweet spot
    default:  '99 Visual Solutions | 3D Viz, Web, CAD, GIS & IT Consulting',
    template: '%s | 99 Visual Solutions',
  },
  description:
    'Bengaluru IT company delivering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting to clients across India, USA, UK, UAE & Australia. 5+ years · 500+ projects.',

  metadataBase: new URL(BASE),

  alternates: {
    // ✅ FIX: Absolute canonical URL
    canonical: `${BASE}/`,
    // ✅ FIX: Hreflang removed — all variants pointed to identical URLs which
    // provides no geographic signal. Use Google Search Console geo-targeting.
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet':       -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  openGraph: {
    // ✅ FIX: OG title kept descriptive but concise
    title:       '99 Visual Solutions | 3D, Web, CAD, GIS & IT Consulting India',
    description: 'Partner with 99 Visual Solutions — Bengaluru IT company offering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting globally. 5+ years · 500+ projects.',
    url:         `${BASE}/`,
    siteName:    '99 Visual Solutions',
    images: [
      {
        url:    `${BASE}/images/home-og.jpg`,
        width:  1200,
        height: 630,
        alt:    '99 Visual Solutions — Global IT & Digital Transformation Company, Bengaluru India',
        type:   'image/jpeg',
      },
    ],
    locale: 'en_US',
    type:   'website',
  },

  twitter: {
    card:        'summary_large_image',
    title:       '99 Visual Solutions | 3D, Web, CAD, GIS & IT Consulting',
    description: 'Bengaluru IT company delivering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO and IT consulting globally. 5+ years · 500+ projects.',
    site:        '@99VisualSoluti1',
    creator:     '@99VisualSoluti1',
    images: [
      {
        url: `${BASE}/images/home-og.jpg`,
        alt: '99 Visual Solutions — Global IT & Digital Transformation Company',
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? '',
  },

  applicationName: '99 Visual Solutions',
  category:        'technology',
  authors:         [{ name: '99 Visual Solutions', url: BASE }],
  creator:         '99 Visual Solutions',
  publisher:       '99 Visual Solutions',
  referrer:        'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA
//
// FIXED PATTERN — how it works now:
//
//  1. breadcrumbFromPath('/') generates a standalone BreadcrumbList node with
//     its own @id: "https://www.99visual.com/#breadcrumb"
//     itemListElement items use { "@type": "Thing", "@id": url } objects.
//
//  2. webPage({ pathname: '/' }) generates a WebPage node whose "breadcrumb"
//     property is { "@id": "https://www.99visual.com/#breadcrumb" } — a
//     reference only. No embedded BreadcrumbList object. No duplicate @id.
//
//  3. Google resolves the reference within the same @graph automatically.
//     Both a standalone BreadcrumbList node AND a WebPage that references it
//     is the pattern Google recommends for breadcrumb rich results.
// ─────────────────────────────────────────────────────────────────────────────
const homeWebPage = webPage({
  pathname:      '/',
  name:          '99 Visual Solutions — Global IT & Digital Transformation Company',
  description:   'Full-service IT company in Bengaluru offering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO, and IT consulting globally. 5+ years of expertise, 500+ projects delivered.',
  datePublished: '2023-01-01',
  dateModified:  new Date().toISOString().split('T')[0],
});

const homeFaq = faqSchema([
  {
    question: 'What services does 99 Visual Solutions offer?',
    answer:
      '99 Visual Solutions is a full-service IT and digital transformation company offering 3D architectural visualisation, custom web and mobile app development, CAD drafting, GIS and LiDAR mapping, digital marketing and SEO, IT consulting, and AI-powered QA and automation testing. We serve startups and enterprises across India, the USA, UK, UAE, and Australia. Our cross-functional team brings deep domain expertise to every engagement, ensuring high-quality deliverables and measurable business outcomes.',
  },
  {
    question: 'Where is 99 Visual Solutions located?',
    answer:
      "99 Visual Solutions is headquartered in Bengaluru (Bangalore), Karnataka, India — one of Asia's leading technology hubs. While our primary office is in Bengaluru, we operate as a remote-first company and serve clients globally across India, the USA, UK, UAE, and Australia. Our team ensures time-zone overlap, real-time communication, and agile delivery for international clients.",
  },
  {
    question: 'Does 99 Visual Solutions work with international clients?',
    answer:
      'Yes, we actively serve startups and enterprises in the USA, UK, UAE, and Australia alongside our Indian clients. Our offshore IT model delivers world-class quality at competitive rates with fast turnaround times, dedicated account managers, and working-hours overlap for real-time communication. We have successfully delivered over 500 projects for international clients across diverse industries including real estate, construction, healthcare, retail, and government.',
  },
  {
    question: 'How can I get a quote from 99 Visual Solutions?',
    answer:
      `You can request a free quote by visiting our contact page at 99visual.com/contact or emailing us at ${CONTACT_EMAIL}. Our team typically responds within 24 business hours. We offer detailed project scoping calls at no charge to ensure your requirements are fully understood before any proposal is sent. All initial consultations are obligation-free.`,
  },
  {
    question: 'How much does 3D architectural visualisation cost in India?',
    answer:
      `The cost of 3D architectural visualisation at 99 Visual Solutions depends on project scope, number of views, level of detail, and required turnaround time. We offer highly competitive rates compared to Western studios while maintaining international quality standards. Pricing varies by project type — from single exterior stills to full animated walkthroughs. Contact us at ${CONTACT_EMAIL} for a tailored, no-obligation quote based on your specific requirements.`,
  },
  {
    question: 'What industries does 99 Visual Solutions serve?',
    answer:
      'We serve a wide range of industries including real estate, architecture, construction, healthcare, retail, e-commerce, education, logistics, government, and manufacturing. Our cross-functional team of engineers, designers, and domain specialists ensures solutions that are technically sound and commercially effective for each sector. Whether you are a startup looking for your first digital product or an enterprise modernising a legacy system, we have the expertise to deliver.',
  },
  {
    question: 'Can 99 Visual Solutions handle end-to-end web and app development?',
    answer:
      'Yes. We manage the complete product lifecycle — from UX research and UI design to frontend development, backend engineering, API integrations, cloud deployment on AWS, GCP, or Azure, and long-term post-launch support and maintenance. We work with modern technology stacks including React, Next.js, Node.js, Python, Flutter, and more. Our agile delivery methodology ensures transparent communication and iterative progress throughout the project.',
  },
  {
    question: 'What makes 99 Visual Solutions different from other IT companies in India?',
    answer:
      'We combine multi-disciplinary expertise under one roof — 3D visualisation, GIS and LiDAR, CAD, web and app development, SEO, and IT consulting — meaning you get a single accountable partner instead of managing multiple agencies. Founded in 2020 and headquartered in Bengaluru, our team brings international project experience, agile delivery methods, transparent communication, and a client-first approach to every engagement. We have delivered 500+ projects across India, USA, UK, UAE, and Australia.',
  },
]);

// ─── Single @graph document — one @context, all nodes ────────────────────────
const homeGraph = buildGraph(
  orgSchema,
  localBusinessSchema,
  websiteSchema,
  // ✅ FIX: standalone BreadcrumbList node — webPage() references it by @id only
  breadcrumbFromPath('/'),
  homeWebPage,
  homeFaq,
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
//
// Stays a server component so metadata + JSON-LD are present in the initial
// HTML regardless of client-side loading state. All visual page content
// (header, slider, sections, etc.) is delegated to <HomeContent />, a client
// component that gates that content behind <PageLoader />'s completion.
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* Single JSON-LD script — one @context, @graph array, fully valid */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGraph) }}
      />

      <HomeContent insights={<InsightsSectionAsync />} />
    </>
  );
}
