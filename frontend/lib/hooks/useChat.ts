"use client";

import { useState, useCallback } from "react";
import type { ChatMessage } from "../types/api";
import { sendChatMessage, ApiError } from "../api/client";

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
  clearError: () => void;
}

/**
 * Custom hook for managing chat state and API interactions
 */
export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(text.trim());
      
      // Extract response text - handle different possible response structures
      const aiText = 
        response.response || 
        response.message || 
        response.content || 
        JSON.stringify(response);

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: aiText,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : "Failed to send message. Please try again.";
      
      setError(errorMessage);
      
      // Optionally add error message to chat
      const errorChatMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: `Error: ${errorMessage}`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    clearError,
  };
}

