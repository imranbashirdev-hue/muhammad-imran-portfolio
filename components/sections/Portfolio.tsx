'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, X, Zap, Send, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { allCountries, DEFAULT_COUNTRY_CODE } from '@/components/constants/countries';
import { createClient } from '@/lib/supabase';

const projects = [
  { id: 1, title: 'Dulwich', category: 'Dental', image: '/images/dulwitch.webp' },
  { id: 2, title: 'Pikker', category: 'SaaS / Tech', image: '/images/Pikker-Website.webp' },
  { id: 3, title: 'Green Energy Upgrades', category: 'Energy / Trade', image: '/images/green-energy.webp' },
  { id: 4, title: 'Cell Security', category: 'Security Business', image: '/images/cell.webp' },
  { id: 5, title: 'Top Location Equipment', category: 'Equipment / B2B', image: '/images/top.webp' },
  { id: 6, title: 'Smart Inc', category: 'Professional Services', image: '/images/Smart.webp' },
  { id: 7, title: 'Genos Car Sales', category: 'Automotive', image: '/images/Car.webp' },
];

const industries = [
  { label: 'Dental & Medical', icon: '🦷' },
  { label: 'Trade & Construction', icon: '🔧' },
  { label: 'Real Estate', icon: '🏠' },
  { label: 'E-commerce', icon: '🛒' },
  { label: 'SaaS & Tech', icon: '💻' },
  { label: 'Professional Services', icon: '💼' },
];

const INITIAL_SHOW = 6;
const LOAD_MORE_COUNT = 3;

