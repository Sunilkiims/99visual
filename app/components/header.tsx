'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, ChevronDown,
  Layers, Boxes, Code2, BrainCircuit,
  TrendingUp, Compass, ShieldCheck,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const SERVICE_ITEMS = [
  {
    href:   '/services',
    label:  'End-to-End Solutions',
    sub:    'Full-spectrum digital delivery',
    Icon:   Layers,
    accent: 'from-orange-500 to-amber-400',
    shadow: 'shadow-orange-500/30',
    glow:   '#f97316',
  },
  {
    href:   '/services/visualization',
    label:  'Visualization',
    sub:    '3D renders & immersive media',
    Icon:   Boxes,
    accent: 'from-violet-500 to-purple-400',
    shadow: 'shadow-violet-500/30',
    glow:   '#8b5cf6',
  },
  {
    href:   '/services/website-development',
    label:  'Website Development',
    sub:    'Performant, pixel-perfect builds',
    Icon:   Code2,
    accent: 'from-sky-500 to-cyan-400',
    shadow: 'shadow-sky-500/30',
    glow:   '#0ea5e9',
  },
  {
    href:   '/services/it-consulting',
    label:  'IT Consulting',
    sub:    'Architecture & strategy',
    Icon:   BrainCircuit,
    accent: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-500/30',
    glow:   '#10b981',
  },
  {
    href:   '/services/digital-marketing-seo',
    label:  'Digital Marketing & SEO',
    sub:    'Growth, reach & conversion',
    Icon:   TrendingUp,
    accent: 'from-rose-500 to-pink-400',
    shadow: 'shadow-rose-500/30',
    glow:   '#f43f5e',
  },
  {
    href:   '/services/cad-gis-photogrammetry',
    label:  'CAD, GIS & Photogrammetry',
    sub:    'Precision spatial intelligence',
    Icon:   Compass,
    accent: 'from-amber-500 to-yellow-400',
    shadow: 'shadow-amber-500/30',
    glow:   '#f59e0b',
  },
  {
    href:   '/services/automation-testing',
    label:  'QA & Automation Testing',
    sub:    'Reliable, zero-defect pipelines',
    Icon:   ShieldCheck,
    accent: 'from-indigo-500 to-blue-400',
    shadow: 'shadow-indigo-500/30',
    glow:   '#6366f1',
  },
] as const;

const serviceRoutes = SERVICE_ITEMS.map((s) => s.href);

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/profile.php?id=100093639888151', icon: <FaFacebookF />,  label: 'Facebook'  },
  { href: 'https://x.com/99VisualSoluti1',                           icon: <FaXTwitter />,   label: 'Twitter'   },
  { href: 'https://www.linkedin.com/company/99-visual-solutions/',   icon: <FaLinkedinIn />, label: 'LinkedIn'  },
  { href: 'https://www.instagram.com/99visualsolutions/',            icon: <FaInstagram />,  label: 'Instagram' },
] as const;

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
      setScrolled(scrollTop > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { progress, scrolled };
}

function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    first.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [active, ref]);
}

