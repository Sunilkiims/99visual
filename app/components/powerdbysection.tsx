'use client';

import React, { ReactNode } from 'react';
import {
  FaLaptopCode,
  FaEye,
  FaUsersCog,
  FaBullhorn,
  FaMapMarkedAlt,
  FaSearchPlus
} from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';

export default function PoweredBySection() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

      {/* Grid overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Grain */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, opacity: .025, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Orb */}
      <div
        aria-hidden
        style={{
          position: 'absolute', borderRadius: '50%',
          width: 420, height: 420,
          background: 'radial-gradient(circle, #f97316, transparent 70%)',
          top: -160, right: -100, opacity: .06,
          filter: 'blur(100px)', pointerEvents: 'none',
        }}
      />

      {/* Badge */}
      <div className="relative z-10 flex justify-center mb-8">
        <div className="text-sm px-6 py-2 rounded-full font-semibold shadow-lg tracking-wide" style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.28)', color: '#f97316', letterSpacing: '.15em', fontSize: 10, textTransform: 'uppercase' }}>
          Services We Offer
        </div>
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-xl md:text-2xl font-semibold text-center mb-12 max-w-4xl mx-auto px-6 md:px-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
        From Ideas to Impact — One Service. Endless Possibilities.
        <span className="block mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Powered by <span style={{ color: '#f97316', fontWeight: 700 }}>99 Visual</span>.
        </span>
      </h1>

      {/* Grid */}
      <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-6 max-w-6xl mx-auto">
        <FeatureCard
          icon={<FaEye />}
          color="text-blue-500"
          title="Visualization"
          desc="Powerful 3D and 2D visualization services that bring data and designs to life."
          link="/services/visualization"
        />
        <FeatureCard
          icon={<FaLaptopCode />}
          color="text-red-500"
          title="Website and Web-App Development"
          desc="We build responsive websites and scalable web applications tailored to your needs."
          link="/services/website-development"
        />
        <FeatureCard
          icon={<FaUsersCog />}
          color="text-green-400"
          title="IT Consulting"
          desc="Expert IT consulting for robust, secure, and scalable infrastructure."
          link="/services/it-consulting"
        />
        <FeatureCard
          icon={<FaBullhorn />}
          color="text-pink-500"
          title="Digital Marketing & SEO"
          desc="Advanced strategies to increase visibility and organic traffic."
          link="/services/digital-marketing-seo"
        />
        <FeatureCard
          icon={<FaMapMarkedAlt />}
          color="text-indigo-500"
          title="CAD, GIS & Photogrammetry"
          desc="Comprehensive mapping, modeling, and spatial data services."
          link="/services/cad-gis-photogrammetry"
        />
        <FeatureCard
          icon={<FaSearchPlus />}
          color="text-orange-500"
          title="Testing & Development"
          desc="Ensure quality and performance across platforms with our QA and Dev services."
          link="/services/automation-testing"
        />
      </div>
    </section>
  );
}

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  desc: string;
  link: string;
  color: string;
};

function FeatureCard({ icon, title, desc, link, color }: FeatureCardProps) {
  return (
    <a href={link} className="group relative block">

      {/* Animated Border */}
      <svg className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none">
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="16"
          ry="16"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeDasharray="400"
          strokeDashoffset="400"
          className="group-hover:stroke-dashoffset-0 transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
      </svg>

      {/* Card */}
      <div
        className="relative h-full p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 overflow-hidden"
        style={{
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >

        {/* Spotlight */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none rounded-2xl"
          style={{ background: 'radial-gradient(circle at center, rgba(249,115,22,0.1), transparent 60%)' }}
        />

        {/* Icon */}
        <div className={`flex items-center justify-center w-14 h-14 mb-4 rounded-xl ${color} text-xl group-hover:scale-110 transition`}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {icon}
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold group-hover:text-orange-500 transition" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {title}
          </h3>
          <BiLinkExternal
            size={16}
            className="text-gray-600 group-hover:text-orange-400 group-hover:translate-x-1 transition"
          />
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {desc}
        </p>

      </div>
    </a>
  );
}