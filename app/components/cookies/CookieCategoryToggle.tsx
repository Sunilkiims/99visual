'use client'

// app/components/cookies/CookieCategoryToggle.tsx
// One row of the cookie preferences dialog: category name, what it is for,
// the cookies it covers, and either an on/off switch or "Always active".

import { useId } from 'react'
import type { CategoryInfo, CookieInventoryItem } from '@/lib/cookies/cookie-config'

interface Props {
  category: CategoryInfo
  cookies: CookieInventoryItem[]
  checked: boolean
  alwaysActive?: boolean
  onChange?: (checked: boolean) => void
}

export default function CookieCategoryToggle({ category, cookies, checked, alwaysActive, onChange }: Props) {
  const titleId = useId()
  const descId = useId()

  return (
    <div className="rounded-xl border border-neutral-200 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 id={titleId} className="text-[15px] font-semibold text-neutral-900">
            {category.title}
          </h3>
          <p id={descId} className="mt-1 text-sm leading-relaxed text-neutral-600">
            {category.description}
          </p>
        </div>

        {alwaysActive ? (
          <span className="mt-0.5 shrink-0 whitespace-nowrap rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-700">
            Always active
          </span>
        ) : (
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-labelledby={titleId}
            aria-describedby={descId}
            onClick={() => onChange?.(!checked)}
            className={`relative mt-0.5 inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B91C1C] focus-visible:ring-offset-2 ${
              checked ? 'border-[#B91C1C] bg-[#B91C1C]' : 'border-neutral-300 bg-neutral-200'
            }`}
          >
            <span className="sr-only">{checked ? 'On' : 'Off'}</span>
            <span
              aria-hidden="true"
              className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                checked ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        )}
      </div>

      {cookies.length > 0 && (
        <details className="group mt-3">
          <summary className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wide text-[#B91C1C] hover:underline">
            Cookies in this category ({cookies.length})
          </summary>
          <ul className="mt-3 space-y-2">
            {cookies.map((c) => (
              <li key={c.name} className="rounded-lg bg-neutral-50 px-3 py-2 text-xs leading-relaxed text-neutral-700">
                <span className="font-mono font-semibold text-neutral-900">{c.name}</span>
                <span className="text-neutral-500"> · {c.provider} · {c.kind} · {c.expiration}</span>
                <br />
                {c.purpose}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}
