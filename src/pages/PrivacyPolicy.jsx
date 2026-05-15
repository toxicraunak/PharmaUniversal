import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShieldCheck, Eye, Lock } from 'lucide-react';

const PrivacyPolicy = ({ config }) => {
  const title = `Privacy Policy - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="bg-white min-h-screen font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Header Section */}
      <div className="border-b border-gray-100 py-12 bg-gray-50/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl">
          <div>
            <h1 className="text-[40px] font-heading! font-black text-primary tracking-tighter uppercase leading-none">PRIVACY POLICY</h1>
          </div>
          <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="text-primary">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* Section 1: Introduction & Acceptance */}
      <section className="min-h-screen flex items-center py-20 border-b border-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="flex items-center gap-4 text-primary">
              <ShieldCheck size={40} strokeWidth={1.5} />
              <h2 className="text-3xl md:text-4xl font-heading! font-black text-gray-900 uppercase tracking-tight">Acceptance of our Privacy Policy</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-500 font-medium leading-loose text-lg italic">
              <p>
                Pharma Universal governs the privacy policies of PharmaUniversal.com. Whenever we refer to "We," "I," and "us," then it means "PharmaUniversal.com." The privacy policy of Pharma Universal is based on how we collect, use, and secure your information. Here, we're committed to the complete protection of your information as we know that health information is sensitive.
              </p>
              <p>
                Pharma Universal respects the privacy of healthcare providers, Website Visitors, and Members of the Pharma Universal services. We collect the information from the visitors through our website and keep it protected taking all precautionary measures. Pharma Universal does not address to collect your personal information from any third-party Websites and sources.
              </p>
            </div>
            <div className="bg-gray-900 text-white p-12 rounded-2xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
              <p className="relative z-10 text-xl md:text-2xl font-bold leading-relaxed italic">
                "By using this website, you agree to be bound by the terms of this Privacy Policy. If you do not agree to the Privacy policy of this site, please stop the further use of Pharma Universal Services or the Website."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Personal Information */}
      <section className="min-h-screen flex items-center bg-gray-50/30 py-20 border-b border-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
          >
            <div className="lg:col-span-7 space-y-10">
              <div className="flex items-center gap-4 text-primary">
                <Eye size={40} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-heading! font-black text-gray-900 uppercase tracking-tight">Personal Information</h2>
              </div>
              <div className="space-y-8 text-gray-600 font-medium leading-relaxed text-lg">
                <p>
                  Pharma Universal collects your private data and information, including health information and contact details through this website. When you register to become a member of Pharma Universal, you will receive updates and information regarding our services and products.
                </p>
                <div className="bg-white p-8 border-l-4 border-primary shadow-sm space-y-4">
                  <p className="font-black text-gray-900 uppercase tracking-widest text-xs">Information We Collect Includes:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Date of Address</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Contact details</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Date of Birth</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Healthcare coverage</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Prescription data</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Physician details</li>
                  </ul>
                </div>
                <p className="italic text-gray-400">
                  We only take the accountability of our website Pharma Universal. Even if you wish to share your personal information with any third-party site, then Pharma Universal is not responsible for any third-party inconveniences.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-square bg-white border-2 border-gray-100 rounded-3xl rotate-3 shadow-2xl flex items-center justify-center p-12 group overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Lock size={120} strokeWidth={0.5} className="text-gray-100 group-hover:text-primary/20 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <h3 className="text-4xl font-black text-gray-900 mb-4 font-heading!">SECURE</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Data Protection</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Data Security & Final Note */}
      <section className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary/5 rounded-[40px] p-12 md:p-20 text-center space-y-12 border border-primary/10"
          >
            <h2 className="text-4xl md:text-5xl font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">
              Committed to <span className="text-primary">Your Security</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed italic">
                Your trust is our greatest asset. At Pharma Universal, we implement military-grade encryption and strict internal protocols to ensure that your medical records and personal data remain confidential and unreachable by unauthorized entities.
              </p>
              <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] leading-loose">
                We continuously update our systems to combat emerging digital threats, ensuring that your shopping experience is not only convenient but fundamentally safe.
              </p>
            </div>
            <div className="pt-8">
              <Link to="/contact-us" className="inline-block px-12 py-5 bg-black text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-black/10 hover:-translate-y-1">
                Contact Privacy Officer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
