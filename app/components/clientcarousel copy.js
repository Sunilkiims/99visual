'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './clientcarousel.module.css';
import Image from 'next/image'; // Only if you're using Next.js

const clientLogos = [
  '/logos/client1.png',
  '/logos/client2.png',
  '/logos/client3.png',
  '/logos/client4.png',
  '/logos/client5.png',
];

export default function ClientCarousel() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure it's rendered on client only to avoid hydration mismatch
  }, []);

  if (!isClient) return null;

  return (
    <section className={styles.carouselContainer} aria-label="Client Logo Carousel">
      <h2 className={styles.heading}>Our Clients</h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        loop
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {clientLogos.map((logo, idx) => (
          <SwiperSlide key={idx}>
            <div className={styles.logoSlide}>
              <Image
                src={logo}
                alt={`Logo of client ${idx + 1}`}
                width={120}
                height={60}
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