const Header = () => {
  const [mobileMenuOpen,     setMobileMenuOpen]     = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mounted,            setMounted]            = useState(false);
  const [servicesOpen,       setServicesOpen]       = useState(false);
  const [hoveredIdx,         setHoveredIdx]         = useState<number | null>(null);

  const closeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drawerRef    = useRef<HTMLDivElement>(null);
  const pathname     = usePathname();

  const menuButtonId = 'header-services-btn';
  const dropdownId   = 'header-services-dropdown';

  const { progress, scrolled } = useScrollProgress();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = prev; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useFocusTrap(drawerRef, mobileMenuOpen);

  const openServices = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }, []);

  const closeServices = useCallback(() => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  }, []);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const isActive        = (href: string) => pathname === href;
  const isServiceActive = serviceRoutes.some((r) => pathname === r || pathname.startsWith(r + '/'));

  const navLinkClass = (href: string) =>
    clsx(
      'relative text-[15px] transition-all duration-200',
      'hover:scale-105 hover:text-orange-500',
      'after:content-[""] after:absolute after:left-0 after:-bottom-1',
      'after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300',
      isActive(href)
        ? 'text-orange-500 after:w-full'
        : 'after:w-0 hover:after:w-full'
    );

  return (
    <>
      <style>{`
        @keyframes navdot-ping {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(2.4); opacity: 0;   }
          100% { transform: scale(2.4); opacity: 0;   }
        }
        @keyframes navdot-breathe {
          0%, 100% { opacity: 1;    transform: scale(1);    }
          50%       { opacity: 0.75; transform: scale(0.88); }
        }

        /* ═══════════════════════════════════════════════════════════════
           SERVICE CARD — running light border
           ───────────────────────────────────────────────────────────────
           Technique: a registered custom property (--border-angle) drives
           the rotation *inside* the conic-gradient itself, instead of
           rotating the element with 'transform'. That's the fix for the
           old "clipped at the corners" / "inconsistent per card" bugs:
           previously an oversized ring div (inset: -45%) was physically
           rotated and relied on the parent's overflow-hidden to crop it —
           any mismatch in card size/aspect ratio made the crop look
           different per card, and corners could clip mid-spin.

           Here the border is produced with a padding + mask-composite
           trick: the pseudo-element is exactly 'inset: 0' (same box as
           the card, never larger), and 'padding' + mask "exclude" punches
           out everything except a thin, constant-width ring hugging the
           card's own border-radius. Since only the gradient's internal
           angle changes (not the element's geometry), the ring can never
           drift outside the card or clip at a corner — and because every
           card uses the exact same class, keyframes, duration and easing,
           the motion is identical everywhere. Only the ring's colour
           (--card-glow) differs per service, set inline per card.
        ═══════════════════════════════════════════════════════════════ */
        @property --border-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes border-spin {
          to { --border-angle: 360deg; }
        }

        .svc-card {
          position: relative;
          isolation: isolate;
          --border-angle: 0deg;
          --card-glow: #f97316;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(0);
        }

        .svc-card:hover,
        .svc-card:focus-visible {
          transform: translateY(-4px);
        }

        /* Rotating light ring — dormant at rest (opacity 0, animation
           paused) and only spins up on hover/focus. animation-play-state
           is what makes this "start on hover" rather than "always running,
           just dim": when paused, the gradient holds its last angle, so
           resuming on the next hover continues smoothly instead of
           snapping back to a reset starting position. */
        .svc-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: conic-gradient(
            from var(--border-angle),
            transparent 0deg,
            transparent 270deg,
            color-mix(in srgb, var(--card-glow) 55%, transparent) 315deg,
            var(--card-glow) 337deg,
            color-mix(in srgb, var(--card-glow) 55%, transparent) 355deg,
            transparent 360deg
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0;
          animation: border-spin 3.4s linear infinite;
          animation-play-state: paused;
          transition: opacity 0.35s ease;
          pointer-events: none;
          will-change: opacity;
        }

        .svc-card:hover::before,
        .svc-card:focus-visible::before {
          opacity: 1;
          animation-play-state: running;
        }

        /* Respect reduced-motion: keep the border visible but static
           instead of forcing a spin on visitors who've opted out. */
        @media (prefers-reduced-motion: reduce) {
          .svc-card::before {
            animation: none;
          }
        }
      `}</style>

      <header
        className={clsx(
          'fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md',
          scrolled ? 'bg-white/85 shadow-md' : 'bg-transparent'
        )}
        role="banner"
      >
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-100 ease-out z-10 pointer-events-none"
          style={{ width: `${progress * 100}%`, opacity: scrolled ? 1 : 0 }}
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-8 lg:space-x-12">

            <Link href="/" aria-label="99 Visual Solutions — home">
              <div className="relative w-[150px] h-[45px]">
                <Image
                  src={scrolled ? '/logo-dark.png' : '/logo.png'}
                  alt="99 Visual Solutions"
                  fill
                  sizes="180px"
                  priority
                  className="object-contain transition-opacity duration-300"
                />
              </div>
            </Link>

            <nav
              className={clsx(
                'hidden md:flex items-center gap-6 lg:gap-8 font-medium transition-colors duration-300',
                scrolled ? 'text-gray-800' : 'text-white'
              )}
              aria-label="Primary navigation"
            >
              <Link href="/"      className={navLinkClass('/')}      aria-current={isActive('/')      ? 'page' : undefined}>Home</Link>
              <Link href="/about" className={navLinkClass('/about')} aria-current={isActive('/about') ? 'page' : undefined}>About</Link>

              <div
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
                <button
                  id={menuButtonId}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  aria-controls={dropdownId}
                  onClick={() => setServicesOpen((v) => !v)}
                  className={clsx(
                    'relative text-[15px] font-medium select-none',
                    'flex items-center gap-1 cursor-default',
                    'transition-all duration-200 hover:scale-105 hover:text-orange-500',
                    'after:content-[""] after:absolute after:left-0 after:-bottom-1',
                    'after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 focus-visible:rounded-sm',
                    isServiceActive || servicesOpen
                      ? 'text-orange-500 after:w-full'
                      : 'after:w-0 hover:after:w-full'
                  )}
                >
                  Services
                  <ChevronDown
                    className={clsx(
                      'w-3.5 h-3.5 mt-0.5 transition-transform duration-300',
                      servicesOpen ? 'rotate-180' : ''
                    )}
                    aria-hidden="true"
                  />
                </button>

                {servicesOpen && (
                  <div className="absolute left-0 top-full h-3 w-full" aria-hidden="true" />
                )}

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      id={dropdownId}
                      role="menu"
                      aria-labelledby={menuButtonId}
                      initial={{ opacity: 0, y: -10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0,   scale: 1    }}
                      exit={{    opacity: 0, y: -8,  scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      style={{ transformOrigin: 'top center', willChange: 'transform, opacity' }}
                      className={clsx(
                        'absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50',
                        'w-[530px]',
                        'bg-[#0d1117]/92 backdrop-blur-2xl',
                        'border border-white/[0.08]',
                        'rounded-2xl overflow-hidden',
                        'shadow-[0_32px_80px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]',
                      )}
                      onMouseEnter={openServices}
                      onMouseLeave={closeServices}
                    >
                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80" aria-hidden="true" />

                      <div className="px-5 pt-4 pb-2" aria-hidden="true">
                        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/30">What we do</p>
                      </div>

                      {/* Generous top/left padding so every card's ring
                          and ambient glow has room to breathe before the
                          panel's own rounded edge — nothing here relies on
                          clipping anymore, but the spacing still keeps the
                          grid visually balanced. */}
                      <div className="px-4 pt-2 pb-3 grid grid-cols-2 gap-1.5">
                        {SERVICE_ITEMS.map((svc, idx) => {
                          const active  = pathname === svc.href;
                          const hovered = hoveredIdx === idx;
                          return (
                            <Link
                              key={svc.href}
                              href={svc.href}
                              role="menuitem"
                              onClick={() => setServicesOpen(false)}
                              onMouseEnter={() => setHoveredIdx(idx)}
                              onMouseLeave={() => setHoveredIdx(null)}
                              aria-current={active ? 'page' : undefined}
                              style={{ ['--card-glow' as string]: svc.glow } as React.CSSProperties}
                              className={clsx(
                                'svc-card group relative flex items-center gap-3 rounded-xl px-3 py-3',
                                'transition-colors duration-200 ease-out',
                                'border border-transparent',
                                'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-orange-500',
                                active
                                  ? 'bg-white/[0.08] border-white/10'
                                  : 'hover:bg-white/[0.06]',
                              )}
                            >
                              {/* Icon box */}
                              <div
                                className={clsx(
                                  'relative z-[2] flex-shrink-0 w-9 h-9 rounded-lg',
                                  'flex items-center justify-center',
                                  `bg-gradient-to-br ${svc.accent}`,
                                  `shadow-lg ${svc.shadow}`,
                                  'transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3',
                                )}
                                aria-hidden="true"
                                style={{
                                  boxShadow: hovered
                                    ? `0 6px 20px ${svc.glow}55, inset 0 1px 0 rgba(255,255,255,0.3)`
                                    : `0 3px 10px ${svc.glow}33, inset 0 1px 0 rgba(255,255,255,0.25)`,
                                }}
                              >
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                                <svc.Icon className="w-4 h-4 text-white z-10" strokeWidth={1.8} />
                              </div>

                              {/* Text */}
                              <div className="relative z-[2] min-w-0 flex-1">
                                <p className={clsx(
                                  'text-[13px] font-semibold leading-tight truncate',
                                  'transition-colors duration-150',
                                  active ? 'text-white' : 'text-white/80 group-hover:text-white',
                                )}>
                                  {svc.label}
                                </p>
                                <p className="text-[11px] text-white/35 mt-0.5 leading-tight truncate group-hover:text-white/55 transition-colors duration-150">
                                  {svc.sub}
                                </p>
                              </div>

                              {/* Active dot */}
                              {active && (
                                <span className="relative z-[2] flex-shrink-0 flex items-center justify-center w-2.5 h-2.5" aria-hidden="true">
                                  <span
                                    className={clsx('absolute inline-flex w-full h-full rounded-full', `bg-gradient-to-br ${svc.accent}`)}
                                    style={{ animation: 'navdot-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.65 }}
                                  />
                                  <span
                                    className={clsx('relative inline-flex w-1.5 h-1.5 rounded-full', `bg-gradient-to-br ${svc.accent}`)}
                                    style={{
                                      boxShadow: `0 0 6px ${svc.glow}dd, 0 0 2px ${svc.glow}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                                      animation: 'navdot-breathe 2.2s ease-in-out infinite',
                                    }}
                                  />
                                </span>
                              )}

                              {/* Arrow */}
                              <svg
                                className="relative z-[2] flex-shrink-0 w-3.5 h-3.5 text-white/0 group-hover:text-white/40 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b-2xl" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/partner" className={navLinkClass('/partner')} aria-current={isActive('/partner') ? 'page' : undefined}>Partner</Link>
              <Link href="/careers" className={navLinkClass('/careers')} aria-current={isActive('/careers') ? 'page' : undefined}>Career</Link>
              <Link href="/contact" className={navLinkClass('/contact')} aria-current={isActive('/contact') ? 'page' : undefined}>Contact</Link>
            </nav>
          </div>

          <div
            className={clsx(
              'hidden md:flex items-center space-x-4',
              scrolled ? 'text-gray-700' : 'text-white'
            )}
            aria-label="Social media links"
          >
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${s.label} (opens in new tab)`}
                className="hover:text-orange-500 transition-all duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 focus-visible:rounded-sm"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-1 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-drawer"
          >
            {mobileMenuOpen
              ? <X    className="text-orange-500 w-7 h-7" aria-hidden="true" />
              : <Menu className="text-orange-500 w-7 h-7" aria-hidden="true" />
            }
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ───────────────────────────────────────────────────── */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[9998] bg-black/55 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />

              <motion.div
                id="mobile-drawer"
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[9999] bg-[#0f1c2e] text-white flex flex-col shadow-2xl"
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} aria-label="99 Visual Solutions — home">
                    <div className="relative w-[150px] h-[45px]">
                      <Image src="/logo.png" alt="99 Visual Solutions" fill sizes="150px" priority className="object-contain" />
                    </div>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-orange-500 hover:text-orange-500 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1" aria-label="Mobile navigation">
                  {[
                    { href: '/',      label: 'Home',  delay: 0.08 },
                    { href: '/about', label: 'About', delay: 0.13 },
                  ].map((item) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.delay, duration: 0.28, ease: 'easeOut' }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        className={clsx(
                          'block py-3 px-4 rounded-lg text-[15px] font-medium tracking-wide',
                          'transition-all duration-200 hover:bg-white/5 hover:text-orange-400 hover:pl-6',
                          pathname === item.href
                            ? 'text-orange-400 bg-white/5 border-l-2 border-orange-500 pl-6'
                            : 'text-gray-300'
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18, duration: 0.28, ease: 'easeOut' }}
                  >
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      aria-expanded={mobileServicesOpen}
                      aria-controls="mobile-services-list"
                      className={clsx(
                        'w-full flex items-center justify-between py-3 px-4 rounded-lg',
                        'text-[15px] font-medium tracking-wide',
                        'transition-all duration-200 hover:bg-white/5 hover:text-orange-400',
                        'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-orange-500',
                        isServiceActive
                          ? 'text-orange-400 bg-white/5 border-l-2 border-orange-500 pl-6'
                          : 'text-gray-300'
                      )}
                    >
                      Services
                      <ChevronDown
                        className={clsx(
                          'w-4 h-4 transition-transform duration-300',
                          mobileServicesOpen ? 'rotate-180 text-orange-400' : 'text-gray-500'
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.ul
                          id="mobile-services-list"
                          role="list"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden ml-4 mt-2 border-l border-white/10 pl-3 pb-2 space-y-1"
                        >
                          {SERVICE_ITEMS.map((svc) => {
                            const mobileActive = pathname === svc.href;
                            return (
                              <li key={svc.href}>
                                <Link
                                  href={svc.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  aria-current={mobileActive ? 'page' : undefined}
                                  className={clsx(
                                    'flex items-center gap-2.5 py-2 px-3 rounded-lg text-[13px] tracking-wide',
                                    'transition-all duration-200 hover:text-orange-400 hover:bg-white/5',
                                    'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-orange-500',
                                    mobileActive ? 'text-orange-400' : 'text-gray-400'
                                  )}
                                >
                                  <span
                                    className={clsx('flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center', `bg-gradient-to-br ${svc.accent}`)}
                                    aria-hidden="true"
                                  >
                                    <svc.Icon className="w-3 h-3 text-white" strokeWidth={2} />
                                  </span>
                                  {svc.label}

                                  {mobileActive && (
                                    <span className="relative ml-auto flex-shrink-0 flex items-center justify-center w-2.5 h-2.5" aria-hidden="true">
                                      <span
                                        className={clsx('absolute inline-flex w-full h-full rounded-full', `bg-gradient-to-br ${svc.accent}`)}
                                        style={{ animation: 'navdot-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.6 }}
                                      />
                                      <span
                                        className={clsx('relative inline-flex w-1.5 h-1.5 rounded-full', `bg-gradient-to-br ${svc.accent}`)}
                                        style={{ boxShadow: `0 0 5px ${svc.glow}cc`, animation: 'navdot-breathe 2.2s ease-in-out infinite' }}
                                      />
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {[
                    { href: '/partner', label: 'Partner', delay: 0.23 },
                    { href: '/careers', label: 'Career',  delay: 0.28 },
                    { href: '/contact', label: 'Contact', delay: 0.33 },
                  ].map((item) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.delay, duration: 0.28, ease: 'easeOut' }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        className={clsx(
                          'block py-3 px-4 rounded-lg text-[15px] font-medium tracking-wide',
                          'transition-all duration-200 hover:bg-white/5 hover:text-orange-400 hover:pl-6',
                          pathname === item.href
                            ? 'text-orange-400 bg-white/5 border-l-2 border-orange-500 pl-6'
                            : 'text-gray-300'
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="px-6 py-5 border-t border-white/10">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3" aria-hidden="true">Follow Us</p>
                  <div className="flex gap-3" aria-label="Social media links">
                    {SOCIAL_LINKS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${s.label} (opens in new tab)`}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-all duration-200 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Header;
