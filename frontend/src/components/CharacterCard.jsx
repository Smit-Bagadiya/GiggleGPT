import React from 'react';
import { motion } from 'framer-motion';

const DEFAULT_AVATAR = '/default-avatar.svg';

const CharacterCard = ({ character, onClick }) => {
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_AVATAR;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-white/10 backdrop-blur-lg border border-cyan-400/30 shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-cyan-400/40 rounded-3xl flex flex-col items-center cursor-pointer transition-all duration-300 p-6 m-2 min-w-[200px] min-h-[260px] group w-full max-w-xs mx-auto"
      onClick={onClick}
      style={{}}
    >
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-24 h-24 rounded-full border-4 border-cyan-400 shadow-md flex items-center justify-center bg-black/40">
          <img
            src={character.avatar}
            alt={character.name}
            className="w-20 h-20 object-contain rounded-full mx-auto drop-shadow-lg"
            onError={handleImgError}
            loading="lazy"
          />
        </div>
      </div>
      <div className="text-2xl font-extrabold text-cyan-300 text-center mb-1 drop-shadow-sm">
        {character.name}
      </div>
      <div className="text-base text-cyan-300/80 text-center font-medium mb-2">
        {character.description}
      </div>
    </motion.div>
  );
};

export default CharacterCard; 