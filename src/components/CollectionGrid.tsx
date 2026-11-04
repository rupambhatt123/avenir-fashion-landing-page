'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Playfair_Display, Poppins } from 'next/font/google';
import websiteData from '@/data/websiteData.json';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

type Tile = { slug: string; label: string; src: string; className?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CollectionGrid() {
  const fashionSections = (websiteData as any)?.categories?.Fashion?.sections || {};
  const collectionsData =
    fashionSections.CollectionsGrid?.variants?.FashionCollectionsGrid1;

  const [mobileIndex, setMobileIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  if (!collectionsData) {
    return null;
  }

  const tiles: Tile[] = collectionsData.tiles || [];

  const handlePrev = () => {
    setMobileIndex((prev) => (prev === 0 ? tiles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setMobileIndex((prev) => (prev === tiles.length - 1 ? 0 : prev + 1));
  };

  // Autoplay (3.5 seconds)
  useEffect(() => {
    if (tiles.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setMobileIndex((prev) => (prev === tiles.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [tiles.length, isPaused]);

  const currentTile = tiles[mobileIndex] || tiles[0];

  return (
    <section
      id="collections"
      className={`${poppins.className} relative isolate overflow-hidden bg-[#FFFDFB] pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-24 border-b border-[#E7E2D8]`}
    >
      {/* Header */}
      <div className="mx-auto mb-8 max-w-[1000px] px-4 text-center sm:px-6 lg:mb-12">
        <div className="mb-2 flex items-center justify-center gap-3 sm:mb-3 sm:gap-4">
          <span className="h-[1.5px] w-6 sm:w-9 bg-[#A86F35]" />
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#A86F35]">
            {collectionsData.badge || 'Collections'}
          </span>
          <span className="h-[1.5px] w-6 sm:w-9 bg-[#A86F35]" />
        </div>

        <h2
          className={`${playfair.className} text-[clamp(28px,7vw,64px)] font-normal leading-tight text-[#141414]`}
        >
          {collectionsData.title}{' '}
          <span className="italic text-[#A86F35]">
            {collectionsData.titleHighlight}
          </span>
        </h2>

        {collectionsData.description && (
          <p className="mx-auto mt-2.5 max-w-[750px] px-2 text-xs leading-relaxed text-[#666] sm:mt-3 sm:text-base">
            {collectionsData.description}
          </p>
        )}
      </div>

      {/* Phone View: Swipeable Touch Carousel (< sm) */}
      {tiles.length > 0 && currentTile && (
        <div
          className="relative block sm:hidden px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="relative aspect-[4/5] max-h-[460px] w-full overflow-hidden rounded-md bg-[#EDE7DE] shadow-md touch-pan-y">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTile.slug || mobileIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) handleNext();
                  else if (info.offset.x > 40) handlePrev();
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <Link
                  href="#enquiry"
                  className="group relative block h-full w-full overflow-hidden bg-[#E6DED3]"
                >
                  <Image
                    src={currentTile.src}
                    alt={currentTile.label}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-[center_top] pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#D6B58F] font-medium block">
                        Collection
                      </span>
                      <span className="text-lg font-semibold tracking-wide text-white drop-shadow-sm">
                        {currentTile.label}
                      </span>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/60 bg-black/30 backdrop-blur-sm text-white">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls & Pagination Dots */}
          <div className="mt-4 flex items-center justify-between px-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous collection"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5C7B7] bg-white text-[#1A1A1A] shadow-sm active:scale-90 transition-transform"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Tapable Dots Indicator */}
            <div className="flex items-center gap-1.5">
              {tiles.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setMobileIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIndex === dotIdx
                      ? 'w-6 bg-[#A86F35]'
                      : 'w-1.5 bg-[#D8CEBF]'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next collection"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5C7B7] bg-white text-[#1A1A1A] shadow-sm active:scale-90 transition-transform"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Desktop & Tablet Grid (Visible on sm and up) */}
      <div className="mx-auto hidden sm:grid max-w-[1440px] grid-cols-2 md:grid-cols-3 gap-5 px-6">
        {tiles.map((tile: Tile, index: number) => (
          <motion.div
            key={tile.slug || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: EASE }}
            className="relative h-80 lg:h-[340px] rounded-sm overflow-hidden bg-[#EDE7DE] group shadow-sm hover:shadow-md transition-shadow"
          >
            <Link
              href="#enquiry"
              className="group absolute inset-0 block overflow-hidden bg-[#E6DED3]"
            >
              <Image
                src={tile.src}
                alt={tile.label}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="text-lg font-normal uppercase tracking-wide text-white drop-shadow-sm">
                  {tile.label}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white transition-colors group-hover:bg-white group-hover:text-[#1A1A1A]">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      {collectionsData.viewAllButton && (
        <div className="mt-10 sm:mt-12 flex justify-center px-4 sm:px-6">
          <Link
            href="#enquiry"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-3 rounded-sm bg-[#B7834F] px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#8F6030]"
          >
            <span>{collectionsData.viewAllButton.text}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}