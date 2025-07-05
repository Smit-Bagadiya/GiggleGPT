# 🎉 GiggleGPT - AI Chat App

A modern, Gen-Z themed AI chat application built with React, Django, and JWT authentication. Chat with AI characters in a beautiful, animated interface!

## ✨ Features

- **🤖 AI Characters**: Chat with Luna, Zorg, GiggleBot, and Wisey
- **🔐 JWT Authentication**: Secure login/signup system
- **🎨 Beautiful UI**: Glassmorphism design with neon effects
- **📱 Responsive**: Works perfectly on all devices
- **⚡ Real-time Chat**: Instant AI responses
- **🎭 Animations**: Smooth Framer Motion animations
- **🛡️ Protected Routes**: Secure access to chat features

## 🚀 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API calls
- **React Router** for navigation

### Backend
- **Django 5.2** with REST Framework
- **JWT Authentication** with SimpleJWT
- **OpenAI API** integration
- **SQLite** database (can be upgraded to PostgreSQL)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Smit-Bagadiya/GiggleGPT.git
   cd GiggleGPT
   ```

2. **Set up Python environment**
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   SECRET_KEY=your-django-secret-key
   OPENAI_API_KEY=your-openai-api-key
   DEBUG=True
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the backend server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

1. **Visit the welcome page**: `http://localhost:5173/`
2. **Sign up or login** to access the chat features
3. **Choose an AI character** from the home page
4. **Start chatting** with your AI friend!

## 📁 Project Structure

```
gigglegpt/
├── backend/                 # Django backend
│   ├── characters/         # Character models and API
│   ├── chat/              # Chat functionality
│   ├── users/             # User authentication
│   ├── core/              # Django settings
│   └── manage.py
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   └── utils/         # Utility functions
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/login/` - User login
- `POST /api/register/` - User registration
- `POST /api/token/refresh/` - Refresh JWT token

### Characters
- `GET /api/characters/` - Get all characters (protected)

### Chat
- `POST /api/chat/` - Send message to AI (protected)

## 🎨 Design Features

- **Glassmorphism**: Translucent glass effects
- **Neon Gradients**: Cyan, purple, and pink color scheme
- **Floating Animations**: Subtle character movements
- **Responsive Design**: Mobile-first approach
- **Smooth Transitions**: Framer Motion animations

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Client-side route protection
- **Token Refresh**: Automatic token renewal
- **Session Management**: Secure session handling

## 🚀 Deployment

### Backend (Django)
1. Set `DEBUG=False` in settings
2. Configure production database (PostgreSQL recommended)
3. Set up environment variables
4. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend (React)
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Update API endpoints to production URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Framer Motion for animations
- Tailwind CSS for styling
- Django REST Framework for API

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Made with ❤️ by Smit Bagadiya** 