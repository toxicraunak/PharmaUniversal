import Config from '../models/Config.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
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
    
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

export default seedData;
