'use client';

import dynamic from 'next/dynamic';

// Dynamically import all components with SSR disabled
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });
const TrustBar = dynamic(() => import('@/components/sections/TrustBar'), { ssr: false });
const Services = dynamic(() => import('@/components/sections/Services'), { ssr: false });
const CaseStudies = dynamic(() => import('@/components/sections/CaseStudies'), { ssr: false });
const Process = dynamic(() => import('@/components/sections/Process'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });
const CTA = dynamic(() => import('@/components/sections/CTA'), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}