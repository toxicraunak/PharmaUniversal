import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ClipboardList, PhoneCall, CreditCard, PackageCheck, Truck } from 'lucide-react';

const OrderProcessing = ({ config }) => {
  const title = `Order Processing - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="bg-white min-h-screen font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Header Section */}
      <div className="border-b border-gray-100 py-12 bg-gray-50/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl">
          <div>
            <h1 className="text-[40px] font-heading! font-black text-primary tracking-tighter uppercase leading-none">ORDER PROCESSING</h1>
          </div>
          <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="text-primary">Order Processing</span>
          </nav>
        </div>
      </div>

      {/* Section 1: Guide & Motto */}
      <section className="min-h-screen flex items-center py-20 border-b border-gray-50">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-4">
               <ClipboardList size={40} className="text-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-tight">
               Guide to <span className="text-primary">Processing Your Order</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed italic max-w-3xl mx-auto">
               Our main motto is to provide genuine medicine to our clients. Customer satisfaction is our main aim, and we always try to find impressive ways to provide superb options to them.
            </p>
            <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 text-left space-y-6">
               <p className="text-gray-600 leading-loose">
                 The team of Pharmauniversal always give easy and simple methods to complete the process while ordering the medicines. To fulfil the customer requirements, we have comprehensively listed the entire timeline to support our clients process their select medicine without any issues.
               </p>
               <p className="text-sm font-black uppercase tracking-widest text-primary italic">"To make the process simple, we have designed easy steps to place the order."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Day 1 - Confirmation */}
      <section className="min-h-screen flex items-center py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            <div className="space-y-12">
               <div className="flex items-center gap-4 text-primary">
                  <span className="text-8xl font-black opacity-20 font-heading!">01</span>
                  <h2 className="text-4xl md:text-6xl font-heading! font-black uppercase tracking-tighter leading-none">DAY 1: <br /><span className="text-white">VERIFICATION</span></h2>
               </div>
               <div className="space-y-8 text-gray-400 font-medium text-lg leading-relaxed italic">
                  <p>
                    Initially, we get the order information that you have placed as per your requirement. With the medical information, we also get the client’s details. 
                  </p>
                  <p>
                    After this process, you will get a call from our team, they will give the complete details about your medicine and get the confirmation. You also get the information regarding the payment process which you have chosen.
                  </p>
               </div>
               <div className="flex gap-10 pt-6">
                  <div className="flex flex-col items-center gap-3">
                     <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary">
                        <PhoneCall size={24} />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest">Call Confirm</p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                     <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary">
                        <CreditCard size={24} />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest">Payment Link</p>
                  </div>
               </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-12 rounded-[50px] space-y-8">
               <h3 className="text-2xl font-black text-primary uppercase tracking-tight">Email Notifications</h3>
               <p className="text-gray-400 italic leading-relaxed">
                 After getting the complete confirmation from the clients, you will get the payment email along with payment details on your email id. We always give this information to clients’ registered email IDs.
               </p>
               <div className="p-6 bg-primary/10 rounded-2xl border-l-4 border-primary">
                  <p className="text-sm font-bold text-white uppercase tracking-wider">Discreet Handling</p>
                  <p className="text-xs text-gray-400 mt-1">Our team ensures your data is encrypted at every step.</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Fulfillment & Quality */}
      <section className="min-h-screen flex items-center py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            <div className="flex-1 order-2 lg:order-1">
               <div className="relative">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                  <div className="relative grid grid-cols-2 gap-4">
                     <div className="aspect-4/5 bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1974&auto=format&fit=crop" alt="Package" className="w-full h-full object-cover" />
                     </div>
                     <div className="aspect-4/5 bg-gray-100 rounded-3xl overflow-hidden shadow-2xl mt-12">
                        <img src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=2009&auto=format&fit=crop" alt="Quality" className="w-full h-full object-cover" />
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 space-y-10">
               <div className="flex items-center gap-4 text-primary">
                  <PackageCheck size={48} strokeWidth={1.5} />
                  <h2 className="text-4xl md:text-5xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">Shipping & <br />Quality Check</h2>
               </div>
               <div className="space-y-6 text-gray-600 font-medium text-lg leading-relaxed italic">
                  <p>
                    After getting the confirmation about the transaction, now our team hand over the ordered medicines to the shipping department. Now, they will check the selected medicine in stock.
                  </p>
                  <p>
                    Now, your order would then go through various quality checks. Ensure that your medicines are perfectly wrapped in a discrete package for shipment.
                  </p>
               </div>
               <div className="pt-8 flex items-center gap-4">
                  <Truck className="text-primary" size={32} />
                  <div>
                     <p className="text-xs font-black uppercase tracking-widest text-gray-400">Next Step</p>
                     <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">Express Dispatch within 24 Hours</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OrderProcessing;
