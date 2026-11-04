'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, Phone, Send } from 'lucide-react';
import { Poppins } from 'next/font/google';
import websiteData from '@/data/websiteData.json';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 15 } },
};

/* Icons */
const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path
      fillRule="evenodd"
      d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
    />
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    <path d="m3 7 9 6.5L21 7" fill="none" stroke="#F4E8DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);
const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
  </svg>
);

/* Payment marks */
const Visa = () => (
  <span className="text-[18px] sm:text-[22px] font-bold italic tracking-tight text-[#1A3FA0]">VISA</span>
);
const Mastercard = () => (
  <svg width="42" height="26" viewBox="0 0 54 34" aria-label="Mastercard">
    <circle cx="19" cy="17" r="15" fill="#EB001B" />
    <circle cx="35" cy="17" r="15" fill="#F79E1B" />
    <path d="M27 5.2a15 15 0 0 1 0 23.6 15 15 0 0 1 0-23.6Z" fill="#FF5F00" />
  </svg>
);
const PayPal = () => (
  <span className="flex items-center gap-0.5 text-[14px] sm:text-[18px] font-bold italic">
    <span className="text-[1.3em] leading-none text-[#253B80]">P</span>
    <span className="text-[#179BD7]">PayPal</span>
  </span>
);
const Amex = () => (
  <span className="flex h-[32px] w-[46px] items-center justify-center bg-[#2E77BC] px-1 text-center text-[7px] font-bold leading-[1.05] tracking-tight text-white">
    AMERICAN
    <br />
    EXPRESS
  </span>
);
const Discover = () => (
  <span className="text-[12px] sm:text-[16px] font-bold tracking-tight text-[#1A1A1A]">
    DISC<span className="text-[#F47216]">●</span>VER
  </span>
);

