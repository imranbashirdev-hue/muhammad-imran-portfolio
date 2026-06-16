'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: 'Ahmed Al Mansouri', role: 'Marketing Director', company: 'Prestige Properties', location: 'Dubai', text: 'Muhammad transformed our digital marketing completely. Within 3 months, our qualified leads tripled and cost per lead dropped by 76%.', rating: 5, avatar: 'AM', color: '#0EA5E9' },
  { name: 'Dr. Sara Al Zaabi', role: 'Owner', company: 'Elite Dental Center', location: 'Abu Dhabi', text: 'We went from 45 appointments per month to over 170. The ROI has been extraordinary.', rating: 5, avatar: 'SZ', color: '#3B82F6' },
  { name: 'Khalid Al Rashid', role: 'E-commerce Director', company: 'Luxe Fashion KSA', location: 'Riyadh', text: 'Our Meta Ads ROAS went from 1.4x to 5.2x consistently. The data-driven approach built trust from day one.', rating: 5, avatar: 'KR', color: '#6366F1' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="max-w-5xl mx-auto lg:px-8">
        <div className="text-center mb-12">
          <div className="tag mx-auto w-fit mb-4">Client Love</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>What Clients <span className="gradient-text">Say</span></h2>
        </div>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="bg-white rounded-2xl p-8 text-center border border-cyan-100 shadow-lg">
              <div className="flex justify-center gap-1 mb-6">{[...Array(testimonials[current].rating)].map((_, i) => (<Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />))}</div>
              <Quote size={32} className="text-cyan-200 mx-auto mb-4" />
              <p className="text-slate-600 text-lg leading-relaxed mb-6">"{testimonials[current].text}"</p>
              <div className="flex items-center justify-center gap-4"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">{testimonials[current].avatar}</div><div><p className="font-bold">{testimonials[current].name}</p><p className="text-sm text-slate-500">{testimonials[current].role}, {testimonials[current].company}</p></div></div>
            </motion.div>
          </AnimatePresence>
          <button onClick={() => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-white border border-cyan-200 hover:bg-cyan-50"><ChevronLeft size={20} /></button>
          <button onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-white border border-cyan-200 hover:bg-cyan-50"><ChevronRight size={20} /></button>
        </div>
        <div className="flex justify-center gap-2 mt-6">{testimonials.map((_, idx) => (<button key={idx} onClick={() => setCurrent(idx)} className={`h-2 rounded-full transition-all ${current === idx ? 'w-8 bg-cyan-500' : 'w-2 bg-cyan-200'}`} />))}</div>
      </div>
    </section>
  );
}