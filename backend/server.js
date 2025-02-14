const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the backend of your E-Commerce Website!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

  const Product = require('./models/Product');

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Error retrieving products');
  }
});

// Add new product
app.post('/products', async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;
  
  const newProduct = new Product({ name, description, price, stock, imageUrl });
  
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).send('Error adding product');
  }
});

// Update product
app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).send('Error updating product');
  }
});

// Delete product
app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send('Product deleted');
  } catch (err) {
    res.status(400).send('Error deleting product');
  }
});
