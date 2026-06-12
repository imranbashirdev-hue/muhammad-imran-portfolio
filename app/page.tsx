import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
// import Stats from '@/components/Stats';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
export default function Home() {
  return (
    <main className="relative bg-[#070A12] min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      {/* <Stats /> */}
      <Services />
      <CaseStudies />
      <Process />
      <Testimonials /> 
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
