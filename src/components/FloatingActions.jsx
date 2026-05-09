import React, { useEffect, useState } from 'react';
import { MessageSquare, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingActions = ({ config }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

      {/* Existing Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 items-end">
        
        {/* Main Chat Button */}
        <div className="flex items-center gap-4">
          
          {/* WhatsApp Button */}
          <div className="fixed bottom-12 left-6 z-50 flex flex-col gap-4">
            <motion.a
              href={`https://wa.me/${config?.contact?.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-8 h-8"
              />
            </motion.a>
          </div>

          {/* Support Chat Button */}
          <div className="flex gap-2 flex-row items-center justify-center fixed bottom-12 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 border border-gray-100 cursor-pointer"
            >
              <span className="text-[15px] font-display font-semibold text-gray-700">
                Chat with us 👋
              </span>
            </motion.div>

            <button className="w-14 h-14 bg-[#2B34E1] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer">
              <MessageSquare fill="currentColor" size={28} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingActions;