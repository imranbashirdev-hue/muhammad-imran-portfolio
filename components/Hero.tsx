'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, TrendingUp, Users, Send, CheckCircle, Zap, Star } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [form, setForm] = useState({ name: '', phone: '', business: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
        ctx.fill();
      });
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden grid-overlay"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] opacity-20 pulse-glow" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', top: '-10%', right: '-10%' }} />
      <div className="orb w-[500px] h-[500px] opacity-15 float-slow" style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)', bottom: '-5%', left: '-8%' }} />
      <div className="orb w-[300px] h-[300px] opacity-10" style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)', top: '40%', left: '35%' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Copy ── */}
          <div>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 mb-7 text-sm">
              <Shield size={14} className="text-purple-400" />
              <span className="text-gray-300">Trusted by </span>
              <span className="text-purple-300 font-semibold">50+ Businesses Across UAE</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse ml-1" />
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-5"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <span className="text-white block">Scale Your</span>
              <span className="text-white block">Business.</span>
              <span className="gradient-text block glow-text">Maximize ROI.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
              Data-driven marketing systems, high-converting websites, and performance campaigns
              that generate{' '}
              <span className="text-gray-200 font-medium">measurable business growth</span> and real revenue.
            </p>

            {/* Metric pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: TrendingUp, label: '230% Avg ROAS', color: 'text-green-400' },
                { icon: Users, label: '50+ Clients', color: 'text-blue-400' },
                { icon: Shield, label: '$20M+ Managed', color: 'text-purple-400' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/8 text-sm">
                  <Icon size={13} className={color} />
                  <span className="text-gray-300">{label}</span>
                </div>
              ))}
            </div>

            {/* Mini stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Google ROAS', value: '6.8x', change: '+196%', color: '#34D399' },
                { label: 'Lead Growth', value: '420/mo', change: '+394%', color: '#60A5FA' },
                { label: 'Revenue', value: '+310%', change: 'YoY', color: '#A78BFA' },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-4 border border-white/8 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 card-shine">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider leading-tight">{item.label}</p>
                  <p className="text-2xl font-black mb-0.5" style={{ color: item.color, fontFamily: 'Syne, sans-serif' }}>{item.value}</p>
                  <p className="text-xs" style={{ color: item.color }}>{item.change}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: CTA Form ── */}
          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl" style={{ background: 'radial-gradient(circle, #7C3AED 0%, #2563EB 60%, transparent 100%)' }} />

            <div className="relative glass-strong rounded-2xl border border-purple-500/20 overflow-hidden">
              {/* Card header */}
              <div className="px-6 pt-6 pb-5 border-b border-white/8" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, transparent 60%)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <Zap size={15} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-base">Get Free Strategy Call</span>
                </div>
                <p className="text-gray-400 text-sm">30-minute session — no obligations, no hard selling.</p>

                {/* Stars */}
                <div className="flex items-center gap-1.5 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-gray-500 text-xs ml-1">5.0 · 50+ reviews</span>
                </div>
              </div>

              {/* Form body */}
              <div className="p-6">
                {!submitted ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Your Name *</label>
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Ahmed Al Mansouri"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">WhatsApp / Phone *</label>
                      <input
                        className="input-field"
                        type="tel"
                        placeholder="+971 50 000 0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Business Name</label>
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Your Company"
                        value={form.business}
                        onChange={(e) => setForm({ ...form, business: e.target.value })}
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Book My Free Call
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>

                    {/* Trust micro-copy */}
                    <div className="flex flex-col gap-2 pt-1">
                      {[
                        '✓ Free 30-min strategy session',
                        '✓ Custom growth plan included',
                        '✓ Response within 24 hours',
                      ].map((t) => (
                        <p key={t} className="text-xs text-gray-500">{t}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-4">
                      <CheckCircle size={28} className="text-green-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Request Received! 🎉</h3>
                    <p className="text-gray-400 text-sm max-w-[220px]">
                      I&apos;ll reach out on WhatsApp within 24 hours to schedule your call.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}>
              100% Free
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-purple-500 to-transparent" />
      </div>
    </section>
  );
}
