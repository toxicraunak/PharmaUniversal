import React, { useState, useEffect } from 'react';
import { useCompare } from '../context/CompareContext';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight, Trash2, ShoppingCart, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const ComparePage = ({ config }) => {
  const { compareList, clearCompareList } = useCompare();
  const [localCompareList, setLocalCompareList] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Capture the list on mount and clear global state
  useEffect(() => {
    if (compareList.length > 0) {
      setLocalCompareList([...compareList]);
      clearCompareList();
    }
  }, []); // Only on mount

  useEffect(() => {
    if (localCompareList.length < 2) return;

    const fetchComparison = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = import.meta.env.VITE_BASE_CF_API_URL || 'https://devil-pharmacy-reviews.sahilraz9265.workers.dev/';
        const productNames = localCompareList.map(p => p.name).join(',');
        const apiUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}compare?products=${encodeURIComponent(productNames)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.success) {
          setComparisonData(data.data);
        } else {
          setError(data.error || 'Failed to fetch comparison');
        }
      } catch (err) {
        setError('Connection error. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, [localCompareList]);

  if (localCompareList.length < 2 && !loading && !comparisonData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-white px-4 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
          <Info size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight font-heading!">Not Enough Products</h2>
        <p className="text-gray-500 max-w-md mb-8">Please add at least 2 products to compare their features and benefits side-by-side.</p>
        <Link to="/shop" className="px-8 py-4 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-full hover:shadow-xl transition-all">Back to Shop</Link>
      </div>
    );
  }

  const title = `Compare Products - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="min-h-screen bg-white pb-20 font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>

      {/* Header */}
      <div className="bg-gray-50/50 py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={10} strokeWidth={3} />
                <span className="text-primary font-black">Comparison</span>
              </nav>
              <h1 className="text-[32px] md:text-[48px] font-heading! font-black text-gray-900 uppercase tracking-tighter leading-none">
                Compare Products
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-8 md:mt-12">
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <table className="w-full border-collapse min-w-[800px] md:min-w-0">
            <thead>
              <tr>
                <th className="p-4 md:p-6 text-left bg-gray-50/50 border-b border-gray-100 w-[150px] md:min-w-[200px]">
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Features</span>
                </th>
                {localCompareList.map((product) => (
                  <th key={product._id} className="p-4 md:p-6 border-b border-gray-100 min-w-[200px] md:min-w-[250px] relative">
                    <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-white p-2 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-h-[60px] flex flex-col justify-center">
                        <h3 className="text-xs md:text-sm font-black text-gray-900 uppercase mb-1 md:mb-2 line-clamp-2 leading-tight">{product.name}</h3>
                        <p className="text-sm md:text-lg font-black text-primary">
                          ${Math.min(...(product.packages || []).map(p => p.price || 0)).toFixed(2)}
                        </p>
                      </div>
                      <Link 
                        to={`/shop/${product.slug}`}
                        className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-black text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-primary transition-all whitespace-nowrap"
                      >
                        <ShoppingCart size={14} /> Order Now
                      </Link>
                    </div>
                  </th>
                ))}
                {/* Empty slots if less than 3 */}
                {[...Array(Math.max(0, 3 - localCompareList.length))].map((_, i) => (
                  <th key={`empty-${i}`} className="p-6 border-b border-gray-100 min-w-[200px] md:min-w-[250px] bg-gray-50/20">
                    <div className="flex flex-col items-center justify-center h-full text-gray-300">
                      <Link to="/shop" className="flex flex-col items-center gap-2 hover:text-primary transition-colors">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-xl md:text-2xl font-light">+</div>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Add Product</span>
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
                      <p className="text-gray-400 text-[10px] md:text-xs font-black uppercase tracking-widest animate-pulse">AI is analyzing products...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="p-20 text-center text-red-500 font-medium">
                    {error}
                  </td>
                </tr>
              ) : (comparisonData && comparisonData.comparison) ? (
                <>
                  {comparisonData.comparison.map((row, idx) => (
                    <tr key={idx} className="group">
                      <td className="p-4 md:p-6 bg-gray-50/30 border-b border-gray-50 font-black text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 align-top">
                        {row.point}
                      </td>
                      {localCompareList.map((product) => (
                        <td key={product._id} className="p-4 md:p-6 border-b border-gray-50 text-[13px] md:text-sm text-gray-600 leading-relaxed group-hover:bg-gray-50/20 transition-colors">
                          {row?.details?.[product.name] || row?.details?.[Object.keys(row?.details || {}).find(k => product.name.includes(k) || k.includes(product.name))] || 'N/A'}
                        </td>
                      ))}
                      {[...Array(Math.max(0, 3 - localCompareList.length))].map((_, i) => (
                        <td key={`empty-td-${i}`} className="p-6 border-b border-gray-50 bg-gray-50/10"></td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 md:p-6 bg-primary/5 border-b border-primary/10 font-black text-[10px] md:text-[11px] uppercase tracking-wider text-primary align-top">
                      Summary
                    </td>
                    <td colSpan={localCompareList.length} className="p-4 md:p-6 border-b border-primary/10 bg-primary/5 text-[13px] md:text-sm text-gray-700 font-medium leading-relaxed italic">
                      {comparisonData.summary || 'Comparison analysis complete.'}
                    </td>
                    {[...Array(Math.max(0, 3 - localCompareList.length))].map((_, i) => (
                      <td key={`empty-summary-${i}`} className="p-6 border-b border-primary/10 bg-primary/5"></td>
                    ))}
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center text-gray-400 italic">
                    {comparisonData ? 'AI returned an unexpected response format.' : 'Comparison details will appear here.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
