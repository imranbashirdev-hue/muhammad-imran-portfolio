'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, TrendingUp, Clock, Star, Globe, Code, Search } from 'lucide-react';

const results = [
  { icon: TrendingUp, value: '3x', label: 'More Patient Enquiries', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { icon: Clock, value: '7 Days', label: 'Website Launch Time', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Star, value: '5.0★', label: 'Client Satisfaction', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: Globe, value: '100%', label: 'Mobile Optimised', color: 'text-purple-600', bg: 'bg-purple-50' },
];

const challenges = [
  'Website had no clear appointment booking flow — patients had to call only',
  'Outdated design that didn\'t reflect the quality of dental care provided',
  'No SEO foundation — not appearing in local "dentist near me" searches',
  'No mobile-friendly layout — 60%+ of patients browse on phones',
  'Slow page load speed — patients leaving before the page even loaded',
];

const solutions = [
  { icon: Code, title: 'WordPress Rebuild', desc: 'Built a fast, modern WordPress website from scratch — clean design, clear navigation, and mobile-first layout.' },
  { icon: Globe, title: 'Appointment Booking Integration', desc: 'Added an easy-to-use online booking form directly on the homepage so patients can book in under 60 seconds.' },
  { icon: Search, title: 'Local SEO Foundation', desc: 'Set up proper meta titles, descriptions, schema markup and Google Business Profile optimisation so they appear in local searches.' },
  { icon: TrendingUp, title: 'Conversion-Focused Design', desc: 'Every page designed with one goal: turn visitors into booked appointments. Clear CTAs, trust signals, and patient-friendly copy.' },
];

const timeline = [
  { day: 'Day 1', title: 'Discovery & Audit', desc: 'Full review of existing site, competitor analysis, and goal setting' },
  { day: 'Day 2-3', title: 'Design & Structure', desc: 'Wireframes approved, brand colours matched, content structure built' },
  { day: 'Day 4-6', title: 'Build & Content', desc: 'Full WordPress build, content uploaded, booking system integrated' },
  { day: 'Day 7', title: 'Launch', desc: 'Testing complete, site live, SEO submitted to Google' },
];

export default function DulwichDentistsCase() {
  return (
    <div className="min-h-screen bg-white">

      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/case-studies" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 text-sm font-medium transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Case Studies
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-semibold rounded-full">🦷 Dental & Medical</span>
            <span className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-200 text-xs font-semibold rounded-full">📍 London, UK</span>
            <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold rounded-full">✅ Completed</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Dulwich Dentists — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">3x More Patient Enquiries</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-3xl leading-relaxed">
            A London dental clinic with an outdated website that wasn&apos;t converting visitors into bookings. We rebuilt it from scratch in 7 days — clean, fast, mobile-friendly, and built to generate patient enquiries.
          </p>
        </motion.div>
      </div>

      {/* Website Preview */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 h-80 md:h-[500px] bg-gray-100"
        >
          <div
            className="absolute inset-0 bg-cover bg-top hover:bg-bottom transition-all duration-[4s] ease-in-out cursor-pointer"
            style={{ backgroundImage: "url('/images/dulwich-preview.webp')" }}
          />
          <div className="absolute bottom-4 right-4">
            <a
              href="https://dulwichdentists.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-slate-700 text-sm font-semibold rounded-xl shadow-lg hover:bg-white transition border border-white/50"
            >
              <Globe size={14} className="text-cyan-500" />
              Visit Live Site
            </a>
          </div>
        </motion.div>
      </div>

      {/* Results Stats */}
      <div className="bg-gradient-to-b from-sky-50/50 to-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">The Results</p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Achieved</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100"
              >
                <div className={`w-10 h-10 rounded-xl ${r.bg} flex items-center justify-center mx-auto mb-3`}>
                  <r.icon size={20} className={r.color} />
                </div>
                <div className={`text-2xl font-black ${r.color} mb-1`}>{r.value}</div>
                <div className="text-xs text-slate-500 font-medium">{r.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">

        {/* The Challenge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">The Problem</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            What Was <span className="text-red-500">Holding Them Back</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {challenges.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100"
              >
                <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                <span className="text-slate-700 text-sm">{c}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Solution */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Our Approach</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Built</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center mb-4">
                  <s.icon size={20} className="text-cyan-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">The Process</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>
            7-Day <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Launch Timeline</span>
          </h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-500 hidden md:block" />
            <div className="space-y-5">
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-5 items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg z-10">
                    <CheckCircle size={18} className="text-white" />
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded-full">{t.day}</span>
                      <h3 className="font-bold text-slate-800">{t.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Client Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-10 text-center"
        >
          <div className="text-4xl mb-4">❝</div>
          <p className="text-white/90 text-lg md:text-xl italic leading-relaxed max-w-2xl mx-auto mb-6">
            The new website looks exactly what we wanted — clean, professional and easy for patients to navigate. We started getting more online enquiries within the first week of launch.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">DD</div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">Dulwich Dentists</div>
              <div className="text-white/50 text-xs">London, UK</div>
            </div>
          </div>
        </motion.div>

        {/* Live Site Link */}
        <div className="text-center">
          <a
            href="https://dulwichdentists.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <Globe size={16} />
            View Live Website
          </a>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 py-16 px-6 mt-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-black mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Want Similar Results for Your Clinic?
          </h2>
          <p className="text-white/80 mb-8">
            Book a free 15-minute call. I&apos;ll review your current website and tell you exactly what&apos;s costing you patients.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-slate-800 font-semibold rounded-xl hover:bg-slate-50 transition hover:shadow-lg hover:-translate-y-0.5"
            >
              Book a Free Strategy Call
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition"
            >
              <ArrowLeft size={16} />
              More Case Studies
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
