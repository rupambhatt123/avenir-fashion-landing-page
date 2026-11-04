'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import websiteData from '@/data/websiteData.json';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function InstagramFeed() {
  const fashionSections = (websiteData as any)?.categories?.Fashion?.sections || {};
  const feed = fashionSections.InstagramFeed?.variants?.FashionInstagram1;

  const [isPaused, setIsPaused] = useState(false);

  if (!feed) {
    return null;
  }

  // Safe check for photos array
  const photoList: string[] = feed.photos || feed.images || [];

  // Seamless infinite loop ke liye photos ko duplicate kiya gaya hai
  const doubledPhotos = [...photoList, ...photoList];

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-10 pb-12 sm:pt-14 sm:pb-16 border-t border-[#E7E2D8]">
      {/* Header */}
      <div className="mx-auto max-w-[1440px] px-4 text-center mb-6 sm:mb-8">
        <a
          href={feed.url || 'https://www.instagram.com/'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#9E6E3E] hover:text-[#885A2B] transition-colors"
        >
          <InstagramIcon size={18} />
          <span>{feed.handle || 'Follow Us On Instagram'}</span>
        </a>
        {feed.title && (
          <h3 className="text-base sm:text-xl font-normal text-[#1A1A1A] mt-1.5">
            {feed.title}
          </h3>
        )}
      </div>

      {/* Full Responsive Infinite Marquee Track (Phone + Desktop dono ke liye) */}
      <div
        className="w-full overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-3 sm:gap-4 w-max"
          animate={{
            x: isPaused ? undefined : ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 28,
              ease: 'linear',
            },
          }}
        >
          {doubledPhotos.map((img: string, idx: number) => (
            <div
              key={idx}
              className="group relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 shrink-0 overflow-hidden rounded-sm bg-[#EDE6DC] shadow-sm cursor-pointer"
            >
              <Image
                src={img}
                alt={`Avenir Instagram look ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <InstagramIcon size={26} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}