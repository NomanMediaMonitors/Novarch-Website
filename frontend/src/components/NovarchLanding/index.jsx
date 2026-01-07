import React from 'react';
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

const NovarchLanding = () => {
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
    </div>
  );
};

export default NovarchLanding;
