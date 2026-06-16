// 'use client';

// import { motion } from 'framer-motion';
// import { TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';

// const cases = [
//   { title: 'Premium Real Estate Developer', result: '+394% leads', metric: 'Leads', before: '85', after: '420', metric2: 'ROAS', before2: '2.3x', after2: '6.8x', icon: TrendingUp, color: '#0EA5E9', tags: ['Google Ads', 'Meta Ads', 'GA4'] },
//   { title: 'Elite Dental Clinic', result: '+278% appointments', metric: 'Appointments', before: '45', after: '170', metric2: 'Revenue', before2: 'AED 42K', after2: 'AED 158K', icon: Users, color: '#3B82F6', tags: ['Google Ads', 'SEO', 'Website'] },
//   { title: 'Fashion E-commerce Brand', result: '+310% revenue', metric: 'Revenue', before: 'Base', after: '+310%', metric2: 'CAC', before2: 'AED 120', after2: 'AED 31', icon: DollarSign, color: '#6366F1', tags: ['Meta Ads', 'CRO', 'GTM'] },
// ];

// export default function CaseStudies() {
//   return (
//     <section id="work" className="section-padding bg-white">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <div className="tag mx-auto w-fit mb-4">Real Results</div>
//           <h2 className="text-3xl md:text-4xl font-black text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Case <span className="gradient-text">Studies</span></h2>
//           <p className="text-slate-500 max-w-2xl mx-auto mt-4">Real Results. Real Impact. See how I've helped businesses scale.</p>
//         </div>
//         <div className="grid md:grid-cols-3 gap-6">
//           {cases.map((c, i) => (
//             <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-cyan-100 overflow-hidden hover:border-cyan-300 hover:-translate-y-2 transition-all duration-300">
//               <div className="p-6 border-b border-cyan-100 bg-gradient-to-br from-cyan-50/50 to-white"><div className="flex justify-between items-start mb-3"><h3 className="text-xl font-bold">{c.title}</h3><span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-700">{c.result}</span></div><div className="space-y-3 mt-4"><div className="flex justify-between items-center"><span className="text-slate-500 text-sm">{c.metric}</span><div className="flex items-center gap-2"><span className="text-slate-400 line-through text-sm">{c.before}</span><ArrowRight size={12} /><span className="font-bold" style={{ color: c.color }}>{c.after}</span></div></div><div className="flex justify-between items-center"><span className="text-slate-500 text-sm">{c.metric2}</span><div className="flex items-center gap-2"><span className="text-slate-400 line-through text-sm">{c.before2}</span><ArrowRight size={12} /><span className="font-bold" style={{ color: c.color }}>{c.after2}</span></div></div></div></div>
//               <div className="p-6"><div className="flex flex-wrap gap-2 mb-4">{c.tags.map(tag => (<span key={tag} className="text-xs px-2 py-1 rounded-full bg-cyan-50 text-cyan-600">{tag}</span>))}</div><button className="flex items-center gap-1 text-sm font-medium text-cyan-600 group-hover:gap-2 transition">View Full Case Study <ArrowRight size={14} /></button></div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }