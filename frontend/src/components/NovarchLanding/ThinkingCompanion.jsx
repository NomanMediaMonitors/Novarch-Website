import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ThinkingCompanion = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/chat`, {
        session_id: sessionId,
        message: userMessage,
        history: messages
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0d10]/90 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[600px] max-h-[80vh] bg-[#111318] border border-[#2a2f3d] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2f3d]">
          <div>
            <h2 className="text-lg font-light text-[#f8f9fb] tracking-wide">Novarch</h2>
            <p className="text-[13px] text-[#6a7080] font-light">Thinking companion</p>
          </div>
          <button 
            onClick={onClose}
            className="text-[#6a7080] hover:text-[#f8f9fb] transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#6a7080] font-light text-[15px] leading-relaxed">
                What's on your mind?
              </p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div 
                className={`inline-block max-w-[85%] px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-[#1a1d24] text-[#c8cdd6]' 
                    : 'text-[#a8aeb8]'
                }`}
              >
                <p className="text-[15px] font-light leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="text-left">
              <div className="inline-block text-[#6a7080]">
                <span className="text-[15px] font-light">...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-[#2a2f3d]">
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your thoughts..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-[#f8f9fb] placeholder:text-[#4a5060] text-[15px] font-light focus:outline-none"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="text-[#6a7080] hover:text-[#f8f9fb] transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThinkingCompanion;
