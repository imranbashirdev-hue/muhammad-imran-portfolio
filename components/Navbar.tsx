'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#work' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-sky-100 shadow-sm shadow-sky-100/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="#home" onClick={() => handleNavClick('#home')} className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-sm group-hover:shadow-sky-300/40 transition-shadow">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">Muhammad <span className="gradient-text">Imran</span></span>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <button key={link.href} onClick={() => handleNavClick(link.href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'text-sky-600 bg-sky-50' : 'text-slate-500 hover:text-sky-600 hover:bg-sky-50'}`}>
                    {link.label}
                    {isActive && <span className="block h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mt-0.5 mx-auto w-4/5" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => handleNavClick('#contact')}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-sky-300/30 hover:-translate-y-0.5">
                <Zap size={14} />Book Strategy Call
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-600" aria-label="Toggle menu">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-16 left-4 right-4 bg-white border border-sky-100 rounded-2xl p-6 transition-all duration-300 shadow-xl shadow-sky-100/50 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <button key={link.href} onClick={() => handleNavClick(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-sky-50 text-sky-600 border border-sky-200' : 'text-slate-500 hover:text-sky-600 hover:bg-sky-50'}`}>
                  {link.label}
                </button>
              );
            })}
            <div className="pt-2 border-t border-sky-100 mt-2">
              <button onClick={() => handleNavClick('#contact')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold">
                <Zap size={14} />Book Strategy Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
