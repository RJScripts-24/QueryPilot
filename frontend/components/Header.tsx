"use client";

import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full px-4 sm:px-6 md:px-8 py-4 md:py-6 border-b border-white/10 z-30 bg-[rgba(30,27,54,0.5)] backdrop-blur-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] rounded-lg shadow-[0_0_20px_rgba(124,58,237,0.5)]">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <h1 className="text-white tracking-wider text-sm sm:text-base md:text-lg font-bold font-sans">
            QueryPilot
          </h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div className="absolute w-6 h-6 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.4)_0%,transparent_70%)] animate-pulse-ring" />
            {/* Pulsing dot */}
            <div className="relative w-2.5 h-2.5 rounded-full bg-[#22D3EE] z-10 animate-pulse-dot shadow-[0_0_12px_#22D3EE,0_0_24px_#22D3EE,0_0_36px_rgba(34,211,238,0.5)]" aria-label="System status indicator" />
          </div>
          <span className="text-white text-xs sm:text-sm font-medium font-sans">
            System Online
          </span>
        </div>
      </div>
    </header>
  );
}

