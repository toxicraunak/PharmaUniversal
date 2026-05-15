import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, RefreshCw, HelpCircle, CheckCircle2, History } from 'lucide-react';

const ReturnsRefunds = ({ config }) => {
  const title = `Returns & Refunds - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="bg-white min-h-screen font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Header Section */}
      <div className="border-b border-gray-100 py-12 bg-gray-50/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl">
          <div>
            <h1 className="text-[40px] font-heading! font-black text-primary tracking-tighter uppercase leading-none">REFUND & RETURNS</h1>
          </div>
          <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="text-primary">Returns & Refunds</span>
          </nav>
        </div>
      </div>

      {/* Section 1: Our Commitment */}
      <section className="min-h-screen flex items-center py-20 bg-emerald-50/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            <div className="flex-1 space-y-10">
               <div className="flex items-center gap-4 text-primary">
                  <RefreshCw size={48} strokeWidth={1.5} className="animate-spin-slow" />
                  <h2 className="text-4xl md:text-5xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">Our <br />Commitment</h2>
               </div>
               <div className="space-y-6 text-gray-600 font-medium text-lg leading-relaxed italic">
                  <p>
                    At universal pharma, our team continuously works to offer you experiences that they have never experienced before. As a leading online pharmacy, we take immense pleasure in serving the customers with high-quality medicines.
                  </p>
                  <p>
                    It is our responsibility to fulfill the requirement of customers and eradicate their health miseries. Our efforts cannot be measured in words as to how much we care for the good health of our customers.
                  </p>
               </div>
               <div className="p-10 bg-white border border-gray-100 rounded-[40px] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                     <CheckCircle2 size={100} />
                  </div>
                  <p className="relative z-10 text-gray-500 font-bold uppercase tracking-widest text-sm leading-loose">
                    The medicines of Pharma Universal go through multiple clinical trials for customers to receive the expected health outcomes.
                  </p>
               </div>
            </div>
            <div className="flex-1 relative h-full">
               <div className="aspect-4/5 bg-gray-900 rounded-[60px] overflow-hidden relative shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
                    alt="Lab" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white space-y-4">
                     <h3 className="text-5xl font-black font-heading! uppercase tracking-tighter">QUALITY</h3>
                     <p className="text-xs font-black uppercase tracking-[0.4em] text-primary">Guaranteed</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Eligibility & Process */}
      <section className="min-h-screen flex items-center py-20 bg-white border-y border-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="text-center space-y-6">
               <div className="flex items-center justify-center gap-4 text-primary">
                  <HelpCircle size={48} strokeWidth={1.5} />
                  <h2 className="text-4xl md:text-6xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">How to be Eligible?</h2>
               </div>
               <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto italic">
                 Pharma Universal provides you with hassle-free refund policy, not asking our customers to follow redundant process.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="bg-gray-50 p-12 rounded-[50px] space-y-8 border border-gray-100 group hover:bg-primary/5 transition-all">
                  <span className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors">01</span>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Requirement</h3>
                  <p className="text-gray-500 font-medium leading-relaxed italic">
                    You will need to send the pictures of damaged products along with receipts to get the verification done. Upon ensuring the authenticity of the product, we will process with refund.
                  </p>
               </div>
               <div className="bg-gray-50 p-12 rounded-[50px] space-y-8 border border-gray-100 group hover:bg-primary/5 transition-all">
                  <span className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors">02</span>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Processing Time</h3>
                  <p className="text-gray-500 font-medium leading-relaxed italic">
                    Once verified, the refund will reflect in your account within 10-15 working days. We aim to keep this transition as smooth as your initial purchase.
                  </p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Final Disclaimer */}
      <section className="min-h-screen flex items-center py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center space-y-12">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="space-y-10"
           >
              <div className="flex items-center justify-center gap-4 text-primary">
                 <History size={60} strokeWidth={1} />
              </div>
              <h2 className="text-4xl md:text-7xl font-heading! font-black uppercase tracking-tighter leading-none">A Ray <br />of <span className="text-primary">Hope</span></h2>
              <div className="space-y-8 text-gray-400 font-medium text-lg md:text-xl leading-relaxed italic">
                 <p>
                   Our medications do not guarantee miraculous outcomes but they are designed to bring significant improvement to your debilitating health condition.
                 </p>
                 <p className="text-sm font-black uppercase tracking-[0.3em] leading-loose text-gray-500">
                   In any case, if medicines don't work or show any improvement, we can proceed with the refund process. Our variety of medications brings a ray of hope for people who could not get the desired results elsewhere.
                 </p>
              </div>
              <div className="pt-10">
                 <Link to="/contact-us" className="inline-block px-14 py-6 bg-primary text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-2xl shadow-primary/20 hover:-translate-y-1">
                    Start Refund Claim
                 </Link>
              </div>
           </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ReturnsRefunds;
