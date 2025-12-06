
"use client";
import React from "react";

import type { ChatMessage } from "@/lib/types/api";
import { LoadingIndicator } from "./LoadingIndicator";

interface ChatContainerProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export function ChatContainer({ messages, isLoading }: ChatContainerProps) {
  const [showLogs, setShowLogs] = React.useState(false);
  const [logs, setLogs] = React.useState<string[]>([]);
  const [loadingLogs, setLoadingLogs] = React.useState(false);

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/logs");
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (e) {
      setLogs(["Failed to fetch logs."]);
    }
    setLoadingLogs(false);
  };

  const handleCloseLogs = () => {
    setShowLogs(false);
  };

  React.useEffect(() => {
    const handler = () => {
      setShowLogs(true);
      fetchLogs();
    };
    window.addEventListener('showLogs', handler);
    return () => window.removeEventListener('showLogs', handler);
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col justify-center items-center py-12">
          <p className="text-gray-400 font-sans text-sm sm:text-base">
            Start a conversation by typing a message below
          </p>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === "user" ? "justify-end items-start gap-2 sm:gap-3" : "justify-start"}`}
        >
          {message.sender === "ai" ? (
            <div className="max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 sm:px-6 py-4 sm:py-5 border-2 border-[#22D3EE] relative bg-[rgba(30,27,54,0.7)] backdrop-blur-[20px] shadow-[0_0_30px_rgba(34,211,238,0.2),0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]">
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none bg-gradient-to-b from-white/10 to-transparent" />
              <p className="text-white relative z-10 font-sans text-sm sm:text-base whitespace-pre-wrap break-words">
                {message.text}
              </p>
            </div>
          ) : (
            <>
              <div className="max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 sm:px-6 py-4 sm:py-5 relative bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] shadow-[0_0_30px_rgba(124,58,237,0.4),0_8px_32px_rgba(0,0,0,0.3),inset_0_0_60px_rgba(255,255,255,0.05)] border border-[rgba(124,58,237,0.5)]">
                {/* Brighter edge glow */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_20px_rgba(124,58,237,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]" />
                <p className="text-white relative z-10 font-sans text-sm sm:text-base whitespace-pre-wrap break-words">
                  {message.text}
                </p>
              </div>
              
              {/* User Avatar */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[rgba(124,58,237,0.3)] to-[rgba(34,211,238,0.3)] border-2 border-[rgba(124,58,237,0.5)] backdrop-blur-[10px] shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#7C3AED]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  aria-label="User avatar"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-start">
          <LoadingIndicator />
        </div>
      )}

      {/* Command Prompt Style Logs Modal */}
      {showLogs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-black rounded-lg shadow-2xl max-w-3xl w-full border-2 border-cyan-500 overflow-hidden">
            {/* Command Prompt Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 flex items-center justify-between border-b border-cyan-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-3 text-cyan-400 font-mono text-sm font-bold">
                  C:\QueryPilot\Backend> System Logs
                </span>
              </div>
              <button
                className="text-cyan-400 hover:text-cyan-300 font-bold text-xl px-2"
                onClick={handleCloseLogs}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            
            {/* Terminal Content */}
            <div className="bg-black p-6 max-h-96 overflow-y-auto font-mono text-sm">
              {loadingLogs ? (
                <div className="text-cyan-400 animate-pulse">
                  <span className="text-green-400">$</span> Loading logs...
                </div>
              ) : logs.length > 0 ? (
                <div className="space-y-2">
                  {logs.map((log, idx) => (
                    <div key={idx} className="text-green-400">
                      <span className="text-cyan-400">[{new Date().toLocaleTimeString()}]</span>{" "}
                      <span className="text-yellow-400">→</span> {log}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">
                  <span className="text-cyan-400">$</span> No logs available. Send a query to see backend activity.
                </div>
              )}
              
              {/* Blinking cursor */}
              <div className="mt-2 text-green-400">
                <span className="text-cyan-400">$</span>
                <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
