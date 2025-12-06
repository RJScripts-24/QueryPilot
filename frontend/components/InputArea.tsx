"use client";

import { ArrowRight, Paperclip, Mic } from "lucide-react";
import { useState } from "react";

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function InputArea({ onSendMessage, isLoading = false, disabled = false }: InputAreaProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() && !isLoading && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isInputDisabled = isLoading || disabled;

  return (
    <div className="pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 relative z-20">
      <div className="max-w-[800px] mx-auto">
        <div className="relative rounded-full px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 border-2 border-[rgba(124,58,237,0.6)] bg-[rgba(30,27,54,0.8)] backdrop-blur-[20px] shadow-[0_0_40px_rgba(124,58,237,0.3),0_0_80px_rgba(124,58,237,0.15),inset_0_1px_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Light reflection effect */}
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full pointer-events-none bg-gradient-to-b from-white/10 to-transparent" />

          {/* Action Icons */}
          <div className="flex items-center gap-2 relative z-10">
            <button
              type="button"
              disabled={isInputDisabled}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-[rgba(124,58,237,0.2)] border border-[rgba(124,58,237,0.4)] shadow-[0_0_15px_rgba(124,58,237,0.3)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Attach file"
            >
              <Paperclip className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7C3AED]" strokeWidth={2.5} aria-hidden="true" />
            </button>
            
            <button
              type="button"
              disabled={isInputDisabled}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-[rgba(34,211,238,0.2)] border border-[rgba(34,211,238,0.4)] shadow-[0_0_15px_rgba(34,211,238,0.3)] focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Voice input"
            >
              <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22D3EE]" strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>

          <input
            type="text"
            placeholder={isInputDisabled ? "Processing..." : "Enter command or query..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isInputDisabled}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-400 relative z-10 font-sans text-sm sm:text-base focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Message input"
          />
          
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim() || isInputDisabled}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 relative z-10 group bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] shadow-[0_0_30px_rgba(124,58,237,0.6),0_0_60px_rgba(124,58,237,0.4),inset_0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Send message"
          >
            {/* Animated glow ring on hover */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#22D3EE] to-[#7C3AED] animate-rotate-glow blur-[8px] -z-10" />
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={3} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
