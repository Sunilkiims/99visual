'use client';

import Link from "next/link";

export default function VideoShowcase() {
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
          poster="/videos/thumbnails/flyover.jpg"
          aria-label="Architectural walkthrough and flyover visualization preview"
          className="w-full h-full object-cover rounded-2xl shadow-xl"
        >
          <source src="/videos/flyover.mp4" type="video/mp4" />
        </video>
      </div>
      <Link
        href="/videos/walkthrough-flyover-visualization"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: "#2E5CFF" }}
      >
        Watch more →
      </Link>
    </div>
  );
}