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
    <section className="relative py-16 bg-white dark:bg-black overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,115,0,0.08),transparent_60%)]"></div>

      {/* Badge */}
      <div className="relative z-10 flex justify-center mb-8">
        <div className="bg-gray-900 text-white dark:bg-white dark:text-black text-sm px-6 py-2 rounded-full font-semibold shadow-lg tracking-wide">
          SERVICES WE OFFER
        </div>
      </div>

      {/* Title */}
    <h1 className="text-xl md:text-2xl font-semibold text-center text-gray-900 dark:text-white mb-12 max-w-4xl mx-auto px-6 md:px-12 leading-relaxed">
  From Ideas to Impact — One Service. Endless Possibilities.
  <span className="block mt-2">
    Powered by <span className="text-orange-500 font-bold">99 Visual</span>.
  </span>
</h1>

      {/* Grid */}
      <div className="relative z-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-6 max-w-6xl mx-auto">
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

      {/* 🔥 Animated Border (Tracing Effect) */}
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
      <div className="relative h-full backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-white/20 dark:border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 overflow-hidden">

        {/* 🔥 Spotlight */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.15),transparent_60%)] pointer-events-none rounded-2xl"></div>

        {/* Icon */}
        <div className={`flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-gray-100 dark:bg-zinc-800 ${color} text-xl group-hover:scale-110 transition`}>
          {icon}
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition">
            {title}
          </h3>
          <BiLinkExternal
            size={16}
            className="text-gray-400 group-hover:text-orange-400 group-hover:translate-x-1 transition"
          />
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {desc}
        </p>

      </div>
    </a>
  );
}