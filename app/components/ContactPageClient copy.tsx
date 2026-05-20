// app/contact/ContactPageClient.tsx  — CLIENT COMPONENT
"use client";

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS DATA
// ─────────────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "99 Visual transformed our website into a powerful business tool that actually converts.",
    name: "Priya S.",
    role: "Tech Startup Founder",
    initials: "PS",
    accent: "linear-gradient(135deg,#f97316,#ea580c)",
  },
  {
    quote: "Excellent support and modern design. The team genuinely cares about the outcome.",
    name: "Ramesh K.",
    role: "Marketing Manager",
    initials: "RK",
    accent: "linear-gradient(135deg,#6366f1,#4338ca)",
  },
  {
    quote: "Professional, quick, and deeply creative. Best agency decision we've made.",
    name: "Neha M.",
    role: "Retail Business Owner",
    initials: "NM",
    accent: "linear-gradient(135deg,#34d399,#065f46)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STATS DATA
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 150, suffix: "+", label: "Projects delivered" },
  { value: 8,   suffix: "yrs", label: "Industry experience" },
  { value: 6,   suffix: "+", label: "Countries served" },
  { value: 1,   suffix: "day", label: "Response guarantee" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const INTERVAL = 4000;
const TICK     = 50;
const total    = testimonials.length;

type CardState = "active" | "prev" | "next" | "behind";

const cardStyles: Record<CardState, React.CSSProperties> = {
  active: { opacity: 1, transform: "translateX(0) scale(1)",        zIndex: 3 },
  prev:   { opacity: 0, transform: "translateX(-60px) scale(0.96)", zIndex: 1, pointerEvents: "none" },
  next:   { opacity: 0, transform: "translateX(60px) scale(0.96)",  zIndex: 1, pointerEvents: "none" },
  behind: { opacity: 0, transform: "scale(0.9)",                    zIndex: 0, pointerEvents: "none" },
};

function getState(i: number, cur: number): CardState {
  if (i === cur)     return "active";
  if (i === cur - 1) return "prev";
  if (i === cur + 1) return "next";
  return "behind";
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER HOOK
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
      <div className="ct-proof__num">
        {count}
        <span className="ct-proof__num-accent">{stat.suffix}</span>
      </div>
      <div className="ct-proof__label">{stat.label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPageClient() {
  const [cur, setCur]           = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const elapsedRef              = useRef(0);
  const proofRef                = useRef<HTMLElement>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const id = setInterval(() => {
      elapsedRef.current += TICK;
      if (elapsedRef.current >= INTERVAL) {
        elapsedRef.current = 0;
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
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

        /* ══ HERO ══════════════════════════════════════════════════════════ */
        .ct-hero {
          position:relative;min-height:100vh;display:flex;flex-direction:row;
          align-items:center;background:var(--c-bg);overflow:hidden;
          max-width:1440px;margin:0 auto;
        }
        .ct-hero__grid {
          position:absolute;inset:0;pointer-events:none;
          background-image:linear-gradient(rgba(255,255,255,.014) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.014) 1px,transparent 1px);
          background-size:60px 60px;
        }
        .ct-hero__orb {
          position:absolute;bottom:-180px;right:-100px;width:640px;height:640px;border-radius:50%;
          background:radial-gradient(circle at 42% 42%,rgba(99,102,241,.18) 0%,rgba(249,115,22,.10) 38%,transparent 70%);
          filter:blur(72px);pointer-events:none;animation:ctOrbDrift 12s ease-in-out infinite alternate;
        }
        @keyframes ctOrbDrift {
          0%  {transform:translate(0,0) scale(1);}
          50% {transform:translate(-40px,-28px) scale(1.06);}
          100%{transform:translate(20px,18px) scale(.96);}
        }
        .ct-hero__orb2 {
          position:absolute;top:-120px;left:-80px;width:480px;height:480px;border-radius:50%;
          background:radial-gradient(circle at 50% 50%,rgba(249,115,22,.09) 0%,transparent 65%);
          filter:blur(60px);pointer-events:none;animation:ctOrbDrift2 16s ease-in-out infinite alternate;
        }
        @keyframes ctOrbDrift2 {
          0%  {transform:translate(0,0) scale(1);}
          100%{transform:translate(30px,40px) scale(1.08);}
        }
        .ct-hero__hairline {
          position:absolute;left:0;right:0;bottom:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(249,115,22,.22) 30%,rgba(99,102,241,.22) 70%,transparent);
          pointer-events:none;
        }

        /* left column */
        .ct-hero__left {
          position:relative;z-index:10;flex:1 1 360px;
          padding:7rem 3rem 7rem 7rem;display:flex;flex-direction:column;align-items:flex-start;
        }
        .ct-hero__eyebrow {
          display:inline-flex;align-items:center;gap:8px;font-family:var(--ff-sans);font-size:9.5px;
          font-weight:500;letter-spacing:.26em;text-transform:uppercase;color:var(--c-orange);
          border:1px solid rgba(249,115,22,.24);background:rgba(249,115,22,.06);padding:7px 18px;
          border-radius:100px;margin-bottom:2rem;backdrop-filter:blur(12px);
          animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        .ct-hero__dot {
          width:5px;height:5px;border-radius:50%;background:var(--c-orange);
          animation:ctPulse 2s ease-in-out infinite;
        }
        @keyframes ctPulse {
          0%,100%{opacity:1;transform:scale(1);}
          50%{opacity:.3;transform:scale(.6);}
        }
        .ct-hero__h1 {
          font-family:var(--ff-serif);font-size:clamp(2rem,4.5vw,3.8rem);font-weight:700;
          line-height:1.1;letter-spacing:-.02em;color:#fff;margin:0 0 1rem;
          animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) .12s both;
        }
        .ct-hero__h1 em {font-style:italic;font-weight:300;color:var(--c-orange);-webkit-text-stroke:0;}
        .ct-hero__h1 strong {font-weight:inherit;color:inherit;}
        .ct-hero__rule {
          display:flex;align-items:center;gap:12px;margin:0 0 1.6rem;
          animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) .22s both;
        }
        .ct-hero__rule-line {width:56px;height:1px;background:linear-gradient(90deg,var(--c-orange),transparent);}
        .ct-hero__rule-diamond {width:5px;height:5px;background:var(--c-orange);transform:rotate(45deg);opacity:.6;}
        .ct-hero__sub {
          font-family:var(--ff-sans);font-size:clamp(.95rem,1.7vw,1.08rem);font-weight:300;
          line-height:1.85;color:var(--c-muted);max-width:400px;margin:0 0 2.8rem;
          animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) .32s both;
        }
        .ct-hero__cta {
          display:inline-flex;align-items:center;gap:12px;font-family:var(--ff-sans);
          font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
          color:#060608;background:linear-gradient(135deg,#fb923c 0%,#f97316 60%,#ea580c 100%);
          padding:15px 38px;border-radius:100px;text-decoration:none;
          box-shadow:0 8px 40px rgba(249,115,22,.38),0 2px 8px rgba(0,0,0,.4);
          transition:transform .24s ease,box-shadow .24s ease;
          animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) .44s both;
          position:relative;overflow:hidden;
        }
        .ct-hero__cta::before {
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,.18),transparent);
          border-radius:inherit;opacity:0;transition:opacity .24s ease;
        }
        .ct-hero__cta:hover::before {opacity:1;}
        .ct-hero__cta:hover {transform:translateY(-3px) scale(1.03);box-shadow:0 18px 52px rgba(249,115,22,.55),0 4px 12px rgba(0,0,0,.4);}
        .ct-hero__link {
          margin-top:1.2rem;font-family:var(--ff-sans);font-size:11px;font-weight:400;
          letter-spacing:.08em;color:var(--c-muted2);text-decoration:none;
          display:inline-flex;align-items:center;gap:6px;transition:color .2s ease;
          animation:ctFadeUp .9s cubic-bezier(.22,1,.36,1) .56s both;
        }
        .ct-hero__link:hover {color:rgba(255,255,255,.6);}
        .ct-hero__link svg {transition:transform .2s ease;}
        .ct-hero__link:hover svg {transform:translateX(3px);}
        @keyframes ctFadeUp {
          from{opacity:0;transform:translateY(28px);}
          to{opacity:1;transform:translateY(0);}
        }

        /* right column */
        .ct-hero__right {
          flex:0 0 480px;height:100vh;min-height:580px;position:relative;
          display:flex;align-items:center;justify-content:center;overflow:visible;
        }
        .ct-hero__right::before {
          content:'';position:absolute;left:0;top:15%;bottom:15%;width:1px;
          background:linear-gradient(to bottom,transparent,rgba(255,255,255,.06) 30%,rgba(255,255,255,.06) 70%,transparent);
          pointer-events:none;
        }
        .ct-anim {position:relative;width:360px;height:440px;pointer-events:none;}

        /* letter animation */
        .ct-letter {
          position:absolute;top:30px;left:40px;width:72px;height:55px;
          transform-origin:center center;animation:ctLetterFly 3.2s cubic-bezier(.45,0,.2,1) infinite;
        }
        @keyframes ctLetterFly {
          0%  {transform:translate(0,0) rotate(-18deg) scale(.88);opacity:0;}
          6%  {opacity:1;}
          32% {transform:translate(220px,-50px) rotate(14deg) scale(1.08);opacity:1;}
          64% {transform:translate(136px,220px) rotate(-5deg) scale(.94);opacity:1;}
          76% {transform:translate(112px,262px) rotate(-1deg) scale(.52);opacity:.8;}
          86% {transform:translate(112px,282px) rotate(0deg) scale(.18);opacity:0;}
          87% {transform:translate(0,0) rotate(-18deg) scale(.88);opacity:0;}
          100%{transform:translate(0,0) rotate(-18deg) scale(.88);opacity:0;}
        }
        .ct-letter svg {width:100%;height:100%;animation:ctLetterGlow 3.2s ease-in-out infinite;}
        @keyframes ctLetterGlow {
          0%,100%{filter:drop-shadow(0 0 9px rgba(249,115,22,.62)) drop-shadow(0 0 22px rgba(249,115,22,.28));}
          32%    {filter:drop-shadow(0 0 20px rgba(249,115,22,1)) drop-shadow(0 0 48px rgba(249,115,22,.6));}
          76%    {filter:drop-shadow(0 0 13px rgba(99,102,241,.9)) drop-shadow(0 0 32px rgba(99,102,241,.5));}
        }

        /* trail dots */
        .ct-trail {position:absolute;top:56px;left:74px;border-radius:50%;background:var(--c-orange);pointer-events:none;}
        .ct-trail-1{width:4px;height:4px;animation:ctTr1 3.2s ease-in-out infinite;opacity:0;}
        .ct-trail-2{width:3px;height:3px;animation:ctTr2 3.2s ease-in-out infinite;opacity:0;animation-delay:.06s;}
        .ct-trail-3{width:2px;height:2px;animation:ctTr3 3.2s ease-in-out infinite;opacity:0;animation-delay:.12s;}
        .ct-trail-4{width:2px;height:2px;animation:ctTr4 3.2s ease-in-out infinite;opacity:0;animation-delay:.18s;background:rgba(249,115,22,.5);}
        @keyframes ctTr1{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(178px,-52px);opacity:.85}60%{transform:translate(98px,190px);opacity:.4}74%{opacity:0}100%{opacity:0}}
        @keyframes ctTr2{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(145px,-42px);opacity:.65}60%{transform:translate(78px,172px);opacity:.28}72%{opacity:0}100%{opacity:0}}
        @keyframes ctTr3{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(110px,-30px);opacity:.45}60%{transform:translate(58px,150px);opacity:.18}70%{opacity:0}100%{opacity:0}}
        @keyframes ctTr4{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(74px,-16px);opacity:.3}60%{transform:translate(38px,126px);opacity:.1}68%{opacity:0}100%{opacity:0}}

        /* mailbox */
        .ct-mailbox{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;}
        .ct-mailbox__glow{position:absolute;top:-18px;left:-16px;right:-16px;bottom:-34px;border-radius:16px;border:1.5px solid transparent;pointer-events:none;animation:ctMbGlow 3.2s ease-in-out infinite;}
        @keyframes ctMbGlow{0%,64%{border-color:transparent;box-shadow:none}80%{border-color:rgba(99,102,241,.72);box-shadow:0 0 36px rgba(99,102,241,.38),0 0 72px rgba(99,102,241,.16)}100%{border-color:transparent;box-shadow:none}}
        .ct-mailbox__roof{width:0;height:0;border-left:63px solid transparent;border-right:63px solid transparent;border-bottom:25px solid #1a1a2e;filter:drop-shadow(0 -1px 0 rgba(99,102,241,.42));}
        .ct-mailbox__body{width:126px;height:82px;background:linear-gradient(160deg,#1e1e2e 50%,#12122a);border:1.5px solid rgba(99,102,241,.58);border-radius:10px 10px 6px 6px;position:relative;box-shadow:0 0 32px rgba(99,102,241,.2),inset 0 1px 0 rgba(255,255,255,.06);}
        .ct-mailbox__slot{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:62px;height:7px;background:#000;border-radius:3.5px;box-shadow:inset 0 2px 6px rgba(0,0,0,1);}
        .ct-mailbox__slot::after{content:'';position:absolute;top:0;left:5px;right:5px;height:1px;background:rgba(99,102,241,.35);border-radius:1px;}
        .ct-mailbox__icon{position:absolute;bottom:9px;right:11px;opacity:.22;}
        .ct-mailbox__post{width:12px;height:34px;background:linear-gradient(to right,#1a1a2e,#242440);border:1px solid rgba(99,102,241,.22);border-top:none;border-radius:0 0 4px 4px;}

        /* sparks */
        .ct-spark{position:absolute;border-radius:50%;bottom:100px;left:50%;opacity:0;}
        .ct-spark-1{width:4px;height:4px;background:#6366f1;animation:ctSp1 3.2s ease-out infinite;}
        .ct-spark-2{width:4px;height:4px;background:#f97316;animation:ctSp2 3.2s ease-out infinite;}
        .ct-spark-3{width:3px;height:3px;background:#a78bfa;animation:ctSp3 3.2s ease-out infinite;}
        .ct-spark-4{width:3px;height:3px;background:#6366f1;animation:ctSp4 3.2s ease-out infinite;}
        .ct-spark-5{width:2px;height:2px;background:#fbbf24;animation:ctSp5 3.2s ease-out infinite;}
        .ct-spark-6{width:2px;height:2px;background:#f97316;animation:ctSp6 3.2s ease-out infinite;}
        @keyframes ctSp1{0%,72%{opacity:0;transform:translate(0,0) scale(1)}78%{opacity:1;transform:translate(-24px,-20px) scale(1.5)}96%{opacity:0;transform:translate(-36px,-7px) scale(.3)}100%{opacity:0}}
        @keyframes ctSp2{0%,73%{opacity:0;transform:translate(0,0) scale(1)}79%{opacity:1;transform:translate(22px,-24px) scale(1.5)}96%{opacity:0;transform:translate(34px,-8px) scale(.3)}100%{opacity:0}}
        @keyframes ctSp3{0%,71%{opacity:0;transform:translate(0,0) scale(1)}77%{opacity:1;transform:translate(-10px,-30px) scale(1.4)}96%{opacity:0;transform:translate(-16px,-9px) scale(.3)}100%{opacity:0}}
        @keyframes ctSp4{0%,74%{opacity:0;transform:translate(0,0)}80%{opacity:1;transform:translate(16px,-16px)}96%{opacity:0;transform:translate(24px,2px)}100%{opacity:0}}
        @keyframes ctSp5{0%,75%{opacity:0;transform:translate(0,0)}81%{opacity:1;transform:translate(-18px,-12px)}96%{opacity:0;transform:translate(-28px,4px)}100%{opacity:0}}
        @keyframes ctSp6{0%,76%{opacity:0;transform:translate(0,0)}82%{opacity:1;transform:translate(8px,-26px)}96%{opacity:0;transform:translate(12px,-8px)}100%{opacity:0}}

        /* corner brackets */
        .ct-corner{position:absolute;width:28px;height:28px;z-index:5;opacity:.14;pointer-events:none;}
        .ct-corner--tl{top:22px;left:22px;border-top:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .ct-corner--tr{top:22px;right:22px;border-top:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}
        .ct-corner--bl{bottom:22px;left:22px;border-bottom:1px solid var(--c-orange);border-left:1px solid var(--c-orange);}
        .ct-corner--br{bottom:22px;right:22px;border-bottom:1px solid var(--c-orange);border-right:1px solid var(--c-orange);}

        /* ══ PROOF STRIP ════════════════════════════════════════════════════ */
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
        .ct-proof__stats {display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:3.5rem 0;}
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

        /* ══ REACH SECTION ══════════════════════════════════════════════════ */
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

        /* two-column layout */
        .ct-reach__layout{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:stretch;}

        /* ══ TESTIMONIALS (left half) ═══════════════════════════════════════ */
        .ct-testi {
          background:#0B0B0F;border:1px solid rgba(255,255,255,0.08);border-radius:20px;
          padding:48px 40px 40px;position:relative;overflow:hidden;
          display:flex;flex-direction:column;min-height:360px;
        }
        .ct-testi::before {
          content:'';position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);
          background-size:48px 48px;pointer-events:none;border-radius:20px;
        }
        .ct-testi__glow{position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(138,99,255,0.16) 0%,transparent 70%);top:-80px;right:-60px;pointer-events:none;}
        .ct-testi__badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:100px;padding:6px 16px 6px 10px;margin-bottom:36px;position:relative;z-index:2;width:fit-content;}
        .ct-testi__badge-dot{width:6px;height:6px;border-radius:50%;background:var(--c-orange);flex-shrink:0;animation:ctPulse 2s ease-in-out infinite;}
        .ct-testi__badge-text{font-family:var(--ff-sans);font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);}
        .ct-testi__cards{position:relative;flex:1;z-index:2;min-height:200px;}
        .ct-testi__card{position:absolute;inset:0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px 32px;display:flex;flex-direction:column;justify-content:space-between;transition:opacity .55s ease,transform .55s cubic-bezier(.4,0,.2,1);will-change:transform,opacity;}
        .ct-testi__stars{display:flex;gap:4px;margin-bottom:16px;}
        .ct-testi__star{color:#FBBF24;font-size:13px;}
        .ct-testi__quote{font-family:var(--ff-serif);font-size:clamp(1rem,1.6vw,1.3rem);line-height:1.55;color:rgba(255,255,255,.88);font-style:italic;font-weight:300;margin:0;}
        .ct-testi__author{display:flex;align-items:center;gap:14px;margin-top:24px;}
        .ct-testi__avatar{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--ff-sans);font-size:13px;font-weight:500;color:#fff;flex-shrink:0;}
        .ct-testi__name{font-family:var(--ff-sans);font-size:14px;font-weight:500;color:rgba(255,255,255,.9);margin:0;}
        .ct-testi__role{font-family:var(--ff-sans);font-size:12px;color:rgba(255,255,255,.38);margin-top:2px;}
        .ct-testi__pips{display:flex;gap:6px;align-items:center;margin-top:28px;position:relative;z-index:2;}
        .ct-testi__pip{height:3px;border-radius:2px;background:rgba(255,255,255,.12);transition:width .4s cubic-bezier(.4,0,.2,1),background .4s;}
        .ct-testi__pip--on{background:var(--c-orange);}

        /* ══ RIGHT HALF — contact strip + commitment card ═══════════════════ */
        .ct-reach__right{display:flex;flex-direction:column;gap:1.5rem;}

        /* ── contact strip: email + phone on ONE row ── */
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

        /* ── commitment card ── */
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

        /* ── globe / location footer ── */
        .ct-reach__location{
          display:flex;align-items:center;gap:10px;margin-top:1.4rem;
          padding-top:1.4rem;border-top:1px solid var(--c-border);
        }
        .ct-reach__location-icon{color:var(--c-orange);flex-shrink:0;}
        .ct-reach__location-text{font-family:var(--ff-sans);font-size:.8rem;color:var(--c-muted2);line-height:1.5;}
        .ct-reach__location-text strong{color:rgba(255,255,255,.7);font-weight:500;}

        /* ══ RESPONSIVE ════════════════════════════════════════════════════ */
        @media (max-width:1000px) {
          .ct-proof__tagline{display:none;}
          .ct-proof__inner{grid-template-columns:1fr;padding:0 2rem;}
        }
        @media (max-width:900px) {
          .ct-hero__left{padding:5.5rem 2.5rem 5.5rem 3.5rem;}
          .ct-hero__right{flex:0 0 360px;}
          .ct-anim{width:280px;height:360px;}
          .ct-proof__stats{grid-template-columns:repeat(2,1fr);padding:2rem 0;}
          .ct-proof__stat{border-right:none;border-bottom:1px solid var(--c-border);padding:1.6rem 1.4rem;}
          .ct-proof__stat:nth-child(odd){border-right:1px solid var(--c-border);}
          .ct-proof__stat:nth-last-child(-n+2){border-bottom:none;}
          .ct-reach__layout{grid-template-columns:1fr;}
          .ct-reach__inner{padding:0 2.5rem;}
        }
        @media (max-width:768px) {
          .ct-hero{flex-direction:column;min-height:auto;}
          .ct-hero__right{order:1;flex:none;width:100%;height:280px;min-height:280px;overflow:visible;display:flex;align-items:center;justify-content:center;}
          .ct-hero__right::before{display:none;}
          .ct-anim{width:200px;height:260px;}
          .ct-letter{top:22px;left:24px;width:56px;height:43px;animation-name:ctLetterFlyMd;}
          .ct-trail{top:42px;left:52px;}
          .ct-trail-1{animation-name:ctTr1Md;}
          .ct-trail-2{animation-name:ctTr2Md;}
          .ct-trail-3{animation-name:ctTr3Md;}
          .ct-trail-4{animation-name:ctTr4Md;}
          .ct-hero__left{order:2;flex:none;width:100%;padding:1.5rem 1.8rem 4rem;align-items:center;text-align:center;}
          .ct-hero__sub{max-width:100%;}
          .ct-hero__link{justify-content:center;}
          .ct-reach__header{flex-direction:column;align-items:flex-start;}
          .ct-reach__rule{display:none;}
          .ct-reach__inner{padding:0 1.5rem;}
          .ct-reach{padding:4rem 0;}
          .ct-proof__inner{padding:0 1.5rem;}
          .ct-proof__stats{padding:2rem 0;}
          .ct-testi{padding:32px 24px 28px;min-height:300px;}
          .ct-reach__strip{flex-direction:column;}
          .ct-reach__strip-divider{width:auto;height:1px;}
        }
        @keyframes ctLetterFlyMd {
          0%  {transform:translate(0,0) rotate(-18deg) scale(.88);opacity:0;}6%{opacity:1;}
          32% {transform:translate(120px,-30px) rotate(14deg) scale(1.07);opacity:1;}
          64% {transform:translate(76px,186px) rotate(-5deg) scale(.94);opacity:1;}
          76% {transform:translate(62px,218px) rotate(-1deg) scale(.50);opacity:.8;}
          86% {transform:translate(62px,234px) rotate(0deg) scale(.16);opacity:0;}
          87% {transform:translate(0,0) rotate(-18deg) scale(.88);opacity:0;}
          100%{transform:translate(0,0) rotate(-18deg) scale(.88);opacity:0;}
        }
        @keyframes ctTr1Md{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(96px,-24px);opacity:.85}60%{transform:translate(54px,156px);opacity:.4}74%{opacity:0}100%{opacity:0}}
        @keyframes ctTr2Md{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(78px,-19px);opacity:.65}60%{transform:translate(43px,140px);opacity:.28}72%{opacity:0}100%{opacity:0}}
        @keyframes ctTr3Md{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(58px,-13px);opacity:.45}60%{transform:translate(31px,122px);opacity:.18}70%{opacity:0}100%{opacity:0}}
        @keyframes ctTr4Md{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(39px,-7px);opacity:.3}60%{transform:translate(20px,102px);opacity:.1}68%{opacity:0}100%{opacity:0}}
        @media (max-width:400px) {
          .ct-hero__right{height:240px;min-height:240px;}
          .ct-anim{width:170px;height:220px;}
          .ct-letter{top:18px;left:20px;width:46px;height:36px;animation-name:ctLetterFlySm;}
          .ct-trail{top:34px;left:42px;}
          .ct-trail-1{animation-name:ctTr1Sm;}
          .ct-trail-2{animation-name:ctTr2Sm;}
          .ct-trail-3{animation-name:ctTr3Sm;}
          .ct-trail-4{animation-name:ctTr4Sm;}
        }
        @keyframes ctLetterFlySm {
          0%  {transform:translate(0,0) rotate(-18deg) scale(.88);opacity:0;}6%{opacity:1;}
          32% {transform:translate(100px,-24px) rotate(14deg) scale(1.05);opacity:1;}
          64% {transform:translate(62px,156px) rotate(-5deg) scale(.93);opacity:1;}
          76% {transform:translate(50px,182px) rotate(-1deg) scale(.46);opacity:.8;}
          86% {transform:translate(50px,196px) rotate(0deg) scale(.13);opacity:0;}
          87% {transform:translate(0,0) rotate(-18deg) scale(.88);opacity:0;}
          100%{transform:translate(0,0) rotate(-18deg) scale(.88);opacity:0;}
        }
        @keyframes ctTr1Sm{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(80px,-20px);opacity:.85}60%{transform:translate(44px,130px);opacity:.4}74%{opacity:0}100%{opacity:0}}
        @keyframes ctTr2Sm{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(64px,-16px);opacity:.65}60%{transform:translate(34px,116px);opacity:.28}72%{opacity:0}100%{opacity:0}}
        @keyframes ctTr3Sm{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(48px,-11px);opacity:.45}60%{transform:translate(24px,100px);opacity:.18}70%{opacity:0}100%{opacity:0}}
        @keyframes ctTr4Sm{0%,6%{transform:translate(0,0);opacity:0}28%{transform:translate(32px,-7px);opacity:.3}60%{transform:translate(15px,84px);opacity:.1}68%{opacity:0}100%{opacity:0}}
        @media (prefers-reduced-motion:reduce) {
          *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
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
        <div className="ct-hero__grid"     aria-hidden="true" />
        <div className="ct-hero__orb"      aria-hidden="true" />
        <div className="ct-hero__orb2"     aria-hidden="true" />
        <div className="ct-hero__hairline" aria-hidden="true" />
        <div className="ct-corner ct-corner--tl" aria-hidden="true" />
        <div className="ct-corner ct-corner--tr" aria-hidden="true" />
        <div className="ct-corner ct-corner--bl" aria-hidden="true" />
        <div className="ct-corner ct-corner--br" aria-hidden="true" />

        <div className="ct-hero__left">
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

          <p className="ct-hero__eyebrow" aria-hidden="true">
            <span className="ct-hero__dot" />
            Free Consultation · No Commitment
          </p>

          <h1 className="ct-hero__h1" id="ct-hero-heading" itemProp="name">
            Your vision deserves a<br />
            <em>digital partner</em> who delivers.
          </h1>

          <div className="ct-hero__rule" aria-hidden="true">
            <div className="ct-hero__rule-line" />
            <div className="ct-hero__rule-diamond" />
          </div>

          <p className="ct-hero__sub" itemProp="description">
            Tell us about your project — we respond within 24 hours with a
            clear plan, honest pricing, and zero fluff. Bangalore&apos;s most trusted
            web, 3D &amp; marketing studio is one message away.
          </p>

          <a href="#contact-form" className="ct-hero__cta" aria-label="Get your free quote — scroll to the contact form">
            Get Your Free Quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a href="mailto:info@99visual.com" className="ct-hero__link">
            Or email us directly — info@99visual.com
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="ct-hero__right" aria-hidden="true">
          <div className="ct-anim">
            <div className="ct-trail ct-trail-1" />
            <div className="ct-trail ct-trail-2" />
            <div className="ct-trail ct-trail-3" />
            <div className="ct-trail ct-trail-4" />
            <div className="ct-letter">
              <svg viewBox="0 0 72 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="70" height="53" rx="5" fill="#1e1032" stroke="#f97316" strokeWidth="1.4" />
                <rect x="7" y="6" width="58" height="36" rx="2.5" fill="#fff" opacity="0.07" />
                <line x1="13" y1="17" x2="59" y2="17" stroke="#f97316" strokeWidth=".9" opacity=".45" />
                <line x1="13" y1="25" x2="52" y2="25" stroke="#f97316" strokeWidth=".9" opacity=".32" />
                <line x1="13" y1="33" x2="44" y2="33" stroke="#f97316" strokeWidth=".9" opacity=".22" />
                <path d="M1 7 L36 32 L71 7" stroke="#f97316" strokeWidth="1.2" opacity=".65" fill="none" />
                <circle cx="36" cy="30" r="7" fill="#f97316" opacity=".75" />
                <circle cx="36" cy="30" r="4" fill="#fde68a" opacity=".95" />
                <rect x="3" y="2" width="66" height="4" rx="2" fill="white" opacity=".04" />
              </svg>
            </div>
            <div className="ct-mailbox">
              <div className="ct-mailbox__glow" />
              <div className="ct-mailbox__roof" />
              <div className="ct-mailbox__body">
                <div className="ct-mailbox__slot" />
                <svg className="ct-mailbox__icon" width="18" height="13" viewBox="0 0 18 13" fill="none" aria-hidden="true">
                  <rect x=".5" y=".5" width="17" height="12" rx="2" stroke="white" strokeWidth="1" />
                  <path d="M.5 1.5 L9 8 L17.5 1.5" stroke="white" strokeWidth="1" fill="none" />
                </svg>
              </div>
              <div className="ct-mailbox__post" />
              <div className="ct-spark ct-spark-1" />
              <div className="ct-spark ct-spark-2" />
              <div className="ct-spark ct-spark-3" />
              <div className="ct-spark ct-spark-4" />
              <div className="ct-spark ct-spark-5" />
              <div className="ct-spark ct-spark-6" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROOF STRIP — animated counters ════════════════════════════════ */}
      <section className="ct-proof" aria-label="Company highlights" ref={proofRef}>
        <div className="ct-proof__inner">
          <div className="ct-proof__stats">
            {STATS.map((s) => (
              <StatItem key={s.label} stat={s} active={statsActive} />
            ))}
          </div>
          <div className="ct-proof__tagline">
            <p className="ct-proof__tagline-text">&ldquo;Results you can measure, design you&apos;ll love.&rdquo;</p>
            <p className="ct-proof__tagline-sub">— 99 Visual Solutions, Bangalore</p>
          </div>
        </div>
      </section>

      {/* ══ REACH + TESTIMONIALS ════════════════════════════════════════════ */}
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

            {/* LEFT — Testimonials (unchanged) */}
            <div className="ct-testi" aria-label="Client testimonials">
              <div className="ct-testi__glow" aria-hidden="true" />
              <div className="ct-testi__badge" aria-hidden="true">
                <span className="ct-testi__badge-dot" />
                <span className="ct-testi__badge-text">Client voices</span>
              </div>
              <div className="ct-testi__cards" aria-live="polite">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="ct-testi__card"
                    style={cardStyles[getState(i, cur)]}
                    aria-hidden={i !== cur}
                  >
                    <div>
                      <div className="ct-testi__stars" aria-label="5 stars">
                        {[...Array(5)].map((_, s) => (
                          <span key={s} className="ct-testi__star">★</span>
                        ))}
                      </div>
                      <p className="ct-testi__quote">&ldquo;{t.quote}&rdquo;</p>
                    </div>
                    <div className="ct-testi__author">
                      <div className="ct-testi__avatar" style={{ background: t.accent }} aria-hidden="true">
                        {t.initials}
                      </div>
                      <div>
                        <p className="ct-testi__name">{t.name}</p>
                        <p className="ct-testi__role">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ct-testi__pips" aria-hidden="true">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`ct-testi__pip${i === cur ? " ct-testi__pip--on" : ""}`}
                    style={{ width: i === cur ? 32 : 16 }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — email + direct line strip, then commitment card */}
            <div className="ct-reach__right">

              {/* Single-row contact strip */}
              <div className="ct-reach__strip" role="list">
                <a className="ct-reach__strip-item" href="mailto:info@99visual.com" aria-label="Email us at info@99visual.com" role="listitem">
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

                <a className="ct-reach__strip-item" href="tel:+919205737431" aria-label="Call us at +91 92057 37431" role="listitem">
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

              {/* Commitment card */}
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
                  ] as [string,string][]).map(([strong, sub]) => (
                    <li key={strong} className="ct-reach__commit-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="ct-reach__commit-check" aria-hidden="true">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="ct-reach__location-icon" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <p className="ct-reach__location-text">
                    Based in <strong>Bengaluru, Karnataka, India</strong> · Serving clients worldwide
                  </p>
                </div>
              </div>

            </div>{/* /.ct-reach__right */}
          </div>{/* /.ct-reach__layout */}
        </div>{/* /.ct-reach__inner */}
      </section>
    </>
  );
}