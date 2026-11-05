// InsightsGrid — latest published articles (server component, Prisma).
// Renders nothing if the database has no published posts or is unreachable.
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { SectionHeading, Button } from '@/app/components/ui/primitives';
import Reveal from '@/app/components/ui/Reveal';

type Row = {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: Date | null;
  readingTime: number;
  category: { name: string };
  featuredImage: { url: string; altText: string | null } | null;
};

export default async function InsightsGrid({ take = 3, title = 'Insights from the studio' }: { take?: number; title?: string }) {
  let posts: Row[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        publishedAt: true,
        readingTime: true,
        category: { select: { name: true } },
        featuredImage: { select: { url: true, altText: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take,
    });
  } catch (e) {
    console.error('InsightsGrid: failed to load posts', e);
  }
  if (posts.length === 0) return null;

  return (
    <section className="vz-section" aria-labelledby="vz-insights-title">
      <div className="vz-container">
        <div className="vz-row-head">
          <SectionHeading id="vz-insights-title" eyebrow="Insights" title={title} />
          <Button href="/insights" variant="ghost" arrow>All articles</Button>
        </div>
        <ul className="vz-posts" role="list">
          {posts.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.05}>
              <article className="vz-post">
                <div className="vz-post__media">
                  {p.featuredImage ? (
                    <Image src={p.featuredImage.url} alt={p.featuredImage.altText || p.title} fill sizes="(min-width: 1024px) 400px, 100vw" />
                  ) : (
                    <div className="vz-post__fallback" aria-hidden="true" />
                  )}
                </div>
                <p className="vz-post__meta">
                  <span>{p.category.name}</span>
                  {p.publishedAt && (
                    <time dateTime={p.publishedAt.toISOString()}>
                      {p.publishedAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                  )}
                  <span>{p.readingTime} min read</span>
                </p>
                <h3 className="vz-h3">
                  <Link href={`/insights/${p.slug}`} className="vz-stretched">{p.title}</Link>
                </h3>
                {p.excerpt && <p className="vz-body vz-post__excerpt">{p.excerpt}</p>}
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
