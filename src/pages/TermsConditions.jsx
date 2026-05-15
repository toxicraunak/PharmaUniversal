import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, FileText, Scale, UserCheck, ShieldCheck } from 'lucide-react';

const TermsConditions = ({ config }) => {
  const title = `Terms & Conditions - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="bg-white min-h-screen font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Header Section */}
      <div className="border-b border-gray-100 py-12 bg-gray-50/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl">
          <div>
            <h1 className="text-[40px] font-heading! font-black text-primary tracking-tighter uppercase leading-none">TERMS & CONDITIONS</h1>
          </div>
          <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="text-primary">Terms & Conditions</span>
          </nav>
        </div>
      </div>

      {/* Section 1: Agreement & Use */}
      <section className="min-h-screen flex items-center py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50/50 -skew-x-12 translate-x-1/4"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-12">
               <div className="flex items-center gap-4 text-primary">
                  <FileText size={48} strokeWidth={1.5} />
                  <h2 className="text-4xl md:text-5xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">Service <br />Agreement</h2>
               </div>
               <div className="space-y-8 text-gray-600 font-medium text-lg leading-relaxed italic">
                  <p>
                    You are advised to read the Terms of Service carefully before using our website. The use of this site proves that you understand, acknowledge, and agree to be bound by these Terms of Service.
                  </p>
                  <p>
                    Any new features uploaded to the website shall also be subject to the Terms of Service. You can review the website to check the recent updates or most current version of the Terms of Service at any time. We reserve the right to modify, change, update, or replace any part of these Terms of Service by updating or making changes to our website.
                  </p>
               </div>
               <div className="p-8 bg-gray-900 text-white rounded-3xl shadow-2xl space-y-4">
                  <h3 className="text-primary font-black uppercase tracking-[0.2em] text-xs">Responsibility Note</h3>
                  <p className="text-sm font-bold italic text-gray-400">"It is your responsibility to keep visiting the website periodically for changes. Your further use to the site following the posting of any changes will ensure your acceptance of those changes."</p>
               </div>
            </div>
            <div className="flex justify-center">
               <div className="w-full max-w-md aspect-3/4 bg-white border-2 border-gray-100 rounded-[40px] shadow-2xl p-12 flex flex-col justify-between group overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full"></div>
                  <Scale size={120} strokeWidth={0.5} className="text-gray-100 absolute top-10 right-10" />
                  <div className="relative z-10 space-y-6">
                     <span className="text-[100px] font-black text-primary/10 leading-none">01</span>
                     <h3 className="text-3xl font-heading! font-black text-gray-900 uppercase tracking-tight">Binding <br />Terms</h3>
                     <p className="text-xs font-black uppercase tracking-widest text-primary">Legal Documentation</p>
                  </div>
                  <div className="relative z-10 w-12 h-1 bg-primary"></div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Accuracy & Account Details */}
      <section className="min-h-screen flex items-center py-20 bg-gray-50/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-20 items-stretch"
          >
            <div className="flex-1 bg-white p-12 lg:p-20 rounded-[50px] shadow-xl border border-gray-100 space-y-10">
               <div className="flex items-center gap-4 text-primary">
                  <ShieldCheck size={40} strokeWidth={1.5} />
                  <h2 className="text-3xl font-heading! font-black text-gray-900 uppercase tracking-tight">Account Safety</h2>
               </div>
               <div className="space-y-6 text-gray-500 font-medium text-lg leading-relaxed italic">
                  <p>
                    We ensure to keep your information confidential and never share it to any third parties. Universal Pharma is a reliable name in the medical domain.
                  </p>
                  <p>
                    We maintain the security of our website to give you a smooth shopping experience. You must maintain the secrecy of your login credentials to prevent unauthorized access to your account.
                  </p>
               </div>
               <div className="flex items-center gap-4 py-6 border-y border-gray-50">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                     <UserCheck size={24} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-900">Verified User Protocols</p>
               </div>
            </div>
            <div className="flex-1 bg-gray-900 p-12 lg:p-20 rounded-[50px] shadow-2xl text-white space-y-10">
               <div className="flex items-center gap-4 text-primary">
                  <FileText size={40} strokeWidth={1.5} />
                  <h2 className="text-3xl font-heading! font-black uppercase tracking-tight">Information <br />Accuracy</h2>
               </div>
               <div className="space-y-6 text-gray-400 font-medium text-lg leading-relaxed italic">
                  <p>
                    We are not responsible for the completeness and accuracy of the information available on this site. The material on this site can be used for the purpose of general information and should not be used as the sole basis for making decisions.
                  </p>
                  <p>
                    Any reliance on the information or products on this site is at your own risk. We reserve the right to modify, change, or update the contents of this site at any time without prior notice.
                  </p>
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 pt-6">Last Updated: May 2026</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Governing Law & Termination */}
      <section className="min-h-screen flex items-center py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-7xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">
               Final <span className="text-primary">Provisions</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto italic">
              Failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
             <div className="space-y-4">
                <h3 className="text-lg font-black uppercase tracking-widest text-gray-900 flex items-center gap-3">
                   <span className="w-8 h-1 bg-primary"></span> Governing Law
                </h3>
                <p className="text-sm font-bold text-gray-400 leading-relaxed italic uppercase tracking-wider">These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of USA.</p>
             </div>
             <div className="space-y-4">
                <h3 className="text-lg font-black uppercase tracking-widest text-gray-900 flex items-center gap-3">
                   <span className="w-8 h-1 bg-primary"></span> Termination
                </h3>
                <p className="text-sm font-bold text-gray-400 leading-relaxed italic uppercase tracking-wider">The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.</p>
             </div>
          </div>
          <div className="pt-12">
             <Link to="/contact-us" className="inline-block px-14 py-6 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl hover:-translate-y-1">
                Have questions? Contact us
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
