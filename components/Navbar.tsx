'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#work' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '/blog' },    

];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // For hash links (home, services, etc.)
      const sections = ['home', 'services', 'work', 'testimonials', 'contact'];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    
    // Check if it's an external page link (/blog)
    if (href.startsWith('/')) {
      window.location.href = href;
    } else {
      // It's a hash link (starts with #)
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return window.location.pathname === '/' && activeSection === 'home';
    }
    if (href.startsWith('/')) {
      return window.location.pathname === href;
    }
    return activeSection === href.replace('#', '');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-sky-100 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-sm">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                Muhammad <span className="gradient-text">Imran</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'text-sky-600 bg-sky-50' 
                        : 'text-slate-500 hover:text-sky-600 hover:bg-sky-50'
                    }`}
                  >
                    {link.label}
                    {isActive && link.href.startsWith('#') && (
                      <span className="block h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mt-0.5 mx-auto w-4/5" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleNavClick('#contact')}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Zap size={14} /> Book Strategy Call
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-600"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white/95 backdrop-blur-sm pt-20">
          <div className="flex flex-col items-center gap-4 p-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-center py-3 text-slate-600 hover:text-sky-600 transition"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold"
            >
              Book Strategy Call
            </button>
          </div>
        </div>
      )}
    </>
  );
}