'use client';

import { ArrowRight, Zap, Shield, Target, CheckCircle } from 'lucide-react';

const benefits = ['No long contracts', 'Clear strategy', 'Real results'];

export default function CTA() {
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-cyan-600 to-blue-700">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-6"><Zap size={28} className="text-white" /></div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Ready to Scale Your Business?</h2>
        <p className="text-cyan-100 text-lg mb-8">Let's build a predictable lead generation system that drives consistent growth — month after month.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">{benefits.map((b) => (<div key={b} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm"><CheckCircle size={14} />{b}</div>))}</div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={scrollToContact} className="bg-white text-cyan-600 px-8 py-3 rounded-xl font-bold hover:shadow-xl transition flex items-center gap-2 justify-center group">Book Your Free Strategy Call <ArrowRight size={18} className="group-hover:translate-x-1 transition" /></button>
          <button onClick={scrollToContact} className="border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition flex items-center gap-2 justify-center"><Target size={18} /> Get Free Audit</button>
        </div>
        <p className="text-cyan-200 text-sm mt-6">Free 15-min consultation • No obligation • Strategy focused</p>
      </div>
    </section>
  );
}