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
} from 'lucide-react'

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
