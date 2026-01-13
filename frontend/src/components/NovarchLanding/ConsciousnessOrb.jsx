import React from 'react';

/**
 * Novarch Orb - Primary visual symbol
 * ORB = inner awareness / core
 * ARCH = supportive structure
 */
const ConsciousnessOrb = ({ className = '', size = 'large' }) => {
  const sizeClasses = {
    small: 'w-24 h-24 md:w-32 md:h-32',
    medium: 'w-40 h-40 md:w-56 md:h-56',
    large: 'w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]',
    hero: 'w-72 h-72 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer ambient glow - soft, not harsh */}
      <div 
        className="absolute inset-0 scale-[1.6] rounded-full animate-breathe-slow"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(200, 210, 225, 0.03) 40%, transparent 65%)',
          filter: 'blur(40px)'
        }}
      />
      
      {/* The Arch - abstract, incomplete, asymmetrical */}
      <svg 
        viewBox="0 0 400 400" 
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'scale(1.35)' }}
      >
        <defs>
          <linearGradient id="archGradientMain" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
            <stop offset="50%" stopColor="rgba(200, 210, 225, 0.15)" />
            <stop offset="100%" stopColor="rgba(160, 175, 195, 0.05)" />
          </linearGradient>
        </defs>
        
        {/* Main arch - open, asymmetrical, abstract support */}
        <path
          d="M 85 380 Q 70 150 200 90 Q 340 150 310 350"
          fill="none"
          stroke="url(#archGradientMain)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-50"
        />
        
        {/* Secondary subtle arch - adds depth */}
        <path
          d="M 115 380 Q 105 170 200 120 Q 305 175 285 360"
          fill="none"
          stroke="rgba(200, 210, 225, 0.08)"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>
      
      {/* The Orb - inner consciousness, grounded presence */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-[48%] h-[48%] rounded-full animate-breathe-consciousness"
          style={{ transform: 'translateY(-8%)' }}
        >
          {/* Outer soft halo */}
          <div 
            className="absolute -inset-6 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
              filter: 'blur(15px)'
            }}
          />
          
          {/* Main orb body - dense, luminous core */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(ellipse at 40% 30%, rgba(255, 255, 255, 0.98) 0%, transparent 45%),
                radial-gradient(ellipse at 45% 40%, rgba(245, 248, 255, 0.95) 0%, transparent 35%),
                radial-gradient(ellipse at 50% 50%, rgba(230, 238, 250, 0.9) 0%, rgba(200, 215, 235, 0.8) 50%, rgba(170, 190, 215, 0.7) 100%)
              `,
              boxShadow: `
                inset -15px -15px 40px rgba(140, 160, 190, 0.3),
                inset 8px 8px 30px rgba(255, 255, 255, 0.4),
                0 0 60px rgba(220, 230, 245, 0.25),
                0 0 100px rgba(200, 215, 235, 0.15)
              `
            }}
          />
          
          {/* Inner core luminance - the "awareness" */}
          <div 
            className="absolute inset-[20%] rounded-full animate-core-awareness"
            style={{
              background: 'radial-gradient(circle at 45% 40%, rgba(255, 255, 255, 0.7) 0%, rgba(245, 250, 255, 0.4) 40%, transparent 70%)',
              filter: 'blur(6px)'
            }}
          />
          
          {/* Subtle depth layer */}
          <div 
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: 'radial-gradient(ellipse at 65% 65%, rgba(160, 180, 210, 0.25) 0%, transparent 50%)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsciousnessOrb;
