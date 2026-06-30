'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHistory, FaBullseye, FaHeart } from 'react-icons/fa';
import clsx from 'clsx';

/* ---------------- TAB DATA ---------------- */

const tabs = [
  {
    title: 'Our Story',
    icon: <FaHistory />,
    content: {
      heading:
        "Progress begins when action takes over – stop talking, let's start building!",
      shortText:
        'During the unprecedented challenges of the COVID-19 pandemic, our team at 99 Visual demonstrated resilience, dedication, and hands-on leadership while supporting critical IT infrastructure.',
      fullText: `During the unprecedented challenges of the COVID-19 pandemic, our team at 99 Visual demonstrated resilience, dedication, and hands-on leadership while supporting critical IT infrastructure for private and government organizations.

From managing servers, routers, and security systems to maintaining biometric devices across banks, police stations, and essential institutions, we ensured uninterrupted operations when reliability mattered most.

This defining chapter not only tested our technical expertise but also strengthened our core values. It reinforced our commitment to accountability, sharpened our clarity in decision-making, and deepened our focus on delivering meaningful, long-term impact. The experience shaped our approach to every project we undertake today—grounded in reliability, driven by purpose, and aligned with the real-world needs of our clients.`,
      image: '/images/about/image.png',
    },
  },
  {
    title: 'Mission',
    icon: <FaBullseye />,
    content: {
      heading: 'Driven by Purpose, Focused on Results',
      shortText:
        'Our mission is to empower businesses through innovative, customized IT solutions that drive efficiency and sustainable growth. We focus on delivering technology that simplifies complexity, enhances performance, and enables organizations to operate with confidence in an evolving digital landscape.',
      fullText: `Our mission is to empower businesses through innovative, customized IT solutions that drive efficiency, scalability, and measurable results.

We focus on delivering technology that simplifies complexity, enhances performance, and enables organizations to operate with confidence in an evolving digital landscape.

Every solution we create is carefully aligned with real business objectives, ensuring it delivers tangible value and long-term impact. Our approach is centered on building scalable, flexible, and future-ready systems that evolve alongside your business—empowering you to operate with confidence, agility, and sustained success in an increasingly dynamic digital landscape.`,
      image: '/images/mission/image.png',
    },
  },
  {
    title: 'Values',
    icon: <FaHeart />,
    content: {
      heading: 'Our Core Values',
      shortText:
        'Integrity, Innovation, and Impact form the foundation of everything we do. Integrity ensures transparency, honesty, and accountability in every engagement. Innovation drives us to challenge conventions and design forward-thinking solutions. Impact reminds us that success is measured by real-world results—not promises.',
      fullText: `Integrity, Innovation, and Impact form the foundation of everything we do.

Integrity is at the heart of every engagement. We believe in complete transparency, open communication, and unwavering honesty in all our interactions. Our commitment to accountability ensures that we take full ownership of our work, build trust through consistency, and uphold the highest ethical standards in every project we undertake.

Innovation drives our mindset and fuels our approach to problem-solving. We continuously challenge conventional thinking, explore emerging technologies, and design forward-looking solutions that empower businesses to stay ahead in a competitive digital landscape. By embracing creativity and adaptability, we turn complex challenges into meaningful opportunities for growth.

Impact is the ultimate measure of our success. We focus on delivering tangible, real-world results that create measurable value for our clients. Rather than making promises, we prioritize outcomes—enhancing performance, improving efficiency, and enabling long-term business transformation.

Together, these values guide our decisions, strengthen our partnerships, and define the experiences we create. They ensure that every solution we deliver is purposeful, every relationship we build is trusted, and every outcome we achieve is meaningful and sustainable.`,
      image: '/images/values/image.png',
    },
  },
];

