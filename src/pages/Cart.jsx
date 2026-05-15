import React from 'react';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = ({ config }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-white px-4 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-[32px] font-black text-gray-900 mb-4 uppercase tracking-tight font-heading!">Your Cart is Empty</h2>
        <p className="text-gray-500 max-w-md mb-8 font-medium">Looks like you haven't added any products to your cart yet. Explore our wide range of medicines and healthcare products.</p>
        <Link to="/shop" className="px-10 py-4 bg-primary text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">Start Shopping</Link>
      </div>
    );
  }

  const title = `Shopping Cart - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="min-h-screen bg-white pb-20 font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Header & Breadcrumbs */}
      <div className="bg-gray-50/50 py-6 md:py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={10} strokeWidth={3} />
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight size={10} strokeWidth={3} />
            <span className="text-primary font-black">Shopping Cart</span>
          </nav>
          <h1 className="text-[40px] md:text-[56px] font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">
            Shopping Cart
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-12 md:mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Cart Table Area */}
          <div className="flex-1">
            {/* Desktop Table - Hidden on Mobile */}
            <div className="hidden md:block overflow-x-auto no-scrollbar">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="pb-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Item</th>
                    <th className="pb-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Price</th>
                    <th className="pb-6 text-center text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Quantity</th>
                    <th className="pb-6 text-right text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Total</th>
                    <th className="pb-6 text-right text-[11px] font-black uppercase tracking-[0.2em] text-gray-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={`${item._id}-${item.selectedPackage?.name}`} className="group border-b border-gray-50">
                      <td className="py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 p-2 flex items-center justify-center shrink-0">
                            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div>
                            <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-1">{item.name}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.selectedPackage?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-8">
                        <span className="text-sm font-black text-gray-600">${(item.selectedPackage?.price || 0).toFixed(2)}</span>
                      </td>
                      <td className="py-8">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border-2 border-gray-100 rounded-lg overflow-hidden bg-white">
                            <button 
                              onClick={() => updateQuantity(item._id, item.selectedPackage?.name, item.quantity - 1)}
                              className="p-2 hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer"
                            >
                              <Minus size={14} />
                            </button>
                            <input 
                              type="text" 
                              value={item.quantity}
                              readOnly
                              className="w-10 text-center text-sm font-black text-gray-900 bg-transparent outline-none"
                            />
                            <button 
                              onClick={() => updateQuantity(item._id, item.selectedPackage?.name, item.quantity + 1)}
                              className="p-2 hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 text-right">
                        <span className="text-base font-black text-gray-900">
                          ${((item.selectedPackage?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-8 text-right">
                        <button 
                          onClick={() => removeFromCart(item._id, item.selectedPackage?.name)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Cards Layout */}
            <div className="md:hidden space-y-6">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.selectedPackage?.name}`} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  {/* Item Details */}
                  <div className="p-4 bg-gray-50/30 flex items-center gap-4 border-b border-gray-50">
                    <div className="w-16 h-16 bg-white rounded-lg border border-gray-100 p-1 flex items-center justify-center shrink-0">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight line-clamp-1">{item.name}</h3>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.selectedPackage?.name}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id, item.selectedPackage?.name)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Properties List */}
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Price:</span>
                      <span className="text-sm font-black text-gray-900">${(item.selectedPackage?.price || 0).toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Quantity:</span>
                      <div className="flex items-center border-2 border-gray-100 rounded-lg overflow-hidden bg-white scale-90 origin-right">
                        <button 
                          onClick={() => updateQuantity(item._id, item.selectedPackage?.name, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 text-gray-400 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <input 
                          type="text" 
                          value={item.quantity}
                          readOnly
                          className="w-10 text-center text-sm font-black text-gray-900 bg-transparent outline-none"
                        />
                        <button 
                          onClick={() => updateQuantity(item._id, item.selectedPackage?.name, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 text-gray-400 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Total:</span>
                      <span className="text-base font-black text-primary">${((item.selectedPackage?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon & Actions */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex w-full md:w-auto items-center gap-3">
                <input 
                  type="text" 
                  placeholder="Coupon code" 
                  className="flex-1 md:w-60 bg-gray-50 border-2 border-gray-100 rounded-lg px-6 py-3.5 text-xs font-bold outline-none focus:bg-white focus:border-black transition-all"
                />
                <button className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-primary transition-all cursor-pointer">
                  Apply Coupon
                </button>
              </div>
            </div>
          </div>

          {/* Cart Totals Card */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white border-2 border-primary rounded-2xl p-8 sticky top-32 shadow-2xl shadow-primary/5">
              <h3 className="text-xl font-black font-heading! uppercase tracking-wider text-gray-900 mb-8 pb-4 border-b border-gray-100">
                Cart Totals
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Subtotal</span>
                  <span className="text-base font-black text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Shipping</span>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-700">Free shipping</p>
                    <p className="text-[11px] text-gray-400 font-medium">Shipping to <span className="text-black font-black">ALL.</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100">
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Total</span>
                  <span className="text-2xl font-black text-primary">${cartTotal.toFixed(2)}</span>
                </div>

                <div className="space-y-3 pt-8">
                  <Link 
                    to="/checkout" 
                    className="flex items-center justify-center w-full py-4 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-black transition-all group"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/shop" 
                    className="flex items-center justify-center w-full py-4 border-2 border-gray-100 text-gray-400 hover:text-black hover:border-black rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
