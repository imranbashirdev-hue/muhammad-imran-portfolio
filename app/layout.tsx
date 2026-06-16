import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Muhammad Imran | Digital Growth Strategist',
  description: 'Google Ads, Meta Ads, SEO, WordPress Development, and Analytics services.',
  icons: {
    icon: '/images/fav-icon.webp',
    shortcut: '/images/fav-icon.webp',
    apple: '/images/fav-icon.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon with circle styling */}
        <link
          rel="icon"
          href="/images/fav-icon.webp"
          sizes="any"
          type="image/webp"
        />
        {/* Apple touch icon */}
        <link
          rel="apple-touch-icon"
          href="/images/fav-icon.webp"
        />
        {/* Mask icon for Safari */}
        <link
          rel="mask-icon"
          href="/images/fav-icon.webp"
          color="#0EA5E9"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}