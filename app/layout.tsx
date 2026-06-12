import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Muhammad Imran | Digital Growth Strategist',
  description: 'Google Ads, Meta Ads, SEO, WordPress Development, and Analytics services helping businesses scale through measurable growth strategies.',
  keywords: ['Google Ads Specialist', 'Meta Ads Expert', 'SEO Consultant', 'WordPress Developer', 'GA4 GTM Specialist', 'Digital Marketing UAE'],
  authors: [{ name: 'Muhammad Imran' }],
  openGraph: {
    title: 'Muhammad Imran | Digital Growth Strategist',
    description: 'Data-driven marketing systems, high-converting websites, and performance campaigns that generate measurable business growth.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KS8SG73R'); 
            `,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KS8SG73R"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}