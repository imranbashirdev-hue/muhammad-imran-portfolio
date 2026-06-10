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

        <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KS8SG73R');</script>
<!-- End Google Tag Manager -->
      </head>
      <body className="antialiased">
        <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KS8SG73R"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
        {children}</body>
    </html>
  );
}
