import React from 'react';
import { philosophyData } from '../../data/mock';

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="relative py-32 md:py-40">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <div className="space-y-12 animate-fade-in-scroll">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-white tracking-tight leading-tight">
            {philosophyData.title}
          </h2>
          
          {/* Body paragraphs */}
          <div className="space-y-6">
            {philosophyData.body.map((paragraph, index) => (
              <p 
                key={index}
                className={`text-lg md:text-xl font-light leading-relaxed ${
                  index < 2 ? 'text-slate-300' : 'text-slate-400'
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

export default PhilosophySection;
