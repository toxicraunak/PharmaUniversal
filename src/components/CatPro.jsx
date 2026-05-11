import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronsRight } from 'lucide-react';

const CategoryCard = ({ category, productCount, imageUrl }) => {
  return (
    <div className="flex flex-col items-center group">
      {/* Image Container with Hover Effect */}
      <Link 
        to={`/product-category/${category.slug}`}
        className="group relative block w-full aspect-4/3 rounded-tl-[60px] rounded-br-[60px] overflow-hidden border border-primary/30 transition-all duration-500 hover:border-primary"
      >
        <img 
          src={imageUrl} 
          alt={category.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          
          <div className="bg-black text-white px-6 py-2 rounded-full font-heading font-bold text-xs shadow-2xl transform transition-all duration-500 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100">
            {productCount} Products
          </div>

        </div>
      </Link>

      {/* Content */}
      <div className="mt-6 text-center space-y-2">
        <h3 className="text-[20px] lg:text-[24px] font-heading! font-black text-[#222222] uppercase tracking-wide">
          {category.label}
        </h3>
        <Link 
          to={`/product-category/${category.slug}`}
          className="inline-flex items-center gap-1 text-[13px] font-heading font-bold text-[#444444] hover:text-primary transition-colors group/link"
        >
          Shop Now 
          <ChevronsRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
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
    <>
      <section className="pt-4 pb-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Heading */}
          <div className="text-center mb-4">
            <h2 className="text-[22px] lg:text-[28px] font-heading! font-bold text-[#222222] tracking-wide">
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

      {/* 3 Simple Steps Section */}
      <section className="pt-8 pb-12 bg-gray-100/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-[24px] lg:text-[30px] font-heading! font-black text-[#222222] tracking-tight uppercase">
              Get Your Order In 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center group transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-32 h-32 mb-6 flex items-center justify-center">
                <img 
                  src="https://pharmauniversal.com/wp-content/uploads/2023/06/icon_1.png.webp" 
                  alt="Placing Order"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[18px] font-heading! font-black text-primary uppercase mb-4 tracking-wide">
                Placing Order
              </h3>
              <p className="text-[15px] text-gray-500 leading-relaxed font-medium">
                Select the product and package. Add it to your cart and confirm the order by giving required details.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center group transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-32 h-32 mb-6 flex items-center justify-center">
                <img 
                  src="https://pharmauniversal.com/wp-content/uploads/2023/06/icon_2.png.webp" 
                  alt="Payment"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[18px] font-heading! font-black text-primary uppercase mb-4 tracking-wide">
                Payment
              </h3>
              <p className="text-[15px] text-gray-500 leading-relaxed font-medium">
                The money request will be forwarded on your given email id. Go through it and pay there for your order.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center group transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-32 h-32 mb-6 flex items-center justify-center">
                <img 
                  src="https://pharmauniversal.com/wp-content/uploads/2023/06/icon_3.png.webp" 
                  alt="Tracking and Delivery"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[18px] font-heading! font-black text-primary uppercase mb-4 tracking-wide">
                Tracking and Delivery
              </h3>
              <p className="text-[15px] text-gray-500 leading-relaxed font-medium">
                Tracking number will be shared within 24 hours and the order will be delivered in 3-4 working days.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CatPro;