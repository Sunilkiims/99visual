// Industries served — shared by the homepage IndustryGrid and /industries.
// Summaries are the site's existing "We Serve" copy (app/components/weserve.tsx).
// Use cases describe what the linked services deliver; examples link only to
// real, published work (case studies and video showcase pages).
import type { ServiceKey } from './site-nav';

export interface Industry {
  slug: string;
  name: string;
  summary: string;
  useCases: string[];
  services: ServiceKey[];
  examples?: { label: string; href: string }[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'real-estate-architecture',
    name: 'Real Estate & Architecture',
    summary:
      'Photorealistic renders and precision CAD detailing that transform concept drawings into investor-ready presentations.',
    useCases: [
      'Exterior and interior renders for pre-sales and planning submissions',
      'Walkthrough and flyover animation of unbuilt projects',
      'CAD drafting, BIM modeling and LiDAR as-built documentation',
    ],
    services: ['visualization', 'geospatial', 'web'],
    examples: [
      { label: 'Architectural walkthrough & flyover', href: '/videos/walkthrough-flyover-visualization' },
      { label: '3D visualization showreel', href: '/videos/3d-visualization-showreel' },
    ],
  },
  {
    slug: 'ecommerce-retail',
    name: 'E-commerce & Retail',
    summary:
      'Performance-obsessed storefronts and data-driven SEO that translate traffic into revenue at every funnel stage.',
    useCases: [
      'Custom storefronts with cart, checkout and order tracking',
      'Product visualization for listings and packaging',
      'Technical SEO and performance marketing for category and product pages',
    ],
    services: ['web', 'marketing', 'visualization'],
    examples: [{ label: 'ShilpiKala e-commerce platform', href: '/work/shilpikala-ecommerce-platform' }],
  },
  {
    slug: 'government-public-sector',
    name: 'Government & Public Sector',
    summary:
      'Survey-grade GIS mapping, resilient IT infrastructure, and ISO-compliant data practices for public-sector mandates.',
    useCases: [
      'GIS mapping, digitisation and spatial analysis',
      'Drone photogrammetry and LiDAR processing for infrastructure',
      'Community-facing visuals of proposed developments',
    ],
    services: ['geospatial', 'consulting', 'visualization'],
  },
  {
    slug: 'it-technology',
    name: 'IT & Technology',
    summary: 'Full-lifecycle engineering for complex digital products — from SaaS architecture to cloud-native deployments.',
    useCases: [
      'Custom web applications, dashboards and APIs',
      'Test automation across web, API and AI/LLM features',
      'Cloud migration, security reviews and infrastructure planning',
    ],
    services: ['web', 'testing', 'consulting'],
  },
  {
    slug: 'manufacturing-industrial',
    name: 'Manufacturing & Industrial',
    summary:
      'Real-time monitoring dashboards and automation workflows that cut downtime and sharpen visibility across the plant floor.',
    useCases: [
      'Monitoring dashboards and IoT integration',
      'Product renders before tooling or prototypes are final',
      'CAD drafting from site surveys and as-built measurements',
    ],
    services: ['consulting', 'visualization', 'geospatial'],
  },
  {
    slug: 'healthcare-medical',
    name: 'Healthcare & Medical',
    summary:
      'Secure, compliant platforms — from telehealth portals to EHR-integrated systems — built to protect patient trust at every touchpoint, without slowing clinicians down.',
    useCases: [
      'Patient-facing portals and booking flows',
      'Security, accessibility and performance testing',
      'Infrastructure and data-protection consulting',
    ],
    services: ['web', 'testing', 'consulting'],
  },
  {
    slug: 'startups',
    name: 'Startups & Entrepreneurs',
    summary: 'Zero-to-one product builds and rapid MVPs paired with growth marketing to compound momentum from day one.',
    useCases: [
      'MVP web applications and marketing websites',
      'SEO foundations and launch campaigns',
      'QA processes that scale with the product',
    ],
    services: ['web', 'marketing', 'testing'],
  },
  {
    slug: 'beauty-wellness',
    name: 'Beauty, Salon & Wellness',
    summary:
      'Seamless booking experiences and scroll-stopping brand visuals that turn first-time visitors into recurring clients.',
    useCases: [
      'Booking-ready websites built for mobile',
      'Local SEO and social campaigns',
      'Brand visuals and marketing assets',
    ],
    services: ['web', 'marketing', 'visualization'],
  },
];
