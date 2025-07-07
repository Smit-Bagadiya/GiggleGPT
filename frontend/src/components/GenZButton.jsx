import React from 'react';
import { motion } from 'framer-motion';

const spring = {
  type: 'spring',
  stiffness: 400,
  damping: 20,
};

const GenZButton = ({
  children,
  onClick,
  type = 'button',
  className = '',
  loading = false,
  as: Component = 'button',
  ...props
}) => {
  const MotionComponent = motion(Component);
  return (
    <MotionComponent
      type={Component === 'button' ? type : undefined}
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: '0 4px 32px 0 rgba(0,255,255,0.15)' }}
      whileTap={{ scale: 0.96 }}
      transition={spring}
      disabled={Component === 'button' ? loading : undefined}
      className={`
        relative w-full flex items-center justify-center
        px-6 py-3 md:px-8 md:py-4
        rounded-full
        font-bold text-white text-lg md:text-xl
        bg-white/5 backdrop-blur-xl
        border border-white/20
        shadow-[0_2px_16px_rgba(0,0,0,0.10)]
        transition-all duration-300
        outline-none
        hover:scale-105 hover:shadow-lg
        active:scale-95
        focus:ring-2 focus:ring-cyan-400/60
        disabled:opacity-60 disabled:cursor-not-allowed
        select-none
        ${className}
      `}
      style={{
        textShadow: '0 0 4px rgba(255,255,255,0.35)',
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
      }}
      {...props}
    >
      {loading && (
        <svg className="animate-spin mr-2 h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      <span className="relative z-10">{children}</span>
    </MotionComponent>
  );
};

export default GenZButton; 