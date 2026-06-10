'use client';

import { useEffect, useRef, useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Star } from 'lucide-react';

const stats = [
  {
    icon: BarChart3,
    value: 50,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Across UAE, KSA & GCC',
    color: '#7C3AED',
    glow: 'rgba(124, 58, 237, 0.3)',
  },
  {
    icon: TrendingUp,
    value: 230,
    suffix: '%',
    label: 'Average ROAS',
    description: 'Return on ad spend',
    color: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.3)',
  },
  {
    icon: DollarSign,
    value: 20,
    prefix: '$',
    suffix: 'M+',
    label: 'Managed Ad Spend',
    description: 'In total campaign budget',
    color: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.3)',
  },
  {
    icon: Star,
    value: 98,
    suffix: '%',
    label: 'Client Retention',
    description: 'Long-term partnerships',
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.3)',
  },
];

function CountUp({
  target,
  suffix = '',
  prefix = '',
  trigger,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [trigger, target]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 lg:p-8 border border-white/8 hover:border-opacity-40 transition-all duration-500 hover:-translate-y-2 card-shine group relative overflow-hidden"
                style={{ borderColor: `${stat.color}20` }}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${stat.glow} 0%, transparent 70%)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative"
                  style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>

                <div
                  className="text-4xl lg:text-5xl font-black mb-2 stat-number relative"
                  style={{ color: stat.color }}
                >
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    trigger={visible}
                  />
                </div>
                <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
                <p className="text-gray-500 text-xs">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
