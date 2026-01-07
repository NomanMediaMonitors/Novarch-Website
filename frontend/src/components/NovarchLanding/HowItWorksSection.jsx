import React from 'react';
import { howItWorksData } from '../../data/mock';

const HowItWorksSection = () => {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 80% 40%, rgba(40, 50, 70, 0.15) 0%, transparent 45%),
            linear-gradient(180deg, #0c0d10 0%, #0e0f13 100%)
          `
        }}
      />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          {/* Section title */}
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl font-light text-[#f8f9fb] tracking-[-0.01em]">
              {howItWorksData.title}
            </h2>
          </div>
          
          {/* Steps */}
          <div className="space-y-10">
            {howItWorksData.steps.map((item, index) => (
              <div 
                key={item.step}
                className="flex items-start gap-6"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-8 pt-1">
                  <span className="text-[12px] tracking-[0.2em] text-[#5a6070] font-light">
                    {String(item.step).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Step text */}
                <p className="text-lg md:text-xl text-[#b8bdc6] font-light leading-relaxed tracking-wide">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          
          {/* Tagline */}
          <div className="pt-12 pl-14">
            <p className="text-base text-[#5a6070] font-light italic tracking-wide">
              {howItWorksData.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
