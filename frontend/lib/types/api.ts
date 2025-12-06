

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


export interface ChatResponse {
  response?: string;
  message?: string;
  content?: string;
  
  [key: string]: unknown;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp?: Date;
}

