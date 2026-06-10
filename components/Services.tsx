'use client';

import { useState } from 'react';
import {
  Target,
  Share2,
  Search,
  Code2,
  Monitor,
  ShoppingCart,
  BarChart2,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const services = [
  {
    icon: Target,
    title: 'Google Ads Management',
    description:
      'Data-driven Google Search, Display, and Shopping campaigns optimized for maximum ROAS and qualified lead generation.',
    tags: ['Search', 'Display', 'Shopping', 'YouTube'],
    color: '#7C3AED',
  },
  {
    icon: Share2,
    title: 'Meta Ads Management',
    description:
      'High-converting Facebook and Instagram ad campaigns with precise audience targeting, retargeting funnels, and creative testing.',
    tags: ['Facebook', 'Instagram', 'Retargeting'],
    color: '#2563EB',
  },
  {
    icon: Search,
    title: 'SEO Services',
    description:
      'Technical SEO audits, on-page optimization, and authority link building strategies that drive sustainable organic growth.',
    tags: ['Technical SEO', 'On-Page', 'Link Building'],
    color: '#06B6D4',
  },
  {
    icon: Code2,
    title: 'WordPress Development',
    description:
      'Custom WordPress websites built for speed, security, and conversions — from corporate sites to complex multi-language portals.',
    tags: ['Custom Themes', 'Plugins', 'Speed Optimization'],
    color: '#10B981',
  },
  {
    icon: Monitor,
    title: 'Website Design',
    description:
      'Premium UI/UX design focused on conversion, brand identity, and user experience that builds trust and drives action.',
    tags: ['UI/UX', 'Wireframing', 'Prototyping'],
    color: '#F59E0B',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Development',
    description:
      'Revenue-optimized online stores with seamless checkout flows, product pages built to convert, and payment integrations.',
    tags: ['WooCommerce', 'Shopify', 'Payment Gateways'],
    color: '#EF4444',
  },
  {
    icon: BarChart2,
    title: 'GA4 & GTM Setup',
    description:
      'Full analytics infrastructure setup — from conversion tracking and event tagging to custom dashboards and attribution modeling.',
    tags: ['GA4', 'GTM', 'Looker Studio'],
    color: '#8B5CF6',
  },
  {
    icon: TrendingUp,
    title: 'Conversion Rate Optimization',
    description:
      'Data-backed A/B testing, landing page optimization, and funnel analysis to turn more visitors into paying customers.',
    tags: ['A/B Testing', 'Heatmaps', 'Funnels'],
    color: '#EC4899',
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="section-padding relative">
      {/* Background element */}
      <div
        className="orb w-[400px] h-[400px] opacity-10 pulse-glow"
        style={{
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          top: '20%',
          left: '-5%',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag mb-4">
            <Sparkles size={12} />
            Services
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Performance-Driven{' '}
            <span className="gradient-text">Digital Growth</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything required to generate traffic, leads, and revenue — under one strategy.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hovered === i;
            return (
              <div
                key={service.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="glass rounded-2xl p-6 border border-white/8 cursor-default group transition-all duration-300 hover:-translate-y-2 hover:border-opacity-50 card-shine relative overflow-hidden"
                style={{ borderColor: isHovered ? `${service.color}40` : undefined }}
              >
                {/* Hover background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 30% 0%, ${service.color}10 0%, transparent 60%)`,
                  }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${service.color}15`,
                    border: `1px solid ${service.color}30`,
                  }}
                >
                  <Icon size={20} style={{ color: service.color }} />
                </div>

                <h3 className="text-white font-bold text-sm mb-2 relative">{service.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 relative">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4 relative">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${service.color}10`,
                        color: `${service.color}cc`,
                        border: `1px solid ${service.color}20`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2 relative"
                  style={{ color: service.color }}
                >
                  Learn More
                  <ArrowRight size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
