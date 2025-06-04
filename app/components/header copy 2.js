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
        scrolled ? 'bg-white/70 shadow-md' : 'bg-transparent'
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
            'hidden md:flex space-x-6 text-sm font-medium transition-colors duration-300',
            scrolled ? 'text-gray-800' : 'text-white'
          )}
        >
          <Link
            href="/"
            className={clsx(
              'hover:text-orange-500 transition-colors duration-200',
              isActive('/') && 'text-orange-500'
            )}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={clsx(
              'hover:text-orange-500 transition-colors duration-200',
              isActive('/about') && 'text-orange-500'
            )}
          >
            About
          </Link>

          {/* Services with Hover Dropdown */}
          <div className="relative group">
            <span className="cursor-pointer hover:text-orange-500 transition-colors duration-200">
              Services
            </span>
            <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-1 bg-white shadow rounded mt-2 w-56 z-40">
              <Link
                href="/services/website-development"
                className={clsx(
                  'px-4 py-2 hover:bg-yellow-100 block text-gray-800',
                  isActive('/services/website-development') && 'bg-gray-100'
                )}
              >
                Website Development
              </Link>
              <Link
                href="/services/it-consulting"
                className={clsx(
                  'px-4 py-2 hover:bg-yellow-100 block text-gray-800',
                  isActive('/services/it-consulting') && 'bg-gray-100'
                )}
              >
                IT Consulting
              </Link>
              <Link
                href="/services/digital-marketing-seo"
                className={clsx(
                  'px-4 py-2 hover:bg-yellow-100 block text-gray-800',
                  isActive('/services/digital-marketing-seo') && 'bg-gray-100'
                )}
              >
                Digital Marketing & SEO
              </Link>
              <Link
                href="/services/cad-gis-photogrammetry"
                className={clsx(
                  'px-4 py-2 hover:bg-yellow-100 block text-gray-800',
                  isActive('/services/cad-gis-photogrammetry') && 'bg-gray-100'
                )}
              >
                CAD, GIS & Photogrammetry
              </Link>
              <Link
                href="/services/testing-development"
                className={clsx(
                  'px-4 py-2 hover:bg-yellow-100 block text-gray-800',
                  isActive('/services/testing-development') && 'bg-gray-100'
                )}
              >
                Testing & Development
              </Link>
            </div>
          </div>

          <Link
            href="/contact"
            className={clsx(
              'hover:text-orange-500 transition-colors duration-200',
              isActive('/contact') && 'text-orange-500'
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
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="bg-white/90 backdrop-blur-md px-4 py-4 space-y-2 text-gray-800">
          <Link href="/" className={clsx('block', isActive('/') && 'text-orange-500')}>
            Home
          </Link>
          <Link href="/about" className={clsx('block', isActive('/about') && 'text-orange-500')}>
            About
          </Link>
          <Link
            href="/services/website-development"
            className={clsx('block', isActive('/services/website-development') && 'text-orange-500')}
          >
            Website Development
          </Link>
          <Link
            href="/services/it-consulting"
            className={clsx('block', isActive('/services/it-consulting') && 'text-orange-500')}
          >
            IT Consulting
          </Link>
          <Link
            href="/services/digital-marketing-seo"
            className={clsx('block', isActive('/services/digital-marketing-seo') && 'text-orange-500')}
          >
            Digital Marketing & SEO
          </Link>
          <Link
            href="/services/cad-gis-photogrammetry"
            className={clsx('block', isActive('/services/cad-gis-photogrammetry') && 'text-orange-500')}
          >
            CAD, GIS & Photogrammetry
          </Link>
          <Link
            href="/services/testing-development"
            className={clsx('block', isActive('/services/testing-development') && 'text-orange-500')}
          >
            Testing & Development
          </Link>
          <Link href="/contact" className={clsx('block', isActive('/contact') && 'text-orange-500')}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
