'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
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
  weight: ['300', '400', '500'],
  display: 'swap',
});

export default function AboutSection() {
  const reduce = useReducedMotion();

  // 100% JSON data binding with safe access
  const fashionSections = (websiteData as any)?.categories?.Fashion?.sections || {};
  const aboutData =
    fashionSections.About?.variants?.FashionAbout1 ||
    fashionSections.AboutSection?.variants?.FashionAbout1;

  if (!aboutData) {
    return null;
  }

  return (
    <section
      id="about"
      className={`${inter.className} relative isolate overflow-hidden bg-[#FAF6F0] py-20 lg:py-28`}
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 xl:col-span-5">
            {/* Top Badge Line */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1.5px] w-9 bg-[#A26D38]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#A26D38] uppercase">
                {aboutData.badge}
              </span>
            </div>

            {/* Heading */}
            <h2
              className={`${playfair.className} text-[clamp(36px,4.2vw,62px)] font-normal leading-[1.12] tracking-tight text-[#141414] mb-7`}
            >
              {aboutData.title} <br />
              <span className="italic font-normal text-[#A26D38]">
                {aboutData.titleHighlight}
              </span>
            </h2>

            {/* Description */}
            <p className="max-w-[480px] text-[15px] sm:text-[16px] font-light leading-[1.8] text-[#55504A]">
              {aboutData.description}
            </p>
          </div>

          {/* Right Image with Offset Background Frame */}
          <div className="relative flex justify-end lg:col-span-7 xl:col-span-7">
            <div className="relative w-full max-w-[720px]">
              
              {/* Tan Backdrop Offset Shadow */}
              <div
                aria-hidden
                className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 h-full w-full rounded-none bg-[#EADCCB]/75 -z-10"
              />

              {/* Main Image Container with Vertical Alignment Adjustments */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[16/11.5] sm:aspect-[16/10.5] w-full overflow-hidden bg-[#E2D4C3] shadow-[0_20px_45px_-20px_rgba(80,50,20,0.2)]"
              >
                <Image
                  src={aboutData.image}
                  alt={aboutData.imageAlt || 'About Avenir'}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-[center_12%]" // Top-focused vertical framing
                />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}