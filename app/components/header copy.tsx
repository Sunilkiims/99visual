'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => pathname === href;
  const serviceRoutes = [
    '/services/visualization',
    '/services/website-development',
    '/services/it-consulting',
    '/services/digital-marketing-seo',
    '/services/cad-gis-photogrammetry',
    '/services/automation-testing',
  ];
  const isServiceActive = serviceRoutes.includes(pathname);

  const navLinkClass = (href: string) =>
    clsx(
      'relative text-[15px] transition-transform duration-200 hover:scale-105 hover:text-orange-500',
      'after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:w-0 hover:after:w-full after:transition-all after:duration-300',
      isActive(href) && 'text-orange-500 after:w-full'
    );

  const dropdownLinkClass = () =>
    'group/link flex items-center gap-2 px-4 py-2 text-gray-800 transition-all duration-300 hover:bg-yellow-100 hover:pl-6';

  const ArrowIcon = () => (
    <span className="w-4 h-4 text-orange-500 transform transition-transform duration-300 group-hover/link:translate-x-1">
      <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
        <path d="M10 2l-1.41 1.41L15.17 10l-6.58 6.59L10 18l8-8z" />
      </svg>
    </span>
  );

  return (
    <>
      {/* HEADER */}
      <header className={clsx(
        'fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md',
        scrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-8 lg:space-x-12">
            <Link href="/">
              <Image
                src={scrolled ? '/logo-dark.png' : '/logo.png'}
                alt="Logo"
                width={120}
                height={40}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className={clsx(
              'hidden md:flex items-center gap-6 lg:gap-8 font-medium transition-colors duration-300',
              scrolled ? 'text-gray-800' : 'text-white'
            )}>
              <Link href="/" className={navLinkClass('/')}>Home</Link>
              <Link href="/about" className={navLinkClass('/about')}>About</Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <span className={clsx(
                  navLinkClass(''),
                  isServiceActive && 'text-orange-500 after:w-full'
                )}>
                  Services
                </span>
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow rounded overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out transform scale-y-90 group-hover:max-h-[600px] group-hover:opacity-100 group-hover:scale-y-100 z-40">
                  <Link href="/services/visualization" className={dropdownLinkClass()}>
                    <ArrowIcon /> Visualization
                  </Link>
                  <Link href="/services/website-development" className={dropdownLinkClass()}>
                    <ArrowIcon /> Website Development
                  </Link>
                  <Link href="/services/it-consulting" className={dropdownLinkClass()}>
                    <ArrowIcon /> IT Consulting
                  </Link>
                  <Link href="/services/digital-marketing-seo" className={dropdownLinkClass()}>
                    <ArrowIcon /> Digital Marketing & SEO
                  </Link>
                  <Link href="/services/cad-gis-photogrammetry" className={dropdownLinkClass()}>
                    <ArrowIcon /> CAD, GIS & Photogrammetry
                  </Link>
                  <Link href="/services/automation-testing" className={dropdownLinkClass()}>
                    <ArrowIcon /> Automation & Testing
                  </Link>
                </div>
              </div>

              <Link href="/partner" className={navLinkClass('/partner')}>Partner</Link>
              <Link href="/careers" className={navLinkClass('/careers')}>Career</Link>
              <Link href="/contact" className={navLinkClass('/contact')}>Contact</Link>
            </nav>
          </div>

          {/* Desktop Social Icons */}
          <div className={clsx(
            'hidden md:flex items-center space-x-4',
            scrolled ? 'text-gray-700' : 'text-white'
          )}>
            <a href="https://www.facebook.com/profile.php?id=100093639888151" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-orange-500 transition-transform hover:scale-110">
              <FaFacebookF />
            </a>
            <a href="https://x.com/99VisualSoluti1" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-orange-500 transition-transform hover:scale-110">
              <FaXTwitter />
            </a>
            <a href="https://www.linkedin.com/company/99-visual-solutions/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-orange-500 transition-transform hover:scale-110">
              <FaLinkedinIn />
            </a>
            <a href="https://www.instagram.com/99visualsolutions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-500 transition-transform hover:scale-110">
              <FaInstagram />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="text-orange-500 w-7 h-7" />
              ) : (
                <Menu className="text-orange-500 w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU (PORTAL) */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[9999] bg-[#0f1c2e] text-white flex flex-col shadow-2xl"
              >
                {/* Header bar */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={110}
                      height={36}
                      priority
                    />
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-orange-500 hover:text-orange-500 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
                  {/* Home & About */}
                  {[
                    { href: '/', label: 'Home' },
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
                        'w-full flex items-center justify-between py-3 px-4 rounded-lg text-[15px] font-medium tracking-wide transition-all duration-200',
                        'hover:bg-white/5 hover:text-orange-400',
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
                      />
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
                          <div className="ml-4 mt-1 border-l border-white/10 pl-4 space-y-1 pb-2">
                            {[
                              { href: '/services/visualization', label: 'Visualization' },
                              { href: '/services/website-development', label: 'Website Development' },
                              { href: '/services/it-consulting', label: 'IT Consulting' },
                              { href: '/services/digital-marketing-seo', label: 'Digital Marketing & SEO' },
                              { href: '/services/cad-gis-photogrammetry', label: 'CAD, GIS & Photogrammetry' },
                              { href: '/services/automation-testing', label: 'Automation & Testing' },
                            ].map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={clsx(
                                  'block py-2 px-3 rounded text-[13px] tracking-wide transition-all duration-200',
                                  'hover:text-orange-400 hover:bg-white/5',
                                  pathname === service.href
                                    ? 'text-orange-400'
                                    : 'text-gray-400'
                                )}
                              >
                                {service.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Partner, Career, Contact */}
                  {[
                    { href: '/partner', label: 'Partner' },
                    { href: '/careers', label: 'Career' },
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

                {/* Footer: Social icons */}
                <div className="px-6 py-5 border-t border-white/10">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
                    Follow Us
                  </p>
                  <div className="flex gap-3">
                    {[
                      { href: 'https://www.facebook.com/profile.php?id=100093639888151', icon: <FaFacebookF />, label: 'Facebook' },
                      { href: 'https://x.com/99VisualSoluti1', icon: <FaXTwitter />, label: 'Twitter' },
                      { href: 'https://www.linkedin.com/company/99-visual-solutions/', icon: <FaLinkedinIn />, label: 'LinkedIn' },
                      { href: 'https://www.instagram.com/99visualsolutions/', icon: <FaInstagram />, label: 'Instagram' },
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