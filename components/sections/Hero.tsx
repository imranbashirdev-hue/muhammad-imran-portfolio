'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, TrendingUp, Users, DollarSign, Shield, Sparkles, Star, Zap, Award, Clock, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeMetric, setActiveMetric] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Advanced 3D particle system with mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create multiple particle layers
    const layers = [
      { count: 80, speed: 0.2, size: 1, color: '#0EA5E9', alpha: 0.3 },
      { count: 50, speed: 0.15, size: 1.5, color: '#3B82F6', alpha: 0.25 },
      { count: 30, speed: 0.1, size: 2, color: '#6366F1', alpha: 0.2 },
    ];

    const particles = layers.flatMap((layer, layerIdx) => 
      Array.from({ length: layer.count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * layer.speed,
        vy: (Math.random() - 0.5) * layer.speed,
        size: layer.size + Math.random() * 1,
        alpha: layer.alpha + Math.random() * 0.1,
        color: layer.color,
        layer: layerIdx,
        pulse: Math.random() * Math.PI * 2,
      }))
    );

    let animId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + Math.sin(p.pulse) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
    
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const metrics = [
    { label: 'Google ROAS', value: '6.8x', change: '+196%', color: '#0EA5E9', icon: TrendingUp },
    { label: 'Monthly Leads', value: '420+', change: '+394%', color: '#3B82F6', icon: Users },
    { label: 'Revenue Growth', value: '310%', change: 'YoY', color: '#6366F1', icon: DollarSign },
  ];

  const stats = [
    { icon: Award, value: '50+', label: 'Projects Delivered', color: '#0EA5E9', bg: 'from-cyan-500/20 to-cyan-500/5' },
    { icon: TrendingUp, value: '230%', label: 'Avg. ROAS', color: '#3B82F6', bg: 'from-blue-500/20 to-blue-500/5' },
    { icon: DollarSign, value: '$20M+', label: 'Ad Spend Managed', color: '#6366F1', bg: 'from-indigo-500/20 to-indigo-500/5' },
    { icon: Shield, value: '98%', label: 'Retention Rate', color: '#0EA5E9', bg: 'from-cyan-500/20 to-cyan-500/5' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/20"
    >
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      {/* Animated Gradient Orbs with Parallax */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }}
      >
        <div className="orb w-[800px] h-[800px] bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 opacity-15 top-[-20%] right-[-20%] rounded-full blur-3xl animate-pulse" />
        <div className="orb w-[600px] h-[600px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 bottom-[-10%] left-[-10%] rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="orb w-[400px] h-[400px] bg-gradient-to-r from-cyan-300 to-blue-300 opacity-15 top-[50%] left-[30%] rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0EA5E908_1px,transparent_1px),linear-gradient(to_bottom,#0EA5E908_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT COLUMN */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Availability Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 tag mb-6 group cursor-pointer hover:scale-105 transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm font-medium">Muhammad Imran — Available for engagements</span>
              <Sparkles size={12} className="text-cyan-500 ml-1 animate-pulse" />
            </motion.div>

            {/* Main Heading with Glow Effect */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.08] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Stop Burning{' '}
              <span className="relative inline-block">
                <span className="gradient-text relative z-10">Ad Spend.</span>
                <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 blur-sm" />
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              Data-driven marketing systems, high-converting websites, and performance campaigns that generate{' '}
              <span className="font-semibold text-slate-800 bg-gradient-to-r from-cyan-50 to-blue-50 px-2 py-0.5 rounded-lg">measurable business growth</span> and real revenue.
            </motion.p>

            {/* Stats Row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.bg} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative glass rounded-xl px-4 py-2.5 flex items-center gap-2 transition-all duration-300 hover:shadow-xl overflow-hidden">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: `${stat.color}15` }}>
                      <stat.icon size={16} style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2 px-6 py-3">
                  Book a Free Strategy Call
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-xl bg-white border-2 border-cyan-200 text-slate-700 font-semibold hover:border-cyan-300 hover:shadow-md transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2 px-6 py-3">
                  <Play size={16} className="text-cyan-600" />
                  Watch Case Studies
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Badge */}
            <motion.div variants={itemVariants} className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['AM', 'SZ', 'KR', 'NH'].map((initial, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md"
                  >
                    {initial}
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-slate-500 ml-1 font-medium">4.9 · 50+ reviews</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Premium Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
              
              {/* Main Card */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl overflow-hidden">
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" style={{ padding: '2px' }} />
                
                {/* Card Header */}
                <div className="p-6 border-b border-cyan-100 bg-gradient-to-r from-cyan-50/50 to-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Performance Dashboard</h3>
                      <p className="text-sm text-slate-500">Real-time analytics preview</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center shadow-inner">
                      <Zap size={20} className="text-cyan-600 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="p-6 space-y-5">
                  {metrics.map((metric, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: metric.color }} />
                          <span className="text-sm font-medium text-slate-700">{metric.label}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</span>
                          <span className="text-xs text-green-500 ml-2">{metric.change}</span>
                        </div>
                      </div>
                      <div className="relative h-2 bg-cyan-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${[78, 82, 68][idx]}%` }}
                          transition={{ duration: 1.2, delay: 0.8 + idx * 0.1 }}
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{ background: `linear-gradient(90deg, ${metric.color}, #38BDF8)` }}
                        >
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent to-white/30 animate-pulse" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-cyan-100">
                    {[
                      { value: '50+', label: 'Projects', icon: Award, color: '#0EA5E9' },
                      { value: '6.8x', label: 'Avg. ROAS', icon: TrendingUp, color: '#3B82F6' },
                      { value: '24/7', label: 'Support', icon: Clock, color: '#6366F1' },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + i * 0.1 }}
                        className="text-center group/stat"
                      >
                        <div className="flex justify-center mb-1">
                          <item.icon size={18} style={{ color: item.color }} />
                        </div>
                        <div className="text-xl font-bold transition-all duration-300 group-hover/stat:scale-110" style={{ color: item.color }}>{item.value}</div>
                        <div className="text-xs text-slate-500">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Live Indicator */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Live data</span>
                </div>

                {/* Animated Scan Line */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[scan_3s_linear_infinite]" 
                    style={{ boxShadow: '0 0 10px #0EA5E9' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs text-slate-400 uppercase tracking-[0.2em] font-medium">Explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-cyan-300 rounded-full flex justify-center"
        >
          <motion.div 
            animate={{ y: [4, 12, 4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Custom Keyframes for Scan Animation */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
      `}</style>
    </section>
  );
}