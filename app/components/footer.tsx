'use client';

// app/components/footer.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Footer — 99 Visual Solutions
// Theme  : Crisp white + Orange (#F97316)
// Fonts  : Playfair Display (display) + Inter (body)
// Newsletter now requires OTP email verification before subscribing.
// ─────────────────────────────────────────────────────────────────────────────

import React, { FormEvent, useState, useEffect, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6';

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_COMPANY = [
  { label: 'About',       href: '/about'       },
  { label: 'Careers',     href: '/careers'     },
  { label: 'Partner',     href: '/partner'     },
  { label: 'Contact',     href: '/contact'     },
  { label: 'Insights',    href: '/insights'    },
  // ✅ FIX — /press and /help-center existed as real pages with their own
  // metadata but had no internal links pointing to them anywhere on the
  // site, making them orphan pages for crawlers and users alike.
  { label: 'Press',       href: '/press'       },
  { label: 'Help Center', href: '/help-center' },
];

const NAV_SERVICES = [
  { label: 'Web Development',         href: '/services/website-development'    },
  { label: 'Visualization',           href: '/services/visualization'          },
  { label: 'IT Consulting',           href: '/services/it-consulting'          },
  { label: 'Digital Marketing & SEO', href: '/services/digital-marketing-seo'  },
  { label: 'QA & Automation',         href: '/services/automation-testing'     },
  { label: 'CAD & GIS',               href: '/services/cad-gis-photogrammetry' },
];

const TICKER_ITEMS = [
  'Website & Web App Development',
  'Advanced Visualization',
  'IT Consulting',
  'Digital Marketing & SEO',
  'QA & Automation',
  'CAD & GIS',
  'Research & Development ',
];

const TICKER_DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS];

const SOCIALS = [
  { label: 'Facebook',    href: 'https://www.facebook.com/profile.php?id=100093639888151', Icon: FaFacebookF  },
  { label: 'X (Twitter)', href: 'https://x.com/99VisualSoluti1',                           Icon: FaXTwitter   },
  { label: 'Instagram',   href: 'https://www.instagram.com/99visualsolutions/',             Icon: FaInstagram  },
  { label: 'LinkedIn',    href: 'https://www.linkedin.com/company/99-visual-solutions/',    Icon: FaLinkedinIn },
];

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

type NlStep = 'email' | 'otp' | 'done';

