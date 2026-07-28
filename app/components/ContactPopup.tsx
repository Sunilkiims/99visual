'use client'

// components/ContactPopup.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Centered modal contact form, rendered via a portal directly into
// document.body. This is deliberate: whatever page/button triggers this
// (see ConsultationCTA.tsx) may be nested inside sections that use
// transform/filter/backdrop-blur for their own animations — any of those
// on an ancestor silently breaks `position: fixed` (it becomes relative to
// that ancestor instead of the viewport), which is what causes a modal to
// render the wrong size/position depending on where the trigger button
// lives on the page. Portaling to <body> sidesteps that entirely.
//
// Color system matches the site: white surface, black pill CTA (same as
// the "Get a Free Consultation" button), indigo as the interactive accent
// (footer bar / Subscribe button), and a touch of the logo's orange for
// required-field marks.
//
// Submitted data is POSTed to /api/contact (Nodemailer).
// Includes a server-verified math captcha + honeypot for bot protection.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
// ── Lead source tracking ────────────────────────────────────────────────────
// Pure data-collection utility — no UI impact. See lib/leadTracking.ts
// (shared with components/ContactForm.tsx, so both forms stay consistent).
import { getTrackingData, type TrackingData } from '@/lib/leadTracking'

interface Props {
  isOpen: boolean
  onClose: () => void
  postTitle?: string
  postUrl?: string
}

type Stage = 'form' | 'sending' | 'success' | 'error'

/**
 * If this popup was opened from a blog/insights post, `postUrl` is often
 * the full URL to that post. Pull the last path segment out as the blog
 * slug so we don't require every caller to pass a separate slug prop.
 * Falls back to undefined (letting leadTracking.ts auto-detect from the
 * current page URL instead) if postUrl isn't a parseable URL/path.
 */
function extractSlugFromPostUrl(postUrl?: string): string | undefined {
  if (!postUrl) return undefined
  try {
    // Handle both absolute URLs ("https://site.com/insights/foo") and
    // bare paths ("/insights/foo").
    const path = postUrl.startsWith('http') ? new URL(postUrl).pathname : postUrl
    const segments = path.split('/').filter(Boolean)
    return segments.length ? segments[segments.length - 1] : undefined
  } catch {
    return undefined
  }
}

