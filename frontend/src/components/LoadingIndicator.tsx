export function LoadingIndicator() {
  return (
    <div 
      className="relative rounded-2xl px-6 py-4 border-2"
      style={{
        background: 'rgba(30, 27, 54, 0.7)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(124, 58, 237, 0.4)',
        boxShadow: '0 0 30px rgba(124, 58, 237, 0.15), 0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Rotating Holographic Ring */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, rgba(124, 58, 237, 0.3) 50%, transparent 100%)',
          animation: 'rotate-ring 3s linear infinite',
          opacity: 0.6
        }}
      />
      
      {/* Scanner line effect */}
      <div 
        className="absolute left-0 right-0 h-0.5 top-1/2"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #22D3EE 50%, transparent 100%)',
          animation: 'scan-line 2s ease-in-out infinite',
          boxShadow: '0 0 10px #22D3EE',
          opacity: 0.7
        }}
      />

      <div className="flex items-center gap-2 relative z-10">
        <div 
          className="w-2 h-2 rounded-full bg-[#22D3EE]"
          style={{
            animation: 'wave 1.4s ease-in-out infinite',
            animationDelay: '0s',
            boxShadow: '0 0 8px #22D3EE, 0 0 16px #22D3EE'
          }}
        />
        <div 
          className="w-2 h-2 rounded-full bg-[#7C3AED]"
          style={{
            animation: 'wave 1.4s ease-in-out infinite',
            animationDelay: '0.2s',
            boxShadow: '0 0 8px #7C3AED, 0 0 16px #7C3AED'
          }}
        />
        <div 
          className="w-2 h-2 rounded-full bg-[#22D3EE]"
          style={{
            animation: 'wave 1.4s ease-in-out infinite',
            animationDelay: '0.4s',
            boxShadow: '0 0 8px #22D3EE, 0 0 16px #22D3EE'
          }}
        />
      </div>
      
      <style>{`
        @keyframes wave {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          30% {
            transform: translateY(-8px);
            opacity: 0.7;
          }
        }

        @keyframes rotate-ring {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes scan-line {
          0%, 100% {
            transform: translateY(-10px);
            opacity: 0;
          }
          50% {
            transform: translateY(10px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
