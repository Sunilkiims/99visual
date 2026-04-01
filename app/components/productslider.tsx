'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductSlider() {
  const images = [
    '/images/product-slider1.jpg',
    '/images/product-slider2.jpg',
    '/images/product-slider3.jpg',
    '/images/product-slider4.jpg',
  ];

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <section className="py-12 px-6 sm:px-8 md:px-12 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto">
       

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="rounded-lg shadow-lg"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                className="aspect-video relative w-full cursor-zoom-in"
                onClick={() => setZoomedImage(src)}
              >
                <Image
                  src={src}
                  alt={`Product Slide ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Fullscreen Landscape Modal with Zoom/Pan */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-5 right-5 text-white text-2xl font-bold bg-black/60 px-4 py-2 rounded-full hover:bg-black"
          >
            ✕
          </button>

          <div className="relative w-[95vw] h-[60vw] bg-black overflow-hidden rounded-xl max-h-[90vh]">
            <TransformWrapper
              initialScale={1}
              wheel={{ step: 0.1 }}
              pinch={{ step: 5 }}
              doubleClick={{ disabled: true }}
              minScale={1}
              maxScale={4}
              panning={{ velocityDisabled: true }}
            >
              <TransformComponent>
                <Image
                  src={zoomedImage}
                  alt="Zoomed"
                  width={1600}
                  height={900}
                  className="w-full h-full object-contain"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}
    </section>
  );
}
