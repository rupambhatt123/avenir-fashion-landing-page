'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';
import websiteData from '@/data/websiteData.json';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 mb-4 text-[#D18616]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-[#D18616]' : 'fill-transparent'}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : 'hidden';

  // Safe access across different possible key namings
  const fashionSections = (websiteData as any)?.categories?.Fashion?.sections || {};
  const tData =
    fashionSections.TestimonialsPage?.variants?.FashionTestimonialsPage1 ||
    fashionSections.Testimonials?.variants?.FashionTestimonials1 ||
    fashionSections.Testimonials?.variants?.FashionTestimonialsPage1;

  if (!tData) {
    return null;
  }

  const items = tData.items || tData.reviews || [];

  return (
    <section
      id="testimonials"
      className={`${inter.className} relative isolate overflow-hidden bg-[#FAF8F5] py-16 sm:py-20 lg:py-24 border-b border-[#E7E2D8]`}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-[1.5px] w-8 bg-[#9E6E3E]" />
            <span className="text-xs font-semibold tracking-[0.3em] text-[#9E6E3E] uppercase">
              {tData.badge || 'TESTIMONIALS'}
            </span>
            <span className="h-[1.5px] w-8 bg-[#9E6E3E]" />
          </div>

          <h2
            className={`${playfair.className} text-[clamp(32px,3.5vw,56px)] font-normal text-[#141414] leading-tight`}
          >
            {tData.title}{' '}
            {tData.titleHighlight && (
              <span className="italic font-normal text-[#9E6E3E]">
                {tData.titleHighlight}
              </span>
            )}
          </h2>

          {tData.description && (
            <p className="mt-3 text-sm sm:text-base text-[#666] leading-relaxed">
              {tData.description}
            </p>
          )}
        </div>

        {/* Testimonials Cards Grid */}
        <motion.div
          variants={stagger}
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {items.slice(0, 3).map((rev: any, index: number) => (
            <motion.div
              key={rev.id || index}
              variants={rise}
              className="rounded-sm border border-[#E7DFD3] bg-[#FCFAF6] p-7 shadow-sm transition-shadow hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <Stars rating={rev.rating || 5} />
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#4A4A4A] italic mb-6">
                  {rev.quote || rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFE7DE]">
                <h3 className={`${playfair.className} text-base font-medium text-[#1A1A1A]`}>
                  {rev.name}
                </h3>
                <p className="text-xs text-[#888]">{rev.location || rev.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}