import React, { useState, useEffect } from 'react';

const Header = ({ onEarlyAccess }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
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
          ? 'bg-[#0a0b0f]/60 backdrop-blur-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
        <nav className="flex items-center justify-between h-24 md:h-28">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg md:text-xl font-extralight tracking-[0.3em] text-[#e8eaef]/90 hover:text-white transition-colors duration-500 uppercase"
          >
            Novarch
          </button>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-16">
            {['Philosophy', 'System', 'Team'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[13px] tracking-[0.2em] text-[#8a90a0]/70 hover:text-[#e8eaef] transition-all duration-500 uppercase font-light"
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button 
            onClick={onEarlyAccess}
            className="text-[13px] tracking-[0.15em] text-[#e8eaef]/80 hover:text-white border border-[#3a3f50]/50 hover:border-[#5a6070]/50 px-6 py-3 transition-all duration-500 uppercase font-light hover:bg-white/[0.03]"
          >
            Early Access
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
