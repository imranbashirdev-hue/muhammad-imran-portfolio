'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Pikker Team',
    role: 'Project Manager',
    company: 'Pikker',
    location: 'UK',
    text: 'Imran helped turn the project requirements into a clean, responsive website with a modern layout and smooth user experience. Communication was clear throughout, and updates were handled quickly.',
    rating: 5,
    avatar: 'PK',
    color: '#0EA5E9'
  },
  {
    name: 'Green Energy Team',
    role: 'Project Manager',
    company: 'Green Energy Upgrades',
    location: 'Australia',
    text: 'The website was built with a strong focus on service presentation, lead generation, and a cleaner overall structure. We appreciated the quick turnaround and attention to detail across the pages.',
    rating: 5,
    avatar: 'GE',
    color: '#0EA5E9'
  },
  {
    name: 'Cell Security Team',
    role: 'Project Manager',
    company: 'Cell Security',
    location: 'UK',
    text: 'Imran supported the website development with a professional, business-focused approach and was responsive to feedback during the process. The final result felt much more polished and easier to navigate.',
    rating: 5,
    avatar: 'CS',
    color: '#0EA5E9'
  },
  {
    name: 'Top Location Equipment Team',
    role: 'Project Manager',
    company: 'Top Location Equipment',
    location: 'UK',
    text: 'A reliable and straightforward experience from start to finish. The website structure, page layout, and content presentation were handled well, and the project moved forward efficiently.',
    rating: 5,
    avatar: 'TL',
    color: '#0EA5E9'
  },
  {
    name: 'Smart Inc Team',
    role: 'Project Manager',
    company: 'Smart Inc',
    location: 'UK',
    text: 'Great support on the web development side — from layout adjustments to building pages in a way that aligned with the business goals. Fast communication and a solid understanding of WordPress work.',
    rating: 5,
    avatar: 'SI',
    color: '#0EA5E9'
  }
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