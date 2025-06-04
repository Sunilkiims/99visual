'use client';

import { useEffect, useState } from 'react';
import Header from '../components/header';

const PartnerBanner = () => {
  const swirlBackground = {
    backgroundImage: `
      radial-gradient(circle at 30% 30%, rgba(207, 11, 11, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 70% 70%, rgb(148, 148, 148) 0%, transparent 40%),
      repeating-radial-gradient(circle, rgb(1, 44, 1), transparent 10px)
    `,
    animation: 'swirlAnim 20s linear infinite',
    backgroundSize: '200% 200%',
    filter: 'blur(1px)',
    opacity: 0.4,
  };

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 1}px`,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section className="relative h-64 md:h-40 flex items-center justify-center bg-black overflow-hidden">
      <style>
        {`
          @keyframes swirlAnim {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
          @keyframes zoomIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .zoom-in {
            animation: zoomIn 1.2s ease-out forwards;
          }
        `}
      </style>

      {/* Animated swirl background */}
      <div className="absolute inset-0 z-0" style={swirlBackground} />

      {/* Glowing Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle, i) => (
          <span
            key={i}
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
            }}
            className="absolute bg-white rounded-full blur-sm opacity-40 animate-ping"
          />
        ))}
      </div>

      {/* Text with zoom-in animation */}
      <h1 className="absolute top-4/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-semibold tracking-wider z-10 zoom-in">
        PARTNER
      </h1>
    </section>
  );
};

export default function PartnerPage() {
  return (
    <>
      <Header />
      <PartnerBanner />
    </>
  );
}
