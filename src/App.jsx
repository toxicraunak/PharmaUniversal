import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import DynamicSEO from './components/DynamicSEO';
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
import Shop from './home/Shop';

import FloatingActions from './components/FloatingActions';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Component to decide whether to show Home or Search results on the root path
const RootRoute = ({ config, products, categories }) => {
  const [searchParams] = useSearchParams();
  const isSearch = searchParams.get('s');

  if (isSearch) {
    return <Search products={products} />;
  }
  return <Home config={config} products={products} categories={categories} />;
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
      <Router>
        <div className="flex flex-col min-h-screen">
          <DynamicSEO config={config} />
          
          <Header config={config} categories={categories} products={products} />
          
          <main className="grow">
            <Routes>
              <Route path="/" element={<RootRoute config={config} products={products} categories={categories} />} />
              <Route path="/shop" element={<Shop config={config} products={products} categories={categories} />} />
              <Route path="/shop/:slug" element={<ProductDetails products={products} config={config} />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact-us" element={<Contact config={config} />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/why-shop-with-us" element={<WhyShop />} />
              <Route path="/safe-payment" element={<SecurePayment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer config={config} products={products} />
          <FloatingActions config={config} />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
