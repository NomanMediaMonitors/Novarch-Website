import React from 'react';
import { Button } from '../ui/button';
import { ArrowDown } from 'lucide-react';
import GlowingOrb from './GlowingOrb';
import { heroData } from '../../data/mock';

const HeroSection = ({ onEarlyAccess, onReadPhilosophy }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-700/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left - Content */}
          <div className="text-left space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white">
              {heroData.title}
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-slate-300 tracking-wide">
              {heroData.subtitle}
            </p>
            
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl font-light">
              {heroData.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={onEarlyAccess}
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-base font-normal transition-all duration-300 hover:scale-105"
              >
                {heroData.primaryCTA}
              </Button>
              
              <Button 
                onClick={onReadPhilosophy}
                variant="ghost"
                className="text-slate-400 hover:text-white hover:bg-slate-800/50 px-8 py-6 text-base font-light transition-all duration-300"
              >
                {heroData.secondaryCTA}
              </Button>
            </div>
          </div>
          
          {/* Right - Visual */}
          <div className="flex justify-center lg:justify-end animate-fade-in-delayed">
            <GlowingOrb className="w-72 h-72 md:w-96 md:h-96" />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-slate-500" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
