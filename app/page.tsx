'use client';

import HeroSection from '@/src/components/HeroSection';
import AboutSection from '@/src/components/AboutSection';
import CollectionGrid from '@/src/components/CollectionGrid';
import GallerySection from '@/src/components/GallerySection';
import TestimonialsSection from '@/src/components/TestimonialsSection';
import EnquirySection from '@/src/components/EnquirySection';
import ContactSection from '@/src/components/ContactSection';
import InstagramFeed from '@/src/components/InstagramFeed';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <CollectionGrid />
      <GallerySection />
      <TestimonialsSection />
      <EnquirySection />
      <ContactSection />
      <InstagramFeed />
    </main>
  );
}