'use client';

export default function VideoShowcase() {
  return (
    <div className="w-full md:w-[40%]">
      <div className="aspect-[16/10] relative">
        <video
          src="/videos/flyover.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls
          className="w-full h-full object-cover rounded-2xl shadow-xl"
        />
      </div>
    </div>
  );
}