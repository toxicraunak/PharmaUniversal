import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Config from './models/Config.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import seedData from './data/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());


// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pharmauniversal';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    seedData();
  })
  .catch(err => console.log('MongoDB Connection Error:', err));


// API Routes
app.get('/api/config', async (req, res) => {
  try {
    const config = await Config.findOne();
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/config', async (req, res) => {
  try {
    let config = await Config.findOne();

    if (!config) {
      config = new Config(req.body);
    } else {
      Object.assign(config, req.body);
    }

    await config.save();

    res.json(config);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ===== SERVE VITE FRONTEND =====

const distPath = path.join(__dirname, '../dist');

app.use(express.static(distPath));

app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});