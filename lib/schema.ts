// lib/schema.ts
// ─────────────────────────────────────────────────────────────────────────────
// Production-grade Schema.org structured data — 99 Visual Solutions
//
// AUDIT FIXES APPLIED:
//   ✅ breadcrumbFromItems() — item is now { "@type": "Thing", "@id": url }
//      instead of a bare string URL. Fixes Google Rich Results eligibility.
//   ✅ webPage() — breadcrumb is now a { @id } reference only, NOT an embedded
//      object. Eliminates duplicate BreadcrumbList nodes when both webPage()
//      and a standalone breadcrumbFromPath() node are in the same @graph.
//   ✅ breadcrumbFromPath() — item is now { "@type": "Thing", "@id": url }
//   ✅ datePublished default changed from "2024-01-01" to "2023-01-01" to match
//      earliest page publication date used across the codebase.
//   ✅ orgSchema — added knowsAbout, slogan, potentialAction for E-E-A-T.
//   ✅ localBusinessSchema — added knowsAbout, serviceOutput.
//   ✅ websiteSchema — SearchAction preserved (ensure /search route exists,
//      or remove potentialAction if the route is not implemented).
//   ✅ Deprecated breadcrumb() alias kept for backwards compatibility but
//      now emits correct item objects — remove usages progressively.
//   ✅ CONTACT_EMAIL exported as single source of truth.
//   ✅ All helpers return nodes with no @context — always use buildGraph().
//
// VALIDATE:
//   https://validator.schema.org
//   https://search.google.com/test/rich-results
// ─────────────────────────────────────────────────────────────────────────────

