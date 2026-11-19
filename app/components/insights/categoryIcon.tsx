// categoryIcon.tsx
//
// Maps a blog category (by slug/name) to a Lucide icon. Colors are left
// completely alone — every existing usage of `category.color` from Prisma
// stays exactly as it was, this only adds a matching glyph next to it.
//
// The icon choices deliberately mirror app/components/header.tsx's services
// mega-menu (Boxes for Visualization, Code2 for Website Development,
// BrainCircuit for IT Consulting, TrendingUp for Digital Marketing & SEO,
// Compass for CAD/GIS/Photogrammetry, ShieldCheck for QA & Automation) so a
// reader sees the same iconography whether they're in the nav or reading an
// article about that same discipline. Anything that doesn't match a known
// service (e.g. "Business", "Technology", "Game Art") falls back sensibly.

import {
  Boxes,
  Code2,
  BrainCircuit,
  TrendingUp,
  Compass,
  ShieldCheck,
  Gamepad2,
  Briefcase,
  Cpu,
  Sparkles,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'
import { createElement } from 'react'

export function getCategoryIcon(...labels: (string | null | undefined)[]): LucideIcon {
  const s = labels.filter(Boolean).join(' ').toLowerCase()

  if (/3d|visual|render|immers/.test(s)) return Boxes
  if (/web(site)?|frontend|full[\s-]?stack/.test(s)) return Code2
  if (/it[\s-]?consult|architect|strategy/.test(s)) return BrainCircuit
  if (/market|seo|growth|campaign/.test(s)) return TrendingUp
  if (/gis|cad|photogram|spatial|mapping/.test(s)) return Compass
  if (/automat|testing|qa\b/.test(s)) return ShieldCheck
  if (/game/.test(s)) return Gamepad2
  if (/business/.test(s)) return Briefcase
  if (/tech/.test(s)) return Cpu

  return Sparkles
}

// ─────────────────────────────────────────────────────────────────────────────
// Related service for an article — used for a contextual "related service"
// link on Insights articles, so each article links to the service page it
// is actually about (and that page gains a relevant internal link). Returns
// null when an article doesn't clearly map to one service, rather than
// forcing a link.
//
// Rules run from MOST to LEAST specific. The previous order checked the
// broad patterns (3d, web, website, next.js) first, so "Testing a Next.js
// app with Playwright" mapped to Website Development and "LiDAR point cloud
// to 3D model" to Visualization; QA was checked last and almost never won,
// leaving /services/automation-testing with no article links at all.
// "automat" was also dropped from the QA rule because it matched
// "marketing automation". Covered by tests/insights/related-service.test.ts.
// ─────────────────────────────────────────────────────────────────────────────
const RELATED_SERVICE_RULES: { test: RegExp; href: string; label: string }[] = [
  { test: /\bqa\b|\btest(s|ing)?\b|test automation|playwright|cypress|selenium|regression suite/, href: '/services/automation-testing', label: 'QA & Automation Testing' },
  { test: /\bgis\b|\bcad\b|photogram|lidar|geospatial|point[\s-]?cloud|topograph|surveying|land survey|orthomosaic/, href: '/services/cad-gis-photogrammetry', label: 'CAD, GIS & Photogrammetry' },
  { test: /\bseo\b|search engine|digital marketing|\bmarketing\b|\bppc\b|google ads|algorithm/, href: '/services/digital-marketing-seo', label: 'Digital Marketing & SEO' },
  { test: /\b3d\b|visuali[sz]|render|immers|walkthrough|\bbim\b/, href: '/services/visualization', label: '3D Visualization & Rendering' },
  { test: /\bweb(site|sites| app| apps)?\b|frontend|front-end|full[\s-]?stack|next\.?js|react|e-?commerce/, href: '/services/website-development', label: 'Website & Web App Development' },
  { test: /\bit[\s-]?consult|cloud|cyber|digital transformation/, href: '/services/it-consulting', label: 'IT Consulting' },
]

export function getRelatedService(
  ...labels: (string | null | undefined)[]
): { href: string; label: string } | null {
  const s = labels.filter(Boolean).join(' ').toLowerCase()
  const rule = RELATED_SERVICE_RULES.find((r) => r.test.test(s))
  return rule ? { href: rule.href, label: rule.label } : null
}

// ─────────────────────────────────────────────────────────────────────────────
// <CategoryIcon labels={[slug, name]} … /> — renders getCategoryIcon()'s
// icon. Use this in JSX instead of assigning the returned component to a
// local variable during render (which the react-hooks lint rule flags).
// ─────────────────────────────────────────────────────────────────────────────
export function CategoryIcon({
  labels,
  ...props
}: { labels: (string | null | undefined)[] } & LucideProps) {
  return createElement(getCategoryIcon(...labels), props)
}
