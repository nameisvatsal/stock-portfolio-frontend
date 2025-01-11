import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StarBorderProps {
  children: React.ReactNode;
  color?: string;
  speed?: string;
  className?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  as?: 'button' | 'div';
}

const StarBorder: React.FC<StarBorderProps> = ({
  children,
  color = 'rgba(34, 197, 94, 0.5)',
  speed = '1s',
  className = '',
  type,
  onClick,
  as = 'div',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Component = as === 'button' ? motion.button : motion.div;
  
  return (
    <Component
      type={type}
      onClick={onClick}
      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white 
        bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
        overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...props}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              transform: 'translateX(-100%)',
            }}
            animate={{
              transform: ['translateX(-100%)', 'translateX(100%)'],
            }}
            transition={{
              duration: parseInt(speed),
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </AnimatePresence>
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default StarBorder;

