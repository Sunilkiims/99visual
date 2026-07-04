/**
 * lib/leadTracking.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Lightweight, dependency-free lead-source tracking utility.
 *
 * This module is responsible for:
 *   1. Capturing the visitor's FIRST landing page + referrer once, and
 *      persisting it in localStorage so it survives across the whole
 *      browsing session (it is never overwritten).
 *   2. Reading UTM parameters from the current URL.
 *   3. Doing basic User-Agent parsing to get Browser / OS / Device type
 *      (no external library — keeps bundle size untouched).
 *   4. Assembling all of the above into a single TrackingData object that
 *      can be spread straight into a form submission payload.
 *
 * Nothing here touches the DOM/UI — it's pure data collection, safe to
 * import into any client component.
 */

'use client';

// ── Types ───────────────────────────────────────────────────────────────
export interface TrackingData {
    landingPage: string;
    currentPage: string;
    pageTitle: string;
    blogTitle: string;
    blogSlug: string;
    referrer: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmContent: string;
    utmTerm: string;
    browser: string;
    operatingSystem: string;
    deviceType: string;
    screenResolution: string;
    userLanguage: string;
    userTimeZone: string;
    submittedAt: string;
}

// Keys used in localStorage. Namespaced to avoid collisions with anything
// else the site may store.
const LS_LANDING_PAGE_KEY = '99v_landing_page';
const LS_LANDING_REFERRER_KEY = '99v_landing_referrer';

/**
 * Returns the visitor's very first landing page + referrer for this
 * browser (persisted in localStorage). If these values already exist,
 * they are returned as-is and NEVER overwritten — this preserves true
 * "first touch" attribution even if the visitor navigates around the
 * site and eventually submits the form from a different page.
 */
function getOrCaptureLandingData(): { landingPage: string; referrer: string } {
    // Guard for SSR — this should only ever run in the browser, but this
    // keeps the function safe to call from anywhere.
    if (typeof window === 'undefined') {
        return { landingPage: '', referrer: '' };
    }

    let landingPage = window.localStorage.getItem(LS_LANDING_PAGE_KEY);
    let referrer = window.localStorage.getItem(LS_LANDING_REFERRER_KEY);

    if (!landingPage) {
        landingPage = window.location.href;
        window.localStorage.setItem(LS_LANDING_PAGE_KEY, landingPage);
    }

    if (referrer === null) {
        // document.referrer is empty string for direct traffic — store it
        // as-is (normalized to "Direct" later in normalizeReferrer).
        referrer = document.referrer || '';
        window.localStorage.setItem(LS_LANDING_REFERRER_KEY, referrer);
    }

    return { landingPage, referrer };
}

/**
 * Turns a raw document.referrer URL into a human-readable source name
 * (Google, Facebook, LinkedIn, Direct, etc). Falls back to the bare
 * hostname for anything not explicitly mapped.
 */
function normalizeReferrer(rawReferrer: string): string {
    if (!rawReferrer) return 'Direct';

    try {
        const hostname = new URL(rawReferrer).hostname.replace(/^www\./, '');

        const knownSources: Record<string, string> = {
            'google.com': 'Google',
            'bing.com': 'Bing',
            'yahoo.com': 'Yahoo',
            'duckduckgo.com': 'DuckDuckGo',
            'facebook.com': 'Facebook',
            'fb.com': 'Facebook',
            'instagram.com': 'Instagram',
            'linkedin.com': 'LinkedIn',
            'twitter.com': 'Twitter / X',
            'x.com': 'Twitter / X',
            'youtube.com': 'YouTube',
            'reddit.com': 'Reddit',
            'pinterest.com': 'Pinterest',
        };

        for (const domain of Object.keys(knownSources)) {
            if (hostname.includes(domain)) return knownSources[domain];
        }

        return hostname; // Unrecognized referrer — show the raw domain
    } catch {
        return 'Direct';
    }
}

/**
 * Reads UTM parameters from the current page's query string.
 */
function getUtmParams(): {
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmContent: string;
    utmTerm: string;
} {
    if (typeof window === 'undefined') {
        return { utmSource: '', utmMedium: '', utmCampaign: '', utmContent: '', utmTerm: '' };
    }

    const params = new URLSearchParams(window.location.search);
    return {
        utmSource: params.get('utm_source') || '',
        utmMedium: params.get('utm_medium') || '',
        utmCampaign: params.get('utm_campaign') || '',
        utmContent: params.get('utm_content') || '',
        utmTerm: params.get('utm_term') || '',
    };
}

