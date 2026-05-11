// lib/schema.ts
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Schema.org structured data for 99 Visual Solutions
//
// FIX 1 — @context removed from shared schema objects (orgSchema,
//          localBusinessSchema, websiteSchema). @context now lives ONLY on the
//          outermost @graph wrapper in each page's JSON-LD <script> tag.
//          Previously each export carried its own @context; when those objects
//          were spread into a @graph array the parser received multiple
//          conflicting @context declarations inside a single JSON-LD document —
//          this is invalid JSON-LD and causes Google to reject the entire graph.
//
// FIX 2 — aggregateRating removed from localBusinessSchema. A hardcoded
//          "4.9 / 47 reviews" that has no corresponding review markup or
//          third-party source is treated as fabricated structured data under
//          Google's fake reviews policy and can trigger a manual action.
//          Re-add once you have real, verifiable review data from Google
//          Business Profile, Trustpilot, or a recognised review platform.
//
// HOW TO USE IN A PAGE (App Router example):
//
//   import { buildGraph, orgSchema, localBusinessSchema, websiteSchema } from '@/lib/schema';
//
//   <script
//     type="application/ld+json"
//     dangerouslySetInnerHTML={{ __html: JSON.stringify(
//       buildGraph(orgSchema, localBusinessSchema, websiteSchema, homeBreadcrumb, homeWebPage, homeFaq)
//     )}}
//   />
//
// buildGraph() wraps everything in a single { "@context", "@graph": [...] }
// document — one @context, many nodes.  This is the canonical pattern Google
// recommends for multi-schema pages.
//
// Validate at: https://validator.schema.org  &  https://search.google.com/test/rich-results
// ─────────────────────────────────────────────────────────────────────────────

export const BASE = 'https://www.99visual.com'; // ← update to your live domain

const COMPANY_NAME   = '99 Visual Solutions';
const PHONE          = '+91-9205737431';
const EMAIL          = 'contact@99visual.com';
const STREET_ADDRESS = 'Varthur';
const LOCALITY       = 'Bengaluru';
const REGION         = 'Karnataka';
const POSTAL_CODE    = '560087';
const COUNTRY        = 'IN';
const LAT            = 12.941076388702841;
const LNG            = 77.74127158138299;

// ─────────────────────────────────────────────────────────────────────────────
// @graph helper
// Wraps any number of schema nodes into a single valid JSON-LD document.
// One @context at the top level — zero inside the individual node objects.
// ─────────────────────────────────────────────────────────────────────────────
// Using `object` here is intentional — schema nodes are heterogeneous and
// don't share a common interface beyond being plain objects.
export function buildGraph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': nodes,
  };
}

// ─── 1. Organisation Schema ───────────────────────────────────────────────────
// NOTE: no @context here — it belongs on the @graph wrapper only.
export const orgSchema = {
  '@type': 'Organization',
  '@id': `${BASE}/#organization`,
  name: COMPANY_NAME,
  alternateName: ['99 Visual', '99 Visual Solutions'],
  url: BASE,
  logo: {
    '@type': 'ImageObject',
    '@id': `${BASE}/#logo`,
    url: `${BASE}/logo.png`,
    width: 250,
    height: 60,
    caption: COMPANY_NAME,
  },
  image: `${BASE}/images/home-og.jpg`,
  description:
    'India-based global IT company delivering 3D visualisation, custom web & app development, CAD drafting, GIS & LiDAR mapping, SEO, and IT consulting to businesses across India, USA, UK, UAE & Australia.',
  foundingDate: '2020',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 10,
    maxValue: 50,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: STREET_ADDRESS,
    addressLocality: LOCALITY,
    addressRegion: REGION,
    postalCode: POSTAL_CODE,
    addressCountry: COUNTRY,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: PHONE,
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
      areaServed: ['IN', 'US', 'GB', 'AE', 'AU'],
    },
    {
      '@type': 'ContactPoint',
      email: EMAIL,
      contactType: 'sales',
      availableLanguage: 'English',
    },
  ],
  sameAs: [
    'https://twitter.com/99VisualSoluti1',
    'https://www.linkedin.com/company/99-visual-solutions',
    'https://www.facebook.com/99visualsolutions',
    'https://www.instagram.com/99visualsolutions',
    'https://www.youtube.com/@99visualsolutions',
    'https://share.google/Z8p6oOg8zphuqGsQA',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IT & Digital Transformation Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D Architectural Visualisation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Web Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CAD Drafting Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GIS & LiDAR Mapping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & Digital Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Consulting' } },
    ],
  },
};

