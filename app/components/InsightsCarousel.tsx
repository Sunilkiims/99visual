'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Post = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  readingTime: number
  publishedAt: Date | null
  author: { name: string | null }
  category: { name: string; color: string | null }
  featuredImage: { url: string; altText: string | null } | null
}

const AUTO_ADVANCE_MS = 5000

export default function InsightsCarousel({ posts }: { posts: Post[] }) {
  const [activePage, setActivePage] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const pageCount = Math.max(1, Math.ceil(posts.length / cardsPerView))

  // Match Tailwind breakpoints: 1 card on mobile, 2 on md, 3 on lg+
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) setCardsPerView(3)
      else if (window.innerWidth >= 768) setCardsPerView(2)
      else setCardsPerView(1)
    }
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  // Clamp activePage if cardsPerView changes and shrinks pageCount
  useEffect(() => {
    setActivePage((prev) => Math.min(prev, pageCount - 1))
  }, [pageCount])

  const goToPage = useCallback((index: number) => {
    setActivePage(((index % pageCount) + pageCount) % pageCount)
  }, [pageCount])

  // Auto-advance
  useEffect(() => {
    if (isPaused || pageCount <= 1) return
    const timer = setInterval(() => {
      setActivePage((prev) => (prev + 1) % pageCount)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [isPaused, pageCount])

  // Scroll the track to the active page
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const pageWidth = track.clientWidth
    track.scrollTo({ left: pageWidth * activePage, behavior: 'smooth' })
  }, [activePage])

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex overflow-x-hidden scroll-smooth mb-8 -mx-2 px-2"
      >
        {Array.from({ length: pageCount }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 shrink-0 w-full px-2"
          >
            {posts
              .slice(pageIndex * cardsPerView, pageIndex * cardsPerView + cardsPerView)
              .map((post) => (
                <Link
                  key={post.id}
                  href={'/insights/' + post.slug}
                  className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.altText || post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{ backgroundColor: post.category.color || '#f97316' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-bold text-white/10 select-none">99</span>
                        </div>
                      </>
                    )}
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: (post.category.color || '#f97316') + '20',
                          color: post.category.color || '#f97316',
                        }}
                      >
                        {post.category.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-white font-semibold text-base mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.author.name}</span>
                      <div className="flex items-center gap-2">
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
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={
                'h-1.5 rounded-full transition-all duration-300 ' +
                (index === activePage
                  ? 'w-6 bg-orange-500'
                  : 'w-1.5 bg-gray-700 hover:bg-gray-600')
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
