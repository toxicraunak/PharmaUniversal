import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ProductCard, ProductToolbar } from '../components/ProductSection';

const Search = ({ products }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('s') || '';
  
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [availability, setAvailability] = useState({ inStock: true, outOfStock: true });

  // Sync scroll to top on query change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  // Helper to clear all filters
  const clearFilters = () => {
    setSortBy('rating');
    setMinPrice(0);
    setMaxPrice(2000);
    setAvailability({ inStock: true, outOfStock: true });
    setItemsPerPage(30);
  };

  // Check if any filter is applied
  const isAnyFilterApplied = useMemo(() => {
    return sortBy !== 'rating' || minPrice !== 0 || maxPrice !== 2000 || !availability.inStock || !availability.outOfStock || itemsPerPage !== 30;
  }, [sortBy, minPrice, maxPrice, availability, itemsPerPage]);

  // Search, Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...(products || [])];
    
    // 1. Search Query Filter
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category?.name?.toLowerCase().includes(q) ||
        (typeof p.category === 'string' && p.category.toLowerCase().includes(q))
      );
    }

    // 2. Price Filter
    result = result.filter(p => {
      const productPrices = (p.packages || []).map(pkg => pkg.price);
      const pMin = productPrices.length > 0 ? Math.min(...productPrices) : 0;
      return pMin >= minPrice && pMin <= maxPrice;
    });

    // 3. Availability Filter
    result = result.filter(p => {
      if (availability.inStock && availability.outOfStock) return true;
      if (availability.inStock) return p.isAvailable === true;
      if (availability.outOfStock) return p.isAvailable === false;
      return false;
    });

    // 4. Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => Math.min(...(a.packages || [0]).map(p => p.price || 0)) - Math.min(...(b.packages || [0]).map(p => p.price || 0)));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => Math.max(...(b.packages || [0]).map(p => p.price || 0)) - Math.max(...(a.packages || [0]).map(p => p.price || 0)));
    }
    
    // 5. Pagination
    if (itemsPerPage !== 'All') {
      result = result.slice(0, parseInt(itemsPerPage));
    }

    return result;
  }, [products, query, minPrice, maxPrice, sortBy, availability, itemsPerPage]);

  return (
    <div className="min-h-screen bg-white pb-20 font-display">
      <Helmet defer={false}>
        <title>Search Results for "{query}" - Pharmacy Universal</title>
      </Helmet>
      
      {/* Page Header & Breadcrumbs */}
      <div className="bg-gray-50/50 py-6 lg:py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-[28px] md:text-[40px] font-heading! font-bold text-primary uppercase tracking-tight">
              Search Results: "{query}"
            </h1>
            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-primary font-medium">Search results for "{query}"</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-8">

        {/* Toolbar & Filters (Shared Component) */}
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

        {/* Results Info */}
        <div className="mb-8">
          {filteredProducts.length === 0 ? (
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 flex items-center gap-3">
              <div className="w-5 h-5 bg-blue-400 text-white rounded-full flex items-center justify-center text-[10px] font-bold">i</div>
              <p className="text-sm font-medium">No products were found matching your selection.</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 font-medium italic">
              Found {filteredProducts.length} medicines matching your search.
            </p>
          )}
        </div>

        {/* Products Display */}
        <div className={
          viewMode === 'grid' 
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10"
          : "flex flex-col gap-6"
        }>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} viewMode={viewMode} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Search;
