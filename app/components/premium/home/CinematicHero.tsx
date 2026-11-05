// CinematicHero — homepage hero. Server component: the headline and copy are
// in the initial HTML and paint without JavaScript (the H1 is the LCP
// element). The globe loads afterwards on the client.
import { Button } from '@/app/components/ui/primitives';
import GlobeLoader from '../GlobeLoader';
import { SERVICES } from '@/lib/site-nav';
import Link from 'next/link';

export default function CinematicHero() {
  return (
    <section className="vz-hero" aria-labelledby="vz-hero-title">
      <div className="vz-grid-bg" aria-hidden="true" />
      <div className="vz-aurora vz-hero__aurora-a" aria-hidden="true" />
      <div className="vz-aurora vz-hero__aurora-b" aria-hidden="true" />

      <div className="vz-container vz-hero__inner">
        <div className="vz-hero__copy">
          <p className="vz-eyebrow vz-hero__eyebrow">Immersive Experience · Intelligent Solutions</p>
          <h1 id="vz-hero-title" className="vz-display">
            Immersive 3D visualization &amp; <span className="vz-grad-text">intelligent digital engineering</span>
          </h1>
          <p className="vz-lead vz-hero__lead">
            99 Visual Solutions is a Bengaluru technology studio. We create architectural visualization, build
            websites and web applications, and deliver SEO, CAD/GIS/LiDAR mapping, QA automation and IT consulting
            for clients across India, the USA, UK, UAE and Australia.
          </p>
          <div className="vz-btn-row">
            <Button href="/contact" arrow>Start a project</Button>
            <Button href="/work" variant="ghost">Explore our work</Button>
          </div>
          <ul className="vz-hero__facts" aria-label="Company at a glance">
            <li><strong>2020</strong><span>Founded in Bengaluru</span></li>
            <li><strong>6</strong><span>Disciplines, one team</span></li>
            <li><strong>5</strong><span>Countries served</span></li>
          </ul>
        </div>

        <div className="vz-hero__visual">
          <GlobeLoader />
          <div className="vz-hero__badge" aria-hidden="true">
            <span className="vz-hero__pulse" />
            Bengaluru HQ · UTC+5:30
          </div>
        </div>
      </div>

      <nav className="vz-hero__ticker" aria-label="Services">
        <div className="vz-container">
          <ul>
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  );
}
