'use client';

import { ArrowRight, Zap, BarChart3, CheckCircle } from 'lucide-react';

const promises = [
  'Free 30-minute strategy consultation',
  'Custom growth plan for your business',
  'No obligations, no hard selling',
  'Response within 24 hours guaranteed',
];

export default function CTA() {
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, #EFF6FF 0%, #F0F9FF 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-sky-100/80" style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 50%, #4F46E5 100%)' }}>
          {/* Subtle white grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />

          <div className="relative z-10 p-10 lg:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 border border-white/30 mb-8">
              <Zap size={28} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Ready To Scale Your Business?
            </h2>
            <p className="text-sky-100 text-lg max-w-2xl mx-auto mb-10">
              Let&apos;s build a predictable lead generation system that drives consistent growth — month after month.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
              {promises.map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm text-white bg-white/10 rounded-xl px-4 py-3 border border-white/20 text-left">
                  <CheckCircle size={14} className="text-sky-200 flex-shrink-0" />{p}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={scrollToContact} className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-sky-600 font-bold text-base transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto justify-center">
                <Zap size={18} className="text-sky-500" />Book Strategy Call<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={scrollToContact} className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-white/15 border border-white/30 text-white font-semibold text-base transition-all duration-300 hover:bg-white/25 w-full sm:w-auto justify-center">
                <BarChart3 size={16} />Get Free Audit
              </button>
            </div>
            <p className="text-sky-200 text-sm mt-6">Typically responds within <span className="text-white font-medium">24 hours</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
