import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const WelcomeSection = ({ config }) => {
  return (
    <section className="pb-4 pt-4 bg-white">
      <div className="container mx-auto px-4 text-center max-w-8xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-heading! font-bold text-gray-900 mb-4 uppercase">
            WELCOME TO {config?.siteName || 'PHARMA UNIVERSAL'}
          </h2>
          <h3 className="text-xl lg:text-3xl font-heading! font-black text-[#333333] mb-8 leading-tight">
            Highly Rated Pharmacy for Pain, Anxiety and Insomnia Treatment
          </h3>
          <p className="text-gray-500 font-display leading-[1.8] text-[15px] max-w-6xl mx-auto">
            {config?.siteName} embarked on this journey with an aim to provide people with effective, safe, and easy to use medications to help eliminate & treat ailments and physical problems. We have left no stone unturned in reaching the pinnacle of perfection with our wide range of high-quality medicine. We are one of the most trusted and <span className="text-primary hover:underline cursor-pointer">reputed online pharmacies</span> whose objective is to bring improvement into the lives of countless individuals who are tired of trying different medicines.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
