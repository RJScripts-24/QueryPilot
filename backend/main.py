# Entry point for backend
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uvicorn

# Import the database initialization function
from database import init_db

# Import the AI routing logic (We will create this file next!)
# If you run this now, it will fail because 'router.py' doesn't exist yet.
from router import get_ai_response

# 1. Initialize the App
app = FastAPI(title="AI Agent Router")

# 2. Setup CORS (Cross-Origin Resource Sharing)
# This allows your React Frontend (running on port 5173) to talk to this Python Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Define the Input Format
# This ensures the user sends JSON like: {"query": "What is the weather?"}
class UserRequest(BaseModel):
    query: str

# 4. Startup Event
# When the server starts, we make sure the DB is connected and seeded.
@app.on_event("startup")
def on_startup():
    print("🚀 Server is starting up...")
    try:
        init_db()
    except Exception as e:
        print(f"⚠️ Database warning: {e}")

# 5. The Chat Endpoint
@app.post("/chat")
async def chat_endpoint(request: UserRequest):
    """
    Receives a user query, passes it to the AI Router, and returns the result.
    """
    try:
        user_query = request.query
        print(f"📩 Received Query: {user_query}")
        # Call the "Brain" (Router)
        # This function will handle the Grok API and Tool calls
        response_text = await get_ai_response(user_query)
        # Fallback if response is empty or None
        if not response_text or not str(response_text).strip():
            response_text = "Sorry, I didn't understand that. Could you please rephrase?"
        return {"response": response_text}
    except Exception as e:
        print(f"❌ Error processing request: {e}")
        # Always return a friendly message instead of error
        return {"response": "Sorry, I couldn't process your request. Please try again or ask something else!"}

# 6. Run the server (Optional: only if running via 'python main.py')
if __name__ == "__main__":
    # 6. Run the server (Allows running with 'python main.py')
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)