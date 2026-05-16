import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  CheckCircle2, 
  ShoppingCart, 
  Heart, 
  RefreshCcw, 
  ChevronRight, 
  ChevronLeft,
  MessageCircle,
  Share2,
  X,
  GitCompareArrows
} from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';
import { ProductCard } from '../components/ProductSection';

const ProductDetails = ({ products, config }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const { cartItems, addToCart } = useCart();
  const { compareList, addToCompare } = useCompare();

  const product = useMemo(() => {
    return products?.find(p => p.slug === slug);
  }, [products, slug]);

  const isComparing = useMemo(() => {
    return compareList.some(p => p._id === product?._id);
  }, [compareList, product?._id]);

  // Sync scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Wishlist sync
  useEffect(() => {
    if (product) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(wishlist.some(item => item._id === product._id));
    }
  }, [product]);

  // Fetch Reviews
  useEffect(() => {
    if (!product) return;

    const fetchReviews = async () => {
      setLoadingReviews(true);
      try {
        const targetCount = Math.floor(Math.random() * 21) + 10; // 10 to 30
        
        // BASE_CF_API_URL from .env might not be prefixed with VITE_, so we check both or use fallback
        let baseUrl = import.meta.env.VITE_BASE_CF_API_URL || 'https://devil-pharmacy-reviews.sahilraz9265.workers.dev/';
        
        // Ensure baseUrl ends with /
        if (!baseUrl.endsWith('/')) baseUrl += '/';
        
        const medicineName = product.fullName || product.name;
        
        const response = await fetch(`${baseUrl}reviews?medicine=${encodeURIComponent(medicineName)}&count=${targetCount}`);
        const result = await response.json();
        
        let allReviews = result.reviews || [];
        
        // Map API response to match UI structure and slice to target count
        const mappedReviews = allReviews.slice(0, targetCount).map((r, index) => ({
          id: index,
          name: r.name,
          date: r.date,
          comment: r.review,
          rating: 5 // Default rating
        }));
        
        setReviews(mappedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-primary hover:underline font-bold">Back to Shop</Link>
      </div>
    );
  }

  const prices = (product.packages || []).map(p => p.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const currentPackage = product.packages?.find(p => p.label === selectedPackage);
  const unitPrice = currentPackage ? currentPackage.price : minPrice;
  const unitMrp = currentPackage ? currentPackage.mrp : (minPrice * 1.5);
  
  const totalPrice = (unitPrice * quantity).toFixed(2);
  const totalMrp = (unitMrp * quantity).toFixed(2);


  const handleEmailSupport = () => {
    const subject = `Order Inquiry: ${product.fullName || product.name}`;
    const body = `Hello, I'm interested in purchasing:
Product: ${product.fullName || product.name}
Package: ${selectedPackage || 'Not selected'}
Quantity: ${quantity}
Price: $${totalPrice}
URL: ${window.location.href}

Please let me know how to proceed.`;
    window.location.href = `mailto:${config?.contact?.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;
    if (isWishlisted) {
      newWishlist = wishlist.filter(item => item._id !== product._id);
    } else {
      newWishlist = [...wishlist, product];
    }
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const title = `${product.fullName || product.name} - ${config?.siteName || 'Pharmacy Universal'}`;

  return (
    <div className="min-h-screen bg-white font-display">
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>
      {/* Breadcrumbs */}
      <div className="bg-gray-50/30 border-b border-gray-100 py-6 sm:py-4">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <nav className="flex items-center gap-2 text-[11px] sm:text-[12px] text-gray-400 font-bold overflow-x-auto no-scrollbar whitespace-nowrap uppercase tracking-wider">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <Link 
              to={`/product-category/${product.category?.slug}`} 
              className="hover:text-primary transition-colors"
            >
              {product.category?.name || 'Category'}
            </Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="text-primary truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 items-start">
          
          {/* Left Side: Image */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[480px] mx-auto md:mx-0"
          >
            <div className="relative h-72 w-full sm:w-[85%] overflow-hidden bg-white border border-primary p-6 shadow-sm flex items-center justify-center group rounded-tl-4xl rounded-br-4xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Right Side: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between mb-1.5">
              <h1 className="text-2xl md:text-[32px] font-heading font-black text-gray-900 tracking-tight leading-tight">
                {product.fullName || product.name}
              </h1>
              <div className="hidden sm:flex gap-1 shrink-0">
                <button className="p-1 border border-gray-100 rounded-md hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer"><ChevronLeft size={16} /></button>
                <button className="p-1 border border-gray-100 rounded-md hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer"><ChevronRight size={16} /></button>
              </div>
            </div>

            <div className="flex items-center gap-5 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Availability:</span>
                <span className={`text-[12px] font-bold uppercase tracking-wider ${product.isAvailable ? 'text-emerald-500' : 'text-red-500'}`}>
                  {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-primary text-primary" />)}
                </div>
                <span 
                  onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="text-[11px] text-gray-400 font-bold hover:text-primary cursor-pointer transition-colors underline underline-offset-4 tracking-widest"
                >
                  {reviews.length || 0} Reviews
                </span>
              </div>
            </div>

            {/* Fixed Price Range */}
            <div className="mb-6">
              <span className="text-xl sm:text-2xl font-black text-primary tracking-tight">
                ${minPrice.toFixed(2)} — ${maxPrice.toFixed(2)}
              </span>
            </div>

            {/* Feature List */}
            <div className="space-y-2.5 mb-4">
              {(product.features || []).map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[13px] font-bold text-gray-700 italic">
                  <CheckCircle2 size={18} className="text-white shrink-0" fill="green" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>

            {/* Package Selector */}
            <div className="mb-2 p-6 bg-gray-50/30 rounded-2xl border border-gray-100/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Package</span>
                {selectedPackage && (
                  <button 
                    onClick={() => {setSelectedPackage(null); setQuantity(1);}}
                    className="text-[10px] font-black uppercase text-red-500 hover:underline flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <X size={10} strokeWidth={3} /> Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.packages?.map((pkg, idx) => (
                  <button
                    key={pkg.label || idx}
                    onClick={() => setSelectedPackage(pkg.label)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-md border transition-all duration-300 cursor-pointer ${
                      selectedPackage === pkg.label 
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' 
                      : 'bg-white border-gray-100 text-gray-500 hover:border-primary/40'
                    }`}
                  >
                    {pkg.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Specific Price (Animated) */}
              <AnimatePresence mode="wait">
                {selectedPackage && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-baseline gap-3 pt-2 border-t border-gray-100"
                  >
                    <span className="text-gray-300 line-through font-bold text-lg">${totalMrp}</span>
                    <span className="text-3xl font-black text-primary tracking-tighter">${totalPrice}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Quantity</span>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden h-12 bg-gray-50/50">
                    <input 
                      type="number" 
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center bg-transparent font-black text-gray-900 outline-none text-base"
                    />
                    <div className="flex flex-col border-l border-gray-100 h-full">
                      <button 
                        onClick={() => setQuantity(q => q + 1)}
                        className="flex-1 px-2 hover:bg-gray-100 transition-colors border-b border-gray-100 cursor-pointer"
                      >
                        <ChevronRight size={12} className="-rotate-90" />
                      </button>
                      <button 
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="flex-1 px-2 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <ChevronRight size={12} className="rotate-90" />
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      const pkgObj = product.packages?.find(p => p.label === selectedPackage) || product.packages?.[0];
                      addToCart(product, pkgObj, quantity);
                      navigate('/cart');
                    }}
                    className="flex-1 h-12 bg-black text-white rounded-lg flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest hover:bg-primary transition-all duration-300 group shadow-lg cursor-pointer py-4"
                  >
                    <ShoppingCart size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                    Add To Cart
                  </button>

                  <button 
                    onClick={handleEmailSupport}
                    className="flex-1 h-12 py-4 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <Mail size={18} />
                    Buy Via Email
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleWishlist}
                  className={`flex-1 h-11 rounded-lg border flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    isWishlisted 
                    ? 'bg-red-50 border-red-100 text-red-500' 
                    : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-white hover:border-gray-200'
                  }`}
                >
                  <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                  {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
                </button>
                <button 
                  onClick={() => addToCompare(product)}
                  className={`flex-1 h-11 border rounded-lg flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    isComparing 
                    ? 'bg-primary/10 border-primary text-primary' 
                    : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-white hover:border-gray-200'
                  }`}
                >
                  {isComparing ? <GitCompareArrows size={14} /> : <RefreshCcw size={14} />}
                  {isComparing ? 'Comparing' : 'Compare'}
                </button>
              </div>
            </div>

            {/* Meta Info */}
            <div className="space-y-3.5 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Categories:</span>
                <Link to={`/product-category/${product.category?.slug}`} className="text-gray-600 hover:text-primary uppercase transition-colors tracking-wide">
                  {product.category?.name}
                </Link>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {(product.tags || []).map((tag, i) => (
                    <span key={i} className="text-gray-600 tracking-wide">
                      {tag}{i < product.tags.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Share:</span>
                <div className="flex gap-4">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"><i className="fab fa-facebook-f text-sm"></i></button>
                  <button className="text-gray-400 hover:text-sky-400 transition-colors cursor-pointer"><i className="fab fa-twitter text-sm"></i></button>
                  <button className="text-gray-400 hover:text-blue-700 transition-colors cursor-pointer"><i className="fab fa-linkedin-in text-sm"></i></button>
                  <button className="text-gray-400 hover:text-primary transition-colors cursor-pointer"><Share2 size={14} /></button>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Description Section */}
        <div className="mt-16 sm:mt-24">
          <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-gray-100 pb-4">
            <h2 className="text-xl sm:text-3xl font-black text-primary uppercase tracking-wide font-heading!">Description</h2>
            <ChevronRight size={20} className="-rotate-90 text-gray-300" />
          </div>
          
          <div className="prose prose-emerald max-w-none prose-h2:text-xl prose-h2:font-black prose-h2:uppercase prose-h2:text-primary prose-p:text-sm sm:prose-p:text-base prose-p:text-gray-600 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-gray-900">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>

        {/* Additional Information */}
        <div className="py-6">
          <h2 className="text-xl sm:text-3xl font-black text-primary uppercase tracking-wide font-heading! py-1">Additional Information</h2>
          <div className="border border-gray-100 divide-y divide-gray-300"></div>
          <div className="flex flex-row text-base py-4">
            <span className="text-gray-500 font-medium w-40">Select Package:</span>
            {product.packages?.map((pkg, idx) => (
              <span
                key={pkg.label || idx}
                className="text-gray-600 tracking-wide font-semibold pr-2"
              >
                {pkg.label}
                {idx !== product.packages.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="py-6" id="reviews">
          <h2 className="text-xl sm:text-3xl font-black text-primary uppercase tracking-wide font-heading! py-1">Reviews ({reviews.length})</h2>
          <div className="border border-gray-100 divide-y divide-gray-300"></div>

          <div className="border border-primary rounded-md py-2 mt-6">
            {loadingReviews ? (
              <div className="py-10 flex flex-col items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Loading Reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-center text-gray-500">No reviews yet.</p>
            ) : (
              reviews.map((review, idx) => (
                <div key={review.id} className="px-2">
                  <div className="flex flex-row mt-2">
                    <div>
                      <img className="w-14 h-14" src="https://secure.gravatar.com/avatar/3d79eb99ef0b25c640a9914cf2d575cfe00c1a70eb6bb13749ff809d7be1ed5c?s=60&d=mm&r=g" alt="Avatar" />
                    </div>
                    <div className="flex-1 px-4 flex-col">
                      <div className="flex items-center w-full">
                        <div className="flex items-center">
                          <span className="text-xs font-semibold mr-2">
                            {review.name}
                          </span>
                          <span className="text-xs">
                            -{" "}
                            {new Date(review.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 ml-auto">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <i
                              key={i}
                              className="fa fa-star text-primary text-xs"
                            ></i>
                          ))}
                        </div>
                      </div>
                      <div className="mt-1">
                        <span className="text-base text-justify">{review.comment}</span>
                      </div>
                    </div>
                  </div>
                  {idx !== reviews.length - 1 ? (
                    <div className="border border-gray-100 my-6"></div>
                  ) : (
                    <div className="mb-4"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Review Box */}
        <div className="mt-8 border border-primary rounded-lg p-8 bg-white mb-16">
          <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-widest mb-6">Add a Review</h3>
          <p className="text-[15px] font-medium text-gray-600">
            You must be <Link to="/login" className="text-primary hover:underline">logged in</Link> to post a review.
          </p>
        </div>

        {/* Related Products Section */}
        <div className="mt-6 sm:mt-12">
          <div className="text-left mb-12">
            <h2 className="text-base font-heading font-black text-gray-900 uppercase tracking-tight mb-2 underline underline-offset-5">Related Products</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {products
              ?.filter(p => p.category?._id === product.category?._id && p._id !== product._id)
              .slice(0, 4)
              .map(related => (
                <ProductCard key={related._id} product={related} />
              ))
            }
          </div>
          {products?.filter(p => p.category?._id === product.category?._id && p._id !== product._id).length === 0 && (
            <p className="text-center text-gray-400 italic py-10">No related products found in this category.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
