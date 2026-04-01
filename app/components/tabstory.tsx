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
        'Progress begins when action takes over – stop talking, let’s start building!',
      shortText:
        'During the unprecedented challenges of the COVID-19 pandemic, our team at 99 Visual demonstrated resilience, dedication, and hands-on leadership while supporting critical IT infrastructure.',
      fullText: `During the unprecedented challenges of the COVID-19 pandemic, our team at 99Visual demonstrated resilience, dedication, and hands-on leadership while supporting critical IT infrastructure for private and government organizations.

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
        'Our mission is to empower businesses through innovative, customized IT solutions that drive efficiency and sustainable growth.We focus on delivering technology that simplifies complexity, enhances performance, and enables organizations to operate with confidence in an evolving digital landscape.',
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
        'Integrity, Innovation, and Impact form the foundation of everything we do.Integrity ensures transparency, honesty, and accountability in every engagement.Innovation drives us to challenge conventions and design forward-thinking solutions.Impact reminds us that success is measured by real-world results—not promises.',
      fullText: `Integrity, Innovation, and Impact form the foundation of everything we do.

Integrity is at the heart of every engagement. We believe in complete transparency, open communication, and unwavering honesty in all our interactions. Our commitment to accountability ensures that we take full ownership of our work, build trust through consistency, and uphold the highest ethical standards in every project we undertake.

Innovation drives our mindset and fuels our approach to problem-solving. We continuously challenge conventional thinking, explore emerging technologies, and design forward-looking solutions that empower businesses to stay ahead in a competitive digital landscape. By embracing creativity and adaptability, we turn complex challenges into meaningful opportunities for growth.

Impact is the ultimate measure of our success. We focus on delivering tangible, real-world results that create measurable value for our clients. Rather than making promises, we prioritize outcomes—enhancing performance, improving efficiency, and enabling long-term business transformation.

Together, these values guide our decisions, strengthen our partnerships, and define the experiences we create. They ensure that every solution we deliver is purposeful, every relationship we build is trusted, and every outcome we achieve is meaningful and sustainable.`,
      image: '/images/values/image.png',
    },
  },
];

/* ---------------- COMPONENT ---------------- */

export default function CompanyTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);
  const [pageView, setPageView] = useState<'summary' | 'full'>('summary');

  const activeTab = tabs[activeIndex];

  /* Reset page when switching tabs */
  useEffect(() => {
    setPageView('summary');
  }, [activeIndex]);

  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">

        {/* ---------------- DESKTOP TABS ---------------- */}
        <div className="hidden md:flex justify-center gap-8 border-b mb-10">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              onClick={() => setActiveIndex(index)}
              className={clsx(
                'pb-2 font-semibold flex items-center gap-2',
                activeIndex === index
                  ? 'text-orange-500 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-orange-500'
              )}
            >
              {tab.icon}
              {tab.title}
            </button>
          ))}
        </div>

        {/* ---------------- DESKTOP CONTENT ---------------- */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">

            {/* SUMMARY PAGE */}
            {pageView === 'summary' && (
              <motion.div
                key="summary"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformOrigin: 'left', perspective: 1200 }}
                className="grid grid-cols-2 gap-10 items-center"
              >
                <Image
                  src={activeTab.content.image}
                  alt={activeTab.content.heading}
                  width={420}
                  height={300}
                  className="rounded-xl shadow-lg"
                />

                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {activeTab.content.heading}
                  </h2>

                  <p className="text-gray-600 leading-relaxed">
                    {activeTab.content.shortText}
                  </p>

                  <button
                    onClick={() => setPageView('full')}
                    className="mt-4 text-orange-500 font-semibold hover:underline"
                  >
                    Read more →
                  </button>
                </div>
              </motion.div>
            )}

            {/* FULL PAGE */}
            {pageView === 'full' && (
              <motion.div
                key="full"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformOrigin: 'right', perspective: 1200 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-3xl font-bold mb-6">
                  {activeTab.content.heading}
                </h2>

                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {activeTab.content.fullText}
                </p>

                <button
                  onClick={() => setPageView('summary')}
                  className="mt-6 text-orange-500 font-semibold hover:underline"
                >
                  ← Read less
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ---------------- MOBILE ACCORDION ---------------- */}
        <div className="md:hidden space-y-4">
          {tabs.map((tab, index) => (
            <div
              key={tab.title}
              className="border rounded-lg bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setAccordionOpen(accordionOpen === index ? null : index)
                }
                className="w-full flex justify-between items-center px-4 py-3 font-semibold"
              >
                <span className="flex items-center gap-2">
                  {tab.icon}
                  {tab.title}
                </span>
                <span>{accordionOpen === index ? '−' : '+'}</span>
              </button>

              <AnimatePresence>
                {accordionOpen === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-sm text-gray-600 whitespace-pre-line"
                  >
                    <h3 className="font-bold text-lg mb-2">
                      {tab.content.heading}
                    </h3>
                    {tab.content.fullText}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
