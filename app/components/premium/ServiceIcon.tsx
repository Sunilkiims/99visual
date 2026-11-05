import { Box, Code2, TrendingUp, Satellite, ShieldCheck, Cloud } from 'lucide-react';
import type { ServiceKey } from '@/lib/site-nav';

const ICONS = {
  visualization: Box,
  web: Code2,
  marketing: TrendingUp,
  geospatial: Satellite,
  testing: ShieldCheck,
  consulting: Cloud,
} as const;

export default function ServiceIcon({ name, size = 20 }: { name: ServiceKey; size?: number }) {
  const Icon = ICONS[name];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
