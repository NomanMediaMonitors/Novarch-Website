import React from 'react';
import { philosophyData } from '../../data/mock';

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="relative py-32 md:py-44 lg:py-52 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 70% 30%, rgba(40, 50, 70, 0.2) 0%, transparent 50%),
            linear-gradient(180deg, #0c0d10 0%, #0e0f13 50%, #0c0d10 100%)
          `
        }}
      />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <div className="space-y-10">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-[#f8f9fb] tracking-[-0.01em] leading-[1.2]">
              {philosophyData.title}
            </h2>
            
            {/* Body paragraphs */}
            <div className="space-y-6">
              {philosophyData.body.slice(0, 2).map((paragraph, index) => (
                <p 
                  key={index}
                  className="text-lg md:text-xl font-light text-[#a8aeb8] leading-[1.75] tracking-wide"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Separated statements */}
            <div className="space-y-4 pt-6">
              {philosophyData.body.slice(2).map((paragraph, index) => (
                <p 
                  key={index}
                  className={`text-base md:text-lg font-light tracking-wide leading-relaxed ${
                    index === philosophyData.body.length - 3 
                      ? 'text-[#b8bdc6]' 
                      : 'text-[#7a8290]'
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
