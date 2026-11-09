const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create-session', paymentController.createPaymentSession);
router.post('/khqr/generate', paymentController.generateKHQR);
router.post('/verify', paymentController.verifyPayment);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleStripeWebhook);
router.post('/manual-slip', paymentController.submitManualSlip);
router.get('/:transactionRef', paymentController.getTransactionStatus);

module.exports = router;

