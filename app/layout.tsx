import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'AVENIR | Luxury Fashion',
  description: 'Fashion For A Better You',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAF8F5] text-[#1A1A1A] antialiased">
        <Suspense fallback={<div className="h-24 bg-[#F6F3ED]" />}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}