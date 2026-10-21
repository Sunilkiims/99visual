// lib/page-dates.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for "when did this page's content last change".
//
// Read by BOTH app/sitemap.ts (<lastmod>) and each page's own JSON-LD
// (WebPage.dateModified), so the two can never disagree again. Previously
// the sitemap claimed 2025-06-01 for most pages — a date before this
// repository existed — while several pages' structured data declared
// September 2026, and a few pages stamped `new Date()` at build time (a false
// "changed today" signal on every deploy).
//
// Values were taken from the date of each page file's last content commit.
// Update an entry ONLY when that page's visible content really changes —
// metadata-only or styling-only edits don't count.
// ─────────────────────────────────────────────────────────────────────────────
export const PAGE_LAST_MODIFIED = {
  '/':                                '2026-06-21',
  '/about':                           '2026-09-12',
  '/services':                        '2026-07-28',
  '/partner':                         '2026-07-29',
  '/careers':                         '2026-09-12',
  '/contact':                         '2026-09-12',
  '/videos':                          '2026-04-01',
  '/press':                           '2026-04-01',
  '/help-center':                     '2026-09-12',
  '/services/website-development':    '2026-10-21',
  '/services/digital-marketing-seo':  '2026-10-21',
  '/services/automation-testing':     '2026-09-24',
  '/services/it-consulting':          '2026-07-28',
  '/services/visualization':          '2026-07-28',
  '/services/cad-gis-photogrammetry': '2026-09-25',
  '/privacy-policy':                  '2026-04-01',
  '/terms':                           '2026-04-01',
} as const;

export type StaticPagePath = keyof typeof PAGE_LAST_MODIFIED;
