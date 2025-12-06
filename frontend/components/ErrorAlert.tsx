"use client";

import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-8 mb-4 relative z-20"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl px-4 py-3 flex items-start gap-3 backdrop-blur-[10px] shadow-[0_0_20px_rgba(239,68,68,0.3)]">
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-red-200 font-sans text-sm sm:text-base font-medium">
            {message}
          </p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={handleDismiss}
            className="text-red-300 hover:text-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded p-1"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

