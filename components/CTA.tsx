'use client';

import { ArrowRight, Zap, BarChart3, CheckCircle } from 'lucide-react';

const promises = [
  'Free 30-minute strategy consultation',
  'Custom growth plan for your business',
  'No obligations, no hard selling',
  'Response within 24 hours guaranteed',
];

export default function CTA() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#0D1120] to-blue-900/30" />
          <div className="absolute inset-0 border border-purple-500/20 rounded-3xl" />

          {/* Glow orbs inside */}
          <div
            className="orb w-[400px] h-[400px] opacity-20 pulse-glow"
            style={{
              background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
              top: '-50%',
              right: '-10%',
            }}
          />
          <div
            className="orb w-[300px] h-[300px] opacity-15"
            style={{
              background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
              bottom: '-30%',
              left: '5%',
            }}
          />

          <div className="relative z-10 p-10 lg:p-16 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 border border-purple-500/30 mb-8">
              <Zap size={28} className="text-purple-300" />
            </div>

            {/* Headline */}
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Ready To Scale{' '}
              <span className="gradient-text">Your Business?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Let&apos;s build a predictable lead generation system that drives consistent growth —
              month after month, year after year.
            </p>

            {/* Promises */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
              {promises.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-2 text-sm text-gray-300 bg-white/4 rounded-xl px-4 py-3 border border-white/6 text-left"
                >
                  <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                  {p}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                <Zap size={18} />
                Book Strategy Call
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToContact}
                className="group flex items-center gap-3 px-8 py-4 rounded-xl glass border border-white/10 text-white font-semibold text-base transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/5 w-full sm:w-auto justify-center"
              >
                <BarChart3 size={16} className="text-purple-400" />
                Get Free Audit
              </button>
            </div>

            <p className="text-gray-600 text-sm mt-6">
              Typically responds within <span className="text-gray-400">24 hours</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
