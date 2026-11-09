const express = require('express');
const router = express.Router();
const telegramBot = require('../services/telegramBot');
const config = require('../config/env');

// Webhook endpoint for Telegram
router.post('/webhook', (req, res) => {
  const secretHeader = req.headers['x-telegram-bot-api-secret-token'];
  
  // Optional security verification of secret header
  if (config.TELEGRAM_WEBHOOK_SECRET && secretHeader && secretHeader !== config.TELEGRAM_WEBHOOK_SECRET) {
    return res.status(403).json({ status: 'error', message: 'Unauthorized webhook request.' });
  }

  const responseMessage = telegramBot.handleUpdate(req.body);

  res.json({
    status: 'success',
    received: true,
    reply: responseMessage
  });
});

// Admin test notification dispatcher
router.post('/send-test', (req, res) => {
  const sampleOrder = {
    orderNumber: 'NVS-20261108-DEMO',
    customerName: 'Sokha Keo',
    customerEmail: 'sokha@example.com',
    totalAmount: 15.00,
    currency: 'USD',
    status: 'PAID'
  };

  const message = telegramBot.formatAdminNewOrderMessage(sampleOrder);
  res.json({
    status: 'success',
    message: 'Test notification generated successfully.',
    telegramPayload: message
  });
});

module.exports = router;

