const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public Category Routes
router.get('/', categoryController.getAllCategories);
router.get('/:slug', categoryController.getCategoryBySlug);

// Admin-Only Category Routes
router.post('/', authenticateToken, requireRole('ADMIN', 'SUPER_ADMIN'), categoryController.createCategory);
router.put('/:id', authenticateToken, requireRole('ADMIN', 'SUPER_ADMIN'), categoryController.updateCategory);
router.delete('/:id', authenticateToken, requireRole('ADMIN', 'SUPER_ADMIN'), categoryController.deleteCategory);

module.exports = router;

