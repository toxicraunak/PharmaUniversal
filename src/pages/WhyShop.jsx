import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const WhyShop = ({ config }) => {
  const title = `Why Shop With Us - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="bg-white min-h-screen">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>
      {/* Header Section */}
      <div className="border-b border-gray-100 py-8 mb-12 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-heading font-black text-primary tracking-tight uppercase">WHY SHOP WITH US?</h1>
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Why Shop with US</span>
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
          {/* Highlighted Feature Box */}
          <div className="bg-[#f4fdf4] border-l-4 border-primary p-10 shadow-sm">
            <h2 className="text-2xl font-heading font-black text-primary tracking-tight mb-6">
              How Does Pharma Universal Help You Save Your Penny?
            </h2>
            <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
              To purchase the medicine, everyone needs to select the certified and reliable pharmacy. Its quiet challenging task for people. The truth is that several pharmacies are offering these medicine at lowest cost. But the fact is that we have to find the genuine place to get the genuine medicines. We at Pharmauniversal ready to provide quality medicine at your doorstep. Here you get the massive range of sleeping pills, anti anxiety medicines and pain relief medicine. You can easily get the delivery of these medicine at your doorstep all over the USA. We always try to find the best methods to provide these medicine quickly at your place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-black text-gray-900 uppercase">Medical Emergency</h3>
              <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
                In case of medical emergency, you can easily get the medicine at your doorstep. We are always ready to help our clients and provide them with the best medicines.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-black text-gray-900 uppercase">High-Quality Medicines</h3>
              <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
                We provide the high quality medicines that too at lowest cost. This is the place where you can get the massive range of medicine.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-heading font-black text-gray-900 uppercase">Secure Payment</h3>
            <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
                This entire process does not affect your recurring payments, subscriptions, and billing agreements. That’s the primary reason we always give the priority to Online Method.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyShop;
