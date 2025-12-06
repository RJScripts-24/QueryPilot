import { Lightbulb } from 'lucide-react';

export function ThinkingLightBulb() {
  return (
    <div 
      className="absolute -top-20 left-1/2"
      style={{
        transform: 'translateX(-50%)',
        animation: 'pop-in 0.3s ease-out, float-bulb 2s ease-in-out infinite'
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.6) 0%, transparent 70%)',
          animation: 'pulse-light 1.5s ease-in-out infinite',
          transform: 'scale(2)'
        }}
      />

      {/* Light rays */}
      <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-gradient-to-t from-yellow-400 to-transparent"
            style={{
              transformOrigin: 'bottom center',
              transform: `rotate(${i * 45}deg) translateY(-20px)`,
              opacity: 0.6,
              animation: 'ray-pulse 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Bulb container */}
      <div 
        className="relative w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #EAB308 0%, #FCD34D 100%)',
          boxShadow: '0 0 30px rgba(234, 179, 8, 0.8), 0 0 60px rgba(234, 179, 8, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3)',
          border: '2px solid rgba(252, 211, 77, 0.8)',
          animation: 'pulse-bulb 1.5s ease-in-out infinite'
        }}
      >
        <Lightbulb 
          className="w-8 h-8 text-white" 
          strokeWidth={2.5}
          fill="rgba(255, 255, 255, 0.3)"
        />
      </div>

      {/* Thought bubbles */}
      <div 
        className="absolute -right-8 -top-2 w-3 h-3 rounded-full bg-[#22D3EE]"
        style={{
          boxShadow: '0 0 10px #22D3EE',
          animation: 'thought-bubble 2s ease-in-out infinite',
          animationDelay: '0s'
        }}
      />
      <div 
        className="absolute -right-6 -top-6 w-2 h-2 rounded-full bg-[#7C3AED]"
        style={{
          boxShadow: '0 0 8px #7C3AED',
          animation: 'thought-bubble 2s ease-in-out infinite',
          animationDelay: '0.3s'
        }}
      />
      <div 
        className="absolute -right-10 -top-8 w-1.5 h-1.5 rounded-full bg-[#22D3EE]"
        style={{
          boxShadow: '0 0 6px #22D3EE',
          animation: 'thought-bubble 2s ease-in-out infinite',
          animationDelay: '0.6s'
        }}
      />

      <style>{`
        @keyframes pop-in {
          0% {
            transform: translateX(-50%) scale(0);
            opacity: 0;
          }
          60% {
            transform: translateX(-50%) scale(1.2);
          }
          100% {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes float-bulb {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-8px);
          }
        }

        @keyframes pulse-light {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-bulb {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 30px rgba(234, 179, 8, 0.8), 0 0 60px rgba(234, 179, 8, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 40px rgba(234, 179, 8, 1), 0 0 80px rgba(234, 179, 8, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.5);
          }
        }

        @keyframes ray-pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes thought-bubble {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
}
