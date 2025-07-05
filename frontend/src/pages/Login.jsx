import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post('/api/login/', {
        username: formData.username,
        password: formData.password
      });
      
      // Store the tokens and update auth context
      login(response.data.access, response.data.refresh);
      
      // Navigate to original destination or homepage
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
      
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 30px rgba(0, 255, 255, 0.4)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Title */}
          <motion.div
            className="text-center mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.3)]"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-3xl font-bold text-white">G</span>
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              GiggleGPT
            </h1>
            <p className="text-cyan-200/80 text-lg">Welcome back, friend! 👋</p>
          </motion.div>

          {/* Glass container */}
          <motion.div
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username field */}
              <motion.div variants={itemVariants}>
                <label className="block text-cyan-200 text-sm font-medium mb-2">
                  Username
                </label>
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                >
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your username"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              </motion.div>

              {/* Password field */}
              <motion.div variants={itemVariants}>
                <label className="block text-cyan-200 text-sm font-medium mb-2">
                  Password
                </label>
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                >
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              </motion.div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-400/30 rounded-xl p-3 text-red-200 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Forgot password link */}
              <motion.div
                className="text-right"
                variants={itemVariants}
              >
                <a
                  href="#"
                  className="text-cyan-300 hover:text-cyan-200 text-sm transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </motion.div>

              {/* Login button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-xl shadow-[0_4px_20px_rgba(0,255,255,0.3)] hover:shadow-[0_8px_30px_rgba(0,255,255,0.5)] transition-all duration-300 relative overflow-hidden group"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </span>
                </motion.button>
              </motion.div>

              {/* Sign up link */}
              <motion.div
                className="text-center pt-4"
                variants={itemVariants}
              >
                <p className="text-cyan-200/80">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-cyan-300 hover:text-cyan-200 font-medium transition-colors duration-200"
                  >
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </form>
          </motion.div>

          {/* Back to home link */}
          <motion.div
            className="text-center mt-6"
            variants={itemVariants}
          >
            <Link
              to="/"
              className="text-cyan-200/60 hover:text-cyan-200 text-sm transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 