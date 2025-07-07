import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GenZButton from '../components/GenZButton';

const Welcome = () => {
  const { isAuthenticated } = useAuth();
  const characters = [
    {
      id: 1,
      name: 'Luna',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Luna',
      emoji: '🌙',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 2,
      name: 'Zorg',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Zorg',
      emoji: '🤖',
      color: 'from-cyan-400 to-blue-400'
    },
    {
      id: 3,
      name: 'GiggleBot',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=GiggleBot',
      emoji: '😄',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      id: 4,
      name: 'Wisey',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Wisey',
      emoji: '🧙‍♂️',
      color: 'from-green-400 to-teal-400'
    }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const characterVariants = {
    hover: {
      scale: 1.1,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
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

  const floatingVariants = {
    float: {
      y: [-8, 8, -8],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 py-6">
        {/* Logo/Title Section */}
        <motion.div
          className="text-center mb-6"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Logo */}
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-4 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,255,255,0.4)]"
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate="pulse"
            variants={pulseVariants}
            transition={{ duration: 0.3 }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">G</span>
          </motion.div>

          {/* Animated Title */}
          <div className="mb-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2">
              {Array.from("Welcome to GiggleGPT").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-200/90 mb-6 font-medium px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Choose your AI friend and start chatting 💬
          </motion.p>
        </motion.div>

        {/* Character Showcase */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 max-w-3xl w-full px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              className="text-center"
              variants={floatingVariants}
              animate="float"
              custom={index}
              whileHover="hover"
            >
              <motion.div
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto mb-2 rounded-full bg-gradient-to-br ${character.color} p-1 shadow-[0_0_30px_rgba(0,255,255,0.3)]`}
                variants={characterVariants}
              >
                <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  {character.emoji}
                </div>
              </motion.div>
              <motion.p
                className="text-cyan-200 font-medium text-sm sm:text-base md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                {character.name}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          {isAuthenticated ? (
            <GenZButton as={Link} to="/home" className="w-auto px-8 py-4 text-xl">
              🚀 Get Started
            </GenZButton>
          ) : (
            <>
              <GenZButton as={Link} to="/login" className="w-auto px-8 py-4 text-xl">
                🔐 Login
              </GenZButton>
              <GenZButton as={Link} to="/signup" className="w-auto px-8 py-4 text-xl">
                ✨ Sign Up
              </GenZButton>
            </>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-6 sm:mt-8 md:mt-10 text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <p className="text-cyan-200/60 text-sm sm:text-base md:text-lg">
            Ready to meet your AI bestie? 🚀
          </p>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Welcome; 