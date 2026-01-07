import React from 'react';
import { differenceData } from '../../data/mock';

const DifferenceSection = () => {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 75% 50%, rgba(35, 45, 65, 0.18) 0%, transparent 45%),
            linear-gradient(180deg, #0e0f13 0%, #0c0d10 50%, #0a0b0e 100%)
          `
        }}
      />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          {/* Section title */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-[#f8f9fb] tracking-[-0.01em]">
              {differenceData.title}
            </h2>
          </div>
          
          {/* Paragraphs */}
          <div className="space-y-6">
            {differenceData.paragraphs.map((paragraph, index) => (
              <p 
                key={index}
                className={`text-base md:text-lg font-light leading-[1.8] tracking-wide ${
                  index < 2 ? 'text-[#a8aeb8]' : 'text-[#8a919f]'
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
