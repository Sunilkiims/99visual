'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
  }, [mobileMenuOpen]);

  const navLinkClass = (href: string) =>
    clsx(
      'relative text-[15px] transition-transform duration-200 hover:scale-105 hover:text-orange-500',
      'after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:w-0 hover:after:w-full after:transition-all after:duration-300',
      isActive(href) && 'text-orange-500 after:w-full'
    );

  const dropdownLinkClass = (href: string) =>
    clsx(
      'group/link flex items-center gap-2 px-4 py-2 text-gray-800 transition-all duration-300 hover:bg-yellow-100',
      'hover:pl-6'
    );

  const ArrowIcon = () => (
    <span className="w-4 h-4 text-orange-500 transform transition-transform duration-300 group-hover/link:translate-x-1">
      <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
        <path d="M10 2l-1.41 1.41L15.17 10l-6.58 6.59L10 18l8-8z" />
      </svg>
    </span>
  );

  return (
    <>
      {/* HEADER (UNCHANGED) */}
      <header className={clsx(
        'fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md',
        scrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-20">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={scrolled ? '/logo-dark.png' : '/logo.png'}
                alt="Logo"
                width={120}
                height={40}
                priority
              />
            </Link>

            {/* Desktop Nav (UNCHANGED) */}
            <nav className={clsx(
              'hidden md:flex space-x-6 font-medium transition-colors duration-300',
              scrolled ? 'text-gray-800' : 'text-white'
            )}>
              <Link href="/" className={navLinkClass('/')}>Home</Link>
              <Link href="/about" className={navLinkClass('/about')}>About</Link>

              <div className="relative group">
                <span className={clsx(
                  navLinkClass(''),
                  [
                    '/services/visualization',
                    '/services/website-development',
                    '/services/it-consulting',
                    '/services/digital-marketing-seo',
                    '/services/cad-gis-photogrammetry',
                    '/services/automation-testing',
                  ].includes(pathname) && 'text-orange-500 after:w-full'
                )}>
                  Services
                </span>

                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow rounded overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out transform scale-y-90 group-hover:max-h-[600px] group-hover:opacity-100 group-hover:scale-y-100 z-40">
                  <Link href="/services/visualization" className={dropdownLinkClass('/services/visualization')}>
                    <ArrowIcon /> Visualization
                  </Link>
                  <Link href="/services/website-development" className={dropdownLinkClass('/services/website-development')}>
                    <ArrowIcon /> Website Development
                  </Link>
                  <Link href="/services/it-consulting" className={dropdownLinkClass('/services/it-consulting')}>
                    <ArrowIcon /> IT Consulting
                  </Link>
                  <Link href="/services/digital-marketing-seo" className={dropdownLinkClass('/services/digital-marketing-seo')}>
                    <ArrowIcon /> Digital Marketing & SEO
                  </Link>
                  <Link href="/services/cad-gis-photogrammetry" className={dropdownLinkClass('/services/cad-gis-photogrammetry')}>
                    <ArrowIcon /> CAD, GIS & Photogrammetry
                  </Link>
                  <Link href="/services/automation-testing" className={dropdownLinkClass('/services/automation-testing')}>
                    <ArrowIcon /> Automation & Testing
                  </Link>
                </div>
              </div>

              <Link href="/partner" className={navLinkClass('/partner')}>Partner</Link>
              <Link href="/careers" className={navLinkClass('/career')}>Career</Link>
              <Link href="/contact" className={navLinkClass('/contact')}>Contact</Link>
            </nav>
          </div>

          {/* Desktop Social */}
          <div className={clsx(
            'hidden md:flex items-center space-x-4',
            scrolled ? 'text-gray-700' : 'text-white'
          )}>
           <div className="hidden md:flex items-center space-x-4">
  <a
    href="https://www.facebook.com/profile.php?id=100093639888151"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="hover:text-orange-500 transition transform hover:scale-110"
  >
    <FaFacebookF />
  </a>

  <a
    href="https://x.com/99VisualSoluti1"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter"
    className="hover:text-orange-500 transition transform hover:scale-110"
  >
    <FaTwitter />
  </a>

  <a
    href="https://www.linkedin.com/company/99-visual-solutions/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="hover:text-orange-500 transition transform hover:scale-110"
  >
    <FaLinkedinIn />
  </a>
</div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* 🔥 ULTRA PREMIUM MOBILE MENU */}
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-gradient-to-b from-black via-black to-gray-900 text-white px-6"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,115,0,0.15),transparent)] pointer-events-none" />

                {/* Close */}
                <div className="flex justify-end py-6 relative z-10">
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-7 h-7" />
                  </button>
                </div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                  className="relative z-10 flex flex-col items-center justify-center h-[80vh] space-y-8 text-center"
                >
                  
                  {/* MAIN MENU */}
                  {[
                    { name: 'Home', link: '/' },
                    { name: 'About', link: '/about' },
                  ].map((item) => (
                    <motion.div key={item.link} variants={{ hidden:{opacity:0,y:30}, visible:{opacity:1,y:0} }}>
                      <Link
                        href={item.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className={clsx(
                          "text-3xl font-semibold tracking-wide transition",
                          isActive(item.link) && "text-orange-500"
                        )}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* SERVICES */}
                  <motion.div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center gap-2 text-2xl"
                    >
                      Services
                      <ChevronDown className={clsx("transition-transform", mobileServicesOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center mt-4 space-y-3 text-lg text-gray-300"
                        >
                          <Link href="/services/visualization" onClick={()=>setMobileMenuOpen(false)}>Visualization</Link>
                          <Link href="/services/website-development" onClick={()=>setMobileMenuOpen(false)}>Website Development</Link>
                          <Link href="/services/it-consulting" onClick={()=>setMobileMenuOpen(false)}>IT Consulting</Link>
                          <Link href="/services/digital-marketing-seo" onClick={()=>setMobileMenuOpen(false)}>Digital Marketing & SEO</Link>
                          <Link href="/services/cad-gis-photogrammetry" onClick={()=>setMobileMenuOpen(false)}>CAD, GIS & Photogrammetry</Link>
                          <Link href="/services/automation-testing" onClick={()=>setMobileMenuOpen(false)}>Automation & Testing</Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* OTHER MENU */}
                  {[
                    { name: 'Partner', link: '/partner' },
                    { name: 'Career', link: '/careers' },
                    { name: 'Contact', link: '/contact' },
                  ].map((item) => (
                    <motion.div key={item.link} variants={{ hidden:{opacity:0,y:30}, visible:{opacity:1,y:0} }}>
                      <Link
                        href={item.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-3xl font-semibold tracking-wide"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Social */}
                 <motion.div className="flex gap-6 mt-6 text-xl">
  <a
    href="https://www.facebook.com/profile.php?id=100093639888151"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="hover:text-orange-500 transition transform hover:scale-110"
  >
    <FaFacebookF />
  </a>

  <a
    href="https://x.com/99VisualSoluti1"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter"
    className="hover:text-orange-500 transition transform hover:scale-110"
  >
    <FaTwitter />
  </a>

  <a
    href="https://www.linkedin.com/company/99-visual-solutions/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="hover:text-orange-500 transition transform hover:scale-110"
  >
    <FaLinkedinIn />
  </a>
</motion.div>

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Header;