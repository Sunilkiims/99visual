'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ChevronDown,
  Layers,        // End-to-End Solutions
  Boxes,         // Visualization (3D)
  Code2,         // Website Development
  BrainCircuit,  // IT Consulting
  TrendingUp,    // Digital Marketing & SEO
  Compass,       // CAD, GIS & Photogrammetry
  ShieldCheck,   // QA & Automation Testing
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

/* ─── Service catalogue ──────────────────────────────────────────────────── */
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
];

const serviceRoutes = SERVICE_ITEMS.map((s) => s.href);

/* ─── Component ──────────────────────────────────────────────────────────── */
const Header = () => {
  const [mobileMenuOpen,    setMobileMenuOpen]    = useState(false);
  const [mobileServicesOpen,setMobileServicesOpen] = useState(false);
  const [scrolled,          setScrolled]           = useState(false);
  const [mounted,           setMounted]            = useState(false);
  const [servicesOpen,      setServicesOpen]       = useState(false);
  const [hoveredIdx,        setHoveredIdx]         = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  const openServices  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setServicesOpen(true); };
  const closeServices = () => { closeTimer.current = setTimeout(() => setServicesOpen(false), 140); };

  const isActive       = (href: string) => pathname === href;
  const isServiceActive = serviceRoutes.some((r) => pathname === r || pathname.startsWith(r + '/'));

  const navLinkClass = (href: string) =>
    clsx(
      'relative text-[15px] transition-transform duration-200 hover:scale-105 hover:text-orange-500',
      'after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:w-0 hover:after:w-full after:transition-all after:duration-300',
      isActive(href) && 'text-orange-500 after:w-full'
    );

  return (
    <>
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <header className={clsx(
        'fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md',
        scrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

          <div className="flex items-center space-x-8 lg:space-x-12">
            {/* Logo */}
            <Link href="/">
              <Image
                src={scrolled ? '/logo-dark.png' : '/logo.png'}
                alt="99 Visual Solutions"
                width={120}
                height={40}
                priority
              />
            </Link>

            {/* ── Desktop Nav ──────────────────────────────────────────────── */}
            <nav className={clsx(
              'hidden md:flex items-center gap-6 lg:gap-8 font-medium transition-colors duration-300',
              scrolled ? 'text-gray-800' : 'text-white'
            )}>
              <Link href="/"      className={navLinkClass('/')}>Home</Link>
              <Link href="/about" className={navLinkClass('/about')}>About</Link>

              {/* ── Services dropdown ─────────────────────────────────────── */}
              <div
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
                <button
                  type="button"
                  className={clsx(
                    'relative text-[15px] font-medium cursor-default select-none',
                    'flex items-center gap-1',
                    'transition-transform duration-200 hover:scale-105 hover:text-orange-500',
                    'after:content-[""] after:absolute after:left-0 after:-bottom-1',
                    'after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300',
                    isServiceActive || servicesOpen
                      ? 'text-orange-500 after:w-full'
                      : 'after:w-0 hover:after:w-full'
                  )}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                >
                  Services
                  <ChevronDown className={clsx(
                    'w-3.5 h-3.5 mt-0.5 transition-transform duration-200',
                    servicesOpen ? 'rotate-180' : ''
                  )} />
                </button>

                {/* invisible gap-bridge */}
                {servicesOpen && (
                  <div className="absolute left-0 top-full h-3 w-full" aria-hidden="true" />
                )}

                {/* ── PREMIUM 3-D DROPDOWN PANEL ──────────────────────────── */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -14, rotateX: -12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0,   rotateX: 0,   scale: 1    }}
                      exit={{    opacity: 0, y: -10, rotateX: -8,  scale: 0.97 }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      style={{ transformOrigin: 'top center', perspective: '800px' }}
                      className={clsx(
                        'absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50',
                        'w-[520px]',
                        /* glass base */
                        'bg-[#0d1117]/90 backdrop-blur-2xl',
                        'border border-white/[0.08]',
                        'rounded-2xl overflow-hidden',
                        /* outer glow */
                        'shadow-[0_32px_80px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]',
                      )}
                      onMouseEnter={openServices}
                      onMouseLeave={closeServices}
                    >
                      {/* ── top accent bar ───────────────────────────────── */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80" />

                      {/* ── header strip ─────────────────────────────────── */}
                      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/30">
                          What we do
                        </p>
                        <span className="text-[10px] text-white/20 tracking-wide">
                          {SERVICE_ITEMS.length} services
                        </span>
                      </div>

                      {/* ── 2-column grid of service cards ───────────────── */}
                      <div className="px-3 pb-3 grid grid-cols-2 gap-2">
                        {SERVICE_ITEMS.map((svc, idx) => {
                          const active  = pathname === svc.href;
                          const hovered = hoveredIdx === idx;
                          return (
                            <Link
                              key={svc.href}
                              href={svc.href}
                              onClick={() => setServicesOpen(false)}
                              onMouseEnter={() => setHoveredIdx(idx)}
                              onMouseLeave={() => setHoveredIdx(null)}
                              className={clsx(
                                'group relative flex items-center gap-3 rounded-xl px-3 py-3',
                                'transition-all duration-200 ease-out',
                                'border border-transparent',
                                active
                                  ? 'bg-white/[0.08] border-white/10'
                                  : 'hover:bg-white/[0.06] hover:border-white/[0.08]',
                              )}
                              style={{
                                /* per-card glow on hover */
                                boxShadow: hovered
                                  ? `inset 0 0 0 1px ${svc.glow}30, 0 4px 20px ${svc.glow}18`
                                  : 'none',
                              }}
                            >
                              {/* icon badge */}
                              <div
                                className={clsx(
                                  'relative flex-shrink-0 w-9 h-9 rounded-lg',
                                  'flex items-center justify-center',
                                  `bg-gradient-to-br ${svc.accent}`,
                                  `shadow-lg ${svc.shadow}`,
                                  'transition-transform duration-200',
                                  'group-hover:scale-110 group-hover:rotate-3',
                                )}
                                style={{
                                  /* 3-D raised look */
                                  boxShadow: hovered
                                    ? `0 6px 20px ${svc.glow}55, inset 0 1px 0 rgba(255,255,255,0.3)`
                                    : `0 3px 10px ${svc.glow}33, inset 0 1px 0 rgba(255,255,255,0.25)`,
                                }}
                              >
                                {/* inner specular shine */}
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                                <svc.Icon className="w-4 h-4 text-white z-10" strokeWidth={1.8} />
                              </div>

                              {/* text */}
                              <div className="min-w-0 flex-1">
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

                              {/* active dot */}
                              {active && (
                                <span
                                  className={clsx(
                                    'flex-shrink-0 w-1.5 h-1.5 rounded-full',
                                    `bg-gradient-to-br ${svc.accent}`,
                                  )}
                                />
                              )}

                              {/* arrow — slides in on hover */}
                              <svg
                                className="flex-shrink-0 w-3.5 h-3.5 text-white/0 group-hover:text-white/40 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          );
                        })}
                      </div>

                      {/* ── footer CTA ───────────────────────────────────── */}
                      <div className="mx-3 mb-3 mt-1">
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className={clsx(
                            'flex items-center justify-center gap-2 w-full py-2.5 rounded-xl',
                            'bg-gradient-to-r from-orange-600 to-amber-500',
                            'text-white text-[12px] font-bold tracking-wide uppercase',
                            'shadow-[0_4px_20px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]',
                            'hover:shadow-[0_6px_28px_rgba(249,115,22,0.55),inset_0_1px_0_rgba(255,255,255,0.2)]',
                            'hover:brightness-110 active:scale-[0.99]',
                            'transition-all duration-200',
                          )}
                        >
                          View All Services
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>

                      {/* ── bottom inner shadow ───────────────────────────── */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b-2xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/partner"  className={navLinkClass('/partner')}>Partner</Link>
              <Link href="/careers"  className={navLinkClass('/careers')}>Career</Link>
              <Link href="/contact"  className={navLinkClass('/contact')}>Contact</Link>
            </nav>
          </div>

          {/* ── Desktop Social Icons ─────────────────────────────────────── */}
          <div className={clsx(
            'hidden md:flex items-center space-x-4',
            scrolled ? 'text-gray-700' : 'text-white'
          )}>
            <a href="https://www.facebook.com/profile.php?id=100093639888151" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-orange-500 transition-transform hover:scale-110"><FaFacebookF /></a>
            <a href="https://x.com/99VisualSoluti1"                           target="_blank" rel="noopener noreferrer" aria-label="Twitter"  className="hover:text-orange-500 transition-transform hover:scale-110"><FaXTwitter /></a>
            <a href="https://www.linkedin.com/company/99-visual-solutions/"   target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-orange-500 transition-transform hover:scale-110"><FaLinkedinIn /></a>
            <a href="https://www.instagram.com/99visualsolutions/"            target="_blank" rel="noopener noreferrer" aria-label="Instagram"className="hover:text-orange-500 transition-transform hover:scale-110"><FaInstagram /></a>
          </div>

          {/* ── Mobile toggle ────────────────────────────────────────────── */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen
                ? <X    className="text-orange-500 w-7 h-7" />
                : <Menu className="text-orange-500 w-7 h-7" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU (PORTAL) ─────────────────────────────────────────────── */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[9999] bg-[#0f1c2e] text-white flex flex-col shadow-2xl"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <Image src="/logo.png" alt="99 Visual Solutions" width={110} height={36} priority />
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-orange-500 hover:text-orange-500 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
                  {[
                    { href: '/',      label: 'Home'  },
                    { href: '/about', label: 'About' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={clsx(
                          'block py-3 px-4 rounded-lg text-[15px] font-medium tracking-wide transition-all duration-200',
                          'hover:bg-white/5 hover:text-orange-400 hover:pl-6',
                          pathname === item.href
                            ? 'text-orange-400 bg-white/5 border-l-2 border-orange-500 pl-6'
                            : 'text-gray-300'
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Services accordion */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={clsx(
                        'w-full flex items-center justify-between py-3 px-4 rounded-lg',
                        'text-[15px] font-medium tracking-wide transition-all duration-200',
                        'hover:bg-white/5 hover:text-orange-400',
                        isServiceActive
                          ? 'text-orange-400 bg-white/5 border-l-2 border-orange-500 pl-6'
                          : 'text-gray-300'
                      )}
                    >
                      Services
                      <ChevronDown className={clsx(
                        'w-4 h-4 transition-transform duration-300',
                        mobileServicesOpen ? 'rotate-180 text-orange-400' : 'text-gray-500'
                      )} />
                    </button>

                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-2 border-l border-white/10 pl-3 space-y-1.5 pb-2">
                            {SERVICE_ITEMS.map((svc) => (
                              <Link
                                key={svc.href}
                                href={svc.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={clsx(
                                  'flex items-center gap-2.5 py-2 px-3 rounded-lg text-[13px] tracking-wide',
                                  'transition-all duration-200 hover:text-orange-400 hover:bg-white/5',
                                  pathname === svc.href ? 'text-orange-400' : 'text-gray-400'
                                )}
                              >
                                {/* coloured dot */}
                                <span
                                  className={clsx(
                                    'flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center',
                                    `bg-gradient-to-br ${svc.accent}`,
                                  )}
                                >
                                  <svc.Icon className="w-3 h-3 text-white" strokeWidth={2} />
                                </span>
                                {svc.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {[
                    { href: '/partner', label: 'Partner' },
                    { href: '/careers', label: 'Career'  },
                    { href: '/contact', label: 'Contact' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={clsx(
                          'block py-3 px-4 rounded-lg text-[15px] font-medium tracking-wide transition-all duration-200',
                          'hover:bg-white/5 hover:text-orange-400 hover:pl-6',
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

                {/* Social icons footer */}
                <div className="px-6 py-5 border-t border-white/10">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    {[
                      { href: 'https://www.facebook.com/profile.php?id=100093639888151', icon: <FaFacebookF />,  label: 'Facebook'  },
                      { href: 'https://x.com/99VisualSoluti1',                           icon: <FaXTwitter />,   label: 'Twitter'   },
                      { href: 'https://www.linkedin.com/company/99-visual-solutions/',   icon: <FaLinkedinIn />, label: 'LinkedIn'  },
                      { href: 'https://www.instagram.com/99visualsolutions/',            icon: <FaInstagram />,  label: 'Instagram' },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-all duration-200 text-sm"
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