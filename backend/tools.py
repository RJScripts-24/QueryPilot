# Connects to Atlas to run the query
import json
from database import orders_collection

def get_weather(city: str):
    """
    Mocks a weather API. Returns a hardcoded string based on the city.
    """
    # Normalize input to handle "London", "london", "LONDON" etc.
    city_lower = city.lower().strip()
    
    if "new york" in city_lower:
        return f"The weather in {city} is 20°C and Cloudy."
    elif "bangalore" in city_lower:
        return f"The weather in {city} is 28°C and Sunny."
    elif "san francisco" in city_lower:
        return f"The weather in {city} is 16°C with Fog."
    elif "london" in city_lower:
        return f"The weather in {city} is 12°C and Rainy."
    else:
        # Default mock response for unknown cities
        return f"The weather in {city} is 22°C and Clear skies."

def run_mongo_query(filter_json: str):
    """
    Executes a MongoDB query based on a JSON filter string provided by the LLM.
    """
    try:
        # 1. Parse the stringified JSON from Grok into a real Python Dictionary
        # Example input: '{"price": {"$gt": 500}}' -> Python Dict
        query_filter = json.loads(filter_json)
        
        print(f"🔍 Executing MongoDB Query: {query_filter}")
        
        # 2. Run the query
        # We exclude '_id' because it's an ObjectId type which isn't JSON serializable by default
        results = list(orders_collection.find(query_filter, {"_id": 0}))
        
        # 3. Handle empty results
        if not results:
            return "No orders found matching that criteria."
            
        # 4. Return results as a string so the LLM can read it
        return str(results)

    except json.JSONDecodeError:
        return "Error: Invalid JSON format provided by the router."
    except Exception as e:
        return f"Database Error: {str(e)}"