"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://source.unsplash.com/random/800x600?sig=1",
  "https://source.unsplash.com/random/800x600?sig=2",
  "https://source.unsplash.com/random/800x600?sig=3",
  "https://source.unsplash.com/random/800x600?sig=4",
  "https://source.unsplash.com/random/800x600?sig=5",
  "https://source.unsplash.com/random/800x600?sig=6",
];

const ImageGallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const fullscreenRef = useRef();

  const handleFullScreen = () => {
    if (fullscreenRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        fullscreenRef.current.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Image Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg shadow hover:scale-105 transition-transform"
            onClick={() => setSelectedImg(src)}
          >
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            ref={fullscreenRef}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <div
              className="relative"
              onClick={(e) => e.stopPropagation()} // prevent background close
            >
              <motion.img
                src={selectedImg}
                alt="Preview"
                className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              />

              <div className="absolute top-4 right-4 space-x-2">
                <button
                  onClick={() => setSelectedImg(null)}
                  className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
                >
                  Close
                </button>
                <button
                  onClick={handleFullScreen}
                  className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
                >
                  Full Screen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
