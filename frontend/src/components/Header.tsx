import { Shield } from 'lucide-react';

export function Header() {
  return (
    <header 
      className="w-full px-8 py-6 border-b border-white/10 relative z-20"
      style={{
        background: 'rgba(30, 27, 54, 0.5)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="relative w-8 h-8 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%)',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)'
            }}
          >
            <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-white tracking-wider" style={{ 
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 700,
            letterSpacing: '2px'
          }}>
            INSTINCT AI TERMINAL
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div 
              className="absolute w-6 h-6 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
                animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
            {/* Pulsing dot */}
            <div 
              className="relative w-2.5 h-2.5 rounded-full bg-[#22D3EE] z-10"
              style={{
                animation: 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                boxShadow: '0 0 12px #22D3EE, 0 0 24px #22D3EE, 0 0 36px rgba(34, 211, 238, 0.5)'
              }}
            />
          </div>
          <span className="text-white" style={{ 
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 500
          }}>
            System Online
          </span>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse-ring {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.5);
          }
        }

        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
      `}</style>
    </header>
  );
}
