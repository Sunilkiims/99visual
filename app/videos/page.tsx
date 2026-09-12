import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { videos } from '@/lib/videos'
import {
  BASE,
  buildGraph,
  orgSchema,
  websiteSchema,
  breadcrumbFromPath,
  webPage,
} from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Video Showcase | 99 Visual Solutions',
  description:
    'Watch 3D visualization, architectural animation, product rendering, and marketing showreel clips produced by 99 Visual Solutions.',
  alternates: { canonical: `${BASE}/videos` },
  openGraph: {
    title: 'Video Showcase | 99 Visual Solutions',
    description:
      'Watch 3D visualization, architectural animation, product rendering, and marketing showreel clips produced by 99 Visual Solutions.',
    url: `${BASE}/videos`,
    type: 'website',
  },
}

export default function VideosIndexPage() {
  const graph = buildGraph(
    orgSchema,
    websiteSchema,
    breadcrumbFromPath('/videos', { videos: 'Videos' }),
    webPage({
      pathname: '/videos',
      name: 'Video Showcase | 99 Visual Solutions',
      description:
        'Watch 3D visualization, architectural animation, product rendering, and marketing showreel clips produced by 99 Visual Solutions.',
    }),
  )

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <main className="min-h-screen bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24">

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            Video Showcase
          </h1>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Short clips from our 3D visualization, animation, and product rendering work — each with
            the full context behind the shot.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Link key={video.slug} href={`/videos/${video.slug}`} className="group block">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-800 border border-gray-800/60">
                  <Image
                    src={video.thumbnail}
                    alt={video.thumbnailAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-4 h-4 ml-0.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-white font-semibold group-hover:text-orange-400 transition-colors leading-snug mb-1">
                  {video.title}
                </p>
                <p className="text-gray-500 text-sm line-clamp-2">{video.description}</p>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}