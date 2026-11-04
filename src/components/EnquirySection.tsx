'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
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

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export default function EnquirySection() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : 'hidden';

  const enquiryData =
    websiteData.categories.Fashion.sections.EnquiryPage.variants.FashionEnquiryPage1;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    size: '',
    color: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      size: '',
      color: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div
      id="enquiry"
      className={`${inter.className} relative isolate overflow-x-hidden bg-[#FAF8F5] text-[#1A1A1A] py-16 sm:py-20 lg:py-24`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,#FBF1E6_0%,#FAF8F5_50%,#F6F0E7_100%)]" />
        <motion.div
          className="absolute -right-[10%] top-[12%] aspect-square w-[38%] rounded-full bg-[#F5E2CE]/55 blur-3xl"
          animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-[8%] top-[45%] aspect-square w-[30%] rounded-full bg-[#EAD8C3]/45 blur-3xl"
          animate={reduce ? undefined : { x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: 'radial-gradient(#B7834F20 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage:
              'radial-gradient(ellipse at 50% 40%, black 0%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 40%, black 0%, transparent 75%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* Left Form */}
          <motion.div
            variants={staggerContainer}
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6 xl:col-span-6"
          >
            <motion.div variants={rise} className="mb-8 sm:mb-10">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[11px] font-semibold tracking-[0.3em] text-[#9E6E3E] uppercase sm:text-xs">
                  {enquiryData.badge}
                </span>
                <span className="h-[1.5px] w-9 bg-[#9E6E3E]" />
              </div>
              <h2
                className={`${playfair.className} text-[clamp(34px,3.6vw,56px)] font-normal leading-[1.12] text-[#141414]`}
              >
                {enquiryData.title}{' '}
                <span className="font-normal italic text-[#9E6E3E]">
                  {enquiryData.titleHighlight}
                </span>
              </h2>
              <p className="mt-3.5 max-w-lg text-[14px] leading-[1.65] text-[#616161] sm:text-[15px]">
                {enquiryData.description}
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <motion.div variants={rise}>
                  <input
                    type="text"
                    required
                    placeholder={enquiryData.placeholders.name}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-none border border-[#DDD7CD] bg-white px-4 py-3.5 text-sm text-[#1A1A1A] placeholder-[#888] shadow-[0_2px_4px_rgba(0,0,0,0.015)] outline-none transition-colors focus:border-[#9E6E3E] focus:ring-1 focus:ring-[#9E6E3E]/20"
                  />
                </motion.div>
                <motion.div variants={rise}>
                  <input
                    type="email"
                    required
                    placeholder={enquiryData.placeholders.email}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-none border border-[#DDD7CD] bg-white px-4 py-3.5 text-sm text-[#1A1A1A] placeholder-[#888] shadow-[0_2px_4px_rgba(0,0,0,0.015)] outline-none transition-colors focus:border-[#9E6E3E] focus:ring-1 focus:ring-[#9E6E3E]/20"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <motion.div variants={rise}>
                  <input
                    type="tel"
                    required
                    placeholder={enquiryData.placeholders.phone}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full rounded-none border border-[#DDD7CD] bg-white px-4 py-3.5 text-sm text-[#1A1A1A] placeholder-[#888] shadow-[0_2px_4px_rgba(0,0,0,0.015)] outline-none transition-colors focus:border-[#9E6E3E] focus:ring-1 focus:ring-[#9E6E3E]/20"
                  />
                </motion.div>

                <motion.div variants={rise} className="relative">
                  <select
                    required
                    value={formData.size}
                    onChange={(e) =>
                      setFormData({ ...formData, size: e.target.value })
                    }
                    className={`w-full cursor-pointer appearance-none rounded-none border border-[#DDD7CD] bg-white px-4 py-3.5 text-sm shadow-[0_2px_4px_rgba(0,0,0,0.015)] outline-none transition-colors focus:border-[#9E6E3E] focus:ring-1 focus:ring-[#9E6E3E]/20 ${
                      formData.size ? 'text-[#1A1A1A]' : 'text-[#888]'
                    }`}
                  >
                    <option value="" disabled>
                      {enquiryData.placeholders.size}
                    </option>
                    {enquiryData.sizeOptions.map(
                      (opt: { value: string; label: string }) => (
                        <option key={opt.value} value={opt.value} className="text-[#1A1A1A]">
                          {opt.label}
                        </option>
                      )
                    )}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#555]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={rise} className="relative">
                <select
                  required
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className={`w-full cursor-pointer appearance-none rounded-none border border-[#DDD7CD] bg-white px-4 py-3.5 text-sm shadow-[0_2px_4px_rgba(0,0,0,0.015)] outline-none transition-colors focus:border-[#9E6E3E] focus:ring-1 focus:ring-[#9E6E3E]/20 ${
                    formData.color ? 'text-[#1A1A1A]' : 'text-[#888]'
                  }`}
                >
                  <option value="" disabled>
                    {enquiryData.placeholders.color}
                  </option>
                  {enquiryData.colorOptions.map((color: string) => (
                    <option key={color} value={color} className="text-[#1A1A1A]">
                      {color}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#555]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </motion.div>

              <motion.div variants={rise}>
                <input
                  type="text"
                  required
                  placeholder={enquiryData.placeholders.subject}
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full rounded-none border border-[#DDD7CD] bg-white px-4 py-3.5 text-sm text-[#1A1A1A] placeholder-[#888] shadow-[0_2px_4px_rgba(0,0,0,0.015)] outline-none transition-colors focus:border-[#9E6E3E] focus:ring-1 focus:ring-[#9E6E3E]/20"
                />
              </motion.div>

              <motion.div variants={rise}>
                <textarea
                  rows={4}
                  required
                  placeholder={enquiryData.placeholders.message}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full resize-y rounded-none border border-[#DDD7CD] bg-white px-4 py-3.5 text-sm text-[#1A1A1A] placeholder-[#888] shadow-[0_2px_4px_rgba(0,0,0,0.015)] outline-none transition-colors focus:border-[#9E6E3E] focus:ring-1 focus:ring-[#9E6E3E]/20"
                />
              </motion.div>

              <motion.div variants={rise} className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.015, y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  type="submit"
                  className="group relative inline-flex items-center justify-center overflow-hidden bg-[#9E6E3E] px-9 py-4 text-xs font-bold tracking-[0.22em] text-white uppercase shadow-[0_12px_24px_-10px_rgba(158,110,62,0.6)] transition-all duration-300 hover:bg-[#885A2B]"
                >
                  <span className="relative z-10">{enquiryData.submitButtonText}</span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Right Collage */}
          <div className="relative flex justify-center lg:col-span-6 xl:col-span-6">
            <div
              aria-hidden
              className="absolute -top-6 right-0 h-[88%] w-[88%] rounded-sm bg-[#F4EDE2]/85 -z-20 sm:-top-8 sm:right-2"
            />
            <motion.div
              aria-hidden
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="absolute left-2 top-8 h-[130px] w-[130px] rounded-none bg-[#A66E38] -z-10 sm:left-4 sm:top-10 sm:h-[180px] sm:w-[180px] lg:left-2 lg:top-12 lg:h-[190px] lg:w-[190px]"
            />
            <motion.div
              aria-hidden
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              className="absolute -bottom-4 right-0 h-[120px] w-[90px] rounded-none bg-[#9A6533] -z-10 sm:-bottom-6 sm:right-0 sm:h-[180px] sm:w-[130px] lg:-bottom-8 lg:right-0 lg:h-[200px] lg:w-[140px]"
            />

            <svg
              className="pointer-events-none absolute -left-8 top-1/3 h-52 w-52 -translate-y-8 select-none stroke-[#9E6E3E]/25 -z-10 sm:-left-12 sm:h-64 sm:w-64"
              viewBox="0 0 160 160"
              fill="none"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M40,150 C50,110 70,80 110,60" />
              <path d="M70,95 C62,85 58,68 64,55 C76,60 82,78 78,92" />
              <path d="M92,76 C98,60 114,52 124,62 C118,74 104,82 92,76" />
              <path d="M50,125 C40,118 36,104 42,94 C50,98 56,110 52,122" />
            </svg>

            <motion.div
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 right-3 z-20 flex h-24 w-24 items-center justify-center select-none sm:-top-6 sm:right-8 sm:h-32 sm:w-32 lg:-top-8 lg:right-6 lg:h-36 lg:w-36"
            >
              <svg viewBox="0 0 140 140" className="h-full w-full fill-[#9E6E3E]" aria-hidden>
                <defs>
                  <path id="circlePath" d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
                </defs>
                <text fontSize="9.8" letterSpacing="0.28em" className="font-medium uppercase">
                  <textPath href="#circlePath" startOffset="0%">
                    FASHION FOR EVERY FASHION •
                  </textPath>
                </text>
              </svg>
              <span className="absolute h-[1.5px] w-6 bg-[#9E6E3E] sm:w-8" />
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: EASE }}
              className="relative aspect-[480/580] w-full max-w-[480px] overflow-hidden bg-[#E9DFD3] shadow-[0_24px_50px_-20px_rgba(70,45,20,0.35)]"
            >
              <Image
                src={enquiryData.editorialImage.src}
                alt={enquiryData.editorialImage.alt}
                fill
                priority
                sizes="(min-width: 1280px) 480px, (min-width: 1024px) 42vw, 92vw"
                className="object-cover object-top"
              />
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
              whileHover={reduce ? undefined : { y: -5 }}
              className="absolute -bottom-10 left-2 z-20 w-[84%] max-w-[340px] border border-[#E9DFD0] bg-[#FAF5EE]/95 p-6 shadow-[0_24px_45px_-18px_rgba(90,55,25,0.28)] backdrop-blur-md sm:-bottom-12 sm:left-4 sm:max-w-[370px] sm:p-8 lg:-bottom-14 lg:-left-6 lg:max-w-[390px]"
            >
              <div className="mb-2.5 flex items-center gap-2.5">
                <span className="text-[10px] font-bold tracking-[0.26em] text-[#9E6E3E] uppercase sm:text-[11px]">
                  {enquiryData.floatingCard.badge}
                </span>
                <span className="h-[1px] w-7 bg-[#9E6E3E]" />
              </div>
              <h3 className={`${playfair.className} mb-3 text-[clamp(22px,2.2vw,30px)] font-normal leading-[1.2] text-[#141414]`}>
                {enquiryData.floatingCard.title}
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#666] sm:text-[14px]">
                {enquiryData.floatingCard.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitted(false)}
              className="absolute inset-0 bg-[#161616]/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative z-10 w-full max-w-[460px] border border-[#E8DFC8] bg-[#FAF6F0] p-8 text-center shadow-[0_30px_70px_-20px_rgba(60,35,15,0.45)] sm:p-10"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#9E6E3E]/40 bg-[#F4ECE0] text-[#9E6E3E] shadow-sm">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="mb-2 flex items-center justify-center gap-2">
                <span className="h-[1px] w-5 bg-[#9E6E3E]" />
                <span className="text-[10px] font-bold tracking-[0.28em] text-[#9E6E3E] uppercase">AVENIR COUTURE</span>
                <span className="h-[1px] w-5 bg-[#9E6E3E]" />
              </div>
              <h2 className={`${playfair.className} mb-3 text-3xl font-normal text-[#1A1A1A] sm:text-4xl`}>
                Thank You
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-[#666]">
                {enquiryData.successMessage}
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-[#9E6E3E] py-3.5 text-xs font-bold tracking-[0.22em] text-white uppercase transition-colors hover:bg-[#885A2B] shadow-sm"
              >
                Continue Browsing
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}