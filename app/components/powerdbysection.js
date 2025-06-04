// components/PoweredBySection.js
import React from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandVercel } from "react-icons/tb";
import { SiRust } from "react-icons/si";
import { BiLinkExternal } from 'react-icons/bi';  // Correct import for external link icon
import Image from "next/image";

export default function PoweredBySection() {
  return (
    <section className="relative py-24 bg-white dark:bg-black overflow-hidden">
      {/* SVG Background */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <Image
          src="/powered-lines.svg"
          alt="Powered By Lines"
          width={900}
          height={300}
          className="opacity-60 dark:opacity-30"
        />
      </div>

      {/* Powered By Badge */}
      <div className="relative z-10 flex justify-center mb-8">
        <div className="bg-gray-800 text-white dark:bg-gray-100 dark:text-black text-sm px-5 py-2 rounded-md font-semibold shadow-lg animate-pulse">
          Powered By
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-20">
        Built on a foundation of fast, production-grade tooling
      </h2>

      {/* Cards */}
      <div className="relative z-10 grid gap-6 md:grid-cols-3 px-6 max-w-6xl mx-auto">
        <FeatureCard
          icon={<FaReact className="text-blue-500" size={30} />}
          title="React"
          desc="The library for web and native user interfaces. Next.js is built on the latest React features, including Server Components and Actions."
        />
        <FeatureCard
          icon={<TbBrandVercel className="text-pink-500" size={30} />}
          title="Turbopack"
          desc="An incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js."
        />
        <FeatureCard
          icon={<SiRust className="text-orange-400" size={30} />}
          title="Speedy Web Compiler"
          desc="An extensible Rust-based platform for the next generation of fast developer tools, and can be used for both compilation and minification."
        />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 group">
      <div className="mb-4">{icon}</div>
      <div className="flex items-center gap-1 mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <BiLinkExternal size={16} className="text-gray-500 dark:text-gray-400 group-hover:translate-x-1 transition" />
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
    </div>
  );
}
