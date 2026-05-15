import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Megaphone, Gift, Users, Heart } from 'lucide-react';

const ReferFriend = ({ config }) => {
  const title = `Refer a Friend - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="bg-white min-h-screen font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Header Section */}
      <div className="border-b border-gray-100 py-12 bg-gray-50/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl">
          <div>
            <h1 className="text-[40px] font-heading! font-black text-primary tracking-tighter uppercase leading-none">REFER A FRIEND</h1>
          </div>
          <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="text-primary">Refer a Friend</span>
          </nav>
        </div>
      </div>

      {/* Section 1: Hero Offer (100vh) */}
      <section className="min-h-screen flex items-center py-20 bg-[#fefefe]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 relative"
            >
               <div className="aspect-square bg-primary/5 rounded-[80px] rotate-3 absolute inset-0"></div>
               <div className="relative aspect-square bg-white border-2 border-gray-100 rounded-[80px] shadow-2xl flex flex-col items-center justify-center p-12 lg:p-20 group overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                     <Megaphone size={200} />
                  </div>
                  <div className="w-40 h-40 bg-primary rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-primary/30">
                     <Megaphone size={60} className="text-white" />
                  </div>
                  <h3 className="text-4xl lg:text-6xl font-heading! font-black text-gray-900 text-center uppercase tracking-tighter leading-none mb-6">
                    REFER <br /><span className="text-primary">A FRIEND</span>
                  </h3>
                  <div className="w-12 h-1 bg-gray-900"></div>
               </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-12"
            >
               <h2 className="text-4xl md:text-5xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-tight">
                 Treat a friend to <span className="text-primary">20% off</span> and get <span className="text-primary">20% off</span> for yourself
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-gray-100 py-12">
                  {[
                    { icon: <Users />, title: "Refer family", desc: "Share your link" },
                    { icon: <Gift />, title: "They get 20%", desc: "On first order" },
                    { icon: <Heart />, title: "You get 20%", desc: "As a thank you" }
                  ].map((item, i) => (
                    <div key={i} className="text-center space-y-3">
                       <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          {React.cloneElement(item.icon, { size: 24 })}
                       </div>
                       <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-900">{item.title}</h4>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.desc}</p>
                    </div>
                  ))}
               </div>
               
               <form className="space-y-4">
                  <input type="text" placeholder="Enter Name" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-all" />
                  <input type="email" placeholder="Enter Your Email" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-all" />
                  <input type="email" placeholder="Enter Referral Email" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-all" />
                  <button className="w-full py-5 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-black transition-all hover:-translate-y-1 cursor-pointer">
                    Submit
                  </button>
               </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Refer? (100vh) */}
      <section className="min-h-screen flex items-center py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-20 text-center"
          >
            <div className="space-y-6">
               <h2 className="text-4xl md:text-7xl font-heading! font-black uppercase tracking-tighter leading-none">Sharing is <br /><span className="text-primary">Caring</span></h2>
               <p className="text-xl text-gray-400 font-medium italic max-w-2xl mx-auto">
                 We believe that good health should be shared. When you refer someone to Pharma Universal, you're not just giving them a discount; you're giving them access to reliable, high-quality care.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: "UNLIMITED REWARDS", desc: "There is no limit to how many friends you can refer. The more you share, the more you save." },
                 { title: "EASY TRACKING", desc: "Monitor your referrals and reward status directly from your account dashboard." },
                 { title: "TRUSTED CARE", desc: "Rest assured your friends will receive the same premium service and quality you trust." }
               ].map((item, i) => (
                 <div key={i} className="space-y-4 text-left p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-primary/10 transition-all">
                    <h3 className="text-primary font-black uppercase tracking-widest text-sm">{item.title}</h3>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed italic">{item.desc}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Terms & Call to Action (100vh area) */}
      <section className="min-h-[80vh] flex items-center py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-12">
           <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Gift size={32} className="text-primary" />
           </div>
           <h2 className="text-4xl md:text-6xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">
              Spread the <span className="text-primary">Word</span>
           </h2>
           <div className="space-y-8 max-w-2xl mx-auto">
              <p className="text-lg text-gray-500 font-medium leading-relaxed italic">
                * Referral discounts are valid for new customers only. Your 20% discount will be issued once your friend's first order is successfully processed and delivered.
              </p>
              <div className="pt-8 flex flex-wrap justify-center gap-6">
                 <button className="px-10 py-5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-2xl cursor-pointer">
                    Get My Referral Link
                 </button>
                 <button className="px-10 py-5 border-2 border-black text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer">
                    Share on Social Media
                 </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ReferFriend;
