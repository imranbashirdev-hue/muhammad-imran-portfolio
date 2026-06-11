'use client';

import { useEffect, useRef, useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Star } from 'lucide-react';

const stats = [
  { icon: BarChart3, value: 50, suffix: '+', label: 'Projects Delivered', description: 'Across UAE, KSA & GCC', color: '#0284C7', bg: '#F0F9FF', border: '#BAE6FD' },
  { icon: TrendingUp, value: 230, suffix: '%', label: 'Average ROAS', description: 'Return on ad spend', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
  { icon: DollarSign, value: 20, prefix: '$', suffix: 'M+', label: 'Managed Ad Spend', description: 'In total campaign budget', color: '#4F46E5', bg: '#EEF2FF', border: '#C7D2FE' },
  { icon: Star, value: 98, suffix: '%', label: 'Client Retention', description: 'Long-term partnerships', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
];

function CountUp({ target, suffix = '', prefix = '', trigger }: { target: number; suffix?: string; prefix?: string; trigger: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const duration = 2000;
    const startTime = performance.now();
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [trigger, target]);
  return <span>{prefix}{count}{suffix}</span>;
}

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl p-6 lg:p-8 border transition-all duration-500 hover:-translate-y-2 card-shine group shadow-sm hover:shadow-md" style={{ background: stat.bg, borderColor: stat.border }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <div className="text-4xl lg:text-5xl font-black mb-2 stat-number" style={{ color: stat.color }}>
                  <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} trigger={visible} />
                </div>
                <p className="text-slate-800 font-semibold text-sm mb-1">{stat.label}</p>
                <p className="text-slate-400 text-xs">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
