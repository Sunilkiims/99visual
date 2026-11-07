import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import CookieSettingsButton from "@/app/components/cookies/CookieSettingsButton";
import {
  ACTIVE_CATEGORIES,
  CATEGORY_INFO,
  CONSENT_MAX_AGE_DAYS,
  COOKIE_INVENTORY,
  COOKIE_POLICY_LAST_UPDATED,
} from "@/lib/cookies/cookie-config";

// The cookie table, category list and "last updated" date all come from
// lib/cookies/cookie-config.ts, the same file the cookie banner and
// preferences dialog use, so this page always matches what the site does.

export const metadata: Metadata = {
  title: { absolute: "Cookie Policy | 99 Visual Solutions" },
  description:
    "Which cookies and similar technologies 99 Visual Solutions uses, why, how long they last, and how to change or withdraw your consent at any time.",
  openGraph: {
    title: "Cookie Policy | 99 Visual Solutions",
    description:
      "The cookies 99 Visual Solutions uses, why we use them, and how to manage your choices.",
    url: "https://www.99visual.com/cookie-policy",
    siteName: "99 Visual Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy | 99 Visual Solutions",
    description: "The cookies we use and how to manage your choices.",
    site: "@99VisualSoluti1",
  },
  alternates: { canonical: "/cookie-policy" },
};

const h2 = "text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white";
const h3 = "text-lg font-semibold mt-6 mb-2 text-gray-900 dark:text-white";
const p = "text-sm md:text-base leading-relaxed";
const a = "text-orange-600 dark:text-orange-400 underline underline-offset-2";

const consentMonths = Math.round(CONSENT_MAX_AGE_DAYS / 30.4);

