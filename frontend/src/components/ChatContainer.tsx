import { ShieldCheck, User } from 'lucide-react';
import { LoadingIndicator } from './LoadingIndicator';
export function ChatContainer() {
  return (
    <div className="space-y-6">
      {/* AI Message */}
      <div className="flex justify-start">
        <div 
          className="max-w-[80%] rounded-2xl px-6 py-5 border-2 relative"
          style={{
            background: 'rgba(30, 27, 54, 0.7)',
            backdropFilter: 'blur(20px)',
            borderColor: '#22D3EE',
            boxShadow: '0 0 30px rgba(34, 211, 238, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Glass reflection effect */}
          <div 
            className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)'
            }}
          />
          
          <p className="text-white relative z-10" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Hello how may i help you
          </p>
        </div>
      </div>

      {/* User Message */}
      <div className="flex justify-end items-start gap-3">
        <div 
          className="max-w-[80%] rounded-2xl px-6 py-5 relative"
          style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 60px rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(124, 58, 237, 0.5)'
          }}
        >
          {/* Brighter edge glow */}
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 20px rgba(124, 58, 237, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          />
          
          <p className="text-white relative z-10" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Show me the critical threats.
          </p>
        </div>
        
        {/* User Avatar */}
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(34, 211, 238, 0.3) 100%)',
            border: '2px solid rgba(124, 58, 237, 0.5)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)'
          }}
        >
          <User className="w-5 h-5 text-[#7C3AED]" strokeWidth={2.5} />
        </div>
      </div>

      {/* Loading State */}
      <div className="flex justify-start">
        <LoadingIndicator />
      </div>

    </div>
  );
}