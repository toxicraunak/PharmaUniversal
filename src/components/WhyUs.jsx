import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Package, Lock, Zap, Truck } from 'lucide-react';

const Feature = ({ title, desc, icon: Icon, align = 'left' }) => (
  <div className={`flex items-start gap-4 ${align === 'right' ? 'flex-row-reverse text-right' : 'text-left'}`}>
    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:border-primary/50 transition-colors">
      <Icon className="text-gray-700" size={24} />
    </div>
    <div className="flex flex-col">
      <h4 className="text-[16px] lg:text-[18px] font-heading! font-bold text-primary mb-1">
        {title}
      </h4>
      <p className="text-[13px] lg:text-[14px] text-gray-500 leading-snug max-w-[200px]">
        {desc}
      </p>
    </div>
  </div>
);

const WhyUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Main Content Box with Dotted Border */}
        <div className="relative border-2 border-dashed border-primary/40 rounded-[60px] p-8 lg:p-16 mb-12">
          
          <div className="text-center mb-12">
            <h2 className="text-[26px] lg:text-[32px] font-heading! font-bold text-[#222222]">
              Why Choose Pharma Universal
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Features */}
            <div className="flex flex-col gap-12 order-2 lg:order-1">
              <Feature 
                title="Secure Payments" 
                desc="Safest payment method used." 
                icon={ShieldCheck} 
              />
              <Feature 
                title="Discreet Package" 
                desc="Medicine Delivery in Plain Padded Envelopes." 
                icon={Package} 
              />
              <Feature 
                title="Confidential Data" 
                desc="Privacy of our customers very seriously and ensure that information is secure and confidential." 
                icon={Lock} 
              />
            </div>

            {/* Center Doctor Image */}
            <div className="relative z-10 order-1 lg:order-2">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                src="https://pharmauniversal.com/wp-content/uploads/2025/07/Doctor-Pharmauniversal.png" 
                alt="Doctor"
                className="w-full max-w-[350px] mx-auto"
              />
            </div>

            {/* Right Features */}
            <div className="flex flex-col gap-12 order-3">
              <Feature 
                title="Fast Checkout" 
                desc="Faster Checkout experience than ever before." 
                icon={Zap} 
              />
              <Feature 
                title="Fast Shipping" 
                desc="Speedy Online Pharmacy Delivery Service." 
                icon={Truck} 
              />
            </div>

          </div>
        </div>

        {/* Bottom Mission Text */}
        <div className="max-w-6xl mx-auto text-black font-display! text-base">
          <p className="leading-relaxed text-left lg:text-justify">
            Since the beginning, we had spread our wings to deliver reliable medicines of all kinds, be it <span className="span-link thick">Sleeping Tablets Online</span><span className="font-semibold">, Anxiety medication , erectile dysfunction pills, painkillers medication,</span> and generic medicines. We aim to improve sleep hygiene, sexual life, pleasurable life, ensuring you make the most of improved wellness.
            </p>
            <br />

          <p className="leading-relaxed text-left lg:text-justify">
            Efforts have been put in to provide unmatched comfort and convenience to all our international customers. Here at pharma universal, we provide high-quality, safe, effective, and strong sleeping pills, erectile dysfunction, <span className="span-link">anti-anxiety medications</span>, and pain relief medications at reasonable prices that gradually contribute to enhancing your overall well-being simultaneously. All medicines have been designed to transform your debilitating health into improved health.
          </p>

          <br />

          <p className="leading-relaxed text-left lg:text-justify">
            There have been many surveys that have clarified, almost <span className="span-link">40% population</span> of the world feel difficulty during sleep in their daily routines. Sleep is unavoidable and an important aspect of an individual’s life that prepares the body to sail through the tasks physically as well as mentally. Proper sleep is a sign of healthy life and here we emphasize overall health not just sleep. Just like the way inadequate sleep fails to allow the body function properly, in the same way, lack of sexual life due to erectile problems leads to the end of personal relationships and loss of potency.
          </p>
          <br />

          <p className="leading-relaxed text-left lg:text-justify">
            Nowadays deterioration in health is common and every third person can be seen grappling with some sort of health problem. People are suffering from sleeping disorders like insomnia, <span className="span-link">anxiety</span>, obstructive sleep apnea, erectile dysfunction, and unbearable pain situations. Such disorders affect your personality and come in the way of people’s health and fitness in critical ways. Pharma universal considers health above all and takes all possible precautionary measures at the time of manufacturing medications. We prioritize health and hand over the benefits of quality medication to our esteemed customers in the form of <span className="span-link thick">Pain medication USA</span><span className="font-semibold">, Erectile Dysfunction pills USA, Sleeping Pills USA and Anxiety medication USA.</span>
          </p>
          <br />

          <p className="leading-relaxed text-left lg:text-justify">As a trusted and reputed online pharmacy, we match the highest standards, offering our customers all kinds of <span className="span-link thick">sleeping pills</span><span className="font-semibold">, pain relief medications, and anxiety medication</span> at reasonable prices.</p>
        </div>
        

      </div>
    </section>
  );
};

export default WhyUs;
