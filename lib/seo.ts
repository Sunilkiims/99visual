// lib/seo.ts
// ─────────────────────────────────────────────────────────────────────────────
// Small, framework-agnostic SEO helpers shared by pages, the sitemap and the
// admin API. Keep this file free of React/Next imports so it can be used from
// route handlers, server components and scripts alike.
// ─────────────────────────────────────────────────────────────────────────────
import { BASE } from './schema';

export const SITE_NAME = '99 Visual Solutions';

/** Hostname of the one canonical production origin (e.g. "www.99visual.com"). */
export const PRODUCTION_HOST = new URL(BASE).host;

// Matches a trailing brand suffix such as " | 99 Visual Solutions",
// " — 99 Visual", " - 99 Visual Solutions". The root layout's title template
// ("%s | 99 Visual Solutions") already appends the brand, so any title that
// carries its own suffix would otherwise render it twice.
const BRAND_SUFFIX = /\s*[|—–-]\s*99\s*Visual(?:\s+Solutions)?\s*$/i;

/** Removes any trailing brand suffix(es) from a page title. */
export function stripBrandSuffix(title: string): string {
  let t = title.trim();
  while (BRAND_SUFFIX.test(t)) t = t.replace(BRAND_SUFFIX, '').trim();
  return t || title.trim();
}

/** Absolute production URL for a root-relative path ("/insights/x"). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * True only for absolute https URLs on the production origin. Used to decide
 * whether a canonical URL stored in the CMS can be trusted — anything else
 * (another domain, the staging host, a relative or malformed value) must be
 * ignored in favour of the page's own self-referencing canonical.
 */
export function isProductionUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && u.host === PRODUCTION_HOST;
  } catch {
    return false;
  }
}

/** Parses a robots string such as "noindex, follow" into booleans. */
export function parseRobots(value: string | null | undefined): { index: boolean; follow: boolean } {
  const v = (value || '').toLowerCase();
  return {
    index: !/\bnoindex\b|\bnone\b/.test(v),
    follow: !/\bnofollow\b|\bnone\b/.test(v),
  };
}

/** Canonical URL for an Insights article. */
export function insightUrl(slug: string): string {
  return `${BASE}/insights/${slug}`;
}
