import React, { useState, useEffect } from 'react';

const Header = ({ onEarlyAccess }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled 
          ? 'bg-[#0c0d10]/85 backdrop-blur-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-base md:text-lg font-normal tracking-[0.25em] text-[#f0f2f5] hover:text-white transition-colors duration-500 uppercase"
          >
            Novarch
          </button>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {[{name: 'Philosophy', id: 'philosophy'}, {name: 'System', id: 'system'}, {name: 'Team', id: 'team'}].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[13px] tracking-[0.15em] text-[#9099a8] hover:text-[#f0f2f5] transition-all duration-400 uppercase font-light"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button 
            onClick={onEarlyAccess}
            className="text-[12px] md:text-[13px] tracking-[0.12em] text-[#f0f2f5] border border-[#3a3f4d]/60 hover:border-[#5a6070]/70 px-5 md:px-6 py-2.5 transition-all duration-400 uppercase font-light hover:bg-white/[0.04]"
          >
            Early Access
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
