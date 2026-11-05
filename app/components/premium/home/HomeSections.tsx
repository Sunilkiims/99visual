// Homepage sections (server components). Content is drawn from the site's
// existing copy, lib/case-studies.ts, lib/videos.ts and lib/industries.ts —
// no invented clients, results or statistics.
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading, Button, ArrowLink } from '@/app/components/ui/primitives';
import GlowCard from '@/app/components/ui/GlowCard';
import Reveal from '@/app/components/ui/Reveal';
import ServiceIcon from '../ServiceIcon';
import { SERVICES, type ServiceKey } from '@/lib/site-nav';
import { INDUSTRIES } from '@/lib/industries';
import { caseStudies } from '@/lib/case-studies';
import { videos } from '@/lib/videos';
import { CONTACT_EMAIL, PHONE } from '@/lib/schema';

const svc = (k: ServiceKey) => SERVICES.find((s) => s.key === k)!;

/* ── Company introduction ─────────────────────────────────────────────── */
export function CompanyIntro() {
  return (
    <section className="vz-section" aria-labelledby="vz-intro-title">
      <div className="vz-container vz-split">
        <SectionHeading
          id="vz-intro-title"
          eyebrow="Who we are"
          title={<>One accountable partner across <span className="vz-grad-text">six disciplines</span></>}
        />
        <div className="vz-split__body">
          <p className="vz-lead">
            We believe technology should not just support businesses — it should drive growth, innovation and
            long-term success.
          </p>
          <p className="vz-body">
            99 Visual Solutions is a full-service IT and digital transformation company specialising in 3D
            architectural visualisation, custom web and mobile app development, CAD drafting, GIS mapping, LiDAR
            data processing, search engine optimisation and IT consulting. From startups to large enterprises, we
            help organisations build digital ecosystems that perform, scale and deliver measurable results.
          </p>
          <p className="vz-body">
            Founded in 2020 and headquartered in Bengaluru, our cross-functional team of engineers, designers and
            strategists brings domain expertise to every project.
          </p>
          <ArrowLink href="/about">More about the company</ArrowLink>
        </div>
      </div>
    </section>
  );
}

/* ── Service bento grid ───────────────────────────────────────────────── */
const BENTO: { key: ServiceKey; span: string; image?: { src: string; alt: string } }[] = [
  { key: 'visualization', span: 'vz-bento__a', image: { src: '/images/architecture3.jpg', alt: 'Photorealistic exterior render of a contemporary residence at dusk' } },
  { key: 'web', span: 'vz-bento__b' },
  { key: 'geospatial', span: 'vz-bento__c' },
  { key: 'marketing', span: 'vz-bento__d' },
  { key: 'testing', span: 'vz-bento__e' },
  { key: 'consulting', span: 'vz-bento__f' },
];

