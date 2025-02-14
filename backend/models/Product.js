const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  imageUrl: { type: String, required: true }
});

// Create product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
