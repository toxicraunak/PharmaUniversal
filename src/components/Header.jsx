import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, X, ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchProductItem } from "./ProductSection";

const Header = ({ config, categories, products }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Get dynamic categories (First 3 with different starting letters)
  const dynamicCategories = useMemo(() => {
    const seenLetters = new Set();
    const filtered = [];
    
    for (const cat of (categories || [])) {
      const firstLetter = cat.name.charAt(0).toUpperCase();
      if (!seenLetters.has(firstLetter)) {
        seenLetters.add(firstLetter);
        filtered.push(cat);
      }
      if (filtered.length === 3) break;
    }
    return filtered;
  }, [categories]);

  const navLinks = useMemo(() => {
    const baseLinks = [
      { name: "HOME", href: "/" },
      {
        name: "ABOUT US",
        href: "/about",
        hasDropdown: true,
        subLinks: [
          { name: "Why shop with us", href: "/why-shop-with-us" },
          { name: "Safe Payment", href: "/safe-payment" },
        ],
      },
    ];

    const categoryLinks = dynamicCategories.map(cat => ({
      name: cat.label?.toUpperCase() || cat.name.toUpperCase(),
      href: `/product-category/${cat.slug}`,
      categorySlug: cat.slug,
      hasDropdown: true
    }));

    const footerLinks = [
      { name: 'FAQ', href: '/faq' },
      { name: 'HOW IT WORKS', href: '/how-it-works' },
      { name: 'CONTACT US', href: '/contact-us' },
    ];

    return [...baseLinks, ...categoryLinks, ...footerLinks];
  }, [dynamicCategories]);

  // Live Search Logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return (products || []).filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category?.name?.toLowerCase().includes(query) ||
      (typeof p.category === 'string' && p.category.toLowerCase().includes(query))
    ).slice(0, 5); // Limit live results
  }, [searchQuery, products]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/?s=${encodeURIComponent(searchQuery)}&post_type=product`);
    }
  };

  const renderDropdown = (link) => {
    if (link.subLinks) {
      return (
        <div className="py-2 min-w-[200px]">
          {link.subLinks.map((sub, idx) => (
            <Link
              key={idx}
              to={sub.href}
              className={`flex items-center justify-between px-6 py-3 text-sm font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 transition-all group ${
                idx !== link.subLinks.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              {sub.name}
              <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}
        </div>
      );
    }

    if (link.categorySlug) {
      const categoryProducts = (products || []).filter(p => {
        const cat = p.category;
        if (typeof cat === 'object') {
          return cat.slug === link.categorySlug;
        }
        // Fallback if category is just an ID (shouldn't happen if populated)
        const foundCat = categories?.find(c => c._id === cat || c.slug === link.categorySlug);
        return foundCat?.slug === link.categorySlug;
      });

      if (categoryProducts.length === 0) return null;

      return (
        <div className="py-2 min-w-[200px]">
          {categoryProducts.map((product, idx) => {
            const productPath = `/shop/${product.slug}`;
            const isProductActive = currentPath === productPath;
            
            return (
              <Link
                key={idx}
                to={productPath}
                className={`flex items-center justify-between px-6 py-3 text-sm font-semibold transition-all group ${
                  isProductActive ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                } ${idx !== categoryProducts.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                {product.name}
                <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex h-20 items-center justify-between gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex flex-col leading-tight">
                <img src={config?.logo} alt={config?.siteName} className="h-12 w-auto" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 justify-between relative">
              {navLinks.map((link) => {
              const isParentActive = currentPath === link.href;
              let isChildActive = false;

              // Fix: Home should not be active on search results
              if (link.name === 'HOME' && location.search.includes('s=')) {
                // Not active
              } else if (link.name === 'ABOUT US') {
                isChildActive = ['/why-shop-with-us', '/safe-payment'].includes(currentPath);
              } else if (link.categorySlug) {
                const categoryProducts = (products || []).filter(p => {
                  const cat = p.category;
                  if (typeof cat === 'object') {
                    return cat.slug === link.categorySlug;
                  }
                  const foundCat = categories?.find(c => c._id === cat);
                  return foundCat?.slug === link.categorySlug;
                });
                isChildActive = categoryProducts.some(p => `/shop/${p.slug}` === currentPath);
              }

              const isActive = (link.name === 'HOME' && currentPath === '/' && !location.search.includes('s=')) || 
                               (link.name !== 'HOME' && (isParentActive || isChildActive));
                const isHovered = hoveredItem === link.name;

                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setHoveredItem(link.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      to={link.href}
                      className={`text-base font-bold transition-colors py-4 font-heading ${
                        isActive || isHovered ? "text-primary" : "text-gray-900"
                      }`}
                    >
                      {link.name}
                    </Link>

                    {/* Dropdown Card */}
                    <AnimatePresence>
                      {link.hasDropdown && isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-100 z-50 min-w-[220px]"
                        >
                          <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45"></div>
                          <div className="relative bg-white z-10 font-display">
                            {renderDropdown(link)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-primary transition-colors cursor-pointer"
              >
                <Search size={20} strokeWidth={2.5} />
              </button>
              <button className="relative p-2.5 text-gray-600 hover:text-primary transition-colors cursor-pointer border border-primary/40 rounded-full group hover:border-primary">
                <ShoppingCart
                  fill="currentColor"
                  size={18}
                  strokeWidth={2.5}
                  className="text-gray-400 group-hover:text-primary"
                />
                <span className="absolute top-0 -right-1.5 bg-primary text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Side Panel Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-200"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-210 flex flex-col font-display"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-lg font-black uppercase tracking-wider text-gray-900">
                  Search
                </h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-gray-400 hover:text-black transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search Input Area */}
              <div className="p-6">
                <form onSubmit={handleSearchSubmit} className="relative group">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search for medicines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 pr-12 text-sm outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors cursor-pointer"
                  >
                    <Search size={20} strokeWidth={2.5} />
                  </button>
                </form>

                {/* Results Section */}
                <div className="mt-8">
                  {searchQuery && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          {searchResults.length > 0
                            ? "Live Results"
                            : "No Results Found"}
                        </span>
                        {searchResults.length > 0 && (
                          <button
                            onClick={handleSearchSubmit}
                            className="text-[10px] font-black uppercase text-primary hover:underline cursor-pointer"
                          >
                            View All
                          </button>
                        )}
                      </div>

                      {searchResults.map((product) => (
                        <SearchProductItem
                          key={product._id}
                          product={product}
                          onClick={() => setIsSearchOpen(false)}
                        />
                      ))}

                      {searchResults.length === 0 && searchQuery && (
                        <div className="py-10 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                          <p className="text-sm text-gray-500 font-medium">
                            No products matching "{searchQuery}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Info */}
              <div className="mt-auto p-6 bg-gray-50/50 border-t border-gray-100">
                <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                  Start typing to see products in real-time. Press Enter to view
                  full results.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
