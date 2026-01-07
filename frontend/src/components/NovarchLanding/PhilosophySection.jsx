import React from 'react';
import { philosophyData } from '../../data/mock';

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="relative py-40 md:py-56 lg:py-64 overflow-hidden">
      {/* Background with subtle depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 80% 50%, rgba(25, 30, 50, 0.3) 0%, transparent 50%),
            linear-gradient(180deg, #0a0b10 0%, #0c0e14 50%, #0a0b10 100%)
          `
        }}
      />
      
      {/* Horizontal light beam - very subtle */}
      <div 
        className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 opacity-10"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(150, 165, 190, 0.5) 30%, rgba(150, 165, 190, 0.5) 70%, transparent 100%)'
        }}
      />
      
      <div className="relative z-10 max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Asymmetric layout - content offset */}
          <div className="lg:col-span-8 lg:col-start-3 space-y-16">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight text-[#e8eaef] tracking-[-0.01em] leading-[1.15]">
              {philosophyData.title}
            </h2>
            
            {/* Body paragraphs with deliberate spacing */}
            <div className="space-y-8">
              {philosophyData.body.slice(0, 2).map((paragraph, index) => (
                <p 
                  key={index}
                  className="text-lg md:text-xl lg:text-2xl font-extralight text-[#8a90a0] leading-[1.7] tracking-wide"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Separated philosophy statements */}
            <div className="space-y-6 pt-8">
              {philosophyData.body.slice(2).map((paragraph, index) => (
                <p 
                  key={index}
                  className={`text-base md:text-lg font-light tracking-wide leading-relaxed ${
                    index === philosophyData.body.length - 3 
                      ? 'text-[#a0a8b8]' 
                      : 'text-[#6a7080]'
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
