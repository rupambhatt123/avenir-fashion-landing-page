'use client';

import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import websiteData from '@/data/websiteData.json';

const EASE = [0.22, 1, 0.36, 1] as const;

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const isManualScrollRef = useRef(false);
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const headerData =
    websiteData.categories.Fashion.sections.Header.variants.FashionHeader1;

  const getSectionHash = useCallback((path: string) => {
    if (path === '/' || path === '#home') return '#home';
    const clean = path.replace('/', '').replace('#', '');
    return `#${clean}`;
  }, []);

  const ctaHash = getSectionHash(headerData.ctaButton.path);

  const normalizeActiveHash = useCallback(
    (hash: string) => {
      if (hash === '#enquiry' || hash === '#contact') {
        const hasNav = headerData.navLinks.some(
          (item: { path: string }) => getSectionHash(item.path) === hash
        );
        if (!hasNav) {
          return ctaHash;
        }
      }
      return hash;
    },
    [headerData.navLinks, getSectionHash, ctaHash]
  );

  const lockScrollSpyTemporarily = useCallback((duration = 1100) => {
    isManualScrollRef.current = true;
    if (scrollLockTimerRef.current) {
      clearTimeout(scrollLockTimerRef.current);
    }
    scrollLockTimerRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, duration);
  }, []);

  const scrollToTarget = useCallback((hash: string) => {
    if (hash === '#home') {
      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetId = hash.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const headerOffset = 92;
      const top =
        targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
    closeMobileMenu = false
  ) => {
    e.preventDefault();
    const normalized = normalizeActiveHash(hash);
    setActiveSection(normalized);
    lockScrollSpyTemporarily(1200);

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', hash);
    }

    if (closeMobileMenu) {
      setIsOpen(false);
      setTimeout(() => {
        scrollToTarget(hash);
      }, 150);
    } else {
      scrollToTarget(hash);
    }
  };

  const updateActiveSection = useCallback(() => {
    if (isManualScrollRef.current) return;

    const currentScrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;

    if (currentScrollY < 90) {
      if (window.location.hash && window.location.hash !== '#home') {
        return;
      }
      setActiveSection('#home');
      return;
    }

    const allHashes = [
      ...headerData.navLinks.map((item: { path: string }) =>
        getSectionHash(item.path)
      ),
      ctaHash,
      '#enquiry',
      '#contact',
    ];
    const uniqueIds = Array.from(
      new Set(allHashes.map((h) => h.substring(1)).filter(Boolean))
    );

    const isAtBottom =
      window.innerHeight + currentScrollY >=
      document.documentElement.scrollHeight - 40;
    if (isAtBottom) {
      setActiveSection(normalizeActiveHash('#contact'));
      return;
    }

    const triggerLine = currentScrollY + Math.min(200, window.innerHeight * 0.35);
    let current = '#home';

    const sectionsWithTop: { id: string; top: number }[] = [];
    for (const sectionId of uniqueIds) {
      if (sectionId === 'home') continue;
      const el = document.getElementById(sectionId);
      if (el) {
        sectionsWithTop.push({
          id: sectionId,
          top: el.getBoundingClientRect().top + currentScrollY,
        });
      }
    }

    sectionsWithTop.sort((a, b) => a.top - b.top);

    for (const sec of sectionsWithTop) {
      if (triggerLine >= sec.top) {
        current = `#${sec.id}`;
      }
    }

    setActiveSection(normalizeActiveHash(current));
  }, [headerData.navLinks, ctaHash, getSectionHash, normalizeActiveHash]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const initialHash = window.location.hash;
      setActiveSection(normalizeActiveHash(initialHash));
      lockScrollSpyTemporarily(1100);
      setTimeout(() => {
        scrollToTarget(initialHash);
      }, 100);
    } else {
      updateActiveSection();
    }

    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveSection(normalizeActiveHash(window.location.hash));
        lockScrollSpyTemporarily(1100);
      }
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      window.removeEventListener('hashchange', handleHashChange);
      if (scrollLockTimerRef.current) {
        clearTimeout(scrollLockTimerRef.current);
      }
    };
  }, [updateActiveSection, normalizeActiveHash, lockScrollSpyTemporarily, scrollToTarget]);

  const isCtaActive = activeSection === ctaHash;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E2D8] bg-[#F6F3ED]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          className="group flex items-center py-2"
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
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

        <nav className="hidden items-center space-x-7 lg:flex xl:space-x-9">
          {headerData.navLinks.map((item: { title: string; path: string }) => {
            const hash = getSectionHash(item.path);
            const isActive = activeSection === hash;

            return (
              <Link
                key={item.title}
                href={hash}
                onClick={(e) => handleNavClick(e, hash)}
                className={`relative py-1.5 text-[15px] font-medium tracking-wide transition-all duration-300 xl:text-[16px] ${
                  isActive
                    ? 'font-semibold text-[#9E6E3E]'
                    : 'text-[#55504A] hover:text-[#9E6E3E]'
                }`}
              >
                <span>{item.title}</span>
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

        <div className="hidden lg:block">
          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={ctaHash}
              onClick={(e) => handleNavClick(e, ctaHash)}
              className={`group inline-flex items-center gap-2.5 rounded-sm px-6 py-2.5 text-[14px] font-semibold tracking-wider text-white shadow-sm transition-colors duration-300 xl:text-[15px] ${
                isCtaActive
                  ? 'bg-[#7D5126] ring-2 ring-[#9E6E3E]/40 ring-offset-2 ring-offset-[#F6F3ED]'
                  : 'bg-[#9E6E3E] hover:bg-[#885A2B]'
              }`}
            >
              <span>{headerData.ctaButton.text}</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

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
                      onClick={(e) => handleNavClick(e, hash, true)}
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
                  href={ctaHash}
                  onClick={(e) => handleNavClick(e, ctaHash, true)}
                  className={`flex w-full items-center justify-center gap-2 rounded-sm py-3 text-base font-semibold tracking-wider text-white shadow-sm transition-colors ${
                    isCtaActive
                      ? 'bg-[#7D5126] ring-2 ring-[#9E6E3E]/40 ring-offset-2 ring-offset-[#F6F3ED]'
                      : 'bg-[#9E6E3E] hover:bg-[#885A2B]'
                  }`}
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