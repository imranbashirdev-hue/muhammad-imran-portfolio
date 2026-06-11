'use client';

import { ArrowRight, Building2, Cross, ShoppingBag, TrendingUp, Users, DollarSign } from 'lucide-react';

const cases = [
  { icon: Building2, category: 'Real Estate', company: 'Premium Real Estate Developer', location: 'Dubai, UAE', color: '#0284C7', bg: '#F0F9FF', border: '#BAE6FD', highlight: '+394% leads', challenge: 'Low-quality leads at high cost per acquisition from generic campaigns',
    results: [{ label: 'Monthly Leads', before: '85', after: '420', icon: Users }, { label: 'Google Ads ROAS', before: '2.3x', after: '6.8x', icon: TrendingUp }, { label: 'Cost Per Lead', before: 'AED 890', after: 'AED 210', icon: DollarSign }],
    tags: ['Google Ads', 'Meta Ads', 'GA4'] },
  { icon: Cross, category: 'Healthcare', company: 'Premium Dental Clinic', location: 'Abu Dhabi, UAE', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', highlight: '+278% appointments', challenge: 'Zero digital presence, relying entirely on walk-ins and word-of-mouth',
    results: [{ label: 'Monthly Appointments', before: '45', after: '170', icon: Users }, { label: 'Booking Rate', before: '12%', after: '38%', icon: TrendingUp }, { label: 'Monthly Revenue', before: 'AED 42K', after: 'AED 158K', icon: DollarSign }],
    tags: ['Google Ads', 'SEO', 'Website'] },
  { icon: ShoppingBag, category: 'E-Commerce', company: 'Fashion & Lifestyle Brand', location: 'Riyadh, KSA', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', highlight: '+310% revenue', challenge: 'High cart abandonment rate and poor ROAS from unoptimized ad funnels',
    results: [{ label: 'Revenue Growth', before: 'Base', after: '+310%', icon: DollarSign }, { label: 'Cart Recovery', before: '4%', after: '22%', icon: TrendingUp }, { label: 'Customer Acquisition', before: 'AED 120', after: 'AED 31', icon: Users }],
    tags: ['Meta Ads', 'CRO', 'GTM'] },
];

export default function CaseStudies() {
  return (
    <section id="work" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag mb-4"><TrendingUp size={12} />Case Studies</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Real Results. <span className="gradient-text">Real Businesses.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Numbers that tell a story — from struggling campaigns to industry-leading performance.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="rounded-2xl border overflow-hidden group hover:-translate-y-2 transition-all duration-300 card-shine hover:shadow-lg" style={{ borderColor: c.border, background: '#FFFFFF' }}>
                <div className="p-6 border-b" style={{ borderColor: c.border, background: c.bg }}>
                  <div className="absolute" />
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}>
                      <Icon size={22} style={{ color: c.color }} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}25` }}>{c.highlight}</span>
                  </div>
                  <div className="text-xs font-medium mb-1" style={{ color: c.color }}>{c.category} · {c.location}</div>
                  <h3 className="text-slate-900 font-bold text-lg mb-2">{c.company}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{c.challenge}</p>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-4 font-medium">Key Results</p>
                  <div className="space-y-3">
                    {c.results.map((result) => {
                      const RIcon = result.icon;
                      return (
                        <div key={result.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2"><RIcon size={13} className="text-slate-400" /><span className="text-slate-500 text-sm">{result.label}</span></div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-300 text-sm line-through">{result.before}</span>
                            <ArrowRight size={11} className="text-slate-300" />
                            <span className="text-sm font-bold" style={{ color: c.color }}>{result.after}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">
                    {c.tags.map((tag) => (<span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${c.color}10`, color: c.color, border: `1px solid ${c.color}20` }}>{tag}</span>))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 font-semibold hover:bg-sky-100 hover:border-sky-300 transition-all duration-300 shadow-sm">
            Get Similar Results for Your Business <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