// ─── Site constants — edit once, reflected everywhere ────────────────────────
export const BASE           = 'https://www.99visual.com'; // no trailing slash
export const CONTACT_EMAIL  = 'contact@99visual.com';     // single source of truth
const COMPANY_NAME          = '99 Visual Solutions';
const PHONE                 = '+91-9205737431';
const STREET_ADDRESS        = 'Varthur';
const LOCALITY              = 'Bengaluru';
const REGION                = 'Karnataka';
const POSTAL_CODE           = '560087';
const COUNTRY               = 'IN';
const LAT                   =  12.941076388702841;
const LNG                   =  77.74127158138299;
const DEFAULT_IMAGE         = `${BASE}/images/home-og.jpg`;
const AREA_SERVED           = ['IN', 'US', 'GB', 'AE', 'AU'];
const AREA_SERVED_FULL      = [
  { '@type': 'Country', name: 'India' },
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'United Arab Emirates' },
  { '@type': 'Country', name: 'Australia' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Internal util — converts a URL slug to Title Case
// "gis-lidar-mapping" → "GIS Lidar Mapping"
// Override any slug via labelMap.
// ─────────────────────────────────────────────────────────────────────────────
function slugToLabel(slug: string, labelMap: Record<string, string> = {}): string {
  if (labelMap[slug]) return labelMap[slug];
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal util — resolves root-relative paths to absolute URLs
// ─────────────────────────────────────────────────────────────────────────────
function abs(path: string): string {
  return path.startsWith('http') ? path : `${BASE}${path}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 0. buildGraph — ONE @context, ONE @graph, ONE <script> tag per page
// ─────────────────────────────────────────────────────────────────────────────
export function buildGraph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.flat(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Organisation
// ─────────────────────────────────────────────────────────────────────────────
export const orgSchema = {
  '@type': 'Organization',
  '@id': `${BASE}/#organization`,
  name: COMPANY_NAME,
  alternateName: ['99 Visual', '99 Visual Solutions'],
  url: BASE,
  slogan: "We Don't Just Build Technology. We Build What's Next.",
  logo: {
    '@type': 'ImageObject',
    '@id': `${BASE}/#logo`,
    url: `${BASE}/logo.png`,
    width: 250,
    height: 60,
    caption: COMPANY_NAME,
  },
  image: DEFAULT_IMAGE,
  description:
    'India-based global IT company delivering 3D visualisation, custom web & app development, CAD drafting, GIS & LiDAR mapping, SEO, and IT consulting to businesses across India, USA, UK, UAE & Australia.',
  foundingDate: '2020',
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
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
      areaServed: AREA_SERVED,
    },
    {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
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
  // ── E-E-A-T signals ─────────────────────────────────────────────────────
  knowsAbout: [
    '3D Architectural Visualisation',
    'Web Application Development',
    'Mobile App Development',
    'CAD Drafting',
    'GIS Mapping',
    'LiDAR Data Processing',
    'Search Engine Optimization',
    'Digital Marketing',
    'IT Consulting',
    'AI-Powered QA Testing',
    'Photogrammetry',
    'Cloud Migration',
    'Cybersecurity',
  ],
  potentialAction: [
    {
      '@type': 'ContactAction',
      name: 'Contact 99 Visual Solutions',
      target: `${BASE}/contact`,
    },
    {
      '@type': 'ViewAction',
      name: 'View All Services',
      target: `${BASE}/services`,
    },
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
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI-Powered QA & Automation Testing' } },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Local Business
// aggregateRating — fetch from GBP API at build time; never hardcode.
// Uncomment and populate with real data from Google Business Profile API.
// ─────────────────────────────────────────────────────────────────────────────
export const localBusinessSchema = {
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${BASE}/#localbusiness`,
  name: COMPANY_NAME,
  image: DEFAULT_IMAGE,
  url: BASE,
  telephone: PHONE,
  email: CONTACT_EMAIL,
  priceRange: '$$',
  currenciesAccepted: 'INR, USD, GBP, AED, AUD',
  paymentAccepted: 'Bank Transfer, PayPal, Credit Card, UPI',
  slogan: "We Don't Just Build Technology. We Build What's Next.",
  serviceOutput:
    'Digital transformation, web development, 3D visualisation, CAD/GIS mapping, SEO, and IT consulting deliverables',
  knowsAbout: [
    '3D Architectural Visualisation',
    'Web Application Development',
    'CAD Drafting',
    'GIS Mapping',
    'LiDAR Data Processing',
    'Search Engine Optimization',
    'IT Consulting',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: STREET_ADDRESS,
    addressLocality: LOCALITY,
    addressRegion: REGION,
    postalCode: POSTAL_CODE,
    addressCountry: COUNTRY,
  },
  geo: { '@type': 'GeoCoordinates', latitude: LAT, longitude: LNG },
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
  areaServed: AREA_SERVED_FULL,
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: LAT, longitude: LNG },
    geoRadius: '50000',
  },
  // ── Uncomment when real rating data is available from GBP API ────────────
  // aggregateRating: {
  //   '@type': 'AggregateRating',
  //   ratingValue: String(realRatingValue),
  //   reviewCount: String(realReviewCount),
  //   bestRating: '5',
  //   worstRating: '1',
  // },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Website
// NOTE: SearchAction requires a working /search route in your Next.js app.
// If /search is not implemented, remove the potentialAction block to avoid
// a non-functional Sitelinks Searchbox in Google Search results.
// ─────────────────────────────────────────────────────────────────────────────
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${BASE}/#website`,
  name: COMPANY_NAME,
  url: BASE,
  inLanguage: 'en',
  publisher: { '@id': `${BASE}/#organization` },
  // Remove potentialAction below if /search route does not exist:
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4a. DYNAMIC breadcrumb — auto-generated from URL path  ← USE THIS
//
// FIX: item is now { "@type": "Thing", "@id": absoluteURL } — required by
// Google Rich Results Test. Bare string URLs fail eligibility checks.
//
// Examples:
//   breadcrumbFromPath('/services/cad-drafting')
//   → Home > Services > Cad Drafting
//
//   breadcrumbFromPath('/services/gis-lidar-mapping', {
//     'gis-lidar-mapping': 'GIS & LiDAR Mapping',
//   })
//   → Home > Services > GIS & LiDAR Mapping
// ─────────────────────────────────────────────────────────────────────────────
export function breadcrumbFromPath(
  pathname: string,
  labelMap: Record<string, string> = {},
  homeLabel = 'Home',
) {
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/$/, '');
  const segments = clean.split('/').filter(Boolean);

  const items = [
    { name: homeLabel, url: BASE + '/' },
    ...segments.map((seg, i) => ({
      name: slugToLabel(seg, labelMap),
      url: `${BASE}/${segments.slice(0, i + 1).join('/')}`,
    })),
  ];

  return {
    '@type': 'BreadcrumbList',
    '@id': `${BASE}${clean || '/'}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      // ✅ FIX: item must be an object with @id for Google Rich Results eligibility
      item: {
        '@type': 'Thing',
        '@id': item.url,
      },
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4b. EXPLICIT breadcrumb — full manual control
//
// FIX: item is now { "@type": "Thing", "@id": absoluteURL }
//
// Use when the visible trail doesn't match the URL structure.
//
// Example:
//   breadcrumbFromItems([
//     { name: 'Home',     url: '/' },
//     { name: 'Services', url: '/services' },
//     { name: 'CAD Drafting', url: '/services/cad-drafting' },
//   ])
// ─────────────────────────────────────────────────────────────────────────────
export function breadcrumbFromItems(items: { name: string; url: string }[]) {
  const lastUrl = abs(items[items.length - 1]?.url ?? '/');
  return {
    '@type': 'BreadcrumbList',
    '@id': `${lastUrl}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      // ✅ FIX: item must be an object with @id for Google Rich Results eligibility
      item: {
        '@type': 'Thing',
        '@id': abs(item.url),
      },
    })),
  };
}

// ─── Legacy alias — backwards compatible with old breadcrumb() calls ──────────
// ✅ FIX: Now delegates to corrected breadcrumbFromItems() which emits proper
//    item objects. Safe to continue using but migrate to breadcrumbFromPath()
//    or breadcrumbFromItems() directly for new pages.
/** @deprecated Use breadcrumbFromPath() or breadcrumbFromItems() */
export const breadcrumb = breadcrumbFromItems;