export default function ContactPopup({ isOpen, onClose, postTitle, postUrl }: Props) {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [stage, setStage]     = useState<Stage>('form')
  const [errorMsg, setErrorMsg] = useState('')
  const firstInputRef = useRef<HTMLInputElement>(null)

  // ── Captcha + honeypot state ──────────────────────────────────────────────
  const [captchaQuestion, setCaptchaQuestion] = useState('')
  const [captchaToken, setCaptchaToken]       = useState('')
  const [captchaAnswer, setCaptchaAnswer]     = useState('')
  const [captchaLoading, setCaptchaLoading]   = useState(false)
  const [honeypot, setHoneypot]               = useState('') // must stay empty — bots tend to fill it

  // ── Lead source tracking state ──────────────────────────────────────────
  // Captured fresh every time the modal opens (client-side only). Kept in
  // state rather than recomputed only at submit time so the "landing page"
  // sessionStorage write happens as early as possible.
  const [tracking, setTracking] = useState<TrackingData | null>(null)

  // document.body doesn't exist during SSR, so only portal once mounted.
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  function loadCaptcha() {
    setCaptchaLoading(true)
    fetch('/api/captcha')
      .then((res) => res.json())
      .then((data) => {
        setCaptchaQuestion(data.question)
        setCaptchaToken(data.token)
      })
      .catch(() => {
        setCaptchaQuestion('')
        setCaptchaToken('')
      })
      .finally(() => setCaptchaLoading(false))
  }

  // Auto-focus first input + reset form + fetch a fresh captcha when modal opens
  useEffect(() => {
    if (isOpen) {
      setStage('form')
      setName('')
      setEmail('')
      setMessage('')
      setCaptchaAnswer('')
      setHoneypot('')
      loadCaptcha()
      // Capture lead source tracking data for this open/session. postTitle
      // becomes the blog title override; the slug is parsed out of postUrl
      // when available. Both fall back to auto-detection from the current
      // URL/document.title if not provided.
      setTracking(getTrackingData(postTitle, extractSlugFromPostUrl(postUrl)))
      setTimeout(() => firstInputRef.current?.focus(), 80)
    }
  }, [isOpen, postTitle, postUrl])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent body scroll while open.
  // `overflow: hidden` alone doesn't stop background scrolling on iOS
  // Safari (it still lets touch-scroll "leak through" behind a fixed
  // overlay). Locking the body to position:fixed at its current scroll
  // offset — then restoring both the styles and the scroll position on
  // close — is the reliable cross-device fix.
  //
  // On desktop this removes the page's scrollbar, which narrows the
  // viewport and makes the whole page visibly jump/reflow sideways.
  // We compensate by padding the body by exactly the scrollbar's width
  // so nothing shifts.
  useEffect(() => {
    if (!isOpen) return
    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const { style } = document.body
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.left = '0'
    style.right = '0'
    style.overflow = 'hidden'
    if (scrollbarWidth > 0) style.paddingRight = `${scrollbarWidth}px`
    return () => {
      style.position = ''
      style.top = ''
      style.left = ''
      style.right = ''
      style.overflow = ''
      style.paddingRight = ''
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  if (!isOpen || !mounted) return null

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim() || !captchaAnswer.trim()) return
    setStage('sending')
    try {
      // Re-capture at submit time so `currentPage`/`submittedAt` reflect the
      // exact moment of submission, while `landingPage`/`referrer` stay
      // pinned to the values already stored this session.
      const submissionTracking = getTrackingData(postTitle, extractSlugFromPostUrl(postUrl))

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          postTitle,
          postUrl,
          captcha: captchaAnswer,
          captchaToken,
          honeypot,
          // Lead source tracking fields appended to the payload
          tracking: submissionTracking,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        // If captcha failed/expired, refresh it so the user can retry
        if (res.status === 400 && /captcha/i.test(data.message ?? '')) {
          loadCaptcha()
          setCaptchaAnswer('')
        }
        throw new Error(data.message ?? data.error ?? 'Something went wrong')
      }
      setStage('success')
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.')
      setStage('error')
    }
  }

  const isValid =
    name.trim() &&
    /\S+@\S+\.\S+/.test(email) &&
    message.trim() &&
    captchaAnswer.trim()

  return createPortal(
    <>
      {/* ── Overlay ──────────────────────────────────────────────────────────
          Always centered, on every screen size, sitting on top of the page.
          Positioning/z-index/height are set as inline styles rather than
          Tailwind arbitrary-value classes (z-[999], h-[100dvh], etc) so
          the modal can never silently disappear because a production
          build's content-scanning missed this file — inline styles always
          apply regardless of the Tailwind config. */}
      <div
        className="flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          minHeight: '100dvh',
          zIndex: 2147483647,
          padding: 'clamp(0.75rem, 3vw, 1rem)',
          animation: 'cpOverlayIn 0.2s ease forwards',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        role="dialog"
        aria-modal="true"
        aria-label="Contact us form"
      >
        {/* ── Panel ─────────────────────────────────────────────────────────
            A single centered card at every breakpoint. Sizing/overflow are
            inline styles for the same reason as the overlay above: this is
            what guarantees the card never exceeds the viewport and the form
            never gets visually cut off — it scrolls internally instead. */}
        <div
          className="relative flex flex-col border border-gray-200 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)]"
          style={{
            width: '100%',
            maxWidth: '28rem',
            maxHeight: '92vh',
            overflow: 'hidden',
            borderRadius: '24px',
            background: '#ffffff',
            animation: 'cpPanelIn 0.28s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/40"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* ── Header ──────────────────────────────────────────────────────── */}
          <div className="relative shrink-0 overflow-hidden border-b border-gray-100 px-6 pt-7 pb-6">
            <div className="relative flex items-center gap-3.5">
              {/* Icon badge — blue-to-orange gradient echoes the logo's twin-pin mark */}
              <div
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #F97316 100%)' }}
              >
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold leading-tight tracking-tight text-gray-900">
                  Let's talk
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Typically replies within a business day
                </p>
              </div>
            </div>
          </div>

          {/* ── Body (scrolls independently if content is taller than viewport) ── */}
          <div className="px-6 pb-6 pt-6" style={{ overflowY: 'auto' }}>

            {/* FORM */}
            {(stage === 'form' || stage === 'sending' || stage === 'error') && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
                    Full name <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Lee"
                    disabled={stage === 'sending'}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 placeholder-gray-400 transition-colors focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 disabled:bg-gray-50 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
                    Email address <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@company.com"
                    disabled={stage === 'sending'}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 placeholder-gray-400 transition-colors focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 disabled:bg-gray-50 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
                    Message <span className="text-[#F97316]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                    disabled={stage === 'sending'}
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 placeholder-gray-400 transition-colors focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 disabled:bg-gray-50 disabled:opacity-60"
                  />
                </div>

                {/* Honeypot field — hidden from real users via off-screen positioning.
                    Bots that auto-fill every input will trip this and get silently rejected. */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                  }}
                />

                {/* Captcha */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
                    {captchaLoading ? 'Loading question…' : captchaQuestion || 'Verification'}{' '}
                    <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Your answer"
                    disabled={stage === 'sending' || captchaLoading}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 placeholder-gray-400 transition-colors focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 disabled:bg-gray-50 disabled:opacity-60"
                  />
                </div>

                {/* Error banner */}
                {stage === 'error' && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs leading-relaxed text-red-600">{errorMsg}</p>
                  </div>
                )}

                {/* Primary CTA — same solid-black pill as "Get a Free Consultation" on the site */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isValid || stage === 'sending'}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 active:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/50 focus-visible:ring-offset-2"
                >
                  {stage === 'sending' ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Your information is kept private and never shared.
                </p>
              </div>
            )}

            {/* SUCCESS */}
            {stage === 'success' && (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                  Message sent
                </h3>
                <p className="mb-1 text-sm leading-relaxed text-gray-500">
                  Thanks, <span className="font-medium text-[#4F46E5]">{name}</span> — we've got it.
                </p>
                <p className="mb-7 text-sm text-gray-500">
                  We'll follow up at <span className="text-gray-700">{email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-black px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/50 focus-visible:ring-offset-2"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Keyframe animations (injected once) ───────────────────────────────── */}
      <style>{`
        @keyframes cpOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        /* Same gentle scale-in centered dialog at every screen size */
        @keyframes cpPanelIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="cpOverlayIn"], div[style*="cpPanelIn"] {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>,
    document.body
  )
}