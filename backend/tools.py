
import json
from database import orders_collection

def get_weather(city: str):
    """
    Fetches real weather data from WeatherAPI.com for the given city.
    """
    import requests
    api_key = "285f4396c7bf4d38b65164750250612"
    url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}"
    print(f"[DEBUG] Calling weather API for city: {city}")
    print(f"[DEBUG] URL: {url}")
    try:
        response = requests.get(url, timeout=5)
        print(f"[DEBUG] Weather API status code: {response.status_code}")
        response.raise_for_status()
        data = response.json()
        print(f"[DEBUG] Weather API response: {data}")
        location = data.get("location", {}).get("name", city)
        temp_c = data.get("current", {}).get("temp_c", "N/A")
        condition = data.get("current", {}).get("condition", {}).get("text", "N/A")
        result = f"The weather in {location} is {temp_c}°C and {condition}."
        print(f"[DEBUG] Weather result: {result}")
        return result
    except Exception as e:
        error_msg = f"Could not fetch weather for {city}. Error: {str(e)}"
        print(f"[ERROR] {error_msg}")
        return error_msg

def run_mongo_query(filter_json: str):
    """
    Executes a MongoDB query based on a JSON filter string provided by the LLM.
    """
    try:
        
        query_filter = json.loads(filter_json)
        print(f"🔍 Executing MongoDB Query: {query_filter}")

        
        def make_case_insensitive(d):
            if isinstance(d, dict):
                new_d = {}
                for k, v in d.items():
                    
                    if isinstance(v, str):
                        new_d[k] = {"$regex": f"^{v}$", "$options": "i"}
                    
                    elif isinstance(v, dict):
                        new_d[k] = make_case_insensitive(v)
                    
                    elif isinstance(v, list):
                        new_d[k] = [make_case_insensitive(i) for i in v]
                    else:
                        new_d[k] = v
                return new_d
            return d

        query_filter = make_case_insensitive(query_filter)

        
        results = list(orders_collection.find(query_filter, {"_id": 0}))
        
        if not results:
            return "No orders found matching that criteria."

        
        def format_price(order):
            price = order.get('price', 'N/A')
            currency = order.get('currency', 'INR')
            if currency == 'INR':
                return f"₹{price}"
            else:
                return f"{currency} {price}"

        if len(results) == 1:
            order = results[0]
            summary = f"Order {order.get('order_id', '')} for {order.get('customer', 'a customer')} is a {order.get('item', 'product')} priced at {format_price(order)}, status: {order.get('status', 'unknown')}."
            return summary
        elif len(results) <= 5:
            summary_lines = []
            for order in results:
                summary_lines.append(f"Order {order.get('order_id', '')}: {order.get('customer', 'Customer')} ordered a {order.get('item', 'product')} for {format_price(order)} (Status: {order.get('status', 'unknown')})")
            return "Here are the matching orders: " + "; ".join(summary_lines)
        else:
            order = results[0]
            return f"Found {len(results)} orders matching your criteria. For example, order {order.get('order_id', '')} is for {order.get('customer', 'a customer')} ({order.get('item', 'product')}, {format_price(order)}, status: {order.get('status', 'unknown')})."

    except json.JSONDecodeError:
        return "Error: Invalid JSON format provided by the router."
    except Exception as e:
        return f"Database Error: {str(e)}"