// ─── 2. Local Business Schema ─────────────────────────────────────────────────
// NOTE: no @context here.
// NOTE: aggregateRating REMOVED — re-add only when you have real, verifiable
//       review data (Google Business Profile API, Trustpilot widget, etc.).
//       Fabricated ratings are a manual-action trigger under Google policy.
export const localBusinessSchema = {
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${BASE}/#localbusiness`,
  name: COMPANY_NAME,
  image: `${BASE}/images/home-og.jpg`,
  url: BASE,
  telephone: PHONE,
  email: EMAIL,
  priceRange: '$$',
  currenciesAccepted: 'INR, USD, GBP, AED, AUD',
  paymentAccepted: 'Bank Transfer, PayPal, Credit Card, UPI',
  address: {
    '@type': 'PostalAddress',
    streetAddress: STREET_ADDRESS,
    addressLocality: LOCALITY,
    addressRegion: REGION,
    postalCode: POSTAL_CODE,
    addressCountry: COUNTRY,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: LAT,
    longitude: LNG,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '14:00',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Australia' },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: LAT, longitude: LNG },
    geoRadius: '50000',
  },
  // ← aggregateRating intentionally omitted until real review data is available.
  // To re-enable, source ratings from the Google Business Profile API or a
  // verified third-party platform and populate dynamically at build time:
  //
  // aggregateRating: {
  //   '@type': 'AggregateRating',
  //   ratingValue: String(realRatingValue),
  //   reviewCount: String(realReviewCount),
  //   bestRating: '5',
  //   worstRating: '1',
  // },
};

// ─── 3. Website Schema ────────────────────────────────────────────────────────
// NOTE: no @context here.
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${BASE}/#website`,
  name: COMPANY_NAME,
  url: BASE,
  inLanguage: 'en',
  publisher: { '@id': `${BASE}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// ─── 4. Breadcrumb helper ─────────────────────────────────────────────────────
// Returns a node (no @context) — intended for inclusion in a @graph.
export function breadcrumb(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE}${item.url}`,
    })),
  };
}

// ─── 5. WebPage helper ────────────────────────────────────────────────────────
// Returns a node (no @context) — intended for inclusion in a @graph.
export function webPage(opts: {
  url: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbItems?: { name: string; url: string }[];
}) {
  return {
    '@type': 'WebPage',
    '@id': `${BASE}${opts.url}#webpage`,
    url: `${BASE}${opts.url}`,
    name: opts.name,
    description: opts.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    datePublished: opts.datePublished ?? '2024-01-01',
    dateModified: opts.dateModified ?? new Date().toISOString().split('T')[0],
    potentialAction: {
      '@type': 'ReadAction',
      target: [`${BASE}${opts.url}`],
    },
    ...(opts.breadcrumbItems && {
      breadcrumb: breadcrumb(opts.breadcrumbItems),
    }),
  };
}

// ─── 6. FAQ Schema helper ─────────────────────────────────────────────────────
// Returns a node (no @context) — intended for inclusion in a @graph.
// Each answer should be 40–300 words for best rich result eligibility.
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ─── 7. Service Schema helper ─────────────────────────────────────────────────
// Use on individual service pages (/services/3d-visualisation, etc.)
// Returns a node (no @context) — intended for inclusion in a @graph.
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  image?: string;
  areaServed?: string[];
}) {
  return {
    '@type': 'Service',
    '@id': `${BASE}${opts.url}#service`,
    name: opts.name,
    description: opts.description,
    url: `${BASE}${opts.url}`,
    image: opts.image ?? `${BASE}/images/home-og.jpg`,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: (opts.areaServed ?? ['IN', 'US', 'GB', 'AE', 'AU']).map((c) => ({
      '@type': 'Country',
      name: c,
    })),
    serviceType: opts.name,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/contact`,
    },
  };
}

// ─── 8. Article Schema helper ─────────────────────────────────────────────────
// Use on blog/case study pages.
// Returns a node (no @context) — intended for inclusion in a @graph.
export function articleSchema(opts: {
  url: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) {
  return {
    '@type': 'Article',
    '@id': `${BASE}${opts.url}#article`,
    headline: opts.headline,
    description: opts.description,
    image: { '@type': 'ImageObject', url: opts.image, width: 1200, height: 630 },
    url: `${BASE}${opts.url}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: 'en',
    author: { '@type': 'Person', name: opts.authorName },
    publisher: { '@id': `${BASE}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}${opts.url}#webpage` },
  };
}