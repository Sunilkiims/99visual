import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import { videos, getVideoBySlug } from '@/lib/videos'
import {
  BASE,
  buildGraph,
  orgSchema,
  websiteSchema,
  breadcrumbFromPath,
  webPage,
  videoObjectSchema,
} from '@/lib/schema'

interface Props {
  params: Promise<{ slug: string }>
}

// Pre-render every watch page at build time — these are a small, known set.
export async function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }))
}

function isoDuration(seconds: number): string {
  return `PT${Math.max(1, Math.round(seconds))}S`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const video = getVideoBySlug(slug)
  if (!video) return { title: 'Video Not Found' }

  const url = `${BASE}/videos/${video.slug}`

  return {
    title: `${video.title} | 99 Visual Solutions`,
    description: video.description,
    metadataBase: new URL(BASE),
    alternates: { canonical: url },
    openGraph: {
      title: video.title,
      description: video.description,
      url,
      type: 'video.other',
      videos: [{ url: `${BASE}${video.videoSrc}` }],
      images: [{ url: `${BASE}${video.thumbnail}`, width: 1280, height: 720, alt: video.thumbnailAlt }],
    },
    twitter: {
      card: 'player',
      title: video.title,
      description: video.description,
      images: [`${BASE}${video.thumbnail}`],
    },
    robots: 'index, follow',
  }
}

export default async function VideoWatchPage({ params }: Props) {
  const { slug } = await params
  const video = getVideoBySlug(slug)
  if (!video) notFound()

  const pathname = `/videos/${video.slug}`

  const graph = buildGraph(
    orgSchema,
    websiteSchema,
    breadcrumbFromPath(pathname, { videos: 'Videos', [video.slug]: video.title }),
    videoObjectSchema({
      pathname,
      name: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnail,
      contentUrl: video.videoSrc,
      uploadDate: `${video.uploadDate}T00:00:00+05:30`,
      duration: isoDuration(video.durationSeconds),
    }),
    webPage({
      pathname,
      name: `${video.title} | 99 Visual Solutions`,
      description: video.description,
      image: `${BASE}${video.thumbnail}`,
      datePublished: `${video.uploadDate}T00:00:00+05:30`,
      dateModified: `${video.uploadDate}T00:00:00+05:30`,
    }),
  )

  const otherVideos = videos.filter((v) => v.slug !== video.slug)

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <main className="min-h-screen bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-24">

          <Link
            href="/videos"
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-semibold bg-gray-900 border border-gray-800 text-gray-300 transition-all hover:border-orange-500/50 hover:text-orange-400 hover:-translate-y-0.5"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Video Showcase
          </Link>

          <h1 className="font-serif text-2xl md:text-4xl font-bold text-white mb-4 leading-[1.15] tracking-tight">
            {video.title}
          </h1>


          {/* Primary content: the video player itself, above the fold */}
          <div className="relative w-full rounded-3xl overflow-hidden mb-10 bg-black border border-gray-800/60 aspect-video">
            <video
              controls
              preload="metadata"
              poster={video.thumbnail}
              className="w-full h-full object-contain bg-black"
            >
              <source src={video.videoSrc} type="video/mp4" />
            </video>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {video.description}
          </p>

          <div className="space-y-5 mb-12">
            {video.body.map((para, i) => (
              <p key={i} className="text-gray-400 leading-relaxed">{para}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-900 border border-gray-800 text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="p-7 bg-gray-900/60 border border-gray-800 rounded-3xl mb-12">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">See the full service</p>
            <Link
              href={video.relatedService.href}
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              {video.relatedService.label} →
            </Link>
          </div>

          {otherVideos.length > 0 && (
            <div>
              <h2 className="mb-5 text-xs uppercase tracking-widest">
                <Link
                  href="/videos"
                  className="text-white hover:text-orange-400 font-semibold transition-colors"
                >
                  More videos →
                </Link>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {otherVideos.map((v) => (
                  <Link key={v.slug} href={`/videos/${v.slug}`} className="group block">
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 bg-gray-800">
                      <Image
                        src={v.thumbnail}
                        alt={v.thumbnailAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-gray-300 text-sm font-medium group-hover:text-orange-400 transition-colors leading-snug">
                      {v.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}