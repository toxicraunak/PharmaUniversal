import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Truck, Package, Clock, ShieldCheck } from 'lucide-react';

const DeliveryPolicy = ({ config }) => {
  const title = `Delivery Policy - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="bg-white min-h-screen font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Header Section */}
      <div className="border-b border-gray-100 py-12 bg-gray-50/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl">
          <div>
            <h1 className="text-[40px] font-heading! font-black text-primary tracking-tighter uppercase leading-none">DELIVERY POLICY</h1>
          </div>
          <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="text-primary">Delivery Policy</span>
          </nav>
        </div>
      </div>

      {/* Section 1: Confidentiality & Packaging */}
      <section className="min-h-screen flex items-center py-20 bg-[#f9fdf9]">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            <div className="order-2 lg:order-1">
               <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1974&auto=format&fit=crop" 
                    alt="Packaging" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                        <Package size={80} className="text-primary" strokeWidth={1} />
                     </div>
                  </div>
               </div>
            </div>
            <div className="order-1 lg:order-2 space-y-12">
               <div className="flex items-center gap-4 text-primary">
                  <ShieldCheck size={48} strokeWidth={1.5} />
                  <h2 className="text-4xl md:text-5xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">Discreet <br />Packaging</h2>
               </div>
               <div className="space-y-8 text-gray-600 font-medium text-lg leading-relaxed italic">
                  <p>
                    We always deliver these medicine in discreet packaging to your home. With this packaging, no one can get an idea about the medicine; they cannot determine what is inside the packet. We always make sure about the privacy of our client’s information.
                  </p>
                  <p>
                    We maintain the trust between the clients and the brand. We assure you to get the undamaged products at your place. We use the best ways to maintain the quality and safety of these medicines.
                  </p>
               </div>
               <div className="flex gap-8 border-t border-primary/10 pt-10">
                  <div className="text-center space-y-1">
                     <p className="text-2xl font-black text-gray-900">100%</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary">Private</p>
                  </div>
                  <div className="text-center space-y-1 border-l border-gray-100 pl-8">
                     <p className="text-2xl font-black text-gray-900">Zero</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary">Labels</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Order Processing */}
      <section className="min-h-screen flex items-center py-20 bg-gray-900 text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-20 items-center"
          >
            <div className="flex-1 space-y-10">
               <div className="flex items-center gap-4 text-primary">
                  <Clock size={48} strokeWidth={1.5} />
                  <h2 className="text-4xl md:text-6xl font-heading! font-black uppercase tracking-tighter leading-none">Swift <br /><span className="text-white">Processing</span></h2>
               </div>
               <div className="space-y-6 text-gray-400 font-medium text-xl leading-relaxed italic">
                  <p>
                    Once you place the order for your required medicines, you will get the order confirmation message in your email. Your shipment is dispatched within 24 hours of placing the order.
                  </p>
                  <p>
                    Usually, you will get the order within 2 to 4 working days; depending on the postal address that you have mentioned. After 24 hours, you can easily track the order.
                  </p>
               </div>
            </div>
            <div className="flex-1 w-full">
               <div className="grid grid-cols-1 gap-6">
                  {[
                    { icon: <Clock />, title: "24h Dispatch", desc: "Every order leaves our facility within one business day." },
                    { icon: <Truck />, title: "4-Day Delivery", desc: "Premium courier services ensure fast transit times." },
                    { icon: <Package />, title: "Live Tracking", desc: "Real-time updates directly to your inbox and phone." }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-primary/10 transition-all group">
                       <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          {React.cloneElement(step.icon, { size: 32, className: "text-white" })}
                       </div>
                       <div>
                          <h3 className="text-lg font-black uppercase tracking-widest text-white">{step.title}</h3>
                          <p className="text-sm font-bold text-gray-400 italic">{step.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Cost & Locations */}
      <section className="min-h-screen flex items-center py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-[60px] p-12 lg:p-24 text-center space-y-12 border-2 border-dashed border-gray-200"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10">
               <Truck size={48} className="text-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-heading! font-black text-gray-900 uppercase tracking-tighter">Cost of <span className="text-primary">Delivery</span></h2>
            <div className="max-w-2xl mx-auto space-y-8">
               <p className="text-xl text-gray-500 font-medium leading-relaxed italic">
                 Delivery charges vary as per the distance or you can say that based on the location across the USA. After adding the medicines with quantity into the shopping cart, you can see the delivery charges.
               </p>
               <p className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] leading-loose">
                 We leverage our extensive logistics network to provide the most competitive rates while ensuring the highest safety standards for your medications.
               </p>
            </div>
            <div className="pt-10">
               <Link to="/shop" className="inline-flex items-center gap-4 px-12 py-5 bg-black text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl hover:-translate-y-1 group">
                  Calculate Shipping <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryPolicy;