// ─────────────────────────────────────────────────────────────────────────────
// 5. WebPage
//
// FIX: breadcrumb is now a { @id } reference ONLY — not an embedded object.
// This eliminates duplicate BreadcrumbList nodes when a standalone
// breadcrumbFromPath() node is also added to the same buildGraph() call.
// The standalone node provides the data; the WebPage node references it.
//
// Example:
//   webPage({
//     pathname: '/services/cad-drafting',
//     name: 'CAD Drafting Services | 99 Visual Solutions',
//     description: '...',
//   })
// ─────────────────────────────────────────────────────────────────────────────
export function webPage(opts: {
  pathname: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  /** Label overrides forwarded to breadcrumb @id resolution */
  labelMap?: Record<string, string>;
}) {
  // Normalise: ensure pathname starts with /
  const path = opts.pathname.startsWith('/') ? opts.pathname : `/${opts.pathname}`;
  // Breadcrumb @id matches what breadcrumbFromPath() generates for this path
  const breadcrumbId = `${BASE}${path || '/'}#breadcrumb`;

  return {
    '@type': 'WebPage',
    '@id': `${BASE}${path}#webpage`,
    url: `${BASE}${path}`,
    name: opts.name,
    description: opts.description,
    inLanguage: 'en',
    image: opts.image ?? DEFAULT_IMAGE,
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    publisher: { '@id': `${BASE}/#organization` },
    // ✅ FIX: datePublished default matches earliest published page (2023-01-01)
    datePublished: opts.datePublished ?? '2023-01-01',
    dateModified: opts.dateModified ?? new Date().toISOString().split('T')[0],
    potentialAction: { '@type': 'ReadAction', target: [`${BASE}${path}`] },
    // ✅ FIX: reference only — standalone breadcrumb node in @graph provides data
    breadcrumb: { '@id': breadcrumbId },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. FAQ — each answer 40–300 words for rich result eligibility
// ─────────────────────────────────────────────────────────────────────────────
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Service — use on individual service pages
// FIX: areaServed now uses full country name objects (not ISO codes)
//      so schema.org resolves them correctly.
// ─────────────────────────────────────────────────────────────────────────────
export function serviceSchema(opts: {
  name: string;
  description: string;
  pathname?: string;
  url?: string;        // accepts either pathname or full url for backwards compat
  image?: string;
  areaServed?: Array<{ '@type': string; name: string }>;
}) {
  // Support both pathname ('/services/foo') and full url prop (legacy)
  const resolvedPath = opts.pathname
    ? opts.pathname
    : opts.url
    ? opts.url.replace(BASE, '')
    : '/services';

  return {
    '@type': 'Service',
    '@id': `${BASE}${resolvedPath}#service`,
    name: opts.name,
    description: opts.description,
    url: `${BASE}${resolvedPath}`,
    image: opts.image ?? DEFAULT_IMAGE,
    provider: { '@id': `${BASE}/#organization` },
    // ✅ FIX: full country name objects — not ISO codes
    areaServed: opts.areaServed ?? AREA_SERVED_FULL,
    serviceType: opts.name,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/contact`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Article — use on blog / case study pages
// ─────────────────────────────────────────────────────────────────────────────
export function articleSchema(opts: {
  pathname: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) {
  return {
    '@type': 'Article',
    '@id': `${BASE}${opts.pathname}#article`,
    headline: opts.headline,
    description: opts.description,
    image: { '@type': 'ImageObject', url: opts.image, width: 1200, height: 630 },
    url: `${BASE}${opts.pathname}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: 'en',
    author: { '@type': 'Person', name: opts.authorName },
    publisher: { '@id': `${BASE}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}${opts.pathname}#webpage` },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// USAGE — copy-paste into any page file
// ─────────────────────────────────────────────────────────────────────────────
//
// ── Home (/page.tsx) ─────────────────────────────────────────────────────────
// const graph = buildGraph(
//   orgSchema, localBusinessSchema, websiteSchema,
//   breadcrumbFromPath('/'),          // ← standalone BreadcrumbList node
//   webPage({                         // ← WebPage references breadcrumb by @id
//     pathname: '/',
//     name: '99 Visual Solutions | Home',
//     description: '...',
//   }),
//   faqSchema([...]),
// );
//
// ── Service (/services/cad-drafting/page.tsx) ─────────────────────────────────
// const graph = buildGraph(
//   orgSchema, websiteSchema,
//   breadcrumbFromPath('/services/cad-drafting', { 'cad-drafting': 'CAD Drafting' }),
//   serviceSchema({ name: 'CAD Drafting', description: '...', pathname: '/services/cad-drafting' }),
//   webPage({ pathname: '/services/cad-drafting', name: '...', description: '...' }),
//   faqSchema([...]),
// );
//
// ── Blog (/blog/my-post/page.tsx) ─────────────────────────────────────────────
// const graph = buildGraph(
//   orgSchema, websiteSchema,
//   breadcrumbFromPath('/blog/my-post', { 'my-post': 'My Full Post Title' }),
//   articleSchema({ pathname: '/blog/my-post', headline: '...', ... }),
//   webPage({ pathname: '/blog/my-post', name: '...', description: '...' }),
// );
//
// ── In JSX ────────────────────────────────────────────────────────────────────
// <script
//   type="application/ld+json"
//   dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
// />