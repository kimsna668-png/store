const cartStore = require('../services/cartStore');

const getCartIdentifier = (req) => {
  return req.user?.id || req.headers['x-session-id'] || 'default-guest-session';
};

// GET /api/cart
const getCart = (req, res, next) => {
  try {
    const identifier = getCartIdentifier(req);
    const cart = cartStore.getOrCreateCart(identifier);
    res.json({
      status: 'success',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/cart/items
const addItem = (req, res, next) => {
  try {
    const identifier = getCartIdentifier(req);
    const { productId, variantId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        status: 'error',
        message: 'productId is required.'
      });
    }

    const cart = cartStore.addItem(identifier, {
      productId,
      variantId,
      quantity: quantity || 1
    });

    res.status(201).json({
      status: 'success',
      message: 'Item added to cart.',
      data: { cart }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// PUT /api/cart/items/:id
const updateItem = (req, res, next) => {
  try {
    const identifier = getCartIdentifier(req);
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'quantity is required.'
      });
    }

    const cart = cartStore.updateItemQuantity(identifier, id, quantity);
    res.json({
      status: 'success',
      message: 'Cart item updated.',
      data: { cart }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// DELETE /api/cart/items/:id
const removeItem = (req, res, next) => {
  try {
    const identifier = getCartIdentifier(req);
    const { id } = req.params;

    const cart = cartStore.removeItem(identifier, id);
    res.json({
      status: 'success',
      message: 'Item removed from cart.',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart
const clearCart = (req, res, next) => {
  try {
    const identifier = getCartIdentifier(req);
    const cart = cartStore.clearCart(identifier);
    res.json({
      status: 'success',
      message: 'Cart cleared.',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/cart/apply-coupon
const applyCoupon = (req, res, next) => {
  try {
    const identifier = getCartIdentifier(req);
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        status: 'error',
        message: 'Coupon code is required.'
      });
    }

    const cart = cartStore.applyCoupon(identifier, code);
    res.json({
      status: 'success',
      message: `Coupon '${code.toUpperCase()}' applied successfully.`,
      data: { cart }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// DELETE /api/cart/remove-coupon
const removeCoupon = (req, res, next) => {
  try {
    const identifier = getCartIdentifier(req);
    const cart = cartStore.removeCoupon(identifier);
    res.json({
      status: 'success',
      message: 'Coupon removed.',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
  applyCoupon,
  removeCoupon
};

