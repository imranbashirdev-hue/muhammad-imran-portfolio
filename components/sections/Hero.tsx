'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, TrendingUp, Users, Send, CheckCircle, Zap, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [form, setForm] = useState({ name: '', phone: '', business: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

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
        alpha: Math.random() * 0.25 + 0.05,
      });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha})`;
        ctx.fill();
      });
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError('Name and phone are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('leads').insert([
        {
          name: form.name,
          phone: form.phone,
          business: form.business || null,
          page_source: 'hero_cta',
          created_at: new Date().toISOString(),
        }
      ]);

      if (insertError) {
        console.error('Supabase error:', insertError);
        setError(insertError.message);
        setLoading(false);
      } else {
        setSubmitted(true);
        setLoading(false);
        // Redirect to thank you page after 1.5 seconds
        setTimeout(() => {
          router.push('/thank-you');
        }, 1500);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden grid-overlay" style={{ background: 'linear-gradient(160deg, #F0F9FF 0%, #E0F2FE 40%, #F8FAFF 100%)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.7 }} />

      {/* Orbs */}
      <div className="orb w-[600px] h-[600px] opacity-20 pulse-glow" style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)', top: '-10%', right: '-8%' }} />
      <div className="orb w-[500px] h-[500px] opacity-15 float-slow" style={{ background: 'radial-gradient(circle, #93C5FD 0%, transparent 70%)', bottom: '-5%', left: '-8%' }} />
      <div className="orb w-[300px] h-[300px] opacity-10" style={{ background: 'radial-gradient(circle, #BAE6FD 0%, transparent 70%)', top: '40%', left: '35%' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 text-sm bg-white/80 border border-sky-200 shadow-sm">
              <Shield size={14} className="text-sky-500" />
              <span className="text-slate-600">Trusted by </span>
              <span className="text-sky-600 font-semibold">50+ Businesses Across UAE</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse ml-1" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
              <span className="text-slate-900 block">Scale Your</span>
              <span className="text-slate-900 block">Business.</span>
              <span className="gradient-text block glow-text">Maximize ROI.</span>
            </h1>

            <p className="text-base md:text-lg text-slate-500 mb-8 leading-relaxed max-w-lg">
              Data-driven marketing systems, high-converting websites, and performance campaigns that generate{' '}
              <span className="text-slate-800 font-medium">measurable business growth</span> and real revenue.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: TrendingUp, label: '230% Avg ROAS', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
                { icon: Users, label: '50+ Clients', color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' },
                { icon: Shield, label: '$20M+ Managed', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
              ].map(({ icon: Icon, label, color, bg }) => (
                <div key={label} className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-white/70 ${bg} shadow-sm`}>
                  <Icon size={13} className={color} />
                  <span className="text-slate-700 font-medium">{label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Google ROAS', value: '6.8x', change: '+196%', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
                { label: 'Lead Growth', value: '420/mo', change: '+394%', color: '#0284C7', bg: '#F0F9FF', border: '#BAE6FD' },
                { label: 'Revenue', value: '+310%', change: 'YoY', color: '#4F46E5', bg: '#EEF2FF', border: '#C7D2FE' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 border transition-all duration-300 hover:-translate-y-1 card-shine shadow-sm" style={{ background: item.bg, borderColor: item.border }}>
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider leading-tight">{item.label}</p>
                  <p className="text-2xl font-black mb-0.5" style={{ color: item.color, fontFamily: 'Syne, sans-serif' }}>{item.value}</p>
                  <p className="text-xs font-semibold" style={{ color: item.color }}>{item.change}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — CTA Form */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl" style={{ background: 'radial-gradient(circle, #38BDF8 0%, #93C5FD 60%, transparent 100%)' }} />

            <div className="relative bg-white rounded-2xl border border-sky-200 overflow-hidden shadow-xl shadow-sky-100/60">
              {/* Header */}
              <div className="px-6 pt-6 pb-5 border-b border-sky-100" style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #EFF6FF 100%)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                    <Zap size={15} className="text-white" />
                  </div>
                  <span className="text-slate-900 font-bold text-base">Get Free Strategy Call</span>
                </div>
                <p className="text-slate-500 text-sm">30-minute session — no obligations, no hard selling.</p>
                <div className="flex items-center gap-1.5 mt-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                  <span className="text-slate-400 text-xs ml-1">5.0 · 50+ reviews</span>
                </div>
              </div>

              {/* Form */}
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-2 rounded-lg bg-red-50 text-red-600 text-sm text-center">
                    ❌ {error}
                  </div>
                )}
                
                {!submitted ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5 font-medium">Your Name *</label>
                      <input 
                        className="input-field w-full p-3 rounded-lg border" 
                        type="text" 
                        placeholder="Ahmed Al Mansouri" 
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5 font-medium">WhatsApp / Phone *</label>
                      <input 
                        className="input-field w-full p-3 rounded-lg border" 
                        type="tel" 
                        placeholder="+971 50 000 0000" 
                        value={form.phone} 
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5 font-medium">Business Name</label>
                      <input 
                        className="input-field w-full p-3 rounded-lg border" 
                        type="text" 
                        placeholder="Your Company" 
                        value={form.business} 
                        onChange={(e) => setForm({ ...form, business: e.target.value })} 
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-sky-300/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Sending...</>
                      ) : (
                        <><Send size={15} />Book My Free Call<ArrowRight size={14} /></>
                      )}
                    </button>

                    <div className="flex flex-col gap-1.5 pt-1">
                      {['✓ Free 30-min strategy session', '✓ Custom growth plan included', '✓ Response within 24 hours'].map((t) => (
                        <p key={t} className="text-xs text-slate-400">{t}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                      <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-lg mb-2">Redirecting...</h3>
                    <p className="text-slate-500 text-sm max-w-[220px]">Please wait, you will be redirected to the thank you page.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md" style={{ background: 'linear-gradient(135deg, #0EA5E9, #3B82F6)' }}>
              100% Free
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-xs text-slate-400 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-sky-400 to-transparent" />
      </div>
    </section>
  );
}