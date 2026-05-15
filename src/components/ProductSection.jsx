import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, RefreshCcw, Star, LayoutGrid, List, Filter, X, Check, GitCompareArrows } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { compareList, addToCompare } = useCompare();

  const isComparing = useMemo(() => {
    return compareList.some(p => p._id === product._id);
  }, [compareList, product._id]);

  // Check wishlist status on mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.some(item => item._id === product._id));
  }, [product._id]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;
    
    if (isWishlisted) {
      newWishlist = wishlist.filter(item => item._id !== product._id);
    } else {
      newWishlist = [...wishlist, product];
    }
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
    
    // Dispatch event for other components to update if needed
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  // Calculate price range
  const prices = (product.packages || []).map(p => p.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  
  const priceDisplay = prices.length > 1 
    ? `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
    : `$${minPrice.toFixed(2)}`;

  if (viewMode === 'list') {
    return (
      <motion.div 
        layout
        className="flex flex-row gap-3 sm:gap-6 pl-1 sm:pl-2 p-2 sm:p-6 bg-white border border-primary rounded-tl-3xl sm:rounded-tl-4xl rounded-br-3xl sm:rounded-br-4xl hover:shadow-xl transition-all duration-300 group mb-3 sm:mb-4 items-center sm:items-stretch"
      >
        <div 
          className="relative w-24 sm:w-56 aspect-16/11 rounded-lg sm:rounded-[2px] overflow-hidden bg-white sm:bg-gray-50 shrink-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to={`/shop/${product.slug}`}>
            <img src={product.image} alt={product.name} className="w-full h-full object-fit transition-transform duration-500 hover:scale-110 hover:brightness-90 cursor-pointer" />
          </Link>
          
          {/* Action Buttons Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute bottom-0 left-0 right-0 z-50 flex divide-x divide-gray-100 h-10 gap-px"
              >
                <div className="flex-1 relative group/btn">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCompare(product);
                    }}
                    className={`w-full h-full flex items-center justify-center cursor-pointer duration-300 transition-all ${
                      isComparing ? 'bg-primary text-white' : 'bg-white text-gray-500 hover:bg-black hover:text-white'
                    }`}
                  >
                    {isComparing ? <GitCompareArrows size={18} /> : <RefreshCcw size={18} />}
                  </button>
                  <div className="absolute bottom-full left-1/2 translate-x-[-32%] mb-2 opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-all duration-300 transform -translate-y-2 group-hover/btn:translate-y-0 z-60">
                    <div className="bg-black text-white text-[10px] px-2 py-1 rounded-sm whitespace-nowrap font-display font-bold relative">
                      {isComparing ? 'Comparing' : 'Compare'}
                      <div className="absolute top-full left-[30%] -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
                    </div>
                  </div>
                </div>

                {/* Wishlist Button */}
                <div className="flex-1 relative group/btn">
                  <button 
                    onClick={toggleWishlist}
                    className="w-full h-full flex items-center justify-center cursor-pointer bg-white hover:bg-black duration-300 transition-all"
                  >
                    <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-white'} />
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-all duration-300 transform -translate-y-2 group-hover/btn:translate-y-0 z-60">
                    <div className="bg-black text-white text-[10px] px-2 py-1 rounded-sm whitespace-nowrap font-display font-bold relative">
                      {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
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

          {product.onSale && (
            <div className="absolute top-2 left-2 z-40">
              <div className="relative w-6 h-6 sm:w-11 sm:h-11 bg-[#2EB886] text-white text-[6px] sm:text-[10px] font-black rounded-full flex items-center justify-center shadow-lg leading-none">
                SALE
                <div className="absolute bottom-[-0.5px] right-[0.2px] w-4 h-4 bg-[#2EB886] -z-10" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
              </div>
            </div>
          )}
        </div>
        <div className="grow flex flex-col justify-center py-1 sm:py-0">
          <Link to={`/shop/${product.slug}`}>
            <h3 className="text-[14px] sm:text-xl font-heading font-bold sm:font-black text-gray-800 sm:text-gray-900 mb-0.5 sm:mb-2 hover:text-primary transition-colors uppercase line-clamp-1">{product.name}</h3>
          </Link>
          <div className="hidden sm:flex items-center gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}
          </div>
          <p className="hidden sm:block text-gray-500 text-sm mb-6 line-clamp-2 max-w-xl">
            Reliable and effective treatment for your needs. Guaranteed quality and discrete shipping on all orders.
          </p>
          <div className="flex flex-row items-center justify-between gap-2">
            <span className="text-[15px] sm:text-2xl font-heading font-black text-primary tracking-tight">{priceDisplay}</span>
            <Link to={`/shop/${product.slug}`} className="px-4 sm:px-8 py-2 sm:py-3 bg-black text-white rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest hover:bg-primary transition-all duration-300 w-fit sm:block hidden">
              Select Options
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="relative group bg-white rounded-tl-3xl rounded-br-3xl overflow-hidden border border-primary/40 transition-all duration-300 hover:border-primary hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div 
        className="relative aspect-16/11 overflow-hidden bg-white hover:bg-gray-200 cursor-pointer transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {product.onSale && (
          <div className="absolute top-1.5 left-1.5 z-10 scale-75 sm:scale-100 origin-top-left">
            <div className="relative w-10 h-10 bg-[#2EB886] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg leading-none">
              SALE
              <div className="absolute bottom-[-0.5px] right-[0.2px] w-4 h-4 bg-[#2EB886] -z-10" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
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

        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="absolute bottom-0 left-0 right-0 z-50 flex divide-x divide-gray-100 h-10 gap-px mb-[0.8px]"
            >
              <div className="flex-1 relative group/btn">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCompare(product);
                  }}
                  className={`w-full h-full flex items-center justify-center cursor-pointer duration-300 transition-all ${
                    isComparing ? 'bg-primary text-white' : 'bg-white text-gray-500 hover:bg-black hover:text-white'
                  }`}
                >
                  {isComparing ? <GitCompareArrows size={18} /> : <RefreshCcw size={18} />}
                </button>
                <div className="absolute bottom-full left-1/2 translate-x-[-32%] mb-2 opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-all duration-300 transform -translate-y-2 group-hover/btn:translate-y-0 z-60">
                  <div className="bg-black text-white text-[10px] px-2 py-1 rounded-sm whitespace-nowrap font-display font-bold relative">
                    {isComparing ? 'Comparing' : 'Compare'}
                    <div className="absolute top-full left-[30%] -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative group/btn">
                <button 
                  onClick={toggleWishlist}
                  className="w-full h-full flex items-center justify-center cursor-pointer bg-white hover:bg-black duration-300 transition-all"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-white'} />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-all duration-300 transform -translate-y-2 group-hover/btn:translate-y-0 z-60">
                  <div className="bg-black text-white text-[10px] px-2 py-1 rounded-sm whitespace-nowrap font-display font-bold relative">
                    {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
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

      <div className="p-5 text-center flex flex-col items-center gap-1">
        <Link to={`/shop/${product.slug}`}>
          <h3 className="text-xs font-display font-medium text-gray-500 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="text-sm font-display font-semibold text-black/80 tracking-tight">
          {priceDisplay}
        </div>
        <div className="flex justify-center gap-0.5 pt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="fill-primary text-primary" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ProductToolbar = ({ 
  viewMode, setViewMode, 
  sortBy, setSortBy, 
  itemsPerPage, setItemsPerPage, 
  showFilters, setShowFilters,
  filteredCount,
  isAnyFilterApplied,
  clearFilters,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  availability, setAvailability
}) => {
  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col gap-4 pb-6 mb-8 border-b border-gray-100">
        {/* Mobile: Row 1 (Switcher & Clear) / Desktop: Top Left Section */}
        <div className="flex items-center justify-between md:justify-start gap-6">
          <div className="flex items-center gap-1 border-r border-gray-200 pr-4">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors cursor-pointer ${viewMode === 'grid' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={20} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors cursor-pointer ${viewMode === 'list' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={20} strokeWidth={2.5} />
            </button>
          </div>

          <p className="hidden md:block text-sm text-gray-500">
            Showing all {filteredCount} results
          </p>

          <div className="md:hidden">
            {isAnyFilterApplied && (
              <button 
                onClick={clearFilters}
                className="p-2 bg-red-50 text-red-500 rounded-lg border border-red-100 hover:bg-red-500 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
              >
                <X size={14} /> Clear All
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary cursor-pointer"
              >
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="120">120</option>
              </select>
            </div>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-4 py-1.5 text-sm outline-none focus:border-primary min-w-[180px] cursor-pointer"
            >
              <option value="rating">Sort by average rating</option>
              <option value="popularity">Sort by popularity</option>
              <option value="latest">Sort by latest</option>
              <option value="price-low">Sort by price: low to high</option>
              <option value="price-high">Sort by price: high to low</option>
            </select>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-1.5 rounded-lg border font-bold text-sm transition-all cursor-pointer ${
                showFilters 
                ? 'bg-primary/5 border-primary text-primary' 
                : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {showFilters ? <X size={16} /> : <Filter size={16} />}
              Filter
            </button>

            {isAnyFilterApplied && (
              <div className="relative group/clear">
                <button 
                  onClick={clearFilters}
                  className="p-2 bg-red-50 text-red-500 rounded-lg border border-red-100 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/clear:opacity-100 pointer-events-none transition-all duration-300 transform -translate-y-1 group-hover/clear:translate-y-0 z-50">
                  <div className="bg-black text-white text-[10px] px-2 py-1 rounded-sm whitespace-nowrap font-display font-bold relative">
                    Clear all filters
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Row 2 (Count & Filter Toggle) */}
        <div className="md:hidden flex items-center justify-between gap-4">
          <p className="text-sm text-gray-500 font-medium">
            Showing all {filteredCount} results
          </p>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-1.5 rounded-lg border font-bold text-xs transition-all cursor-pointer ${
              showFilters 
              ? 'bg-primary/5 border-primary text-primary' 
              : 'bg-gray-50 border-gray-100 text-gray-600'
            }`}
          >
            {showFilters ? <X size={14} /> : <Filter size={14} />}
            Filter
          </button>
        </div>

        {/* Mobile: Row 3 (Sort & Per Page) */}
        <div className="md:hidden flex items-center gap-3">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-primary font-medium cursor-pointer"
          >
            <option value="rating">Sort by average rating</option>
            <option value="popularity">Sort by popularity</option>
            <option value="latest">Sort by latest</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>

          <select 
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            className="w-24 bg-white border border-gray-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-primary font-medium text-center cursor-pointer"
          >
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="120">120</option>
            <option value="All">All</option>
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-gray-50/50 rounded-2xl mb-8 border border-gray-100"
          >
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
              {/* Availability */}
              <div>
                <h4 className="text-sm font-heading font-black text-gray-900 uppercase mb-6 tracking-wider">Availability</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={availability.inStock} 
                      onChange={() => setAvailability(prev => ({ ...prev, inStock: !prev.inStock }))}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" 
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">In stock</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={availability.outOfStock} 
                      onChange={() => setAvailability(prev => ({ ...prev, outOfStock: !prev.outOfStock }))}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" 
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">Out of stock</span>
                  </label>
                </div>
              </div>

              {/* Price Filter */}
              <div className="md:col-span-2">
                <h4 className="text-sm font-heading font-black text-gray-900 uppercase mb-8 tracking-wider">Filter by Price</h4>
                <div className="px-2">
                  <div className="relative w-full h-1.5 bg-gray-200 rounded-full mb-10">
                    <div 
                      className="absolute h-full bg-primary rounded-full"
                      style={{ 
                        left: `${(minPrice / 2000) * 100}%`, 
                        right: `${100 - (maxPrice / 2000) * 100}%` 
                      }}
                    ></div>
                    <input 
                      type="range" 
                      min="0" 
                      max="2000" 
                      step="10"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Math.min(parseInt(e.target.value), maxPrice - 50))}
                      className="absolute w-full -top-1.5 h-5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md"
                    />
                    <input 
                      type="range" 
                      min="0" 
                      max="2000" 
                      step="10"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Math.max(parseInt(e.target.value), minPrice + 50))}
                      className="absolute w-full -top-1.5 h-5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 font-medium">
                      Price: <span className="text-gray-900 font-bold">${minPrice} — ${maxPrice}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const SearchProductItem = ({ product, onClick }) => {
  const prices = (product.packages || []).map(p => p.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  
  const priceDisplay = prices.length > 1 
    ? `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
    : `$${minPrice.toFixed(2)}`;

  return (
    <Link 
      to={`/shop/${product.slug}`}
      onClick={onClick}
      className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group border-b border-gray-100 last:border-0"
    >
      <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform" 
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
          {product.name}
        </h4>
        <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
          Reliable and effective treatment for your needs. Guaranteed quality.
        </p>
        <div className="mt-1 text-xs font-black text-gray-900">
          {priceDisplay}
        </div>
      </div>
    </Link>
  );
};

const ProductSection = ({ products }) => {
  if (!products || products.length === 0) return (
    <div className="py-20 text-center">
      <h3 className="text-xl font-heading font-black text-gray-900 uppercase mb-2">No medicines available</h3>
      <p className="text-gray-500">Please check back later or contact us for assistance.</p>
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