export default function CookiePolicyPage() {
  const unusedCategories = Object.values(CATEGORY_INFO).filter((c) => !c.active);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative py-24 text-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Cookie <span className="text-orange-500">Policy</span>
          </h1>
          <p className="text-lg text-gray-300">
            Which cookies we use, why we use them, and how you stay in control.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 px-6 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto space-y-10 text-gray-700 dark:text-gray-300">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {COOKIE_POLICY_LAST_UPDATED}
            </p>
            <CookieSettingsButton className="self-start rounded-full bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition">
              Open Cookie Settings
            </CookieSettingsButton>
          </div>

          <div>
            <h2 className={h2}>1. What cookies are</h2>
            <p className={p}>
              Cookies are small text files a website stores in your browser. Websites also use similar
              technologies, such as your browser&apos;s local storage, to remember information between pages and
              visits. In this policy, &ldquo;cookies&rdquo; covers both. This policy applies to{" "}
              <Link href="/" className={a}>www.99visual.com</Link>, operated by 99 Visual Solutions.
            </p>
          </div>

          <div>
            <h2 className={h2}>2. Why we use cookies</h2>
            <p className={p}>
              We use a small number of cookies to make the site work and keep it secure, and, only if you allow it,
              to understand how visitors use the site so we can improve it and know which pages lead to enquiries.
              We do not use advertising or remarketing cookies, and we do not use fingerprinting or similar techniques
              to identify you.
            </p>
          </div>

          <div>
            <h2 className={h2}>3. Types of cookies we use</h2>
            {ACTIVE_CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <h3 className={h3}>
                  {cat.title} cookies
                  {cat.id === "necessary" ? " (always on)" : " (off unless you allow them)"}
                </h3>
                <p className={p}>{cat.description}</p>
              </div>
            ))}
            {unusedCategories.length > 0 && (
              <>
                <h3 className={h3}>Categories we do not currently use</h3>
                <p className={p}>
                  We do not currently use {unusedCategories.map((c) => c.title.toLowerCase()).join(", ")} cookies.
                  In particular, the site does not run Meta Pixel, the LinkedIn Insight Tag, Google Tag Manager or
                  any other advertising or remarketing tag. If that changes, we will update this policy and ask for
                  your consent again before using them.
                </p>
              </>
            )}
          </div>

          <div>
            <h2 className={h2}>4. Third-party cookies</h2>
            <p className={p}>
              The only third party that may set cookies on this site is Google, through Google Analytics 4, and only
              after you allow Analytics cookies. We use Google Consent Mode v2 and tell Google that advertising
              storage, ad user data and ad personalisation are all denied. Google processes the data on our behalf
              and may process it on servers outside India. See{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className={a}>
                how Google uses information from sites that use its services
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={a}>
                Google&apos;s Privacy Policy
              </a>
              .
            </p>
            <p className={`${p} mt-3`}>
              Links to our social media profiles (LinkedIn, Facebook, Instagram, X) and to WhatsApp are ordinary
              links: those services set no cookies on this site, but their own policies apply once you visit them.
              Some Insights articles may contain an embedded video from YouTube or Vimeo; the video provider may set
              its own cookies when that player loads.
            </p>
          </div>

          <div>
            <h2 className={h2}>5. Cookie list</h2>
            <p className={`${p} mb-5`}>Every cookie and storage item this site sets, as of the date above.</p>

            {/* Table on larger screens */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Cookie name</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Provider</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Category</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Expiration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {COOKIE_INVENTORY.map((c) => (
                    <tr key={c.name} className="align-top">
                      <td className="px-4 py-3 font-mono text-xs text-gray-900 dark:text-white break-all">
                        {c.name}
                        <span className="block font-sans text-[11px] text-gray-500 mt-1">{c.kind}</span>
                      </td>
                      <td className="px-4 py-3">{c.provider}</td>
                      <td className="px-4 py-3">{c.purpose}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{CATEGORY_INFO[c.category].title}</td>
                      <td className="px-4 py-3">{c.expiration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards on phones (no sideways scrolling) */}
            <ul className="md:hidden space-y-3">
              {COOKIE_INVENTORY.map((c) => (
                <li key={c.name} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-sm">
                  <p className="font-mono text-xs font-semibold text-gray-900 dark:text-white break-all">{c.name}</p>
                  <dl className="mt-2 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1">
                    <dt className="text-gray-500">Type</dt><dd>{c.kind}</dd>
                    <dt className="text-gray-500">Provider</dt><dd>{c.provider}</dd>
                    <dt className="text-gray-500">Category</dt><dd>{CATEGORY_INFO[c.category].title}</dd>
                    <dt className="text-gray-500">Expiration</dt><dd>{c.expiration}</dd>
                    <dt className="text-gray-500">Purpose</dt><dd>{c.purpose}</dd>
                  </dl>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={h2}>6. How long cookies last</h2>
            <p className={p}>
              Each cookie&apos;s lifetime is shown in the list above. Your cookie choice itself is kept for{" "}
              {consentMonths} months. After that, or if we make a material change to how we use cookies, we ask you
              again. Analytics data held by Google is kept according to the retention period set in our Google
              Analytics account.
            </p>
          </div>

          <div>
            <h2 className={h2}>7. How to manage cookies</h2>
            <p className={p}>
              On your first visit, a banner lets you accept all cookies, decline optional cookies, or choose
              category by category. Declining is as easy as accepting, and closing or ignoring the banner is not
              treated as consent: optional cookies stay off. You can change your choice at any time with the{" "}
              <strong>Cookie Settings</strong> link at the bottom of every page, or the button at the top of this
              page.
            </p>
            <p className={`${p} mt-3`}>
              You can also block or delete cookies in your browser settings. Blocking strictly necessary cookies may
              stop parts of the site from working. Google offers a{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={a}>
                browser add-on to opt out of Google Analytics
              </a>{" "}
              on all websites.
            </p>
          </div>

          <div>
            <h2 className={h2}>8. How to withdraw consent</h2>
            <p className={p}>
              Open <strong>Cookie Settings</strong> and either switch Analytics off and save, or press{" "}
              <strong>Reject optional cookies</strong>. From that moment Google Analytics stops collecting data, we
              delete the Google Analytics cookies and the attribution values listed above from your browser, and
              they are not set again unless you change your mind. Withdrawing consent does not affect anything
              collected before you withdrew it. To be asked from scratch, use <strong>Reset cookie preferences</strong>{" "}
              in the same dialog.
            </p>
          </div>

          <div>
            <h2 className={h2}>9. Changes to this policy</h2>
            <p className={p}>
              We update this policy when the cookies we use change. The date at the top shows the latest version.
              If a change needs your consent, we will ask again through the cookie banner.
            </p>
          </div>

          <div>
            <h2 className={h2}>10. Contact us</h2>
            <p className={p}>
              Questions about cookies or your data? Email{" "}
              <a href="mailto:info@99visual.com" className={a}>info@99visual.com</a> or use our{" "}
              <Link href="/contact" className={a}>contact page</Link>. For how we handle personal data more
              generally, including your rights, see our <Link href="/privacy-policy" className={a}>Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
