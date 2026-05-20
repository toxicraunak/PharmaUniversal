import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, LogIn, Tag, ChevronDown, CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';
import axios from 'axios';

const Checkout = ({ config }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, login, register, isAuthenticated, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit or Debit Card, Bank Transfer or Echeck');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'United States (US)',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    password: '',
    orderNotes: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zip: user.zip || '',
        country: user.country || 'United States (US)'
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(loginData.email, loginData.password);
    if (res.success) {
      setIsLoginOpen(false);
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let currentUserId = user?._id;

      // Handle account creation if requested
      if (!isAuthenticated && createAccount) {
        const regRes = await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          phone: formData.phone
        });
        if (!regRes.success) {
          setError(regRes.message);
          setLoading(false);
          return;
        }
      }

      // Prepare order data
      const orderData = {
        userId: currentUserId,
        items: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          image: item.image,
          selectedPackage: item.selectedPackage,
          quantity: item.quantity
        })),
        billingDetails: {
          firstName: formData.firstName,
          ...formData,
          phone: formData.phone || '', // Ensure field exists
        },
        totalAmount: cartTotal,
        paymentMethod: paymentMethod,
        userId: user?._id
      };

      const res = await axios.post(`${import.meta.env.VITE_API_URL || '/api'}/orders`, orderData);
      
      if (res.status === 201) {
        clearCart();
        navigate('/order-received', { state: { order: res.data } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while placing order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-white px-4 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-[32px] font-black text-gray-900 mb-4 uppercase tracking-tight font-heading!">Your Cart is Empty</h2>
        <Link to="/shop" className="px-10 py-4 bg-primary text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">Back to Shop</Link>
      </div>
    );
  }

  const pageTitle = `Checkout - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="min-h-screen bg-white pb-24 font-display">
      <Helmet defer={false}>
        <title>{pageTitle}</title>
      </Helmet>

      {/* Header */}
      <div className="bg-gray-50/50 py-6 md:py-8 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={10} strokeWidth={3} />
            <span className="text-primary font-black">Checkout</span>
          </nav>
          <h1 className="text-[40px] md:text-[48px] font-heading! font-black text-gray-900 uppercase tracking-tighter">
            Checkout
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-12">
        
        {/* Toggles */}
        {!isAuthenticated && (
          <div className="mb-12 space-y-4">
            <div className="bg-gray-50/80 border border-dashed border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <LogIn size={18} className="text-primary" />
                <p className="text-sm font-bold text-gray-600">Returning customer? <button onClick={() => setIsLoginOpen(!isLoginOpen)} className="text-primary hover:underline font-black uppercase text-[11px] tracking-wider ml-1 cursor-pointer">Click here to login</button></p>
              </div>
            </div>
            
            {isLoginOpen && (
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 max-w-xl mx-auto shadow-xl animate-in slide-in-from-top-4 duration-300">
                <p className="text-xs text-gray-400 font-medium mb-6 leading-relaxed">If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.</p>
                <form onSubmit={handleLoginSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Username or email *</label>
                    <input 
                      type="email" 
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-lg px-4 py-3 text-sm font-bold outline-none focus:bg-white focus:border-black transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password *</label>
                    <input 
                      type="password" 
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-lg px-4 py-3 text-sm font-bold outline-none focus:bg-white focus:border-black transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 pt-2 flex items-center justify-between">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="px-10 py-3.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-primary transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                      <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900 transition-colors cursor-pointer">Remember me</span>
                    </label>
                  </div>
                </form>
                {error && <p className="mt-4 text-xs font-bold text-red-500 flex items-center gap-2"><AlertCircle size={14} /> {error}</p>}
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-50/80 border border-dashed border-gray-200 rounded-xl p-5 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Tag size={18} className="text-primary" />
            <p className="text-sm font-bold text-gray-600">Have a coupon? <button onClick={() => setIsCouponOpen(!isCouponOpen)} className="text-primary hover:underline font-black uppercase text-[11px] tracking-wider ml-1 cursor-pointer">Click here to enter your code</button></p>
          </div>
        </div>

        {isCouponOpen && (
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 mb-12 max-w-xl mx-auto shadow-xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Coupon code" 
                className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-lg px-6 py-3.5 text-xs font-bold outline-none focus:bg-white focus:border-black transition-all"
              />
              <button className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-primary transition-all cursor-pointer">
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Billing Details */}
          <div className="flex-1 space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-black font-heading! uppercase tracking-wider text-gray-900 pb-4 border-b-2 border-gray-100">
                Billing Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 cursor-pointer">First Name *</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-black transition-all cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 cursor-pointer">Last Name *</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-black transition-all cursor-pointer"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Country / Region *</label>
                  <div className="relative">
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-black appearance-none outline-none focus:border-black transition-all"
                    >
                      <option>United States (US)</option>
                      <option>United Kingdom (UK)</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 cursor-pointer">Street Address *</label>
                  <input 
                    type="text" 
                    name="address"
                    placeholder="House number and street name"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-black transition-all mb-4 cursor-pointer"
                  />
                  <input 
                    type="text" 
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-black transition-all cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Town / City *</label>
                  <input 
                    type="text" 
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-black transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">State *</label>
                  <input 
                    type="text" 
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-black transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">ZIP Code *</label>
                  <input 
                    type="text" 
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-black transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-black transition-all"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-black transition-all"
                  />
                </div>

                {!isAuthenticated && (
                  <div className="md:col-span-2 space-y-4 pt-4">
                    <label className="flex items-center gap-3 cursor-pointer group w-fit">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={createAccount}
                          onChange={(e) => setCreateAccount(e.target.checked)}
                          className="peer sr-only" 
                        />
                        <div className="w-5 h-5 border-2 border-gray-200 rounded transition-all peer-checked:bg-primary peer-checked:border-primary"></div>
                        <CheckCircle2 size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={4} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-gray-900 group-hover:text-primary transition-colors">Create an account?</span>
                    </label>

                    {createAccount && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Account Password *</label>
                        <input 
                          type="password" 
                          name="password"
                          required
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-black transition-all"
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {isAuthenticated && (
                   <div className="md:col-span-2 pt-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-3 rounded-lg border border-primary/10 inline-block">
                        Logged in as <span className="text-black">{user.firstName} {user.lastName}</span>. Using saved billing details.
                      </p>
                   </div>
                )}

                <div className="md:col-span-2 space-y-4 pt-8 border-t border-gray-50 mt-4">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Additional Information</h3>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Order Notes (Optional)</label>
                    <textarea 
                      name="orderNotes"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-5 py-4 text-sm font-medium outline-none focus:border-black transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-white border-2 border-gray-900 rounded-2xl p-8 sticky top-32">
              <h2 className="text-2xl font-black font-heading! uppercase tracking-wider text-gray-900 mb-8">
                Your Order
              </h2>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 pb-3 border-b-2 border-gray-100">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>
                  
                  <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-1">
                    {cartItems.map((item) => (
                      <div key={`${item._id}-${item.selectedPackage?.name}`} className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900 leading-tight">
                            {item.name} <span className="text-primary font-black ml-1">× {item.quantity}</span>
                          </p>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                            {item.selectedPackage?.name}
                          </p>
                        </div>
                        <span className="text-sm font-black text-gray-900 shrink-0">
                          ${((item.selectedPackage?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Subtotal</span>
                    <span className="text-base font-black text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Shipping</span>
                    <span className="text-xs font-bold text-gray-600">Free shipping</span>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t-2 border-gray-900">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Total</span>
                    <span className="text-3xl font-black text-primary">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-10 space-y-6">
                  <div className="space-y-4 bg-gray-50 rounded-xl p-5">
                    {/* Payment Link */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="Payment Link"
                          checked={paymentMethod === 'Payment Link'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300 cursor-pointer" 
                        />
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${paymentMethod === 'Payment Link' ? 'text-gray-900' : 'text-gray-500'}`}>Payment Link</span>
                      </label>
                      {paymentMethod === 'Payment Link' && (
                        <div className="pl-7 animate-in fade-in slide-in-from-top-1 duration-200">
                          <p className="text-[11px] text-gray-500 font-medium leading-relaxed">You will receive payment link on your email id. Please pay for your order through the link.</p>
                        </div>
                      )}
                    </div>
                    
                    {/* CashApp etc */}
                    <div className="space-y-2 border-t border-gray-200 pt-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="CashApp, Zelle, Venmo & Western Union"
                          checked={paymentMethod === 'CashApp, Zelle, Venmo & Western Union'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300 cursor-pointer" 
                        />
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${paymentMethod === 'CashApp, Zelle, Venmo & Western Union' ? 'text-gray-900' : 'text-gray-500'}`}>CashApp, Zelle, Venmo & Western Union</span>
                      </label>
                      {paymentMethod === 'CashApp, Zelle, Venmo & Western Union' && (
                        <div className="pl-7 animate-in fade-in slide-in-from-top-1 duration-200">
                          <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Payment can be done through Western Union or Money Gram. Details will be shared on your email id. Your order will shipped once the payment is done.</p>
                        </div>
                      )}
                    </div>

                    {/* Credit Card etc */}
                    <div className="space-y-2 border-t border-gray-200 pt-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="Credit or Debit Card, Bank Transfer or Echeck"
                          checked={paymentMethod === 'Credit or Debit Card, Bank Transfer or Echeck'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300 cursor-pointer" 
                        />
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${paymentMethod === 'Credit or Debit Card, Bank Transfer or Echeck' ? 'text-gray-900' : 'text-gray-500'}`}>Credit or Debit Card, Bank Transfer or Echeck</span>
                      </label>
                      {paymentMethod === 'Credit or Debit Card, Bank Transfer or Echeck' && (
                        <div className="pl-7 animate-in fade-in slide-in-from-top-1 duration-200">
                          <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Our Sales team will share you the email with a link to pay through your credit or debit card.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <button type="button" className="text-primary hover:underline font-bold cursor-pointer">privacy policy</button>.</p>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-primary text-white rounded-xl text-[12px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:bg-black transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Processing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
              {error && <p className="mt-4 text-xs font-bold text-red-500 flex items-center gap-2 text-center justify-center"><AlertCircle size={14} /> {error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
