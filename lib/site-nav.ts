// Shared navigation + service catalogue for the redesigned header, mobile
// menu, footer and homepage. URLs are the existing production URLs — do not
// change them here without adding redirects in next.config.ts.

export type ServiceKey =
  | 'visualization'
  | 'web'
  | 'marketing'
  | 'geospatial'
  | 'testing'
  | 'consulting';

export interface ServiceNavItem {
  key: ServiceKey;
  href: string;
  label: string;
  short: string;
}

export const SERVICES: ServiceNavItem[] = [
  {
    key: 'visualization',
    href: '/services/visualization',
    label: '3D Visualization',
    short: 'Architectural rendering, walkthrough animation and product visualization.',
  },
  {
    key: 'web',
    href: '/services/website-development',
    label: 'Website Development',
    short: 'Fast, secure websites and custom web applications built to scale.',
  },
  {
    key: 'marketing',
    href: '/services/digital-marketing-seo',
    label: 'Digital Marketing & SEO',
    short: 'Technical SEO, content and performance marketing tied to revenue.',
  },
  {
    key: 'geospatial',
    href: '/services/cad-gis-photogrammetry',
    label: 'CAD, GIS, LiDAR & Photogrammetry',
    short: 'CAD drafting, GIS mapping, LiDAR point clouds and drone photogrammetry.',
  },
  {
    key: 'testing',
    href: '/services/automation-testing',
    label: 'QA & Automation Testing',
    short: 'Functional, API, performance and AI application testing.',
  },
  {
    key: 'consulting',
    href: '/services/it-consulting',
    label: 'IT Consulting',
    short: 'Cloud migration, cybersecurity, infrastructure and IT project delivery.',
  },
];

export const PRIMARY_NAV = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/industries', label: 'Industries' },
  { href: '/insights', label: 'Insights' },
  { href: '/careers', label: 'Careers' },
];

export const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Our Work' },
  { href: '/industries', label: 'Industries' },
  { href: '/partner', label: 'Partner With Us' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export const RESOURCE_LINKS = [
  { href: '/insights', label: 'Insights' },
  { href: '/videos', label: 'Video Showcase' },
  { href: '/press', label: 'Press & Media' },
  { href: '/help-center', label: 'Help Center' },
];

export const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/company/99-visual-solutions/', label: 'LinkedIn' },
  { href: 'https://x.com/99VisualSoluti1', label: 'X (Twitter)' },
  { href: 'https://www.instagram.com/99visualsolutions/', label: 'Instagram' },
  { href: 'https://www.facebook.com/profile.php?id=100093639888151', label: 'Facebook' },
  { href: 'https://www.youtube.com/@99visualsolutions', label: 'YouTube' },
] as const;
