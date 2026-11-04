'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import websiteData from '@/data/websiteData.json';

const EASE = [0.22, 1, 0.36, 1] as const;

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const headerData =
    websiteData.categories.Fashion.sections.Header.variants.FashionHeader1;

  // Path mapping for smooth landing page scroll
  const getSectionHash = (path: string) => {
    if (path === '/' || path === '#home') return '#home';
    const clean = path.replace('/', '').replace('#', '');
    return `#${clean}`;
  };

  const handleNavClick = (hash: string) => {
    setActiveSection(hash);
    if (hash === '#home') {
      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Scroll spy: smooth update jab neeche se upar hero section par aayein
  useEffect(() => {
    const handleScroll = () => {
      // Agar user top/hero section ke paas hai toh guaranteed #home active rahega
      if (window.scrollY < 120) {
        setActiveSection('#home');
        return;
      }

      const scrollPosition = window.scrollY + 180;
      const sections = headerData.navLinks.map((item) =>
        getSectionHash(item.path).substring(1)
      );

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        if (!sectionId || sectionId === 'home') continue;

        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(`#${sectionId}`);
            return;
          }
        }
      }

      setActiveSection('#home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerData.navLinks]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E2D8] bg-[#F6F3ED]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link
          className="group flex items-center py-2"
          href="#home"
          onClick={() => handleNavClick('#home')}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative h-14 w-40 sm:h-16 sm:w-52 md:w-60 lg:w-64"
          >
            <Image
              src={headerData.logo}
              alt={headerData.logoAlt}
              fill
              priority
              className="object-contain object-left"
            />
          </motion.div>
        </Link>

        {/* Desktop Links with Active State & Color Change */}
        <nav className="hidden items-center space-x-7 lg:flex xl:space-x-9">
          {headerData.navLinks.map((item: { title: string; path: string }) => {
            const hash = getSectionHash(item.path);
            const isActive = activeSection === hash;

            return (
              <Link
                key={item.title}
                href={hash}
                onClick={() => handleNavClick(hash)}
                className={`relative py-1.5 text-[15px] font-medium tracking-wide transition-all duration-300 xl:text-[16px] ${
                  isActive
                    ? 'font-semibold text-[#9E6E3E]'
                    : 'text-[#55504A] hover:text-[#9E6E3E]'
                }`}
              >
                <span>{item.title}</span>
                {/* Active indicator bar */}
                {isActive && (
                  <motion.span
                    layoutId="navbarActiveIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#9E6E3E]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={getSectionHash(headerData.ctaButton.path)}
              onClick={() => handleNavClick(getSectionHash(headerData.ctaButton.path))}
              className="group inline-flex items-center gap-2.5 rounded-sm bg-[#9E6E3E] px-6 py-2.5 text-[14px] font-semibold tracking-wider text-white shadow-sm transition-colors duration-300 hover:bg-[#885A2B] xl:text-[15px]"
            >
              <span>{headerData.ctaButton.text}</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-2 text-[#1A1A1A] transition-colors hover:bg-[#EFE8DC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9E6E3E]/40 lg:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-b border-[#E7E2D8] bg-[#F6F3ED]/98 shadow-lg backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-2 px-5 py-5 sm:px-6">
              {headerData.navLinks.map((item: { title: string; path: string }, idx: number) => {
                const hash = getSectionHash(item.path);
                const isActive = activeSection === hash;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3, ease: EASE }}
                  >
                    <Link
                      href={hash}
                      onClick={() => {
                        handleNavClick(hash);
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-sm px-3.5 py-2.5 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#EAE2D5] font-semibold text-[#9E6E3E]'
                          : 'text-[#2D2A26] hover:bg-[#EFE8DC] hover:text-[#9E6E3E]'
                      }`}
                    >
                      <span>{item.title}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#9E6E3E]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3, ease: EASE }}
                className="pt-2"
              >
                <Link
                  href={getSectionHash(headerData.ctaButton.path)}
                  onClick={() => {
                    handleNavClick(getSectionHash(headerData.ctaButton.path));
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#9E6E3E] py-3 text-base font-semibold tracking-wider text-white shadow-sm transition-colors hover:bg-[#885A2B]"
                >
                  <span>{headerData.ctaButton.text}</span>
                  <ArrowRight size={17} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<header className="h-24 bg-[#F6F3ED] border-b border-[#E7E2D8]" />}>
      <NavbarContent />
    </Suspense>
  );
}
