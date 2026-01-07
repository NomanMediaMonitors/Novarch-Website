import React from 'react';
import { foundersData } from '../../data/mock';
import { Instagram, Linkedin, Github } from 'lucide-react';

const FoundersSection = () => {
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'linkedin': return Linkedin;
      case 'github': return Github;
      default: return null;
    }
  };

  return (
    <section id="team" className="relative py-32 md:py-44 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 60%, rgba(35, 45, 65, 0.15) 0%, transparent 40%),
            linear-gradient(180deg, #0a0b0e 0%, #0c0d10 50%, #0e0f13 100%)
          `
        }}
      />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Title */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-light text-[#f8f9fb] tracking-[-0.01em]">
            {foundersData.title}
          </h2>
        </div>
        
        {/* Description */}
        <div className="mb-16 max-w-2xl">
          <p className="text-base md:text-lg text-[#8a919f] leading-[1.8] font-light">
            {foundersData.description}
          </p>
        </div>
        
        {/* Founders Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-4xl">
          {foundersData.founders.map((founder, index) => (
            <div 
              key={index}
              className="space-y-5"
            >
              {/* Name and Role */}
              <div className="space-y-1">
                <h4 className="text-xl md:text-2xl font-light text-[#f8f9fb] tracking-wide">
                  {founder.name}
                </h4>
                <p className="text-[13px] tracking-[0.12em] text-[#5a6070] uppercase font-light">
                  {founder.role}
                </p>
              </div>
              
              {/* Bio */}
              <p className="text-[15px] text-[#7a8290] leading-[1.75] font-light">
                {founder.bio}
              </p>
              
              {/* Social Links */}
              {founder.social && (
                <div className="flex items-center gap-4 pt-2">
                  {Object.entries(founder.social).map(([platform, url]) => {
                    const Icon = getSocialIcon(platform);
                    if (!Icon) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5a6070] hover:text-[#a8aeb8] transition-colors duration-300"
                        aria-label={`${founder.name}'s ${platform}`}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
