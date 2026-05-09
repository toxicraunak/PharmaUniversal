import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ config, categories, products }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT US', href: '/about', hasDropdown: true },
    ...(categories || []).map(cat => ({
      name: cat.name.toUpperCase(),
      href: `/product-category/${cat.slug}`,
      hasDropdown: true,
      categoryId: cat._id
    })),
    { name: 'FAQ', href: '/faq' },
    { name: 'HOW IT WORKS', href: '/how-it-works' },
    { name: 'CONTACT US', href: '/contact' },
  ];

  const renderDropdown = (link) => {
    if (link.name === 'ABOUT US') {
      const aboutLinks = [
        { name: 'Why Shop With Us?', href: '/why-shop-with-us' },
        { name: 'Safe and Secure Payment', href: '/safe-payment' }
      ];

      return (
        <div className="py-2">
          {aboutLinks.map((item, idx) => (
            <Link 
              key={idx}
              to={item.href} 
              className={`block px-6 py-2 text-sm transition-colors border-b border-gray-50 ${
                currentPath === item.href ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      );
    }

    if (link.categoryId) {
      const categoryProducts = (products || []).filter(p => 
        p.category?._id === link.categoryId || p.category === link.categoryId
      );
      
      if (categoryProducts.length === 0) return null;

      return (
        <div className="py-2 min-w-[200px]">
          {categoryProducts.map((product, idx) => {
            const productPath = `/product/${product.slug}`;
            const isProductActive = currentPath === productPath;
            
            return (
              <div
                key={product._id || idx}
                className={
                  idx !== categoryProducts.length - 1
                    ? "mx-4 border-b border-gray-200"
                    : "mx-4"
                }
              >
                <Link
                  to={productPath}
                  className={`block py-2 text-sm transition-colors ${
                    isProductActive ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {product.name}
                </Link>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm font-heading">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col leading-tight">
              <img src={config?.logo} alt={config?.siteName} className="h-12 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 justify-between relative">
            {navLinks.map((link) => {
              // Check if parent or any child is active
              const isParentActive = currentPath === link.href;
              let isChildActive = false;

              if (link.name === 'ABOUT US') {
                isChildActive = ['/why-shop-with-us', '/safe-payment'].includes(currentPath);
              } else if (link.categoryId) {
                const categoryProducts = (products || []).filter(p => 
                  p.category?._id === link.categoryId || p.category === link.categoryId
                );
                isChildActive = categoryProducts.some(p => `/product/${p.slug}` === currentPath);
              }

              const isActive = isParentActive || isChildActive;
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
                    className={`text-[16px] font-semibold transition-colors py-4 ${
                      isActive || isHovered ? 'text-primary' : 'text-gray-900'
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Dropdown Card */}
                  <AnimatePresence>
                    {link.hasDropdown && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-100 z-50 min-w-[220px]"
                      >
                        {/* Arrow */}
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
            <button className="p-2 text-gray-600 hover:text-primary transition-colors cursor-pointer">
              <Search size={18} strokeWidth={2.5} />
            </button>
            <button className="relative p-2 text-gray-600 hover:text-primary transition-colors cursor-pointer">
              <ShoppingCart size={18} strokeWidth={2.5} />
              <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
