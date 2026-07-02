'use client'

// components/ContactPopup.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Renders a full-screen modal overlay with a simple contact form.
// Submitted data is POSTed to /api/contact (Nodemailer).
// Includes a server-verified math captcha + honeypot for bot protection.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  postTitle?: string
  postUrl?: string
}

type Stage = 'form' | 'sending' | 'success' | 'error'

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
      setTimeout(() => firstInputRef.current?.focus(), 80)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim() || !captchaAnswer.trim()) return
    setStage('sending')
    try {
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

  return (
    <>
      {/* ── Overlay ─────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        style={{ animation: 'cpOverlayIn 0.2s ease forwards' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        role="dialog"
        aria-modal="true"
        aria-label="Contact us form"
      >
        {/* ── Panel ─────────────────────────────────────────────────────────── */}
        <div
          className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
          style={{ animation: 'cpPanelIn 0.28s cubic-bezier(0.16,1,0.3,1) forwards' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg p-1.5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* ── Header bar ──────────────────────────────────────────────────── */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 pt-6 pb-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">Contact Us Now</h2>
                <p className="text-orange-100 text-xs mt-0.5">We'll reply within 24 hours</p>
              </div>
            </div>
          </div>

          {/* ── Body ────────────────────────────────────────────────────────── */}
          <div className="px-6 py-6">

            {/* FORM */}
            {(stage === 'form' || stage === 'sending' || stage === 'error') && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1.5">
                    Full Name <span className="text-orange-400">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    disabled={stage === 'sending'}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 disabled:opacity-50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1.5">
                    Email Address <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    disabled={stage === 'sending'}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 disabled:opacity-50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1.5">
                    Message <span className="text-orange-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help you..."
                    disabled={stage === 'sending'}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 disabled:opacity-50 resize-none transition-colors"
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
                  <label className="block text-gray-400 text-xs font-medium mb-1.5">
                    {captchaLoading ? 'Loading question…' : captchaQuestion || 'Verification'}{' '}
                    <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Your answer"
                    disabled={stage === 'sending' || captchaLoading}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 disabled:opacity-50 transition-colors"
                  />
                </div>

                {/* Error banner */}
                {stage === 'error' && (
                  <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-400 text-xs leading-relaxed">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isValid || stage === 'sending'}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {stage === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-gray-600 text-xs text-center">
                  Your information is kept private and never shared.
                </p>
              </div>
            )}

            {/* SUCCESS */}
            {stage === 'success' && (
              <div className="py-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  Thank You for Your Interest!
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-1">
                  Hi <span className="text-orange-400 font-medium">{name}</span>, we've received your message.
                </p>
                <p className="text-gray-500 text-sm mb-7">
                  We'll be in touch at <span className="text-gray-300">{email}</span> very soon.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors"
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
        @keyframes cpPanelIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </>
  )
}