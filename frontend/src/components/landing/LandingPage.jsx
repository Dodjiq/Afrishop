import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import StoreShowcase from './StoreShowcase';
import Features from './Features';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import FAQ from './FAQ';
import CTA from './CTA';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <StoreShowcase />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
