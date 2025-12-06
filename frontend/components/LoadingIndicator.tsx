"use client";

export function LoadingIndicator() {
  return (
    <div className="relative rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border-2 border-[rgba(124,58,237,0.4)] bg-[rgba(30,27,54,0.7)] backdrop-blur-[20px] shadow-[0_0_30px_rgba(124,58,237,0.15),0_8px_32px_rgba(0,0,0,0.3)]">
      {/* Rotating Holographic Ring */}
      <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_0deg,transparent_0%,rgba(124,58,237,0.3)_50%,transparent_100%)] animate-rotate-ring opacity-60" />
      
      {/* Scanner line effect */}
      <div className="absolute left-0 right-0 h-0.5 top-1/2 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent animate-scan-line shadow-[0_0_10px_#22D3EE] opacity-70" />

      <div className="flex items-center gap-2 relative z-10">
        <div
          className="w-2 h-2 rounded-full bg-[#22D3EE] animate-wave shadow-[0_0_8px_#22D3EE,0_0_16px_#22D3EE]"
          style={{ animationDelay: "0s" }}
          aria-hidden="true"
        />
        <div
          className="w-2 h-2 rounded-full bg-[#7C3AED] animate-wave shadow-[0_0_8px_#7C3AED,0_0_16px_#7C3AED]"
          style={{ animationDelay: "0.2s" }}
          aria-hidden="true"
        />
        <div
          className="w-2 h-2 rounded-full bg-[#22D3EE] animate-wave shadow-[0_0_8px_#22D3EE,0_0_16px_#22D3EE]"
          style={{ animationDelay: "0.4s" }}
          aria-hidden="true"
        />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}

