import React from 'react';
import { footerData } from '../../data/mock';

const Footer = () => {
  return (
    <footer className="relative py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <p className="text-sm text-slate-500 font-light">
            {footerData.copyright}
          </p>
          
          {/* Links */}
          <div className="flex items-center gap-8">
            {footerData.links.map((link, index) => (
              <button
                key={index}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-300 font-light"
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
