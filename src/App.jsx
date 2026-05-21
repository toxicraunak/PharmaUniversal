import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HashRouter as Router, Routes, Route, useSearchParams, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';

// Admin Imports
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ProductManagement from './admin/ProductManagement';
import CategoryManagement from './admin/CategoryManagement';
import OrderManagement from './admin/OrderManagement';
import UserManagement from './admin/UserManagement';
import SettingsManagement from './admin/SettingsManagement';
import Header from './components/Header';
import Footer from './components/Footer';
import DynamicSEO from './components/DynamicSEO';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import WhyShop from './pages/WhyShop';
import SecurePayment from './pages/SecurePayment';
import ProductCategory from './pages/ProductCategory';
import ComparePage from './pages/Compare';
import Shop from './home/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AntispamPolicy from './pages/AntispamPolicy';
import DeliveryPolicy from './pages/DeliveryPolicy';
import TermsConditions from './pages/TermsConditions';
import ReturnsRefunds from './pages/ReturnsRefunds';
import OrderProcessing from './pages/OrderProcessing';
import Blog from './pages/Blog';
import ReferFriend from './pages/ReferFriend';
import OrderReceived from './pages/OrderReceived';

import FloatingActions from './components/FloatingActions';
import ComparePanel from './components/ComparePanel';
import { CompareProvider } from './context/CompareContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Component to decide whether to show Home or Search results on the root path
const RootRoute = ({ config, products, categories }) => {
  const [searchParams] = useSearchParams();
  const isSearch = searchParams.get('s');

  if (isSearch) {
    return <Search products={products} />;
  }
  return <Home config={config} products={products} categories={categories} />;
};

// Protected Route Component for Admin
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
  
  if (!token || !user.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <AdminLayout>{children}</AdminLayout>;
};

function App() {
  const [config, setConfig] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, categoriesRes, productsRes] = await Promise.all([
          axios.get(`${API_URL}/config`),
          axios.get(`${API_URL}/categories`),
          axios.get(`${API_URL}/products`)
        ]);
        setConfig(configRes.data);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <CompareProvider>
            <Router>
              <AppContent config={config} categories={categories} products={products} />
            </Router>
          </CompareProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

function AppContent({ config, categories, products }) {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <SEO config={config} />
      
      {!isAdminRoute && <Header config={config} categories={categories} products={products} />}
      
      <main className={isAdminRoute ? "h-screen" : "grow"}>
        <Routes>
          <Route path="/" element={<RootRoute config={config} products={products} categories={categories} />} />
          <Route path="/shop" element={<Shop config={config} products={products} categories={categories} />} />
          <Route path="/shop/:slug" element={<ProductDetails products={products} config={config} />} />
          <Route path="/product-category/:slug" element={<ProductCategory products={products} categories={categories} config={config} />} />
          <Route path="/compare" element={<ComparePage config={config} />} />
          <Route path="/cart" element={<Cart config={config} />} />
          <Route path="/checkout" element={<Checkout config={config} />} />
          <Route path="/faq" element={<FAQ config={config} />} />
          <Route path="/contact-us" element={<Contact config={config} />} />
          <Route path="/how-it-works" element={<HowItWorks config={config} />} />
          <Route path="/about" element={<About config={config} />} />
          <Route path="/why-shop-with-us" element={<WhyShop config={config} />} />
          <Route path="/safe-payment" element={<SecurePayment config={config} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy config={config} />} />
          <Route path="/antispam-policy" element={<AntispamPolicy config={config} />} />
          <Route path="/delivery-policy" element={<DeliveryPolicy config={config} />} />
          <Route path="/terms-conditions" element={<TermsConditions config={config} />} />
          <Route path="/refund-returns-policy" element={<ReturnsRefunds config={config} />} />
          <Route path="/order-processing" element={<OrderProcessing config={config} />} />
          <Route path="/blog" element={<Blog config={config} />} />
          <Route path="/refer-a-friend" element={<ReferFriend config={config} />} />
          <Route path="/order-received" element={<OrderReceived config={config} />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><ProductManagement /></AdminRoute>} />
          <Route path="/admin/categories" element={<AdminRoute><CategoryManagement /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><OrderManagement /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><SettingsManagement /></AdminRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminRoute && (
        <>
          <CartDrawer />
          <ComparePanel />
          <Footer config={config} products={products} />
          <FloatingActions config={config} />
        </>
      )}
    </div>
  );
}

export default App;
