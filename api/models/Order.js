import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    selectedPackage: {
      name: String,
      price: Number
    },
    quantity: Number
  }],
  billingDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'] },
  paymentMethod: { type: String, default: 'Direct Bank Transfer' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
