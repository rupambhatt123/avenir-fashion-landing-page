'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import websiteData from '@/data/websiteData.json';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

export default function GallerySection() {
  // 100% JSON data binding with safe access
  const fashionSections = (websiteData as any)?.categories?.Fashion?.sections || {};
  const galleryData =
    fashionSections.GalleryPage?.variants?.FashionGallery1 ||
    fashionSections.Gallery?.variants?.FashionGallery1;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Exactly 8 cards per page

  if (!galleryData) {
    return null;
  }

  const allImages = (galleryData.images || []) as GalleryItem[];
  const totalPages = Math.ceil(allImages.length / itemsPerPage);

  // Phone view carousel state
  const [mobileIndex, setMobileIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Desktop/Tablet current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = allImages.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleMobilePrev = () => {
    setSlideDirection('left');
    setMobileIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleMobileNext = () => {
    setSlideDirection('right');
    setMobileIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const currentMobileImage = allImages[mobileIndex] || allImages[0];

  return (
    <div id="gallery" className="bg-[#F6F3ED] text-[#1A1A1A] py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[2px] bg-[#9E6E3E]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#9E6E3E] uppercase">
              {galleryData.badge}
            </span>
            <span className="w-8 h-[2px] bg-[#9E6E3E]"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A] mb-3">
            {galleryData.title}
          </h2>
          <p className="text-sm text-[#666] leading-relaxed">
            {galleryData.description}
          </p>
        </div>

        {/* Phone View Single-Card Carousel (< sm) */}
        <div className="block sm:hidden">
          <div className="relative h-[420px] w-full overflow-hidden rounded-sm bg-[#EDE7DE] shadow-sm">
            <AnimatePresence mode="wait" initial={false}>
              {currentMobileImage && (
                <motion.div
                  key={currentMobileImage.id}
                  initial={{ opacity: 0, x: slideDirection === 'right' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDirection === 'right' ? -50 : 50 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentMobileImage.image}
                    alt={currentMobileImage.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 text-sm font-medium tracking-wide text-white drop-shadow-sm">
                    {currentMobileImage.title}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="mt-5 flex items-center justify-between px-2">
            <button
              type="button"
              onClick={handleMobilePrev}
              aria-label="Previous gallery image"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DED7CB] bg-white text-[#1A1A1A] shadow-sm transition-colors active:scale-95"
            >
              <ArrowLeft size={18} />
            </button>

            <span className="text-xs font-semibold tracking-widest text-[#9E6E3E] uppercase">
              {mobileIndex + 1} / {allImages.length}
            </span>

            <button
              type="button"
              onClick={handleMobileNext}
              aria-label="Next gallery image"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DED7CB] bg-white text-[#1A1A1A] shadow-sm transition-colors active:scale-95"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Desktop & Tablet 4-Column Grid (8 Cards Per Page) */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {currentImages.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-[380px] rounded-sm overflow-hidden bg-[#EDE7DE] group shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Pagination Controls (Desktop & Tablet) */}
        {totalPages > 1 && (
          <div className="hidden sm:flex items-center justify-center gap-2 mt-16 mb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="w-10 h-10 flex items-center justify-center bg-white border border-[#DED7CB] rounded-sm text-sm text-[#555] hover:border-[#9E6E3E] hover:text-[#9E6E3E] disabled:opacity-40 disabled:hover:border-[#DED7CB] disabled:hover:text-[#555] transition-colors"
            >
              &larr;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-sm text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#B07B46] text-white shadow-sm'
                      : 'bg-white border border-[#DED7CB] text-[#555] hover:border-[#9E6E3E] hover:text-[#9E6E3E]'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="w-10 h-10 flex items-center justify-center bg-white border border-[#DED7CB] rounded-sm text-sm text-[#555] hover:border-[#9E6E3E] hover:text-[#9E6E3E] disabled:opacity-40 disabled:hover:border-[#DED7CB] disabled:hover:text-[#555] transition-colors"
            >
              &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}