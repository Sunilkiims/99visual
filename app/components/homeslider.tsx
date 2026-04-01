"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  id: number;
  type: "image" | "video";
  image?: string;
  video?: string;
  title: string;
  description: string;
  cta: string;
  link?: string;
};

const slides: Slide[] = [
  {
    id: 1,
    type: "image",
    image: "/slider/slide1.jpg",
    title: "Smarter IT Solutions",
    description:
      "Expert IT consulting and data visualization solutions tailored to drive innovation, efficiency, and growth.",
    cta: "Explore Now",
    link: "/services/it-consulting",
  },
  {
    id: 2,
    type: "image",
    image: "/slider/slide2.jpg",
    title: "Website and Web-App Development",
    description:
      "Elevating Your Digital Blueprint, Redefining Online Excellence.",
    cta: "Explore Now",
    link: "/services/website-development",
  },
  {
    id: 3,
    type: "image",
    image: "/slider/slide4.jpg",
    title: "Precision Mapping & Design",
    description:
      "Unlock accurate spatial analysis and high-detail drafting solutions.",
    cta: "Explore Now",
    link: "/services/cad-gis-photogrammetry",
  },
  {
    id: 4,
    type: "image",
    image: "/slider/slide3.jpg",
    title: "Empower your Brand",
    description:
      "Dynamic Digital Marketing & SEO Strategies beyond competition.",
    cta: "Explore Now",
    link: "/services/digital-marketing",
  },
  {
    id: 5,
    type: "video",
    video: "/slider/background.mp4",
    title: "Creative Visualizations",
    description:
      "We bring your products to life with stunning 3D modeling and rendering.",
    cta: "Explore Now",
    link: "/services/visualization",
  },
];

// 🔥 Smooth slide animation
const slideVariants: Variants = {
  enter: { opacity: 0, scale: 1.1 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 1.2, ease: [0.4, 0, 1, 1] },
  },
};

// 🔥 Text container (stagger effect)
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

// 🔥 Individual text animation
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const HomeSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const paginate = (newIndex: number) => {
    setCurrent((prev) => (newIndex + slides.length) % slides.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const currentSlide = slides[current];

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          className="absolute w-full h-full"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {/* Background */}
          <motion.div
            className="absolute w-full h-full"
            animate={{ scale: 1.08 }}
            transition={{ duration: 8, ease: "linear" }}
          >
            {currentSlide.type === "video" && currentSlide.video && (
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={currentSlide.video} type="video/mp4" />
              </video>
            )}

            {currentSlide.type === "image" && currentSlide.image && (
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                style={{ objectFit: "cover" }}
                priority={current === 0}
              />
            )}
          </motion.div>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 flex items-center justify-center text-center px-4">
            <motion.div
              className="text-white max-w-2xl"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-extrabold mb-6 text-yellow-300"
              >
                {currentSlide.title}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl mb-6"
              >
                {currentSlide.description}
              </motion.p>

              {currentSlide.link && (
                <motion.div variants={itemVariants}>
                  <Link href={currentSlide.link}>
                    <motion.button
                      className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 text-black font-semibold px-6 py-3 rounded-full border border-white shadow-lg"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 25px rgba(0,255,255,0.6)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentSlide.cta}
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={() => paginate(current - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
      >
        ‹
      </button>

      <button
        onClick={() => paginate(current + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;