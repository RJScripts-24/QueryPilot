# Connects & Seeds dummy data if empty
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# 1. Load environment variables from .env file
load_dotenv()

# 2. Get the URI
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("No MONGO_URI found in .env file. Please check your setup.")

# 3. Connect to MongoDB Atlas
# tlsAllowInvalidCertificates=True is sometimes needed for dev environments, 
# but try without it first if you prefer strict security.
try:
    client = MongoClient(MONGO_URI)
    
    # Send a ping to confirm a successful connection
    client.admin.command('ping')
    print("✅ Successfully connected to MongoDB Atlas!")
    
except Exception as e:
    print(f"❌ Could not connect to MongoDB: {e}")
    raise e

# 4. Define Database and Collection
db = client["ai_agent_db"]       # The database name
orders_collection = db["orders"] # The collection (like a table) name

# 5. Seeding Function (Adds dummy data if empty)
def init_db():
    """
    Checks if the database is empty. If yes, adds 5 dummy orders.
    """
    if orders_collection.count_documents({}) == 0:
        print("⚠️ Database is empty. Seeding with dummy data...")
        
        dummy_data = [
            {"order_id": 101, "customer": "Alice", "item": "Laptop", "price": 1200, "status": "Shipped"},
            {"order_id": 102, "customer": "Bob", "item": "Smartphone", "price": 800, "status": "Processing"},
            {"order_id": 103, "customer": "Charlie", "item": "Headphones", "price": 150, "status": "Delivered"},
            {"order_id": 104, "customer": "Diana", "item": "Monitor", "price": 300, "status": "Shipped"},
            {"order_id": 105, "customer": "Evan", "item": "Keyboard", "price": 50, "status": "Delivered"}
        ]
        
        orders_collection.insert_many(dummy_data)
        print("✅ Dummy data inserted successfully!")
    else:
        print("ℹ️ Database already has data. Skipping seed.")

# Run initialization when this file is imported
init_db()