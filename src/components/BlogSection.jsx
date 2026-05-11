import React from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import blogAnxiety from '../assets/media/blog_anxiety.png';
import blogZopiclone from '../assets/media/blog_zopiclone.png';
import blogCovid from '../assets/media/blog_covid.png';

const blogs = [
  {
    id: 1,
    title: "HOW QUICKLY DOES ANXIETY MEDICINE WORK?",
    author: "Jane Doe",
    date: "February 13, 2026",
    image: blogAnxiety,
    comments: 0
  },
  {
    id: 2,
    title: "ZOPICLONE FOR SLEEP: MECHANISM, BENEFITS & DRAWBACKS",
    author: "Jane Doe",
    date: "January 20, 2026",
    image: blogZopiclone,
    comments: 0
  },
  {
    id: 3,
    title: "SOCIAL ANXIETY AFTER COVID ERA: CAUSES & BEST NEW TREATMENTS",
    author: "Jane Doe",
    date: "December 13, 2025",
    image: blogCovid,
    comments: 0
  }
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h4 className="text-[24px] font-heading! font-bold text-[#222222] mb-4">
            Blog Section
          </h4>
          <h2 className="text-[32px] lg:text-[42px] font-heading! font-bold text-[#222222] mb-6">
            Welcome to Our Online Pharmacy Blog
          </h2>
          <div className="w-24 h-px bg-gray-300 mx-auto"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {blogs.map((blog) => (
            <motion.div 
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-video rounded-[40px] overflow-hidden mb-6 shadow-md border border-gray-100">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Blog Content */}
              <div className="px-2">
                <h3 className="text-[16px] lg:text-[18px] font-heading! font-bold text-[#222222] leading-tight mb-4 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                <div className="flex items-center text-[13px] text-gray-500 mb-6 font-display">
                  <span>By <span className="text-primary hover:underline cursor-pointer">{blog.author}</span></span>
                  <span className="mx-3 text-gray-300">|</span>
                  <span>{blog.date}</span>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button className="flex items-center gap-1 text-[14px] font-bold text-[#222222] hover:text-primary transition-colors uppercase tracking-wider">
                    Read More <span className="text-lg">»</span>
                  </button>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MessageSquare size={16} />
                    <span className="text-[14px]">{blog.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
