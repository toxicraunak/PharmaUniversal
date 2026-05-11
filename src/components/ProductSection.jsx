import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, RefreshCcw, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate price range
  const prices = (product.packages || []).map(p => p.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  
  const priceDisplay = prices.length > 1 
    ? `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
    : `$${minPrice.toFixed(2)}`;

  return (
    <motion.div 
      className="relative group bg-white rounded-tl-3xl rounded-br-3xl overflow-hidden border border-primary/40 transition-all duration-300 hover:border-primary hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Image Container */}
      <div className="relative aspect-16/11 overflow-hidden bg-white hover:bg-gray-200 cursor-pointer transition-all duration-300">
        {/* Sale Badge */}
        {product.onSale && (
          <div className="absolute top-4 left-4 z-40">
            <div className="relative bg-[#2EB886] text-white text-[12px] font-black px-4 py-5 rounded-full flex items-center justify-center shadow-lg leading-none">
              SALE
              {/* Tail of the bubble */}
              <div className="absolute -bottom-1 right-2 w-3 h-3 bg-[#2EB886] transform rotate-45 -z-10"></div>
            </div>
          </div>
        )}

        <Link to={`/shop/${product.slug}`}>
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-fit p-2 gtransition duration-300 group-hover:brightness-90"
          />
        </Link>

        {/* Action Buttons Overlay (Inside Image Container) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="absolute bottom-0 left-0 right-0 z-50 flex divide-x divide-gray-100 h-10 gap-px mb-[0.8px]"
            >
              {/* Compare Button */}
              <div className="flex-1 relative group/btn">
                <Link to={'/#'}>
                  <button className="w-full h-full flex items-center justify-center text-gray-500 hover:text-white cursor-pointer bg-white hover:bg-black duration-300 transition-all">
                    <RefreshCcw size={18} />
                  </button>
                </Link>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 translate-x-[-32%] mb-2 opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-2 group-hover/btn:translate-y-0 z-60">
                  <div className="bg-black text-white text-[10px] px-2 py-1 rounded-sm whitespace-nowrap font-display font-bold relative">
                    Compare

                    {/* Pointer */}
                    <div className="absolute top-full left-[30%] -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
                  </div>
                </div>
              </div>

              {/* Wishlist Button */}
              <div className="flex-1 relative group/btn">
                <Link to={'/#'}>
                  <button className="w-full h-full flex items-center justify-center text-gray-500 hover:text-white cursor-pointer bg-white hover:bg-black duration-300 transition-all">
                    <Heart size={18} />
                  </button>
                </Link>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-2 group-hover/btn:translate-y-0 z-60">
                  <div className="bg-black text-white text-[10px] px-2 py-1 rounded-sm whitespace-nowrap font-display font-bold relative">
                    Wishlist
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
                  </div>
                </div>
              </div>

              <Link 
                to={`/shop/${product.slug}`}
                className="flex-3 flex items-center justify-center gap-2 text-gray-500 hover:text-white font-display font-bold text-[10px] uppercase tracking-wider bg-white hover:bg-black duration-300 transition-all"
              >
                <ShoppingCart size={14} fill="currentColor" />
                SELECT OPTIONS
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Area */}
      <div className="p-5 text-center flex flex-col items-center gap-1">
        <Link to={`/shop/${product.slug}`}>
          <h3 className="text-xs font-display font-medium text-gray-500 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="text-sm font-display font-semibold text-black/80 tracking-tight">
          {priceDisplay}
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-0.5 pt-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className="fill-primary text-primary" 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProductSection = ({ products }) => {
  if (!products || products.length === 0) return (
    <div className="py-20 text-center text-gray-500 font-display">
      No products found in the database.
    </div>
  );

  return (
    <section className="pt-4 pb-6 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
