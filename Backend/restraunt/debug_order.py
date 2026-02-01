import requests
import json

url = 'http://127.0.0.1:8000/api/orders/'
data = {
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com",
    "phone": "0701126433",
    "address": "Test Street",
    "city": "Kampala",
    "items": [
        {"menu_item": 1, "quantity": 1}
    ]
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
