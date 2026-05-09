import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-8xl">
        <div className="relative h-[358px] overflow-hidden mb-6">
          <img 
              src="https://pharmauniversal.com/wp-content/uploads/2021/08/Web-Banners-01-Pharma-Universal.jpg.webp" 
              alt="About Banner" 
              className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
        >
          <div className="space-y-6">
            <p>
              If you wish to get the bliss of good health, it is imperative to prioritize your health and accordingly seek right solutions to fight health implications. Aside from taking the prescribed doses on time, the quality of medicines contributes to enhancing your well-being to a large extent. It is necessary to buy the medicine from a reliable and leading online pharmacy to expect the desired health outcomes.
            </p>
            <p>
            Pharma Universal is a <strong className="text-gray-700">popular medical pharmacy in USA</strong> that offers users high-quality pain-relieving, anxiety, and sleeping medicines. People always have tendency to comparison that we believe is right before making up the mind to buy the medicines. The pharmacy should be trustworthy and should ensure results that are par excellence. The only way to sustain the relationship with patients is to live up to their expectations and offer them more than their expectations.
            </p>
            <p>
            The declining health acts as an encumbrance, slowing down the euphoria of an individual towards the interest for life. A person gets too engrossed in dealing with the health dilemma that compels individuals to take decision in haste, leading to injustice to the health. A decision taken instantly pertaining to health is likely to be the cause of catastrophe health situations in the future.
            </p>
            <p>
            The guarantee of good health seems to be blurring if the decision to buy medicines from online pharmacy is not discussed with the healthcare professional. Pharma Universal since its inception has delivered quality and results, winning the hearts of millions of patients, providing them the outcomes they desire and deserve. Pharma Universal sets the benchmark even higher in the medical field, considering the misery of people related to health a priority and ensuring to give them effective medicines. It is not just the supremacy of quality we achieve in our <strong className="text-primary">best online pharmacy store USA</strong> but great customers services also.
            </p>
            <h2 className="text-3xl font-abril! font-black text-gray-900 uppercase tracking-tight">Satisfaction</h2>
            <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
              We at PharmaUniversal believe that user satisfaction is our first priority. We provide the high quality medicines that too at lowest cost. This is the place where you can get the massive range of medicine. For the convenience of our clients, we also provide the home delivery.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-abril! font-black text-gray-900 uppercase tracking-tight">Trust and Quality</h2>
            <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
              PharmaUniversal is a reliable pharmacy that is providing the high quality medicine. All these medicines are certified and safe for use. We never compromise with the quality of medicines. We always try to find the best way to help our clients and provide them with the best medicines.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-abril! font-black text-gray-900 uppercase tracking-tight">Our Mission</h2>
            <p className="text-gray-600 font-display text-[15px] leading-[1.8]">
              Our mission is to provide the high quality medicine to our clients at the lowest cost. We always try to find the best way to help our clients and provide them with the best medicines. We are always ready to help our clients and provide them with the best medicines.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
