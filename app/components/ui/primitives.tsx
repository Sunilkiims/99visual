// Server-safe design-system primitives for the redesigned pages.
import Link from 'next/link';
import type { ReactNode, ElementType } from 'react';
import { ArrowRight } from 'lucide-react';

type Children = { children?: ReactNode; className?: string };

export function Container({ children, className = '', narrow = false }: Children & { narrow?: boolean }) {
  return <div className={`vz-container${narrow ? ' vz-container--narrow' : ''} ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = '',
  id,
  surface = false,
  tight = false,
  labelledBy,
  as: Tag = 'section',
}: Children & { id?: string; surface?: boolean; tight?: boolean; labelledBy?: string; as?: ElementType }) {
  const cls = ['vz-section', surface && 'vz-section--surface', tight && 'vz-section--tight', className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag id={id} className={cls} aria-labelledby={labelledBy}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className = '' }: Children) {
  return <p className={`vz-eyebrow ${className}`}>{children}</p>;
}

/**
 * Eyebrow + heading + lead. `level` sets the heading element (h2 by default)
 * so pages keep a correct outline; `id` is used for aria-labelledby.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  level = 2,
  align = 'left',
  className = '',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  level?: 1 | 2 | 3;
  align?: 'left' | 'center';
  className?: string;
}) {
  const H = `h${level}` as 'h1' | 'h2' | 'h3';
  const size = level === 1 ? 'vz-h1' : level === 2 ? 'vz-h2' : 'vz-h3';
  return (
    <div className={`vz-heading${align === 'center' ? ' vz-heading--center' : ''} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H id={id} className={size}>
        {title}
      </H>
      {lead && <p className="vz-lead">{lead}</p>}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = 'primary',
  size,
  arrow = false,
  className = '',
  ariaLabel,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'light';
  size?: 'sm';
  arrow?: boolean;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}) {
  const cls = ['vz-btn', variant !== 'light' && `vz-btn--${variant}`, size && `vz-btn--${size}`, className]
    .filter(Boolean)
    .join(' ');
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight size={16} aria-hidden="true" />}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}

export function ArrowLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`vz-link-arrow ${className}`}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}
