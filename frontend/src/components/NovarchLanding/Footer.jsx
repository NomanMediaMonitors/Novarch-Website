import React from 'react';
import { footerData, foundersData } from '../../data/mock';
import { Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'linkedin': return Linkedin;
      case 'github': return Github;
      default: return null;
    }
  };

  // Collect all social links
  const allSocialLinks = [
    { name: 'Novarch', platform: 'instagram', url: footerData.social.novarch.instagram },
    ...foundersData.founders.flatMap(founder => 
      Object.entries(founder.social || {}).map(([platform, url]) => ({
        name: founder.name,
        platform,
        url
      }))
    )
  ];

  return (
    <footer className="relative py-16 md:py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[#08090c]" />
      
      {/* Top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(80, 90, 110, 0.25) 20%, rgba(80, 90, 110, 0.25) 80%, transparent 100%)'
        }}
      />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <p className="text-[13px] tracking-[0.1em] text-[#4a5060] font-light">
            {footerData.copyright}
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-5">
            {allSocialLinks.map((social, index) => {
              const Icon = getSocialIcon(social.platform);
              if (!Icon) return null;
              return (
                <a
                  key={`${social.name}-${social.platform}-${index}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4a5060] hover:text-[#8a919f] transition-colors duration-300"
                  aria-label={`${social.name}'s ${social.platform}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-8">
            {footerData.links.map((link, index) => (
              <button
                key={index}
                className="text-[13px] tracking-[0.1em] text-[#4a5060] hover:text-[#8a919f] transition-colors duration-300 font-light"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
