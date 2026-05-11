import React from 'react';
import Hero from '../components/Hero';
import WelcomeSection from '../components/WelcomeSection';
import ProductSection from '../components/ProductSection';
import CatPro from '../components/CatPro';
import WhyUs from '../components/WhyUs';
import BlogSection from '../components/BlogSection';

const Home = ({ config, products, categories }) => {
  return (
    <>
      <Hero config={config} />
      <WelcomeSection config={config} />
      <ProductSection products={products} />
      <CatPro categories={categories} products={products} />
      <WhyUs config={config} />
      <BlogSection />
    </>
  );
};

export default Home;
