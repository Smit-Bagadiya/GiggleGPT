# GiggleGPT API Testing Guide

This guide provides multiple ways to test the GiggleGPT Chat API endpoints.

## 🚀 Quick Start

1. **Start the Django server:**
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Test the API** using any of the methods below.

## 📋 Available Test Methods

### 1. Python Test Script (Recommended)

The most comprehensive testing option with detailed output and error handling.

```bash
cd backend
python test_chat_api.py
```

**Features:**
- ✅ User registration and login
- ✅ JWT token management
- ✅ Chat API testing with authentication
- ✅ Error handling and validation
- ✅ Multiple test scenarios
- ✅ Pretty-printed responses

### 2. Curl Script (Bash)

Quick command-line testing for Unix/Linux/macOS users.

```bash
cd backend
chmod +x test_curl.sh
./test_curl.sh
```

**Features:**
- ✅ Automated testing with curl
- ✅ Color-coded output
- ✅ Token extraction and reuse
- ✅ Multiple test scenarios

### 3. Postman Collection

Import the collection for GUI-based testing.

1. Open Postman
2. Import `GiggleGPT_API.postman_collection.json`
3. Set environment variable `base_url` to `http://localhost:8000`
4. Run the requests in order

**Features:**
- ✅ Visual interface
- ✅ Automatic token management
- ✅ Request/response history
- ✅ Environment variables

### 4. Manual Curl Commands

For quick manual testing:

#### Register a user:
```bash
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

#### Login to get JWT token:
```bash
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

#### Send a chat message:
```bash
curl -X POST http://localhost:8000/api/chat/ \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello! How are you today?",
    "character_id": 1
  }'
```

## 🔧 API Endpoints

### Authentication
- `POST /api/register/` - Register a new user
- `POST /api/login/` - Login and get JWT tokens
- `POST /api/token/refresh/` - Refresh access token

### Chat
- `POST /api/chat/` - Send a chat message (requires authentication)

### Characters
- `GET /characters/` - Get all available characters

## 📝 Request/Response Examples

### Chat Request
```json
{
  "message": "Hello! How are you today?",
  "character_id": 1
}
```

### Chat Response (Success)
```json
{
  "reply": "Hello! I'm doing great, thank you for asking! How about you?"
}
```

### Chat Response (Fallback)
```json
{
  "reply": "You said: Hello! How are you today? 🤖 [Mock AI]"
}
```

### Error Response
```json
{
  "error": "message and character_id are required."
}
```

## 🧪 Test Scenarios

The test scripts cover:

1. **User Registration** - Create a new user account
2. **User Login** - Authenticate and get JWT tokens
3. **Chat with Authentication** - Send messages with valid token
4. **Chat without Authentication** - Should return 401 error
5. **Invalid Character ID** - Should return 404 error
6. **Missing Fields** - Should return 400 error
7. **Multiple Messages** - Test conversation flow

## 🔒 Security Features

- **JWT Authentication** - All chat endpoints require valid tokens
- **Environment Variables** - API keys stored securely in `.env`
- **Input Validation** - Proper error handling for invalid requests
- **Fallback Responses** - Mock responses when OpenAI is unavailable

## 🐛 Troubleshooting

### Common Issues

1. **Connection Refused**
   - Make sure Django server is running: `python manage.py runserver`

2. **Authentication Errors**
   - Ensure you're using a valid JWT token
   - Check token expiration (default: 60 minutes)

3. **Character Not Found**
   - Verify character_id exists in the database
   - Check if characters have been created via Django admin

4. **OpenAI API Errors**
   - Verify API key in `.env` file
   - Check internet connection
   - API will fallback to mock responses

### Debug Mode

Enable Django debug mode in `settings.py` for detailed error messages:

```python
DEBUG = True
```

## 📊 Expected Results

### Successful Flow
1. Register user → 201 Created
2. Login → 200 OK (with tokens)
3. Send chat → 200 OK (with AI response)

### Error Cases
1. No authentication → 401 Unauthorized
2. Invalid character → 404 Not Found
3. Missing fields → 400 Bad Request
4. Server error → 500 Internal Server Error (with fallback)

## 🎯 Next Steps

After testing the API:

1. **Connect Frontend** - Update frontend to use these endpoints
2. **Add More Characters** - Create characters via Django admin
3. **Customize Responses** - Modify character personality prompts
4. **Add Features** - Implement chat history, user preferences, etc.

## 📞 Support

If you encounter issues:

1. Check Django server logs for detailed error messages
2. Verify all dependencies are installed: `pip install -r requirements.txt`
3. Ensure database migrations are applied: `python manage.py migrate`
4. Check that the `.env` file contains the correct API key

---

Happy testing! 🚀 