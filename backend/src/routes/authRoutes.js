const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../validators/authValidator');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public auth routes
router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Protected routes
router.get('/me', authenticateToken, authController.getMe);

// Admin-only role check test endpoint
router.get('/admin-check', authenticateToken, requireRole('ADMIN', 'SUPER_ADMIN'), (req, res) => {
  res.json({
    status: 'success',
    message: 'Authorized as Administrator.',
    user: req.user
  });
});

module.exports = router;

