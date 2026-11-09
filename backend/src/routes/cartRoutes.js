const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.put('/items/:id', cartController.updateItem);
router.delete('/items/:id', cartController.removeItem);
router.delete('/', cartController.clearCart);
router.post('/apply-coupon', cartController.applyCoupon);
router.delete('/remove-coupon', cartController.removeCoupon);

module.exports = router;

