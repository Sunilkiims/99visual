// InsightCard.tsx
//
// Article card shared by /insights and the topic pages under
// /insights/category/[slug]. Extracted unchanged in look from the original
// grid card in app/insights/page.tsx, with two additions:
//   - the date now includes the year and is a real <time dateTime> element
//     (cards previously showed "20 Jun" with no year, so readers and crawlers
//     couldn't tell how fresh an article was);
//   - the category chip is plain text, because the whole card is one link.
import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import Reveal from '@/app/components/insights/Reveal'
import { CategoryIcon } from '@/app/components/insights/categoryIcon'
import { formatInsightDate } from '@/lib/insights'

export interface InsightCardPost {
  id: string
  slug: string
  title: string
  excerpt: string | null
  readingTime: number
  publishedAt: Date | null
  author: { name: string }
  category: { slug: string; name: string; color: string | null }
  featuredImage: { url: string; altText?: string | null } | null
}

export default function InsightCard({ post, index = 0 }: { post: InsightCardPost; index?: number }) {
  const accent = post.category.color || '#f97316'
  return (
    <Reveal delay={Math.min(index, 6) * 0.06} y={16}>
      <Link
        href={'/insights/' + post.slug}
        className="group flex flex-col h-full bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-700 hover:shadow-xl hover:shadow-black/30"
      >
        <div className="relative aspect-[16/10] bg-gray-900 flex items-center justify-center overflow-hidden">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.altText || post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-gray-700/50">99</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-sm"
              style={{ backgroundColor: accent + '20', color: accent }}
            >
              <CategoryIcon labels={[post.category.slug, post.category.name]} className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
              {post.category.name}
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <h3 className="text-white font-semibold text-sm sm:text-base mb-2 leading-snug line-clamp-2 transition-colors group-hover:text-orange-400">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
          )}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs text-gray-500 pt-3 border-t border-gray-800/80">
            <span className="truncate max-w-[45%]">{post.author.name}</span>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                {post.readingTime} min
              </span>
              {post.publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={new Date(post.publishedAt).toISOString()}>
                    {formatInsightDate(post.publishedAt)}
                  </time>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}