/* ---------------- ANIMATION VARIANTS ---------------- */

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const summaryContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const summaryItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.96, x: -16 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function CompanyTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);
  const [pageView, setPageView] = useState<'summary' | 'full'>('summary');

  const activeTab = tabs[activeIndex];

  useEffect(() => {
    setPageView('summary');
  }, [activeIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --c-bg:          #080808;
          --c-surface:     #0f0f0f;
          --c-surface2:    #141414;
          --c-border:      rgba(255,255,255,0.07);
          --c-orange:      #f97316;
          --c-orange-dim:  rgba(249,115,22,0.12);
          --c-muted:       rgba(255,255,255,0.45);
          --c-muted2:      rgba(255,255,255,0.65);
          --ff-serif:      'Cormorant Garamond', serif;
          --ff-sans:       'DM Sans', sans-serif;
        }

        /* ── SECTION WRAPPER ── */
        .ct-section {
          position: relative;
          background: var(--c-surface);
          overflow: hidden;
          padding: 6rem 1.5rem;
          border-top: 1px solid var(--c-border);
          border-bottom: 1px solid var(--c-border);
        }

        /* background grid + grain */
        .ct-section__grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .ct-section__grain {
          position: absolute; inset: 0; opacity: .025; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
        .ct-section__orb {
          position: absolute; border-radius: 50%; filter: blur(100px);
          pointer-events: none;
        }
        .ct-section__orb--1 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, #f97316, transparent 70%);
          top: -140px; right: -80px; opacity: .06;
        }
        .ct-section__orb--2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #6366f1, transparent 70%);
          bottom: -100px; left: -60px; opacity: .05;
        }

        .ct-section__inner {
          position: relative; z-index: 10;
          max-width: 1100px; margin: 0 auto;
        }

        /* ── SECTION HEADER ── */
        .ct-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .ct-header__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--ff-sans); font-size: 10px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange);
          border: 1px solid rgba(249,115,22,.28);
          background: rgba(249,115,22,.07);
          padding: 6px 16px; border-radius: 100px;
          margin-bottom: 1.6rem;
          backdrop-filter: blur(8px);
        }
        .ct-header__dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--c-orange);
          animation: ctPulse 2s ease-in-out infinite;
        }
        @keyframes ctPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .35; transform: scale(.6); }
        }
        .ct-header__h2 {
          font-family: var(--ff-serif);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
          color: #fff; margin: 0 0 1rem;
        }
        .ct-header__h2 em {
          font-style: italic; color: var(--c-orange);
        }
        .ct-header__rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-orange), transparent);
          margin: 0 auto;
        }

        /* ── DESKTOP TABS NAV ── */
        .ct-tabs-nav {
          display: none;
        }
        @media (min-width: 768px) {
          .ct-tabs-nav {
            display: flex;
            justify-content: center;
            gap: 0;
            margin-bottom: 3.5rem;
            border: 1px solid var(--c-border);
            border-radius: 12px;
            overflow: hidden;
            background: var(--c-surface2);
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
            position: relative;
          }
        }

        .ct-tab-btn {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--ff-sans); font-size: .82rem; font-weight: 500;
          letter-spacing: .08em; text-transform: uppercase;
          padding: 14px 32px;
          color: var(--c-muted);
          background: transparent;
          border: none; cursor: pointer;
          position: relative;
          transition: color .3s ease;
          white-space: nowrap;
          z-index: 2;
        }
        .ct-tab-btn + .ct-tab-btn {
          border-left: 1px solid var(--c-border);
        }
        .ct-tab-btn:hover { color: var(--c-muted2); }
        .ct-tab-btn--active {
          color: #fff !important;
        }

        .ct-tab-indicator {
          position: absolute;
          top: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(249,115,22,.22), rgba(249,115,22,.08));
          border-bottom: 2px solid var(--c-orange);
          z-index: 1;
        }

        .ct-tab-btn svg, .ct-tab-btn .ct-tab-icon {
          font-size: .9rem; opacity: .8;
          transition: transform .35s cubic-bezier(.22,1,.36,1);
        }
        .ct-tab-btn--active .ct-tab-icon {
          transform: scale(1.12) rotate(-4deg);
          opacity: 1;
        }

        /* ── DESKTOP CONTENT ── */
        .ct-desktop-content {
          display: none;
        }
        @media (min-width: 768px) {
          .ct-desktop-content { display: block; }
        }

        /* Summary grid: image left, text right */
        .ct-summary-grid {
          display: grid;
          grid-template-columns: 5fr 6fr;
          gap: 4rem;
          align-items: center;
        }

        .ct-img-wrap {
          position: relative; border-radius: 16px; overflow: hidden;
        }
        .ct-img-wrap::before {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(135deg, rgba(249,115,22,.1), transparent 60%);
          border-radius: 16px; pointer-events: none;
        }
        .ct-img-wrap img {
          width: 100%; height: auto; display: block;
          border-radius: 16px;
          border: 1px solid var(--c-border);
          transition: transform .5s cubic-bezier(.22,1,.36,1);
        }
        .ct-img-wrap:hover img { transform: scale(1.045); }

        /* Ghost number behind content */
        .ct-ghost-num {
          font-family: var(--ff-serif);
          font-size: clamp(5rem, 10vw, 9rem);
          font-weight: 700; line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(249,115,22,.1);
          position: absolute; top: -2.5rem; left: -1rem;
          pointer-events: none; user-select: none;
        }

        .ct-content-body { position: relative; }

        .ct-content-eyebrow {
          font-family: var(--ff-sans); font-size: 9px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-orange); margin-bottom: .9rem; display: block;
        }
        .ct-content-h3 {
          font-family: var(--ff-serif);
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700; line-height: 1.15; letter-spacing: -.01em;
          color: #fff; margin: 0 0 .6rem;
        }
        .ct-content-rule {
          width: 32px; height: 1px;
          background: linear-gradient(90deg, var(--c-orange), transparent);
          margin: 0 0 1.4rem;
        }
        .ct-content-p {
          font-family: var(--ff-sans); font-size: .95rem;
          font-weight: 300; line-height: 1.85; color: var(--c-muted);
          margin-bottom: 1.6rem;
        }
        .ct-read-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--ff-sans); font-size: 10px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase;
          color: var(--c-orange);
          background: var(--c-orange-dim);
          border: 1px solid rgba(249,115,22,.28);
          padding: 10px 22px; border-radius: 100px;
          cursor: pointer; transition: background .2s ease, transform .2s ease;
          text-decoration: none;
        }
        .ct-read-btn:hover {
          background: rgba(249,115,22,.2);
          transform: translateY(-1px);
        }
        .ct-read-btn svg { transition: transform .2s ease; }
        .ct-read-btn:hover svg { transform: translateX(3px); }

        /* Full text view */
        .ct-full-body {
          max-width: 760px; margin: 0 auto;
        }
        .ct-full-h3 {
          font-family: var(--ff-serif);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -.015em;
          color: #fff; margin: 0 0 .8rem;
        }
        .ct-full-rule {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, var(--c-orange), transparent);
          margin: 0 0 2rem;
        }
        .ct-full-text {
          font-family: var(--ff-sans); font-size: .95rem;
          font-weight: 300; line-height: 1.9; color: var(--c-muted);
          white-space: pre-line;
        }
        .ct-full-text p + p { margin-top: 1.2rem; }

        .ct-back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--ff-sans); font-size: 10px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase;
          color: var(--c-muted2);
          background: transparent;
          border: 1px solid var(--c-border);
          padding: 10px 22px; border-radius: 100px;
          cursor: pointer; margin-top: 2rem;
          transition: border-color .2s ease, color .2s ease, transform .2s ease;
          text-decoration: none;
        }
        .ct-back-btn:hover {
          border-color: rgba(249,115,22,.35);
          color: var(--c-orange);
          transform: translateY(-1px);
        }
        .ct-back-btn svg { transition: transform .2s ease; }
        .ct-back-btn:hover svg { transform: translateX(-3px); }

        /* ── MOBILE ACCORDION ── */
        .ct-accordion {
          display: flex; flex-direction: column; gap: 1rem;
        }
        @media (min-width: 768px) {
          .ct-accordion { display: none; }
        }

        .ct-accord-item {
          border: 1px solid var(--c-border);
          border-radius: 12px;
          background: var(--c-surface2);
          overflow: hidden;
          transition: border-color .3s ease, box-shadow .3s ease;
        }
        .ct-accord-item--open {
          border-color: rgba(249,115,22,.3);
          box-shadow: 0 8px 24px -12px rgba(249,115,22,.18);
        }
        .ct-accord-trigger {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 1.25rem;
          background: transparent; border: none; cursor: pointer;
          font-family: var(--ff-sans); font-size: .88rem; font-weight: 500;
          color: var(--c-muted2); text-align: left;
          transition: color .2s ease;
        }
        .ct-accord-trigger:hover { color: var(--c-orange); }
        .ct-accord-trigger--open { color: var(--c-orange); }

        .ct-accord-trigger__left {
          display: flex; align-items: center; gap: 10px;
          letter-spacing: .05em; text-transform: uppercase; font-size: .8rem;
        }
        .ct-accord-trigger__icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: var(--c-orange-dim);
          border: 1px solid rgba(249,115,22,.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--c-orange); font-size: .85rem; flex-shrink: 0;
          transition: transform .35s cubic-bezier(.22,1,.36,1);
        }
        .ct-accord-trigger--open .ct-accord-trigger__icon {
          transform: scale(1.1) rotate(-6deg);
        }
        .ct-accord-chevron {
          font-size: 1.1rem; color: var(--c-muted); transition: transform .35s cubic-bezier(.22,1,.36,1), color .2s ease;
        }
        .ct-accord-chevron--open {
          transform: rotate(45deg);
          color: var(--c-orange);
        }

        .ct-accord-body {
          padding: 0 1.25rem;
          overflow: hidden;
        }
        .ct-accord-body__inner {
          padding-bottom: 1.25rem;
          border-top: 1px solid var(--c-border);
          padding-top: 1.1rem;
        }
        .ct-accord-body__h4 {
          font-family: var(--ff-serif);
          font-size: 1.4rem; font-weight: 700; line-height: 1.15;
          color: #fff; margin: 0 0 .8rem;
        }
        .ct-accord-body__text {
          font-family: var(--ff-sans); font-size: .88rem;
          font-weight: 300; line-height: 1.85; color: var(--c-muted);
          white-space: pre-line;
        }

        /* corner accents */
        .ct-corner {
          position: absolute; width: 22px; height: 22px; z-index: 5; opacity: .15;
        }
        .ct-corner--tl { top: 20px; left: 20px; border-top: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .ct-corner--tr { top: 20px; right: 20px; border-top: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }
        .ct-corner--bl { bottom: 20px; left: 20px; border-bottom: 1px solid var(--c-orange); border-left: 1px solid var(--c-orange); }
        .ct-corner--br { bottom: 20px; right: 20px; border-bottom: 1px solid var(--c-orange); border-right: 1px solid var(--c-orange); }

        @media (prefers-reduced-motion: reduce) {
          .ct-img-wrap img, .ct-tab-icon, .ct-accord-trigger__icon, .ct-accord-chevron {
            transition: none !important;
          }
        }
      `}</style>

      <motion.section
        className="ct-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
      >
        {/* BG */}
        <div className="ct-section__grid" />
        <div className="ct-section__grain" />
        <div className="ct-section__orb ct-section__orb--1" />
        <div className="ct-section__orb ct-section__orb--2" />

        {/* Corner marks */}
        <div className="ct-corner ct-corner--tl" />
        <div className="ct-corner ct-corner--tr" />
        <div className="ct-corner ct-corner--bl" />
        <div className="ct-corner ct-corner--br" />

        <div className="ct-section__inner">

          {/* ── Section Header ── */}
          <div className="ct-header">
            <motion.div
              className="ct-header__eyebrow"
              custom={0}
              variants={headerReveal}
            >
              <span className="ct-header__dot" />
              About · 99 Visual
            </motion.div>
            <motion.h2 className="ct-header__h2" custom={1} variants={headerReveal}>
              Who we are &amp; what we <em>stand for</em>
            </motion.h2>
            <motion.div className="ct-header__rule" custom={2} variants={headerReveal} />
          </div>

          {/* ── DESKTOP TABS NAV ── */}
          <motion.nav
            className="ct-tabs-nav"
            role="tablist"
            custom={3}
            variants={headerReveal}
          >
            {tabs.map((tab, index) => (
              <button
                key={tab.title}
                role="tab"
                aria-selected={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className={clsx(
                  'ct-tab-btn',
                  activeIndex === index && 'ct-tab-btn--active'
                )}
              >
                {activeIndex === index && (
                  <motion.span
                    layoutId="ct-tab-indicator"
                    className="ct-tab-indicator"
                    style={{ left: 0, right: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="ct-tab-icon">{tab.icon}</span>
                {tab.title}
              </button>
            ))}
          </motion.nav>

          {/* ── DESKTOP CONTENT ── */}
          <div className="ct-desktop-content">
            <AnimatePresence mode="wait">

              {/* SUMMARY */}
              {pageView === 'summary' && (
                <motion.div
                  key={`summary-${activeIndex}`}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -18, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
                  variants={summaryContainer}
                  className="ct-summary-grid"
                >
                  {/* Image */}
                  <motion.div className="ct-img-wrap" variants={imageReveal}>
                    <Image
                      src={activeTab.content.image}
                      alt={activeTab.content.heading}
                      width={520}
                      height={380}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </motion.div>

                  {/* Text */}
                  <div className="ct-content-body">
                    <motion.span className="ct-ghost-num" variants={summaryItem}>
                      {String(activeIndex + 1).padStart(2, '0')}
                    </motion.span>

                    <motion.span className="ct-content-eyebrow" variants={summaryItem}>
                      {activeTab.title}
                    </motion.span>
                    <motion.h3 className="ct-content-h3" variants={summaryItem}>
                      {activeTab.content.heading}
                    </motion.h3>
                    <motion.div className="ct-content-rule" variants={summaryItem} />
                    <motion.p className="ct-content-p" variants={summaryItem}>
                      {activeTab.content.shortText}
                    </motion.p>

                    <motion.button
                      onClick={() => setPageView('full')}
                      className="ct-read-btn"
                      variants={summaryItem}
                      whileTap={{ scale: 0.96 }}
                    >
                      Read more
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* FULL */}
              {pageView === 'full' && (
                <motion.div
                  key={`full-${activeIndex}`}
                  initial={{ opacity: 0, y: 28, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.985, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="ct-full-body"
                >
                  <span className="ct-content-eyebrow">{activeTab.title}</span>
                  <h3 className="ct-full-h3">{activeTab.content.heading}</h3>
                  <div className="ct-full-rule" />
                  <p className="ct-full-text">{activeTab.content.fullText}</p>

                  <motion.button
                    onClick={() => setPageView('summary')}
                    className="ct-back-btn"
                    whileTap={{ scale: 0.96 }}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M11 6.5H2M6 2.5l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </motion.button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── MOBILE ACCORDION ── */}
          <div className="ct-accordion">
            {tabs.map((tab, index) => (
              <div
                key={tab.title}
                className={clsx(
                  'ct-accord-item',
                  accordionOpen === index && 'ct-accord-item--open'
                )}
              >
                <button
                  onClick={() =>
                    setAccordionOpen(accordionOpen === index ? null : index)
                  }
                  className={clsx(
                    'ct-accord-trigger',
                    accordionOpen === index && 'ct-accord-trigger--open'
                  )}
                >
                  <span className="ct-accord-trigger__left">
                    <span className="ct-accord-trigger__icon">{tab.icon}</span>
                    {tab.title}
                  </span>
                  <span className={clsx(
                    'ct-accord-chevron',
                    accordionOpen === index && 'ct-accord-chevron--open'
                  )}>
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {accordionOpen === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.3, ease: 'easeInOut' },
                      }}
                      className="ct-accord-body"
                    >
                      <motion.div
                        className="ct-accord-body__inner"
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                      >
                        <h4 className="ct-accord-body__h4">
                          {tab.content.heading}
                        </h4>
                        <p className="ct-accord-body__text">
                          {tab.content.fullText}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </motion.section>
    </>
  );
}