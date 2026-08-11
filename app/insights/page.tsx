import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

export const metadata: Metadata = {
  title: 'Industry Insights & Expert Perspectives | 99 Visual Solutions',
  description: 'Stay ahead with trends, technology updates, business strategies, digital transformation insights, and industry knowledge from our experts.',
  alternates: {
    canonical: 'https://99visual.com/insights',
  },
  openGraph: {
    title: 'Industry Insights & Expert Perspectives',
    description: 'Stay ahead with trends, technology updates, and industry knowledge from 99 Visual Solutions.',
    url: 'https://99visual.com/insights',
  },
}

interface Props {
  searchParams: Promise<{ category?: string; tag?: string; page?: string; search?: string }>
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

export default async function InsightsPage({ searchParams }: Props) {
  const params = await searchParams
  const { posts, total, categories, featuredPost, page, perPage } = await getPosts(params)
  const totalPages = Math.ceil(total / perPage)
  const isFiltered = params.category || params.tag || params.search
  const pageWindow = getPageWindow(page, totalPages)

  const buildPageHref = (p: number) =>
    '/insights?page=' + p + (params.category ? '&category=' + params.category : '')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-950">

        {/* Hero */}
        <section className="pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium tracking-wide bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-4 sm:mb-5">
              Insights &amp; Perspectives
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3 leading-[1.15] tracking-tight">
              Industry Insights &{' '}
              <span className="text-blue-400">Expert Perspectives</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Trends, technology updates, business strategies, and digital transformation insights from our experts.
            </p>
          </div>

          {/* Search */}
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

                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none transition-colors group-focus-within:text-orange-400 z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  name="search"
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

          {/* Category Filters */}
          <div className="-mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex flex-nowrap sm:flex-wrap gap-2 justify-start sm:justify-center overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 scrollbar-none snap-x snap-mandatory sm:snap-none scroll-smooth">
              <Link
                href="/insights"
                className={`shrink-0 snap-start px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  !params.category
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                    : 'bg-gray-900/70 text-gray-400 border border-gray-800 hover:text-gray-200 hover:border-gray-700'
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={'/insights?category=' + cat.slug}
                  className={`shrink-0 snap-start px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    params.category === cat.slug
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                      : 'bg-gray-900/70 text-gray-400 border border-gray-800 hover:text-gray-200 hover:border-gray-700'
                  }`}
                >
                  {cat.name}
                  <span className="ml-1.5 text-[10px] sm:text-xs opacity-60">{cat._count.posts}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && !isFiltered && page === 1 && (
          <section className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto mb-10 sm:mb-14">
            <Link href={'/insights/' + featuredPost.slug} className="group block">
              <div className="relative bg-gray-900/60 border border-gray-800 rounded-2xl sm:rounded-[28px] overflow-hidden transition-all duration-300 hover:border-gray-700 hover:shadow-2xl hover:shadow-black/40">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-52 sm:h-64 lg:h-full lg:min-h-[320px] bg-gray-900 flex items-center justify-center overflow-hidden">
                    {featuredPost.featuredImage ? (
                      <Image
                        src={featuredPost.featuredImage.url}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl sm:text-8xl font-bold text-orange-500/10">99</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        Featured
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{
                          backgroundColor: (featuredPost.category.color || '#f97316') + '15',
                          color: featuredPost.category.color || '#f97316',
                        }}
                      >
                        {featuredPost.category.name}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3 leading-snug tracking-tight transition-colors group-hover:text-orange-400">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">{featuredPost.excerpt}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span className="text-gray-400">{featuredPost.author.name}</span>
                      <span className="text-gray-700">·</span>
                      <span>{featuredPost.readingTime} min read</span>
                      {featuredPost.publishedAt && (
                        <>
                          <span className="text-gray-700">·</span>
                          <span>
                            {new Date(featuredPost.publishedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Posts Grid */}
        <section className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto pb-16 sm:pb-20">
          {posts.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <p className="text-gray-500 text-base sm:text-lg mb-4">No articles found</p>
              <Link href="/insights" className="text-orange-400 hover:text-orange-300 transition-colors">
                View all articles
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={'/insights/' + post.slug}
                    className="group bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-700 hover:shadow-xl hover:shadow-black/30"
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
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-sm"
                          style={{
                            backgroundColor: (post.category.color || '#f97316') + '20',
                            color: post.category.color || '#f97316',
                          }}
                        >
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
                          <span>{post.readingTime} min read</span>
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
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Pagination"
                  className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 mt-10 sm:mt-14"
                >
                  {page > 1 && (
                    <Link
                      href={buildPageHref(page - 1)}
                      className="px-3 sm:px-4 h-9 sm:h-10 inline-flex items-center bg-gray-900/70 border border-gray-800 text-gray-300 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 hover:border-gray-700 hover:text-white"
                    >
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
                      className="px-3 sm:px-4 h-9 sm:h-10 inline-flex items-center bg-gray-900/70 border border-gray-800 text-gray-300 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 hover:border-gray-700 hover:text-white"
                    >
                      Next
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}