/**
 * API Client for backend communication
 */

import type { UserRequest, ChatResponse, HTTPValidationError } from "../types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: HTTPValidationError
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Sends a chat message to the backend API
 * @param query - The user's query/message
 * @returns Promise resolving to the chat response
 * @throws ApiError if the request fails
 */
export async function sendChatMessage(query: string): Promise<ChatResponse> {
  const requestBody: UserRequest = { query };

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      let errorData: HTTPValidationError | null = null;
      
      try {
        errorData = await response.json();
      } catch {
        // If response is not JSON, use status text
      }

      throw new ApiError(
        errorData?.detail?.[0]?.msg || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData || undefined
      );
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : "Network error occurred",
      0
    );
  }
}

