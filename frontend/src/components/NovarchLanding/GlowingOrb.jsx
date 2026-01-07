import React from 'react';

const GlowingOrb = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-400/10 to-slate-600/5 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* The Arch - open frame */}
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 40px rgba(148, 163, 184, 0.15))' }}
      >
        {/* Arch path - open at the bottom */}
        <path
          d="M 80 320 Q 80 80 200 80 Q 320 80 320 320"
          fill="none"
          stroke="url(#archGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-40"
        />
        
        {/* Inner subtle arch */}
        <path
          d="M 110 320 Q 110 110 200 110 Q 290 110 290 320"
          fill="none"
          stroke="url(#archGradient2)"
          strokeWidth="1"
          strokeLinecap="round"
          className="opacity-20"
        />
        
        {/* The Orb - centered, slightly above middle */}
        <circle
          cx="200"
          cy="200"
          r="50"
          fill="url(#orbGradient)"
          className="animate-orb-glow"
        />
        
        {/* Orb inner highlight */}
        <circle
          cx="185"
          cy="185"
          r="20"
          fill="url(#orbHighlight)"
          className="opacity-60"
        />
        
        {/* Orb subtle ring */}
        <circle
          cx="200"
          cy="200"
          r="65"
          fill="none"
          stroke="rgba(148, 163, 184, 0.1)"
          strokeWidth="1"
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="archGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          
          <linearGradient id="archGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          
          <radialGradient id="orbGradient" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="40%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
          
          <radialGradient id="orbHighlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GlowingOrb;
