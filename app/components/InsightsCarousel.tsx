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

const AUTO_ADVANCE_MS = 2500
const TRANSITION_MS = 600

export default function InsightsCarousel({ posts }: { posts: Post[] }) {
  const [cardsPerView, setCardsPerView] = useState(3)
  const [isPaused, setIsPaused] = useState(false)
  const [index, setIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const trackRef = useRef<HTMLDivElement>(null)

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

  const extended = [...posts, ...posts.slice(0, cardsPerView)]
  const realCount = posts.length

  const next = useCallback(() => {
    setIsTransitioning(true)
    setIndex((prev) => prev + 1)
  }, [])

  useEffect(() => {
    if (isPaused || realCount <= cardsPerView) return
    const timer = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [isPaused, realCount, cardsPerView, next])

  useEffect(() => {
    if (index >= realCount) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false)
        setIndex(0)
      }, TRANSITION_MS)
      return () => clearTimeout(timeout)
    }
  }, [index, realCount])

  const cardWidthPercent = 100 / cardsPerView

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="overflow-hidden mb-8">
        <div
          ref={trackRef}
          className="flex items-stretch"
          style={{
            transform: `translateX(-${index * cardWidthPercent}%)`,
            transition: isTransitioning ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
          }}
        >
          {extended.map((post, i) => (
            <div
              key={post.id + '-' + i}
              className="shrink-0 px-2 flex"
              style={{ width: cardWidthPercent + '%' }}
            >
              <Link
                href={'/insights/' + post.slug}
                className="group flex flex-col h-full w-full bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 shrink-0 bg-gray-900 flex items-center justify-center overflow-hidden">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.featuredImage.altText || post.title}
                      fill
                      className="object-contain"
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

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-white font-semibold text-base mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors min-h-[3rem]">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3">
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
            </div>
          ))}
        </div>
      </div>

      {realCount > cardsPerView && (
        <div className="flex items-center justify-center gap-2">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsTransitioning(true); setIndex(i) }}
              aria-label={`Go to slide ${i + 1}`}
              className={
                'h-1.5 rounded-full transition-all duration-300 ' +
                (i === index % realCount
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