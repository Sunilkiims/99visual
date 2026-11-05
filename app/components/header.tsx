'use client';

// PremiumHeader — site-wide header (rewritten in place so every page that
// imports `@/app/components/header` gets it).
// - Every navigation link is in the server-rendered HTML (crawlable), including
//   the service links inside the closed dropdown.
// - Desktop "Services" opens on click/hover; Escape and outside clicks close it.
// - Mobile opens FullScreenMobileMenu (focus-trapped dialog).
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { SERVICES, PRIMARY_NAV } from '@/lib/site-nav';
import ServiceIcon from './premium/ServiceIcon';
import FullScreenMobileMenu from './premium/FullScreenMobileMenu';

export default function Header() {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const svcRef = useRef<HTMLLIElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation (state adjusted during render, React's
  // recommended pattern instead of a setState-in-effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setSvcOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!svcOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSvcOpen(false);
    const onClick = (e: MouseEvent) => {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [svcOpen]);

  const openSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSvcOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setSvcOpen(false), 140);
  };

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuBtnRef.current?.focus();
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));
  const servicesActive = pathname.startsWith('/services');

  return (
    <>
      <a href="#main" className="vz-skip">Skip to content</a>
      <header className={`vz-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="vz-container vz-header__inner">
          <Link href="/" className="vz-header__logo" aria-label="99 Visual Solutions — home">
            <Image src="/logo.png" alt="99 Visual Solutions" width={686} height={369} priority sizes="80px" />
          </Link>

          <nav aria-label="Primary" className="vz-header__nav">
            <ul>
              <li
                ref={svcRef}
                className="vz-header__has-menu"
                onMouseEnter={openSoon}
                onMouseLeave={closeSoon}
              >
                <button
                  type="button"
                  className={`vz-header__link${servicesActive ? ' is-active' : ''}`}
                  aria-expanded={svcOpen}
                  aria-controls="vz-services-menu"
                  onClick={() => setSvcOpen((v) => !v)}
                >
                  Services <ChevronDown size={14} aria-hidden="true" className="vz-header__chev" />
                </button>
                <div id="vz-services-menu" className={`vz-mega${svcOpen ? ' is-open' : ''}`}>
                  <div className="vz-mega__grid">
                    {SERVICES.map((s) => (
                      <Link key={s.href} href={s.href} className="vz-mega__item" aria-current={isActive(s.href) ? 'page' : undefined}>
                        <span className="vz-icon-tile"><ServiceIcon name={s.key} /></span>
                        <span>
                          <span className="vz-mega__title">{s.label}</span>
                          <span className="vz-mega__desc">{s.short}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="vz-mega__foot">
                    <span>Six disciplines, one accountable team.</span>
                    <Link href="/services" className="vz-link-arrow">All services →</Link>
                  </div>
                </div>
              </li>
              {PRIMARY_NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`vz-header__link${isActive(l.href) ? ' is-active' : ''}`} aria-current={isActive(l.href) ? 'page' : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="vz-header__actions">
            <Link href="/contact" className="vz-btn vz-btn--primary vz-btn--sm vz-header__cta">
              Start a project
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              className="vz-header__burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="vz-mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <FullScreenMobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
