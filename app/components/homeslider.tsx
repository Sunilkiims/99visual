"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  id: number;
  type: "image" | "video";
  image?: string;
  video?: string;
  label?: string;
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
    label: "IT Consulting",
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
    label: "Web Development",
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
    label: "CAD & GIS",
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
    label: "Digital Marketing",
    title: "Empower your Brand",
    description:
      "Dynamic Digital Marketing & SEO Strategies beyond competition.",
    cta: "Explore Now",
    link: "/services/digital-marketing-seo",
  },
  {
    id: 5,
    type: "video",
    video: "/slider/background.mp4",
    label: "3D & Visualization",
    title: "Creative Visualizations",
    description:
      "We bring your products to life with stunning 3D modeling and rendering.",
    cta: "Explore Now",
    link: "/services/visualization",
  },
];

const SLIDE_DURATION = 6000;

const slideVariants = (direction: number): Variants => ({
  enter: {
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    scale: 1.04,
  },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    scale: 0.97,
    transition: { duration: 0.85, ease: [0.4, 0, 1, 1] },
  }),
});

const textContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.35 },
  },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const HomeSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const startTimers = useCallback(() => {
    clearTimers();
    setProgress(0);

    const step = 100 / (SLIDE_DURATION / 50);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 50);

    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, SLIDE_DURATION);
  }, [clearTimers]);

  useEffect(() => {
    if (!paused) {
      startTimers();
    } else {
      clearTimers();
    }
    return clearTimers;
  }, [paused, current, startTimers, clearTimers]);

  const paginate = useCallback(
    (newIndex: number) => {
      const next = ((newIndex % slides.length) + slides.length) % slides.length;
      setDirection(newIndex >= current ? 1 : -1);
      setCurrent(next);
    },
    [current]
  );

  const currentSlide = slides[current];

  return (
    <div
      className="relative w-full h-[50vh] md:h-[600px] min-h-[340px] overflow-hidden bg-black select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide.id}
          className="absolute w-full h-full will-change-transform"
          variants={slideVariants(direction)}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {/* Ken Burns background */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          >
            {currentSlide.type === "video" && currentSlide.video ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src={currentSlide.video} type="video/mp4" />
              </video>
            ) : currentSlide.image ? (
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority={current === 0}
              />
            ) : null}
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Text content */}
          <div className="absolute inset-0 flex items-center">
            <motion.div
              className="text-white px-6 md:px-16 max-w-xl md:max-w-2xl"
              variants={textContainer}
              initial="hidden"
              animate="show"
            >
              {currentSlide.label && (
                <motion.span
                  variants={textItem}
                  className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/40 bg-cyan-400/10 backdrop-blur-sm px-3 py-1 rounded-full mb-4"
                >
                  {currentSlide.label}
                </motion.span>
              )}

              <motion.h2
                variants={textItem}
                className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg"
              >
                {currentSlide.title}
              </motion.h2>

              <motion.p
                variants={textItem}
                className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-7 max-w-md"
              >
                {currentSlide.description}
              </motion.p>

              {currentSlide.link && (
                <motion.div variants={textItem}>
                  <Link href={currentSlide.link}>
                    <motion.button
                      className="relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 text-black font-bold text-sm md:text-base px-6 py-3 rounded-full shadow-lg"
                      whileHover={{ scale: 1.07, boxShadow: "0 0 28px rgba(0,220,255,0.55)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentSlide.cta}
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pause indicator */}
      <AnimatePresence>
        {paused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 z-20 text-white/50 text-xs tracking-widest uppercase"
          >
            ⏸ Paused
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dot indicators */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => paginate(i)}
            className="relative flex items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 md:w-10 h-1.5 bg-white/30"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
            {i === current && (
              <span
                className="absolute left-0 top-0 h-full rounded-full bg-cyan-400"
                style={{ width: `${progress}%`, transition: "width 50ms linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-5 right-4 md:right-8 z-20 text-white/40 text-xs font-mono tracking-wider">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </div>
  );
};

export default HomeSlider;