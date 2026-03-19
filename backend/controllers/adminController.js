const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

// GET /api/admin/stats
const getAdminStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const orders = await Order.find();
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);

  const ordersByStatus = {
    Pending: await Order.countDocuments({ status: 'Pending' }),
    Processing: await Order.countDocuments({ status: 'Processing' }),
    Shipped: await Order.countDocuments({ status: 'Shipped' }),
    Delivered: await Order.countDocuments({ status: 'Delivered' }),
    Cancelled: await Order.countDocuments({ status: 'Cancelled' }),
  };

  const productsByCategory = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const topCategories = await Order.aggregate([
    { $unwind: '$orderItems' },
    { $lookup: { from: 'products', localField: 'orderItems.product', foreignField: '_id', as: 'productInfo' } },
    { $unwind: { path: '$productInfo', preserveNullAndEmptyArrays: true } },
    { $group: { _id: '$productInfo.category', totalSold: { $sum: '$orderItems.qty' } } },
    { $sort: { totalSold: -1 } },
    { $limit: 8 },
  ]);

  res.json({
    totalUsers, totalProducts, totalOrders, totalRevenue,
    ordersByStatus, productsByCategory, topCategories,
  });
});

// GET /api/admin/orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

// PUT /api/admin/orders/:id/status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error('Order not found'); }
  order.status = req.body.status;
  if (req.body.status === 'Delivered') { order.isPaid = true; order.paidAt = Date.now(); }
  await order.save();
  res.json(order);
});

// GET /api/admin/users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

// PUT /api/admin/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) { res.status(404); throw new Error('User not found'); }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;
  await user.save();
  res.json({ message: 'User updated', user });
});

// DELETE /api/admin/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) { res.status(404); throw new Error('User not found'); }
  await user.deleteOne();
  res.json({ message: 'User deleted' });
});

// GET /api/admin/products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// POST /api/admin/products
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock, seller } = req.body;
  const product = await Product.create({
    name, price, description, image, brand, category,
    countInStock, seller, rating: 0, numReviews: 0,
  });
  res.status(201).json(product);
});

// PUT /api/admin/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  const { name, price, description, image, brand, category, countInStock, seller } = req.body;
  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.description = description ?? product.description;
  product.image = image ?? product.image;
  product.brand = brand ?? product.brand;
  product.category = category ?? product.category;
  product.countInStock = countInStock ?? product.countInStock;
  product.seller = seller ?? product.seller;
  await product.save();
  res.json(product);
});

// DELETE /api/admin/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  await product.deleteOne();
  res.json({ message: 'Product deleted' });
});

module.exports = {
  getAdminStats, getAllOrders, updateOrderStatus,
  getAllUsers, updateUser, deleteUser,
  getAllProducts, createProduct, updateProduct, deleteProduct,
};