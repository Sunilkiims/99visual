'use client';

import Link from "next/link";

export default function AnimationVideo() {
  return (
    <div className="w-full md:w-[100%]">
      <div className="aspect-[16/10] relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          controls
          preload="metadata"
          poster="/videos/thumbnails/marketing.jpg"
          aria-label="Visualization assets for digital marketing preview"
          className="w-full h-full object-cover rounded-2xl shadow-xl"
        >
          <source src="/videos/marketing.mp4" type="video/mp4" />
        </video>
      </div>
      <Link
        href="/videos/marketing-visualization-demo"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: "#2E5CFF" }}
      >
        Watch more →
      </Link>
    </div>
  );
}