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

  // Activate mounted flag for portal (avoid SSR issues)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll to adjust header style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  // Helper to check active route
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

  // CSS classes for nav links
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
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU (PORTAL) */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-gradient-to-b from-black via-black to-gray-900 text-white px-6 overflow-y-auto"
            >
              {/* Close button */}
              <div className="flex justify-end py-6">
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-7 h-7 text-orange-500"/>
                </button>
              </div>
              {/* Menu items */}
              <div className="flex flex-col items-center justify-start pt-10 pb-12 space-y-8 text-center">
                <Link
  href="/"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "text-3xl font-semibold transition-colors",
    pathname === "/" ? "text-orange-500" : "text-white"
  )}
>
  Home
</Link>
                <Link
  href="/about"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "text-3xl font-semibold transition-colors",
    pathname === "/about"
      ? "text-orange-500"
      : "text-white"
  )}
>
  About
</Link>
                
                {/* Mobile Services */}
                <div className="flex flex-col items-center">
                  <button
  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
  className={clsx(
    "flex items-center gap-2 text-2xl transition-colors",
    isServiceActive ? "text-orange-500" : "text-white"
  )}
>
                    Services
                    <ChevronDown className={clsx(mobileServicesOpen && 'rotate-180 transition-transform')} />
                  </button>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center mt-4 space-y-3 text-lg text-gray-300"
                    >
                      <Link
  href="/services/visualization"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "transition-colors",
    pathname === "/services/visualization" ? "text-orange-500" : "text-gray-300"
  )}
>
  Visualization
</Link>
                      <Link
  href="/services/website-development"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "transition-colors",
    pathname === "/services/website-development"
      ? "text-orange-500"
      : "text-gray-300"
  )}
>
  Website Development
</Link>
                      <Link
  href="/services/it-consulting"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "transition-colors",
    pathname === "/services/it-consulting"
      ? "text-orange-500"
      : "text-gray-300"
  )}
>
  IT Consulting
</Link>
                      <Link
  href="/services/digital-marketing-seo"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "transition-colors",
    pathname === "/services/digital-marketing-seo"
      ? "text-orange-500"
      : "text-gray-300"
  )}
>
  Digital Marketing & SEO
</Link>
                      <Link
  href="/services/cad-gis-photogrammetry"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "transition-colors",
    pathname === "/services/cad-gis-photogrammetry"
      ? "text-orange-500"
      : "text-gray-300"
  )}
>
  CAD, GIS & Photogrammetry
</Link>
                      <Link
  href="/services/automation-testing"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "transition-colors",
    pathname === "/services/automation-testing"
      ? "text-orange-500"
      : "text-gray-300"
  )}
>
  Automation & Testing
</Link>
                    </motion.div>
                  )}
                </div>

                <Link
  href="/partner"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "text-3xl font-semibold transition-colors",
    pathname === "/partner"
      ? "text-orange-500"
      : "text-white"
  )}
>
  Partner
</Link>
                <Link
  href="/careers"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "text-3xl font-semibold transition-colors",
    pathname === "/careers"
      ? "text-orange-500"
      : "text-white"
  )}
>
  Career
</Link>
                <Link
  href="/contact"
  onClick={() => setMobileMenuOpen(false)}
  className={clsx(
    "text-3xl font-semibold transition-colors",
    pathname === "/contact"
      ? "text-orange-500"
      : "text-white"
  )}
>
  Contact
</Link>

                {/* Social Icons */}
                <div className="flex gap-6 mt-6 text-xl">
                  <a href="https://www.facebook.com/profile.php?id=100093639888151" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-orange-500"><FaFacebookF /></a>
                  <a href="https://x.com/99VisualSoluti1" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-orange-500"><FaXTwitter /></a>
                  <a href="https://www.linkedin.com/company/99-visual-solutions/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-orange-500"><FaLinkedinIn /></a>
                  <a href="https://www.instagram.com/99visualsolutions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-500"><FaInstagram /></a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Header;
