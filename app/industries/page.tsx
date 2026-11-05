// /industries — Industries We Serve.
// Content comes from lib/industries.ts (the site's existing "We Serve" copy,
// the use cases the linked services deliver, and links to real published work
// only). No invented clients or results.
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { INDUSTRIES } from '@/lib/industries';
import { SERVICES } from '@/lib/site-nav';
import { BASE, buildGraph, orgSchema, websiteSchema, breadcrumbFromItems, webPage, jsonLdString } from '@/lib/schema';
import { PAGE_LAST_MODIFIED } from '@/lib/page-dates';
import { Breadcrumbs, ServiceCTA } from '@/app/components/premium/service/ServiceBlocks';
import ServiceIcon from '@/app/components/premium/ServiceIcon';
import Reveal from '@/app/components/ui/Reveal';

const PATH = '/industries';
const TITLE = 'Industries We Serve';
const DESCRIPTION =
  'Industries 99 Visual Solutions serves: real estate and architecture, e-commerce, government, IT, manufacturing, healthcare, startups and wellness — and the services each uses.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE}${PATH}` },
  openGraph: {
    title: `${TITLE} | 99 Visual Solutions`,
    description: DESCRIPTION,
    url: `${BASE}${PATH}`,
    siteName: '99 Visual Solutions',
    type: 'website',
    images: [{ url: `${BASE}/images/home-og.jpg`, width: 1200, height: 630, alt: '99 Visual Solutions — industries served' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | 99 Visual Solutions`,
    description: DESCRIPTION,
    images: [`${BASE}/images/home-og.jpg`],
  },
};

const breadcrumbNode = breadcrumbFromItems([
  { name: 'Home', url: '/' },
  { name: TITLE, url: PATH },
]);

const graph = buildGraph(
  orgSchema,
  websiteSchema,
  {
    ...webPage({ pathname: PATH, name: TITLE, description: DESCRIPTION, dateModified: PAGE_LAST_MODIFIED[PATH] }),
    '@type': 'CollectionPage',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: INDUSTRIES.map((ind, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: ind.name,
        url: `${BASE}${PATH}#${ind.slug}`,
      })),
    },
  },
  breadcrumbNode,
);

const svc = (k: string) => SERVICES.find((s) => s.key === k)!;

export default function IndustriesPage() {
  return (
    <>
      <script id="schema-industries-graph" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(graph) }} />
      <div className="vz">
        <Header />
        <main id="main">
          <section className="vz-hero vz-hero--page" aria-labelledby="ind-hero-heading">
            <div className="vz-grid-bg" aria-hidden="true" />
            <div className="vz-aurora vz-hero__aurora-a" aria-hidden="true" />
            <div className="vz-container vz-page-hero">
              <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: PATH, label: TITLE }]} />
              <p className="vz-eyebrow">Industries</p>
              <h1 id="ind-hero-heading" className="vz-display">
                Industries <span className="vz-grad-text">we serve</span>
              </h1>
              <p className="vz-lead vz-page-hero__lead">
                Eight sectors where our visualization, web, marketing, geospatial, QA and IT consulting work comes
                together. Each one below lists what we typically deliver, the services involved, and published work where
                we have it.
              </p>
              <nav aria-label="Industries on this page">
                <ul className="vz-jump" role="list">
                  {INDUSTRIES.map((ind) => (
                    <li key={ind.slug}><a href={`#${ind.slug}`}>{ind.name}</a></li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>

          <section className="vz-section vz-section--surface" aria-label="Industry details">
            <div className="vz-container">
              <ol className="vz-indlist">
                {INDUSTRIES.map((ind, i) => (
                  <Reveal as="li" key={ind.slug}>
                    <article className="vz-indrow" aria-labelledby={`${ind.slug}-h`}>
                      <div id={ind.slug} className="vz-anchor" />
                      <div className="vz-indrow__head">
                        <span className="vz-ind__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <h2 id={`${ind.slug}-h`} className="vz-h2">{ind.name}</h2>
                        <p className="vz-lead">{ind.summary}</p>
                      </div>
                      <div className="vz-indrow__body">
                        <div>
                          <h3 className="vz-tech__label">What we deliver</h3>
                          <ul className="vz-checks">
                            {ind.useCases.map((u) => <li key={u}>{u}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h3 className="vz-tech__label">Services involved</h3>
                          <ul className="vz-indrow__svcs" role="list">
                            {ind.services.map((k) => (
                              <li key={k}>
                                <Link href={svc(k).href}>
                                  <span className="vz-icon-tile"><ServiceIcon name={svc(k).key} size={18} /></span>
                                  {svc(k).label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {ind.examples && ind.examples.length > 0 && (
                          <div>
                            <h3 className="vz-tech__label">Published work</h3>
                            <ul className="vz-checks vz-checks--links">
                              {ind.examples.map((e) => (
                                <li key={e.href}><Link className="vz-prose-link" href={e.href}>{e.label}</Link></li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>

          <ServiceCTA
            id="ind-cta-heading"
            title={<>Working in one of these <em>sectors?</em></>}
            sub="Tell us about your project and the outcome you need. We'll suggest the right mix of services and a dated plan."
            postTitle="Industries"
            postUrl={PATH}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
