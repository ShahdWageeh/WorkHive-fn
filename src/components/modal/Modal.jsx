import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ children, isOpen, onClose }) {
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modal = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "200px", opacity: 1 },
    exit: { y: "-100vh", opacity: 0 },
  };
  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 flex items-center justify-center"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-50"
              variants={modal}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