export default function Footer() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : 'hidden';
  const view = { once: true, amount: 0.15 } as const;

  const footerData =
    websiteData.categories.Fashion.sections.Footer.variants.FashionFooter1;
  const navbarLinks =
    websiteData.categories.Fashion.sections.Header.variants.FashionHeader1.navLinks;
  const commonData = websiteData.common;

  const socials = [
    { label: 'Facebook', href: commonData.socialLinks.facebook, icon: <FacebookIcon /> },
    { label: 'Instagram', href: commonData.socialLinks.instagram, icon: <InstagramIcon /> },
    { label: 'Twitter', href: commonData.socialLinks.twitter, icon: <TwitterIcon /> },
    { label: 'Pinterest', href: commonData.socialLinks.pinterest, icon: <PinterestIcon /> },
  ];

  const getSectionHash = (path: string) => {
    if (path === '/' || path === '#home') return '#home';
    const clean = path.replace('/', '').replace('#', '');
    return `#${clean}`;
  };

  return (
    <footer className={`${poppins.className} relative isolate overflow-hidden bg-[#FDFBF8] text-[#1A1A1A]`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_35%,#F8EDE0_0%,#FDFBF8_52%,#FFFFFF_100%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(#B7834F22 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <motion.div
        variants={stagger}
        initial={initial}
        whileInView="show"
        viewport={view}
        className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 py-10 sm:px-8 sm:py-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1.1fr_1fr] lg:gap-10 lg:px-10"
      >
        {/* Brand Column */}
        <div className="lg:pr-4">
          <motion.div variants={rise}>
            <Link href="#home" aria-label="Avenir Home" className="inline-block">
              <Image
                src={footerData.logo}
                alt="Avenir Logo"
                width={260}
                height={60}
                className="h-auto w-[180px] sm:w-[220px]"
              />
            </Link>
          </motion.div>

          <motion.p
            variants={rise}
            className="mt-4 max-w-[460px] text-[13px] sm:text-[14px] font-light leading-relaxed text-[#4F4F4F]"
          >
            {footerData.about}
          </motion.p>

          <ul className="mt-4 space-y-2.5">
            <motion.li variants={rise} className="group flex items-center gap-3.5">
              <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#F4E8DB] text-[#161616] transition-colors duration-300 group-hover:bg-[#B7834F] group-hover:text-white">
                <PinIcon />
              </span>
              <span className="text-[13px] sm:text-[14px] leading-tight text-[#1F1F1F]">
                {footerData.address}
              </span>
            </motion.li>

            <motion.li variants={rise} className="group flex items-center gap-3.5">
              <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#F4E8DB] text-[#161616] transition-colors duration-300 group-hover:bg-[#B7834F] group-hover:text-white">
                <Phone size={18} fill="currentColor" strokeWidth={1.5} />
              </span>
              <a
                href={`tel:${footerData.phone}`}
                className="text-[13px] sm:text-[14px] leading-tight text-[#1F1F1F] transition-colors hover:text-[#B7834F]"
              >
                {footerData.phone}
              </a>
            </motion.li>

            <motion.li variants={rise} className="group flex items-center gap-3.5">
              <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#F4E8DB] text-[#161616] transition-colors duration-300 group-hover:bg-[#B7834F] group-hover:text-white">
                <MailIcon />
              </span>
              <a
                href={`mailto:${footerData.email}`}
                className="text-[13px] sm:text-[14px] leading-tight text-[#1F1F1F] transition-colors hover:text-[#B7834F]"
              >
                {footerData.email}
              </a>
            </motion.li>
          </ul>

          <div className="mt-5 flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                variants={pop}
                whileHover={{ y: -3, scale: 1.06 }}
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#F4E8DB] text-[#161616] transition-colors duration-300 hover:bg-[#B7834F] hover:text-white"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links mapped from Navbar */}
        <div className="relative lg:pl-8">
          <motion.span
            aria-hidden
            className="absolute left-0 top-1 hidden h-[calc(100%-0.5rem)] w-px origin-top bg-gradient-to-b from-transparent via-[#E3D8CB] to-transparent lg:block"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={view}
            transition={{ duration: 1.2, ease: EASE }}
          />
          <h4 className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.2em] text-[#A86F35]">
            {footerData.quickLinksTitle}
          </h4>
          <span className="mt-2.5 block h-[2px] w-8 bg-[#B7834F]" />
          <ul className="mt-5 space-y-2.5 sm:space-y-3">
            {navbarLinks.map((l: { title: string; path: string }) => (
              <motion.li key={l.title} variants={rise}>
                <Link
                  href={getSectionHash(l.path)}
                  className="group relative inline-block text-[13px] sm:text-[14px] text-[#242424] transition-all duration-300 hover:translate-x-1 hover:text-[#A86F35]"
                >
                  {l.title}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#A86F35] transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact Us Circular Badge -> Smooth scrolls to #contact */}
        <motion.div variants={rise} className="flex items-center justify-center pt-2 md:col-span-2 lg:col-span-1 lg:pt-0">
          <Link
            href="#contact"
            aria-label="Contact us"
            className="group relative flex h-[160px] w-[160px] sm:h-[190px] sm:w-[190px] items-center justify-center"
          >
            <span className="absolute -inset-2 rounded-full bg-[#F3E4D3]/60 blur-md transition-opacity duration-500 group-hover:opacity-100" />
            <motion.span
              aria-hidden
              className="absolute -inset-1.5 rounded-full border border-dashed border-[#B7834F]/50"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span
              className="relative flex h-full w-full flex-col items-center justify-center rounded-full border-2 border-[#B7834F] bg-[radial-gradient(circle_at_35%_30%,#FBF3EA_0%,#F3E7DA_100%)] shadow-[0_16px_35px_-16px_rgba(120,75,30,0.4)] transition-colors duration-500 group-hover:bg-[#B7834F]"
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            >
              <motion.span
                animate={reduce ? undefined : { y: [0, -4, 0], x: [0, 3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#B7834F] transition-colors duration-500 group-hover:text-white"
              >
                <Send size={38} strokeWidth={1.2} />
              </motion.span>
              <span className="mt-2.5 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#161616] transition-colors duration-500 group-hover:text-white">
                {footerData.contactBadge.text}
              </span>
              <span className="my-2 h-px w-8 bg-[#161616]/70 transition-colors duration-500 group-hover:bg-white" />
              <ArrowRight
                size={17}
                className="text-[#161616] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white"
              />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="bg-[#F4EFE9]"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3.5 px-5 py-4 sm:flex-row sm:px-8 lg:px-10">
          <p className="text-[12px] sm:text-[13px] text-[#333] text-center sm:text-left">
            {footerData.copyright}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 sm:border-l sm:border-[#B7834F]/40 sm:pl-6">
            {[Visa, Mastercard, PayPal, Amex, Discover].map((Mark, i) => (
              <motion.span
                key={i}
                className="flex items-center"
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <Mark />
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}