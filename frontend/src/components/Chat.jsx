import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { characters } from '../characters';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/axios';

const SEND_SOUND = '/sounds/send.mp3';
const RECEIVE_SOUND = '/sounds/receive.mp3';

const TypingDots = () => (
  <div className="flex items-center gap-1">
    <span className="inline-block w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="inline-block w-2 h-2 bg-cyan-200 rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
    <span className="inline-block w-2 h-2 bg-cyan-100 rounded-full animate-bounce" style={{ animationDelay: '240ms' }} />
  </div>
);

const Chat = () => {
  const { id } = useParams();
  const characterId = parseInt(id, 10);
  const character = characters.find((c) => parseInt(c.id, 10) === characterId);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hi! I'm ${character?.name}. ${character?.description}`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  // Optional: sound toggle
  // const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const playSound = (src) => {
    // if (!soundOn) return;
    try {
      const audio = new Audio(src);
      audio.volume = 0.25;
      audio.play().catch(err => {
        console.log('Sound playback failed:', err);
      });
    } catch (err) {
      console.log('Sound loading failed:', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setError('');
    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    playSound(SEND_SOUND);
    try {
      const requestBody = {
        message: userMsg.text,
        character_id: characterId,
      };
      console.log('Sending request with body:', requestBody);
      console.log('Character ID type:', typeof characterId, 'Value:', characterId);
      const res = await api.post('/api/chat/', requestBody);
      setMessages((msgs) => {
        playSound(RECEIVE_SOUND);
        return [
          ...msgs,
          { sender: 'ai', text: res.data.reply || '...' },
        ];
      });
    } catch (err) {
      console.error('Error sending message:', err.response?.data || err.message);
      setMessages((msgs) => [
        ...msgs,
        { sender: 'ai', text: 'Sorry, something went wrong.' },
      ]);
      setError(`Failed to send message: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  if (!character) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0f0c29] to-[#24243e]">
        <div className="text-xl font-bold text-cyan-300">Character not found. Please return to the homepage and select a valid character.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-[#0f0c29] to-[#24243e]">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md shadow-md border-b border-cyan-400/20">
        <img
          src={character.avatar}
          alt={character.name}
          className="w-14 h-14 rounded-full border-2 border-cyan-400 shadow-md"
        />
        <div>
          <div className="text-xl font-bold text-cyan-300">{character.name}</div>
          <div className="text-sm text-cyan-200/80">{character.description}</div>
        </div>
      </div>
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-2 py-4 flex flex-col gap-2 md:gap-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.25, type: 'spring', stiffness: 120 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80vw] md:max-w-xl px-5 py-3 rounded-2xl text-base break-words shadow-lg backdrop-blur-lg border
                  ${msg.sender === 'user'
                    ? 'bg-purple-600/20 text-purple-100 border-purple-400/20'
                    : 'bg-cyan-600/10 text-cyan-100 border-cyan-400/30 shadow-[0_0_16px_2px_rgba(0,255,255,0.12)]'}
                  ${msg.sender === 'user' ? 'rounded-br-md' : 'rounded-bl-md'}
                `}
                style={{
                  boxShadow:
                    msg.sender === 'ai'
                      ? '0 0 20px 2px rgba(0,255,255,0.12), 0 2px 8px 0 rgba(0,0,0,0.12)'
                      : undefined,
                }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.25, type: 'spring', stiffness: 120 }}
              className="flex justify-start"
            >
              <div className="max-w-[80vw] md:max-w-xl px-5 py-3 rounded-2xl bg-cyan-600/10 text-cyan-100 border border-cyan-400/30 shadow-[0_0_16px_2px_rgba(0,255,255,0.12)] backdrop-blur-lg rounded-bl-md flex items-center gap-3 animate-pulse">
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      {/* Input Bar */}
      <form
        onSubmit={sendMessage}
        className="sticky bottom-0 left-0 w-full z-20 bg-transparent flex justify-center"
        autoComplete="off"
        style={{ backdropFilter: 'none' }}
      >
        <div className="flex w-full max-w-2xl gap-2 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg mx-2 mb-2">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 px-4 py-2 rounded-xl border border-white/20 bg-transparent text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            placeholder={`Message ${character.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) sendMessage(e); }}
            autoComplete="off"
          />
          <button
            type="submit"
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200
              ${loading ? 'bg-cyan-900 cursor-not-allowed text-gray-400' : 'bg-cyan-500 hover:bg-cyan-400 text-white'}`}
            disabled={loading || !input.trim()}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
      {error && (
        <div className="text-red-400 text-center py-2 bg-white/10 rounded-xl mx-auto w-full max-w-md mt-2 mb-4 z-30 relative">
          {error}
        </div>
      )}
    </div>
  );
};

export default Chat; 