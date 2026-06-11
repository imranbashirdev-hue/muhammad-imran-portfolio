'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Ahmed Al Mansouri', role: 'Marketing Director', company: 'Prestige Properties LLC', location: 'Dubai, UAE', text: "Muhammad transformed our digital marketing completely. Within 3 months, our qualified leads tripled and our cost per lead dropped by 76%. The level of strategic thinking and execution is genuinely world-class.", rating: 5, avatar: 'AM', color: '#0284C7', bg: '#F0F9FF', border: '#BAE6FD' },
  { name: 'Dr. Sara Al Zarouni', role: 'Owner & CEO', company: 'Elite Dental Center', location: 'Abu Dhabi, UAE', text: "We went from 45 appointments per month to over 170. Muhammad's team didn't just run ads — they rebuilt our entire patient acquisition system. The ROI has been extraordinary.", rating: 5, avatar: 'SZ', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
  { name: 'Khalid Al Rashid', role: 'E-commerce Director', company: 'Luxe Fashion KSA', location: 'Riyadh, KSA', text: "Our Meta Ads ROAS was 1.4x before Muhammad touched them. Now we're running at 5.2x consistently. The data-driven approach and transparent reporting built trust from day one.", rating: 5, avatar: 'KR', color: '#4F46E5', bg: '#EEF2FF', border: '#C7D2FE' },
  { name: 'Nour Hassan', role: 'Head of Digital', company: 'Gulf Automotive Group', location: 'Sharjah, UAE', text: "The SEO strategy Muhammad built for us took us from page 4 to page 1 on all major keywords within 6 months. Organic traffic grew by 340%. He genuinely understands what moves the needle.", rating: 5, avatar: 'NH', color: '#0891B2', bg: '#ECFEFF', border: '#A5F3FC' },
  { name: 'Fatima Al Balushi', role: 'Founder', company: 'Wellness Hub Oman', location: 'Muscat, Oman', text: "From the GA4 setup to the complete website rebuild, every deliverable was exceptional. Muhammad communicates clearly, meets deadlines, and the results speak for themselves.", rating: 5, avatar: 'FB', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  { name: 'Omar Al Sayed', role: 'CEO', company: 'TechServe Solutions', location: 'Qatar', text: "We'd worked with 3 other agencies before Muhammad. None came close to his level of execution. The Google Ads campaigns he built generate 8-12 high-ticket B2B leads every week, consistently.", rating: 5, avatar: 'OS', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag mb-4"><Star size={12} />Client Testimonials</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Real feedback from business owners and marketing directors across the GCC.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 card-shine group relative hover:shadow-md" style={{ background: t.bg, borderColor: t.border }}>
              <div className="absolute top-5 right-5 opacity-15 group-hover:opacity-25 transition-opacity" style={{ color: t.color }}><Quote size={36} /></div>
              <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="text-amber-400 fill-amber-400" />)}</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}90)` }}>{t.avatar}</div>
                <div>
                  <p className="text-slate-900 font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}, {t.company}</p>
                  <p className="text-xs mt-0.5 font-medium" style={{ color: t.color }}>{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">{[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-amber-400 fill-amber-400" />)}</div>
          <div className="text-slate-500 text-sm"><span className="text-slate-900 font-bold text-2xl mr-2">5.0</span>average rating across 50+ client reviews</div>
        </div>
      </div>
    </section>
  );
}
