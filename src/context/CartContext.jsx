import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, pkg, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      item => item._id === product._id && item.selectedPackage?.name === pkg?.name
    );

    if (existingItemIndex > -1) {
      const newItems = [...cartItems];
      newItems[existingItemIndex].quantity += quantity;
      setCartItems(newItems);
    } else {
      setCartItems([...cartItems, { ...product, selectedPackage: pkg, quantity }]);
    }
    // We don't automatically open the drawer if we are redirecting to cart page
  };

  const removeFromCart = (productId, packageName) => {
    setCartItems(cartItems.filter(item => !(item._id === productId && item.selectedPackage?.name === packageName)));
  };

  const updateQuantity = (productId, packageName, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      (item._id === productId && item.selectedPackage?.name === packageName)
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cartItems.reduce((total, item) => total + (item.selectedPackage?.price || 0) * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      toggleCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
