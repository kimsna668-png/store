const orderStore = require('../services/orderStore');
const bakongService = require('../services/bakongService');
const stripeService = require('../services/stripeService');
const deliveryService = require('../services/deliveryService');

// 1. POST /api/payments/create-session
const createPaymentSession = async (req, res, next) => {
  try {
    const { orderId, paymentMethod, successUrl, cancelUrl } = req.body;

    let order = orderStore.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: `Order '${orderId}' not found.`
      });
    }

    if (order.status === 'PAID' || order.status === 'DELIVERED') {
      return res.status(400).json({
        status: 'error',
        message: 'This order is already paid and fulfilled.'
      });
    }

    if (paymentMethod === 'STRIPE') {
      const stripeSession = await stripeService.createCheckoutSession({
        order,
        successUrl,
        cancelUrl
      });
      return res.json({
        status: 'success',
        method: 'STRIPE',
        data: stripeSession
      });
    }

    if (paymentMethod === 'KHQR_BAKONG') {
      const khqrData = bakongService.generateKHQR({
        orderNumber: order.orderNumber,
        amount: order.totalAmount,
        currency: order.currency || 'USD'
      });
      return res.json({
        status: 'success',
        method: 'KHQR_BAKONG',
        data: khqrData
      });
    }

    // Default: Manual Bank Transfer
    res.json({
      status: 'success',
      method: 'MANUAL_BANK_TRANSFER',
      data: {
        orderNumber: order.orderNumber,
        bankAccounts: [
          { bank: 'ABA Bank', accountName: 'NAVA SEAL', accountNumber: '001 234 567', currency: 'USD' },
          { bank: 'Wing Bank', accountName: 'NAVA SEAL', accountNumber: '0968882345', currency: 'USD' }
        ],
        amount: order.totalAmount,
        instructions: 'Transfer the exact amount and upload your receipt slip or send it to Telegram @navaseal.'
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2. POST /api/payments/khqr/generate
const generateKHQR = async (req, res, next) => {
  try {
    const { orderNumber, amount, currency } = req.body;
    if (!orderNumber || !amount) {
      return res.status(400).json({
        status: 'error',
        message: 'orderNumber and amount are required to generate KHQR.'
      });
    }

    const khqr = bakongService.generateKHQR({
      orderNumber,
      amount: Number(amount),
      currency: currency || 'USD'
    });

    res.json({
      status: 'success',
      data: khqr
    });
  } catch (error) {
    next(error);
  }
};

// 3. POST /api/payments/verify
const verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentMethod, transactionRef } = req.body;

    if (!orderId || !transactionRef) {
      return res.status(400).json({
        status: 'error',
        message: 'orderId and transactionRef are required.'
      });
    }

    const order = orderStore.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: `Order '${orderId}' not found.`
      });
    }

    let verificationResult = { verified: true };
    if (paymentMethod === 'KHQR_BAKONG') {
      verificationResult = await bakongService.verifyTransaction(transactionRef, order.totalAmount);
    }

    if (!verificationResult.verified) {
      return res.status(400).json({
        status: 'error',
        message: verificationResult.message || 'Payment verification failed at gateway.'
      });
    }

    // Process payment and auto-fulfill delivery
    const { payment, entitlements } = orderStore.recordPayment({
      orderId: order.id,
      paymentMethod: paymentMethod || 'KHQR_BAKONG',
      amount: order.totalAmount,
      currency: order.currency,
      transactionRef,
      gatewayResponse: verificationResult
    });

    res.json({
      status: 'success',
      message: 'Payment verified and digital delivery fulfilled instantly.',
      data: {
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
          deliveredAt: order.deliveredAt
        },
        payment,
        entitlements
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 4. POST /api/payments/webhook
const handleStripeWebhook = async (req, res, next) => {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripeService.verifyWebhookEvent(req.body, sig);

    if (event.type === 'checkout.session.completed' || event.type === 'payment_intent.succeeded') {
      const session = event.data?.object;
      const orderNumber = session?.metadata?.orderNumber;
      const txnRef = session?.id || `stripe_evt_${Date.now()}`;

      if (orderNumber) {
        const order = orderStore.getOrderByNumber(orderNumber);
        if (order && order.status !== 'PAID' && order.status !== 'DELIVERED') {
          orderStore.recordPayment({
            orderId: order.id,
            paymentMethod: 'STRIPE',
            amount: order.totalAmount,
            currency: order.currency,
            transactionRef: txnRef,
            gatewayResponse: session
          });
        }
      }
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// 5. POST /api/payments/manual-slip
const submitManualSlip = async (req, res, next) => {
  try {
    const { orderId, slipUrl, notes } = req.body;
    const order = orderStore.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found.' });
    }

    order.paymentStatus = 'VERIFYING';
    order.customerNotes = notes || order.customerNotes;
    orderStore.recordPaymentEvent(order.id, 'slip.uploaded', { slipUrl, notes });

    res.json({
      status: 'success',
      message: 'Payment slip submitted. An administrator will verify and fulfill your digital key promptly.',
      data: {
        orderNumber: order.orderNumber,
        status: order.paymentStatus
      }
    });
  } catch (error) {
    next(error);
  }
};

// 6. GET /api/payments/:transactionRef
const getTransactionStatus = (req, res, next) => {
  try {
    const { transactionRef } = req.params;
    const payment = Array.from(orderStore.payments.values()).find(p => p.transactionRef === transactionRef);

    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: `Transaction '${transactionRef}' not found.`
      });
    }

    const order = orderStore.getOrderById(payment.orderId);
    const events = orderStore.getPaymentEvents(payment.id);

    res.json({
      status: 'success',
      data: {
        payment,
        order: {
          orderNumber: order?.orderNumber,
          status: order?.status,
          deliveredAt: order?.deliveredAt
        },
        auditEvents: events
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPaymentSession,
  generateKHQR,
  verifyPayment,
  handleStripeWebhook,
  submitManualSlip,
  getTransactionStatus
};

