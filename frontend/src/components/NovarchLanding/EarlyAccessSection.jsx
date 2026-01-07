import React, { useState } from 'react';
import { earlyAccessData } from '../../data/mock';
import ConsciousnessOrb from './ConsciousnessOrb';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const EarlyAccessSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!trimmedEmail) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }
    
    if (!validateEmail(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/subscribe`, {
        email: trimmedEmail
      });
      
      if (response.data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(response.data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      if (error.response?.data?.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('Unable to process your request. Please try again.');
      }
    }
  };

  return (
    <section id="early-access" className="relative py-40 md:py-52 lg:py-60 overflow-hidden">
      {/* Background with brighter focal zone */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 45%, rgba(50, 60, 80, 0.25) 0%, transparent 50%),
            linear-gradient(180deg, #0e0f13 0%, #0c0d10 50%, #0a0b0e 100%)
          `
        }}
      />
      
      {/* Subtle orb presence */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <ConsciousnessOrb size="small" />
      </div>
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-xl mx-auto text-center space-y-10">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#f8f9fb] tracking-[-0.01em] leading-[1.15]">
            {earlyAccessData.title}
          </h2>
          
          {/* Body */}
          <p className="text-base md:text-lg text-[#8a919f] leading-[1.8] font-light">
            {earlyAccessData.body}
          </p>
          
          {/* Form */}
          <div className="pt-6">
            {status !== 'success' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    disabled={status === 'loading'}
                    className={`flex-1 bg-transparent border text-[#f8f9fb] placeholder:text-[#5a6070] px-5 py-3.5 text-[15px] tracking-wide font-light focus:outline-none transition-colors duration-300 ${
                      status === 'error' 
                        ? 'border-[#8b4a4a]' 
                        : 'border-[#2a2f3d] focus:border-[#4a5060]'
                    }`}
                  />
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-3.5 text-[13px] tracking-[0.15em] uppercase font-normal transition-all duration-300 bg-[#f8f9fb] text-[#0c0d10] hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-3 h-3 border border-[#0c0d10]/30 border-t-[#0c0d10] rounded-full animate-spin" />
                        <span>Joining</span>
                      </span>
                    ) : (
                      <span>Join</span>
                    )}
                  </button>
                </div>
                
                {/* Error message */}
                {status === 'error' && errorMessage && (
                  <p className="text-[14px] text-[#b87070] font-light">
                    {errorMessage}
                  </p>
                )}
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 text-[#b8bdc6]">
                <div className="w-2 h-2 rounded-full bg-[#6a8a6a]" />
                <p className="text-base md:text-lg font-light tracking-wide">
                  You're on the list. We'll reach out when it's ready.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
