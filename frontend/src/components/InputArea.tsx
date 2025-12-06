import { ArrowRight, Paperclip, Mic } from 'lucide-react';
import { useState } from 'react';

interface InputAreaProps {
  onSendMessage: () => void;
}

export function InputArea({ onSendMessage }: InputAreaProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage();
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="pb-12 px-8 relative z-20">
      <div className="max-w-[800px] mx-auto">
        <div 
          className="relative rounded-full px-6 py-4 flex items-center gap-4 border-2"
          style={{
            background: 'rgba(30, 27, 54, 0.8)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(124, 58, 237, 0.6)',
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.3), 0 0 80px rgba(124, 58, 237, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Light reflection effect */}
          <div 
            className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)'
            }}
          />

          {/* Action Icons */}
          <div className="flex items-center gap-2 relative z-10">
            <button 
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(124, 58, 237, 0.2)',
                border: '1px solid rgba(124, 58, 237, 0.4)',
                boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)'
              }}
            >
              <Paperclip className="w-4 h-4 text-[#7C3AED]" strokeWidth={2.5} />
            </button>
            
            <button 
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(34, 211, 238, 0.2)',
                border: '1px solid rgba(34, 211, 238, 0.4)',
                boxShadow: '0 0 15px rgba(34, 211, 238, 0.3)'
              }}
            >
              <Mic className="w-4 h-4 text-[#22D3EE]" strokeWidth={2.5} />
            </button>
          </div>

          <input 
            type="text"
            placeholder="Enter command or query..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[#9CA3AF] relative z-10"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          />
          
          <button 
            onClick={handleSend}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 relative z-10 group"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
              boxShadow: '0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(124, 58, 237, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Animated glow ring on hover */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'linear-gradient(135deg, #22D3EE 0%, #7C3AED 100%)',
                animation: 'rotate-glow 3s linear infinite',
                filter: 'blur(8px)',
                zIndex: -1
              }}
            />
            
            <ArrowRight className="w-6 h-6 text-white" strokeWidth={3} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes rotate-glow {
          from {
            transform: rotate(0deg) scale(1.1);
          }
          to {
            transform: rotate(360deg) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}