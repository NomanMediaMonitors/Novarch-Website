import React from 'react';
import ConsciousnessOrb from './ConsciousnessOrb';
import { heroData } from '../../data/mock';

const HeroSection = ({ onEarlyAccess, onReadPhilosophy }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Deep background with brighter focal zone */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 60% 40%, rgba(45, 55, 75, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 30% 70%, rgba(35, 45, 65, 0.2) 0%, transparent 45%),
            linear-gradient(180deg, #0d0e12 0%, #0f1015 40%, #0c0d10 100%)
          `
        }}
      />
      
      {/* Light falloff from center */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.02) 0%, transparent 60%)',
        }}
      />
      
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-8 min-h-[75vh]">
          
          {/* Left - Content */}
          <div className="lg:w-[45%] space-y-8 animate-fade-in-slow">
            {/* Title */}
            <div className="space-y-5">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-[#f8f9fb] leading-[1]">
                {heroData.title}
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl font-light text-[#c8cdd6] tracking-wide leading-relaxed">
                {heroData.subtitle}
              </p>
            </div>
            
            {/* Description */}
            <p className="text-[15px] md:text-base text-[#8a919f] leading-[1.85] max-w-lg font-light">
              {heroData.description}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onEarlyAccess}
                className="group relative px-8 py-3.5 text-[13px] tracking-[0.15em] uppercase font-normal overflow-hidden transition-all duration-400 bg-[#f8f9fb] text-[#0c0d10] hover:bg-white"
              >
                {heroData.primaryCTA}
              </button>
              
              <button 
                onClick={onReadPhilosophy}
                className="px-8 py-3.5 text-[13px] tracking-[0.15em] text-[#8a919f] hover:text-[#c8cdd6] uppercase font-light transition-all duration-400"
              >
                {heroData.secondaryCTA}
              </button>
            </div>
          </div>
          
          {/* Right - The Orb (consciousness, grounded) */}
          <div className="lg:w-[50%] flex justify-center lg:justify-end items-center animate-fade-in-delayed">
            <ConsciousnessOrb size="hero" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-delayed opacity-50">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-[#5a6070]/40 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
