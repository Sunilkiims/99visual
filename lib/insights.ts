// lib/insights.ts
// ─────────────────────────────────────────────────────────────────────────────
// Shared Insights helpers (URLs, thresholds, date formatting) used by the
// listing, topic (category) pages, article pages and the sitemap.
// ─────────────────────────────────────────────────────────────────────────────
import { BASE } from './schema';

/**
 * A topic page is only indexable (and listed in the sitemap) once it has at
 * least this many published articles. A hub that lists a single article is
 * thin, near-duplicate content; below the threshold it renders as
 * `noindex, follow` so readers can still use it and its links stay crawlable.
 */
export const MIN_POSTS_FOR_INDEXABLE_TOPIC = 2;

/** Root-relative path of a topic (category) page. */
export function topicPath(categorySlug: string): string {
  return `/insights/category/${categorySlug}`;
}

/** Absolute canonical URL of a topic (category) page. */
export function topicUrl(categorySlug: string): string {
  return `${BASE}${topicPath(categorySlug)}`;
}

/** "21 Jun 2026" — always includes the year so readers can judge freshness. */
export function formatInsightDate(d: Date | string): string {
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
}
