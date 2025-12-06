"use client";

import { Lightbulb } from "lucide-react";

export function ThinkingLightBulb() {
  return (
    <div
      className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 animate-pop-in"
      style={{
        animation: "pop-in 0.3s ease-out, float-bulb 2s ease-in-out infinite",
      }}
      aria-label="AI is thinking"
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 blur-2xl bg-[radial-gradient(circle,rgba(234,179,8,0.6)_0%,transparent_70%)] animate-pulse-light scale-[2]"
        aria-hidden="true"
      />

      {/* Light rays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-gradient-to-t from-yellow-400 to-transparent animate-ray-pulse"
            style={{
              transformOrigin: "bottom center",
              transform: `rotate(${i * 45}deg) translateY(-20px)`,
              opacity: 0.6,
              animationDelay: `${i * 0.1}s`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Bulb container */}
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#EAB308] to-[#FCD34D] shadow-[0_0_30px_rgba(234,179,8,0.8),0_0_60px_rgba(234,179,8,0.4),inset_0_0_20px_rgba(255,255,255,0.3)] border-2 border-[rgba(252,211,77,0.8)] animate-pulse-bulb">
        <Lightbulb
          className="w-6 h-6 sm:w-8 sm:h-8 text-white"
          strokeWidth={2.5}
          fill="rgba(255, 255, 255, 0.3)"
          aria-hidden="true"
        />
      </div>

      {/* Thought bubbles */}
      <div
        className="absolute -right-6 sm:-right-8 -top-2 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#22D3EE] shadow-[0_0_10px_#22D3EE] animate-thought-bubble"
        style={{ animationDelay: "0s" }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-4 sm:-right-6 -top-4 sm:-top-6 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#7C3AED] animate-thought-bubble"
        style={{ animationDelay: "0.3s" }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-8 sm:-right-10 -top-6 sm:-top-8 w-1 h-1.5 sm:w-1.5 sm:h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE] animate-thought-bubble"
        style={{ animationDelay: "0.6s" }}
        aria-hidden="true"
      />
    </div>
  );
}

