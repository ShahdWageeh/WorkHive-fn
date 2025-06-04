import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FadeInText = ({ children, className }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={children} // This ensures the animation triggers on content change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeInText; 