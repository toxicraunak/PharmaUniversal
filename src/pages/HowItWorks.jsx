import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const HowItWorks = ({ config }) => {
  const title = `How It Works - ${config?.siteName || 'Pharmacy Universal'}`;
  
  return (
    <div className="bg-white min-h-screen">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>
      {/* Header Section */}
      <div className="border-b border-gray-100 py-8 mb-12 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-heading! font-black text-primary tracking-tight uppercase">How It Works</h1>
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">How it Works</span>
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
          {/* Introductory Text */}
          <div className="text-gray-600 font-display text-[15px] leading-[1.8]">
            <p>
              To purchase the medicine, everyone needs to select the certified and reliable pharmacy. Its quiet challenging task for people. The truth is that several pharmacies are offering these medicine at lowest cost. But the fact is that we have to find the genuine place to get the genuine medicines. We at Pharmauniversal ready to provide quality medicine at your doorstep. Here you get the massive range of sleeping pills, anti anxiety medicines and pain relief medicine. You can easily get the delivery of these medicine at your doorstep all over the USA. We always try to find the best methods to provide these medicine quickly at your place.
            </p>
          </div>

          {/* Steps Section */}
          <div className="space-y-10">
            <h2 className="text-2xl font-heading font-black text-primary tracking-tight">
              Simple way to order these medicines
            </h2>

            {/* Step 1 */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-heading font-black text-gray-900 tracking-wide">
                Step First,
              </h3>
              <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
                you need to select the medicine which you want. Here you get the various options in terms of quantity like 90 tablets, 180 tablets, 360 tablets and 720 tablets options. You can get these medicines as you need, there is no fixed limit to order these medicines. As per your need you can select the quality and get your medicine at your home.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-heading font-black text-gray-900 tracking-wide">
                Step second,
              </h3>
              <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
                Now the time has come to place the order. After selecting the medicine, you need to select the quantity of these medicine like if you want sleeping pills, anti-anxiety pills. After completing this process, you will move to another step. Here you will be asked to select the payment option as per your preference. We are offering various payment options to our clients so that they can easily place their order and treat their medical issue. Here you get the options like credit/debit and local bank transfer. Apart from that we also try to give the benefits to clients in terms of discounts while doing payment. As per our privacy guidelines, we never show the details of the medicines that you have purchased.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-heading font-black text-gray-900 tracking-wide">
                Step third,
              </h3>
              <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
                Once you make the payment, you will get the confirmation through email. In this email, you will get the complete detail about the dispatch and expected delivery of these medicines with tracking ID. Based on the location in USA, we delivery these medicine at your place within less than 24 hours. Now you have reached the place where you will get the best medicines at your doorstep. We are always ready to help our clients and provide them with the best medicines.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
