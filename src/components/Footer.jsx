import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import sslCertificate from "../assets/media/ssl-certificate.webp";
import googleReviewBadge from "../assets/media/google-review-badge.webp";
import trustpilotReview from "../assets/media/trustpilot-review.webp";
import facebookReview from "../assets/media/facebook-review.webp";

const Footer = ({ config, products }) => {
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

  const footerProducts = (products || []).filter(p => p.onFooter === 1 || p.onFooter === true);

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
                {
                  icon: "fab fa-facebook-f",
                  label: "Facebook",
                  buttonColor: "hover:bg-[#1877F2] hover:border-[#1877F2]",
                  tooltipColor: "bg-[#1877F2]",
                  pointerColor: "border-t-[#1877F2]",
                  href: config?.socialLinks?.facebook,
                },
                {
                  icon: "fab fa-x-twitter",
                  label: "Twitter",
                  buttonColor: "hover:bg-sky-500 hover:border-sky-500",
                  tooltipColor: "bg-sky-500",
                  pointerColor: "border-t-sky-500",
                  href: config?.socialLinks?.twitter,
                },
                {
                  icon: "fab fa-instagram",
                  label: "Instagram",
                  buttonColor:
                    "hover:bg-gradient-to-br hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-[#ee2a7b]",
                  tooltipColor:
                    "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
                  pointerColor: "border-t-[#ee2a7b]",
                  href: config?.socialLinks?.instagram,
                },
                {
                  icon: "fab fa-vimeo-v",
                  label: "Vimeo",
                  buttonColor: "hover:bg-[#1AB7EA] hover:border-[#1AB7EA]",
                  tooltipColor: "bg-[#1AB7EA]",
                  pointerColor: "border-t-[#1AB7EA]",
                  href: config?.socialLinks?.vimeo,
                },
              ].map((item, i) => (
                <div key={i} className="relative group/social">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 border border-gray-700 flex items-center justify-center transition-all duration-300 text-white cursor-pointer ${item.buttonColor}`}
                  >
                    <i className={`${item.icon} text-[14px]`}></i>
                  </a>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/social:opacity-100 pointer-events-none transition-all duration-300 transform -translate-y-2 group-hover/social:translate-y-0 z-60">
                    <div
                      className={`text-white text-[10px] px-2 py-1 rounded-sm whitespace-nowrap font-display font-bold relative ${item.tooltipColor}`}
                    >
                      {item.label}

                      {/* Pointer */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 ${item.pointerColor}`}
                      ></div>
                    </div>
                  </div>
                </div>
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
              {footerProducts.map((product) => (
                <Link 
                  key={product._id} 
                  to={`/shop/${product.slug}`} 
                  className="text-gray-400 hover:text-primary text-[12px] font-display transition-colors"
                >
                  Buy {product.name}
                </Link>
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
