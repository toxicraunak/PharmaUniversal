import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';
import bannerBg from '../assets/media/pu-bnr-1.webp';

const Hero = ({ config }) => {
  return (
    <section className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative overflow-hidden rounded-[30px] aspect-16/6 md:aspect-16/5 lg:aspect-16/6.5 shadow-2xl">
          <a href={"/shop"}>
            <img
              src={bannerBg}
              alt="Pharmacy Banner"
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />
          </a>
        </div>  
      </div>
    </section>
  );
};

export default Hero;
