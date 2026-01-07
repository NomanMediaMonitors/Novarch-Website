import React from 'react';
import { featuresData } from '../../data/mock';

const FeaturesSection = () => {
  return (
    <section id="system" className="relative py-32 md:py-44 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(35, 45, 65, 0.18) 0%, transparent 45%),
            linear-gradient(180deg, #0c0d10 0%, #0a0b0e 50%, #0c0d10 100%)
          `
        }}
      />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section title */}
        <div className="mb-20 md:mb-28">
          <h2 className="text-xl md:text-2xl font-light text-[#7a8290] tracking-[0.12em] uppercase">
            What Novarch does
          </h2>
        </div>
        
        {/* Features - vertical flow */}
        <div className="space-y-24 md:space-y-32 max-w-2xl">
          {featuresData.map((feature, index) => (
            <div 
              key={feature.id}
              className="space-y-5"
            >
              {/* Feature number */}
              <div className="text-[11px] tracking-[0.25em] text-[#5a6070] uppercase font-light">
                0{feature.id}
              </div>
              
              {/* Title */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#f8f9fb] tracking-[-0.01em]">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-base md:text-lg text-[#8a919f] leading-[1.8] font-light max-w-md">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
