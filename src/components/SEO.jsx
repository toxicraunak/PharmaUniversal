import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, config }) => {
  const siteTitle = config?.siteName || 'PharmaUniversal - Premium Pharmacy';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDescription = description || config?.seo?.description || 'Get high-quality pharmaceutical products at the best prices. Reliable, fast, and secure delivery.';
  const siteKeywords = keywords || config?.seo?.keywords;
  const baseUrl = window.location.origin;
  const canonicalUrl = url ? `${baseUrl}${url}` : window.location.href;
  const defaultImage = config?.seo?.ogImage || `${baseUrl}/logo.png`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      {siteKeywords && <meta name="keywords" content={siteKeywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;
