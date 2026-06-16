'use client';

import { useState } from 'react';
import { Send, CheckCircle, MessageCircle, Phone, Mail, Clock, MapPin } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase.from('leads').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        page_source: 'portfolio_contact',
        created_at: new Date().toISOString(),
      }]);

      if (submitError) {
        setError('Something went wrong. Please try again.');
      } else {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-white to-cyan-50/30">
      <div className="max-w-7xl mx-auto  lg:px-8">
        <div className="text-center mb-12">
          <div className="tag mx-auto w-fit mb-4">Get in Touch</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Let's <span className="gradient-text">Talk</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4">Tell me about your business and goals. I'll come back with a clear plan.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-cyan-100 shadow-sm">
              <p className="font-semibold text-slate-800 mb-4">Quick Contact</p>
              <div className="space-y-3">
                <a href="https://wa.me/971501234567" target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition group">
                  <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center"><MessageCircle size={18} className="text-green-600" /></div>
                  <div><p className="text-slate-800 text-sm font-medium">WhatsApp</p><p className="text-slate-400 text-xs">Chat instantly</p></div>
                </a>
                <a href="tel:+971501234567" className="flex items-center gap-3 p-3 rounded-xl bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 transition">
                  <div className="w-9 h-9 rounded-lg bg-cyan-100 flex items-center justify-center"><Phone size={18} className="text-cyan-600" /></div>
                  <div><p className="text-slate-800 text-sm font-medium">Call Now</p><p className="text-slate-400 text-xs">+971 50 123 4567</p></div>
                </a>
                <a href="mailto:hello@muhammadimran.com" className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center"><Mail size={18} className="text-blue-600" /></div>
                  <div><p className="text-slate-800 text-sm font-medium">Email</p><p className="text-slate-400 text-xs">hello@muhammadimran.com</p></div>
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-cyan-100 space-y-4">
              <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center"><Clock size={15} className="text-cyan-500" /></div><div><p className="text-slate-800 text-sm font-medium">Response Time</p><p className="text-slate-400 text-xs">Typically within 24 hours</p></div></div>
              <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center"><MapPin size={15} className="text-blue-500" /></div><div><p className="text-slate-800 text-sm font-medium">Serving</p><p className="text-slate-400 text-xs">UAE, Saudi Arabia, Qatar & International</p></div></div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-cyan-100 shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center">❌ {error}</div>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><input type="text" name="name" placeholder="Full Name *" className="input-field" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                    <div><input type="email" name="email" placeholder="Email Address *" className="input-field" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
                  </div>
                  <div><input type="tel" name="phone" placeholder="Phone / WhatsApp *" className="input-field" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required /></div>
                  <div><textarea name="message" placeholder="Tell me about your project..." rows={4} className="input-field resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} /></div>
                  <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">{loading ? 'Sending...' : <><Send size={16} /> Send Message</>}</button>
                </form>
              ) : (
                <div className="flex flex-col items-center py-8 text-center"><div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4"><CheckCircle size={28} className="text-green-500" /></div><h3 className="text-xl font-bold mb-2">Message Sent! 🎉</h3><p className="text-slate-500">Thanks for reaching out. I'll get back to you within 24 hours.</p></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}