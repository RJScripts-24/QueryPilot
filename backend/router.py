# Logic to parse user text -> MongoDB Query
import os
import json
from openai import OpenAI
from dotenv import load_dotenv

# Import the actual functions from tools.py
# (We will build tools.py next, so don't run this yet!)
from tools import get_weather, run_mongo_query

# Load environment variables
load_dotenv()

# 1. Setup the Grok (xAI) Client
client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1",  # Pointing to Grok's servers
)

# 2. Define the Tools (Schema)
# This tells the LLM what functions are available and what arguments they need.
tools_schema = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather for a specific city.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "The name of the city (e.g., 'London', 'Bangalore')."
                    }
                },
                "required": ["city"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "run_mongo_query",
            "description": "Query the orders database. Use this when the user asks about sales, orders, items, or prices.",
            "parameters": {
                "type": "object",
                "properties": {
                    "filter_json": {
                        "type": "string",
                        "description": "A valid MongoDB query filter in JSON format. Example: {'price': {'$gt': 500}} or {'customer': 'Alice'}. Do NOT include 'db.collection.find', just the filter object."
                    }
                },
                "required": ["filter_json"],
            },
        },
    }
]

async def get_ai_response(user_query: str):
    """
    Main Logic:
    1. Send user query to Grok.
    2. Check if Grok wants to call a tool.
    3. If yes, execute the tool and send results back to Grok.
    4. Return the final natural language response.
    """
    
    # Message history
    messages = [
        {"role": "system", "content": "You are a helpful assistant. You have access to a database of orders and a weather tool. Always answer in clear, polite English."},
        {"role": "user", "content": user_query}
    ]

    # First Call: Ask Grok what to do
    response = client.chat.completions.create(
        model="grok-beta",  # Or 'grok-2' depending on your API access
        messages=messages,
        tools=tools_schema,
        tool_choice="auto"  # Let Grok decide whether to use a tool or not
    )

    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls

    # CASE 1: Grok wants to use a tool
    if tool_calls:
        # Append Grok's intent to the history
        messages.append(response_message)

        # Loop through all tool calls (Grok might want to call multiple tools)
        for tool_call in tool_calls:
            function_name = tool_call.function.name
            function_args = json.loads(tool_call.function.arguments)
            
            print(f"🤖 Grok decided to call: {function_name} with {function_args}")

            # Execute the actual Python code
            tool_result = ""
            
            if function_name == "get_weather":
                tool_result = get_weather(function_args.get("city"))
            
            elif function_name == "run_mongo_query":
                # The LLM gives us a string like "{'price': {'$gt': 100}}"
                # We pass it to our database tool
                filter_str = function_args.get("filter_json")
                tool_result = run_mongo_query(filter_str)

            # Send the tool result back to Grok
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": str(tool_result)
            })

        # Second Call: Get the final summary from Grok
        final_response = client.chat.completions.create(
            model="grok-beta",
            messages=messages
        )
        return final_response.choices[0].message.content

    # CASE 2: No tool needed (User just said "Hi")
    return response_message.content