"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Phone, Shield, Zap, TrendingUp, X, CheckCircle } from "lucide-react";

const allCountries = [
  // Gulf Countries
  { code: "+971", flag: "🇦🇪", country: "United Arab Emirates" },
  { code: "+966", flag: "🇸🇦", country: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", country: "Qatar" },
  { code: "+968", flag: "🇴🇲", country: "Oman" },
  { code: "+973", flag: "🇧🇭", country: "Bahrain" },
  { code: "+965", flag: "🇰🇼", country: "Kuwait" },
  
  // South Asia
  { code: "+92", flag: "🇵🇰", country: "Pakistan" },
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+880", flag: "🇧🇩", country: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", country: "Sri Lanka" },
  { code: "+977", flag: "🇳🇵", country: "Nepal" },
  { code: "+960", flag: "🇲🇻", country: "Maldives" },
  { code: "+93", flag: "🇦🇫", country: "Afghanistan" },
  
  // Europe
  { code: "+44", flag: "🇬🇧", country: "United Kingdom" },
  { code: "+49", flag: "🇩🇪", country: "Germany" },
  { code: "+33", flag: "🇫🇷", country: "France" },
  { code: "+39", flag: "🇮🇹", country: "Italy" },
  { code: "+34", flag: "🇪🇸", country: "Spain" },
  { code: "+31", flag: "🇳🇱", country: "Netherlands" },
  { code: "+41", flag: "🇨🇭", country: "Switzerland" },
  { code: "+46", flag: "🇸🇪", country: "Sweden" },
  { code: "+47", flag: "🇳🇴", country: "Norway" },
  { code: "+45", flag: "🇩🇰", country: "Denmark" },
  { code: "+358", flag: "🇫🇮", country: "Finland" },
  { code: "+48", flag: "🇵🇱", country: "Poland" },
  { code: "+420", flag: "🇨🇿", country: "Czech Republic" },
  { code: "+36", flag: "🇭🇺", country: "Hungary" },
  { code: "+43", flag: "🇦🇹", country: "Austria" },
  { code: "+32", flag: "🇧🇪", country: "Belgium" },
  { code: "+353", flag: "🇮🇪", country: "Ireland" },
  { code: "+351", flag: "🇵🇹", country: "Portugal" },
  { code: "+30", flag: "🇬🇷", country: "Greece" },
  { code: "+90", flag: "🇹🇷", country: "Turkey" },
  { code: "+7", flag: "🇷🇺", country: "Russia" },
  
  // North America
  { code: "+1", flag: "🇺🇸", country: "United States" },
  { code: "+1", flag: "🇨🇦", country: "Canada" },
  { code: "+52", flag: "🇲🇽", country: "Mexico" },
  
  // Australia/Oceania
  { code: "+61", flag: "🇦🇺", country: "Australia" },
  { code: "+64", flag: "🇳🇿", country: "New Zealand" },
  
  // Africa
  { code: "+27", flag: "🇿🇦", country: "South Africa" },
  { code: "+20", flag: "🇪🇬", country: "Egypt" },
  { code: "+212", flag: "🇲🇦", country: "Morocco" },
  { code: "+216", flag: "🇹🇳", country: "Tunisia" },
  { code: "+234", flag: "🇳🇬", country: "Nigeria" },
  { code: "+254", flag: "🇰🇪", country: "Kenya" },
  
  // South America
  { code: "+55", flag: "🇧🇷", country: "Brazil" },
  { code: "+54", flag: "🇦🇷", country: "Argentina" },
  { code: "+56", flag: "🇨🇱", country: "Chile" },
  { code: "+57", flag: "🇨🇴", country: "Colombia" },
  
  // East Asia
  { code: "+86", flag: "🇨🇳", country: "China" },
  { code: "+81", flag: "🇯🇵", country: "Japan" },
  { code: "+82", flag: "🇰🇷", country: "South Korea" },
  { code: "+60", flag: "🇲🇾", country: "Malaysia" },
  { code: "+65", flag: "🇸🇬", country: "Singapore" },
  { code: "+66", flag: "🇹🇭", country: "Thailand" },
  { code: "+62", flag: "🇮🇩", country: "Indonesia" },
  { code: "+63", flag: "🇵🇭", country: "Philippines" },
  { code: "+84", flag: "🇻🇳", country: "Vietnam" },
  
  // Middle East Others
  { code: "+972", flag: "🇮🇱", country: "Israel" },
  { code: "+961", flag: "🇱🇧", country: "Lebanon" },
  { code: "+963", flag: "🇸🇾", country: "Syria" },
  { code: "+964", flag: "🇮🇶", country: "Iraq" },
  { code: "+962", flag: "🇯🇴", country: "Jordan" },
  { code: "+967", flag: "🇾🇪", country: "Yemen" },
];

