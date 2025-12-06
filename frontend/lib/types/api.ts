/**
 * TypeScript types generated from OpenAPI schema
 */

export interface UserRequest {
  query: string;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

/**
 * Chat response structure
 * Note: The OpenAPI schema doesn't define the response structure,
 * so we're inferring a reasonable structure based on typical chat APIs
 */
export interface ChatResponse {
  response?: string;
  message?: string;
  content?: string;
  // Allow for flexible response structure
  [key: string]: unknown;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp?: Date;
}

