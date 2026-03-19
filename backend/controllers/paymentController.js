const crypto = require('crypto'); 

// @desc    Simulate creating a payment order
// @route   POST /api/payment/create-order
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      res.status(400);
      throw new Error('A valid amount is required');
    }

    // Simulate a payment order response (like Razorpay would return)
    const simulatedOrder = {
      orderId: `order_${crypto.randomBytes(8).toString('hex')}`,
      amount: Math.round(amount * 100), // in paise
      currency: 'INR',
      status: 'created',
    };

    res.status(201).json(simulatedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Simulate verifying a payment
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId } = req.body;

    if (!orderId || !paymentId) {
      res.status(400);
      throw new Error('orderId and paymentId are required');
    }

    
    res.status(200).json({
      success: true,
      message: 'Payment verified successfully (simulated)',
      paymentId,
      orderId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, verifyPayment };