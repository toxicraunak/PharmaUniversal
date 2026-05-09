import React from 'react';
import Hero from '../components/Hero';
import WelcomeSection from '../components/WelcomeSection';

const Home = ({ config }) => {
  return (
    <>
      <Hero config={config} />
      <WelcomeSection config={config} />
      
    </>
  );
};

export default Home;