/**
 * Minimal, dependency-free User-Agent parsing. Good enough to bucket the
 * vast majority of real-world traffic into Browser / OS / Device Type
 * without pulling in a UA-parsing library.
 */
function parseUserAgent(): {
    browser: string;
    operatingSystem: string;
    deviceType: string;
} {
    if (typeof navigator === 'undefined') {
        return { browser: 'Unknown', operatingSystem: 'Unknown', deviceType: 'Unknown' };
    }

    const ua = navigator.userAgent;

    // ── Browser detection (order matters — e.g. Edge/Chrome both contain "Chrome") ──
    let browser = 'Unknown';
    if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/OPR\//.test(ua) || /Opera/.test(ua)) browser = 'Opera';
    else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = 'Chrome';
    else if (/Firefox\//.test(ua)) browser = 'Firefox';
    else if (/Safari\//.test(ua) && /Version\//.test(ua)) browser = 'Safari';
    else if (/MSIE|Trident/.test(ua)) browser = 'Internet Explorer';

    // ── Operating system detection ──
    let operatingSystem = 'Unknown';
    if (/Windows NT/.test(ua)) operatingSystem = 'Windows';
    else if (/Mac OS X/.test(ua) && !/iPhone|iPad|iPod/.test(ua)) operatingSystem = 'macOS';
    else if (/Android/.test(ua)) operatingSystem = 'Android';
    else if (/iPhone|iPad|iPod/.test(ua)) operatingSystem = 'iOS';
    else if (/Linux/.test(ua)) operatingSystem = 'Linux';

    // ── Device type detection ──
    let deviceType = 'Desktop';
    if (/iPad|Tablet/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))) {
        deviceType = 'Tablet';
    } else if (/Mobi|iPhone|Android/.test(ua)) {
        deviceType = 'Mobile';
    }

    return { browser, operatingSystem, deviceType };
}

/**
 * Attempts to auto-detect a Blog/Insights post title + slug from the
 * current page, without requiring every page to explicitly pass them in.
 *
 * - Slug: pulled from the URL path if it looks like /insights/<slug> or
 *   /blog/<slug>.
 * - Title: falls back to document.title if no explicit override is given.
 *
 * Callers on a known blog page (e.g. app/insights/[slug]/page.tsx) can
 * still pass `blogTitleOverride` / `blogSlugOverride` explicitly for
 * guaranteed accuracy — this auto-detection is just a sensible default.
 */
function detectBlogContext(
    blogTitleOverride?: string,
    blogSlugOverride?: string
): { blogTitle: string; blogSlug: string } {
    if (typeof window === 'undefined') {
        return { blogTitle: blogTitleOverride || '', blogSlug: blogSlugOverride || '' };
    }

    const path = window.location.pathname;
    const blogPathMatch = path.match(/\/(insights|blog)\/([^/?#]+)/i);

    const blogSlug = blogSlugOverride || (blogPathMatch ? blogPathMatch[2] : '');
    const blogTitle = blogTitleOverride || (blogPathMatch ? document.title : '');

    return { blogTitle, blogSlug };
}

/**
 * Main entry point — call this at submission time to get a complete,
 * ready-to-send TrackingData object.
 *
 * @param blogTitleOverride  Optional explicit blog post title (recommended
 *                           on blog/insights pages for guaranteed accuracy).
 * @param blogSlugOverride   Optional explicit blog post slug.
 */
export function getTrackingData(
    blogTitleOverride?: string,
    blogSlugOverride?: string
): TrackingData {
    const { landingPage, referrer } = getOrCaptureLandingData();
    const utm = getUtmParams();
    const { browser, operatingSystem, deviceType } = parseUserAgent();
    const { blogTitle, blogSlug } = detectBlogContext(blogTitleOverride, blogSlugOverride);

    return {
        landingPage,
        currentPage: typeof window !== 'undefined' ? window.location.href : '',
        pageTitle: typeof document !== 'undefined' ? document.title : '',
        blogTitle,
        blogSlug,
        referrer: normalizeReferrer(referrer),
        ...utm,
        browser,
        operatingSystem,
        deviceType,
        screenResolution:
            typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
        userLanguage: typeof navigator !== 'undefined' ? navigator.language : '',
        userTimeZone:
            typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : '',
        submittedAt: new Date().toISOString(),
    };
}
