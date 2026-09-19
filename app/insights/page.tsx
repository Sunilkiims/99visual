import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import ConsultationCTA from '@/app/components/ConsultationCTA'
import Reveal from '@/app/components/insights/Reveal'
import { getCategoryIcon } from '@/app/components/insights/categoryIcon'
import { BASE } from '@/lib/schema'
import {
  Search,
  Clock,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Code2,
  BrainCircuit,
  TrendingUp,
  Compass,
  ShieldCheck,
} from 'lucide-react'

interface Props {
  searchParams: Promise<{ category?: string; tag?: string; page?: string; search?: string }>
}

// Same six services featured in the header's mega-menu — reused here (exact
// hrefs/labels/icons/colors) so the closing CTA connects Insights content to
// real service pages instead of a generic "contact us" link, without
// inventing a second, slightly-different taxonomy.
const SERVICE_LINKS = [
  { href: '/services/visualization', label: 'Visualization', Icon: Boxes, glow: '#8b5cf6' },
  { href: '/services/website-development', label: 'Website Development', Icon: Code2, glow: '#0ea5e9' },
  { href: '/services/it-consulting', label: 'IT Consulting', Icon: BrainCircuit, glow: '#10b981' },
  { href: '/services/digital-marketing-seo', label: 'Digital Marketing & SEO', Icon: TrendingUp, glow: '#f43f5e' },
  { href: '/services/cad-gis-photogrammetry', label: 'CAD, GIS & Photogrammetry', Icon: Compass, glow: '#f59e0b' },
  { href: '/services/automation-testing', label: 'QA & Automation Testing', Icon: ShieldCheck, glow: '#6366f1' },
]

// ── FIX — canonical was a single static value pointing every ?page=N view
// back to the plain /insights URL. That's the outdated pagination pattern:
// current Google guidance is a self-referencing canonical per paginated
// page (see https://developers.google.com/search/docs/crawling-indexing/canonicalization
// and https://developers.google.com/search/blog/2021/02/pagination-best-practices).
// Collapsing every page to page 1 tells Google the later pages' post
// listings don't exist as distinct crawlable entry points, which can slow
// discovery of posts that only surface deeper in the list. This page's
// individual posts are also covered directly in app/sitemap.ts, so this
// mainly affects how the *listing* pages themselves are crawled/indexed.
//
// New behaviour:
//   - unfiltered, page 1              → canonical: /insights
//   - unfiltered, page N>1            → canonical: /insights?page=N
//   - category, any page              → canonical: /insights?category=X[&page=N]
//   - tag or search present           → canonical: /insights (collapsed —
//     tag views are too granular and search-result pages shouldn't be
//     indexed as unique pages; this matches Google's explicit guidance for
//     site-internal search results)
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const page = parseInt(params.page || '1')

  let canonicalPath = '/insights'
  if (!params.tag && !params.search) {
    const qs = new URLSearchParams()
    if (params.category) qs.set('category', params.category)
    if (page > 1) qs.set('page', String(page))
    const query = qs.toString()
    canonicalPath = query ? `/insights?${query}` : '/insights'
  }
  const canonicalUrl = `${BASE}${canonicalPath}`

  // Featured post's image gives the listing page a real social-share image
  // instead of falling back to whatever default the platform picks. Purely
  // additive — no existing metadata field is touched or removed.
  let ogImage: string | undefined
  try {
    const featured = await prisma.post.findFirst({
      where: { status: 'PUBLISHED', featured: true },
      include: { featuredImage: true },
      orderBy: { publishedAt: 'desc' },
    })
    ogImage = featured?.featuredImage?.url
  } catch {
    ogImage = undefined
  }

  return {
    title: 'Industry Insights & Expert Perspectives | 99 Visual Solutions',
    description: 'Stay ahead with trends, technology updates, business strategies, digital transformation insights, and industry knowledge from our experts.',
    alternates: {
      canonical: canonicalUrl,
    },
    // Self-referencing canonical still tells Google these are indexable —
    // that's correct for real category/pagination views. Filtered-out cases
    // (tag/search) already collapse their canonical to /insights above,
    // which is the accepted way to deflect indexation of those variants
    // without a separate noindex directive.
    openGraph: {
      title: 'Industry Insights & Expert Perspectives',
      description: 'Stay ahead with trends, technology updates, and industry knowledge from 99 Visual Solutions.',
      url: canonicalUrl,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
  }
}

