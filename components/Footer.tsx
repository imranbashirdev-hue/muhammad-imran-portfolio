'use client';

import { Zap, Linkedin, Instagram, Facebook, MessageCircle } from 'lucide-react';

const services = [
  'Google Ads Management',
  'Meta Ads Management',
  'SEO Services',
  'WordPress Development',
  'Website Design',
  'GA4 & GTM Setup',
  'E-commerce Development',
  'Conversion Rate Optimization',
];

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#work' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
  { icon: Instagram, href: '#', label: 'Instagram', color: '#E1306C' },
  { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
  {
    icon: MessageCircle,
    href: 'https://wa.me/971501234567',
    label: 'WhatsApp',
    color: '#25D366',
  },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" onClick={() => scrollTo('#home')} className="flex items-center gap-2 mb-4 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Muhammad <span className="gradient-text">Imran</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Digital Growth Strategist helping businesses across UAE and GCC scale through data-driven
              marketing and high-converting digital experiences.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20"
                  style={{ '--hover-color': color } as React.CSSProperties}
                >
                  <Icon size={16} className="text-gray-400 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-gray-500 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <p className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Services
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {services.map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo('#services')}
                  className="text-gray-500 hover:text-white text-sm text-left transition-colors duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2025 Muhammad Imran. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-600 text-xs">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
