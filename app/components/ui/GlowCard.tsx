'use client';

// Card with a pointer-following spotlight (CSS variables only; no re-renders).
import { useRef, type ReactNode, type PointerEvent } from 'react';

export default function GlowCard({
  children,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      onPointerMove={onMove}
      className={`vz-card vz-glow ${className}`}
    >
      {children}
    </Tag>
  );
}
