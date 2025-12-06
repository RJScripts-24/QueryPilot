
import os
import json
from openai import OpenAI
from dotenv import load_dotenv


from tools import get_weather, run_mongo_query



load_dotenv()
print(f"[DEBUG] GROQ_API_KEY loaded: {os.getenv('GROQ_API_KEY')}")


client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",  
)


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
            "description": "Query the orders database. Use this when the user asks about sales, orders, items, or prices. IMPORTANT: Always provide the filter_json parameter as a stringified JSON (not an object). For example, use '{\"price\": {\"$gt\": 500}}' not {\"price\": {\"$gt\": 500}}.",
            "parameters": {
                "type": "object",
                "properties": {
                    "filter_json": {
                        "type": "string",
                        "description": "A valid MongoDB query filter as a stringified JSON. Example: '{\"price\": {\"$gt\": 500}}' or '{\"customer\": \"Alice\"}'. Do NOT include 'db.collection.find', just the filter object as a string."
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
    logs = []
   
    messages = [
        {"role": "system", "content": "You are a helpful assistant. You have access to a database of orders and a weather tool. Always answer in clear, polite English."},
        {"role": "user", "content": user_query}
    ]

    try:
        
        print(f"[DEBUG] Sending request to Groq with query: {user_query}")
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  
            messages=messages,
            tools=tools_schema,
            tool_choice="auto"  
        )
        print(f"[DEBUG] Groq response received")
    except Exception as e:
        print(f"[ERROR] Failed to get response from Groq: {e}")
        return f"Sorry, there was an error communicating with the AI service: {str(e)}", logs

    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls
    print(f"[DEBUG] Tool calls: {tool_calls}")

    
    if tool_calls:
        
        messages.append(response_message)
        
        for tool_call in tool_calls:
            try:
                function_name = tool_call.function.name
                function_args = json.loads(tool_call.function.arguments)
                log_entry = f"🤖 Grok called: {function_name} with {function_args}"
                print(log_entry)
                logs.append(log_entry)
                tool_result = ""
                if function_name == "get_weather":
                    city = function_args.get("city")
                    print(f"[DEBUG] Calling get_weather with city: {city}")
                    result = get_weather(city)
                    logs.append(f"Weather API result for {city}: {result}")
                    tool_result = json.dumps({"result": result})
                elif function_name == "run_mongo_query":
                    filter_str = function_args.get("filter_json")
                    logs.append(f"MongoDB Query filter: {filter_str}")
                    result = run_mongo_query(filter_str)
                    logs.append(f"MongoDB Query result: {result}")
                    tool_result = json.dumps({"result": result})
            except Exception as e:
                print(f"[ERROR] Error processing tool call: {e}")
                tool_result = json.dumps({"result": f"Error: {str(e)}"})
            
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": tool_result
            })
        
        try:
            print(f"[DEBUG] Sending tool results back to Groq")
            final_response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages
            )
            content = final_response.choices[0].message.content
            print(f"[DEBUG] Final response from Groq: {content}")
            if not content or not str(content).strip():
                return "Sorry, I couldn't find an answer to your question. Please try rephrasing or ask something else!", logs
            return content, logs
        except Exception as e:
            print(f"[ERROR] Failed to get final response from Groq: {e}")
            return f"Sorry, there was an error getting the final response: {str(e)}", logs

    
    content = response_message.content
    if not content or not str(content).strip():
        return "Sorry, I didn't understand that. Could you please rephrase?", logs
    return content, logs