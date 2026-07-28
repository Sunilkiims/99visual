// app/contact/ContactPageClient.tsx  — CLIENT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
// THIS REVISION — brings Hero + CTA in line with the Services page design
// system (app/services/page.tsx), matching the treatment already applied to
// app/about/page.tsx, app/partner/page.tsx, and app/careers/page.tsx:
//   1. Hero rebuilt on the Services mechanism: full-bleed photo banner,
//      fixed 100vh/100dvh/100svh, single left-aligned column, corner
//      brackets, grain texture, docked ticker bar on the hero's bottom edge.
//      The previous bespoke "flying letter → mailbox" SVG animation has been
//      retired in favour of this shared mechanism — every other page now
//      uses the same hero, and this was the last holdout.
//   2. Recolored to the shared Space Grotesk / Inter / IBM Plex Mono system
//      with the one blue signal accent (--ct-blue); orange eyebrow retained.
//   3. CTA rebuilt to match Services' .sv-cta exactly (light surface, radial
//      orb, Space Grotesk heading). The button still anchors to #contact-form
//      (we're already on the Contact page — no need to open the consultation
//      modal here), matching its prior behaviour.
//   4. Proof strip (animated stat counters), Reach + Testimonials (carousel,
//      progress bar, avatar fallback logic) are UNCHANGED — same hooks, same
//      markup, same CSS. FAQ remains excluded per the existing page.tsx split.
//   5. .ct-hero__h1 / .ct-hero__sub class names are kept so the
//      `speakable.cssSelector` entries in contactPageNode (page.tsx) and the
//      itemScope/itemType="ContactPage" microdata keep working.
//
//   Save your banner image to: /public/images/contact/contact-hero-banner.jpg
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS DATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "99 Visual transformed our website into a powerful business tool that actually converts. The ROI was visible within the first quarter — something we hadn't seen with any previous agency.",
    name: "Priya S.",
    role: "Founder & CEO",
    company: "Stacklane Technologies",
    initial: "P",
    imgSlug: "priya",
    palette: { bg: "#1a0e00", border: "#f97316", text: "#fb923c" },
  },
  {
    quote:
      "Excellent support and modern design. The team genuinely cares about the outcome, not just the deliverable. Our brand feels premium now — and our customers have noticed.",
    name: "Ramesh K.",
    role: "Head of Marketing",
    company: "Axiom Retail Group",
    initial: "R",
    imgSlug: "ramesh",
    palette: { bg: "#0d0e1f", border: "#6366f1", text: "#818cf8" },
  },
  {
    quote:
      "Professional, quick, and deeply creative. We handed them a half-baked brief and they turned it into an award-shortlisted campaign. Best agency decision we've made in five years.",
    name: "Neha M.",
    role: "Creative Director",
    company: "Studio Verve",
    initial: "N",
    imgSlug: "neha",
    palette: { bg: "#001a0e", border: "#34d399", text: "#6ee7b7" },
  },
  {
    quote:
      "The 3D architectural renders they produced were so accurate our clients thought they were photographs. The project closed two weeks early, directly because of the visualisations.",
    name: "Arjun T.",
    role: "Principal Architect",
    company: "T+A Design Studio",
    initial: "A",
    imgSlug: "arjun",
    palette: { bg: "#1a001a", border: "#c084fc", text: "#d8b4fe" },
  },
  {
    quote:
      "We hired them for SEO and ended up rebuilding our entire digital presence. Page-one rankings for seventeen target keywords within four months. Exceptional results, full stop.",
    name: "Kavitha R.",
    role: "VP Digital Strategy",
    company: "Meridian Finance",
    initial: "K",
    imgSlug: "kavitha",
    palette: { bg: "#001218", border: "#22d3ee", text: "#67e8f9" },
  },
  {
    quote:
      "From the first discovery call to the final handover, they were transparent, fast, and meticulous. The platform handles ten times our original traffic without a single incident.",
    name: "Siddharth V.",
    role: "CTO",
    company: "Orbis Logistics",
    initial: "S",
    imgSlug: "siddharth",
    palette: { bg: "#130a00", border: "#f59e0b", text: "#fcd34d" },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STATS DATA — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 150, suffix: "+",   label: "Projects delivered" },
  { value: 8,   suffix: "yrs", label: "Industry experience" },
  { value: 6,   suffix: "+",   label: "Countries served" },
  { value: 1,   suffix: "day", label: "Response guarantee" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HERO TICKER — new, mirrors the mechanism on Services/About/Partner/Careers
// ─────────────────────────────────────────────────────────────────────────────
const pipeline = [
  { cmd: "response_time", out: "< 24h" },
  { cmd: "consultation",  out: "100% free" },
  { cmd: "global_reach",  out: "india · usa · uk · uae · au" },
  { cmd: "contact_form",  out: "instant confirmation" },
  { cmd: "whatsapp",      out: "reply within minutes" },
  { cmd: "commitment",    out: "zero obligation" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS — unchanged
// ─────────────────────────────────────────────────────────────────────────────
const INTERVAL = 4000;
const TICK     = 50;
const total    = testimonials.length;

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER HOOK — unchanged
// ─────────────────────────────────────────────────────────────────────────────
function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function StatItem({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCounter(stat.value, 1400, active);
  return (
    <div className="ct-proof__stat">
      <dd className="ct-proof__num">
        {count}
        <span className="ct-proof__num-accent">{stat.suffix}</span>
      </dd>
      <dt className="ct-proof__label">{stat.label}</dt>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT COMPONENT
// Renders: Hero → Proof strip → Reach + Testimonials → CTA
// FAQ is intentionally excluded — see page.tsx for its placement below the form.
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPageClient() {
  const [cur, setCur]                 = useState(0);
  const [progress, setProgress]       = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const elapsedRef                    = useRef(0);
  const dirRef                        = useRef<1 | -1>(1);
  const proofRef                      = useRef<HTMLElement>(null);

  const goTo = (idx: number, dir: 1 | -1 = 1) => {
    dirRef.current     = dir;
    elapsedRef.current = 0;
    setProgress(0);
    setCur(((idx % total) + total) % total);
  };
  const goPrev = () => goTo(cur - 1, -1);
  const goNext = () => goTo(cur + 1,  1);

  // Auto-rotate testimonials
  useEffect(() => {
    const id = setInterval(() => {
      elapsedRef.current += TICK;
      setProgress(Math.min((elapsedRef.current / INTERVAL) * 100, 100));
      if (elapsedRef.current >= INTERVAL) {
        elapsedRef.current = 0;
        setProgress(0);
        dirRef.current = 1;
        setCur((c) => (c + 1) % total);
      }
    }, TICK);
    return () => clearInterval(id);
  }, []);

  // Fire stat counters when proof strip enters viewport
  useEffect(() => {
    if (!proofRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: 0.3 }
    );
    io.observe(proofRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .ct-hero,
        .ct-proof,
        .ct-reach,
        .ct-cta {
          --c-bg:       #060608;
          --c-surface:  #0c0c10;
          --c-surface2: #111118;
          --c-border:   rgba(255,255,255,0.06);
          --c-border2:  rgba(255,255,255,0.10);
          --c-orange:   #f97316;
          --c-orange2:  #fb923c;
          --c-indigo:   #6366f1;
          --c-muted:    rgba(255,255,255,0.42);
          --c-muted2:   rgba(255,255,255,0.22);
          --ff-serif:   'Cormorant Garamond', serif;
          --ff-sans:    'DM Sans', sans-serif;
        }

        .ct-hero {
          --ct-ink:#12141A; --ct-muted:#5B6172; --ct-paper:#F5F6F8; --ct-surface:#FFFFFF;
          --ct-line:#E4E6EC; --ct-blue:#2E5CFF; --ct-green:#37D67A;
        }
        .ct-cta {
          --ct-ink:#12141A; --ct-muted:#5B6172; --ct-surface:#FFFFFF;
          --ct-line:#E4E6EC; --ct-blue:#2E5CFF;
        }

        .sr-only {
          position:absolute!important;width:1px!important;height:1px!important;
          padding:0!important;margin:-1px!important;overflow:hidden!important;
          clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;
        }

        body::before {
          content:'';position:fixed;inset:0;z-index:9998;pointer-events:none;opacity:.028;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat:repeat;background-size:128px;
        }

        /* ══ HERO — same mechanism as Services/About/Partner/Careers ══════ */
        .ct-hero {
          position:relative;height:100vh;width:100%;
          display:flex;flex-direction:column;
          background:
            linear-gradient(90deg, rgba(6,6,8,.94) 0%, rgba(6,6,8,.78) 38%, rgba(6,6,8,.42) 64%, rgba(6,6,8,.18) 100%),
            linear-gradient(180deg, rgba(6,6,8,.20) 0%, rgba(6,6,8,.10) 40%, rgba(6,6,8,.55) 100%),
            url('/images/contact/contact-hero-banner.jpg') center center / cover no-repeat;
          background-attachment:scroll;background-color:#060608;background-size:cover;
          overflow:hidden;
        }
        @supports (height: 100svh) { .ct-hero { height: 100svh; } }
        @supports (height: 100dvh) { .ct-hero { height: 100dvh; } }
        @media(max-width:960px){
          .ct-hero {
            background:
              linear-gradient(180deg, rgba(6,6,8,.60) 0%, rgba(6,6,8,.38) 38%, rgba(6,6,8,.82) 100%),
              linear-gradient(0deg, rgba(6,6,8,.30), rgba(6,6,8,.30)),
              url('/images/contact/contact-hero-banner.jpg') center center / cover no-repeat;
          }
        }
        .ct-hero__grain{position:absolute;inset:0;opacity:.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px 180px;}
        .ct-corner{position:absolute;width:32px;height:32px;z-index:5;opacity:.2;pointer-events:none;}
        .ct-corner--tl{top:28px;left:28px;border-top:1px solid var(--ct-blue);border-left:1px solid var(--ct-blue);}
        .ct-corner--tr{top:28px;right:28px;border-top:1px solid var(--ct-blue);border-right:1px solid var(--ct-blue);}
        .ct-corner--bl{bottom:120px;left:28px;border-bottom:1px solid var(--ct-blue);border-left:1px solid var(--ct-blue);}
        .ct-corner--br{bottom:72px;right:28px;border-bottom:1px solid var(--ct-blue);border-right:1px solid var(--ct-blue);}

        .ct-hero__inner{
          position:relative;z-index:10;flex:1 1 auto;min-height:0;
          display:flex;align-items:center;overflow:hidden;
          max-width:1280px;margin:0 auto;width:100%;
          padding:9rem 1.5rem 1.5rem;
          padding-top:max(9rem, calc(env(safe-area-inset-top) + 7rem));
          box-sizing:border-box;
        }
        @media(max-width:960px){ .ct-hero__inner{ padding:7rem 1.25rem 1.25rem; padding-top:max(7rem, calc(env(safe-area-inset-top) + 5.5rem)); } }
        @media(max-width:640px){ .ct-hero__inner{ padding:6.5rem 1rem 1rem; padding-top:max(6.5rem, calc(env(safe-area-inset-top) + 5rem)); } }
        @media(max-width:380px){ .ct-hero__inner{ padding:5.75rem .85rem .85rem; padding-top:max(5.75rem, calc(env(safe-area-inset-top) + 4.5rem)); } }
        @media(max-height:520px){
          .ct-hero__inner{ padding-top:4.25rem; padding-bottom:.75rem; }
          .ct-hero__eyebrow{ margin-bottom:1.1rem; }
          .ct-hero__h1{ margin-bottom:.7rem; font-size:clamp(1.4rem,4.2vh,2.3rem); }
          .ct-hero__rule{ margin-bottom:.8rem; }
          .ct-hero__sub{ margin-bottom:1.2rem; }
        }

        .ct-hero__content{animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) both;text-align:left;padding-left:1.5rem;padding-top:.4rem;max-width:680px;}
        @keyframes ctFadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:960px){.ct-hero__content{text-align:center;padding-left:0;margin:0 auto;}}

        .ct-hero__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--c-orange);border:1px solid rgba(249,115,22,.28);background:rgba(249,115,22,.08);padding:6px 18px;border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(8px);animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both;}
        .ct-hero__dot{width:5px;height:5px;border-radius:50%;background:var(--c-orange);animation:ctPulse 2s ease-in-out infinite;}
        @keyframes ctPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
        .ct-hero__h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3.4vw,2.7rem);font-weight:700;line-height:1.14;letter-spacing:-.02em;color:#fff;margin:0 0 1.1rem;animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) .18s both;text-shadow:0 2px 24px rgba(0,0,0,.45);}
        .ct-hero__h1 em{font-style:normal;color:var(--ct-blue);}
        .ct-hero__h1 strong{font-weight:inherit;color:inherit;}
        .ct-hero__rule{width:44px;height:1px;background:linear-gradient(90deg,var(--ct-blue),transparent);margin:0 0 1.4rem;animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) .26s both;}
        @media(max-width:960px){.ct-hero__rule{margin:0 auto 1.4rem;background:linear-gradient(90deg,transparent,var(--ct-blue),transparent);}}
        .ct-hero__sub{font-family:'Inter',sans-serif;font-size:clamp(.92rem,1.6vw,1.05rem);font-weight:300;line-height:1.8;color:rgba(255,255,255,0.78);max-width:560px;margin:0 0 2.6rem;animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) .34s both;text-shadow:0 1px 12px rgba(0,0,0,.4);}
        @media(max-width:960px){.ct-hero__sub{margin:0 auto 2.6rem;}}
        .ct-hero__actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;}
        @media(max-width:960px){.ct-hero__actions{justify-content:center;}}
        .ct-hero__cta{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#060608;background:linear-gradient(135deg,#6a8bff,var(--ct-blue));padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 8px 32px rgba(46,92,255,.35);transition:transform .2s ease,box-shadow .2s ease;}
        .ct-hero__cta:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(46,92,255,.5);}
        .ct-hero__link{display:inline-flex;align-items:center;gap:8px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);padding:13px 28px;border-radius:10px;text-decoration:none;transition:background .2s ease,border-color .2s ease;}
        .ct-hero__link:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.45);}
        .ct-hero__link svg{transition:transform .2s ease;}
        .ct-hero__link:hover svg{transform:translateX(3px);}

        .ct-hero__ticker-bar{
          position:relative;z-index:12;flex:0 0 auto;
          background:linear-gradient(180deg, rgba(6,6,8,0) 0%, rgba(6,6,8,.55) 45%, rgba(6,6,8,.9) 100%);
          padding-top:1.5rem;
          padding-bottom:max(.75rem, env(safe-area-inset-bottom));
        }
        .ct-ticker{overflow:hidden;width:100%;padding:clamp(.6rem,1.6vw,.85rem) 0 .25rem;}
        .ct-ticker__track{display:flex;gap:clamp(1.25rem,3.5vw,2.5rem);width:max-content;animation:ctScroll 34s linear infinite;}
        .ct-hero__ticker-bar:hover .ct-ticker__track{animation-play-state:paused;}
        @media(max-width:640px){ .ct-ticker__track{ animation-duration:22s; } }
        @keyframes ctScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .ct-ticker__item{display:flex;align-items:center;gap:.4rem;font-family:'IBM Plex Mono',monospace;font-size:clamp(.68rem,1.8vw,.8rem);color:rgba(255,255,255,.65);white-space:nowrap;}
        .ct-ticker__item b{color:rgba(255,255,255,.45);}
        .ct-ticker__pass{color:var(--ct-green);}
        @media(max-height:520px){ .ct-hero__ticker-bar{ padding-top:.75rem; } }

        /* ══ PROOF STRIP — unchanged ════════════════════════════════════════ */
        .ct-proof {
          position:relative;background:var(--c-surface);
          border-top:1px solid var(--c-border);border-bottom:1px solid var(--c-border);overflow:hidden;
        }
        .ct-proof::before {
          content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);
          width:700px;height:200px;border-radius:50%;
          background:radial-gradient(ellipse at center,rgba(249,115,22,.07) 0%,transparent 70%);
          pointer-events:none;
        }
        .ct-proof__inner {
          max-width:1180px;margin:0 auto;padding:0 4rem;
          display:grid;grid-template-columns:1fr auto;align-items:center;gap:3rem;
        }
        .ct-proof__stats {display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:3.5rem 0;margin:0;}
        .ct-proof__stat {
          padding:2rem 2.4rem;border-right:1px solid var(--c-border);
          position:relative;transition:background .3s ease;cursor:default;
        }
        .ct-proof__stat:first-child{padding-left:0;}
        .ct-proof__stat:last-child{border-right:none;}
        .ct-proof__stat:hover{background:rgba(249,115,22,.03);}
        .ct-proof__num {
          font-family:var(--ff-serif);font-size:clamp(2rem,3.5vw,3rem);font-weight:700;
          line-height:1;color:#fff;display:flex;align-items:baseline;gap:3px;margin-bottom:.5rem;
          margin-left:0;
        }
        .ct-proof__num-accent{font-size:.55em;color:var(--c-orange);font-weight:600;font-family:var(--ff-sans);}
        .ct-proof__label{font-family:var(--ff-sans);font-size:10.5px;font-weight:400;letter-spacing:.14em;text-transform:uppercase;color:var(--c-muted2);line-height:1.5;}
        .ct-proof__stat::after {
          content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
          background:linear-gradient(90deg,var(--c-orange),transparent);
          transform:scaleX(0);transform-origin:left;transition:transform .3s ease;
        }
        .ct-proof__stat:hover::after{transform:scaleX(1);}
        .ct-proof__tagline{padding:2rem 0 2rem 3rem;border-left:1px solid var(--c-border);min-width:200px;max-width:220px;flex-shrink:0;}
        .ct-proof__tagline-text{font-family:var(--ff-serif);font-size:1.4rem;font-weight:300;font-style:italic;color:rgba(255,255,255,.65);line-height:1.5;margin-bottom:.8rem;}
        .ct-proof__tagline-sub{font-family:var(--ff-sans);font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-orange);}

        /* ══ REACH SECTION — unchanged ══════════════════════════════════════ */
        .ct-reach {position:relative;background:var(--c-bg);padding:6rem 0;overflow:hidden;}
        .ct-reach::before {
          content:'';position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px);
          background-size:60px 60px;pointer-events:none;
        }
        .ct-reach__inner{max-width:1180px;margin:0 auto;padding:0 4rem;}
        .ct-reach__header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;gap:2rem;}
        .ct-reach__kicker{font-family:var(--ff-sans);font-size:9px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:var(--c-orange);margin-bottom:.7rem;}
        .ct-reach__title{font-family:var(--ff-serif);font-size:clamp(1.8rem,3vw,2.6rem);font-weight:600;line-height:1.15;color:#fff;letter-spacing:-.02em;}
        .ct-reach__title em{font-style:italic;font-weight:300;color:rgba(255,255,255,.55);}
        .ct-reach__rule{width:1px;height:60px;background:linear-gradient(to bottom,var(--c-orange),transparent);flex-shrink:0;opacity:.5;}
        .ct-reach__layout{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:stretch;}

        /* ══ TESTIMONIALS — unchanged ═══════════════════════════════════════ */
        .ct-testi {
          position:relative;overflow:hidden;display:flex;flex-direction:column;
          background:#09090c;border:1px solid rgba(255,255,255,0.07);border-radius:20px;
          min-height:420px;
        }
        .ct-testi__masthead {
          display:flex;align-items:center;justify-content:space-between;
          padding:18px 28px;border-bottom:1px solid rgba(255,255,255,.06);
          background:rgba(255,255,255,.02);flex-shrink:0;
        }
        .ct-testi__masthead-title {
          font-family:var(--ff-serif);font-size:11px;font-weight:700;
          letter-spacing:.32em;text-transform:uppercase;color:var(--c-orange);
        }
        .ct-testi__masthead-rule {
          flex:1;height:1px;margin:0 16px;
          background:linear-gradient(90deg,rgba(249,115,22,.3),transparent);
        }
        .ct-testi__masthead-issue {
          font-family:var(--ff-sans);font-size:9px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.25);
        }
        .ct-testi__stage {
          flex:1;
          display:grid;
          grid-template-rows:1fr;
          grid-template-columns:1fr;
          overflow:hidden;
          position:relative;
          min-height:240px;
        }
        .ct-testi__card {
          grid-row:1;
          grid-column:1;
          display:grid;
          grid-template-columns:1fr 88px;
          padding:28px 24px 20px;
          gap:0;
          transition:opacity .55s cubic-bezier(.4,0,.2,1),transform .55s cubic-bezier(.4,0,.2,1);
          will-change:opacity,transform;
          z-index:1;
        }
        .ct-testi__card[aria-hidden="false"] { z-index:2; }
        .ct-testi__quote-col {
          display:flex;flex-direction:column;justify-content:space-between;
          min-width:0;padding-right:20px;
        }
        .ct-testi__open-mark {
          font-family:var(--ff-serif);font-size:4.5rem;line-height:.6;
          font-weight:700;color:var(--c-orange);opacity:.16;
          margin-bottom:6px;user-select:none;flex-shrink:0;
        }
        .ct-testi__quote {
          font-family:var(--ff-serif);
          font-size:clamp(1rem,1.45vw,1.22rem);
          font-weight:300;font-style:italic;
          line-height:1.7;
          color:rgba(255,255,255,.88);
          margin:0;flex:1;
        }
        .ct-testi__stars {
          display:flex;gap:3px;margin-top:18px;flex-shrink:0;
        }
        .ct-testi__star { color:#f59e0b;font-size:12px; }
        .ct-testi__author-col {
          display:flex;flex-direction:column;align-items:center;
          gap:12px;width:88px;flex-shrink:0;
          border-left:1px solid rgba(255,255,255,.07);
          padding-left:20px;
        }
        .ct-testi__avatar-wrap {
          position:relative;
          width:56px;
          height:56px;
          flex-shrink:0;
        }
        .ct-testi__avatar-wrap::before {
          content:'';
          position:absolute;
          inset:-3px;
          border-radius:50%;
          background:conic-gradient(var(--avatar-ring, #f97316) 0deg 270deg, transparent 270deg);
          z-index:0;
        }
        .ct-testi__avatar-wrap::after {
          content:'';
          position:absolute;
          inset:-1px;
          border-radius:50%;
          background:#09090c;
          z-index:1;
        }
        .ct-testi__avatar {
          position:relative;
          z-index:2;
          width:56px;
          height:56px;
          border-radius:50%;
          object-fit:cover;
          object-position:center top;
          display:block;
        }
        .ct-testi__avatar-fallback {
          position:absolute;
          inset:0;
          z-index:2;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          font-family:var(--ff-serif);
          font-size:1.5rem;
          font-weight:700;
        }
        .ct-testi__byline-wrap {
          display:flex;flex-direction:column;align-items:center;gap:6px;
          flex:1;width:100%;
        }
        .ct-testi__name {
          font-family:var(--ff-sans);font-size:10px;font-weight:600;
          letter-spacing:.06em;color:rgba(255,255,255,.82);
          writing-mode:vertical-rl;transform:rotate(180deg);
          white-space:nowrap;line-height:1;
        }
        .ct-testi__role-tag {
          font-family:var(--ff-sans);font-size:8px;font-weight:500;
          letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.3);
          writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;
        }
        .ct-testi__company {
          font-family:var(--ff-serif);font-size:8.5px;font-weight:600;
          letter-spacing:.12em;text-transform:uppercase;
          writing-mode:vertical-rl;transform:rotate(180deg);
          white-space:nowrap;margin-top:auto;
        }
        .ct-testi__footer {
          display:flex;align-items:center;justify-content:space-between;
          padding:14px 28px;border-top:1px solid rgba(255,255,255,.06);
          background:rgba(255,255,255,.018);flex-shrink:0;
          position:relative;overflow:hidden;
        }
        .ct-testi__progress-bar {
          position:absolute;top:0;left:0;height:2px;
          background:var(--c-orange);opacity:.5;
          transition:width .05s linear;
          pointer-events:none;
        }
        .ct-testi__pips { display:flex;gap:5px;align-items:center; }
        .ct-testi__pip {
          height:2px;border-radius:1px;
          background:rgba(255,255,255,.14);
          transition:width .4s cubic-bezier(.4,0,.2,1),background .4s;
        }
        .ct-testi__pip--on { background:var(--c-orange); }
        .ct-testi__nav { display:flex;gap:8px; }
        .ct-testi__nav-btn {
          width:30px;height:30px;border-radius:6px;border:1px solid rgba(255,255,255,.1);
          background:rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;
          cursor:pointer;color:rgba(255,255,255,.5);transition:all .18s ease;
          padding:0;outline:none;
        }
        .ct-testi__nav-btn:hover {
          border-color:var(--c-orange);color:var(--c-orange);
          background:rgba(249,115,22,.08);
        }

        /* ══ RIGHT HALF — unchanged ═════════════════════════════════════════ */
        .ct-reach__right{display:flex;flex-direction:column;gap:1.5rem;}
        .ct-reach__strip {
          display:flex;align-items:stretch;
          border:1px solid var(--c-border2);border-radius:14px;
          background:var(--c-surface);overflow:hidden;flex-shrink:0;
        }
        .ct-reach__strip-item {
          display:flex;align-items:center;gap:14px;flex:1;
          padding:1.6rem 1.8rem;text-decoration:none;color:inherit;
          transition:background .18s ease;position:relative;
        }
        .ct-reach__strip-item:hover{background:var(--c-surface2);}
        .ct-reach__strip-item::before{
          content:'';position:absolute;top:0;left:0;right:0;height:2px;
          background:transparent;transition:background .2s ease;
        }
        .ct-reach__strip-item:first-child::before{border-radius:14px 0 0 0;}
        .ct-reach__strip-item:last-child::before{border-radius:0 14px 0 0;}
        .ct-reach__strip-item:hover::before{background:linear-gradient(90deg,var(--c-orange),var(--c-indigo));}
        .ct-reach__strip-divider{width:1px;background:var(--c-border);align-self:stretch;flex-shrink:0;}
        .ct-reach__strip-icon {
          width:44px;height:44px;border-radius:12px;
          background:rgba(249,115,22,.10);border:1px solid rgba(249,115,22,.20);
          display:flex;align-items:center;justify-content:center;
          color:var(--c-orange);flex-shrink:0;
          transition:background .18s,border-color .18s;
        }
        .ct-reach__strip-item:hover .ct-reach__strip-icon{background:rgba(249,115,22,.18);border-color:rgba(249,115,22,.4);}
        .ct-reach__strip-label{font-family:var(--ff-sans);font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--c-muted2);display:block;margin-bottom:4px;}
        .ct-reach__strip-value{font-family:var(--ff-sans);font-size:.95rem;font-weight:500;color:#fff;display:block;line-height:1.3;}
        .ct-reach__commit {
          background:var(--c-surface);border:1px solid var(--c-border2);
          border-radius:14px;padding:2rem 2rem 1.8rem;flex:1;
          position:relative;overflow:hidden;
        }
        .ct-reach__commit::before{
          content:'';position:absolute;top:0;left:0;right:0;height:2px;
          background:linear-gradient(90deg,var(--c-orange),var(--c-indigo));
        }
        .ct-reach__commit-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.6rem;}
        .ct-reach__commit-title{font-family:var(--ff-serif);font-size:1.3rem;font-weight:600;color:#fff;line-height:1.2;}
        .ct-reach__badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--ff-sans);font-size:9px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#4ade80;background:rgba(74,222,128,.08);border:1px solid rgba(74,222,128,.2);padding:5px 12px;border-radius:100px;}
        .ct-reach__badge-dot{width:5px;height:5px;border-radius:50%;background:#4ade80;animation:ctPulse 2s ease-in-out infinite;}
        .ct-reach__commit-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.7rem;}
        .ct-reach__commit-item{display:flex;align-items:flex-start;gap:10px;font-family:var(--ff-sans);font-size:.875rem;color:var(--c-muted);line-height:1.45;}
        .ct-reach__commit-check{color:#4ade80;flex-shrink:0;margin-top:1px;}
        .ct-reach__commit-item strong{color:rgba(255,255,255,.85);font-weight:500;display:block;}
        .ct-reach__commit-sub{font-size:.76rem;color:var(--c-muted2);display:block;}
        .ct-reach__location{
          display:flex;align-items:center;gap:10px;margin-top:1.4rem;
          padding-top:1.4rem;border-top:1px solid var(--c-border);
        }
        .ct-reach__location-icon{color:var(--c-orange);flex-shrink:0;}
        .ct-reach__location-text{font-family:var(--ff-sans);font-size:.8rem;color:var(--c-muted2);line-height:1.5;}
        .ct-reach__location-text strong{color:rgba(255,255,255,.7);font-weight:500;}

        /* ══ CTA SECTION — matches Services .sv-cta exactly ════════════════ */
        .ct-cta{background:var(--ct-surface);border-top:1px solid var(--ct-line);padding:6rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .ct-cta__orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,var(--ct-blue),transparent 70%);opacity:.05;top:50%;left:50%;transform:translate(-50%,-50%);filter:blur(70px);pointer-events:none;}
        .ct-cta__content{position:relative;z-index:10;max-width:580px;margin:0 auto;}
        .ct-cta__eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.06em;color:var(--ct-blue);margin-bottom:1.2rem;display:block;}
        .ct-cta__h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.8rem,4.5vw,2.8rem);font-weight:700;line-height:1.18;letter-spacing:-.015em;color:var(--ct-ink);margin:0 0 1rem;}
        .ct-cta__h2 em{font-style:normal;color:var(--ct-blue);}
        .ct-cta__sub{font-family:'Inter',sans-serif;font-size:.95rem;font-weight:300;line-height:1.8;color:var(--ct-muted);margin-bottom:2.6rem;}
        .ct-cta__btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;color:#fff;background:var(--ct-ink);padding:14px 32px;border-radius:10px;text-decoration:none;transition:transform .2s ease,background .2s ease;}
        .ct-cta__btn:hover{background:var(--ct-blue);transform:translateY(-2px);}

        /* ══ RESPONSIVE ════════════════════════════════════════════════════ */
        @media (max-width:1000px) {
          .ct-proof__tagline{display:none;}
          .ct-proof__inner{grid-template-columns:1fr;padding:0 2rem;}
        }
        @media (max-width:900px) {
          .ct-proof__stats{grid-template-columns:repeat(2,1fr);padding:2rem 0;}
          .ct-proof__stat{border-right:none;border-bottom:1px solid var(--c-border);padding:1.6rem 1.4rem;}
          .ct-proof__stat:nth-child(odd){border-right:1px solid var(--c-border);}
          .ct-proof__stat:nth-last-child(-n+2){border-bottom:none;}
          .ct-reach__layout{grid-template-columns:1fr;}
          .ct-reach__inner{padding:0 2.5rem;}
        }
        @media (max-width:768px) {
          .ct-reach__header{flex-direction:column;align-items:flex-start;}
          .ct-reach__rule{display:none;}
          .ct-reach__inner{padding:0 1.5rem;}
          .ct-reach{padding:4rem 0;}
          .ct-proof__inner{padding:0 1.5rem;}
          .ct-proof__stats{padding:2rem 0;}

          .ct-testi{min-height:auto;}
          .ct-testi__masthead{padding:14px 18px;}
          .ct-testi__footer{padding:12px 18px;}

          .ct-testi__card {
            grid-template-columns:1fr;
            grid-template-rows:1fr auto;
            padding:20px 18px 14px;
          }
          .ct-testi__quote-col { padding-right:0; }

          .ct-testi__author-col {
            flex-direction:row;
            width:100%;
            border-left:none;
            border-top:1px solid rgba(255,255,255,.07);
            padding-left:0;
            padding-top:14px;
            gap:12px;
            align-items:center;
          }
          .ct-testi__byline-wrap {
            flex-direction:row;
            align-items:center;
            gap:8px;
            flex:1;
            flex-wrap:wrap;
          }
          .ct-testi__name {
            writing-mode:horizontal-tb;
            transform:none;
            font-size:11px;
          }
          .ct-testi__role-tag {
            writing-mode:horizontal-tb;
            transform:none;
          }
          .ct-testi__company {
            writing-mode:horizontal-tb;
            transform:none;
            margin-top:0;
          }
          .ct-testi__avatar-wrap { width:46px; height:46px; }
          .ct-testi__avatar      { width:46px; height:46px; }

          .ct-reach__strip{flex-direction:column;}
          .ct-reach__strip-divider{width:auto;height:1px;}
        }
        @media(max-width:480px){.ct-hero__actions{flex-direction:column;align-items:stretch;}.ct-hero__cta,.ct-hero__link{justify-content:center;}}

        @media (prefers-reduced-motion:reduce) {
          *,*::before,*::after{
            animation-duration:.01ms!important;
            animation-iteration-count:1!important;
            transition-duration:.01ms!important;
          }
        }
      `}</style>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        className="ct-hero"
        aria-labelledby="ct-hero-heading"
        id="contact-hero"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        <div aria-hidden="true">
          <div className="ct-hero__grain" />
        </div>
        <div className="ct-corner ct-corner--tl" aria-hidden="true" />
        <div className="ct-corner ct-corner--tr" aria-hidden="true" />
        <div className="ct-corner ct-corner--bl" aria-hidden="true" />
        <div className="ct-corner ct-corner--br" aria-hidden="true" />

        <nav className="sr-only" aria-label="Breadcrumb" aria-hidden="true">
          <ol itemScope itemType="https://schema.org/BreadcrumbList" style={{ listStyle:"none", margin:0, padding:0 }}>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item"><span itemProp="name">Home</span></a>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              <a href="/contact" itemProp="item" aria-current="page"><span itemProp="name">Contact</span></a>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <div className="ct-hero__inner">
          <div className="ct-hero__content">
            <div className="ct-hero__eyebrow" aria-hidden="true">
              <span className="ct-hero__dot" />
              Free Consultation · No Commitment
            </div>
            <h1 className="ct-hero__h1" id="ct-hero-heading" itemProp="name">
              Your vision deserves a<br />
              <em>digital partner</em> who delivers.
            </h1>
            <div className="ct-hero__rule" aria-hidden="true" />
            <p className="ct-hero__sub" itemProp="description">
              Tell us about your project — we respond within 24 hours with a
              clear plan, honest pricing, and zero fluff. Bangalore&apos;s most
              trusted web, 3D &amp; marketing studio is one message away.
            </p>
            <div className="ct-hero__actions">
              <a href="#contact-form" className="ct-hero__cta" aria-label="Get your free quote — scroll to the contact form">
                Get Your Free Quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="mailto:info@99visual.com" className="ct-hero__link">
                Email us directly
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="ct-hero__ticker-bar" aria-hidden="true">
          <div className="ct-ticker">
            <div className="ct-ticker__track">
              {[...pipeline, ...pipeline].map((p, i) => (
                <span className="ct-ticker__item" key={i}>
                  <b>$</b> {p.cmd} <span className="ct-ticker__pass">→ {p.out} ✓</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROOF STRIP — unchanged ═════════════════════════════════════════ */}
      <section className="ct-proof" aria-label="Company highlights" ref={proofRef}>
        <div className="ct-proof__inner">
          <dl className="ct-proof__stats" aria-label="Key company statistics">
            {STATS.map((s) => (
              <StatItem key={s.label} stat={s} active={statsActive} />
            ))}
          </dl>
          <div className="ct-proof__tagline">
            <p className="ct-proof__tagline-text">&ldquo;Results you can measure, design you&apos;ll love.&rdquo;</p>
            <p className="ct-proof__tagline-sub">— 99 Visual Solutions, Bangalore</p>
          </div>
        </div>
      </section>

      {/* ══ REACH + TESTIMONIALS — unchanged ════════════════════════════════ */}
      <section className="ct-reach" aria-label="Contact information and client testimonials">
        <div className="ct-reach__inner">
          <div className="ct-reach__header">
            <div>
              <p className="ct-reach__kicker">Reach us instantly</p>
              <h2 className="ct-reach__title">The right team is<br /><em>one message away</em></h2>
            </div>
            <div className="ct-reach__rule" aria-hidden="true" />
          </div>

          <div className="ct-reach__layout">
            {/* LEFT — Testimonials */}
            <div className="ct-testi" aria-label="Client testimonials">
              <div className="ct-testi__masthead">
                <span className="ct-testi__masthead-title">Client Voices</span>
                <div className="ct-testi__masthead-rule" aria-hidden="true" />
                <span
                  className="ct-testi__masthead-issue"
                  aria-label={`Testimonial ${cur + 1} of ${testimonials.length}`}
                >
                  {String(cur + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              <div className="ct-testi__stage" aria-live="polite">
                {testimonials.map((t, i) => {
                  const isActive = i === cur;
                  const offsetX  = isActive ? 0 : dirRef.current * 32;
                  const style: React.CSSProperties = {
                    opacity:       isActive ? 1 : 0,
                    transform:     isActive
                      ? "translateX(0) scale(1)"
                      : `translateX(${offsetX}px) scale(0.97)`,
                    pointerEvents: isActive ? "auto" : "none",
                    zIndex:        isActive ? 2 : 1,
                  };
                  return (
                    <div
                      key={i}
                      className="ct-testi__card"
                      style={style}
                      aria-hidden={!isActive}
                    >
                      <div className="ct-testi__quote-col">
                        <div>
                          <div className="ct-testi__open-mark" aria-hidden="true">&ldquo;</div>
                          <p className="ct-testi__quote">{t.quote}</p>
                        </div>
                        <div className="ct-testi__stars" aria-label="5 out of 5 stars">
                          {[...Array(5)].map((_, s) => (
                            <span key={s} className="ct-testi__star">★</span>
                          ))}
                        </div>
                      </div>

                      <div className="ct-testi__author-col">
                        <div
                          className="ct-testi__avatar-wrap"
                          style={{ "--avatar-ring": t.palette.border } as React.CSSProperties}
                          aria-hidden="true"
                        >
                          <img
                            src={`/images/clientvoice/${t.imgSlug}.png`}
                            alt={t.name}
                            className="ct-testi__avatar"
                            width={56}
                            height={56}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                              const fallback = (e.currentTarget as HTMLImageElement)
                                .nextElementSibling as HTMLElement | null;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                          <div
                            className="ct-testi__avatar-fallback"
                            style={{ display: "none", background: t.palette.bg, color: t.palette.text }}
                            aria-hidden="true"
                          >
                            {t.initial}
                          </div>
                        </div>

                        <div className="ct-testi__byline-wrap">
                          <span className="ct-testi__name">{t.name}</span>
                          <span className="ct-testi__role-tag">{t.role}</span>
                          <span className="ct-testi__company" style={{ color: t.palette.text }}>
                            {t.company}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="ct-testi__footer">
                <div className="ct-testi__progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />
                <div className="ct-testi__pips" aria-hidden="true">
                  {testimonials.map((_, i) => (
                    <div
                      key={i}
                      className={`ct-testi__pip${i === cur ? " ct-testi__pip--on" : ""}`}
                      style={{ width: i === cur ? 28 : 12 }}
                    />
                  ))}
                </div>
                <div className="ct-testi__nav" role="group" aria-label="Testimonial navigation">
                  <button className="ct-testi__nav-btn" onClick={goPrev} aria-label="Previous testimonial">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M7.5 2L3.5 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="ct-testi__nav-btn" onClick={goNext} aria-label="Next testimonial">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M4.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT — contact strip + commitment card */}
            <div className="ct-reach__right">
              <div className="ct-reach__strip" role="list">
                <a
                  className="ct-reach__strip-item"
                  href="mailto:info@99visual.com"
                  aria-label="Email us at info@99visual.com"
                  role="listitem"
                >
                  <div className="ct-reach__strip-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="4" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M2 6l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="ct-reach__strip-label">Electronic mail</span>
                    <span className="ct-reach__strip-value">info@99visual.com</span>
                  </div>
                </a>
                <div className="ct-reach__strip-divider" aria-hidden="true" />
                <a
                  className="ct-reach__strip-item"
                  href="tel:+919205737431"
                  aria-label="Call us at +91 92057 37431"
                  role="listitem"
                >
                  <div className="ct-reach__strip-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6.3 3H4a1 1 0 00-1 1c0 7.18 5.82 13 13 13a1 1 0 001-1v-2.3a1 1 0 00-.68-.95l-2.64-.88a1 1 0 00-1.04.24L11.9 13.8a10.08 10.08 0 01-5.7-5.7l1.7-1.74a1 1 0 00.23-1.04L7.25 3.68A1 1 0 006.3 3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="ct-reach__strip-label">Direct line</span>
                    <span className="ct-reach__strip-value">+91 92057 37431</span>
                  </div>
                </a>
              </div>

              <div className="ct-reach__commit">
                <div className="ct-reach__commit-head">
                  <h3 className="ct-reach__commit-title">Our promise to you</h3>
                  <span className="ct-reach__badge">
                    <span className="ct-reach__badge-dot" />
                    Available now
                  </span>
                </div>
                <ul className="ct-reach__commit-list" aria-label="Response commitments">
                  {([
                    ["Within 24 hours",          "All form & email enquiries"],
                    ["Instant WhatsApp reply",   "Fastest way to reach us"],
                    ["Free initial consultation","No commitment, no pressure"],
                    ["India · USA · UK · UAE · AU","Clients served globally"],
                  ] as [string, string][]).map(([strong, sub]) => (
                    <li key={strong} className="ct-reach__commit-item">
                      <svg
                        width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="ct-reach__commit-check"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>
                        <strong>{strong}</strong>
                        <span className="ct-reach__commit-sub">{sub}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="ct-reach__location">
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="ct-reach__location-icon"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <p className="ct-reach__location-text">
                    Based in <strong>Bengaluru, Karnataka, India</strong> · Serving clients worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA SECTION ═════════════════════════════════════════════════════ */}
      <section className="ct-cta" aria-labelledby="ct-cta-heading">
        <div className="ct-cta__orb" aria-hidden="true" />
        <div className="ct-cta__content">
          <span className="ct-cta__eyebrow">Let's Talk</span>
          <h2 className="ct-cta__h2" id="ct-cta-heading">
            Ready to start your<br /><em>next project?</em>
          </h2>
          <p className="ct-cta__sub">
            From a quick website refresh to a full digital transformation — our
            team is ready to listen, plan, and deliver. No fluff, no long
            contracts, just results.
          </p>
          <a
            href="#contact-form"
            className="ct-cta__btn"
            aria-label="Scroll to the contact form to send us a message"
          >
            Send Us a Message
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/*
        ══ FAQ REMOVED FROM HERE ══════════════════════════════════════════════
        FAQ is now rendered in page.tsx, directly below <ContactForm />.
        See: app/contact/page.tsx → <section id="faq" className="ct-faq-standalone">
      */}
    </>
  );
}