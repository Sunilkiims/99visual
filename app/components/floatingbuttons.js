// components/FloatingButtons.js
'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaArrowUp } from 'react-icons/fa';

export default function FloatingButtons() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-4 flex flex-col items-center space-y-3 z-50">
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
          aria-label="Scroll to Top"
        >
          <FaArrowUp />
        </button>
      )}

      <a
        href="https://wa.me/919999999999" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <a
        href="tel:+919999999999" // Replace with your phone number
        className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition"
        aria-label="Call"
      >
        <FaPhoneAlt />
      </a>
    </div>
  );
}