export function ServiceBentoGrid() {
  return (
    <section className="vz-section vz-section--surface" aria-labelledby="vz-services-title">
      <div className="vz-container">
        <SectionHeading
          id="vz-services-title"
          eyebrow="Services"
          title="Everything a digital project needs, under one roof"
          lead="Pick one discipline or combine several. Each service is led by specialists and delivered in-house."
        />
        <ul className="vz-bento" role="list">
          {BENTO.map(({ key, span, image }, i) => {
            const s = svc(key);
            return (
              <Reveal as="li" key={key} delay={i * 0.05} className={span}>
                <GlowCard className={`vz-bento__card${image ? ' has-image' : ''}`}>
                  {image && (
                    <div className="vz-bento__media">
                      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 640px, 100vw" />
                    </div>
                  )}
                  <span className="vz-icon-tile"><ServiceIcon name={key} /></span>
                  <h3 className="vz-h3">
                    <Link href={s.href} className="vz-stretched">{s.label}</Link>
                  </h3>
                  <p className="vz-body">{s.short}</p>
                  <span className="vz-bento__go" aria-hidden="true"><ArrowUpRight size={18} /></span>
                </GlowCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ── Featured portfolio ───────────────────────────────────────────────── */
export function PortfolioShowcase() {
  const reel = videos.find((v) => v.slug === '3d-visualization-showreel') ?? videos[0];
  return (
    <section className="vz-section" aria-labelledby="vz-work-title">
      <div className="vz-container">
        <div className="vz-row-head">
          <SectionHeading
            id="vz-work-title"
            eyebrow="Selected work"
            title="Real projects, documented honestly"
            lead="Case studies state what the evidence supports — and what it doesn't."
          />
          <Button href="/work" variant="ghost" arrow>All case studies</Button>
        </div>
        <ul className="vz-work" role="list">
          <Reveal as="li" className="vz-work__feature">
            <article className="vz-work__card">
              <div className="vz-work__media">
                <Image src={reel.thumbnail} alt={reel.thumbnailAlt} fill sizes="(min-width: 1024px) 720px, 100vw" />
                <span className="vz-work__play" aria-hidden="true">▶</span>
              </div>
              <div className="vz-work__meta">
                <span className="vz-chip">3D Visualization · Video</span>
                <h3 className="vz-h3"><Link href={`/videos/${reel.slug}`} className="vz-stretched">{reel.title}</Link></h3>
                <p className="vz-body">{reel.description}</p>
              </div>
            </article>
          </Reveal>
          {caseStudies.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={0.05 * (i + 1)}>
              <article className="vz-work__card">
                <div className="vz-work__media vz-work__media--sm">
                  <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 400px, 100vw" />
                </div>
                <div className="vz-work__meta">
                  <span className="vz-chip">{c.service.label.replace(/ services$/i, '')}</span>
                  <h3 className="vz-h3"><Link href={`/work/${c.slug}`} className="vz-stretched">{c.navLabel}</Link></h3>
                  <p className="vz-body">{c.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Industries ───────────────────────────────────────────────────────── */
export function IndustryGrid({ limit = 8 }: { limit?: number }) {
  return (
    <section className="vz-section vz-section--surface" aria-labelledby="vz-ind-title">
      <div className="vz-container">
        <div className="vz-row-head">
          <SectionHeading id="vz-ind-title" eyebrow="Industries" title="Built for the sectors we know" />
          <Button href="/industries" variant="ghost" arrow>Industries we serve</Button>
        </div>
        <ul className="vz-ind" role="list">
          {INDUSTRIES.slice(0, limit).map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={(i % 4) * 0.05}>
              <div className="vz-ind__item">
                <span className="vz-ind__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="vz-h3">
                  <Link href={`/industries#${ind.slug}`} className="vz-stretched">{ind.name}</Link>
                </h3>
                <p className="vz-body">{ind.summary}</p>
                <p className="vz-ind__svc">{ind.services.map((k) => svc(k).label).join(' · ')}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Technology ecosystem ─────────────────────────────────────────────── */
// Tools named on the service pages and in published case studies.
export const TECH_GROUPS = [
  { label: 'Visualization', items: ['3ds Max', 'V-Ray', 'Corona', 'Unreal Engine', 'Revit'] },
  { label: 'Web & app', items: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'WordPress', 'Flutter'] },
  { label: 'Cloud & DevOps', items: ['AWS', 'Azure', 'Google Cloud', 'Vercel', 'Docker', 'Kubernetes'] },
  { label: 'Geospatial & CAD', items: ['AutoCAD', 'Civil 3D', 'ArcGIS', 'QGIS', 'Pix4D', 'Agisoft Metashape', 'CloudCompare', 'TerraScan'] },
  { label: 'Quality engineering', items: ['Playwright', 'Selenium', 'Cypress', 'Appium'] },
  { label: 'Search & analytics', items: ['Google Search Console', 'Google Analytics 4', 'Schema.org'] },
];

export function TechnologyCloud() {
  return (
    <section className="vz-section" aria-labelledby="vz-tech-title">
      <div className="vz-container">
        <SectionHeading
          id="vz-tech-title"
          eyebrow="Technology ecosystem"
          title="Proven tools, chosen per project"
          align="center"
        />
        <div className="vz-tech">
          {TECH_GROUPS.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.04} className="vz-tech__group">
              <h3 className="vz-tech__label">{g.label}</h3>
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

/* ── Why choose ───────────────────────────────────────────────────────── */
// Each point restates a commitment already made on the service pages.
const WHY = [
  { title: 'One accountable team', body: 'Visualization, web, marketing, geospatial, QA and consulting under one roof — one brief, one point of contact, no hand-offs between vendors.' },
  { title: 'Scope before production', body: 'Deliverables, formats and a dated schedule are confirmed before work starts, so you know what arrives and when.' },
  { title: 'Built in-house', body: 'Renders, code and data processing are produced by our own team in Bengaluru, not subcontracted.' },
  { title: 'Review checkpoints', body: 'Drafts are shared early for sign-off, so feedback lands before final production time is spent.' },
  { title: 'Global hours', body: 'Working from India (UTC+5:30) for clients in the USA, UK, UAE and Australia, with overlap for live reviews.' },
  { title: 'Honest reporting', body: 'Case studies list what the evidence supports and what it does not — no inflated numbers.' },
];

export function WhyChoose() {
  return (
    <section className="vz-section vz-section--surface" aria-labelledby="vz-why-title">
      <div className="vz-container vz-split">
        <SectionHeading
          id="vz-why-title"
          eyebrow="Why 99Visual"
          title="How we work with you"
          lead="Clear scope, visible progress and work you can verify."
        />
        <ul className="vz-why" role="list">
          {WHY.map((w, i) => (
            <Reveal as="li" key={w.title} delay={(i % 2) * 0.05}>
              <h3 className="vz-h3">{w.title}</h3>
              <p className="vz-body">{w.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Conversion CTA ───────────────────────────────────────────────────── */
export function CTASection({
  title = 'Have a project in mind?',
  body = 'Tell us what you are building. We reply within 24 business hours with questions, a scope and a dated plan.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="vz-section vz-section--tight" aria-labelledby="vz-cta-title">
      <div className="vz-container">
        <div className="vz-cta">
          <div className="vz-grid-bg" aria-hidden="true" />
          <div className="vz-cta__copy">
            <h2 id="vz-cta-title" className="vz-h2">{title}</h2>
            <p className="vz-lead">{body}</p>
          </div>
          <div className="vz-cta__actions">
            <Button href="/contact" arrow>Start a project</Button>
            <div className="vz-cta__contact">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a href={`tel:${PHONE.replace(/-/g, '')}`}>{PHONE}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
