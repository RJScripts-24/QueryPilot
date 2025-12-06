

  # QueryPilot: AI Routing System

  QueryPilot is a full-stack AI-powered chatbot system that demonstrates an LLM-driven routing architecture. It integrates a React/Next.js frontend with a FastAPI backend, a real MongoDB database, and external APIs (like weather). The system always returns a clean, human-readable English answer to any user query.

  ---

  ##  Project Flow

  1. **User Input (Frontend)**
    - The user enters a natural-language query in the chat interface (Next.js/React).
    - The frontend sends this query to the backend `/chat` API endpoint.

  2. **LLM Routing (Backend)**
    - The FastAPI backend receives the query and forwards it to an LLM (Groq API).
    - The LLM returns structured instructions indicating which tool to use (e.g., weather, database) and with what parameters.

  3. **MCP Router**
    - The backend interprets the LLM's instructions and dispatches the request to the correct tool:
      - **Weather Tool:** Fetches real weather data for a city.
      - **Database Tool:** Converts natural language to a MongoDB query, runs it, and summarizes the result in English.

  4. **English Output**
    - The backend always returns a single, aggregated English statement (never raw data, SQL, or debug info).
    - The frontend displays this response in the chat UI.

  ---

  ##  API Contract-First Integration

  An OpenAPI contract (`openapi.json`) was defined before development. This ensured both frontend and backend were aligned on request/response formats, enabling rapid, error-free integration.

  ---

  ##  Setup Instructions

  ### Prerequisites
  - Node.js (for frontend)
  - Python 3.8+ (for backend)
  - MongoDB Atlas account (or local MongoDB)

  ### 1. Backend Setup
  1. `cd backend`
  2. Create a `.env` file with your MongoDB URI and Groq API key:
    ```env
    MONGO_URI=your_mongodb_uri
    GROQ_API_KEY=your_groq_api_key
    ```
  3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
  4. Start the backend server:
    ```bash
    uvicorn main:app --reload
    ```

  ### 2. Frontend Setup
  1. `cd frontend`
  2. Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```
  3. Install dependencies:
    ```bash
    npm install
    ```
  4. Start the frontend:
    ```bash
    npm run dev
    ```

  ---

  ##  Example Queries

  - "Tell me the weather in Delhi."
  - "How many orders over 5000 INR?"
  - "List all delivered items."

  ---

  ##  Notes
  - The backend seeds the database with at least 5 sample records on startup.
  - All responses are clean English statements—no raw SQL, dumps, or debug info.
  - The API contract (`openapi.json`) is the single source of truth for integration.

  ---

  For more details, see the code and comments in each folder.
