import React, { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import PhilosophySection from './PhilosophySection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import DifferenceSection from './DifferenceSection';
import FoundersSection from './FoundersSection';
import EarlyAccessSection from './EarlyAccessSection';
import Footer from './Footer';
import FilmGrain from './FilmGrain';
import ThinkingCompanion from './ThinkingCompanion';

const NovarchLanding = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollToEarlyAccess = () => {
    const element = document.getElementById('early-access');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPhilosophy = () => {
    const element = document.getElementById('philosophy');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#f8f9fb] overflow-x-hidden">
      {/* Film grain overlay */}
      <FilmGrain />
      
      {/* Main content */}
      <Header onEarlyAccess={scrollToEarlyAccess} />
      <HeroSection 
        onEarlyAccess={scrollToEarlyAccess} 
        onReadPhilosophy={scrollToPhilosophy}
      />
      <PhilosophySection />
      <FeaturesSection />
      <HowItWorksSection />
      <DifferenceSection />
      <FoundersSection />
      <EarlyAccessSection />
      <Footer />

      {/* Chat toggle button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-5 py-3 bg-[#1a1d24] border border-[#2a2f3d] text-[#a8aeb8] hover:text-[#f8f9fb] hover:border-[#3a3f4d] transition-all duration-300 text-[13px] tracking-wide font-light"
      >
        Think with Novarch
      </button>

      {/* Thinking Companion Chat */}
      <ThinkingCompanion 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default NovarchLanding;
