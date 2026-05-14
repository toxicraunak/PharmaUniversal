import React from 'react';
import { Helmet } from 'react-helmet-async';

const DynamicSEO = ({ config }) => {
  if (!config) return null;

  const { seo, siteName } = config;

  return (
    <Helmet defer={false}>
      {/* Basic Meta Tags */}
      <title>{seo?.title || siteName || 'Pharma Universal'}</title>
      <meta name="description" content={seo?.description} />
      <meta name="keywords" content={seo?.keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo?.title || siteName} />
      <meta property="og:description" content={seo?.description} />
      <meta property="og:image" content={seo?.ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={seo?.title || siteName} />
      <meta property="twitter:description" content={seo?.description} />
      <meta property="twitter:image" content={seo?.ogImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default DynamicSEO;
