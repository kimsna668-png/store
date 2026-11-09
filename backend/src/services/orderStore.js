const crypto = require('crypto');
const productStore = require('./productStore');
const deliveryService = require('./deliveryService');

class OrderStore {
  constructor() {
    this.orders = new Map(); // orderId -> order
    this.payments = new Map(); // paymentId -> payment
    this.paymentEvents = [];
    this.processedTransactions = new Set(); // Prevent duplicate transactions
  }

  generateOrderNumber() {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `NVS-${today}-${rand}`;
  }

  createOrder({
    userId = null,
    customerName,
    customerEmail,
    customerPhone = null,
    telegramUsername = null,
    items,
    subtotal,
    discountTotal = 0,
    totalAmount,
    currency = 'USD',
    couponCode = null,
    customerNotes = null
  }) {
    if (!customerEmail || !customerName || !items || items.length === 0) {
      throw new Error('Customer name, email, and at least one item are required to create an order.');
    }

    const orderId = `ord-${crypto.randomUUID().slice(0, 8)}`;
    const orderNumber = this.generateOrderNumber();

    const order = {
      id: orderId,
      orderNumber,
      userId,
      customerName,
      customerEmail: customerEmail.toLowerCase().trim(),
      customerPhone,
      telegramUsername,
      items: items.map(i => ({
        id: `oi-${crypto.randomUUID().slice(0, 8)}`,
        productId: i.productId,
        productTitle: i.productTitle,
        variantId: i.variantId || null,
        variantTitle: i.variantTitle || 'Standard',
        slug: i.slug,
        unitPrice: Number(i.unitPrice),
        quantity: Number(i.quantity || 1),
        totalPrice: Number(i.unitPrice) * Number(i.quantity || 1),
        deliveryType: i.deliveryType || 'INSTANT_FILE'
      })),
      subtotal: Number(subtotal),
      discountTotal: Number(discountTotal),
      totalAmount: Number(totalAmount),
      currency: currency.toUpperCase(),
      couponCode,
      customerNotes,
      status: 'AWAITING_PAYMENT',
      paymentStatus: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.orders.set(orderId, order);
    return order;
  }

  getOrderById(id) {
    return this.orders.get(id) || null;
  }

  getOrderByNumber(orderNumber) {
    return Array.from(this.orders.values()).find(o => o.orderNumber === orderNumber) || null;
  }

  listOrders(filters = {}) {
    let list = Array.from(this.orders.values());

    if (filters.customerEmail) {
      list = list.filter(o => o.customerEmail === filters.customerEmail.toLowerCase().trim());
    }

    if (filters.status) {
      list = list.filter(o => o.status === filters.status);
    }

    // Sort newest first
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }

  // Record payment and prevent duplicate transactions
  recordPayment({
    orderId,
    paymentMethod,
    amount,
    currency = 'USD',
    transactionRef,
    paymentProofUrl = null,
    gatewayResponse = null,
    verifiedBy = null
  }) {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`Order '${orderId}' not found.`);
    }

    if (this.processedTransactions.has(transactionRef)) {
      throw new Error(`Duplicate transaction detected for reference '${transactionRef}'. Processing aborted.`);
    }

    const paymentId = `pay-${crypto.randomUUID().slice(0, 8)}`;
    const payment = {
      id: paymentId,
      orderId,
      orderNumber: order.orderNumber,
      paymentMethod,
      amount: Number(amount),
      currency: currency.toUpperCase(),
      status: 'PAID',
      transactionRef,
      paymentProofUrl,
      gatewayResponse: gatewayResponse ? JSON.stringify(gatewayResponse) : null,
      verifiedBy,
      verifiedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    this.payments.set(paymentId, payment);
    this.processedTransactions.add(transactionRef);

    // Update order status to PAID
    order.paymentStatus = 'PAID';
    order.status = 'PAID';
    order.updatedAt = new Date().toISOString();

    // Record audit event
    this.recordPaymentEvent(paymentId, 'payment.verified', {
      method: paymentMethod,
      amount,
      currency,
      transactionRef
    });

    // Automatically trigger digital fulfillment
    const entitlements = this.fulfillOrderDelivery(order);

    return { payment, order, entitlements };
  }

  // Fulfill delivery immediately after payment
  fulfillOrderDelivery(order) {
    const entitlements = deliveryService.fulfillDelivery(order, productStore);
    order.status = 'DELIVERED';
    order.deliveredAt = new Date().toISOString();
    order.updatedAt = new Date().toISOString();
    order.entitlements = entitlements;

    this.recordPaymentEvent(order.id, 'delivery.fulfilled', {
      orderNumber: order.orderNumber,
      entitlementsCount: entitlements.length
    });

    return entitlements;
  }

  recordPaymentEvent(paymentId, eventType, eventData = {}) {
    const event = {
      id: `pevt-${crypto.randomUUID().slice(0, 8)}`,
      paymentId,
      eventType,
      eventData: JSON.stringify(eventData),
      createdAt: new Date().toISOString()
    };
    this.paymentEvents.push(event);
    return event;
  }

  getPaymentEvents(paymentId) {
    return this.paymentEvents.filter(e => e.paymentId === paymentId);
  }
}

module.exports = new OrderStore();

