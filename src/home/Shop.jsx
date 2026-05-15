import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ProductCard, ProductToolbar } from '../components/ProductSection';

const Shop = ({ config, products, categories }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [availability, setAvailability] = useState({ inStock: true, outOfStock: true });

  // Helper to clear all filters
  const clearFilters = () => {
    setSortBy('rating');
    setMinPrice(0);
    setMaxPrice(1200);
    setAvailability({ inStock: true, outOfStock: true });
    setItemsPerPage(30);
  };

  // Check if any filter is applied
  const isAnyFilterApplied = useMemo(() => {
    return sortBy !== 'rating' || minPrice !== 0 || maxPrice !== 1200 || !availability.inStock || !availability.outOfStock || itemsPerPage !== 30;
  }, [sortBy, minPrice, maxPrice, availability, itemsPerPage]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...(products || [])];
    
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
    
    // Pagination (Show filter)
    if (itemsPerPage !== 'All') {
      result = result.slice(0, parseInt(itemsPerPage));
    }

    return result;
  }, [products, minPrice, maxPrice, sortBy, availability, itemsPerPage]);

  const title = `Shop - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="min-h-screen bg-white pb-20 font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>
      
      {/* Page Header & Breadcrumbs */}
      <div className="bg-gray-50/50 py-6 lg:py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-[28px] md:text-[40px] font-heading! font-bold text-primary uppercase tracking-tight">
              Shop
            </h1>
            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary font-medium">Shop</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-8">

        {/* Reusable Product Toolbar & Filters */}
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
        
        {/* Categories Horizontal Scroll */}
        <div className="mb-12 relative">
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
            {(categories || []).map((cat) => (
              <Link 
                key={cat._id}
                to={`/product-category/${cat.slug}`}
                className="shrink-0 group w-[280px]"
              >
                <div className="relative aspect-16/10 rounded-[30px] overflow-hidden mb-4 border-2 border-primary/20 group-hover:border-primary transition-all duration-300">
                  <img 
                    src={cat.image || 'https://via.placeholder.com/400x250'} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-heading font-black text-gray-900 uppercase mb-1 tracking-wider">
                    {cat.name}
                  </h3>
                  <p className="text-[12px] text-gray-400 mb-2">
                    {products?.filter(p => p.category?._id === cat._id || p.category === cat._id).length} Products
                  </p>
                  <span className="text-[11px] font-black text-gray-900 flex items-center justify-center gap-1 hover:text-primary transition-colors uppercase">
                    View Shop Now <ChevronDown size={14} className="-rotate-90" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Products Display */}
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
          <div className="py-20 text-center">
            <h3 className="text-xl font-heading font-black text-gray-900 uppercase mb-2">No medicines available</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;
