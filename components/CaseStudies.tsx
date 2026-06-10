'use client';

import { ArrowRight, Building2, Cross, ShoppingBag, TrendingUp, Users, DollarSign } from 'lucide-react';

const cases = [
  {
    icon: Building2,
    category: 'Real Estate',
    company: 'Premium Real Estate Developer',
    location: 'Dubai, UAE',
    color: '#7C3AED',
    challenge: 'Low-quality leads at high cost per acquisition from generic campaigns',
    results: [
      { label: 'Monthly Leads', before: '85', after: '420', icon: Users },
      { label: 'Google Ads ROAS', before: '2.3x', after: '6.8x', icon: TrendingUp },
      { label: 'Cost Per Lead', before: 'AED 890', after: 'AED 210', icon: DollarSign },
    ],
    tags: ['Google Ads', 'Meta Ads', 'GA4 Tracking'],
    highlight: '+394% leads',
  },
  {
    icon: Cross,
    category: 'Healthcare',
    company: 'Premium Dental Clinic',
    location: 'Abu Dhabi, UAE',
    color: '#2563EB',
    challenge: 'Zero digital presence, relying entirely on walk-ins and word-of-mouth',
    results: [
      { label: 'Monthly Appointments', before: '45', after: '170', icon: Users },
      { label: 'Booking Rate', before: '12%', after: '38%', icon: TrendingUp },
      { label: 'Monthly Revenue', before: 'AED 42K', after: 'AED 158K', icon: DollarSign },
    ],
    tags: ['Google Ads', 'SEO', 'Website Redesign'],
    highlight: '+278% appointments',
  },
  {
    icon: ShoppingBag,
    category: 'E-Commerce',
    company: 'Fashion & Lifestyle Brand',
    location: 'Riyadh, KSA',
    color: '#06B6D4',
    challenge: 'High cart abandonment rate and poor ROAS from unoptimized ad funnels',
    results: [
      { label: 'Revenue Growth', before: 'Base', after: '+310%', icon: DollarSign },
      { label: 'Cart Recovery', before: '4%', after: '22%', icon: TrendingUp },
      { label: 'Customer Acquisition', before: 'AED 120', after: 'AED 31', icon: Users },
    ],
    tags: ['Meta Ads', 'CRO', 'GTM Setup'],
    highlight: '+310% revenue',
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="section-padding relative">
      <div
        className="orb w-[500px] h-[500px] opacity-8 pulse-glow"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
          bottom: '10%',
          right: '-5%',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag mb-4">
            <TrendingUp size={12} />
            Case Studies
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Real Results.{' '}
            <span className="gradient-text">Real Businesses.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Numbers that tell a story — from struggling campaigns to industry-leading performance.
          </p>
        </div>

        {/* Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="glass rounded-2xl border border-white/8 overflow-hidden group hover:-translate-y-2 transition-all duration-300 card-shine"
                style={{ borderColor: `${c.color}20` }}
              >
                {/* Card header */}
                <div
                  className="p-6 border-b border-white/6 relative"
                  style={{ background: `linear-gradient(135deg, ${c.color}12 0%, transparent 60%)` }}
                >
                  {/* Highlight badge */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40` }}
                  >
                    {c.highlight}
                  </div>

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${c.color}20`, border: `1px solid ${c.color}30` }}
                  >
                    <Icon size={22} style={{ color: c.color }} />
                  </div>

                  <div className="text-xs font-medium mb-1" style={{ color: c.color }}>
                    {c.category} • {c.location}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{c.company}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.challenge}</p>
                </div>

                {/* Metrics */}
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-gray-600 mb-4 font-medium">
                    Key Results
                  </p>
                  <div className="space-y-4">
                    {c.results.map((result) => {
                      const RIcon = result.icon;
                      return (
                        <div key={result.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <RIcon size={14} className="text-gray-500" />
                            <span className="text-gray-400 text-sm">{result.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-sm line-through">
                              {result.before}
                            </span>
                            <ArrowRight size={12} className="text-gray-600" />
                            <span
                              className="text-sm font-bold"
                              style={{ color: c.color }}
                            >
                              {result.after}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/6">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: `${c.color}10`,
                          color: `${c.color}cc`,
                          border: `1px solid ${c.color}20`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-purple-500/20 text-white font-semibold hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300"
          >
            Get Similar Results for Your Business
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
