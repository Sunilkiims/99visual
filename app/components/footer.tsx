// PremiumFooter — site-wide footer (rewritten in place so every page that
// imports `@/app/components/footer` gets it). Server-rendered; only the
// newsletter form is a client component.
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES, COMPANY_LINKS, RESOURCE_LINKS, SOCIAL_LINKS } from '@/lib/site-nav';
import { CONTACT_EMAIL, PHONE, STREET_ADDRESS, LOCALITY, REGION, POSTAL_CODE, GOOGLE_MAPS_URL } from '@/lib/schema';
import NewsletterForm from './premium/NewsletterForm';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="vz vz-footer" aria-labelledby="vz-footer-title">
      <h2 id="vz-footer-title" className="vz-sr">Site footer</h2>
      <div className="vz-container">
        <div className="vz-footer__top">
          <div className="vz-footer__brand">
            <Link href="/" aria-label="99 Visual Solutions — home" className="vz-footer__logo">
              <Image src="/logo.png" alt="99 Visual Solutions" width={686} height={369} sizes="96px" />
            </Link>
            <p className="vz-footer__tagline">Immersive Experience · Intelligent Solutions</p>
            <p className="vz-body">
              3D visualization, web development, digital marketing, geospatial and QA engineering from one
              Bengaluru team, for clients in India, the USA, UK, UAE, Australia (Sydney), South Korea and Japan.
            </p>
            <div className="vz-footer__nl">
              <p className="vz-footer__label">Newsletter</p>
              <NewsletterForm />
            </div>
          </div>

          <nav className="vz-footer__cols" aria-label="Footer">
            <div>
              <p className="vz-footer__label">Services</p>
              <ul>
                {SERVICES.map((s) => (
                  <li key={s.href}><Link href={s.href}>{s.label}</Link></li>
                ))}
                <li><Link href="/services">All services</Link></li>
              </ul>
            </div>
            <div>
              <p className="vz-footer__label">Company</p>
              <ul>
                {COMPANY_LINKS.map((l) => (
                  <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="vz-footer__label">Resources</p>
              <ul>
                {RESOURCE_LINKS.map((l) => (
                  <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="vz-footer__label">Contact</p>
              <address className="vz-footer__address">
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <a href={`tel:${PHONE.replace(/-/g, '')}`}>{PHONE}</a>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                  {STREET_ADDRESS}, {LOCALITY}, {REGION} {POSTAL_CODE}
                </a>
              </address>
            </div>
          </nav>
        </div>

        <div className="vz-footer__bottom">
          <p>© {year} 99 Visual Solutions. All rights reserved.</p>
          <ul className="vz-footer__social" aria-label="Social profiles">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <nav aria-label="Legal" className="vz-footer__legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </nav>
        </div>
      </div>
      <p className="vz-footer__wordmark" aria-hidden="true">99VISUAL</p>
    </footer>
  );
}
