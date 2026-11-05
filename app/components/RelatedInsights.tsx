// app/components/RelatedInsights.tsx
//
// Server component: a short "Related insights" strip for a service page,
// listing published articles that are actually about that service. It is
// the reverse of the "Related Service" link on each article, so services and
// Insights link to each other in both directions.
//
// Matching uses getRelatedService() — the same rules the article page uses —
// so an article only appears on the service page it links back to. Renders
// nothing when no article matches or the database is unreachable, so it can
// never break a service page.
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getRelatedService } from '@/app/components/insights/categoryIcon'

type PostRow = {
  slug: string
  title: string
  excerpt: string | null
  category: { name: string; slug: string } | null
}

export default async function RelatedInsights({ serviceHref }: { serviceHref: string }) {
  let posts: PostRow[] = []
  try {
    posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED', NOT: { seo: { robots: { contains: 'noindex' } } } },
      select: { slug: true, title: true, excerpt: true, category: { select: { name: true, slug: true } } },
      orderBy: { publishedAt: 'desc' },
      take: 50,
    })
  } catch {
    return null
  }

  const related = posts
    .filter((p) => {
      const svc = getRelatedService(p.title) ?? getRelatedService(p.category?.name, p.category?.slug)
      return svc?.href === serviceHref
    })
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="vz-section vz-section--tight vz-section--surface" aria-labelledby="related-insights-heading">
      <div className="vz-container">
        <div className="vz-row-head">
          <div className="vz-heading">
            <p className="vz-eyebrow">Insights</p>
            <h2 id="related-insights-heading" className="vz-h2">Related insights</h2>
          </div>
          <Link href="/insights" className="vz-btn vz-btn--ghost">Browse all Insights articles</Link>
        </div>
        <ul className="vz-related" role="list">
          {related.map((post) => (
            <li key={post.slug}>
              <article className="vz-card vz-related__card">
                <h3 className="vz-h3">
                  <Link href={`/insights/${post.slug}`} className="vz-stretched">{post.title}</Link>
                </h3>
                {post.excerpt && (
                  <p className="vz-body">
                    {post.excerpt.length > 140 ? `${post.excerpt.slice(0, 137).trimEnd()}…` : post.excerpt}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
