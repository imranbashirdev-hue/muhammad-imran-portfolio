'use client';

import { useState } from 'react';
import { Target, Share2, Search, Code2, Monitor, ShoppingCart, BarChart2, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

const services = [
  { icon: Target, title: 'Google Ads Management', description: 'Data-driven Google Search, Display, and Shopping campaigns optimized for maximum ROAS and qualified lead generation.', tags: ['Search', 'Display', 'Shopping'], color: '#0284C7', bg: '#F0F9FF', border: '#BAE6FD' },
  { icon: Share2, title: 'Meta Ads Management', description: 'High-converting Facebook and Instagram ad campaigns with precise audience targeting, retargeting funnels, and creative testing.', tags: ['Facebook', 'Instagram', 'Retargeting'], color: '#4F46E5', bg: '#EEF2FF', border: '#C7D2FE' },
  { icon: Search, title: 'SEO Services', description: 'Technical SEO audits, on-page optimization, and authority link building strategies that drive sustainable organic growth.', tags: ['Technical SEO', 'On-Page', 'Link Building'], color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
  { icon: Code2, title: 'WordPress Development', description: 'Custom WordPress websites built for speed, security, and conversions — from corporate sites to complex multi-language portals.', tags: ['Custom Themes', 'Plugins', 'Speed'], color: '#0891B2', bg: '#ECFEFF', border: '#A5F3FC' },
  { icon: Monitor, title: 'Website Design', description: 'Premium UI/UX design focused on conversion, brand identity, and user experience that builds trust and drives action.', tags: ['UI/UX', 'Wireframing', 'Prototyping'], color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  { icon: ShoppingCart, title: 'E-commerce Development', description: 'Revenue-optimized online stores with seamless checkout flows, product pages built to convert, and payment integrations.', tags: ['WooCommerce', 'Shopify', 'Payments'], color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
  { icon: BarChart2, title: 'GA4 & GTM Setup', description: 'Full analytics infrastructure — from conversion tracking and event tagging to custom dashboards and attribution modeling.', tags: ['GA4', 'GTM', 'Looker Studio'], color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  { icon: TrendingUp, title: 'Conversion Rate Optimization', description: 'Data-backed A/B testing, landing page optimization, and funnel analysis to turn more visitors into paying customers.', tags: ['A/B Testing', 'Heatmaps', 'Funnels'], color: '#0284C7', bg: '#F0F9FF', border: '#BAE6FD' },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="services" className="section-padding" style={{ background: 'linear-gradient(180deg, #F0F9FF 0%, #EFF6FF 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag mb-4"><Sparkles size={12} />Services</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Performance-Driven <span className="gradient-text">Digital Growth</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Everything required to generate traffic, leads, and revenue — under one strategy.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={service.title} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                className="rounded-2xl p-6 border cursor-default group transition-all duration-300 hover:-translate-y-2 hover:shadow-lg card-shine"
                style={{ background: hovered === i ? service.bg : '#FFFFFF', borderColor: hovered === i ? service.border : '#E2E8F0' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}>
                  <Icon size={20} style={{ color: service.color }} />
                </div>
                <h3 className="text-slate-900 font-bold text-sm mb-2">{service.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${service.color}12`, color: service.color, border: `1px solid ${service.color}20` }}>{tag}</span>
                  ))}
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2" style={{ color: service.color }}>
                  Learn More <ArrowRight size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
