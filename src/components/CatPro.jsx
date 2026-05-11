import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CategoryCard = ({ category, productCount, imageUrl }) => {
  return (
    <div className="flex flex-col items-center group">
      {/* Image Container with Hover Effect */}
      <Link 
        to={`/category/${category.slug}`}
        className="relative block w-full aspect-4/3 rounded-tl-[60px] rounded-br-[60px] overflow-hidden border border-primary/30 transition-all duration-500 hover:border-primary"
      >
        <img 
          src={imageUrl} 
          alt={category.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="bg-black text-white px-6 py-2 rounded-full font-display font-bold text-lg shadow-2xl"
          >
            {productCount} Products
          </motion.div>
        </div>
      </Link>

      {/* Content */}
      <div className="mt-6 text-center space-y-2">
        <h3 className="text-[20px] lg:text-[24px] font-heading font-black text-[#222222] uppercase tracking-wide">
          {category.label}
        </h3>
        <Link 
          to={`/product-category/${category.slug}`}
          className="inline-flex items-center gap-1 text-[13px] font-display font-bold text-[#444444] hover:text-primary transition-colors group/link"
        >
          Shop Now 
          <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const CatPro = ({ categories, products }) => {
  if (!categories || categories.length === 0) return null;

  // Filter to get the first 3 relevant categories as per image
  // Sleep, Anxiety, Pain
  const displayCategories = categories
    .filter(c => ['sleeping-pills', 'anxiety', 'pain-treatment'].includes(c.slug))
    .sort((a, b) => {
        const order = { 'sleeping-pills': 1, 'anxiety': 2, 'pain-treatment': 3 };
        return order[a.slug] - order[b.slug];
    });

  // Category Images (Placeholders matching the theme)
  const categoryImages = {
    'sleeping-pills': 'https://pharmauniversal.com/wp-content/uploads/2023/08/sp_issue.jpg.webp',
    'anxiety': 'https://pharmauniversal.com/wp-content/uploads/2023/08/anxiety_box.jpg.webp',
    'pain-treatment': 'https://pharmauniversal.com/wp-content/uploads/2023/08/pain_box.jpg.webp'
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[22px] lg:text-[28px] font-heading font-black text-[#222222] tracking-tight">
            No Prescription Needed: Unlocking Better Products and Peak Performance!
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {displayCategories.map((cat) => {
            const count = products.filter(p => 
              p.category?._id === cat._id || p.category === cat._id
            ).length;
            
            return (
              <CategoryCard 
                key={cat._id} 
                category={cat} 
                productCount={count}
                imageUrl={categoryImages[cat.slug] || 'https://via.placeholder.com/400x300?text=' + cat.label}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CatPro;