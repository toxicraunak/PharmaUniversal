import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import sslCertificate from "../assets/media/ssl-certificate.webp";
import googleReviewBadge from "../assets/media/google-review-badge.webp";
import trustpilotReview from "../assets/media/trustpilot-review.webp";
import facebookReview from "../assets/media/facebook-review.webp";

const Footer = ({ config }) => {
  const usefulPages = [
    { name: 'FAQ', href: '/faq' },
    { name: 'PRIVACY POLICY', href: '/privacy-policy' },
    { name: 'ANTISPAM POLICY', href: '/antispam-policy' },
    { name: 'DELIVERY POLICY', href: '/delivery-policy' },
    { name: 'TERMS & CONDITIONS', href: '/terms-and-conditions' },
    { name: 'RETURNS & REFUNDS', href: '/returns-and-refunds' },
    { name: 'ORDER PROCESSING', href: '/order-processing' },
    { name: 'BLOG', href: '/blog' },
    { name: 'REFER A FRIEND', href: '/refer-a-friend' },
    { name: 'Why Shop with US', href: '/why-shop-with-us' }
  ];

  const reviewImages = [
    { url: sslCertificate, alt: "SSL Certificate" },
    { url: googleReviewBadge, alt: "Google Review Badge" },
    { url: trustpilotReview, alt: "Trust Pilot Review Badge" },
    { url: facebookReview, alt: "Facebook Review" },
  ];

  const topSellers = [
    'Buy Belbien 10mg', 'Buy Alprahblue', 'Buy Ksalol 1mg', 'Buy Rlam 1mg',
    'Buy Belladol 100mg', 'Buy Jpdol 100mg', 'Buy Hydrocodone 10mg', 'Buy Tapentadol 100mg',
    'Buy Lypin 10mg', 'Buy Bensedin', 'Buy Lorazepam 2mg', 'Buy Valium 10mg',
    'Buy Citra 100mg', 'Buy Oltram 100mg', 'Buy Oxycodone 30mg', 'Buy Trakem 100mg',
    'Buy Alpz 1mg', 'Buy Clonazepam 2mg', 'Buy Rivotril 2mg', 'Buy Xanax Alko 1mg',
    'Buy Clovidol 100mg', 'Buy Oltram Loose Pills', 'Buy Soma 350mg'
  ];

  return (
    <footer className="bg-[#121212] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          {/* Column 1: Info (Span 3) */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <Link to="/">
                <img src={config?.logo} alt={config?.siteName} className="h-14 w-auto object-contain brightness-0 invert" />
              </Link>
            </div>
            <div className="space-y-4 text-gray-400 font-display text-[13px] leading-relaxed">
              <p className="max-w-[200px]">
                {config?.contact?.address}
              </p>
              <p>
                {config?.contact?.email}
              </p>
            </div>
            <div className="flex gap-3 mt-8">
              {[
                "fab fa-facebook-f",
                "fab fa-x-twitter",
                "fab fa-instagram",
                "fab fa-vimeo-v",
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 border border-gray-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  <i className={`${icon} text-[14px]`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Useful Pages (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[20px] font-heading! font-bold mb-6 uppercase tracking-tight">Useful Pages</h4>
            <ul className="space-y-2">
              {usefulPages.map((page) => (
                <li key={page.name}>
                  <Link to={page.href} className="text-gray-400 hover:text-primary text-[12px] font-display uppercase transition-colors">{page.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 & 4: Top Sellers (Span 7) */}
          <div className="lg:col-span-7">
            <h4 className="text-[20px] font-heading! font-bold mb-6 uppercase tracking-tight">Top Sellers</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
              {topSellers.map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-primary text-[12px] font-display transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-10">
            <span className="text-[18px] font-heading font-bold uppercase">Secured By</span>

            {/* Review Buttons */}
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {reviewImages.map((img, i) => (
                <a key={i} href="#" className="block">
                  <img src={img.url} alt={img.alt} className="h-16" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 text-[16px] text-gray-400 font-display font-medium border-t border-gray-800/50 pt-6">
             <p className="uppercase tracking-wider font-bold font-heading!">© {config?.siteName || 'PHARMAUNIVERSAL'} . All Rights Reserved. {new Date().getFullYear()}</p>
             
             <div className="flex items-center gap-6">
                <img src="/payment-placeholder.png" alt="" className="h-4 opacity-50" />
                <span className="uppercase text-white font-bold tracking-widest text-[14px]">payment</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
