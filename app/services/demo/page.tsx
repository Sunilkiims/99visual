"use client";
import { useState, useEffect } from "react";

export default function AdvancedCadGisSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle open animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsVisible(true), 10);
    }
  }, [isOpen]);

  // ESC + cleanup
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      document.body.style.overflow = "auto";
    }, 300); // match animation duration
  };

  return (
    <>
      {/* MAIN SECTION */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced CAD, GIS & Geospatial Services
            </h2>

            <p className="text-gray-600 mb-6 text-lg">
              Our <span className="font-semibold text-black">CAD experts</span> create precise
              drawings and geospatial models with industry-grade accuracy.
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              Read More →
            </button>
          </div>

          <div className="hidden md:block">
            <img
              src="/images/cad-gis-services.jpg"
              alt="CAD GIS"
              className="rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* MODAL */}
      {isOpen && (
        <div
          onClick={handleClose}
          className={`fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-10 transform transition-all duration-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-black text-3xl"
            >
              ×
            </button>

            <h2 className="text-4xl font-bold mb-6">
              Advanced CAD, GIS & Geospatial Services
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Full detailed content goes here...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
