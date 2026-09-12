'use client';

import Link from "next/link";

export default function AnimationVideo() {
  return (
    <div className="w-full md:w-[100%]">
      <div className="aspect-[16/10] relative">
        <video
          src="/videos/animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls
          className="w-full h-full object-cover rounded-2xl shadow-xl"
        />
      </div>
      <Link
        href="/videos/animation-motion-visualization"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: "#2E5CFF" }}
      >
        Watch more →
      </Link>
    </div>
  );
}