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
    <div className="min-h-screen bg-slate-950 text-white">
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
