'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Star, Clock, X, Zap, Send, CheckCircle, ChevronDown } from 'lucide-react';
import { allCountries, DEFAULT_COUNTRY_CODE } from '@/components/constants/countries';
import { createClient } from '@/lib/supabase';

const caseStudies = [
  {
    slug: 'dulwich-dentists',
    title: 'Dulwich Dentists',
    industry: '🦷 Dental & Medical',
    industryColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    location: 'London, UK',
    tagline: 'From outdated website to a fully optimised, patient-converting online presence',
    image: '/images/dulwitch.webp',
    services: ['WordPress Development', 'Website Design', 'SEO Setup'],
    results: [
      { icon: TrendingUp, value: '3x', label: 'More Enquiries' },
      { icon: Clock, value: '7', label: 'Days to Launch' },
      { icon: Star, value: '5.0', label: 'Client Rating' },
    ],
    accentColor: 'from-cyan-500 to-blue-600',
  },
  {
    slug: 'pikker',
    title: 'Pikker Platform',
    industry: '⚡ SaaS / Tech',
    industryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    location: 'United Kingdom',
    tagline: 'Clean, responsive website with modern layout built around business goals',
    image: '/images/Pikker-Website.webp',
    services: ['WordPress Development', 'Website Design', 'UI/UX'],
    results: [
      { icon: TrendingUp, value: '↑', label: 'Conversion Rate' },
      { icon: Clock, value: '10', label: 'Days to Launch' },
      { icon: Star, value: '5.0', label: 'Client Rating' },
    ],
    accentColor: 'from-indigo-500 to-purple-600',
  },
  {
    slug: 'green-energy-upgrades',
    title: 'Green Energy Upgrades',
    industry: '🔧 Energy / Trade',
    industryColor: 'bg-green-50 text-green-700 border-green-200',
    location: 'Australia',
    tagline: 'Lead-generating website for a growing energy efficiency business',
    image: '/images/green-energy.webp',
    services: ['WordPress Development', 'Google Ads', 'Landing Page'],
    results: [
      { icon: Users, value: '2x', label: 'More Leads' },
      { icon: Clock, value: '14', label: 'Days to Launch' },
      { icon: Star, value: '5.0', label: 'Client Rating' },
    ],
    accentColor: 'from-green-500 to-emerald-600',
  },
  {
    slug: 'cell-security',
    title: 'Cell Security',
    industry: '🏢 Security Business',
    industryColor: 'bg-slate-50 text-slate-700 border-slate-200',
    location: 'United Kingdom',
    tagline: 'Professional B2B website for a custodial and detention solutions company',
    image: '/images/cell.webp',
    services: ['WordPress Development', 'Website Design', 'SEO'],
    results: [
      { icon: TrendingUp, value: '↑', label: 'Organic Traffic' },
      { icon: Clock, value: '10', label: 'Days to Launch' },
      { icon: Star, value: '5.0', label: 'Client Rating' },
    ],
    accentColor: 'from-slate-600 to-slate-800',
  },
];

export default function CaseStudiesPage() {
  const supabase = createClient();

  // ✅ Popup states (same pattern as Dulwich)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [selectedCountryCode, setSelectedCountryCode] = useState("+92");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [isCountrySelected, setIsCountrySelected] = useState(false);

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
    setIsCountrySelected(true);
    setCountryError("");
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

    setNameError("");
    setPhoneError("");
    setCountryError("");

    setIsSubmitting(true);

    try {
      const fullPhone = selectedCountryCode + quotePhone;

      const { error } = await supabase.from('leads').insert([
        {
          name: quoteName,
          email: quoteEmail,
          phone: fullPhone,
          message: quoteMessage || 'Strategy call request from Case Studies page',
          page_source: 'case_studies_listing_popup',
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
        setCountryError("");
        setIsCountrySelected(false);
        setSelectedCountryCode("+92");
      }, 2000);

    } catch (err) {
      console.error('Error:', err);
      alert('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-sky-50/30">

        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }} />
            ))}
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                📊 Real Results · Real Clients
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Studies</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
                Real projects. Real results. See how we&apos;ve helped businesses across dental, trade, tech and more grow their online presence.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((cs, index) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/case-studies/${cs.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <div
                      className="absolute inset-0 bg-cover bg-top transition-all duration-[3s] group-hover:bg-bottom"
                      style={{ backgroundImage: `url(${cs.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Industry Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border bg-white/90 backdrop-blur-sm ${cs.industryColor}`}>
                        {cs.industry}
                      </span>
                    </div>
                    {/* Location */}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white/80 text-xs font-medium">📍 {cs.location}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-black text-slate-900 mb-2 group-hover:text-sky-600 transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
                      {cs.title}
                    </h2>
                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                      {cs.tagline}
                    </p>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {cs.services.map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-sky-50 text-sky-600 text-xs font-medium rounded-lg border border-sky-100">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Results Row */}
                    <div className="grid grid-cols-3 gap-3 mb-5 p-4 bg-gradient-to-r from-slate-50 to-sky-50/50 rounded-xl border border-slate-100">
                      {cs.results.map((r, i) => (
                        <div key={i} className="text-center">
                          <div className="text-xl font-black text-slate-800">{r.value}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{r.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-sky-600 group-hover:text-sky-700 flex items-center gap-1">
                        Read Full Case Study
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${cs.accentColor} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                        <ArrowRight size={14} className="text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-10 text-white"
          >
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              Want Results Like These?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Book a free 15-minute strategy call and I&apos;ll show you exactly what&apos;s holding your business back online.
            </p>
            {/* ✅ Changed from Link to button — opens popup, same as Dulwich */}
            <button
              onClick={() => setIsPopupOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-slate-800 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Book a Free Strategy Call
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ✅ Popup Modal — identical structure/logic to Dulwich */}
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
              <h3 className="text-xl font-bold gradient-text">Book a Free Strategy Call</h3>
              <p className="text-slate-500 text-sm mt-1">Get a tailored strategy for your business</p>
              <p className="text-slate-400 text-xs mt-1">Free consultation · No obligations</p>
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

                {/* Phone Field - Country Code Required */}
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
                  {(phoneError || countryError) && (
                    <p className="text-red-500 text-xs mt-1">{phoneError || countryError}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">Example: {selectedCountryCode} 50 123 4567</p>
                </div>

                <div>
                  <textarea
                    placeholder="Tell me about your project..."
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
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                  ) : (
                    <><Send size={16} /> Book Free Call</>
                  )}
                </button>
                <p className="text-xs text-slate-400 text-center">We'll respond within 24 hours</p>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request Sent! 🎉</h3>
                <p className="text-slate-500">Thanks for reaching out. We'll contact you within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}