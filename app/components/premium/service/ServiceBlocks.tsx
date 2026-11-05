// Building blocks for the six redesigned service pages (server components).
// Each page keeps its own metadata, JSON-LD and copy; these only render it.
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import ConsultationCTA from '@/app/components/ConsultationCTA';
import Reveal from '@/app/components/ui/Reveal';
import GlowCard from '@/app/components/ui/GlowCard';
import { SectionHeading } from '@/app/components/ui/primitives';

/* Visible breadcrumb trail (mirrors the BreadcrumbList JSON-LD). */
export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="vz-crumbs">
      <ol>
        {items.map((it, i) => (
          <li key={it.href}>
            {i < items.length - 1 ? (
              <>
                <Link href={it.href}>{it.label}</Link>
                <ChevronRight size={13} aria-hidden="true" />
              </>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* Hero: H1 = the service name (SEO), large tagline as a <p>. */
export function ServiceHero({
  id,
  crumbs,
  title,
  tagline,
  sub,
  image,
  imageAlt,
  ctaLabel = 'Get a Free Quote',
  ctaAria,
  postTitle,
  postUrl,
  secondary,
  points,
}: {
  id: string;
  crumbs: { href: string; label: string }[];
  title: string;
  tagline: ReactNode;
  sub: ReactNode;
  image: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaAria?: string;
  postTitle: string;
  postUrl: string;
  secondary?: { href: string; label: string };
  points?: string[];
}) {
  return (
    <section className="vz-shero" aria-labelledby={id}>
      <div className="vz-shero__media">
        <Image src={image} alt={imageAlt} fill priority fetchPriority="high" sizes="100vw" />
      </div>
      <div className="vz-grid-bg" aria-hidden="true" />
      <div className="vz-container vz-shero__inner">
        <Breadcrumbs items={crumbs} />
        <h1 id={id} className="vz-eyebrow vz-shero__h1">{title}</h1>
        <p className="vz-h1 vz-shero__tagline">{tagline}</p>
        <p className="vz-lead vz-shero__sub">{sub}</p>
        <div className="vz-btn-row">
          <ConsultationCTA className="vz-btn vz-btn--primary" ariaLabel={ctaAria} postTitle={postTitle} postUrl={postUrl}>
            {ctaLabel}
          </ConsultationCTA>
          {secondary && (
            <a href={secondary.href} className="vz-btn vz-btn--ghost">{secondary.label}</a>
          )}
        </div>
        {points && points.length > 0 && (
          <ul className="vz-shero__points" role="list">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* Two-column intro: heading left, prose right. */
export function ServiceIntro({
  id,
  eyebrow,
  title,
  children,
  aside,
  surface = false,
  sectionId,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
  surface?: boolean;
  sectionId?: string;
}) {
  return (
    <section id={sectionId} className={`vz-section${surface ? ' vz-section--surface' : ''}`} aria-labelledby={id}>
      <div className="vz-container vz-split">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} />
        <div className="vz-split__body vz-richtext">
          {children}
          {aside}
        </div>
      </div>
    </section>
  );
}

export interface ServiceItem {
  id: string;
  title: string;
  description: ReactNode;
  highlight?: ReactNode;
  bullets?: string[];
  icon?: ReactNode;
  media?: { src: string; alt: string };
}

/* A group of detailed service cards with its own heading. */
export function ServiceCluster({
  id,
  eyebrow,
  title,
  intro,
  items,
  surface = false,
  columns = 2,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  items: ServiceItem[];
  surface?: boolean;
  columns?: 2 | 3 | 4;
}) {
  return (
    <section className={`vz-section${surface ? ' vz-section--surface' : ''}`} aria-labelledby={id}>
      <div className="vz-container">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} lead={intro} />
        <ul className={`vz-svc-grid vz-svc-grid--${columns}`} role="list">
          {items.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % columns) * 0.05}>
              <GlowCard as="article" className="vz-svc-card">
                <div id={s.id} className="vz-anchor" />
                {s.media && (
                  <div className="vz-svc-card__media">
                    <Image src={s.media.src} alt={s.media.alt} fill sizes="(min-width: 1100px) 380px, (min-width: 768px) 50vw, 100vw" />
                  </div>
                )}
                {s.icon && <span className="vz-icon-tile">{s.icon}</span>}
                <h3 className="vz-h3">{s.title}</h3>
                <p className="vz-body">{s.description}</p>
                {s.highlight && <p className="vz-svc-card__hl">{s.highlight}</p>}
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="vz-checks">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </GlowCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Simple title + description grid (benefits, audiences, deliverables). */
export function FeatureGrid({
  id,
  eyebrow,
  title,
  lead,
  items,
  surface = false,
  numbered = false,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  items: { title: string; description: ReactNode; icon?: ReactNode }[];
  surface?: boolean;
  numbered?: boolean;
}) {
  return (
    <section className={`vz-section${surface ? ' vz-section--surface' : ''}`} aria-labelledby={id}>
      <div className="vz-container">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} lead={lead} />
        <ul className="vz-features" role="list">
          {items.map((f, i) => (
            <Reveal as="li" key={f.title} delay={(i % 3) * 0.05} className="vz-feature">
              {numbered ? (
                <span className="vz-feature__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              ) : (
                f.icon && <span className="vz-icon-tile">{f.icon}</span>
              )}
              <h3 className="vz-h3">{f.title}</h3>
              <p className="vz-body">{f.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Ordered process timeline. */
export function ProcessList({
  id,
  eyebrow = 'How we work',
  title,
  lead,
  steps,
  surface = false,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  steps: { title: string; description: ReactNode }[];
  surface?: boolean;
}) {
  return (
    <section className={`vz-section${surface ? ' vz-section--surface' : ''}`} aria-labelledby={id}>
      <div className="vz-container vz-split">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} lead={lead} />
        <ol className="vz-steps">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.03 * i}>
              <span className="vz-steps__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="vz-h3">{s.title}</h3>
                <p className="vz-body">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Grouped chips (tech stacks, tools, frameworks). */
export function ChipGroups({
  id,
  eyebrow,
  title,
  lead,
  groups,
  surface = false,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  groups: { label: string; items: string[]; note?: string }[];
  surface?: boolean;
}) {
  return (
    <section className={`vz-section${surface ? ' vz-section--surface' : ''}`} aria-labelledby={id}>
      <div className="vz-container">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} lead={lead} />
        <div className="vz-tech">
          {groups.map((g, i) => (
            <Reveal key={g.label} delay={(i % 3) * 0.04} className="vz-tech__group">
              <h3 className="vz-tech__label">{g.label}</h3>
              {g.note && <p className="vz-body vz-tech__note">{g.note}</p>}
              <ul role="list">
                {g.items.map((t) => (
                  <li key={t} className="vz-chip">{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FAQ accordion using native <details>: keyboard-accessible, crawlable,
   and the visible text matches the FAQPage JSON-LD on each page. */
export function FaqList({
  id,
  title = 'Frequently asked questions',
  eyebrow = 'FAQ',
  faqs,
  surface = false,
}: {
  id: string;
  title?: ReactNode;
  eyebrow?: string;
  faqs: { q: string; a: ReactNode }[];
  surface?: boolean;
}) {
  return (
    <section className={`vz-section${surface ? ' vz-section--surface' : ''}`} aria-labelledby={id}>
      <div className="vz-container vz-split">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} />
        <div className="vz-faq">
          {faqs.map((f, i) => (
            <details key={f.q} className="vz-faq__item" open={i === 0}>
              <summary>
                <h3 className="vz-faq__q">{f.q}</h3>
                <Plus size={18} aria-hidden="true" className="vz-faq__icon" />
              </summary>
              <div className="vz-faq__a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Closing CTA band that opens the existing contact popup. */
export function ServiceCTA({
  id,
  eyebrow = 'Start a project',
  title,
  sub,
  ctaLabel = 'Get a Free Consultation',
  ctaAria,
  postTitle,
  postUrl,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  sub: ReactNode;
  ctaLabel?: string;
  ctaAria?: string;
  postTitle: string;
  postUrl: string;
}) {
  return (
    <section className="vz-section vz-section--tight" aria-labelledby={id}>
      <div className="vz-container">
        <div className="vz-cta">
          <div className="vz-grid-bg" aria-hidden="true" />
          <div className="vz-cta__copy">
            <p className="vz-eyebrow">{eyebrow}</p>
            <h2 id={id} className="vz-h2">{title}</h2>
            <p className="vz-lead">{sub}</p>
          </div>
          <div className="vz-cta__actions">
            <ConsultationCTA className="vz-btn vz-btn--primary" ariaLabel={ctaAria} postTitle={postTitle} postUrl={postUrl}>
              {ctaLabel}
            </ConsultationCTA>
            <Link href="/contact" className="vz-link-arrow">Or use the contact page →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Mobile-only sticky CTA bar. */
export function StickyCTA({ postTitle, postUrl, label = 'Get a Free Quote' }: { postTitle: string; postUrl: string; label?: string }) {
  return (
    <div className="vz-sticky">
      <ConsultationCTA className="vz-btn vz-btn--primary" postTitle={postTitle} postUrl={postUrl}>
        {label}
      </ConsultationCTA>
    </div>
  );
}

/* Related case studies for a service. */
export function RelatedWork({
  id,
  items,
}: {
  id: string;
  items: { href: string; title: string; description: string; image: { src: string; alt: string } }[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="vz-section" aria-labelledby={id}>
      <div className="vz-container">
        <SectionHeading id={id} eyebrow="Case studies" title="Work in this discipline" />
        <ul className="vz-posts" role="list">
          {items.map((w) => (
            <li key={w.href}>
              <article className="vz-post">
                <div className="vz-post__media">
                  <Image src={w.image.src} alt={w.image.alt} fill sizes="(min-width: 1024px) 400px, 100vw" />
                </div>
                <h3 className="vz-h3"><Link href={w.href} className="vz-stretched">{w.title}</Link></h3>
                <p className="vz-body vz-post__excerpt">{w.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* "Keep exploring" internal links to related services and resources. */
export function RelatedLinks({
  id,
  eyebrow = 'Keep Exploring',
  title,
  links,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  links: { href: string; label: string; description: string }[];
}) {
  return (
    <section className="vz-section vz-section--tight" aria-labelledby={id}>
      <div className="vz-container">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} />
        <ul className="vz-related" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <GlowCard className="vz-related__card">
                <h3 className="vz-h3"><Link href={l.href} className="vz-stretched">{l.label}</Link></h3>
                <p className="vz-body">{l.description}</p>
                <ChevronRight size={18} aria-hidden="true" className="vz-related__go" />
              </GlowCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Compact icon + label grid (e.g. "what we test"). */
export function IconLabelGrid({
  id,
  eyebrow,
  title,
  lead,
  items,
  note,
  surface = false,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  note?: ReactNode;
  items: { label: string; icon?: ReactNode; description?: ReactNode }[];
  surface?: boolean;
}) {
  return (
    <section className={`vz-section${surface ? ' vz-section--surface' : ''}`} aria-labelledby={id}>
      <div className="vz-container">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} lead={lead} />
        {note && <p className="vz-small vz-note">{note}</p>}
        <ul className="vz-iconlist" role="list">
          {items.map((it) => (
            <li key={it.label}>
              {it.icon && <span className="vz-icon-tile">{it.icon}</span>}
              <div>
                <h3 className="vz-iconlist__label">{it.label}</h3>
                {it.description && <p className="vz-body">{it.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
