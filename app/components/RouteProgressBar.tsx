'use client';

// app/components/RouteProgressBar.tsx
//
// Slim top-of-viewport "trickle" loading bar for App Router navigations —
// the same idea as GitHub/YouTube's nav-loading bar. Hand-rolled with React
// state + a CSS width/opacity transition rather than pulling in a new
// dependency (e.g. nprogress, nextjs-toploader): this project already has
// everything it needs (framer-motion, already a dependency, only for the
// prefers-reduced-motion check).
//
// Styled to match the scroll-progress bar that already lives inside
// app/components/header.tsx (2px height, orange-to-amber gradient,
// role="progressbar") so this reads as the same design-system element
// extended to route changes, not a new visual language.
//
// Mounted once in app/layout.tsx as a sibling of {children} — deliberately
// NOT inside app/template.tsx/PageTransition.tsx. layout.tsx is not
// remounted between navigations (only template.tsx/page.tsx are), so this
// component's start/finish state survives the whole visit; and being a
// plain sibling rather than a transformed ancestor, it can never affect
// position:fixed elements elsewhere on the page (see PageTransition.tsx for
// why that distinction matters on this site).
//
// How it detects navigation:
//   "start"  — a click listener on the document watches for clicks on
//              same-origin, same-tab <a> links that point somewhere other
//              than the current path (ignoring modifier-key/middle clicks,
//              new-tab/download links, hash links, mailto:/tel:, and
//              external URLs) and begins trickling the bar toward ~90%.
//   "finish" — usePathname() changing means the new route has committed;
//              the bar jumps to 100% and fades out.
// Back/forward navigation is covered by the same "finish" effect even
// without a preceding click — those typically resolve fast enough from
// Next's client-side route cache that any visible flash is brief, matching
// how this style of bar behaves on other sites for cached navigations.

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';

function isInternalNavigableAnchor(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute('href');
  if (!href) return false;
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  if (anchor.target && anchor.target !== '_self') return false;
  if (anchor.hasAttribute('download')) return false;

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return false;
  }
  if (url.origin !== window.location.origin) return false;
  if (url.pathname === window.location.pathname) return false;

  return true;
}

export default function RouteProgressBar() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const trickleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    return () => {
      if (trickleTimer.current) clearInterval(trickleTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest('a');
      if (!anchor || !isInternalNavigableAnchor(anchor)) return;

      // Start: reset any in-flight timers, show the bar, begin trickling.
      if (trickleTimer.current) clearInterval(trickleTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setVisible(true);
      setProgress(8);
      trickleTimer.current = setInterval(() => {
        setProgress((p) => (p >= 90 ? p : p + Math.max(1, (90 - p) / 10)));
      }, 200);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [shouldReduceMotion]);

  useEffect(() => {
    // Skip on first mount — there's no in-flight navigation to "finish".
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (shouldReduceMotion) return;

    // Finish: the pathname changing means the new route has committed.
    // setProgress is deferred a microtask so this effect only ever
    // *schedules* the update rather than applying it synchronously inline
    // (satisfies react-hooks/set-state-in-effect without changing timing
    // in any perceptible way — it still runs before the next paint).
    if (trickleTimer.current) clearInterval(trickleTimer.current);
    queueMicrotask(() => setProgress(100));
    hideTimer.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 260);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (shouldReduceMotion || !visible) return null;

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 z-[90] pointer-events-none"
      style={{
        width: `${progress}%`,
        opacity: progress >= 100 ? 0 : 1,
        transition: 'width 0.25s ease-out, opacity 0.25s ease',
        boxShadow: '0 0 8px rgba(233,123,32,0.5)',
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading"
      aria-hidden={progress >= 100}
    />
  );
}
