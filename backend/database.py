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
    print("♻️ Clearing and reseeding the orders collection with dummy data...")
    orders_collection.delete_many({})
    dummy_data = [
        {"order_id": 201, "customer": "Amit", "item": "Laptop", "price": 65000, "currency": "INR", "status": "Shipped"},
        {"order_id": 202, "customer": "Priya", "item": "Smartphone", "price": 25000, "currency": "INR", "status": "Processing"},
        {"order_id": 203, "customer": "Rahul", "item": "Headphones", "price": 3000, "currency": "INR", "status": "Delivered"},
        {"order_id": 204, "customer": "Sneha", "item": "Monitor", "price": 12000, "currency": "INR", "status": "Shipped"},
        {"order_id": 205, "customer": "Vikram", "item": "Keyboard", "price": 1500, "currency": "INR", "status": "Delivered"},
        {"order_id": 206, "customer": "Anjali", "item": "Mouse", "price": 800, "currency": "INR", "status": "Processing"},
        {"order_id": 207, "customer": "Rohan", "item": "Webcam", "price": 2500, "currency": "INR", "status": "Delivered"},
        {"order_id": 208, "customer": "Meera", "item": "Printer", "price": 9000, "currency": "INR", "status": "Shipped"},
        {"order_id": 209, "customer": "Arjun", "item": "Tablet", "price": 18000, "currency": "INR", "status": "Processing"},
        {"order_id": 210, "customer": "Kavita", "item": "Speaker", "price": 3500, "currency": "INR", "status": "Delivered"}
    ]
    orders_collection.insert_many(dummy_data)
    print("✅ Dummy data inserted successfully!")

# Run initialization when this file is imported
init_db()