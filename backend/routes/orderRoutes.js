const express = require('express');
const router  = express.Router();
const { placeOrder, getMyOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// /myorders MUST come before /:id — otherwise Express treats "myorders" as an :id value
router.post('/',           protect,           placeOrder);
router.get('/myorders',    protect,           getMyOrders);
router.get('/:id',         protect,           getOrderById);
router.put('/:id/status',  protect, adminOnly, updateOrderStatus);  // 👈 Step 6

module.exports = router;