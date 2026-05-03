/**
 * lib/schema.ts
 * Place this file at:  <project-root>/lib/schema.ts
 *
 * Import in any page.tsx:
 *   import { orgSchema, websiteSchema, localBusinessSchema,
 *            breadcrumb, webPage, servicePageSchema, faqSchema } from '@/lib/schema';
 *
 * Render in JSX:
 *   <script type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
 */

export const BASE = 'https://www.99visual.com';

// ─── Internal helper ──────────────────────────────────────────────────────────
function abs(url: string): string {
  return url.startsWith('http') ? url : `${BASE}${url}`;
}

// ─── Shared types ─────────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SubService {
  name: string;
  description: string;
}

export interface WebPageOptions {
  url: string;
  name: string;
  description: string;
  dateModified?: string;
}

export interface ServicePageOptions {
  url: string;
  name: string;
  description: string;
  serviceType: string;
  subServices?: SubService[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

// ─── 1. Organization ─────────────────────────────────────────────────────────
export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE}/#organization`,
  name: '99 Visual Solutions',
  legalName: '99 Visual Solutions',
  url: BASE,
  logo: {
    '@type': 'ImageObject',
    '@id': `${BASE}/#logo`,
    url: `${BASE}/logo.png`,
    contentUrl: `${BASE}/logo.png`,
    width: 300,
    height: 60,
    caption: '99 Visual Solutions',
  },
  image: { '@id': `${BASE}/#logo` },
  description:
    '99 Visual Solutions is a full-service IT and digital transformation company delivering 3D visualisation, web & app development, CAD, GIS, LiDAR, SEO, and IT consulting to startups and enterprises globally.',
  foundingDate: '2015',
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: `${BASE}/contact`,
      email: 'contact@99visual.com',
      availableLanguage: ['English'],
      areaServed: ['IN', 'US', 'GB', 'AU', 'AE'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      url: `${BASE}/contact`,
      availableLanguage: ['English'],
    },
  ],
  sameAs: [
    'https://x.com/99VisualSoluti1',
    'https://www.linkedin.com/company/99-visual-solutions/',
    'https://www.facebook.com/profile.php?id=100093639888151',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IT & Digital Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D Visualisation & Architectural Rendering' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web & App Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Consulting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing & SEO' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CAD, GIS & Photogrammetry' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI-Powered QA & Automation Testing' } },
    ],
  },
};

// ─── 2. WebSite ───────────────────────────────────────────────────────────────
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE}/#website`,
  url: BASE,
  name: '99 Visual Solutions',
  description:
    'Global IT & Digital Transformation — 3D Visualisation, Web Development, CAD, GIS, LiDAR, SEO & IT Consulting.',
  publisher: { '@id': `${BASE}/#organization` },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/?s={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

// ─── 3. LocalBusiness ────────────────────────────────────────────────────────
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${BASE}/#localbusiness`,
  name: '99 Visual Solutions',
  image: `${BASE}/images/about-og.jpg`,
  url: BASE,
  email: 'contact@99visual.com',
  // telephone: '+91-XXXXXXXXXX',  ← add when available
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    // postalCode: '560001',        ← add when available
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'INR, USD, GBP, AED, AUD',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  sameAs: [
    'https://x.com/99VisualSoluti1',
    'https://www.linkedin.com/company/99-visual-solutions/',
    'https://www.facebook.com/profile.php?id=100093639888151',
  ],
};

// ─── 4. BreadcrumbList factory ────────────────────────────────────────────────
export function breadcrumb(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

// ─── 5. WebPage factory ───────────────────────────────────────────────────────
export function webPage({ url, name, description, dateModified = '2025-05-01' }: WebPageOptions) {
  const absUrl = abs(url);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absUrl}#webpage`,
    url: absUrl,
    name,
    description,
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    datePublished: '2023-01-01',
    dateModified,
    inLanguage: 'en-US',
    breadcrumb: { '@id': `${absUrl}#breadcrumb` },
    potentialAction: { '@type': 'ReadAction', target: [absUrl] },
  };
}

// ─── 6. Service schema factory ────────────────────────────────────────────────
export function servicePageSchema({
  url,
  name,
  description,
  serviceType,
  subServices = [],
}: ServicePageOptions) {
  const absUrl = abs(url);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absUrl}#service`,
    serviceType,
    name,
    description,
    url: absUrl,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Australia' },
    ],
    ...(subServices.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${name} Sub-Services`,
        itemListElement: subServices.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, description: s.description },
        })),
      },
    }),
  };
}

// ─── 7. FAQ schema factory ────────────────────────────────────────────────────
export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}