import React from 'react';
import CosmicOrb from './CosmicOrb';
import { heroData } from '../../data/mock';

const HeroSection = ({ onEarlyAccess, onReadPhilosophy }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Deep space background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 70% 20%, rgba(30, 35, 55, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(25, 30, 50, 0.4) 0%, transparent 40%),
            linear-gradient(180deg, #08090d 0%, #0c0e14 50%, #0a0b10 100%)
          `
        }}
      />
      
      {/* Distant stars - very subtle */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Light falloff from top */}
      <div 
        className="absolute top-0 left-0 right-0 h-[500px]"
        style={{
          background: 'linear-gradient(180deg, rgba(20, 25, 40, 0.3) 0%, transparent 100%)'
        }}
      />
      
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24 pt-32 pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-center min-h-[80vh]">
          
          {/* Left - Content (asymmetric positioning) */}
          <div className="lg:col-span-5 lg:col-start-1 space-y-10 animate-fade-in-slow">
            {/* Title */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-[-0.02em] text-[#f0f2f5] leading-[0.95]">
                {heroData.title}
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl font-extralight text-[#a0a8b8] tracking-wide leading-relaxed max-w-lg">
                {heroData.subtitle}
              </p>
            </div>
            
            {/* Description */}
            <p className="text-[15px] md:text-base text-[#6a7080] leading-[1.9] max-w-md font-light tracking-wide">
              {heroData.description}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <button 
                onClick={onEarlyAccess}
                className="group relative px-10 py-4 text-[13px] tracking-[0.2em] uppercase font-light overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-[#e8eaef] transition-transform duration-500 group-hover:scale-105" />
                <span className="relative text-[#0a0b0f]">{heroData.primaryCTA}</span>
              </button>
              
              <button 
                onClick={onReadPhilosophy}
                className="px-10 py-4 text-[13px] tracking-[0.2em] text-[#6a7080] hover:text-[#a0a8b8] uppercase font-light transition-all duration-500"
              >
                {heroData.secondaryCTA}
              </button>
            </div>
          </div>
          
          {/* Right - The Orb (dominant, slightly oversized) */}
          <div className="lg:col-span-7 lg:col-start-6 flex justify-center lg:justify-end items-center animate-fade-in-delayed relative">
            {/* Position orb to slightly overflow */}
            <div className="relative lg:translate-x-16 xl:translate-x-24">
              <CosmicOrb size="hero" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - minimal */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in-delayed">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#4a5060]/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
