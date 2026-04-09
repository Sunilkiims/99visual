"use client";

import { FaBuilding, FaLaptopCode, FaUniversity, FaRocket, FaShoppingCart } from "react-icons/fa";

const industries = [
  {
    icon: <FaBuilding size={28} />,
    title: "Real Estate & Architecture",
    desc: "High-quality 3D visualization, rendering, and CAD solutions to bring architectural concepts to life.",
  },
  {
    icon: <FaLaptopCode size={28} />,
    title: "IT & Technology",
    desc: "Scalable web applications, digital platforms, and IT consulting tailored for tech-driven businesses.",
  },
  {
    icon: <FaUniversity size={28} />,
    title: "Government Projects",
    desc: "Reliable IT infrastructure, GIS mapping, and secure solutions for public sector and government operations.",
  },
  {
    icon: <FaRocket size={28} />,
    title: "Startups & Entrepreneurs",
    desc: "End-to-end digital solutions to help startups launch, grow, and scale successfully.",
  },
  {
    icon: <FaShoppingCart size={28} />,
    title: "E-commerce & Retail",
    desc: "Conversion-focused eCommerce platforms, SEO, and marketing strategies to boost online sales.",
  },
];

export default function IndustriesSection() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Industries We Serve
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          We deliver tailored solutions across diverse industries, helping businesses
          innovate, grow, and lead in their respective markets.
        </p>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 p-6 rounded-2xl shadow-lg hover:shadow-orange-500/20 hover:-translate-y-2 transition-all duration-300 border border-zinc-800"
            >
              <div className="text-orange-500 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

       

      </div>
    </section>
  );
}