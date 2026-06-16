'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Share2, Search, Code2, Monitor, LineChart, ArrowRight, X, Zap, Send, CheckCircle, ChevronDown } from 'lucide-react';
import { allCountries, DEFAULT_COUNTRY_CODE } from '@/components/constants/countries';
import { createClient } from '@/lib/supabase';

const services = [
  { icon: Target, title: 'Google Ads Management', desc: 'Data-driven Search, Display, and Shopping campaigns optimized for maximum ROAS.', tags: ['Search', 'Display', 'Shopping'], color: '#0EA5E9' },
  { icon: Share2, title: 'Meta Ads Management', desc: 'High-converting Facebook and Instagram ad campaigns with precise audience targeting.', tags: ['Facebook', 'Instagram', 'Retargeting'], color: '#3B82F6' },
  { icon: Search, title: 'SEO Services', desc: 'Technical SEO, on-page optimization, and authority link building strategies.', tags: ['Technical SEO', 'On-Page', 'Link Building'], color: '#6366F1' },
  { icon: Code2, title: 'WordPress Development', desc: 'Custom WordPress websites built for speed, security, and conversions.', tags: ['Custom Themes', 'Plugins', 'Speed'], color: '#0EA5E9' },
  { icon: Monitor, title: 'Website Design', desc: 'Premium UI/UX design focused on conversion, brand identity, and user experience.', tags: ['UI/UX', 'Wireframing', 'Prototyping'], color: '#3B82F6' },
  { icon: LineChart, title: 'GA4 & GTM Setup', desc: 'Full analytics infrastructure — from conversion tracking to custom dashboards.', tags: ['GA4', 'GTM', 'Looker Studio'], color: '#6366F1' },
];

export default function Services() {
  const supabase = createClient();
  
  // Popup states
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [quoteName, setQuoteName] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Country code states
  const [selectedCountryCode, setSelectedCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleCountrySearch = (term: string) => {
    setCountrySearchTerm(term);
    const filtered = allCountries.filter(
      (c) => c.country.toLowerCase().includes(term.toLowerCase()) || c.code.includes(term)
    );
    setFilteredCountries(filtered);
  };

  const handleSelectCountry = (code: string) => {
    setSelectedCountryCode(code);
    setIsCountryDropdownOpen(false);
    setCountrySearchTerm("");
    setFilteredCountries(allCountries);
  };

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

  const openPopup = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsPopupOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
          message: quoteMessage || `Interested in: ${selectedService}`,
          page_source: 'services_popup',
          service_name: selectedService,
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
        setSelectedService("");
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
      <section id="services" className="section-padding bg-gradient-to-b from-white to-cyan-50/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="tag mx-auto w-fit mb-4">What I Do</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Performance-Driven <span className="gradient-text">Services</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4">Everything required to generate traffic, leads, and revenue — under one strategy.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                className="group bg-white rounded-2xl p-6 border border-cyan-100 hover:border-cyan-300 hover:-translate-y-2 transition-all duration-300 card-shine shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:scale-110 transition" style={{ backgroundColor: `${service.color}15` }}>
                  <service.icon size={22} style={{ color: service.color }} />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">{service.tags.map(tag => (<span key={tag} className="text-xs px-2 py-1 rounded-full bg-cyan-50 text-cyan-600">{tag}</span>))}</div>
                <button 
                  onClick={() => openPopup(service.title)}
                  className="flex items-center gap-1 text-sm font-medium text-cyan-600 group-hover:gap-2 transition"
                >
                  Learn more <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsPopupOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setIsPopupOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors z-10"><X size={20} /></button>
            
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mx-auto mb-3"><Zap size={20} className="text-white" /></div>
              <h3 className="text-xl font-bold gradient-text">Get a Quote</h3>
              <p className="text-slate-500 text-sm mt-1">For: <span className="font-semibold text-slate-700">{selectedService}</span></p>
              <p className="text-slate-400 text-xs mt-1">Free consultation. No obligations.</p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                          <div className="p-2 border-b border-gray-100"><input type="text" ref={countrySearchRef} placeholder="Search country or code..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-sky-400 focus:outline-none" value={countrySearchTerm} onChange={(e) => handleCountrySearch(e.target.value)} autoFocus /></div>
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
                  {isSubmitting ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</> : <><Send size={16} /> Get Free Quote</>}
                </button>
                <p className="text-xs text-slate-400 text-center">Free consultation • No obligation • Response within 24h</p>
              </form>
            ) : (
              <div className="text-center py-6"><div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-green-500" /></div><h3 className="text-xl font-bold text-slate-900 mb-2">Request Sent! 🎉</h3><p className="text-slate-500">Thanks for reaching out. We'll contact you within 24 hours.</p></div>
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