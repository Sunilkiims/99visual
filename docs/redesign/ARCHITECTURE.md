# 99Visual redesign — architecture plan

Branch: `redesign/futuristic-2026` (from `main` @ e5e9c81). Direction: futuristic, immersive, intelligent.
Tagline: *Immersive Experience · Intelligent Solutions*.

## 1. Audit of the existing project

**Stack:** Next.js 16.1 App Router, React 19.2, TypeScript, Tailwind CSS v4, framer-motion 12,
Prisma 7 (pg adapter) on PostgreSQL, Cloudinary, Resend/Nodemailer, OpenAI (chatbot), Vercel.

**Public routes (unchanged by this redesign):**
`/`, `/about`, `/services`, `/services/{visualization, website-development, digital-marketing-seo,
cad-gis-photogrammetry, automation-testing, it-consulting}`, `/work`, `/work/[slug]`, `/insights`,
`/insights/[slug]`, `/insights/category/[slug]`, `/videos`, `/videos/[slug]`, `/partner`, `/careers`,
`/contact`, `/press`, `/help-center`, `/privacy-policy`, `/terms`, plus `/sitemap.xml`, `/robots.txt`,
`/llms.txt`. Private: `/admin/*`, `/login`, `/api/*`.

**Functionality that must keep working:**

| Feature | Where | API |
| --- | --- | --- |
| Newsletter with email OTP | footer | `/api/subscribe/request-otp`, `/api/subscribe/verify-otp` |
| Contact form + captcha | contact page, `ContactPopup` | `/api/contact`, `/api/captcha` |
| Job applications | careers | `/api/apply` |
| AI chatbot | site-wide on home | `/api/chat` |
| WhatsApp button | floating | external |
| Insights CMS | `/admin/*` | `/api/admin/*` |
| GA4 | root layout | production only |

**SEO inventory to preserve:** per-page Metadata API exports (title, description, canonical, OG,
Twitter), one JSON-LD `@graph` per page from `lib/schema.ts`, `app/sitemap.ts`, `app/robots.ts`,
`next.config.ts` redirects and preview-host `X-Robots-Tag`, `proxy.ts` 410s, `/llms.txt`.

**Design debt found:** each page carries its own inline `<style>` block (500–800 lines), seven Google
font families loaded through one render-blocking stylesheet (two also via `next/font`), light and dark
pages mixed, six unused `*banner.tsx` components.

## 2. Decisions

- **Rewrite presentation, keep data.** Every page keeps its `metadata` export, JSON-LD graph and copy.
  Only JSX/CSS change. No URL, redirect or sitemap change.
- **Header and footer are rewritten in place** (`app/components/header.tsx`, `footer.tsx`), so every
  page gets the new chrome through its existing import.
- **Fonts:** Sora (display) + Manrope (text), both geometric, OFL-licensed, self-hosted through
  `next/font/local` (no render-blocking request, no build-time network).
- **Libraries:**

| Library | Decision | Why |
| --- | --- | --- |
| Motion (framer-motion 12) | Keep (already installed) | Scroll reveals, menu transitions |
| cobe 2.0.1 (MIT, ~5 KB) | Add | WebGL globe; far lighter than three.js + R3F |
| React Three Fiber | Not added | The globe is the only 3D element; cobe covers it at a fraction of the bundle |
| Lenis | Not added | Smooth-scroll hijacking hurts native scrolling, find-in-page and reduced-motion users |
| Aceternity / Magic UI / React Bits | Patterns only, no install | They are copy-paste collections; bento grid, spotlight card and marquee are written locally |
| shadcn/ui | Not added | No Radix-heavy widgets needed; native elements cover the forms |

## 3. Design system

Tokens live in `app/global.css` (`--vz-*` variables + Tailwind `@theme`).

| Token | Value |
| --- | --- |
| Background | `#080B12` |
| Surface | `#111827` |
| Electric blue | `#386BFF` |
| Violet | `#8657FF` |
| Cyan | `#29D9F2` |
| Text | `#F4F6FC` |
| Muted text | `#A7B0C6` (8.9:1 on background) |

Type scale (fluid, `clamp`): display 48–88 px, h1 40–64, h2 32–48, h3 20–24, body 16–18, eyebrow 12.
Radii 12 / 20 / 28. Section rhythm 96–160 px desktop, 72–96 px mobile.

## 4. Component architecture

```
app/components/ui/        Container, Section, Eyebrow, SectionHeading, Button, Reveal, GlowCard
app/components/premium/   PremiumHeader (header.tsx), FullScreenMobileMenu, PremiumFooter (footer.tsx),
                          NewsletterForm, CinematicHero, InteractiveGlobe, ServiceBentoGrid,
                          PortfolioShowcase, IndustryGrid, TechnologyCloud, WhyChoose, CTASection,
                          ServicePage (shared template for the six service pages)
```

Server Components by default; client components only for the header/menu, newsletter, globe,
reveal animations and forms. The globe is loaded with `next/dynamic` (`ssr: false`), pauses when
off-screen, renders a single static frame under `prefers-reduced-motion`, and is replaced by a
lighter fallback on small screens.

## 5. Phases

1. Audit + this plan
2. Tokens, fonts, primitives, header, mobile menu, footer
3. Homepage
4. Service pages (shared template)
5. About, Industries, Work, Partner
6. Insights, Careers, Contact, Help Center, Press, legal, videos
7. Responsive + motion pass
8. SEO / accessibility / performance validation against `main`
9. Production build and QA

Each phase: `tsc --noEmit`, ESLint on changed files, `next build`, route checks, screenshots at 1440 / 1024 / 768 / 390 px.
