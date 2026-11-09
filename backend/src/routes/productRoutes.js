const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public Product Routes
router.get('/', productController.getAllProducts);
router.get('/:slug', productController.getProductBySlug);
router.get('/id/:id', productController.getProductById);

// Admin-Only Product Routes
router.post('/', authenticateToken, requireRole('ADMIN', 'SUPER_ADMIN'), productController.createProduct);
router.put('/:id', authenticateToken, requireRole('ADMIN', 'SUPER_ADMIN'), productController.updateProduct);
router.delete('/:id', authenticateToken, requireRole('ADMIN', 'SUPER_ADMIN'), productController.deleteProduct);

module.exports = router;

