"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    type: "image",
    image: "/slider/slide1.jpg",
    title: "Nature Awaits",
    description: "Reconnect with the wild in ways you never imagined.",
    cta: "Explore Nature",
  },
  {
    id: 2,
    type: "image",
    image: "/slider/slide2.jpg",
    title: "Future is Now",
    description: "Innovate with us into the future of tech.",
    cta: "Join the Future",
  },
  {
    id: 3,
    type: "image",
    image: "/slider/slide3.jpg",
    title: "Adventure Calls",
    description: "Pack your bags. The world is waiting.",
    cta: "Start Adventure",
  },
  {
    id: 4,
    type: "video",
    video: "/slider/background.mp4",
    title: "Live the Moment",
    description: "Feel the freedom of limitless possibilities.",
    cta: "Watch Now",
  },
];

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 0.95,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 1.2,
      ease: "easeIn",
    },
  },
};

const HomeSlider = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const paginate = (newIndex) => {
    setCurrent((prev) => (newIndex + slides.length) % slides.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const currentSlide = slides[current];

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-black">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide.id}
          className="absolute top-0 left-0 w-full h-full"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <div className="relative w-full h-full">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute w-full h-full"
            >
              {currentSlide.type === "video" ? (
                <video
                  key={currentSlide.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={currentSlide.video} type="video/mp4" />
                  <source
                    src={currentSlide.video.replace(".mp4", ".webm")}
                    type="video/webm"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  key={currentSlide.image}
                  src={currentSlide.image}
                  alt={currentSlide.title || "Slide Image"}
                  fill
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              )}
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-90 flex items-center justify-center text-center px-4">
              <div className="text-white max-w-2xl">
                <motion.h2
                  className="text-4xl md:text-6xl font-extrabold mb-6"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {currentSlide.title}
                </motion.h2>

                <motion.p
                  className="text-lg md:text-2xl mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {currentSlide.description}
                </motion.p>

                <motion.button
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 text-black font-semibold px-6 py-3 rounded-full border border-white shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundPosition: "200% center",
                    boxShadow: "0 0 30px rgba(0,255,255,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundSize: "200% auto",
                    transition: "all 0.4s ease-in-out",
                  }}
                >
                  {currentSlide.cta}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={() => paginate(current - 1)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:scale-110 transition duration-300 z-10 shadow-xl"
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        onClick={() => paginate(current + 1)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:scale-110 transition duration-300 z-10 shadow-xl"
        aria-label="Next slide"
      >
        &#10095;
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`w-4 h-4 rounded-full ${
              i === current ? "bg-white scale-125" : "bg-gray-400"
            } transition-all duration-300`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
