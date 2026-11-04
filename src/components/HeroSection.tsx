'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Montserrat, Kaushan_Script } from 'next/font/google';
import websiteData from '@/data/websiteData.json';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const brush = Kaushan_Script({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function CategoryTile({ label, src, href }: { label: string; src: string; href: string }) {
  return (
    <motion.div
      variants={rise}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <Link
        href={href}
        className="group relative block aspect-[1.28/1] overflow-hidden bg-[#D8D0C5]"
      >
        <Image
          alt={label}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 20vw, 45vw"
          src={src}
        />
        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
        <div className="absolute inset-x-0 bottom-3 sm:bottom-4 flex flex-col items-center">
          <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.16em] sm:tracking-[0.18em] text-white uppercase text-center px-1">
            {label}
          </span>
          <span className="mt-1 h-[1.5px] w-6 sm:w-8 bg-white transition-all duration-300 group-hover:w-12" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : 'hidden';

  // 100% JSON data binding
  const heroData = websiteData.categories.Fashion.sections.HeroSection.variants.FashionHero1;

  return (
    <section
      className={`${montserrat.className} relative isolate overflow-hidden bg-[#FAF6F0] text-[#1A1A1A]`}
    >
      {/* Background Graphic Elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[15%] top-[30%] aspect-square w-[38%] rounded-full bg-[#EFE7DC]/70" />
        <div className="absolute -right-[15%] top-[20%] aspect-square w-[40%] rounded-full bg-[#EFE7DC]/70" />
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-6 px-4 py-6 sm:py-8 lg:grid-cols-[70px_minmax(0,5fr)_minmax(0,6fr)_70px] lg:gap-0 lg:px-6 lg:py-10">
        {/* Left vertical tag */}
        <div className="hidden flex-col items-center justify-end gap-3 self-end pb-8 lg:flex">
          <div className="flex rotate-180 gap-1.5 [writing-mode:vertical-rl]">
            <span className="text-sm font-extrabold tracking-wider">{heroData.seasonBadge.year}</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#555]">
              {heroData.seasonBadge.label}
            </span>
          </div>
          <span className="h-16 w-px bg-[#1A1A1A]" />
        </div>

        {/* Main Hero Image */}
        <div className="relative h-[340px] sm:h-[440px] lg:h-[560px] w-full overflow-hidden bg-[#E2DACD] shadow-md">
          <Image
            alt="Main Fashion Look"
            className="object-cover object-top"
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            src={heroData.mainImage}
          />
        </div>

        {/* Right Content Column */}
        <motion.div
          variants={stagger}
          initial={initial}
          animate="show"
          className="relative flex flex-col justify-center lg:pl-10 lg:pr-2"
        >
          {/* Subtle Background Watermark */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-4 sm:-top-6 left-2 sm:left-4 select-none text-[clamp(65px,13vw,170px)] font-black italic uppercase leading-none text-transparent opacity-40 [-webkit-text-stroke:1px_rgba(26,26,26,0.12)]"
          >
            {heroData.titleWord1}
          </span>

          {/* Headline: STREET Style */}
          <div className="relative pt-2 sm:pt-4">
            <h1 className="relative flex flex-wrap items-baseline leading-[0.85]">
              <span className="text-[clamp(42px,7.5vw,110px)] font-black italic tracking-tight text-[#1A1A1A]">
                {heroData.titleWord1}
              </span>
              <span
                className={`${brush.className} relative -ml-2 sm:-ml-5 inline-block text-[clamp(40px,7vw,100px)] leading-none text-[#9E6E3E] -rotate-6`}
              >
                {heroData.titleWord2}
              </span>
            </h1>

            {/* Sub-tagline with line rule */}
            <motion.div variants={rise} className="mt-3 flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.24em] sm:tracking-[0.3em] text-[#444] uppercase whitespace-nowrap">
                {heroData.subPillars.map((pillar: string, index: number) => (
                  <span key={pillar}>
                    {pillar}
                    {index < heroData.subPillars.length - 1 && (
                      <span className="mx-1 text-[#9E6E3E]">•</span>
                    )}
                  </span>
                ))}
              </p>
              <span className="hidden sm:block h-px flex-1 bg-[#1A1A1A]/30 max-w-[180px]" />
            </motion.div>
          </div>

          {/* Dual Category Cards */}
          <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-6">
            {heroData.categoryTiles.map((tile: { label: string; src: string; href: string }) => (
              <CategoryTile
                key={tile.label}
                label={tile.label}
                src={tile.src}
                href={tile.href}
              />
            ))}
          </div>

          {/* Body Paragraph */}
          <motion.p
            variants={rise}
            className="mt-4 sm:mt-5 max-w-[560px] text-xs sm:text-sm leading-relaxed text-[#555]"
          >
            {heroData.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={rise} className="mt-5 sm:mt-6">
            <Link
              href={heroData.ctaButton.href}
              className="inline-flex items-center gap-3 border border-[#1A1A1A] bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-bold tracking-widest uppercase text-[#1A1A1A] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white"
            >
              {heroData.ctaButton.label}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right vertical tag */}
        <div className="hidden flex-col items-center justify-end gap-3 self-end pb-8 lg:flex">
          <span className="h-16 w-px bg-[#1A1A1A]" />
          <div className="leading-tight text-center">
            <span className="block text-sm font-extrabold">{heroData.designBadge.year}</span>
            <span className="block text-[9px] font-bold tracking-widest uppercase text-[#555]">
              {heroData.designBadge.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}