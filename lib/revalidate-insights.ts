// lib/revalidate-insights.ts
// ─────────────────────────────────────────────────────────────────────────────
// Refreshes every statically cached page that lists Insights articles.
//
// The article, listing and topic routes render on demand, but these pages
// are prerendered and only regenerate on a timer:
//   • /sitemap.xml          revalidate = 1h  → a new article could be missing
//                                              from the sitemap for an hour
//   • /llms.txt             revalidate = 1h
//   • /                     revalidate = 60s (homepage Insights section)
//   • /services/*           revalidate = 1h  (RelatedInsights strip)
// Calling this after an editor creates, edits or deletes a post makes new
// articles discoverable (sitemap + internal links) immediately, and stops a
// renamed or deleted article's old URL from lingering in those lists.
// ─────────────────────────────────────────────────────────────────────────────
import { revalidatePath } from 'next/cache'

export function revalidateInsightListings(): void {
  try {
    revalidatePath('/sitemap.xml')
    revalidatePath('/llms.txt')
    revalidatePath('/')
    // 'layout' covers /services and every /services/* page beneath it.
    revalidatePath('/services', 'layout')
  } catch (error) {
    // Never let cache refresh failure turn a successful save into an error.
    console.error('Insights revalidation failed:', error)
  }
}
