import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const SecurePayment = () => {
  const paymentMethods = [
    'PayPal',
    'CashApp',
    'Venmo',
    'Zelle',
    'Credit / Debit Cards'
  ];

  return (
    <div className="bg-white min-h-screen">
      <Helmet defer={false}>
        <title>Secure Payment - Pharmacy Universal</title>
      </Helmet>
      {/* Header Section */}
      <div className="border-b border-gray-100 py-8 mb-12 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-heading font-black text-primary tracking-tight uppercase">SAFE AND SECURE PAYMENT</h1>
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Safe and Secure Payment</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-8xl pb-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
        >
          <div className="space-y-6">
            <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
              We always try to simple and secure methods for payments. In the market, they have supple options to get the medications only when they have a prescription. You cannot get these medicine directly from any manufacturer, doctor or hospital. To help our customers we are offering a simple and easy way of payment. This is a safe and secure platform to complete the payment.
            </p>
            <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
              Our primary priority is customer satisfaction. To fulfil the requirements of our clients, we always provide them with quality medicine and many additional benefits. To give them hassle-free online transactions, Online Payment is a superior option. By clicking on the link, you can easily access a card to your account in the online method. This entire process does not affect your recurring payments, subscriptions, and billing agreements.
            </p>
          </div>

          <div className="bg-gray-50 p-10 rounded-lg border border-gray-100">
            <h2 className="text-xl font-heading font-black text-gray-900 uppercase mb-8">
                We offer the following safe and secure modes of payment –
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-primary">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-gray-700 font-display font-semibold text-[15px]">{method}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-gray-500 font-display text-sm italic">
            <p>
                * Please read our <Link to="/terms-and-conditions" className="text-primary hover:underline">terms and conditions</Link> before making a payment.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecurePayment;
