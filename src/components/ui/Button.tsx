import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const variants = {
    primary: 'bg-ios-blue text-white hover:opacity-90 active:opacity-80',
    secondary: 'bg-ios-gray-200 text-ios-gray-950 hover:bg-ios-gray-300',
    ghost: 'bg-transparent text-ios-blue hover:bg-ios-gray-100',
    danger: 'bg-ios-red text-white hover:opacity-90'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        rounded-2xl font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-ios-blue focus:ring-offset-2
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      type={props.type || 'button'}
    >
      {children}
    </motion.button>
  );
};

export default Button;