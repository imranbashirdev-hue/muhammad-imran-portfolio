'use client';

import { Search, Settings, Rocket, BarChart3 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Research & Strategy',
    description:
      'Deep-dive audit of your business, competition, and market. We define clear KPIs and build a custom roadmap aligned with your revenue goals.',
    deliverables: ['Competitor analysis', 'Audience research', 'Channel strategy', 'KPI framework'],
    color: '#7C3AED',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Tracking & Analytics Setup',
    description:
      'Full GA4 and GTM implementation, conversion tracking, and custom dashboards so every decision is backed by accurate data.',
    deliverables: ['GA4 configuration', 'GTM tag setup', 'Conversion events', 'Custom dashboards'],
    color: '#2563EB',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Campaign Launch',
    description:
      'Precision campaign builds across Google, Meta, and SEO channels — with conversion-optimized landing pages and compelling creative.',
    deliverables: ['Ad creative', 'Landing pages', 'Audience targeting', 'Budget allocation'],
    color: '#06B6D4',
  },
  {
    number: '04',
    icon: BarChart3,
    title: 'Optimization & Scaling',
    description:
      'Continuous A/B testing, bid optimization, and weekly performance reviews to maximize ROI and scale what works.',
    deliverables: ['Weekly reporting', 'A/B testing', 'Bid optimization', 'Scale roadmap'],
    color: '#10B981',
  },
];

export default function Process() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="orb w-[400px] h-[400px] opacity-8"
        style={{
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag mb-4">
            <Rocket size={12} />
            Our Process
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            How We Scale{' '}
            <span className="gradient-text">Businesses</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A proven 4-step framework that has delivered consistent results across 50+ clients.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative z-10 group">
                {/* Number + Icon */}
                <div className="flex flex-col items-center mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                      border: `1px solid ${step.color}40`,
                      boxShadow: `0 0 20px ${step.color}20`,
                    }}
                  >
                    <Icon size={22} style={{ color: step.color }} />
                  </div>
                  <span
                    className="text-xs font-bold tracking-widest"
                    style={{ color: `${step.color}80` }}
                  >
                    STEP {step.number}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="glass rounded-2xl p-5 border border-white/8 transition-all duration-300 group-hover:-translate-y-1 card-shine"
                  style={{ borderColor: `${step.color}20` }}
                >
                  <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.description}</p>

                  <ul className="space-y-1.5">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-gray-400">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: step.color }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
