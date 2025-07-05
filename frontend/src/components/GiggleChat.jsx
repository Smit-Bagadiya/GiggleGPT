import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialMessages = [
  { id: 1, text: "Hey! I'm Giggle 🤖✨", sender: "character" },
  { id: 2, text: "Tell me something fun!", sender: "user" },
];

const bubbleVariants = {
  hidden: (isUser) => ({
    opacity: 0,
    x: isUser ? 60 : -60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 pl-2 pb-2">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className={`w-2 h-2 bg-blue-400 rounded-full animate-bounce`}
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
  </div>
);

export default function GiggleGPTChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Handle sending a message
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "user",
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text, character_id: 1 }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now() + 1,
          text: data.reply || "(No reply)",
          sender: "character",
        },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now() + 2,
          text: "Oops! Something went wrong. Try again later.",
          sender: "character",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold text-lg shadow">
        <span className="w-10 h-10 flex items-center justify-center text-2xl bg-white/80 rounded-full shadow">🤖</span>
        <span>GiggleGPT</span>
      </div>
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-4 flex flex-col">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <motion.div
                key={msg.id}
                className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}
                custom={isUser}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={bubbleVariants}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl shadow text-base break-words
                    ${isUser
                      ? "bg-gradient-to-br from-blue-400 to-purple-400 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-blue-100"
                    }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            );
          })}
          {isThinking && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex mb-3 justify-start"
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      {/* Input area */}
      <div className="flex items-center px-4 py-3 bg-white border-t border-blue-100">
        <input
          className="flex-1 rounded-full px-4 py-2 border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-base bg-blue-50 placeholder:text-blue-300"
          type="text"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={isThinking}
        />
        <button
          className="ml-3 p-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-white shadow-lg hover:shadow-xl focus:outline-none transition-transform active:scale-95"
          onClick={handleSend}
          disabled={isThinking}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l18-9-18-9v7l15 2-15 2v7z" />
          </svg>
        </button>
      </div>
    </div>
  );
} 