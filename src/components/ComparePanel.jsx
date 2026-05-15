import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCcw, Trash2, ArrowRight, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';

const ComparePanel = () => {
  const location = useLocation();
  const { 
    compareList, 
    removeFromCompare, 
    clearCompareList, 
    isPanelVisible, 
    isMinimized, 
    minimizePanel, 
    expandPanel 
  } = useCompare();

  // Hide the panel on the compare page
  if (location.pathname === '/compare') return null;

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Sticky Bottom-Left Toggle Button */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            onClick={expandPanel}
            className="fixed bottom-6 left-6 z-100 bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 group hover:bg-primary transition-all duration-300 border-2 border-white/10"
          >
            <div className="relative">
              <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                {compareList.length}
              </span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Compare ({compareList.length})</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Bottom Comparison Panel */}
      <AnimatePresence>
        {isPanelVisible && (
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            className="fixed bottom-0 left-0 right-0 z-1000 bg-white border-t-4 border-primary shadow-[0_-20px_50px_rgba(0,0,0,0.15)] pb-safe"
          >
            {/* Close Button Top Right */}
            <button 
              onClick={minimizePanel}
              className="absolute -top-4 right-6 bg-white text-gray-400 hover:text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg border border-gray-100 transition-colors z-10 cursor-pointer"
            >
              <X size={16} strokeWidth={3} />
            </button>

            <div className="container mx-auto px-4 py-4 md:py-6 max-w-6xl">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                
                {/* Comparison Slots - Scrollable on mobile */}
                <div className="w-full md:flex-1 overflow-x-auto no-scrollbar">
                  <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 min-w-[600px] md:min-w-0 pb-2 md:pb-0">
                    {[0, 1, 2].map((index) => {
                      const product = compareList[index];
                      return (
                        <div key={index} className="flex-1 relative h-24 md:h-32 rounded-xl md:rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/30 overflow-hidden group min-w-[180px] md:min-w-0">
                          {product ? (
                            <div className="h-full w-full p-2 md:p-3 flex items-center gap-3 md:gap-4 bg-white shadow-sm border-2 border-primary/20">
                              <button 
                                onClick={() => removeFromCompare(product._id)}
                                className="absolute top-1.5 right-1.5 text-gray-300 hover:text-red-500 transition-colors cursor-pointer z-10"
                              >
                                <X size={12} strokeWidth={3} />
                              </button>
                              <img src={product.image} alt={product.name} className="h-full aspect-square object-contain" />
                              <div className="text-left flex-1 min-w-0">
                                <h4 className="text-[10px] md:text-sm text-gray-900 line-clamp-1 mb-0.5 md:mb-1 font-display! font-bold">{product.name}</h4>
                                <p className="text-[12px] md:text-[14px] font-black text-primary font-display!">
                                  ${(Math.min(...(product.packages || []).map(p => p.price || 0))).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                                <Plus size={12} md:size={14} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Column */}
                <div className="w-full md:w-auto flex flex-row md:flex-col items-center gap-3 shrink-0">
                  <Link 
                    to="/compare" 
                    className={`flex-1 md:w-56 py-3 md:py-4 rounded-xl text-center text-[10px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 font-display! ${
                      compareList.length >= 2 
                      ? 'bg-black text-white hover:bg-primary shadow-xl' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={(e) => compareList.length < 2 && e.preventDefault()}
                  >
                    Compare <span className="hidden md:inline">Products</span> <ArrowRight size={14} />
                  </Link>
                  <button 
                    onClick={clearCompareList}
                    className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5 md:gap-2 font-display! cursor-pointer underline underline-offset-2"
                  >
                    <Trash2 size={12} /> <span className="hidden md:inline">Remove all products</span>
                    <span className="md:hidden">Clear</span>
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ComparePanel;