// ── Component ─────────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  // Newsletter / OTP flow state
  const [step,      setStep]      = useState<NlStep>('email');
  const [email,     setEmail]     = useState('');
  const [otp,       setOtp]       = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [resendIn,  setResendIn]  = useState(0);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [visible,   setVisible]   = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Countdown for "resend code"
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  // Auto-reset back to the email step a few seconds after success
  useEffect(() => {
    if (step !== 'done') return;
    const t = setTimeout(() => {
      setStep('email');
      setEmail('');
      setOtp(Array(OTP_LENGTH).fill(''));
    }, 4000);
    return () => clearTimeout(t);
  }, [step]);

  // ── Step 1: request a code for this email ──────────────────────────────────
  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res    = await fetch('/api/subscribe/request-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      const result = await res.json();

      if (res.ok) {
        setStep('otp');
        setOtp(Array(OTP_LENGTH).fill(''));
        setResendIn(RESEND_SECONDS);
        setTimeout(() => otpRefs.current[0]?.focus(), 50);
      } else {
        setError(result.message || 'Could not send a verification code. Please try again.');
      }
    } catch {
      setError('Network error — please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: verify the code ─────────────────────────────────────────────────
  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) {
      setError(`Enter the ${OTP_LENGTH}-digit code.`);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res    = await fetch('/api/subscribe/verify-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, otp: code }),
      });
      const result = await res.json();

      if (res.ok) {
        setStep('done');
      } else {
        setError(result.message || 'That code is incorrect or has expired.');
      }
    } catch {
      setError('Network error — please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendIn > 0 || loading) return;
    setError('');
    setLoading(true);
    try {
      const res    = await fetch('/api/subscribe/request-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      const result = await res.json();
      if (res.ok) {
        setResendIn(RESEND_SECONDS);
        setOtp(Array(OTP_LENGTH).fill(''));
        otpRefs.current[0]?.focus();
      } else {
        setError(result.message || 'Could not resend the code.');
      }
    } catch {
      setError('Network error — please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    setStep('email');
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
  };

  // ── OTP box handlers ─────────────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((d, i) => { next[i] = d; });
    setOtp(next);
    const lastIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
    otpRefs.current[lastIndex]?.focus();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');

        /* ── Tokens ──────────────────────────────────────────────────── */
        .ft {
          --indigo:        #4F46E5;
          --indigo-mid:    #6366F1;
          --indigo-light:  #EEF2FF;
          --indigo-border: rgba(79,70,229,0.20);
          --bg:            #FFFFFF;
          --surface:       #F8F8FB;
          --border:        #E8E8F0;
          --border-strong: #D4D4E8;
          --text-primary:  #111118;
          --text-secondary:#6B6B80;
          --text-muted:    #A0A0B8;
          --serif:         'Playfair Display', serif;
          --sans:          'Inter', sans-serif;
        }

        /* ── Shell ───────────────────────────────────────────────────── */
        .ft {
          background: var(--bg);
          border-top: 1px solid var(--border);
          font-family: var(--sans);
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        /* Ambient indigo glow */
        .ft__surface {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 600px 300px at 80% 0%,  rgba(99,102,241,.04) 0%, transparent 70%),
            radial-gradient(ellipse 400px 200px at 10% 100%, rgba(79,70,229,.03) 0%, transparent 60%);
        }

        /* Top indigo accent line */
        .ft__topline {
          height: 2px;
          background: linear-gradient(90deg, var(--indigo), var(--indigo-mid) 60%, var(--indigo));
          position: relative; z-index: 1;
        }

        /* ── Main body ───────────────────────────────────────────────── */
        .ft__body {
          width: 100%;
          padding: 2.5rem 1rem 0;
          position: relative; z-index: 1;
        }

        /* ── Card grid ───────────────────────────────────────────────── */
        .ft__grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1.3fr 1.15fr;
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          background: var(--bg);
          box-shadow: 0 1px 4px rgba(79,70,229,.06), 0 8px 32px rgba(79,70,229,.04);
        }

        @media (max-width: 1024px) {
          .ft__grid { grid-template-columns: 1fr 1fr; }
          .ft__col:nth-child(3) { border-left: none !important; border-top: 1px solid var(--border); }
          .ft__col:nth-child(4) { border-top: 1px solid var(--border); }
        }
        @media (max-width: 560px) {
          .ft__grid { grid-template-columns: 1fr; }
          .ft__col + .ft__col { border-left: none !important; border-top: 1px solid var(--border); }
          .ft__bottom { flex-direction: column; align-items: flex-start; }
        }

        .ft__col {
          padding: 1.8rem 1.4rem;
          position: relative;
          background: var(--bg);
        }
        .ft__col + .ft__col { border-left: 1px solid var(--border); }

        /* Brand col */
        .ft__col--brand { background: var(--surface); }
        .ft__col--brand::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--indigo), var(--indigo-mid));
        }

        /* ── Entrance animation ──────────────────────────────────────── */
        .ft__col {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1);
        }
        .ft--visible .ft__col { opacity: 1; transform: translateY(0); }
        .ft__col:nth-child(1) { transition-delay: 0s;   }
        .ft__col:nth-child(2) { transition-delay: .08s; }
        .ft__col:nth-child(3) { transition-delay: .14s; }
        .ft__col:nth-child(4) { transition-delay: .20s; }

        /* ── Brand column ────────────────────────────────────────────── */
        .ft__logo-link {
          display: inline-block;
          margin-bottom: .5rem;
          line-height: 0;
          transition: opacity .2s ease;
        }
        .ft__logo-link:hover { opacity: .82; }

        .ft__logo-img {
          width: auto;
          height: 60px;
          object-fit: contain;
          object-position: left center;
          display: block;
        }

        .ft__tagline {
          font-family: var(--sans);
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .08em;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .ft__desc {
          font-family: var(--sans);
          font-size: .78rem; font-weight: 300; line-height: 1.8;
          color: var(--text-secondary); margin-bottom: 1.4rem;
        }

        /* Social icons */
        .ft__socials { display: flex; gap: .4rem; list-style: none; padding: 0; }
        .ft__social-btn {
          width: 30px; height: 30px;
          border: 1px solid var(--indigo-border); border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          color: var(--indigo); font-size: .75rem; text-decoration: none;
          background: var(--indigo-light);
          transition: background .2s, color .2s, transform .2s, box-shadow .2s;
        }
        .ft__social-btn:hover {
          background: var(--indigo); color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(79,70,229,.22);
        }

        /* ── Nav columns ─────────────────────────────────────────────── */
        .ft__nav-heading {
          font-family: var(--sans);
          font-size: 10px; font-weight: 600; letter-spacing: .24em;
          text-transform: uppercase; color: var(--indigo);
          margin-bottom: 1.1rem;
          display: flex; align-items: center; gap: 7px;
        }
        .ft__nav-heading::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, var(--indigo-border), transparent);
        }

        .ft__nav-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: .38rem; }
        .ft__nav-link {
          font-family: var(--sans);
          font-size: .78rem; font-weight: 400; color: var(--text-secondary);
          text-decoration: none; display: inline-flex; align-items: center; gap: 0;
          padding: .08rem 0; transition: color .2s, gap .2s;
        }
        .ft__nav-link::before {
          content: ''; display: inline-block; width: 0; height: 1.5px;
          background: var(--indigo); border-radius: 1px;
          transition: width .22s cubic-bezier(.22,1,.36,1); flex-shrink: 0;
        }
        .ft__nav-link:hover { color: var(--indigo); gap: 6px; }
        .ft__nav-link:hover::before { width: 9px; }

        /* ── Newsletter ───────────────────────────────────────────────── */
        .ft__nl-desc {
          font-family: var(--sans);
          font-size: .78rem; font-weight: 300; line-height: 1.75;
          color: var(--text-secondary); margin-bottom: 1rem;
        }
        .ft__nl-input {
          width: 100%; background: var(--surface);
          border: 1px solid var(--border-strong); border-radius: 7px;
          padding: 9px 12px; font-family: var(--sans); font-size: .78rem;
          color: var(--text-primary); outline: none; margin-bottom: .45rem;
          transition: border-color .2s, box-shadow .2s; box-sizing: border-box;
        }
        .ft__nl-input::placeholder { color: var(--text-muted); }
        .ft__nl-input:focus {
          border-color: var(--indigo);
          box-shadow: 0 0 0 3px rgba(79,70,229,.08);
        }
        .ft__nl-btn {
          width: 100%; font-family: var(--sans); font-size: 9px; font-weight: 600;
          letter-spacing: .18em; text-transform: uppercase; color: #fff;
          background: var(--indigo); border: none; border-radius: 7px;
          padding: 10px 16px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: background .2s, transform .18s, box-shadow .18s;
        }
        .ft__nl-btn:hover:not(:disabled) {
          background: #4338CA; transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(79,70,229,.28);
        }
        .ft__nl-btn:disabled { opacity: .6; cursor: not-allowed; }

        .ft__nl-status {
          font-family: var(--sans); font-size: .75rem; font-weight: 400;
          margin-top: .4rem; line-height: 1.5;
          animation: ftStatusIn .3s cubic-bezier(.22,1,.36,1) both;
        }
        .ft__nl-status--ok    { color: #16a34a; }
        .ft__nl-status--error { color: #dc2626; }
        .ft__nl-note { font-size: .67rem; color: var(--text-muted); margin-top: .45rem; line-height: 1.5; }

        @keyframes ftStatusIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Spinner */
        .ft__spinner {
          width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff; border-radius: 50%;
          animation: ftSpin .6s linear infinite; flex-shrink: 0;
        }
        @keyframes ftSpin { to { transform: rotate(360deg); } }

        /* ── OTP step ────────────────────────────────────────────────── */
        .ft__nl-sentto {
          font-family: var(--sans); font-size: .75rem; font-weight: 400;
          color: var(--text-secondary); margin-bottom: .8rem; line-height: 1.6;
        }
        .ft__nl-sentto strong { color: var(--text-primary); font-weight: 600; }

        .ft__otp-row { display: flex; gap: .4rem; margin-bottom: .6rem; }
        .ft__otp-box {
          width: 100%; aspect-ratio: 1 / 1; text-align: center;
          background: var(--surface); border: 1px solid var(--border-strong);
          border-radius: 7px; font-family: var(--sans); font-size: .95rem;
          font-weight: 600; color: var(--text-primary); outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .ft__otp-box:focus {
          border-color: var(--indigo);
          box-shadow: 0 0 0 3px rgba(79,70,229,.08);
        }

        .ft__nl-links {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: .55rem;
        }
        .ft__nl-textbtn {
          font-family: var(--sans); font-size: .7rem; font-weight: 500;
          color: var(--indigo); background: none; border: none; padding: 0;
          cursor: pointer; text-decoration: underline; text-underline-offset: 2px;
        }
        .ft__nl-textbtn:disabled {
          color: var(--text-muted); cursor: not-allowed; text-decoration: none;
        }
        .ft__nl-changeemail {
          font-family: var(--sans); font-size: .7rem; font-weight: 400;
          color: var(--text-muted); background: none; border: none; padding: 0;
          cursor: pointer; text-decoration: underline; text-underline-offset: 2px;
        }

        /* ── Ticker ──────────────────────────────────────────────────── */
        .ft__ticker-wrap {
          width: 100%;
          margin-top: 1.8rem;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: .65rem 0;
          background: var(--surface);
          position: relative; z-index: 1;
          overflow: hidden;
        }
        .ft__ticker {
          display: flex;
          width: max-content;
          animation: ftTicker 22s linear infinite;
        }
        .ft__ticker-inner {
          display: flex; align-items: center;
          flex-shrink: 0; white-space: nowrap;
        }
        .ft__ticker-item {
          font-family: var(--sans);
          font-size: 8.5px; font-weight: 500; letter-spacing: .22em;
          text-transform: uppercase; color: var(--text-muted);
          padding: 0 1.6rem; white-space: nowrap;
        }
        .ft__ticker-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--indigo); opacity: .4;
          flex-shrink: 0; display: inline-block;
        }
        @keyframes ftTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Bottom bar ──────────────────────────────────────────────── */
        .ft__bottom {
          width: 100%; padding: 1.1rem 1rem 1.6rem;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: .7rem; position: relative; z-index: 1;
        }
        .ft__copy { font-family: var(--sans); font-size: .7rem; font-weight: 300; color: var(--text-muted); }
        .ft__copy strong { color: var(--text-secondary); font-weight: 500; }
        .ft__legal { display: flex; gap: 1.4rem; align-items: center; }
        .ft__legal-link {
          font-family: var(--sans); font-size: .7rem; font-weight: 400;
          color: var(--text-muted); text-decoration: none; transition: color .2s;
        }
        .ft__legal-link:hover { color: var(--indigo); }
        .ft__legal-sep { width: 3px; height: 3px; border-radius: 50%; background: var(--border-strong); flex-shrink: 0; }

        /* ── Reduced motion ──────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .ft__ticker { animation: none; }
          .ft__col { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <footer
        ref={footerRef}
        className={`ft${visible ? ' ft--visible' : ''}`}
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="ft__surface" aria-hidden="true" />
        <div className="ft__topline" aria-hidden="true" />

        {/* ── Main grid ─────────────────────────────────────────────── */}
        <div className="ft__body">
          <div className="ft__grid">

            {/* Brand */}
            <div className="ft__col ft__col--brand">
              <Link href="/" className="ft__logo-link" aria-label="99 Visual Solutions — home">
                <Image
                  src="/logo-dark.png"
                  alt="99 Visual Solutions"
                  width={240}
                  height={60}
                  className="ft__logo-img"
                  priority={false}
                />
              </Link>
              <p className="ft__tagline">Emmersive Experience · Intelligent Solutions</p>
              <p className="ft__desc">
                Where technology meets creativity — web platforms, 3D worlds,
                smart automation, and strategies that scale.
              </p>
              <ul className="ft__socials" aria-label="Social media links">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ft__social-btn"
                      aria-label={label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <nav className="ft__col" aria-label="Company links">
              <h3 className="ft__nav-heading">
                Company
              </h3>
              <ul className="ft__nav-list">
                {NAV_COMPANY.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="ft__nav-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services */}
            <nav className="ft__col" aria-label="Services links">
              <h3 className="ft__nav-heading">
                Services
              </h3>
              <ul className="ft__nav-list">
                {NAV_SERVICES.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="ft__nav-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Newsletter — email → OTP → done */}
            <div className="ft__col">
              <h3 className="ft__nav-heading">
                Newsletter
              </h3>

              {step === 'email' && (
                <>
                  <p className="ft__nl-desc">
                    Insights that drive innovation — delivered weekly.
                  </p>
                  <form onSubmit={handleRequestOtp} aria-label="Newsletter subscription form" noValidate>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="ft__nl-input"
                      aria-label="Email address for newsletter"
                      autoComplete="email"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      className="ft__nl-btn"
                      disabled={loading}
                      aria-label={loading ? 'Sending code…' : 'Send verification code'}
                    >
                      {loading ? (
                        <>
                          <span className="ft__spinner" aria-hidden="true" />
                          Sending code…
                        </>
                      ) : (
                        <>
                          Subscribe
                          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </>
                      )}
                    </button>
                    {error && (
                      <p className="ft__nl-status ft__nl-status--error" role="alert" aria-live="assertive">
                        {error}
                      </p>
                    )}
                  </form>
                  <p className="ft__nl-note">We&apos;ll email you a 6-digit code to confirm it&apos;s really you.</p>
                </>
              )}

              {step === 'otp' && (
                <>
                  <p className="ft__nl-sentto">
                    Code sent to <strong>{email}</strong>. Enter it below to confirm your subscription.
                  </p>
                  <form onSubmit={handleVerifyOtp} aria-label="One-time code verification form" noValidate>
                    <div className="ft__otp-row" role="group" aria-label="6 digit verification code">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => { otpRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          onPaste={handleOtpPaste}
                          className="ft__otp-box"
                          aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
                          disabled={loading}
                        />
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="ft__nl-btn"
                      disabled={loading}
                      aria-label={loading ? 'Verifying…' : 'Verify code and subscribe'}
                    >
                      {loading ? (
                        <>
                          <span className="ft__spinner" aria-hidden="true" />
                          Verifying…
                        </>
                      ) : (
                        'Confirm Subscription'
                      )}
                    </button>

                    <div className="ft__nl-links">
                      <button
                        type="button"
                        className="ft__nl-textbtn"
                        onClick={handleResend}
                        disabled={resendIn > 0 || loading}
                      >
                        {resendIn > 0 ? `Resend code (${resendIn}s)` : 'Resend code'}
                      </button>
                      <button type="button" className="ft__nl-changeemail" onClick={handleChangeEmail}>
                        Change email
                      </button>
                    </div>

                    {error && (
                      <p className="ft__nl-status ft__nl-status--error" role="alert" aria-live="assertive">
                        {error}
                      </p>
                    )}
                  </form>
                </>
              )}

              {step === 'done' && (
                <p className="ft__nl-status ft__nl-status--ok" role="status" aria-live="polite">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" style={{ marginRight: 6, verticalAlign: '-2px' }}>
                    <path d="M2 6.5L5.2 9.5L11 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Email verified — you&apos;re on the list. Welcome aboard!
                </p>
              )}
            </div>

          </div>
        </div>

        {/* ── Ticker ────────────────────────────────────────────────── */}
        <div className="ft__ticker-wrap" aria-hidden="true">
          <div className="ft__ticker">
            {[0, 1].map((dupe) => (
              <div className="ft__ticker-inner" key={dupe} aria-hidden={dupe === 1 ? 'true' : undefined}>
                {TICKER_DOUBLED.map((item, i) => (
                  <React.Fragment key={`${dupe}-${i}`}>
                    <span className="ft__ticker-item">{item}</span>
                    <span className="ft__ticker-dot" />
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div className="ft__bottom">
          <p className="ft__copy">
            &copy; {new Date().getFullYear()} <strong>99 Visual Solutions</strong>. All rights reserved.
          </p>
          <nav className="ft__legal" aria-label="Legal links">
            <Link href="/privacy-policy" className="ft__legal-link">Privacy Policy</Link>
            <span className="ft__legal-sep" aria-hidden="true" />
            <Link href="/terms" className="ft__legal-link">Terms of Use</Link>
          </nav>
        </div>

      </footer>
    </>
  );
};

export default Footer;