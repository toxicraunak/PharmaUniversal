import React from 'react';
import { MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Contact = ({ config }) => {
  const title = `Contact Us - ${config?.siteName || 'Pharmacy Universal'}`;
  
  return (
    <div className="bg-white min-h-screen">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>
      {/* Header Section */}
      <div className="border-b border-gray-100 py-8 mb-12 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-heading font-black text-primary tracking-tight">CONTACT US</h1>
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Contact us</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            {/* Office Address */}
            <div className="flex gap-4">
              <div className="text-primary mt-1">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-[14px] font-heading font-black text-gray-900 uppercase tracking-wide mb-2">Office Address</h3>
                <p className="text-primary font-display text-[14px] leading-relaxed">
                  {config?.contact?.address || '230 Oxford Rd Kenilworth, IL 60043 USA'}
                </p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex gap-4">
              <div className="text-primary mt-1">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-[14px] font-heading font-black text-gray-900 uppercase tracking-wide mb-2">Email Address</h3>
                <div className="space-y-1">
                    <p className="text-gray-500 font-display text-[14px]">
                        {config?.contact?.email || 'info@pharmauniversal.com'}
                    </p>
                    <p className="text-gray-500 font-display text-[14px]">
                        pharmauniversalcare@gmail.com
                    </p>
                </div>
              </div>
            </div>

            {/* Whatsapp number */}
            <div>
              <h3 className="text-[14px] font-heading font-black text-gray-900 uppercase tracking-wide mb-2">Whatsapp number</h3>
              <p className="text-gray-500 font-display text-[14px]">
                {config?.contact?.whatsapp || '1 909 366 3104'}
              </p>
            </div>

            {/* Chat with us */}
            <div>
              <h3 className="text-[14px] font-heading font-black text-gray-900 uppercase tracking-wide mb-2">Chat with us</h3>
              <p className="text-gray-500 font-display text-[14px]">
                By clicking at bottom right corner of the screen.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none text-gray-700 font-display italic placeholder:text-gray-300 transition-colors hover:border-gray-400 duration-300"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none text-gray-700 font-display italic placeholder:text-gray-300 transition-colors hover:border-gray-400 duration-300"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Subject"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none text-gray-700 font-display italic placeholder:text-gray-300 transition-colors hover:border-gray-400 duration-300"
                />
              </div>
              <div>
                <textarea 
                  rows="6"
                  placeholder="Message"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none text-gray-700 font-display italic placeholder:text-gray-300 transition-colors resize-none hover:border-gray-400 duration-300"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-primary text-white font-heading font-black py-4 uppercase tracking-widest text-sm hover:bg-primary-hover transition-colors duration-300 cursor-pointer"
              >
                Send
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
