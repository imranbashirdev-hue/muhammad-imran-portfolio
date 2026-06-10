'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Mail, Send, CheckCircle, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const waMessage = encodeURIComponent(
    "Hi Muhammad, I'd like to discuss a strategy for my business."
  );

  return (
    <section id="contact" className="section-padding relative">
      <div
        className="orb w-[400px] h-[400px] opacity-10 pulse-glow"
        style={{
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          bottom: '0',
          left: '-5%',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag mb-4">
            <MessageCircle size={12} />
            Contact
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Let&apos;s{' '}
            <span className="gradient-text">Talk</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tell me about your business and goals. I&apos;ll come back with a clear plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Quick contact */}
            <div className="glass rounded-2xl p-6 border border-white/8">
              <p className="text-white font-semibold mb-4">Quick Contact</p>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/971501234567?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <MessageCircle size={18} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">WhatsApp</p>
                    <p className="text-gray-500 text-xs">Chat instantly</p>
                  </div>
                </a>

                <a
                  href="tel:+971501234567"
                  className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Phone size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Call Now</p>
                    <p className="text-gray-500 text-xs">+971 50 123 4567</p>
                  </div>
                </a>

                <a
                  href="mailto:hello@muhammadimran.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/15 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Mail size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Email</p>
                    <p className="text-gray-500 text-xs">hello@muhammadimran.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Info cards */}
            <div className="glass rounded-2xl p-5 border border-white/8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={15} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Response Time</p>
                  <p className="text-gray-500 text-xs mt-0.5">Typically within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={15} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Serving</p>
                  <p className="text-gray-500 text-xs mt-0.5">UAE, Saudi Arabia, Qatar & International</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-6 lg:p-8 border border-white/8">
              {!submitted ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-2 font-medium">
                        Full Name *
                      </label>
                      <input
                        className="input-field"
                        type="text"
                        name="name"
                        placeholder="Ahmed Al Mansouri"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-2 font-medium">
                        Email Address *
                      </label>
                      <input
                        className="input-field"
                        type="email"
                        name="email"
                        placeholder="ahmed@company.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-2 font-medium">
                        Phone / WhatsApp
                      </label>
                      <input
                        className="input-field"
                        type="tel"
                        name="phone"
                        placeholder="+971 50 000 0000"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-2 font-medium">
                        Business Name
                      </label>
                      <input
                        className="input-field"
                        type="text"
                        name="business"
                        placeholder="Your Company LLC"
                        value={form.business}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-2 font-medium">
                      Tell Me About Your Goals *
                    </label>
                    <textarea
                      className="input-field resize-none"
                      name="message"
                      rows={5}
                      placeholder="Describe your business, current challenges, and what you want to achieve..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-0.5"
                  >
                    <Send size={16} />
                    Send Message
                  </button>

                  <p className="text-center text-xs text-gray-600">
                    Your information is kept private and never shared.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm max-w-xs">
                    Thanks for reaching out. I&apos;ll review your message and get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
