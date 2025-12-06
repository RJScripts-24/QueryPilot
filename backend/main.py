
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uvicorn


from database import init_db


from router import get_ai_response


app = FastAPI(title="AI Agent Router")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserRequest(BaseModel):
    query: str


@app.on_event("startup")
def on_startup():
    print("🚀 Server is starting up...")
    try:
        init_db()
    except Exception as e:
        print(f"⚠️ Database warning: {e}")


@app.post("/chat")
async def chat_endpoint(request: UserRequest):
    """
    Receives a user query, passes it to the AI Router, and returns the result.
    """
    try:
        user_query = request.query
        print(f"📩 Received Query: {user_query}")
       
        response_text, _ = await get_ai_response(user_query)
        
        if not response_text or not str(response_text).strip():
            response_text = "Sorry, I didn't understand that. Could you please rephrase?"
        return {"response": response_text}
    except Exception as e:
        print(f"❌ Error processing request: {e}")
        
        return {"response": "Sorry, I couldn't process your request. Please try again or ask something else!"}


if __name__ == "__main__":
    
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)