'use client';

// Full-screen black mobile navigation.
// Accessible dialog: role="dialog" + aria-modal, focus moves in on open and is
// trapped, Escape closes, focus returns to the menu button (via onClose),
// page scroll is locked while open. The same links are always present in the
// header's server-rendered nav, so crawlability doesn't depend on this menu.
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { SERVICES, PRIMARY_NAV, SOCIAL_LINKS } from '@/lib/site-nav';
import { CONTACT_EMAIL, PHONE } from '@/lib/schema';

export default function FullScreenMobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.06 + i * 0.04, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="vz-mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="vz-mmenu"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="vz-mmenu__top">
            <span className="vz-mmenu__brand">99 Visual Solutions</span>
            <button type="button" className="vz-mmenu__close" onClick={onClose} aria-label="Close menu" data-autofocus>
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="vz-mmenu__body">
            <ul className="vz-mmenu__primary">
              {[{ href: '/', label: 'Home' }, ...PRIMARY_NAV, { href: '/contact', label: 'Contact' }].map((l, i) => (
                <motion.li key={l.href} {...item(i)}>
                  <Link href={l.href} onClick={onClose} aria-current={pathname === l.href ? 'page' : undefined}>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div {...item(8)} className="vz-mmenu__group">
              <p className="vz-eyebrow">Services</p>
              <ul>
                {SERVICES.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} onClick={onClose} aria-current={pathname === s.href ? 'page' : undefined}>
                      {s.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" onClick={onClose}>All services</Link>
                </li>
              </ul>
            </motion.div>

            <motion.div {...item(10)} className="vz-mmenu__foot">
              <Link href="/contact" onClick={onClose} className="vz-btn vz-btn--primary">
                Start a project
              </Link>
              <a href={`mailto:${CONTACT_EMAIL}`} className="vz-mmenu__contact">{CONTACT_EMAIL}</a>
              <a href={`tel:${PHONE.replace(/-/g, '')}`} className="vz-mmenu__contact">{PHONE}</a>
              <ul className="vz-mmenu__social">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
