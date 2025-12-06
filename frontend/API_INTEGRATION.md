# API Integration Guide

## Overview
The frontend has been optimized to work with the backend API based on the OpenAPI contract (`openapi.json`). All components now use real API calls instead of mock data.

## API Endpoint

### POST `/chat`
Sends a user query to the AI Router and returns the response.

**Request:**
```typescript
{
  query: string  // Required: The user's query/message
}
```

**Response:**
The response structure is flexible. The client will attempt to extract the message from:
- `response.response`
- `response.message`
- `response.content`
- Or fallback to JSON stringification

**Error Handling:**
- 422: Validation Error (returns `HTTPValidationError`)
- Network errors are caught and displayed to the user

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Default:** If not set, defaults to `http://localhost:8000`

## Architecture

### Type Definitions (`lib/types/api.ts`)
- `UserRequest` - Request payload structure
- `ChatResponse` - Response structure (flexible)
- `ChatMessage` - Internal message format
- `HTTPValidationError` - Error response structure
- `ApiError` - Custom error class

### API Client (`lib/api/client.ts`)
- `sendChatMessage(query: string)` - Main function to send messages
- Handles errors and validation
- Returns typed responses

### Custom Hook (`lib/hooks/useChat.ts`)
- `useChat()` - Manages chat state
- Returns:
  - `messages: ChatMessage[]` - Message history
  - `isLoading: boolean` - Loading state
  - `error: string | null` - Error message
  - `sendMessage(text: string)` - Send a message
  - `clearMessages()` - Clear chat history
  - `clearError()` - Clear error state

## Component Updates

### ChatContainer
- **Before:** Used mock data
- **Now:** Accepts `messages` and `isLoading` props
- Displays empty state when no messages
- Shows loading indicator during API calls

### InputArea
- **Before:** Only called callback
- **Now:** Accepts `onSendMessage(message: string)` callback
- Disabled state during loading
- Proper loading feedback

### ErrorAlert (New Component)
- Displays API errors to users
- Dismissible
- Accessible with ARIA attributes

### Page Component
- Uses `useChat` hook for state management
- Wires all components together
- Handles error display

## Usage Example

```typescript
import { useChat } from "@/lib/hooks/useChat";

function MyComponent() {
  const { messages, isLoading, error, sendMessage } = useChat();

  const handleSend = async () => {
    await sendMessage("Hello, AI!");
  };

  return (
    <div>
      {messages.map(msg => <div key={msg.id}>{msg.text}</div>)}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
```

## Error Handling

The API client handles three types of errors:

1. **Validation Errors (422)**
   - Extracts validation message from response
   - Displays user-friendly error

2. **HTTP Errors (4xx, 5xx)**
   - Shows status code and message
   - Falls back to generic error if response isn't JSON

3. **Network Errors**
   - Catches connection failures
   - Shows "Network error occurred" message

## Testing

### Local Development
1. Ensure backend is running on `http://localhost:8000` (or update `.env.local`)
2. Start frontend: `npm run dev`
3. Send a message through the UI
4. Verify API call in browser DevTools → Network tab

### API Response Format
If your backend returns a different structure, update the response extraction in `lib/hooks/useChat.ts`:

```typescript
const aiText = 
  response.response ||      // Try these fields
  response.message || 
  response.content || 
  JSON.stringify(response); // Fallback
```

## Troubleshooting

### CORS Issues
If you see CORS errors, ensure your backend allows requests from `http://localhost:3000`:

```python
# FastAPI example
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### API Not Responding
1. Check backend is running
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check browser console for errors
4. Verify API endpoint matches OpenAPI contract

### Response Not Displaying
1. Check response structure matches expected format
2. Update response extraction logic if needed
3. Check browser DevTools → Network → Response tab

## Next Steps

1. ✅ API integration complete
2. ⏳ Add message persistence (localStorage/IndexedDB)
3. ⏳ Add message timestamps display
4. ⏳ Add retry mechanism for failed requests
5. ⏳ Add request cancellation
6. ⏳ Add streaming support (if backend supports it)

