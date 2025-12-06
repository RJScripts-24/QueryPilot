import { useState, useEffect, useRef } from 'react';
import { ThinkingLightBulb } from './ThinkingLightBulb';

interface AnimatedRobotProps {
  isThinking: boolean;
}

export function AnimatedRobot({ isThinking }: AnimatedRobotProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const robotRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ head: 0, eyeX: 0, eyeY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isThinking) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isThinking]);

  useEffect(() => {
    if (isThinking) {
      // Thinking animation - look around randomly
      const thinkingInterval = setInterval(() => {
        const randomHeadAngle = Math.random() * 30 - 15;
        const randomEyeX = Math.random() * 4 - 2;
        const randomEyeY = Math.random() * 4 - 2;
        
        setRotation({
          head: randomHeadAngle,
          eyeX: randomEyeX,
          eyeY: randomEyeY
        });
      }, 500);

      return () => clearInterval(thinkingInterval);
    } else if (robotRef.current) {
      const rect = robotRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 3; // Head position

      const deltaX = mousePosition.x - robotCenterX;
      const deltaY = mousePosition.y - robotCenterY;
      
      // Calculate head rotation (limited to -30 to 30 degrees)
      const angle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);
      const headRotation = Math.max(-30, Math.min(30, angle));
      
      // Calculate eye position (limited movement)
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxEyeMove = 3; // Maximum pixels eyes can move
      const eyeMoveX = Math.max(-maxEyeMove, Math.min(maxEyeMove, (deltaX / distance) * maxEyeMove * 2));
      const eyeMoveY = Math.max(-maxEyeMove, Math.min(maxEyeMove, (deltaY / distance) * maxEyeMove * 2));

      setRotation({
        head: headRotation,
        eyeX: isNaN(eyeMoveX) ? 0 : eyeMoveX,
        eyeY: isNaN(eyeMoveY) ? 0 : eyeMoveY
      });
    }
  }, [mousePosition, isThinking]);

  return (
    <div 
      ref={robotRef}
      className="fixed bottom-12 left-32 z-30"
      style={{
        animation: isThinking ? 'think-bounce 0.5s ease-in-out infinite' : 'float-robot 4s ease-in-out infinite'
      }}
    >
      <div className="relative">
        {/* Thinking Light Bulb */}
        {isThinking && <ThinkingLightBulb />}

        {/* Glow effect behind robot */}
        <div 
          className="absolute inset-0 blur-xl"
          style={{
            background: isThinking 
              ? 'radial-gradient(circle, rgba(234, 179, 8, 0.5) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)',
            animation: isThinking ? 'pulse-think 0.8s ease-in-out infinite' : 'pulse-glow 3s ease-in-out infinite',
            transform: 'scale(1.5)'
          }}
        />

        {/* Robot Container */}
        <div 
          className="relative w-36 h-48 flex flex-col items-center"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(124, 58, 237, 0.6))'
          }}
        >
          {/* Antenna */}
          <div className="flex justify-center mb-1.5">
            <div className="w-1 h-5 bg-gradient-to-t from-[#7C3AED] to-transparent relative">
              <div 
                className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full"
                style={{
                  background: '#22D3EE',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 10px #22D3EE, 0 0 20px #22D3EE',
                  animation: 'pulse-dot 2s ease-in-out infinite'
                }}
              />
            </div>
          </div>

          {/* Head */}
          <div 
            className="w-24 h-24 rounded-2xl mb-2 relative transition-transform duration-200 ease-out"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 27, 54, 0.9) 0%, rgba(15, 12, 41, 0.9) 100%)',
              border: '2px solid #7C3AED',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.4), inset 0 2px 10px rgba(124, 58, 237, 0.2)',
              transform: isThinking 
                ? `rotate(${rotation.head}deg)`
                : `rotate(${rotation.head}deg)`,
              transformOrigin: 'center bottom',
              animation: isThinking ? 'nod-head 1s ease-in-out infinite' : 'none'
            }}
          >
            {/* Eyes */}
            <div className="absolute top-7 left-4 flex gap-4">
              <div 
                className="w-5 h-6 rounded-sm bg-[#1E1B36] flex items-center justify-center overflow-hidden"
                style={{
                  boxShadow: '0 0 10px #22D3EE, inset 0 0 5px rgba(34, 211, 238, 0.3)'
                }}
              >
                <div
                  className="w-3 h-4 rounded-sm transition-transform duration-150 ease-out"
                  style={{
                    background: '#22D3EE',
                    boxShadow: '0 0 8px #22D3EE',
                    transform: `translate(${rotation.eyeX}px, ${rotation.eyeY}px)`,
                    animation: 'blink 4s ease-in-out infinite'
                  }}
                />
              </div>
              <div 
                className="w-5 h-6 rounded-sm bg-[#1E1B36] flex items-center justify-center overflow-hidden"
                style={{
                  boxShadow: '0 0 10px #22D3EE, inset 0 0 5px rgba(34, 211, 238, 0.3)'
                }}
              >
                <div
                  className="w-3 h-4 rounded-sm transition-transform duration-150 ease-out"
                  style={{
                    background: '#22D3EE',
                    boxShadow: '0 0 8px #22D3EE',
                    transform: `translate(${rotation.eyeX}px, ${rotation.eyeY}px)`,
                    animation: 'blink 4s ease-in-out infinite'
                  }}
                />
              </div>
            </div>

            {/* Mouth/Display */}
            <div 
              className="absolute bottom-4 left-1/2 w-12 h-1.5 rounded-full"
                style={{
                  background: '#7C3AED',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 8px #7C3AED',
                  animation: 'pulse-mouth 2s ease-in-out infinite'
                }}
              />

            {/* Side panels */}
            <div 
              className="absolute top-3 left-1.5 w-1.5 h-5 rounded-full bg-[#7C3AED]"
              style={{
                boxShadow: '0 0 5px #7C3AED',
                animation: 'blink-panel 3s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute top-3 right-1.5 w-1.5 h-5 rounded-full bg-[#7C3AED]"
              style={{
                boxShadow: '0 0 5px #7C3AED',
                animation: 'blink-panel 3s ease-in-out infinite',
                animationDelay: '1.5s'
              }}
            />
          </div>

          {/* Body */}
          <div 
            className="w-20 h-16 rounded-xl relative"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 27, 54, 0.9) 0%, rgba(15, 12, 41, 0.9) 100%)',
              border: '2px solid #7C3AED',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.4), inset 0 2px 10px rgba(124, 58, 237, 0.2)'
            }}
          >
            {/* Core/Heart */}
            <div 
              className="absolute top-1/2 left-1/2 w-6 h-6 rounded"
              style={{
                background: 'radial-gradient(circle, #22D3EE 0%, #7C3AED 100%)',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 15px #22D3EE',
                animation: 'pulse-core 2s ease-in-out infinite'
              }}
            />

            {/* Status lights */}
            <div className="absolute bottom-1.5 left-1/2 flex gap-1.5" style={{ transform: 'translateX(-50%)' }}>
              <div 
                className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"
                style={{
                  boxShadow: '0 0 5px #22D3EE',
                  animation: 'blink-status 1.5s ease-in-out infinite'
                }}
              />
              <div 
                className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"
                style={{
                  boxShadow: '0 0 5px #7C3AED',
                  animation: 'blink-status 1.5s ease-in-out infinite',
                  animationDelay: '0.5s'
                }}
              />
              <div 
                className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"
                style={{
                  boxShadow: '0 0 5px #22D3EE',
                  animation: 'blink-status 1.5s ease-in-out infinite',
                  animationDelay: '1s'
                }}
              />
            </div>
          </div>

          {/* Arms */}
          <div 
            className="absolute top-24 -left-3 w-3 h-12 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #7C3AED 0%, rgba(124, 58, 237, 0.5) 100%)',
              border: '1px solid #7C3AED',
              animation: 'wave-arm-left 3s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-24 -right-3 w-3 h-12 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #7C3AED 0%, rgba(124, 58, 237, 0.5) 100%)',
              border: '1px solid #7C3AED',
              animation: 'wave-arm-right 3s ease-in-out infinite',
              animationDelay: '1.5s'
            }}
          />
        </div>

        {/* Name tag / Label */}
        <div 
          className="mt-3 text-center px-4 py-1.5 rounded-full"
          style={{
            background: 'rgba(30, 27, 54, 0.8)',
            border: '1px solid rgba(124, 58, 237, 0.5)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)'
          }}
        >
          <span 
            className="text-sm text-[#22D3EE]"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
              textShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
            }}
          >
            INSTINCT BOT
          </span>
        </div>
      </div>

      <style>{`
        @keyframes float-robot {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes think-bounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes nod-head {
          0%, 100% {
            transform: rotate(0deg) translateY(0);
          }
          25% {
            transform: rotate(5deg) translateY(2px);
          }
          50% {
            transform: rotate(0deg) translateY(4px);
          }
          75% {
            transform: rotate(-5deg) translateY(2px);
          }
        }

        @keyframes pulse-think {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translateX(-50%) scale(1.3);
          }
        }

        @keyframes blink {
          0%, 90%, 100% {
            opacity: 1;
            height: 1rem;
          }
          95% {
            opacity: 0.3;
            height: 0.125rem;
          }
        }

        @keyframes pulse-mouth {
          0%, 100% {
            width: 2rem;
            opacity: 1;
          }
          50% {
            width: 1.5rem;
            opacity: 0.7;
          }
        }

        @keyframes blink-panel {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes pulse-core {
          0%, 100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes blink-status {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
        }

        @keyframes wave-arm-left {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-15deg);
          }
        }

        @keyframes wave-arm-right {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(15deg);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}