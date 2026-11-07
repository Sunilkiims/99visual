'use client'

// app/components/cookies/CookieConsentBanner.tsx
// The first-visit cookie banner. Shown until the visitor makes a choice; it
// has no close button on purpose, because closing is not consent. "Decline
// optional cookies" and "Accept all cookies" share the same style and size so
// neither choice is easier than the other.

import Link from 'next/link'

interface Props {
  onCustomize: () => void
  onRejectOptional: () => void
  onAcceptAll: () => void
}

export default function CookieConsentBanner({ onCustomize, onRejectOptional, onAcceptAll }: Props) {
  return (
    <section
      role="region"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[10000] border-t border-neutral-200 bg-white text-neutral-900 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
      // Bottom padding clears the iPhone home indicator.
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8">
        <div className="min-w-0 lg:max-w-xl xl:max-w-2xl">
          <h2 id="cookie-banner-title" className="text-[15px] font-bold leading-snug sm:text-base">
            This website uses cookies to provide a better user experience.
          </h2>
          <p id="cookie-banner-desc" className="mt-1 text-[13px] leading-relaxed text-neutral-600 sm:text-sm">
            By clicking accept, you agree to the policies outlined in the{' '}
            <button
              type="button"
              onClick={onCustomize}
              className="font-semibold text-[#B91C1C] underline underline-offset-2 hover:text-[#991B1B]"
            >
              Cookie Settings
            </button>
            . Read our{' '}
            <Link href="/cookie-policy" className="font-semibold text-[#B91C1C] underline underline-offset-2 hover:text-[#991B1B]">
              Cookie Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:shrink-0">
          <button type="button" onClick={onCustomize} className="cc-btn cc-btn--outline">
            Customize cookies
          </button>
          <button type="button" onClick={onRejectOptional} className="cc-btn cc-btn--solid">
            Decline optional cookies
          </button>
          <button type="button" onClick={onAcceptAll} className="cc-btn cc-btn--solid">
            Accept all cookies
          </button>
        </div>
      </div>
    </section>
  )
}
