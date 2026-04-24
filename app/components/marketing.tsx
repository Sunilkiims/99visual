'use client';

export default function AnimationVideo() {
  return (
    <div className="w-full md:w-[100%]">
      <div className="aspect-[16/10] relative">
        <video
          src="/videos/marketing.mp4"
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