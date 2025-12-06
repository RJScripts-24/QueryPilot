export function BackgroundEffects() {
  return (
    <>
      {/* Hexagonal Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2322D3EE' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Circuit Board Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20h10M70 20h10M20 80h10M70 80h10M20 20v10M80 20v10M20 70v10M80 70v10' stroke='%237C3AED' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%237C3AED'/%3E%3Ccircle cx='80' cy='20' r='2' fill='%2322D3EE'/%3E%3Ccircle cx='20' cy='80' r='2' fill='%2322D3EE'/%3E%3Ccircle cx='80' cy='80' r='2' fill='%237C3AED'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Pulsing Light Leaks */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
          animation: 'pulse-glow 4s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          animation: 'pulse-glow 4s ease-in-out infinite',
          animationDelay: '2s'
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          animation: 'pulse-glow 6s ease-in-out infinite',
          animationDelay: '1s',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Floating Binary Code Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-[10px] opacity-20"
          style={{
            left: `${10 + i * 12}%`,
            bottom: '-20px',
            color: i % 2 === 0 ? '#22D3EE' : '#7C3AED',
            animation: `float-up ${15 + i * 2}s linear infinite`,
            animationDelay: `${i * 2}s`,
            fontFamily: 'monospace'
          }}
        >
          {i % 3 === 0 ? '01010101' : i % 3 === 1 ? '11001100' : '10101010'}
        </div>
      ))}

      {/* Floating Data Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${5 + i * 8}%`,
            bottom: '-10px',
            background: i % 2 === 0 ? '#22D3EE' : '#7C3AED',
            boxShadow: `0 0 8px ${i % 2 === 0 ? '#22D3EE' : '#7C3AED'}`,
            animation: `float-particle ${12 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
            opacity: 0.6
          }}
        />
      ))}

      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.1);
          }
        }

        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 40 - 20}px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
