'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Mail, Send, CheckCircle, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.MouseEvent) => { e.preventDefault(); setSubmitted(true); };
  const waMessage = encodeURIComponent("Hi Muhammad, I'd like to discuss a strategy for my business.");

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag mb-4"><MessageCircle size={12} />Contact</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Let&apos;s <span className="gradient-text">Talk</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Tell me about your business and goals. I&apos;ll come back with a clear plan.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl p-6 border border-sky-100 bg-sky-50">
              <p className="text-slate-900 font-semibold mb-4">Quick Contact</p>
              <div className="space-y-3">
                <a href={`https://wa.me/971501234567?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center"><MessageCircle size={18} className="text-emerald-600" /></div>
                  <div><p className="text-slate-800 text-sm font-medium">WhatsApp</p><p className="text-slate-400 text-xs">Chat instantly</p></div>
                </a>
                <a href="tel:+971501234567" className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center"><Phone size={18} className="text-sky-600" /></div>
                  <div><p className="text-slate-800 text-sm font-medium">Call Now</p><p className="text-slate-400 text-xs">+971 50 123 4567</p></div>
                </a>
                <a href="mailto:hello@muhammadimran.com" className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center"><Mail size={18} className="text-blue-600" /></div>
                  <div><p className="text-slate-800 text-sm font-medium">Email</p><p className="text-slate-400 text-xs">hello@muhammadimran.com</p></div>
                </a>
              </div>
            </div>
            <div className="rounded-2xl p-5 border border-sky-100 bg-white space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0"><Clock size={15} className="text-sky-500" /></div>
                <div><p className="text-slate-800 text-sm font-medium">Response Time</p><p className="text-slate-400 text-xs mt-0.5">Typically within 24 hours</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0"><MapPin size={15} className="text-blue-500" /></div>
                <div><p className="text-slate-800 text-sm font-medium">Serving</p><p className="text-slate-400 text-xs mt-0.5">UAE, Saudi Arabia, Qatar & International</p></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-6 lg:p-8 border border-sky-100 bg-white shadow-sm">
              {!submitted ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs text-slate-500 mb-2 font-medium">Full Name *</label><input className="input-field" type="text" name="name" placeholder="Ahmed Al Mansouri" value={form.name} onChange={handleChange} /></div>
                    <div><label className="block text-xs text-slate-500 mb-2 font-medium">Email Address *</label><input className="input-field" type="email" name="email" placeholder="ahmed@company.com" value={form.email} onChange={handleChange} /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs text-slate-500 mb-2 font-medium">Phone / WhatsApp</label><input className="input-field" type="tel" name="phone" placeholder="+971 50 000 0000" value={form.phone} onChange={handleChange} /></div>
                    <button onClick={handleSubmit} className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-sky-300/40 hover:-translate-y-0.5">
                    <Send size={16} />Send Message
                  </button>
                  </div>
                  
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6"><CheckCircle size={32} className="text-emerald-500" /></div>
                  <h3 className="text-slate-900 font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-sm max-w-xs">Thanks for reaching out. I&apos;ll review your message and get back to you within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
