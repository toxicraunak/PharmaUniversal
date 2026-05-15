import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Config from './models/Config.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';
import Setting from './models/Setting.js';
import seedData from './data/seedData.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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

// Auth Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw new Error();

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Email Helper
const sendOrderEmails = async (order) => {
  try {
    const smtpSetting = await Setting.findOne({ key: 'smtp_config' });
    const adminSetting = await Setting.findOne({ key: 'admin_notify_email' });
    
    if (!smtpSetting || !adminSetting) {
      console.log('Email settings missing. Skipping email.');
      return;
    }

    const transporter = nodemailer.createTransport(smtpSetting.value);

    // 1. Send to User
    const userMailOptions = {
      from: `"${smtpSetting.value.senderName || 'Pharmacy Universal'}" <${smtpSetting.value.auth.user}>`,
      to: order.billingDetails.email,
      subject: `Order Received #${order._id.toString().slice(-6).toUpperCase()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #4CAF50;">Thank you for your order!</h2>
          <p>Hi ${order.billingDetails.firstName},</p>
          <p>We've received your order and it's being processed. Your order ID is <strong>#${order._id.toString().slice(-6).toUpperCase()}</strong>.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f8f8f8;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Product</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Qty</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #eee;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} (${item.selectedPackage.name})</td>
                  <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">$${(item.selectedPackage.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; color: #4CAF50;">$${order.totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <p>If you have any questions, feel free to contact us.</p>
          <p>Best regards,<br/>Pharma Universal Team</p>
        </div>
      `
    };

    // 2. Send to Admin
    const adminMailOptions = {
      from: `"${smtpSetting.value.senderName || 'Pharmacy Universal'}" <${smtpSetting.value.auth.user}>`,
      to: adminSetting.value,
      subject: `New Order Placed #${order._id.toString().slice(-6).toUpperCase()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #2196F3;">New Order Notification</h2>
          <p>A new order has been placed on the website.</p>
          <p><strong>Order ID:</strong> #${order._id.toString().slice(-6).toUpperCase()}</p>
          <p><strong>Customer:</strong> ${order.billingDetails.firstName} ${order.billingDetails.lastName} (${order.billingDetails.email})</p>
          <p><strong>Phone:</strong> ${order.billingDetails.phone}</p>
          <p><strong>Address:</strong> ${order.billingDetails.address}, ${order.billingDetails.city}, ${order.billingDetails.state} ${order.billingDetails.zip}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f8f8f8;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Product</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Qty</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #eee;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} (${item.selectedPackage.name})</td>
                  <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">$${(item.selectedPackage.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; color: #2196F3;">$${order.totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        </div>
      `
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);
    console.log('Order emails sent successfully');
  } catch (err) {
    console.error('Error sending order emails:', err);
  }
};


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

// ===== AUTH ROUTES =====

app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ user: userObj, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
    const userObj = user.toObject();
    delete userObj.password;

    res.json({ user: userObj, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/auth/me', auth, async (req, res) => {
  res.json(req.user);
});

app.patch('/api/auth/profile', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'phone', 'address', 'city', 'state', 'zip', 'country'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ===== ORDER ROUTES =====

app.post('/api/orders', async (req, res) => {
  try {
    const { items, billingDetails, totalAmount, paymentMethod, userId } = req.body;
    
    const order = new Order({
      user: userId || null,
      items,
      billingDetails,
      totalAmount,
      paymentMethod
    });

    await order.save();
    
    // Trigger emails in background
    sendOrderEmails(order);

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/orders/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
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

// Setting routes (Admin only ideally)
app.post('/api/settings', async (req, res) => {
  try {
    const { key, value, description } = req.body;
    let setting = await Setting.findOne({ key });
    
    if (setting) {
      setting.value = value;
      if (description) setting.description = description;
    } else {
      setting = new Setting({ key, value, description });
    }
    
    await setting.save();
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/settings/:key', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    res.json(setting);
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