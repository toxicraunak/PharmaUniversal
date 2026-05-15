import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { ProductCard, ProductToolbar } from '../components/ProductSection';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCategory = ({ products, categories, config }) => {
  const { slug } = useParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [availability, setAvailability] = useState({ inStock: true, outOfStock: true });
  
  // AI FAQ State
  const [faqs, setFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(false);

  const category = useMemo(() => {
    return categories?.find(c => c.slug === slug);
  }, [categories, slug]);

  const categoryProducts = useMemo(() => {
    return products?.filter(p => p.category?.slug === slug || p.category === category?._id);
  }, [products, slug, category]);

  // Fetch AI FAQs
  useEffect(() => {
    if (!category) return;

    const fetchFaqs = async () => {
      setLoadingFaqs(true);
      try {
        const baseUrl = import.meta.env.VITE_BASE_CF_API_URL || 'https://devil-pharmacy-reviews.sahilraz9265.workers.dev/';
        const apiUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}category?name=${encodeURIComponent(category.name)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.success) {
          setFaqs(data.faqs || []);
        }
      } catch (error) {
        console.error('Error fetching category FAQs:', error);
      } finally {
        setLoadingFaqs(false);
      }
    };

    fetchFaqs();
  }, [category]);

  // Filter and Sort Logic (Reused from Shop.jsx)
  const filteredProducts = useMemo(() => {
    let result = [...(categoryProducts || [])];
    
    // Price Filter
    result = result.filter(p => {
      const productPrices = (p.packages || []).map(pkg => pkg.price);
      const pMin = productPrices.length > 0 ? Math.min(...productPrices) : 0;
      return pMin >= minPrice && pMin <= maxPrice;
    });

    // Availability Filter
    result = result.filter(p => {
      if (availability.inStock && availability.outOfStock) return true;
      if (availability.inStock) return p.isAvailable === true;
      if (availability.outOfStock) return p.isAvailable === false;
      return false;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => Math.min(...(a.packages || [0]).map(p => p.price || 0)) - Math.min(...(b.packages || [0]).map(p => p.price || 0)));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => Math.max(...(b.packages || [0]).map(p => p.price || 0)) - Math.max(...(a.packages || [0]).map(p => p.price || 0)));
    }
    
    // Pagination
    if (itemsPerPage !== 'All') {
      result = result.slice(0, parseInt(itemsPerPage));
    }

    return result;
  }, [categoryProducts, minPrice, maxPrice, sortBy, availability, itemsPerPage]);

  const clearFilters = () => {
    setSortBy('rating');
    setMinPrice(0);
    setMaxPrice(1200);
    setAvailability({ inStock: true, outOfStock: true });
    setItemsPerPage(30);
  };

  const isAnyFilterApplied = useMemo(() => {
    return sortBy !== 'rating' || minPrice !== 0 || maxPrice !== 1200 || !availability.inStock || !availability.outOfStock || itemsPerPage !== 30;
  }, [sortBy, minPrice, maxPrice, availability, itemsPerPage]);

  if (!category && categories.length > 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-white">
        <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight font-heading!">Category Not Found</h2>
        <Link to="/shop" className="text-primary hover:underline font-bold uppercase text-sm tracking-widest">Back to Shop</Link>
      </div>
    );
  }

  const title = `${category?.name || 'Category'} - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="min-h-screen bg-white pb-20 font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>
      
      {/* Page Header */}
      <div className="bg-gray-50/50 py-10 lg:py-16 border-b border-gray-100 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex-1 space-y-3">
              <h1 className="text-[32px] md:text-[52px] font-heading! font-black text-primary uppercase tracking-tighter leading-none">
                {category?.name}
              </h1>
              <p className="text-gray-500 font-medium text-sm md:text-base max-w-2xl leading-relaxed">
                Browse our full range of {category?.name?.toLowerCase()} medications. All products are quality guaranteed and sourced from reliable manufacturers.
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-8 shrink-0">
              <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={10} strokeWidth={3} />
                <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                <ChevronRight size={10} strokeWidth={3} />
                <span className="text-primary font-black">{category?.name}</span>
              </nav>
              
              {category?.image && (
                <div className="hidden md:block w-32 h-32 lg:w-40 lg:h-40 rounded-3xl overflow-hidden border-2 border-primary/20 p-2 bg-white shadow-xl rotate-3">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-2xl" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-12">
        
        {/* AI FAQ Section (Simple List Layout) */}
        <div className="mb-20">
          <div className="flex flex-col gap-12">
            {loadingFaqs ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Fetching Expert Insights...</p>
              </div>
            ) : faqs.length > 0 ? (
              faqs.map((faq, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="space-y-4"
                >
                  <h2 className="text-xl md:text-[28px] font-heading! font-black text-gray-900 leading-tight">
                    {faq.question}
                  </h2>
                  <div className="text-sm md:text-[15px] text-gray-600 leading-relaxed font-medium whitespace-pre-line text-justify">
                    {faq.answer}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center bg-gray-50/30 rounded-[40px] border border-dashed border-gray-200">
                <p className="text-gray-400 italic text-sm font-medium">
                  Expert insights currently unavailable for this category.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Products Section (Products Last) */}
        <div className="pt-20 border-t border-gray-100">
          <div className="mb-10">
            <h3 className="text-xl font-heading font-black text-gray-900 uppercase tracking-tight underline underline-offset-8 decoration-primary/30">Available Medicines</h3>
          </div>
          
          {/* Toolbar */}
          <ProductToolbar 
            viewMode={viewMode} setViewMode={setViewMode}
            sortBy={sortBy} setSortBy={setSortBy}
            itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}
            showFilters={showFilters} setShowFilters={setShowFilters}
            filteredCount={filteredProducts.length}
            isAnyFilterApplied={isAnyFilterApplied}
            clearFilters={clearFilters}
            minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            availability={availability} setAvailability={setAvailability}
          />

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className={
              viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10"
              : "flex flex-col gap-6"
            }>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
              <h3 className="text-xl font-heading font-black text-gray-900 uppercase mb-2">No products found</h3>
              <p className="text-gray-500">We currently don't have any products in this category. Please check back soon!</p>
              <Link to="/shop" className="inline-block mt-6 px-8 py-3 bg-primary text-white font-black uppercase text-[11px] tracking-widest rounded-full hover:shadow-lg transition-all">Browse All Products</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
