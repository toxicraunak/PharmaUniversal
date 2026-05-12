import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Pharma Universal' },
  logo: { type: String, default: '/logo.png' },
  contact: {
    address: { type: String, default: '230 Oxford Rd Kenilworth, IL 60043 USA' },
    email: { type: String, default: 'info@pharmauniversal.com' },
    phone: { type: String, default: '+1 (123) 456-7890' },
    whatsapp: { type: String, default: '+11234567890' }
  },
  seo: {
    title: { type: String, default: 'Pharma Universal - A Trusted Online Pharmacy' },
    description: { type: String, default: 'Get the best quality medication online with speedy delivery and safe payment methods.' },
    keywords: { type: String, default: 'pharmacy, online medicine, health, medication' },
    ogImage: { type: String, default: '/og-image.jpg' }
  },
  socialLinks: {
    facebook: { type: String, default: '#' },
    twitter: { type: String, default: '#' },
    instagram: { type: String, default: '#' },
    vimeo: { type: String, default: '#' }
  }
});

const Config = mongoose.model('Config', configSchema);
export default Config;
