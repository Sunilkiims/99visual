'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  FaLightbulb,
  FaMapSigns,
  FaCode,
  FaCheckCircle,
  FaRocket,
  FaChartLine,
} from 'react-icons/fa';

const steps = [
  {
    icon: <FaLightbulb />,
    title: 'Discover & Understand',
    desc: 'We dive deep into your goals, industry, and audience to craft personalized digital strategies that work.',
    color: 'text-yellow-400',
  },
  {
    icon: <FaMapSigns />,
    title: 'Strategize & Plan',
    desc: 'Our agile roadmap aligns every step with your goals—ensuring zero surprises and full clarity.',
    color: 'text-purple-500',
  },
  {
    icon: <FaCode />,
    title: 'Design & Develop',
    desc: 'From UI/UX to powerful code, we bring your ideas to life with precision, style, and speed.',
    color: 'text-blue-500',
  },
  {
    icon: <FaCheckCircle />,
    title: 'Test & Optimize',
    desc: 'We rigorously test every detail for performance, security, and perfection—across all devices.',
    color: 'text-green-500',
  },
  {
    icon: <FaRocket />,
    title: 'Launch & Support',
    desc: 'Go live with confidence. We stay with you post-launch to support, scale, and grow.',
    color: 'text-red-500',
  },
  {
    icon: <FaChartLine />,
    title: 'Analyze & Grow',
    desc: 'We continuously monitor performance, analyze user behavior, and optimize strategies to drive long-term growth and ROI.',
    color: 'text-orange-500',
  },
];

export default function HowWeWork() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">

      {/* GLOBAL BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,115,0,0.15),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,115,0,0.12),transparent_40%)]"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-sm tracking-widest uppercase text-orange-400 font-semibold">
            How We Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
            Our Process, Your Success
          </h2>
          <p className="mt-5 text-gray-400 text-lg max-w-2xl mx-auto">
            A next-generation workflow designed for performance, scalability, and growth.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 relative">
          {steps.map((step, index) => (
            <TiltCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================= */
/* 🔥 TILT CARD COMPONENT */
/* ========================= */

function TiltCard({ step, index }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;

    ref.current!.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  };

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      {/* CONNECTOR LINE */}
      {index < 5 && (
        <div className="hidden lg:block absolute top-1/2 right-[-30px] w-16 h-[2px] bg-gradient-to-r from-orange-500/60 to-transparent"></div>
      )}

      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        className="relative p-[1px] rounded-2xl bg-gradient-to-br from-orange-500/30 via-transparent to-orange-400/20 transition duration-300"
      >
        <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl transition-all duration-300">

          {/* SPOTLIGHT EFFECT */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.25),transparent_60%)]"></div>

          {/* STEP NUMBER */}
          <div className="absolute top-4 right-4 text-xs font-bold text-gray-600 group-hover:text-orange-400">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* ICON */}
          <div className={`flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-white/10 group-hover:scale-110 transition ${step.color}`}>
            {step.icon}
          </div>

          {/* TITLE */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition">
            {step.title}
          </h3>

          {/* DESC */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {step.desc}
          </p>

          {/* BOTTOM GLOW */}
          <div className="mt-5 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-orange-300 transition-all duration-500"></div>
        </div>
      </div>
    </motion.div>
  );
}