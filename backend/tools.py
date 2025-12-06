# Connects to Atlas to run the query
import json
from database import orders_collection

def get_weather(city: str):
    """
    Mocks a weather API. Returns a hardcoded string based on the city.
    """
    # Normalize input to handle "London", "london", "LONDON" etc.
    city_lower = city.lower().strip()
    # Support for alternate spellings and names
    if "new york" in city_lower:
        return f"The weather in {city} is 20°C and Cloudy."
    elif "bangalore" in city_lower or "bengaluru" in city_lower:
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
        query_filter = json.loads(filter_json)
        print(f"🔍 Executing MongoDB Query: {query_filter}")

        # 1.5. Make string equality filters case-insensitive using regex
        def make_case_insensitive(d):
            if isinstance(d, dict):
                new_d = {}
                for k, v in d.items():
                    # If value is a string, convert to regex for case-insensitive match
                    if isinstance(v, str):
                        new_d[k] = {"$regex": f"^{v}$", "$options": "i"}
                    # If value is a dict (e.g., $gt, $lt), recurse
                    elif isinstance(v, dict):
                        new_d[k] = make_case_insensitive(v)
                    # If value is a list, recurse
                    elif isinstance(v, list):
                        new_d[k] = [make_case_insensitive(i) for i in v]
                    else:
                        new_d[k] = v
                return new_d
            return d

        query_filter = make_case_insensitive(query_filter)

        # 2. Run the query
        results = list(orders_collection.find(query_filter, {"_id": 0}))
        # 3. Handle empty results
        if not results:
            return "No orders found matching that criteria."

        # 4. Summarize results in natural English
        # Try to infer the type of query and summarize accordingly
        # Example: count, list, or details
        if len(results) == 1:
            order = results[0]
            summary = f"Order {order.get('order_id', '')} for {order.get('customer', 'a customer')} is a {order.get('item', 'product')} priced at ${order.get('price', 'N/A')}, status: {order.get('status', 'unknown')}."
            return summary
        elif len(results) <= 5:
            summary_lines = []
            for order in results:
                summary_lines.append(f"Order {order.get('order_id', '')}: {order.get('customer', 'Customer')} ordered a {order.get('item', 'product')} for ${order.get('price', 'N/A')} (Status: {order.get('status', 'unknown')})")
            return "Here are the matching orders: " + "; ".join(summary_lines)
        else:
            return f"Found {len(results)} orders matching your criteria. For example, order {results[0].get('order_id', '')} is for {results[0].get('customer', 'a customer')} ({results[0].get('item', 'product')}, ${results[0].get('price', 'N/A')}, status: {results[0].get('status', 'unknown')})."

    except json.JSONDecodeError:
        return "Error: Invalid JSON format provided by the router."
    except Exception as e:
        return f"Database Error: {str(e)}"