async function getPosts(params: Awaited<Props['searchParams']>) {
  const page = parseInt(params.page || '1')
  const perPage = 9
  const search = params.search || ''

  const where = {
    status: 'PUBLISHED' as const,
    ...(params.category && { category: { slug: params.category } }),
    ...(params.tag && { tags: { some: { tag: { slug: params.tag } } } }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { excerpt: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
  }

  const [posts, total, categories, featuredPost] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        author: true,
        category: true,
        featuredImage: true,
      },
      orderBy: { publishedAt: 'desc' },
      take: perPage,
      skip: (page - 1) * perPage,
    }),
    prisma.post.count({ where }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: true } } },
    }),
    prisma.post.findFirst({
      where: { status: 'PUBLISHED', featured: true },
      include: { author: true, category: true, featuredImage: true },
      orderBy: { publishedAt: 'desc' },
    }),
  ])

  return { posts, total, categories, featuredPost, page, perPage }
}

// Builds a compact pagination window (e.g. 1 … 4 5 [6] 7 8 … 20) so the
// pager never overflows on small screens even with many pages.
function getPageWindow(current: number, total: number) {
  const delta = 1
  const range: (number | 'dots')[] = []
  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  range.push(1)
  if (left > 2) range.push('dots')
  for (let i = left; i <= right; i++) range.push(i)
  if (right < total - 1) range.push('dots')
  if (total > 1) range.push(total)

  return range
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function InsightsPage({ searchParams }: Props) {
  const params = await searchParams
  const { posts, total, categories, featuredPost, page, perPage } = await getPosts(params)
  const totalPages = Math.ceil(total / perPage)
  const isFiltered = params.category || params.tag || params.search
  const pageWindow = getPageWindow(page, totalPages)
  const showFeatured = featuredPost && !isFiltered && page === 1
  const rangeStart = total === 0 ? 0 : (page - 1) * perPage + 1
  const rangeEnd = Math.min(page * perPage, total)

  const buildPageHref = (p: number) =>
    '/insights?page=' + p + (params.category ? '&category=' + params.category : '')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-950">

        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 px-4 sm:px-6 md:px-8 overflow-hidden">
          {/* Ambient glow + faint grid, same visual language as howwework.tsx
              elsewhere on the site — CSS-only, no extra image assets. */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(249,115,22,0.14),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_20%,rgba(56,189,248,0.10),transparent_42%)]" />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 65% 55% at 50% 0%, black, transparent)',
              WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 0%, black, transparent)',
            }}
          />

          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-9 sm:mb-11">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium tracking-wide bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-4 sm:mb-5">
                  Insights &amp; Perspectives
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-white mb-3 leading-[1.15] tracking-tight">
                  Industry Insights &{' '}
                  <span className="text-blue-400">Expert Perspectives</span>
                </h1>
                <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6">
                  Trends, technology updates, business strategies, and digital transformation insights from our experts.
                </p>

                {/* Quick stats — grounds the "premium agency" framing in a
                    couple of real numbers instead of pure decoration. */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
                  <span className="whitespace-nowrap">
                    <strong className="text-white font-semibold">{total}</strong>{' '}
                    {total === 1 ? 'Article' : 'Articles'}
                  </span>
                  <span className="w-px h-4 bg-gray-800" aria-hidden="true" />
                  <span className="whitespace-nowrap">
                    <strong className="text-white font-semibold">{categories.length}</strong> Topics
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Search */}
            <Reveal delay={0.08}>
              <div className="max-w-lg mx-auto mb-7 sm:mb-9">
                <form method="GET">
                  <div className="search-glow group relative rounded-full">
                    {/* Static ring mask — the ring's shape/position never
                        changes, so the mask is computed once and reused every
                        frame instead of being recomputed on each tick */}
                    <div className="search-glow-ring-mask" aria-hidden="true">
                      <div className="search-glow-spin search-glow-spin--ring" />
                    </div>
                    {/* Static halo mask — same idea, offset outward so the
                        blurred glow bleeds past the pill edge */}
                    <div className="search-glow-halo-mask" aria-hidden="true">
                      <div className="search-glow-spin search-glow-spin--halo" />
                    </div>

                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none transition-colors group-focus-within:text-orange-400 z-10"
                      strokeWidth={2}
                    />
                    <input
                      type="search"
                      name="search"
                      aria-label="Search articles"
                      defaultValue={params.search}
                      placeholder="Search articles..."
                      className="relative z-10 w-full bg-gray-900/70 rounded-full pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10"
                    />
                  </div>
                </form>

                <style>{`
                  /*
                    Same visual result as before — crisp 1.5px ring, soft
                    blurred halo bleeding past the edge, cyan-to-white sweep —
                    rebuilt so it never drops a frame.

                    The previous version animated a registered custom property
                    (--border-angle) that fed straight into the conic-gradient
                    used by an inset:0 mask-composite trick. Every tick, the
                    browser had to regenerate that gradient AND redo the
                    xor/exclude mask composite on top of it — both are
                    main-thread paint work, so on anything but a flagship
                    device the ring visibly stutters, especially with other
                    content on the page competing for paint time.

                    This version separates the two jobs:
                      - the mask (.search-glow-ring-mask / -halo-mask) is
                        completely static — same shape, same position, every
                        frame — so the browser paints it once and reuses it.
                      - the only thing that ever animates is the CSS
                        transform/rotate property on an oversized conic-gradient
                        square
                        (.search-glow-spin) living underneath that mask.
                        Transform animations run entirely on the compositor
                        (GPU), so this rotates at a locked 60fps regardless of
                        what else is happening on the page.
                    The mask crops the rotating square down to the ring/halo
                    shape exactly as before — the output is pixel-identical,
                    just decoupled from paint.
                  */

                  .search-glow {
                    position: relative;
                  }

                  .search-glow-ring-mask,
                  .search-glow-halo-mask {
                    position: absolute;
                    z-index: 1;
                    border-radius: inherit;
                    overflow: hidden;
                    pointer-events: none;
                    -webkit-mask:
                      linear-gradient(#fff 0 0) content-box,
                      linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask:
                      linear-gradient(#fff 0 0) content-box,
                      linear-gradient(#fff 0 0);
                    mask-composite: exclude;
                  }

                  .search-glow-ring-mask {
                    inset: 0;
                    padding: 1.5px;
                    animation: search-ring-fade 2.5s linear 1 forwards;
                  }

                  .search-glow-halo-mask {
                    inset: -3px;
                    z-index: 0;
                    padding: 4px;
                    filter: blur(5px);
                    animation: search-halo-fade 2.5s linear 1 forwards;
                  }

                  .search-glow-spin {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 220%;
                    aspect-ratio: 1;
                    transform: translate(-50%, -50%) rotate(0deg);
                    animation: search-border-spin 2.5s linear 1 forwards;
                    will-change: transform;
                  }

                  .search-glow-spin--ring {
                    background: conic-gradient(
                      from 0deg,
                      rgba(56, 189, 248, 0.35) 0deg,
                      rgba(56, 189, 248, 0.35) 300deg,
                      rgba(125, 211, 252, 0.9) 332deg,
                      #f0f9ff 349deg,
                      rgba(125, 211, 252, 0.9) 356deg,
                      rgba(56, 189, 248, 0.35) 360deg
                    );
                  }

                  .search-glow-spin--halo {
                    background: conic-gradient(
                      from 0deg,
                      rgba(56, 189, 248, 0) 0deg,
                      rgba(56, 189, 248, 0) 320deg,
                      rgba(125, 211, 252, 0.7) 340deg,
                      #f0f9ff 349deg,
                      rgba(125, 211, 252, 0.7) 358deg,
                      rgba(56, 189, 248, 0) 360deg
                    );
                  }

                  @keyframes search-border-spin {
                    0% {
                      transform: translate(-50%, -50%) rotate(0deg);
                      opacity: 1;
                    }
                    85% {
                      opacity: 1;
                    }
                    100% {
                      transform: translate(-50%, -50%) rotate(360deg);
                      opacity: 0;
                    }
                  }

                  @keyframes search-ring-fade {
                    0%, 85% {
                      opacity: 1;
                    }
                    100% {
                      opacity: 0;
                      visibility: hidden;
                    }
                  }

                  @keyframes search-halo-fade {
                    0%, 85% {
                      opacity: 0.8;
                    }
                    100% {
                      opacity: 0;
                      visibility: hidden;
                    }
                  }
                `}</style>
              </div>
            </Reveal>

            {/* Category Filters */}
            <Reveal delay={0.14}>
              <div className="-mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="flex flex-nowrap sm:flex-wrap gap-2 justify-start sm:justify-center overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 scrollbar-none snap-x snap-mandatory sm:snap-none scroll-smooth">
                  <Link
                    href="/insights"
                    aria-current={!params.category ? 'page' : undefined}
                    className={`shrink-0 snap-start px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      !params.category
                        ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                        : 'bg-gray-900/70 text-gray-400 border border-gray-800 hover:text-gray-200 hover:border-gray-700'
                    }`}
                  >
                    All
                  </Link>
                  {categories.map((cat) => {
                    const Icon = getCategoryIcon(cat.slug, cat.name)
                    const active = params.category === cat.slug
                    return (
                      <Link
                        key={cat.id}
                        href={'/insights?category=' + cat.slug}
                        aria-current={active ? 'page' : undefined}
                        className={`shrink-0 snap-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                          active
                            ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                            : 'bg-gray-900/70 text-gray-400 border border-gray-800 hover:text-gray-200 hover:border-gray-700'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                        {cat.name}
                        <span className="text-[10px] sm:text-xs opacity-60">{cat._count.posts}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════ FEATURED INSIGHT ═══════════════════ */}
        {showFeatured && (
          <section className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto mb-12 sm:mb-16">
            <Reveal>
              <div className="mb-4 sm:mb-5 flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">
                <span className="h-px w-8 bg-gradient-to-r from-orange-500 to-transparent" aria-hidden="true" />
                Featured Read
              </div>
              <Link href={'/insights/' + featuredPost.slug} className="group block">
                <div className="relative bg-gray-900/60 border border-gray-800 rounded-2xl sm:rounded-[28px] overflow-hidden transition-all duration-300 hover:border-gray-700 hover:shadow-2xl hover:shadow-black/40">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-52 sm:h-64 lg:h-full lg:min-h-[340px] bg-gray-900 flex items-center justify-center overflow-hidden">
                      {/* Soft radial backdrop behind the (intentionally
                          object-contain, never cropped) article image, so a
                          smaller/odd-aspect image still fills the frame with
                          intent rather than floating on flat black. */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${featuredPost.category.color || '#f97316'}14, transparent 65%)`,
                        }}
                      />
                      {featuredPost.featuredImage ? (
                        <Image
                          src={featuredPost.featuredImage.url}
                          alt={featuredPost.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="relative object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl sm:text-8xl font-bold text-orange-500/10">99</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 sm:p-8 lg:p-11 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          Featured
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                          style={{
                            backgroundColor: (featuredPost.category.color || '#f97316') + '15',
                            color: featuredPost.category.color || '#f97316',
                          }}
                        >
                          {(() => {
                            const Icon = getCategoryIcon(featuredPost.category.slug, featuredPost.category.name)
                            return <Icon className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                          })()}
                          {featuredPost.category.name}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-white mb-3 leading-snug tracking-tight transition-colors group-hover:text-orange-400">
                        {featuredPost.title}
                      </h2>
                      {featuredPost.excerpt && (
                        <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-5 line-clamp-3">{featuredPost.excerpt}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-gray-500 mb-6">
                        <span className="text-gray-400">{featuredPost.author.name}</span>
                        <span className="text-gray-700">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                          {featuredPost.readingTime} min read
                        </span>
                        {featuredPost.publishedAt && (
                          <>
                            <span className="text-gray-700">·</span>
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                              {formatDate(featuredPost.publishedAt)}
                            </span>
                          </>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
                        Read the full story
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </section>
        )}

        {/* ═══════════════════════ POSTS GRID ═══════════════════════ */}
        <section className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto pb-16 sm:pb-20">
          {posts.length === 0 ? (
            <Reveal>
              <div className="text-center py-16 sm:py-20">
                <p className="text-gray-500 text-base sm:text-lg mb-4">No articles found</p>
                <Link href="/insights" className="text-orange-400 hover:text-orange-300 transition-colors">
                  View all articles
                </Link>
              </div>
            </Reveal>
          ) : (
            <>
              <Reveal>
                <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                    {isFiltered ? 'Results' : 'Latest Insights'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                    Showing {rangeStart}–{rangeEnd} of {total}
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {posts.map((post, i) => {
                  const Icon = getCategoryIcon(post.category.slug, post.category.name)
                  const accent = post.category.color || '#f97316'
                  return (
                    <Reveal key={post.id} delay={Math.min(i, 6) * 0.06} y={16}>
                      <Link
                        href={'/insights/' + post.slug}
                        className="group block h-full bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-700 hover:shadow-xl hover:shadow-black/30"
                      >
                        <div className="relative aspect-[16/10] bg-gray-900 flex items-center justify-center overflow-hidden">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage.url}
                              alt={post.title}
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
                              style={{
                                backgroundColor: accent + '20',
                                color: accent,
                              }}
                            >
                              <Icon className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                              {post.category.name}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 sm:p-5">
                          <h3 className="text-white font-semibold text-sm sm:text-base mb-2 leading-snug line-clamp-2 transition-colors group-hover:text-orange-400">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                          )}
                          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs text-gray-500 pt-3 border-t border-gray-800/80">
                            <span className="truncate max-w-[45%]">{post.author.name}</span>
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                                {post.readingTime} min
                              </span>
                              {post.publishedAt && (
                                <>
                                  <span>·</span>
                                  <span>
                                    {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                                      day: 'numeric',
                                      month: 'short',
                                    })}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  )
                })}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Pagination"
                  className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 mt-10 sm:mt-14"
                >
                  {page > 1 && (
                    <Link
                      href={buildPageHref(page - 1)}
                      className="px-3 sm:px-4 h-9 sm:h-10 inline-flex items-center gap-1 bg-gray-900/70 border border-gray-800 text-gray-300 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 hover:border-gray-700 hover:text-white"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                      Prev
                    </Link>
                  )}

                  {pageWindow.map((p, i) =>
                    p === 'dots' ? (
                      <span
                        key={'dots-' + i}
                        className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center text-gray-600 text-sm"
                      >
                        …
                      </span>
                    ) : (
                      <Link
                        key={p}
                        href={buildPageHref(p)}
                        aria-current={p === page ? 'page' : undefined}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                          p === page
                            ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                            : 'bg-gray-900/70 border border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                        }`}
                      >
                        {p}
                      </Link>
                    )
                  )}

                  {page < totalPages && (
                    <Link
                      href={buildPageHref(page + 1)}
                      className="px-3 sm:px-4 h-9 sm:h-10 inline-flex items-center gap-1 bg-gray-900/70 border border-gray-800 text-gray-300 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 hover:border-gray-700 hover:text-white"
                    >
                      Next
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </section>

        {/* ═══════════════════════ CTA ═══════════════════════ */}
        <section className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto pb-20 sm:pb-28">
          <Reveal>
            <div className="relative rounded-[28px] sm:rounded-[32px] border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden p-7 sm:p-10 lg:p-14">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(249,115,22,0.14),transparent_45%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(56,189,248,0.10),transparent_45%)]" />

              <div className="relative max-w-2xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium tracking-wide bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-4 sm:mb-5">
                  Turn Insight Into Action
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-3 sm:mb-4 leading-snug tracking-tight">
                  Have a project in mind?
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-7 sm:mb-8 max-w-xl">
                  From 3D visualization to full-stack development, our team turns strategy into shipped
                  work — the same expertise our insights are built on.
                </p>

                <div className="flex flex-wrap gap-2 mb-8 sm:mb-9">
                  {SERVICE_LINKS.map(({ href, label, Icon, glow }) => (
                    <Link
                      key={href}
                      href={href}
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-900/70 border border-gray-800 text-gray-400 transition-all duration-200 hover:text-white hover:border-gray-700"
                    >
                      <Icon
                        className="w-3.5 h-3.5 shrink-0 transition-colors"
                        strokeWidth={2}
                        style={{ color: glow }}
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  ))}
                </div>

                <ConsultationCTA
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-orange-500 text-white text-sm font-semibold transition-all duration-200 hover:bg-orange-400 hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
                  ariaLabel="Book a free consultation with 99 Visual Solutions"
                  postTitle="Insights Page CTA"
                  postUrl="/insights"
                >
                  Book a Free Consultation
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </ConsultationCTA>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
