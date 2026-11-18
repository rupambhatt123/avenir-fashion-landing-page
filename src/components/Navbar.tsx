'use client';

import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import websiteData from '@/data/websiteData.json';

const EASE = [0.22, 1, 0.36, 1] as const;
const STORAGE_SECTION_KEY = 'avenir_last_active_section';

function NavbarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const isManualScrollRef = useRef(false);
  const isUserScrollingRef = useRef(false);
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      if (!hash) return '#home';
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

  const setAndSaveActiveSection = useCallback(
    (hash: string, persist = true) => {
      const normalized = normalizeActiveHash(hash);
      setActiveSection(normalized);
      if (persist) {
        try {
          sessionStorage.setItem(STORAGE_SECTION_KEY, normalized);
        } catch {}
      }
    },
    [normalizeActiveHash]
  );

  const lockScrollSpyTemporarily = useCallback((duration = 1200) => {
    isManualScrollRef.current = true;
    if (scrollLockTimerRef.current) {
      clearTimeout(scrollLockTimerRef.current);
    }
    scrollLockTimerRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, duration);
  }, []);

  const getVisibleSectionFromViewport = useCallback(() => {
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;

    if (scrollY < 45) {
      return '#home';
    }

    const isAtBottom =
      window.innerHeight + scrollY >=
      document.documentElement.scrollHeight - 25;
    if (isAtBottom) {
      return normalizeActiveHash('#contact');
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

    const headerHeight = 96;
    const viewportTop = headerHeight;
    const viewportBottom = window.innerHeight;

    let bestSection = '#home';
    let maxVisiblePixels = 0;

    for (const id of uniqueIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, viewportTop);
      const visibleBottom = Math.min(rect.bottom, viewportBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      if (visibleHeight > maxVisiblePixels) {
        maxVisiblePixels = visibleHeight;
        bestSection = `#${id}`;
      }
    }

    return normalizeActiveHash(bestSection);
  }, [headerData.navLinks, ctaHash, getSectionHash, normalizeActiveHash]);

  const scrollToTarget = useCallback((hash: string, smooth = true) => {
    const behavior: ScrollBehavior = smooth ? 'smooth' : 'auto';
    if (hash === '#home') {
      window.scrollTo({ top: 0, behavior });
      return;
    }

    const targetId = hash.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const headerHeight = 96;
      const top =
        targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: Math.max(0, top), behavior });
    }
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
    closeMobileMenu = false
  ) => {
    e.preventDefault();
    setAndSaveActiveSection(hash, true);
    lockScrollSpyTemporarily(1200);

    if (typeof window !== 'undefined') {
      window.history.replaceState(window.history.state, '', hash);
    }

    if (closeMobileMenu) {
      setIsOpen(false);
      setTimeout(() => {
        scrollToTarget(hash, true);
      }, 200);
    } else {
      scrollToTarget(hash, true);
    }
  };

  // User ke real touch/wheel scroll ko track karein taaki router ka scrollTo(0,0) sessionStorage na bigaade
  useEffect(() => {
    const markUserInteraction = () => {
      isUserScrollingRef.current = true;
      if (userScrollTimerRef.current) {
        clearTimeout(userScrollTimerRef.current);
      }
      userScrollTimerRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 800);
    };

    const handleScroll = () => {
      if (isManualScrollRef.current) return;
      // Sirf tab update/save karein jab user khud scroll kar raha ho
      if (!isUserScrollingRef.current) return;

      const current = getVisibleSectionFromViewport();
      setAndSaveActiveSection(current, true);
    };

    window.addEventListener('wheel', markUserInteraction, { passive: true });
    window.addEventListener('touchmove', markUserInteraction, { passive: true });
    window.addEventListener('keydown', markUserInteraction, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', markUserInteraction);
      window.removeEventListener('touchmove', markUserInteraction);
      window.removeEventListener('keydown', markUserInteraction);
      window.removeEventListener('scroll', handleScroll);
      if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
      if (userScrollTimerRef.current) clearTimeout(userScrollTimerRef.current);
    };
  }, [getVisibleSectionFromViewport, setAndSaveActiveSection]);

  // Route change / Back button (popstate / pageshow) par saved section ko wapas lock & scroll karein
  useEffect(() => {
    const restoreSection = () => {
      let targetHash = '';
      if (window.location.hash && window.location.hash !== '#home') {
        targetHash = window.location.hash;
      } else {
        try {
          const saved = sessionStorage.getItem(STORAGE_SECTION_KEY);
          if (saved && saved !== '#home') {
            targetHash = saved;
          }
        } catch {}
      }

      if (targetHash) {
        isUserScrollingRef.current = false;
        lockScrollSpyTemporarily(1300);
        setAndSaveActiveSection(targetHash, true);
        if (window.location.hash !== targetHash) {
          window.history.replaceState(window.history.state, '', targetHash);
        }
        scrollToTarget(targetHash, false);
        return;
      }

      const current = getVisibleSectionFromViewport();
      setAndSaveActiveSection(current, false);
    };

    restoreSection();
    const t1 = setTimeout(restoreSection, 100);
    const t2 = setTimeout(restoreSection, 300);
    const t3 = setTimeout(restoreSection, 600);

    window.addEventListener('popstate', restoreSection);
    window.addEventListener('pageshow', restoreSection);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('popstate', restoreSection);
      window.removeEventListener('pageshow', restoreSection);
    };
  }, [
    pathname,
    searchParams,
    getVisibleSectionFromViewport,
    setAndSaveActiveSection,
    lockScrollSpyTemporarily,
    scrollToTarget,
  ]);

  const handleToggleMobileMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        isManualScrollRef.current = false;
        const current = getVisibleSectionFromViewport();
        // Agar viewport me valid section dikh raha hai toh wahi set karein, warna saved section rakhein
        if (current !== '#home' || window.scrollY < 45) {
          setAndSaveActiveSection(current, true);
        }
      }
      return next;
    });
  };

  const isCtaActive = activeSection === ctaHash;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E2D8] bg-[#F6F3ED]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
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
        </a>

        <nav className="hidden items-center space-x-7 lg:flex xl:space-x-9">
          {headerData.navLinks.map((item: { title: string; path: string }) => {
            const hash = getSectionHash(item.path);
            const isActive = activeSection === hash;

            return (
              <a
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
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <a
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
            </a>
          </motion.div>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleToggleMobileMenu}
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
                    <a
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
                    </a>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3, ease: EASE }}
                className="pt-2"
              >
                <a
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
                </a>
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