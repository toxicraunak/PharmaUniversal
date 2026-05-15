import React, { useEffect, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Package, Truck, Mail, ArrowRight, Printer } from 'lucide-react';

const OrderReceived = ({ config }) => {
  const location = useLocation();
  const order = location.state?.order;
  const title = `Order Received - ${config?.siteName || 'Pharmacy Universal'}`;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Success Header */}
      <div className="bg-white border-b border-gray-100 pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-primary" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[32px] md:text-[44px] font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none mb-4"
          >
            Order Received
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-medium italic"
          >
            Thank you. Your order has been received and is now being processed.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl -mt-8">
        {/* Order Meta Info */}
        <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order Number</p>
              <p className="text-sm font-black text-primary uppercase">#{order._id.toString().slice(-6).toUpperCase()}</p>
            </div>
            <div className="space-y-1 border-l border-gray-100 pl-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date</p>
              <p className="text-sm font-black text-gray-900 uppercase">{orderDate}</p>
            </div>
            <div className="space-y-1 border-l border-gray-100 pl-8 hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total</p>
              <p className="text-sm font-black text-gray-900 uppercase">${order.totalAmount.toFixed(2)}</p>
            </div>
            <div className="space-y-1 border-l border-gray-100 pl-8 hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Payment Method</p>
              <p className="text-sm font-black text-gray-900 uppercase">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-[32px] border border-gray-100 p-8 md:p-10">
              <h2 className="text-2xl font-heading! font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-3">
                <Package size={24} className="text-primary" />
                Order Details
              </h2>
              <div className="space-y-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black text-gray-900 uppercase truncate">{item.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.selectedPackage.name} × {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-gray-900">${(item.selectedPackage.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-wider">
                  <span>Subtotal:</span>
                  <span className="text-gray-900">${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-wider">
                  <span>Shipping:</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-lg font-black text-gray-900 uppercase tracking-tight">Total:</span>
                  <span className="text-xl font-black text-primary tracking-tight">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => window.print()}
                className="flex-1 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all cursor-pointer"
              >
                <Printer size={16} /> Print Receipt
              </button>
              <Link 
                to="/shop"
                className="flex-1 py-4 border-2 border-gray-100 text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:border-primary transition-all group"
              >
                Continue Shopping <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Customer Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-gray-900 rounded-[32px] p-8 md:p-10 text-white">
              <h2 className="text-2xl font-heading! font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                <Mail size={24} className="text-primary" />
                Customer Info
              </h2>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</p>
                  <p className="text-sm font-bold italic">{order.billingDetails.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Billing Address</p>
                  <p className="text-sm font-bold italic leading-relaxed">
                    {order.billingDetails.firstName} {order.billingDetails.lastName}<br />
                    {order.billingDetails.address}<br />
                    {order.billingDetails.city}, {order.billingDetails.state} {order.billingDetails.zip}<br />
                    {order.billingDetails.country}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Phone</p>
                  <p className="text-sm font-bold italic">{order.billingDetails.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-[32px] border border-primary/10 p-8 flex items-center gap-6">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Est. Delivery</h4>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">2-4 Working Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReceived;
