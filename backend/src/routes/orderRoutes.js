const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', orderController.createOrder);
router.get('/', orderController.listOrders);
router.get('/:id', orderController.getOrderById);
router.get('/number/:orderNumber', orderController.getOrderByNumber);

module.exports = router;

