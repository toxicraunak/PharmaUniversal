// models/Product.js

import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fullName: { type: String, required: true },

    slug: { type: String, required: true, unique: true },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    isAvailable: { type: Boolean, default: true },
    onFooter: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },

    // Example:
    // {
    //   strength: "50mg",
    //   form: "Tablet",
    //   manufacturer: "Pfizer"
    // }
    features: {
      type: [String],
      default: [],
    },

    // Example:
    // [
    //   { label: "60 Pills", price: 50, mrp: 80 },
    //   { label: "120 Pills", price: 90, mrp: 140 }
    // ]
    packages: {
      type: [packageSchema],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    // HTML content
    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);