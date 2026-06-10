import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhammad Imran | Digital Growth Strategist',
  description:
    'Google Ads, Meta Ads, SEO, WordPress Development, and Analytics services helping businesses scale through measurable growth strategies.',
  keywords: [
    'Google Ads Specialist',
    'Meta Ads Expert',
    'SEO Consultant',
    'WordPress Developer',
    'GA4 GTM Specialist',
    'Digital Marketing UAE',
    'Digital Growth Strategist',
    'Performance Marketing',
  ],
  authors: [{ name: 'Muhammad Imran' }],
  openGraph: {
    title: 'Muhammad Imran | Digital Growth Strategist',
    description:
      'Data-driven marketing systems, high-converting websites, and performance campaigns that generate measurable business growth.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Imran | Digital Growth Strategist',
    description:
      'Data-driven marketing systems that generate measurable business growth and real revenue.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
