import React, { useEffect, useState, useRef } from 'react';
import { MessageSquare, ArrowUp, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingActions = ({ config }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const constraintsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Constraint Boundary for Dragging */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden" />

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            className="fixed bottom-0 right-0 z-50 w-12 h-12 bg-gray-700 text-white shadow-2xl flex items-center justify-center hover:bg-lime-500 transition-colors duration-300 cursor-pointer"
          >
            <ArrowUp strokeWidth={4} size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Support Mail Button (Draggable) */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        className="fixed bottom-12 left-6 z-60 pointer-events-auto"
      >
        <a
          href={`mailto:${config?.contact?.supportEmail}`}
          className="bg-blue-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
        >
          <Mail size={28} className="pointer-events-none" />
        </a>
      </motion.div>

      {/* Support Chat Button (Draggable) */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
        className="fixed bottom-12 right-6 z-60 flex gap-2 items-center pointer-events-auto"
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 border border-gray-100 cursor-pointer whitespace-nowrap"
        >
          <span className="text-[15px] font-display font-semibold text-gray-700 pointer-events-none">
            Chat with us 👋
          </span>
        </motion.div>

        <div className="w-14 h-14 bg-[#2B34E1] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer">
          <MessageSquare fill="currentColor" size={28} className="pointer-events-none" />
        </div>
      </motion.div>
    </>
  );
};

export default FloatingActions;