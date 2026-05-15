import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, MailWarning, BellOff, ShieldAlert } from 'lucide-react';

const AntispamPolicy = ({ config }) => {
  const title = `Antispam Policy - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="bg-white min-h-screen font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Header Section */}
      <div className="border-b border-gray-100 py-12 bg-gray-50/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl">
          <div>
            <h1 className="text-[40px] font-heading! font-black text-primary tracking-tighter uppercase leading-none">ANTISPAM POLICY</h1>
          </div>
          <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="text-primary">Antispam Policy</span>
          </nav>
        </div>
      </div>

      {/* Section 1: Zero Tolerance */}
      <section className="min-h-screen flex items-center py-20 bg-[#fffcfc]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-10">
              <div className="flex items-center gap-4 text-red-500">
                <ShieldAlert size={48} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-5xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">Zero <br />Tolerance</h2>
              </div>
              <div className="space-y-6 text-gray-600 text-lg font-medium leading-relaxed italic">
                <p>
                  Pharma Universal follows a strict anti-spam policy in which we never tolerate unsolicited advertising messages. Usually, customers complain to receive spam emails, or promotional emails after placing their order. 
                </p>
                <p>
                  We make sure that appropriate actions are taken against the spammers that will result in their account closure or loss of services. Your peace of mind is our priority, and we guard your inbox as fiercely as your health.
                </p>
              </div>
              <div className="inline-block p-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                 <p className="text-xs font-black uppercase tracking-widest text-red-600">Strict Enforcement</p>
                 <p className="text-sm font-bold text-gray-600 mt-2">Any affiliate found engaging in spam will be terminated immediately.</p>
              </div>
            </div>
            <div className="relative aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-red-500/5 rounded-[60px] rotate-6"></div>
              <div className="absolute inset-0 bg-white border-2 border-red-100 rounded-[60px] shadow-2xl overflow-hidden flex items-center justify-center p-12">
                 <BellOff size={180} strokeWidth={0.5} className="text-red-50/50" />
                 <div className="absolute inset-0 flex items-center justify-center text-center">
                    <span className="text-[120px] font-black text-red-500 opacity-10">NO</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Protection Protocols */}
      <section className="min-h-screen flex items-center py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.1),transparent)]"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="max-w-3xl space-y-6">
              <h2 className="text-4xl md:text-6xl font-heading! font-black uppercase tracking-tighter leading-none">Protection <br /><span className="text-red-500">Protocols</span></h2>
              <p className="text-xl text-gray-400 font-medium leading-relaxed italic">
                If you are getting such promotional messages or offers in your email, instant messenger, chat rooms, message board, newsgroups or anywhere else then you can fill in the following field to raise a complaint.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Encrypted Data", desc: "Your contact details are never sold to marketing agencies." },
                { title: "Opt-In Only", desc: "We only send newsletters if you explicitly request them." },
                { title: "Smart Filters", desc: "Advanced AI detection prevents malicious internal messages." }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
                  <h3 className="text-lg font-black uppercase tracking-widest text-red-500 mb-4">{item.title}</h3>
                  <p className="text-sm font-bold text-gray-400 leading-relaxed italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Report Spam */}
      <section className="min-h-screen flex items-center py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-[40px] p-12 lg:p-20 shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-16"
          >
            <div className="flex-1 space-y-8">
               <div className="flex items-center gap-4 text-red-500">
                <MailWarning size={40} strokeWidth={1.5} />
                <h2 className="text-3xl font-heading! font-black text-gray-900 uppercase tracking-tight">Report Spam</h2>
              </div>
              <p className="text-lg text-gray-500 font-medium leading-relaxed italic">
                In case, you are receiving any kind of unsolicited advertising emails or messages that you believe have been sent either by a user of Pharma Universal or after using our services then you must inform us regarding the same.
              </p>
              <p className="text-sm font-black text-gray-400 uppercase tracking-widest leading-loose">
                We will take action again them and start the investigation as soon as possible. We will also help you in unsubscribing from such unwanted spam emails or messages.
              </p>
            </div>
            <div className="flex-1">
              <form className="space-y-6 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Your Email</label>
                    <input type="email" placeholder="Enter your email" className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-red-500 transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Your Suggestion / Report</label>
                    <textarea rows={5} placeholder="Describe the issue..." className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-red-500 transition-all resize-none"></textarea>
                 </div>
                 <button className="w-full py-5 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-red-600/20 hover:bg-black transition-all hover:-translate-y-1">
                    Submit Report
                 </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AntispamPolicy;
