// TrendingInsights.tsx
//
// "Most read" list for /insights, ranked by real view counts (Post.viewCount).
// Numbered, compact rows — a different shape from the card grid so it reads
// as its own section, and it adds a second, popularity-ordered set of
// internal links to the articles readers actually value. Renders nothing
// until enough articles have views, so it never shows an arbitrary order.
import Link from 'next/link'
import { Eye, Flame } from 'lucide-react'
import Reveal from '@/app/components/insights/Reveal'
import { formatInsightDate } from '@/lib/insights'

export interface TrendingPost {
  id: string
  slug: string
  title: string
  viewCount: number
  readingTime: number
  publishedAt: Date | null
  category: { name: string; color: string | null }
}

export const MIN_TRENDING_POSTS = 3

export default function TrendingInsights({ posts }: { posts: TrendingPost[] }) {
  if (posts.length < MIN_TRENDING_POSTS) return null
  return (
    <section
      aria-labelledby="trending-heading"
      className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto mb-12 sm:mb-16"
    >
      <Reveal>
        <div className="mb-4 sm:mb-5 flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">
          <span className="h-px w-8 bg-gradient-to-r from-orange-500 to-transparent" aria-hidden="true" />
          <Flame className="w-3.5 h-3.5 text-orange-400" strokeWidth={2} aria-hidden="true" />
          <h2 id="trending-heading" className="font-semibold">Trending Now</h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-gray-800 bg-gray-800">
          {posts.map((post, i) => {
            const accent = post.category.color || '#f97316'
            return (
              <li key={post.id} className="bg-gray-950">
                <Link
                  href={'/insights/' + post.slug}
                  className="group flex items-start gap-4 sm:gap-5 p-4 sm:p-5 h-full transition-colors hover:bg-gray-900/70"
                >
                  <span
                    className="shrink-0 text-2xl sm:text-3xl font-semibold leading-none tabular-nums text-gray-700 transition-colors group-hover:text-orange-400"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="block text-[11px] font-medium uppercase tracking-wider mb-1"
                      style={{ color: accent }}
                    >
                      {post.category.name}
                    </span>
                    <span className="block text-sm sm:text-[15px] font-semibold text-white leading-snug line-clamp-2 transition-colors group-hover:text-orange-400">
                      {post.title}
                    </span>
                    <span className="mt-2 flex flex-wrap items-center gap-x-2 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <Eye className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                        {post.viewCount.toLocaleString('en-IN')} reads
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingTime} min</span>
                      {post.publishedAt && (
                        <>
                          <span aria-hidden="true">·</span>
                          <time dateTime={new Date(post.publishedAt).toISOString()}>
                            {formatInsightDate(post.publishedAt)}
                          </time>
                        </>
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </Reveal>
    </section>
  )
}
