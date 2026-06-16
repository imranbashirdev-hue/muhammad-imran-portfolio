'use client';

import { motion } from 'framer-motion';
import { Target, Share2, Search, Code2, Monitor, LineChart, ArrowRight } from 'lucide-react';

const services = [
  { icon: Target, title: 'Google Ads Management', desc: 'Data-driven Search, Display, and Shopping campaigns optimized for maximum ROAS.', tags: ['Search', 'Display', 'Shopping'], color: '#0EA5E9' },
  { icon: Share2, title: 'Meta Ads Management', desc: 'High-converting Facebook and Instagram ad campaigns with precise audience targeting.', tags: ['Facebook', 'Instagram', 'Retargeting'], color: '#3B82F6' },
  { icon: Search, title: 'SEO Services', desc: 'Technical SEO, on-page optimization, and authority link building strategies.', tags: ['Technical SEO', 'On-Page', 'Link Building'], color: '#6366F1' },
  { icon: Code2, title: 'WordPress Development', desc: 'Custom WordPress websites built for speed, security, and conversions.', tags: ['Custom Themes', 'Plugins', 'Speed'], color: '#0EA5E9' },
  { icon: Monitor, title: 'Website Design', desc: 'Premium UI/UX design focused on conversion, brand identity, and user experience.', tags: ['UI/UX', 'Wireframing', 'Prototyping'], color: '#3B82F6' },
  { icon: LineChart, title: 'GA4 & GTM Setup', desc: 'Full analytics infrastructure — from conversion tracking to custom dashboards.', tags: ['GA4', 'GTM', 'Looker Studio'], color: '#6366F1' },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-gradient-to-b from-white to-cyan-50/30">
      <div className="max-w-7xl mx-auto  lg:px-8">
        <div className="text-center mb-12">
          <div className="tag mx-auto w-fit mb-4">What I Do</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Performance-Driven <span className="gradient-text">Services</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4">Everything required to generate traffic, leads, and revenue — under one strategy.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group bg-white rounded-2xl p-6 border border-cyan-100 hover:border-cyan-300 hover:-translate-y-2 transition-all duration-300 card-shine shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:scale-110 transition" style={{ backgroundColor: `${service.color}15` }}>
                <service.icon size={22} style={{ color: service.color }} />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">{service.tags.map(tag => (<span key={tag} className="text-xs px-2 py-1 rounded-full bg-cyan-50 text-cyan-600">{tag}</span>))}</div>
              <button className="flex items-center gap-1 text-sm font-medium text-cyan-600 group-hover:gap-2 transition">Learn more <ArrowRight size={14} /></button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}