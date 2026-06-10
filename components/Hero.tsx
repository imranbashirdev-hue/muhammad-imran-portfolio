'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Play, Shield, TrendingUp, Users } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      // Draw connections
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
      <div
        className="orb w-[600px] h-[600px] opacity-20 pulse-glow"
        style={{
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          top: '-10%',
          right: '-10%',
        }}
      />
      <div
        className="orb w-[500px] h-[500px] opacity-15 float-slow"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
          bottom: '-5%',
          left: '-8%',
        }}
      />
      <div
        className="orb w-[300px] h-[300px] opacity-10"
        style={{
          background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
          top: '40%',
          left: '45%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 mb-8 text-sm"
            style={{ animation: 'fadeInDown 0.6s ease forwards' }}
          >
            <Shield size={14} className="text-purple-400" />
            <span className="text-gray-300">Trusted by </span>
            <span className="text-purple-300 font-semibold">50+ Businesses Across UAE</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse ml-1" />
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            <span className="text-white block">Scale Your</span>
            <span className="text-white block">Business.</span>
            <span className="gradient-text block glow-text">Maximize ROI.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Data-driven marketing systems, high-converting websites, and performance campaigns
            that generate{' '}
            <span className="text-gray-200 font-medium">measurable business growth</span> and real
            revenue.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => scrollTo('contact')}
              className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              Get Free Strategy Call
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('work')}
              className="group flex items-center gap-3 px-8 py-4 rounded-xl glass border border-white/10 text-white font-semibold text-base transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/5 w-full sm:w-auto justify-center"
            >
              <Play size={16} className="text-purple-400" />
              View Case Studies
            </button>
          </div>

          {/* Metric pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {[
              { icon: TrendingUp, label: '230% Avg ROAS', color: 'text-green-400' },
              { icon: Users, label: '50+ Clients', color: 'text-blue-400' },
              { icon: Shield, label: '$20M+ Managed', color: 'text-purple-400' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/8 text-sm"
              >
                <Icon size={14} className={color} />
                <span className="text-gray-300">{label}</span>
              </div>
            ))}
          </div>

          {/* Hero mockup cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Google Ads ROAS', value: '6.8x', change: '+196%', color: '#34D399' },
              { label: 'Lead Generation', value: '420/mo', change: '+394%', color: '#60A5FA' },
              { label: 'Revenue Growth', value: '+310%', change: 'YoY', color: '#A78BFA' },
            ].map((item) => (
              <div
                key={item.label}
                className="glass rounded-2xl p-5 border border-white/8 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 card-shine text-left"
              >
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">{item.label}</p>
                <p
                  className="text-3xl font-black mb-1"
                  style={{ color: item.color, fontFamily: 'Syne, sans-serif' }}
                >
                  {item.value}
                </p>
                <p className="text-xs" style={{ color: item.color }}>
                  {item.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent" />
      </div>
    </section>
  );
}
