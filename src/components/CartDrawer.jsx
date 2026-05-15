import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-black font-heading! uppercase tracking-wider text-gray-900">
                  {cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'} IN THE SHOPPING BAG
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-black transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6">
              {cartItems.length > 0 ? (
                <div className="space-y-6">
                  {cartItems.map((item, idx) => (
                    <div key={`${item._id}-${item.selectedPackage?.name}`} className="flex items-start gap-4 pb-6 border-b border-gray-50 last:border-0">
                      <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item._id, item.selectedPackage?.name)}
                            className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <X size={14} strokeWidth={3} />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                          {item.selectedPackage?.name}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-400">{item.quantity} x</span>
                          <span className="text-sm font-black text-primary">${(item.selectedPackage?.price || 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
                    <ShoppingBag size={40} />
                  </div>
                  <h4 className="text-lg font-black font-heading! uppercase text-gray-900 mb-2">Your Bag is Empty</h4>
                  <p className="text-sm text-gray-400 font-medium max-w-[200px]">Looks like you haven't added any products to your bag yet.</p>
                  <Link 
                    to="/shop" 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-8 px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-primary transition-all"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-gray-50/80 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Subtotal :</span>
                  <span className="text-xl font-black text-primary">${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="grid grid-cols-1 gap-3 pt-4">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 border-2 border-gray-200 rounded-lg text-center text-[10px] font-black uppercase tracking-widest text-gray-900 hover:border-black transition-all bg-white"
                  >
                    View Your Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 bg-primary text-white rounded-lg text-center text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-black transition-all"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
