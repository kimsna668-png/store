const orderStore = require('../services/orderStore');
const cartStore = require('../services/cartStore');
const deliveryService = require('../services/deliveryService');

// POST /api/orders
const createOrder = (req, res, next) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      telegramUsername,
      items,
      subtotal,
      discountTotal,
      totalAmount,
      currency,
      couponCode,
      customerNotes
    } = req.body;

    const order = orderStore.createOrder({
      userId: req.user?.id || null,
      customerName,
      customerEmail,
      customerPhone,
      telegramUsername,
      items,
      subtotal,
      discountTotal,
      totalAmount,
      currency,
      couponCode,
      customerNotes
    });

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully. Awaiting payment.',
      data: { order }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// GET /api/orders
const listOrders = (req, res, next) => {
  try {
    const { status, customerEmail } = req.query;
    // If regular customer, filter by their email
    const emailFilter = req.user?.role === 'CUSTOMER' ? req.user.email : customerEmail;

    const orders = orderStore.listOrders({
      status,
      customerEmail: emailFilter
    });

    res.json({
      status: 'success',
      count: orders.length,
      data: { orders }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/:id
const getOrderById = (req, res, next) => {
  try {
    const { id } = req.params;
    const order = orderStore.getOrderById(id);

    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found.' });
    }

    const entitlements = deliveryService.getEntitlementsByOrderNumber(order.orderNumber);

    res.json({
      status: 'success',
      data: { order, entitlements }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/number/:orderNumber
const getOrderByNumber = (req, res, next) => {
  try {
    const { orderNumber } = req.params;
    const order = orderStore.getOrderByNumber(orderNumber);

    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found.' });
    }

    const entitlements = deliveryService.getEntitlementsByOrderNumber(order.orderNumber);

    res.json({
      status: 'success',
      data: { order, entitlements }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  listOrders,
  getOrderById,
  getOrderByNumber
};

