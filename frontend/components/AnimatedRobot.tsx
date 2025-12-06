"use client";

import { useState, useEffect, useRef } from "react";
import { ThinkingLightBulb } from "./ThinkingLightBulb";

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

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isThinking]);

  useEffect(() => {
    if (isThinking) {
      
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
      const robotCenterY = rect.top + rect.height / 3; 

      const deltaX = mousePosition.x - robotCenterX;
      const deltaY = mousePosition.y - robotCenterY;
      
      
      const angle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);
      const headRotation = Math.max(-30, Math.min(30, angle));
      
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxEyeMove = 3; 
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
      className="absolute bottom-8 sm:bottom-12 left-4 sm:left-8 md:left-32 z-30 hidden sm:block"
      style={{
        animation: isThinking ? "think-bounce 0.5s ease-in-out infinite" : "float-robot 4s ease-in-out infinite"
      }}
      aria-label="AI Assistant Robot"
    >
      <div className="relative">
        {/* Thinking Light Bulb */}
        {isThinking && <ThinkingLightBulb />}

        {/* Glow effect behind robot */}
        <div
          className={`absolute inset-0 blur-xl scale-150 ${isThinking ? "animate-pulse-think" : "animate-pulse-glow"}`}
          style={{
            background: isThinking
              ? "radial-gradient(circle, rgba(234, 179, 8, 0.5) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Robot Container */}
        <div
          className="relative w-28 h-36 sm:w-36 sm:h-48 flex flex-col items-center"
          style={{
            filter: "drop-shadow(0 0 20px rgba(124, 58, 237, 0.6))"
          }}
        >
          {/* Antenna */}
          <div className="flex justify-center mb-1.5">
            <div className="w-1 h-5 bg-gradient-to-t from-[#7C3AED] to-transparent relative">
              <div
                className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-[#22D3EE] -translate-x-1/2 animate-pulse-dot shadow-[0_0_10px_#22D3EE,0_0_20px_#22D3EE]"
              />
            </div>
          </div>

          {/* Head */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl mb-2 relative transition-transform duration-200 ease-out bg-gradient-to-br from-[rgba(30,27,54,0.9)] to-[rgba(15,12,41,0.9)] border-2 border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.4),inset_0_2px_10px_rgba(124,58,237,0.2)]"
            style={{
              transform: `rotate(${rotation.head}deg)`,
              transformOrigin: "center bottom",
              animation: isThinking ? "nod-head 1s ease-in-out infinite" : "none"
            }}
          >
            {/* Eyes */}
            <div className="absolute top-7 left-4 flex gap-4">
              <div className="w-5 h-6 rounded-sm bg-[#1E1B36] flex items-center justify-center overflow-hidden shadow-[0_0_10px_#22D3EE,inset_0_0_5px_rgba(34,211,238,0.3)]">
                <div
                  className="w-3 h-4 rounded-sm transition-transform duration-150 ease-out bg-[#22D3EE] shadow-[0_0_8px_#22D3EE] animate-blink"
                  style={{
                    transform: `translate(${rotation.eyeX}px, ${rotation.eyeY}px)`,
                  }}
                />
              </div>
              <div className="w-5 h-6 rounded-sm bg-[#1E1B36] flex items-center justify-center overflow-hidden shadow-[0_0_10px_#22D3EE,inset_0_0_5px_rgba(34,211,238,0.3)]">
                <div
                  className="w-3 h-4 rounded-sm transition-transform duration-150 ease-out bg-[#22D3EE] shadow-[0_0_8px_#22D3EE] animate-blink"
                  style={{
                    transform: `translate(${rotation.eyeX}px, ${rotation.eyeY}px)`,
                  }}
                />
              </div>
            </div>

            {/* Mouth/Display */}
            <div
              className="absolute bottom-4 left-1/2 w-12 h-1.5 rounded-full bg-[#7C3AED] -translate-x-1/2 animate-pulse-mouth shadow-[0_0_8px_#7C3AED]"
            />

            {/* Side panels */}
            <div
              className="absolute top-3 left-1.5 w-1.5 h-5 rounded-full bg-[#7C3AED] animate-blink-panel shadow-[0_0_5px_#7C3AED]"
            />
            <div
              className="absolute top-3 right-1.5 w-1.5 h-5 rounded-full bg-[#7C3AED] animate-blink-panel shadow-[0_0_5px_#7C3AED]"
              style={{ animationDelay: "1.5s" }}
            />
          </div>

          {/* Body */}
          <div className="w-16 h-12 sm:w-20 sm:h-16 rounded-xl relative bg-gradient-to-br from-[rgba(30,27,54,0.9)] to-[rgba(15,12,41,0.9)] border-2 border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.4),inset_0_2px_10px_rgba(124,58,237,0.2)]">
            {/* Core/Heart */}
            <div
              className="absolute top-1/2 left-1/2 w-6 h-6 rounded bg-[radial-gradient(circle,#22D3EE_0%,#7C3AED_100%)] -translate-x-1/2 -translate-y-1/2 animate-pulse-core shadow-[0_0_15px_#22D3EE]"
            />

            {/* Status lights */}
            <div className="absolute bottom-1.5 left-1/2 flex gap-1.5 -translate-x-1/2">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-blink-status shadow-[0_0_5px_#22D3EE]"
              />
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-blink-status shadow-[0_0_5px_#7C3AED]"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-blink-status shadow-[0_0_5px_#22D3EE]"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          {/* Arms */}
          <div
            className="absolute top-24 -left-3 w-3 h-12 rounded-full bg-gradient-to-b from-[#7C3AED] to-[rgba(124,58,237,0.5)] border border-[#7C3AED] animate-wave-arm-left"
          />
          <div
            className="absolute top-24 -right-3 w-3 h-12 rounded-full bg-gradient-to-b from-[#7C3AED] to-[rgba(124,58,237,0.5)] border border-[#7C3AED] animate-wave-arm-right"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {}
      </div>
    </div>
  );
}

