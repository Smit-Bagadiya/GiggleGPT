#!/bin/bash

# GiggleGPT API Test Script using curl
# Make sure your Django server is running on http://localhost:8000

echo "🚀 GiggleGPT API Test Script"
echo "============================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:8000/api"

echo -e "${YELLOW}1. Testing User Registration...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/register/" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123"
  }')

echo "Registration Response: $REGISTER_RESPONSE"
echo ""

echo -e "${YELLOW}2. Testing User Login...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login/" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }')

echo "Login Response: $LOGIN_RESPONSE"
echo ""

# Extract access token from login response
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access":"[^"]*"' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
    echo -e "${RED}Failed to get access token. Exiting.${NC}"
    exit 1
fi

echo -e "${GREEN}Access Token: ${ACCESS_TOKEN:0:20}...${NC}"
echo ""

echo -e "${YELLOW}3. Testing Chat API with Authentication...${NC}"
CHAT_RESPONSE=$(curl -s -X POST "$BASE_URL/chat/" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello! How are you today?",
    "character_id": 1
  }')

echo "Chat Response: $CHAT_RESPONSE"
echo ""

echo -e "${YELLOW}4. Testing Chat API without Authentication (should fail)...${NC}"
NO_AUTH_RESPONSE=$(curl -s -X POST "$BASE_URL/chat/" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello! How are you today?",
    "character_id": 1
  }')

echo "No Auth Response: $NO_AUTH_RESPONSE"
echo ""

echo -e "${YELLOW}5. Testing with Invalid Character ID...${NC}"
INVALID_CHAR_RESPONSE=$(curl -s -X POST "$BASE_URL/chat/" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello! How are you today?",
    "character_id": 999
  }')

echo "Invalid Character Response: $INVALID_CHAR_RESPONSE"
echo ""

echo -e "${YELLOW}6. Testing with Missing Fields...${NC}"
MISSING_FIELDS_RESPONSE=$(curl -s -X POST "$BASE_URL/chat/" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello!"
  }')

echo "Missing Fields Response: $MISSING_FIELDS_RESPONSE"
echo ""

echo -e "${GREEN}✅ All tests completed!${NC}"
echo ""
echo "Manual curl commands for reference:"
echo "=================================="
echo ""
echo "1. Register user:"
echo "curl -X POST $BASE_URL/register/ \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"username\": \"testuser\", \"email\": \"test@example.com\", \"password\": \"testpass123\"}'"
echo ""
echo "2. Login:"
echo "curl -X POST $BASE_URL/login/ \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"username\": \"testuser\", \"password\": \"testpass123\"}'"
echo ""
echo "3. Send chat message:"
echo "curl -X POST $BASE_URL/chat/ \\"
echo "  -H \"Authorization: Bearer YOUR_TOKEN_HERE\" \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"message\": \"Hello!\", \"character_id\": 1}'" 