import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

const Header = ({ onEarlyAccess }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-light tracking-wide text-slate-100 hover:text-white transition-colors duration-300"
          >
            Novarch
          </button>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <button 
              onClick={() => scrollToSection('philosophy')}
              className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-300 hover:-translate-y-0.5 transform"
            >
              Philosophy
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-300 hover:-translate-y-0.5 transform"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('founders')}
              className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-300 hover:-translate-y-0.5 transform"
            >
              Team
            </button>
          </div>

          {/* CTA */}
          <Button 
            onClick={onEarlyAccess}
            variant="outline"
            className="text-sm bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all duration-300"
          >
            Join Early Access
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
