import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "HOW QUICKLY DOES ANXIETY MEDICINE WORK?",
    excerpt: "Take Responsibility For Your Life: Protect Your Health And Inner Peace If you are thinking that someone else will come and solve your anxiety issues, you are wrong...",
    image: "https://pharmauniversal.com/wp-content/uploads/2024/02/How-Quickly-Does-Anxiety-Medicine-Work.jpg",
    author: "Jane Doe",
    date: "February 13, 2026",
    category: "Anxiety"
  },
  {
    id: 2,
    title: "ZOPICLONE FOR SLEEP: MECHANISM, BENEFITS & DRAWBACKS",
    excerpt: "Compared to benzodiazepines, which can be extremely addictive and frequently result in dependence, zopiclone medication is safer. The mechanism of action is designed...",
    image: "https://pharmauniversal.com/wp-content/uploads/2024/01/Zopiclone-For-Sleep-Mechanism-Benefits-Drawbacks.jpg",
    author: "Jane Doe",
    date: "January 20, 2026",
    category: "Sleep"
  },
  {
    id: 3,
    title: "SOCIAL ANXIETY AFTER COVID ERA: CAUSES & BEST NEW TREATMENTS",
    excerpt: "Even though everyone wanted to return to \"normal\" life after COVID, re-entry was not simple. Many people were feeling overwhelmed by the sudden return to social gatherings...",
    image: "https://pharmauniversal.com/wp-content/uploads/2023/12/Social-Anxiety-After-Covid-Era.jpg",
    author: "Jane Doe",
    date: "December 13, 2025",
    category: "Mental Health"
  }
];

const Blog = ({ config }) => {
  const title = `Blog - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="bg-white min-h-screen font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Header Section */}
      <div className="border-b border-gray-100 py-12 bg-gray-50/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl">
          <div>
            <h1 className="text-[40px] font-heading! font-black text-primary tracking-tighter uppercase leading-none">BLOG</h1>
          </div>
          <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="text-primary">Blog</span>
          </nav>
        </div>
      </div>

      {/* Featured Post Section (100vh) */}
      <section className="min-h-[90vh] flex items-center py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl"
          >
            <img src={blogPosts[0].image} alt="Featured" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-12 lg:p-20 w-full max-w-4xl space-y-6">
               <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Featured Article</span>
               <h2 className="text-4xl md:text-6xl font-heading! font-black text-white uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
               </h2>
               <p className="text-gray-300 text-lg font-medium leading-relaxed italic max-w-2xl line-clamp-2">
                  {blogPosts[0].excerpt}
               </p>
               <div className="flex items-center gap-8 text-gray-400 text-xs font-black uppercase tracking-widest pt-4">
                  <div className="flex items-center gap-2">
                     <User size={14} className="text-primary" />
                     <span>By {blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Calendar size={14} className="text-primary" />
                     <span>{blogPosts[0].date}</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Section (100vh area) */}
      <section className="min-h-screen py-20 bg-gray-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-16 border-b border-gray-200 pb-8">
             <h2 className="text-3xl font-heading! font-black text-gray-900 uppercase tracking-tight">Recent <span className="text-primary">Insights</span></h2>
             <div className="flex gap-4">
                {["Anxiety", "Sleep", "Health", "Pain"].map(cat => (
                  <button key={cat} className="hidden md:block px-6 py-2 border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer">
                    {cat}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className="aspect-16/10 overflow-hidden relative">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest text-primary rounded-lg shadow-sm">{post.category}</span>
                   </div>
                </div>
                <div className="p-8 space-y-4">
                   <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                   </div>
                   <h3 className="text-xl font-heading! font-black text-gray-900 uppercase tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                   </h3>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed italic line-clamp-3">
                      {post.excerpt}
                   </p>
                   <div className="pt-4 border-t border-gray-50">
                      <Link to="#" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-black transition-colors group/btn">
                         Read More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                   </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <button className="px-12 py-5 bg-black text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl hover:-translate-y-1 cursor-pointer">
                Load More Articles
             </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section (Visual Section) */}
      <section className="py-24 bg-primary flex items-center">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-10">
           <h2 className="text-4xl md:text-5xl font-heading! font-black text-white uppercase tracking-tighter leading-none">
              Stay Informed <br />on Your Health
           </h2>
           <p className="text-primary-foreground/80 text-xl font-medium italic">
              Subscribe to our monthly newsletter and get the latest medical insights, healthy lifestyle tips, and exclusive offers.
           </p>
           <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input type="email" placeholder="Your Email Address" className="flex-1 bg-white/10 border-2 border-white/20 rounded-full px-8 py-5 text-white placeholder:text-white/40 focus:bg-white focus:text-black focus:outline-none transition-all" />
              <button className="px-10 py-5 bg-white text-primary rounded-full text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl cursor-pointer">
                 Subscribe
              </button>
           </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;
