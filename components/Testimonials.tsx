'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Al Mansouri',
    role: 'Marketing Director',
    company: 'Prestige Properties LLC',
    location: 'Dubai, UAE',
    text: "Muhammad transformed our digital marketing completely. Within 3 months, our qualified leads tripled and our cost per lead dropped by 76%. The level of strategic thinking and execution is genuinely world-class.",
    rating: 5,
    avatar: 'AM',
    color: '#7C3AED',
  },
  {
    name: 'Dr. Sara Al Zarouni',
    role: 'Owner & CEO',
    company: 'Elite Dental Center',
    location: 'Abu Dhabi, UAE',
    text: "We went from 45 appointments per month to over 170. Muhammad's team didn't just run ads — they rebuilt our entire patient acquisition system. The ROI has been extraordinary.",
    rating: 5,
    avatar: 'SZ',
    color: '#2563EB',
  },
  {
    name: 'Khalid Al Rashid',
    role: 'E-commerce Director',
    company: 'Luxe Fashion KSA',
    location: 'Riyadh, KSA',
    text: "Our Meta Ads ROAS was 1.4x before Muhammad touched them. Now we're running at 5.2x consistently. The data-driven approach and transparent reporting built trust from day one.",
    rating: 5,
    avatar: 'KR',
    color: '#06B6D4',
  },
  {
    name: 'Nour Hassan',
    role: 'Head of Digital',
    company: 'Gulf Automotive Group',
    location: 'Sharjah, UAE',
    text: "The SEO strategy Muhammad built for us took us from page 4 to page 1 on all major keywords within 6 months. Organic traffic grew by 340%. He genuinely understands what moves the needle.",
    rating: 5,
    avatar: 'NH',
    color: '#10B981',
  },
  {
    name: 'Fatima Al Balushi',
    role: 'Founder',
    company: 'Wellness Hub Oman',
    location: 'Muscat, Oman',
    text: "From the GA4 setup to the complete website rebuild, every deliverable was exceptional. Muhammad communicates clearly, meets deadlines, and the results speak for themselves. Highly recommended.",
    rating: 5,
    avatar: 'FB',
    color: '#F59E0B',
  },
  {
    name: 'Omar Al Sayed',
    role: 'CEO',
    company: 'TechServe Solutions',
    location: 'Qatar',
    text: "We'd worked with 3 other agencies before Muhammad. None came close to his level of execution. The Google Ads campaigns he built generate 8-12 high-ticket B2B leads every week, consistently.",
    rating: 5,
    avatar: 'OS',
    color: '#EC4899',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div
        className="orb w-[500px] h-[500px] opacity-8 pulse-glow"
        style={{
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          top: '10%',
          right: '-5%',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag mb-4">
            <Star size={12} />
            Client Testimonials
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            What Clients{' '}
            <span className="gradient-text">Say</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Real feedback from business owners and marketing directors across the GCC.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 border border-white/8 hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-1 card-shine group relative"
            >
              {/* Quote icon */}
              <div
                className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ color: t.color }}
              >
                <Quote size={36} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6 relative">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}60, ${t.color}30)`,
                    border: `1px solid ${t.color}40`,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">
                    {t.role}, {t.company}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: `${t.color}90` }}>
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review aggregate */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <div className="text-gray-400 text-sm">
            <span className="text-white font-bold text-2xl mr-2">5.0</span>
            average rating across 50+ client reviews
          </div>
        </div>
      </div>
    </section>
  );
}
