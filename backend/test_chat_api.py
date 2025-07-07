#!/usr/bin/env python3
"""
Test script for the GiggleGPT Chat API
This script demonstrates how to:
1. Register a user
2. Login to get JWT tokens
3. Send chat messages to the API
4. Handle responses and errors
"""

import requests
import json
import sys

# API base URL
BASE_URL = "http://localhost:8000/api"

def print_response(response, title="Response"):
    """Pretty print API responses"""
    print(f"\n{'='*50}")
    print(f"{title}")
    print(f"{'='*50}")
    print(f"Status Code: {response.status_code}")
    print(f"Headers: {dict(response.headers)}")
    try:
        print(f"JSON Response: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Text Response: {response.text}")
    print(f"{'='*50}\n")

def test_user_registration():
    """Test user registration"""
    print("Testing User Registration...")
    
    register_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpass123"
    }
    
    response = requests.post(f"{BASE_URL}/register/", json=register_data)
    print_response(response, "Registration Response")
    return response.status_code == 201

def test_user_login():
    """Test user login and get JWT tokens"""
    print("Testing User Login...")
    
    login_data = {
        "username": "testuser",
        "password": "testpass123"
    }
    
    response = requests.post(f"{BASE_URL}/login/", json=login_data)
    print_response(response, "Login Response")
    
    if response.status_code == 200:
        tokens = response.json()
        return tokens.get('access')
    return None

def test_chat_with_auth(access_token, character_id=1):
    """Test chat API with authentication"""
    print("Testing Chat API with Authentication...")
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    chat_data = {
        "message": "Hello! How are you today?",
        "character_id": character_id
    }
    
    response = requests.post(f"{BASE_URL}/chat/", json=chat_data, headers=headers)
    print_response(response, "Chat Response (Authenticated)")
    return response.status_code == 200

def test_chat_without_auth():
    """Test chat API without authentication (should fail)"""
    print("Testing Chat API without Authentication (should fail)...")
    
    chat_data = {
        "message": "Hello! How are you today?",
        "character_id": 1
    }
    
    response = requests.post(f"{BASE_URL}/chat/", json=chat_data)
    print_response(response, "Chat Response (No Auth)")
    return response.status_code == 401

def test_invalid_character():
    """Test chat API with invalid character ID"""
    print("Testing Chat API with Invalid Character ID...")
    
    # First get a valid token
    access_token = test_user_login()
    if not access_token:
        print("Failed to get access token for invalid character test")
        return False
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    chat_data = {
        "message": "Hello! How are you today?",
        "character_id": 999  # Invalid character ID
    }
    
    response = requests.post(f"{BASE_URL}/chat/", json=chat_data, headers=headers)
    print_response(response, "Chat Response (Invalid Character)")
    return response.status_code == 404

def test_missing_fields():
    """Test chat API with missing required fields"""
    print("Testing Chat API with Missing Fields...")
    
    # First get a valid token
    access_token = test_user_login()
    if not access_token:
        print("Failed to get access token for missing fields test")
        return False
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    # Test missing message
    chat_data = {
        "character_id": 1
    }
    
    response = requests.post(f"{BASE_URL}/chat/", json=chat_data, headers=headers)
    print_response(response, "Chat Response (Missing Message)")
    
    # Test missing character_id
    chat_data = {
        "message": "Hello!"
    }
    
    response = requests.post(f"{BASE_URL}/chat/", json=chat_data, headers=headers)
    print_response(response, "Chat Response (Missing Character ID)")
    
    return True

def main():
    """Run all tests"""
    print("🚀 GiggleGPT Chat API Test Suite")
    print("Make sure your Django server is running on http://localhost:8000")
    print("Press Enter to continue...")
    input()
    
    # Test 1: Registration
    registration_success = test_user_registration()
    
    # Test 2: Login
    access_token = test_user_login()
    
    # Test 3: Chat without auth (should fail)
    test_chat_without_auth()
    
    # Test 4: Chat with auth
    if access_token:
        chat_success = test_chat_with_auth(access_token)
        
        # Test 5: Invalid character
        test_invalid_character()
        
        # Test 6: Missing fields
        test_missing_fields()
        
        # Test 7: Multiple chat messages
        print("Testing Multiple Chat Messages...")
        messages = [
            "What's your favorite color?",
            "Tell me a joke!",
            "How do you feel about AI?",
            "What's the weather like?"
        ]
        
        for i, message in enumerate(messages, 1):
            print(f"\n--- Message {i}: {message} ---")
            chat_data = {
                "message": message,
                "character_id": 1
            }
            
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }
            
            response = requests.post(f"{BASE_URL}/chat/", json=chat_data, headers=headers)
            if response.status_code == 200:
                reply = response.json().get('reply', 'No reply received')
                print(f"AI Reply: {reply}")
            else:
                print(f"Error: {response.status_code} - {response.text}")
    
    print("\n✅ Test suite completed!")
    print("\nTo test manually with curl:")
    print("1. Get token:")
    print('   curl -X POST http://localhost:8000/api/login/ \\')
    print('        -H "Content-Type: application/json" \\')
    print('        -d \'{"username": "testuser", "password": "testpass123"}\'')
    print("\n2. Send chat message:")
    print('   curl -X POST http://localhost:8000/api/chat/ \\')
    print('        -H "Authorization: Bearer YOUR_TOKEN_HERE" \\')
    print('        -H "Content-Type: application/json" \\')
    print('        -d \'{"message": "Hello!", "character_id": 1}\'')

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nTest interrupted by user")
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to Django server.")
        print("Make sure your Django server is running with: python manage.py runserver")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        sys.exit(1) 