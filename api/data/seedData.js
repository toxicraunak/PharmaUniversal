import Config from '../models/Config.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Setting from '../models/Setting.js';
import seedConfig from './seedConfig.js';
import seedCategory from './seedCategory.js';
import seedProduct from './seedProduct.js';

const seedData = async () => {
  try {
    // Seed Config
    const configCount = await Config.countDocuments();
    if (configCount === 0) {
      await seedConfig();
    }

    // Seed Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await seedCategory();
    }

    // Seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await seedProduct();
    }

    // Seed Settings
    const settingCount = await Setting.countDocuments();
    if (settingCount === 0) {
      await Setting.create([
        {
          key: 'smtp_config',
          value: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: 'your-email@gmail.com',
              pass: 'your-app-password'
            },
            senderName: 'Pharma Universal'
          },
          description: 'SMTP Configuration for sending emails'
        },
        {
          key: 'admin_notify_email',
          value: 'admin@pharmauniversal.com',
          description: 'Email address to notify admin of new orders'
        }
      ]);
      console.log('Settings seeded');
    }
    
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

export default seedData;
