const express = require('express');
const router = express.Router();
const { 
  uploadImageMiddleware, 
  uploadDigitalFileMiddleware, 
  handleImageUpload, 
  handleDigitalFileUpload 
} = require('../controllers/uploadController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Upload product image (Admin only)
router.post('/image', authenticateToken, requireRole('ADMIN', 'SUPER_ADMIN'), uploadImageMiddleware.single('image'), handleImageUpload);

// Upload private digital product file (Admin only)
router.post('/digital-file', authenticateToken, requireRole('ADMIN', 'SUPER_ADMIN'), uploadDigitalFileMiddleware.single('file'), handleDigitalFileUpload);

module.exports = router;

