'use client';

import dynamic from 'next/dynamic';

// Import all components with SSR disabled
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });
const Services = dynamic(() => import('@/components/sections/Services'), { ssr: false });
const Process = dynamic(() => import('@/components/sections/Process'), { ssr: false });
const Portfolio = dynamic(() => import('@/components/sections/Portfolio'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });
const CTA = dynamic(() => import('@/components/sections/CTA'), { ssr: false });

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Contact />
        <CTA />
      </main>

    </>
  );
}