export default function Portfolio() {
  const supabase = createClient();

  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;
  const isAllVisible = visibleCount >= projects.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const newCount = Math.min(visibleCount + LOAD_MORE_COUNT, projects.length);
      setVisibleCount(newCount);
      setIsLoadingMore(false);
    }, 400);
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_SHOW);
    // Smooth scroll to top of section
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Popup States (same as before)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [quoteIndustry, setQuoteIndustry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [selectedCountryCode, setSelectedCountryCode] = useState("+92");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryError, setCountryError] = useState("");

  const handleCountrySearch = (term: string) => {
    setCountrySearchTerm(term);
    const filtered = allCountries.filter(
      (c) => c.country.toLowerCase().includes(term.toLowerCase()) || c.code.includes(term)
    );
    setFilteredCountries(filtered);
  };

  const handleSelectCountry = (code: string) => {
    setSelectedCountryCode(code);
    setIsCountrySelected(true);
    setCountryError("");
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
    if (!isCountrySelected) {
  setCountryError("Please select your country code");
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
          message: quoteMessage || 'Project viewing request',
          page_source: 'portfolio_popup',
          industry: quoteIndustry || 'Not specified',
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
        setQuoteIndustry("");
        setNameError("");
        setPhoneError("");
        setCountryError("");
        setIsCountrySelected(false);
      }, 2000);

    } catch (err) {
      console.error('Error:', err);
      alert('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="work" className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm">
              A showcase of my recent work and successful collaborations across various industries.
            </p>
          </div>

          {/* Projects Grid - Services jaisi smooth animation */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.15 }}
                className="group relative bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-[400px]"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-top transition-all duration-[3s] ease-in-out group-hover:bg-bottom"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
                  <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={() => setIsPopupOpen(true)}
                      className="group/btn relative overflow-hidden px-6 py-2.5 text-sm font-semibold bg-white text-slate-800 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-blue-500/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      <Eye size={14} className="text-sky-500" />
                      <span>Get a Quote</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More / Show Less Button */}
          <div className="flex justify-center mt-10">
            {hasMore ? (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="group relative overflow-hidden px-8 py-3.5 rounded-xl bg-white border-2 border-cyan-200 text-slate-700 font-semibold hover:border-cyan-400 hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  {isLoadingMore ? (
                    <>
                      <span className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-500 rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Projects
                      <ChevronDown size={16} className="text-cyan-500 group-hover:translate-y-0.5 transition-transform" />
                      <span className="text-xs text-slate-400 font-normal">
                        ({projects.length - visibleCount} remaining)
                      </span>
                    </>
                  )}
                </span>
              </motion.button>
            ) : isAllVisible && visibleCount > INITIAL_SHOW ? (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={handleShowLess}
                className="group relative overflow-hidden px-8 py-3.5 rounded-xl bg-white border-2 border-cyan-200 text-slate-700 font-semibold hover:border-cyan-400 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Show Less Projects
                  <ChevronUp size={16} className="text-cyan-500 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </motion.button>
            ) : null}
          </div>
        </div>

        {/* Industries We Serve */}
        <div className="mt-16 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-700">Industries We Serve</h3>
            <p className="text-slate-400 text-sm mt-2">Specialized in high-value markets across UK, USA, UAE & Australia</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true, amount: 0.2 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-sky-100 rounded-full shadow-sm hover:border-sky-300 hover:shadow-md transition-all duration-300 text-sm font-semibold text-slate-700"
              >
                <span>{industry.icon}</span>
                <span>{industry.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup Modal - Same as before */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors z-10"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mx-auto mb-3">
                <Zap size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold gradient-text">Get a Free Quote</h3>
              <p className="text-slate-500 text-sm mt-1">Tell me about your project and get a free quote.</p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    value={quoteName}
                    onChange={handleNameChange}
                    required
                  />
                  {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    value={quoteEmail}
                    onChange={(e) => setQuoteEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="flex items-center gap-1 px-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm min-w-[85px]"
                      >
                       <span className="text-lg">{allCountries.find(c => c.code === selectedCountryCode)?.flag || "🇵🇰"}</span>
<span className="font-medium">{selectedCountryCode}</span>
                        <ChevronDown size={14} className="ml-1" />
                      </button>
                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                          <div className="p-2 border-b border-gray-100">
                            <input
                              type="text"
                              ref={countrySearchRef}
                              placeholder="Search country or code..."
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-sky-400 focus:outline-none"
                              value={countrySearchTerm}
                              onChange={(e) => handleCountrySearch(e.target.value)}
                              autoFocus
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => handleSelectCountry(country.code)}
                                  className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 text-sm ${selectedCountryCode === country.code ? "bg-sky-50" : ""}`}
                                >
                                  <span className="text-lg">{country.flag}</span>
                                  <span className="text-xs font-medium">{country.code}</span>
                                  <span className="text-xs text-gray-500 truncate">{country.country}</span>
                                  {selectedCountryCode === country.code && <span className="ml-auto text-sky-500">✓</span>}
                                </button>
                              ))
                            ) : (
                              <div className="p-3 text-center text-gray-500 text-sm">No country found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                      value={quotePhone}
                      onChange={handlePhoneChange}
                      required
                    />
                  </div>
                  {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                  {countryError && <p className="text-red-500 text-xs mt-1">{countryError}</p>}
                  <p className="text-gray-400 text-xs mt-1">Example: {selectedCountryCode} 50 123 4567</p>
                </div>

                <div>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 text-sm text-slate-700 bg-white"
                    value={quoteIndustry}
                    onChange={(e) => setQuoteIndustry(e.target.value)}
                  >
                    <option value="">Select Your Industry</option>
                    <option value="Dental & Medical">🦷 Dental & Medical</option>
                    <option value="Trade & Construction">🔧 Trade & Construction</option>
                    <option value="Real Estate">🏠 Real Estate</option>
                    <option value="E-commerce">🛒 E-commerce</option>
                    <option value="SaaS & Tech">💻 SaaS & Tech</option>
                    <option value="Professional Services">💼 Professional Services</option>
                    <option value="Automotive">🚗 Automotive</option>
                    <option value="Other">📁 Other</option>
                  </select>
                </div>

                <div>
                  <textarea
                    placeholder="Tell me about your project requirements..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 resize-none"
                    value={quoteMessage}
                    onChange={(e) => setQuoteMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Request
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-400 text-center">Free consultation • No obligation • Response within 24h</p>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request Sent! 🎉</h3>
                <p className="text-slate-500">Thanks for reaching out. We&apos;ll contact you within 24 hours.</p>
              </div>
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