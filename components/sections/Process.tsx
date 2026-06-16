'use client';

import { motion } from 'framer-motion';
import { Search, Settings, Rocket, BarChart3 } from 'lucide-react';

const steps = [
  { number: '01', icon: Search, title: 'Research & Strategy', desc: 'Deep-dive audit of your business, competition, and market. We define clear KPIs.', color: '#0EA5E9' },
  { number: '02', icon: Settings, title: 'Tracking & Analytics', desc: 'Full GA4 and GTM implementation for accurate data-backed decisions.', color: '#3B82F6' },
  { number: '03', icon: Rocket, title: 'Campaign Launch', desc: 'Precision campaign builds with conversion-optimized landing pages.', color: '#6366F1' },
  { number: '04', icon: BarChart3, title: 'Optimize & Scale', desc: 'Continuous A/B testing and weekly performance reviews to maximize ROI.', color: '#0EA5E9' },
];

export default function Process() {
  return (
    <section id="process" className="section-padding bg-gradient-to-b from-cyan-50/30 to-white">
      <div className="max-w-7xl mx-auto  lg:px-8">
        <div className="text-center mb-12">
          <div className="tag mx-auto w-fit mb-4">Our Process</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>How We Scale <span className="gradient-text">Businesses</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4">A proven 4-step framework that has delivered consistent results across 50+ clients.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-all duration-300"><step.icon size={24} style={{ color: step.color }} /></div>
              <div className="text-xs font-bold tracking-wider mb-2" style={{ color: step.color }}>STEP {step.number}</div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}