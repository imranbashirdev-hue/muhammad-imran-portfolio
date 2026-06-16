'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap, Phone, Mail, MapPin, Search, Clock, Send, CheckCircle, ChevronDown } from 'lucide-react';
import { allCountries, DEFAULT_COUNTRY_CODE } from '@/components/constants/countries';
import { createClient } from '@/lib/supabase';

const hideHeaderOnPages = [
  '/real-estate',
  '/dentist', 
  '/dentist/thank-you',
  '/web-services',
  '/web-services/thank-you',
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const supabase = createClient();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const countrySearchRef = useRef<HTMLInputElement>(null);
  
  // Popup states
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(allCountries);

  if (hideHeaderOnPages.includes(pathname)) return null;

  useEffect(() => {
    const filtered = allCountries.filter(
      (c) => c.country.toLowerCase().includes(countrySearchTerm.toLowerCase()) || c.code.includes(countrySearchTerm)
    );
    setFilteredCountries(filtered);
  }, [countrySearchTerm]);

  const validateName = (value: string) => {
    const nameRegex = /^[A-Za-z\s]*$/;
    return nameRegex.test(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateName(value)) {
      setQuoteName(value);
      setNameError("");
    } else if (value.length > 0) {
      setNameError("Only letters allowed");
    }
  };

  const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^\d*$/;
    return phoneRegex.test(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validatePhoneNumber(value)) {
      setQuotePhone(value);
      setPhoneError("");
    } else {
      setPhoneError("Only numbers allowed");
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isPopupOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'services', 'process', 'testimonials', 'contact'];
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
    setSearchOpen(false);
    if (href.startsWith('/')) {
      window.location.href = href;
    } else {
      const element = document.getElementById(href.replace('#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCountry = (code: string) => {
    setSelectedCountryCode(code);
    setIsCountryDropdownOpen(false);
    setCountrySearchTerm("");
    setFilteredCountries(allCountries);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName.trim()) {
      setNameError("Name is required");
      return;
    }
    if (!quotePhone.trim()) {
      setPhoneError("Phone number is required");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const fullPhone = selectedCountryCode + quotePhone;
      
      const { error } = await supabase.from('leads').insert([
        {
          name: quoteName,
          email: quoteEmail,
          phone: fullPhone,
          message: quoteMessage || 'Strategy call request',
          page_source: 'navbar_popup',
          created_at: new Date().toISOString(),
        }
      ]);

      if (error) {
        console.error('Supabase error:', error);
        alert('Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitted(false);
        setIsPopupOpen(false);
        setQuoteName("");
        setQuotePhone("");
        setQuoteEmail("");
        setQuoteMessage("");
        setNameError("");
        setPhoneError("");
      }, 2000);
      
    } catch (err) {
      console.error('Error:', err);
      alert('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-sky-100 to-blue-100 text-slate-700 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs md:text-sm">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2"><Clock size={14} className="text-sky-600" /><span>MON - SAT 08:00am to 06:00 pm</span></div>
            <div className="flex items-center gap-2"><MapPin size={14} className="text-sky-600" /><span>Dubai, United Arab Emirates</span></div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href="mailto:hello@muhammadimran.com" className="flex items-center gap-2 hover:text-sky-700 transition"><Mail size={14} className="text-sky-600" /><span>hello@muhammadimran.com</span></a>
            <a href="tel:+971501234567" className="flex items-center gap-2 hover:text-sky-700 transition"><Phone size={14} className="text-sky-600" /><span>+971 50 123 4567</span></a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-gray-100 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-sm"><Zap size={16} className="text-white" /></div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">Muhammad <span className="gradient-text">Imran</span></span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                let isActive = false;
                if (link.href === '/') isActive = activeSection === 'home';
                else if (link.href.startsWith('/')) isActive = pathname === link.href;
                else isActive = activeSection === link.href.replace('#', '');
                return (
                  <button key={link.href} onClick={() => handleNavClick(link.href)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'text-sky-600 bg-sky-50' : 'text-slate-500 hover:text-sky-600 hover:bg-sky-50'}`}>{link.label}</button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition"><Search size={18} /></button>
              {searchOpen && (<div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"><div className="p-3"><input type="text" placeholder="Search services, blogs..." className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100" autoFocus /></div></div>)}
              <button onClick={() => setIsPopupOpen(true)} className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"><Zap size={14} /> Book Strategy Call</button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-600">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white pt-20">
          <div className="flex flex-col items-center gap-4 p-6">
            {navLinks.map((link) => (<button key={link.href} onClick={() => handleNavClick(link.href)} className="w-full text-center py-3 text-slate-600 hover:text-sky-600 transition text-lg">{link.label}</button>))}
            <button onClick={() => setIsPopupOpen(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold">Book Strategy Call</button>
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setIsPopupOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsPopupOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors z-10"><X size={20} /></button>
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mx-auto mb-3"><Zap size={20} className="text-white" /></div>
              <h3 className="text-xl font-bold gradient-text">Book a Strategy Call</h3>
              <p className="text-slate-500 text-sm mt-1">Free 30-min consultation. No obligations.</p>
            </div>

            {!submitted ? (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div><input type="text" placeholder="Your Full Name *" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100" value={quoteName} onChange={handleNameChange} required />{nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}</div>
                <div><input type="email" placeholder="Email Address *" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100" value={quoteEmail} onChange={(e) => setQuoteEmail(e.target.value)} required /></div>
                <div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <button type="button" onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)} className="flex items-center gap-1 px-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm min-w-[85px]">
                        <span className="text-lg">{allCountries.find(c => c.code === selectedCountryCode)?.flag || "🌍"}</span><span className="font-medium">{selectedCountryCode}</span><ChevronDown size={14} className="ml-1" />
                      </button>
                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                          <div className="p-2 border-b border-gray-100"><input type="text" ref={countrySearchRef} placeholder="Search country or code..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-sky-400 focus:outline-none" value={countrySearchTerm} onChange={(e) => setCountrySearchTerm(e.target.value)} autoFocus /></div>
                          <div className="max-h-48 overflow-y-auto">
                            {filteredCountries.length > 0 ? filteredCountries.map((country) => (<button key={country.code} type="button" onClick={() => handleSelectCountry(country.code)} className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 text-sm ${selectedCountryCode === country.code ? "bg-sky-50" : ""}`}><span className="text-lg">{country.flag}</span><span className="text-xs font-medium">{country.code}</span><span className="text-xs text-gray-500 truncate">{country.country}</span>{selectedCountryCode === country.code && <span className="ml-auto text-sky-500">✓</span>}</button>)) : <div className="p-3 text-center text-gray-500 text-sm">No country found</div>}
                          </div>
                        </div>
                      )}
                    </div>
                    <input type="tel" placeholder="Phone Number *" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100" value={quotePhone} onChange={handlePhoneChange} required />
                  </div>
                  {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                  <p className="text-gray-400 text-xs mt-1">Example: {selectedCountryCode} 50 123 4567</p>
                </div>
                <div><textarea placeholder="Tell me about your project requirements..." rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 resize-none" value={quoteMessage} onChange={(e) => setQuoteMessage(e.target.value)} /></div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</> : <><Send size={16} /> Schedule My Free Call</>}
                </button>
                <p className="text-xs text-slate-400 text-center">Free 30-min consultation • No obligation • Response within 24h</p>
              </form>
            ) : (
              <div className="text-center py-6"><div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-green-500" /></div><h3 className="text-xl font-bold text-slate-900 mb-2">Request Sent! 🎉</h3><p className="text-slate-500">Thanks for reaching out. I'll contact you within 24 hours.</p></div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </>
  );
}