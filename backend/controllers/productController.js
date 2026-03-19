const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  const category = req.query.category ? { category: req.query.category } : {};
  const brand = req.query.brand ? { brand: req.query.brand } : {};
  const seller = req.query.seller ? { seller: req.query.seller } : {};
  const inStock = req.query.inStock === 'true' ? { countInStock: { $gt: 0 } } : {};
  const rating = req.query.rating ? { rating: { $gte: Number(req.query.rating) } } : {};
  const priceFilter = req.query.minPrice || req.query.maxPrice ? {
    price: {
      ...(req.query.minPrice && { $gte: Number(req.query.minPrice) }),
      ...(req.query.maxPrice && { $lte: Number(req.query.maxPrice) }),
    },
  } : {};

  const filter = { ...keyword, ...category, ...brand, ...seller, ...inStock, ...rating, ...priceFilter };

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
};
// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Admin only
const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }

    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin only
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const { name, price, description, image, brand, category, countInStock } = req.body;

    product.name         = name         ?? product.name;
    product.price        = price        ?? product.price;
    product.description  = description  ?? product.description;
    product.image        = image        ?? product.image;
    product.brand        = brand        ?? product.brand;
    product.category     = category     ?? product.category;
    product.countInStock = countInStock ?? product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin only
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};