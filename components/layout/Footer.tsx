'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Zap, Linkedin, Instagram, Facebook, MessageCircle } from 'lucide-react';

const services = ['Google Ads Management', 'Meta Ads Management', 'SEO Services', 'WordPress Development', 'Website Design', 'GA4 & GTM Setup', 'E-commerce Development', 'Conversion Rate Optimization'];
const quickLinks = [{ label: 'Home', href: '#home' }, { label: 'Services', href: '#services' }, { label: 'Results', href: '#work' }, { label: 'Testimonials', href: '#testimonials' }, { label: 'Contact', href: '#contact' }];
const socials = [
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
  { icon: Instagram, href: '#', label: 'Instagram', color: '#E1306C' },
  { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
  { icon: MessageCircle, href: 'https://wa.me/971501234567', label: 'WhatsApp', color: '#25D366' },
];

// ✅ Pages where footer should be hidden
const hideFooterOnPages = [
  '/real-estate',
  '/real-estate/thank-you',
  '/dentist',
  '/dentist/thank-you',
  '/web-services',
  '/web-services/thank-you',
];

export default function Footer() {
  const pathname = usePathname();

  // ✅ Don't render on landing pages
  if (hideFooterOnPages.includes(pathname)) {
    return null;
  }

  const scrollTo = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-sky-100 pt-16 pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <a href="#home" onClick={() => scrollTo('#home')} className="flex items-center gap-2 mb-4 cursor-pointer">
              <Image
                src="/images/imranads.webp"
                  alt="Muhammad Imran Logo"
                  width={180}
                  height={60}
                  className="object-contain"
                  priority
              />
              </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Digital Growth Strategist helping businesses across UAE and GCC scale through data-driven marketing and high-converting digital experiences.</p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-100">
                  <Icon size={16} className="text-sky-600" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-slate-700 font-semibold text-sm mb-5 uppercase tracking-wider">Navigation</p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button onClick={() => scrollTo(link.href)} className="text-slate-400 hover:text-sky-600 text-sm transition-colors duration-200">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-slate-700 font-semibold text-sm mb-5 uppercase tracking-wider">Services</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {services.map((s) => (
                <button key={s} onClick={() => scrollTo('#services')} className="text-slate-400 hover:text-sky-600 text-sm text-left transition-colors duration-200">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Muhammad Imran. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <Link href="/privacy-policy" className="hover:text-sky-600 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms-and-conditions" className="hover:text-sky-600 transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link href="/blog" className="hover:text-sky-600 transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}