import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  glass = false,
  hover = false,
  onClick 
}) => {
  const baseClasses = glass
    ? 'bg-white/70 backdrop-blur-xl border border-white/20'
    : 'bg-white';

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={`
        ${baseClasses}
        rounded-3xl shadow-lg
        ${onClick ? 'cursor-pointer' : ''}
        transition-all duration-300
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;