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

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="1.5" width="3.5" height="11" rx="1" fill="currentColor" />
    <rect x="8.5" y="1.5" width="3.5" height="11" rx="1" fill="currentColor" />
  </svg>
);

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 1.5L12 7L3 12.5V1.5Z" fill="currentColor" />
  </svg>
);

const HomeSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [manualPause, setManualPause] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const paused = manualPause;

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

  const toggleManualPause = useCallback(() => {
    setManualPause((prev) => !prev);
  }, []);

  const currentSlide = slides[current];

  return (
    // h-dvh = "dynamic viewport height": true fullscreen on every device,
    // including mobile browsers where the address bar shows/hides.
    // h-screen is kept only as a fallback for very old browsers.
    <div
      className="relative w-full h-screen h-dvh min-h-[520px] max-h-[1000px] overflow-hidden bg-black select-none"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .slider-label {
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.18em;
          font-weight: 500;
        }
        .slider-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .slider-description {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          letter-spacing: 0.02em;
          line-height: 1.7;
        }
        .slider-cta {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.78rem;
        }
        .slider-counter {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          letter-spacing: 0.15em;
        }
      `}</style>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide.id}
          className="absolute inset-0 w-full h-full will-change-transform"
          variants={slideVariants(direction)}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <motion.div
            className="absolute inset-0 w-full h-full will-change-transform"
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
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority={current === 0}
              />
            ) : null}
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <motion.div
              className="text-white px-5 sm:px-8 md:px-16 max-w-[90%] sm:max-w-xl md:max-w-2xl"
              variants={textContainer}
              initial="hidden"
              animate="show"
            >
              {currentSlide.label && (
                <motion.span
                  variants={textItem}
                  className="slider-label inline-block text-[10px] md:text-[11px] uppercase text-cyan-300 border border-cyan-400/30 bg-cyan-400/8 backdrop-blur-sm px-3 py-1 rounded-full mb-4 md:mb-5 tracking-widest"
                >
                  {currentSlide.label}
                </motion.span>
              )}

              <motion.h2
                variants={textItem}
                className="slider-title text-3xl xs:text-4xl sm:text-4xl md:text-6xl mb-3 md:mb-4 text-white"
                style={{ textShadow: "0 2px 32px rgba(0,0,0,0.45)" }}
              >
                {currentSlide.title}
              </motion.h2>

              <motion.div
                variants={textItem}
                className="w-12 h-px bg-cyan-400/60 mb-4 md:mb-5"
              />

              <motion.p
                variants={textItem}
                className="slider-description text-sm sm:text-base md:text-[1.05rem] text-white/70 mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-md"
              >
                {currentSlide.description}
              </motion.p>

              {currentSlide.link && (
                <motion.div variants={textItem}>
                  <Link href={currentSlide.link}>
                    <motion.button
                      className="slider-cta relative inline-flex items-center gap-2.5 bg-white text-black px-6 py-2.5 md:px-7 md:py-3 rounded-full shadow-xl"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#22d3ee",
                        boxShadow: "0 0 32px rgba(0,220,255,0.4)",
                      }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                    >
                      {currentSlide.cta}
                      <svg
                        className="w-3.5 h-3.5"
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

      {/* Top-right controls — respects notches / safe areas */}
      <div
        className="absolute z-30 flex items-center gap-3"
        style={{
          top: "max(1rem, env(safe-area-inset-top))",
          right: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <span className="slider-counter text-white/40 text-xs">
          {String(current + 1).padStart(2, "0")}
          <span className="text-white/20 mx-1">/</span>
          {String(slides.length).padStart(2, "0")}
        </span>

        <motion.button
          onClick={toggleManualPause}
          aria-label={manualPause ? "Play slideshow" : "Pause slideshow"}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white/70 hover:text-white hover:border-white/50 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={manualPause ? "play" : "pause"}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              {manualPause ? <PlayIcon /> : <PauseIcon />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Dot indicators — respects safe area at bottom */}
      <div
        className="absolute w-full flex justify-center gap-3 z-20"
        style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
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
                  ? "w-8 md:w-10 h-1.5 bg-white/20"
                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
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
    </div>
  );
};

export default HomeSlider;
