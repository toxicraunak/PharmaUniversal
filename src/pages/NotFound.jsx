import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-20">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Image */}
          <div className="mb-8">
            <img 
              src="/404.png" 
              alt="404 Not Found" 
              className="mx-auto max-w-full h-auto"
            />
          </div>

          <h1 className="text-3xl lg:text-4xl font-heading font-black text-gray-900 mb-4 uppercase">
            Oops! Page Not Found
          </h1>
          
          <p className="text-gray-500 font-display text-lg mb-10 max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-heading font-bold shadow-lg hover:bg-primary-hover transition-all hover:scale-105 active:scale-95"
            >
              <Home size={20} />
              BACK TO HOME
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-heading font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={20} />
              GO BACK
            </button>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center gap-8 opacity-20 grayscale">
            <img src="/logo.png" alt="" className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
