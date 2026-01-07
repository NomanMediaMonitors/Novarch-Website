import React from 'react';

const CosmicOrb = ({ className = '', size = 'large' }) => {
  const sizeClasses = {
    small: 'w-32 h-32 md:w-48 md:h-48',
    medium: 'w-48 h-48 md:w-72 md:h-72',
    large: 'w-72 h-72 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]',
    hero: 'w-80 h-80 md:w-[600px] md:h-[600px] lg:w-[750px] lg:h-[750px]'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer cosmic glow - very soft, expansive */}
      <div 
        className="absolute inset-0 scale-150 rounded-full animate-breathe-slow"
        style={{
          background: 'radial-gradient(circle, rgba(200, 210, 230, 0.08) 0%, rgba(120, 140, 180, 0.03) 40%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      
      {/* Secondary glow layer */}
      <div 
        className="absolute inset-0 scale-125 rounded-full animate-breathe-medium"
        style={{
          background: 'radial-gradient(circle, rgba(180, 195, 220, 0.12) 0%, rgba(100, 120, 160, 0.05) 50%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />
      
      {/* The Arch - thin, confident, open at bottom */}
      <svg 
        viewBox="0 0 500 500" 
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'scale(1.3)' }}
      >
        <defs>
          <linearGradient id="archGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(180, 190, 210, 0.4)" />
            <stop offset="50%" stopColor="rgba(140, 155, 180, 0.25)" />
            <stop offset="100%" stopColor="rgba(100, 115, 145, 0.15)" />
          </linearGradient>
          <filter id="archGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Main arch - open, incomplete, carved feeling */}
        <path
          d="M 100 420 Q 100 80 250 80 Q 400 80 400 420"
          fill="none"
          stroke="url(#archGradientMain)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#archGlow)"
          className="opacity-60"
        />
        
        {/* Inner subtle arch echo */}
        <path
          d="M 130 420 Q 130 110 250 110 Q 370 110 370 420"
          fill="none"
          stroke="rgba(160, 175, 200, 0.15)"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>
      
      {/* The Orb Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-[45%] h-[45%] rounded-full animate-breathe-slow"
          style={{ transform: 'translateY(-5%)' }}
        >
          {/* Orb outer fog/plasma layer */}
          <div 
            className="absolute -inset-8 rounded-full animate-fog-drift"
            style={{
              background: 'radial-gradient(ellipse at 30% 30%, rgba(220, 225, 235, 0.15) 0%, rgba(160, 175, 200, 0.08) 40%, transparent 70%)',
              filter: 'blur(20px)'
            }}
          />
          
          {/* Orb main body - dense light, cosmic plasma */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(ellipse at 35% 25%, rgba(255, 255, 255, 0.95) 0%, transparent 50%),
                radial-gradient(ellipse at 40% 35%, rgba(230, 235, 245, 0.9) 0%, transparent 40%),
                radial-gradient(ellipse at 50% 50%, rgba(200, 210, 230, 0.85) 0%, rgba(160, 175, 200, 0.7) 50%, rgba(120, 140, 170, 0.6) 100%)
              `,
              boxShadow: `
                inset -20px -20px 60px rgba(100, 120, 160, 0.4),
                inset 10px 10px 40px rgba(255, 255, 255, 0.3),
                0 0 80px rgba(180, 195, 220, 0.3),
                0 0 120px rgba(150, 170, 200, 0.15)
              `
            }}
          />
          
          {/* Orb inner luminance - core light */}
          <div 
            className="absolute inset-[15%] rounded-full animate-core-pulse"
            style={{
              background: 'radial-gradient(ellipse at 40% 35%, rgba(255, 255, 255, 0.6) 0%, rgba(240, 245, 255, 0.3) 40%, transparent 70%)',
              filter: 'blur(8px)'
            }}
          />
          
          {/* Subtle surface texture - fog wisps */}
          <div 
            className="absolute inset-0 rounded-full overflow-hidden opacity-30"
            style={{
              background: `
                radial-gradient(ellipse at 60% 70%, rgba(140, 160, 190, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 25% 60%, rgba(180, 195, 220, 0.2) 0%, transparent 40%)
              `
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CosmicOrb;