export default function WPServicesLanding() {
  const router = useRouter();
  
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [isQuoteSubmitting, setIsQuoteSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  // Country code states
  const [selectedCountryCode, setSelectedCountryCode] = useState("+92");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  
  // Lead magnet states
  const [email, setEmail] = useState("");
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [isLeadSuccess, setIsLeadSuccess] = useState(false);
  
  // Name validation - only letters and spaces
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
  
  // Phone validation - only numbers
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
  
  // Country search functions
  const handleCountrySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allCountries.filter(
      (c) =>
        c.country.toLowerCase().includes(term) ||
        c.code.includes(term)
    );
    setFilteredCountries(filtered);
  };
  
  const handleSelectCountry = (code: string) => {
    setSelectedCountryCode(code);
    setIsCountryDropdownOpen(false);
    setSearchTerm("");
    setFilteredCountries(allCountries);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && filteredCountries.length > 0) {
      handleSelectCountry(filteredCountries[0].code);
    }
    if (e.key === "Escape") {
      setIsCountryDropdownOpen(false);
    }
  };
  
  // Form submit handler
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
    if (!quoteMessage.trim()) {
      alert("Please describe your project requirements");
      return;
    }
    
    setIsQuoteSubmitting(true);
    try {
      const fullPhoneNumber = selectedCountryCode + quotePhone;
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteName,
          phone: fullPhoneNumber,
          message: quoteMessage,
        }),
      });
      if (res.ok) {
        setQuoteName("");
        setQuotePhone("");
        setQuoteMessage("");
        setIsOpen(false);
        router.push("/web-services/thank-you");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsQuoteSubmitting(false);
    }
  };

  // Handle Lead Magnet Submit
  const handleLeadMagnetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    
    setIsLeadSubmitting(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsLeadSuccess(true);
        setEmail("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      setIsLeadSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden grid-overlay">
      {/* Background Orbs */}
      <div className="orb w-[500px] h-[500px] bg-sky-400 opacity-20 top-[-100px] left-[-100px] pulse-glow"></div>
      <div className="orb w-[400px] h-[400px] bg-blue-500 opacity-20 bottom-[-50px] right-[-50px] pulse-glow"></div>

      {/* Sticky Header */}
      <header className="fixed top-0 w-full z-50 glass-strong py-4 px-5 md:px-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text tracking-tight">
            WP<span className="text-slate-800">Dev</span>
          </div>
          <a
            href="tel:+923001234567"
            className="flex items-center gap-2 btn-primary text-sm py-2 px-4"
          >
            <Phone size={16} />
            <span className="hidden md:inline">+92 300 1234567</span>
            <span className="md:hidden">Call Now</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-10 px-5 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="tag mb-6 mx-auto w-fit">
            🚀 Custom WordPress Development
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-slate-900">
            Fast, Secure & SEO-Ready <br />
            <span className="gradient-text">Websites in Just 7 Days!</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop losing customers to slow, outdated websites. Get a custom WordPress site built to convert your visitors into paying clients.
          </p>

          {/* Bullet Points */}
          <div className="flex flex-col sm:flex-row justify-center gap-x-8 gap-y-3 mb-12 text-slate-700 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-sky-500" size={20} /> Mobile Responsive
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-sky-500" size={20} /> Speed Optimized
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-sky-500" size={20} /> Hack-Proof Security
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-sky-500" size={20} /> Easy to Manage
            </div>
          </div>

          {/* Main CTA Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-12 rounded-xl text-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/40"
          >
            Get a Free Quote
          </button>
        </div>
      </main>

      {/* Trust Section */}
      <section className="section-padding px-5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800">
            Why <span className="gradient-text">Choose Us?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass card-shine p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-6">
                <Zap className="text-sky-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Blazing Fast Speed</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Under 2-second load times. We optimize every image and line of code.
              </p>
            </div>

            <div className="glass card-shine p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-6">
                <Shield className="text-sky-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">100% Secure</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Advanced firewalls, SSL, and malware protection for your peace of mind.
              </p>
            </div>

            <div className="glass card-shine p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-sky-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">SEO Friendly</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Built with Google&apos;s guidelines to help you rank higher in search results.
              </p>
            </div>
          </div>

          {/* Portfolio Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-xl overflow-hidden h-64 flex items-center justify-center bg-sky-50/50 border-dashed border-sky-200 border-2">
              <p className="text-slate-400 font-medium">Recent Work Screenshot 1</p>
            </div>
            <div className="glass rounded-xl overflow-hidden h-64 flex items-center justify-center bg-sky-50/50 border-dashed border-sky-200 border-2">
              <p className="text-slate-400 font-medium">Recent Work Screenshot 2</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-8 px-5 relative z-10">
        <div className="max-w-3xl mx-auto text-center glass-strong p-10 md:p-14 rounded-2xl glow-blue relative overflow-hidden">
          <div className="orb w-40 h-40 bg-sky-400 opacity-20 top-[-40px] right-[-40px]"></div>
          
          <div className="tag mb-6 mx-auto w-fit relative z-10">
            🎁 Free Download
          </div>

          {!isLeadSuccess ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 relative z-10">
                Is Your Website Losing Customers Due to <span className="gradient-text">Slow Speed?</span>
              </h2>
              <p className="text-slate-500 mb-8 text-sm md:text-base max-w-lg mx-auto relative z-10">
                Download our step-by-step <strong>WordPress Speed Optimization Checklist</strong> and learn how to make your site load in under 2 seconds.
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10" onSubmit={handleLeadMagnetSubmit}>
                <input 
                  type="email" 
                  placeholder="Enter your email to get the PDF" 
                  className="input-field flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button 
                  type="submit" 
                  className="btn-primary py-3 px-8 whitespace-nowrap text-sm disabled:opacity-50"
                  disabled={isLeadSubmitting}
                >
                  {isLeadSubmitting ? "Submitting..." : "Get Free Checklist"}
                </button>
              </form>
              
              <p className="text-xs text-slate-400 mt-4 relative z-10">Join 500+ business owners. No spam, unsubscribe anytime.</p>
            </>
          ) : (
            <div className="relative z-10 py-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-600">🎉 Check Your Inbox!</h2>
              <p className="text-slate-600 mb-6">Your email has been received. Download your Free Checklist below:</p>
              <a 
                href="/checklist.pdf" 
                download
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-green-500/30"
              >
                ⬇️ Download Checklist Now
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 relative z-10">
        <div className="section-divider mb-8"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} WPDev. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </footer>

      {/* Popup Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="glass-strong rounded-2xl p-5 max-w-md w-full relative shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-bold mb-1 gradient-text">
              Get Your Free Quote
            </h3>
            <p className="text-slate-500 text-xs mb-4">
              Tell us about your project and we&apos;ll get back within 3-4 hours.
            </p>

            <form className="space-y-3" onSubmit={handleQuoteSubmit}>
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  className="w-full py-2.5 px-3 text-sm rounded-lg border border-gray-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  value={quoteName}
                  onChange={handleNameChange}
                  required
                />
                {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
                <p className="text-gray-400 text-xs mt-1">Only letters allowed (no numbers)</p>
              </div>
              
              {/* Phone Field with Searchable Country Code Dropdown */}
              <div>
                <label className="block text-xs text-slate-500 mb-1 font-medium">Phone / WhatsApp *</label>
                <div className="flex gap-2">
                  {/* Country Code Dropdown with Search */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="flex items-center gap-1 px-2 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm min-w-[85px]"
                    >
                      <span className="text-base">{allCountries.find(c => c.code === selectedCountryCode)?.flag || "🌍"}</span>
                      <span className="font-medium text-xs">{selectedCountryCode}</span>
                      <svg className="w-2.5 h-2.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isCountryDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        {/* Search Input */}
                        <div className="p-2 border-b border-gray-100">
                          <input
                            type="text"
                            placeholder="Search country or code..."
                            className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none"
                            value={searchTerm}
                            onChange={handleCountrySearch}
                            onKeyDown={handleKeyDown}
                            autoFocus
                          />
                        </div>
                        
                        {/* Countries List */}
                        <div className="max-h-48 overflow-y-auto">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => handleSelectCountry(country.code)}
                                className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 text-sm ${
                                  selectedCountryCode === country.code ? "bg-sky-50" : ""
                                }`}
                              >
                                <span className="text-base">{country.flag}</span>
                                <span className="text-xs font-medium">{country.code}</span>
                                <span className="text-xs text-gray-500 truncate">{country.country}</span>
                                {selectedCountryCode === country.code && (
                                  <span className="ml-auto text-sky-500">✓</span>
                                )}
                              </button>
                            ))
                          ) : (
                            <div className="p-3 text-center text-gray-500 text-sm">
                              No country found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    placeholder="300 1234567"
                    className="flex-1 py-2.5 px-3 text-sm rounded-lg border border-gray-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    value={quotePhone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
                {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                <p className="text-gray-400 text-xs mt-1">Example: {selectedCountryCode} 300 1234567</p>
              </div>
              
              {/* Message Field */}
              <div>
                <textarea
                  placeholder="Briefly describe your project requirements... *"
                  className="w-full h-24 resize-none py-2 px-3 text-sm rounded-lg border border-gray-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/30 disabled:opacity-50 text-sm"
                disabled={isQuoteSubmitting}
              >
                {isQuoteSubmitting ? "Submitting..." : "Submit & Get Free Quote"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}