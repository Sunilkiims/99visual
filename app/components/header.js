'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md',
        scrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={scrolled ? '/logo-dark.png' : '/logo.png'}
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav
          className={clsx(
            'hidden md:flex space-x-6 text-sm font-medium transition-colors duration-300 justify-center col-span-1',
            scrolled ? 'text-gray-800' : 'text-white'
          )}
        >
          <Link
            href="/"
            className={clsx(
              'relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:w-0 after:transition-all after:duration-300 hover:after:w-full hover:text-orange-500 transition-colors duration-200',
              isActive('/') && 'text-orange-500 after:w-full'
            )}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={clsx(
              'relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:w-0 after:transition-all after:duration-300 hover:after:w-full hover:text-orange-500 transition-colors duration-200',
              isActive('/about') && 'text-orange-500 after:w-full'
            )}
          >
            About
          </Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <span
              className={clsx(
                'relative cursor-pointer transition-colors duration-200',
                'after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:w-0 after:transition-all after:duration-300',
                'hover:after:w-full hover:text-orange-500',
                [
                  '/services/visualization',
                  '/services/website-development',
                  '/services/it-consulting',
                  '/services/digital-marketing-seo',
                  '/services/cad-gis-photogrammetry',
                  '/services/testing-development',
                ].includes(pathname) && 'text-orange-500 after:w-full'
              )}
            >
              Services
            </span>
            <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-1 bg-white shadow rounded mt-2 w-56 z-40">
              <Link href="/services/visualization" className="px-4 py-2 hover:bg-yellow-100 block text-gray-800">
                Visualization
              </Link>
              <Link href="/services/website-development" className="px-4 py-2 hover:bg-yellow-100 block text-gray-800">
                Website Development
              </Link>
              <Link href="/services/it-consulting" className="px-4 py-2 hover:bg-yellow-100 block text-gray-800">
                IT Consulting
              </Link>
              <Link href="/services/digital-marketing-seo" className="px-4 py-2 hover:bg-yellow-100 block text-gray-800">
                Digital Marketing & SEO
              </Link>
              <Link href="/services/cad-gis-photogrammetry" className="px-4 py-2 hover:bg-yellow-100 block text-gray-800">
                CAD, GIS & Photogrammetry
              </Link>
              <Link href="/services/testing-development" className="px-4 py-2 hover:bg-yellow-100 block text-gray-800">
                Testing & Development
              </Link>
            </div>
          </div>

          <Link href="/partner" className={clsx(
            'relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:w-0 after:transition-all after:duration-300 hover:after:w-full hover:text-orange-500 transition-colors duration-200',
            isActive('/partner') && 'text-orange-500 after:w-full'
          )}>
            Partner
          </Link>

          <Link href="/career" className={clsx(
            'relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:w-0 after:transition-all after:duration-300 hover:after:w-full hover:text-orange-500 transition-colors duration-200',
            isActive('/career') && 'text-orange-500 after:w-full'
          )}>
            Career
          </Link>

          <Link
            href="/contact"
            className={clsx(
              'relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:w-0 after:transition-all after:duration-300 hover:after:w-full hover:text-orange-500 transition-colors duration-200',
              isActive('/contact') && 'text-orange-500 after:w-full'
            )}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-800"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'md:hidden overflow-hidden transition-all duration-300',
          mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="bg-white/90 backdrop-blur-md px-4 py-4 space-y-2 text-gray-800">
          <Link href="/" className={clsx('block', isActive('/') && 'text-orange-500')}>Home</Link>
          <Link href="/about" className={clsx('block', isActive('/about') && 'text-orange-500')}>About</Link>
          <Link href="/services/visualization" className={clsx('block', isActive('/services/visualization') && 'text-orange-500')}>Visualization</Link>
          <Link href="/services/website-development" className={clsx('block', isActive('/services/website-development') && 'text-orange-500')}>Website Development</Link>
          <Link href="/services/it-consulting" className={clsx('block', isActive('/services/it-consulting') && 'text-orange-500')}>IT Consulting</Link>
          <Link href="/services/digital-marketing-seo" className={clsx('block', isActive('/services/digital-marketing-seo') && 'text-orange-500')}>Digital Marketing & SEO</Link>
          <Link href="/services/cad-gis-photogrammetry" className={clsx('block', isActive('/services/cad-gis-photogrammetry') && 'text-orange-500')}>CAD, GIS & Photogrammetry</Link>
          <Link href="/services/testing-development" className={clsx('block', isActive('/services/testing-development') && 'text-orange-500')}>Testing & Development</Link>
          <Link href="/partner" className={clsx('block', isActive('/partner') && 'text-orange-500')}>Partner</Link>
          <Link href="/career" className={clsx('block', isActive('/career') && 'text-orange-500')}>Career</Link>
          <Link href="/contact" className={clsx('block', isActive('/contact') && 'text-orange-500')}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
