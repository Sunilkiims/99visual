"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/slider/slide1.jpg", 
    title: "Nature Awaits",
    description: "Reconnect with the wild in ways you never imagined.",
  },
  {
    id: 2,
    image: "/slider/slide2.jpg",
    title: "Future is Now",
    description: "Innovate with us into the future of tech.",
  },
  {
    id: 3,
    image: "/slider/slide3.jpg",
    title: "Adventure Calls",
    description: "Pack your bags. The world is waiting.",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const HomeScreenSlider = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = (newDirection) => {
    setCurrent([
      (current + newDirection + slides.length) % slides.length,
      newDirection,
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slides[current].id}
          className="absolute top-0 left-0 w-full h-full"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              layout="fill"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-center px-4">
              <div className="text-white max-w-2xl">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {slides[current].title}
                </motion.h2>
                <motion.p
                  className="text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {slides[current].description}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
        aria-label="Next slide"
      >
        &#10095;
      </button>
    </div>
  );
};

export default HomeScreenSlider;
