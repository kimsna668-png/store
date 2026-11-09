const config = require('../config/env');
const orderStore = require('./orderStore');
const productStore = require('./productStore');

class TelegramBotService {
  constructor() {
    this.token = config.TELEGRAM_BOT_TOKEN;
    this.adminChatId = config.TELEGRAM_ADMIN_CHAT_ID;
    this.webhookSecret = config.TELEGRAM_WEBHOOK_SECRET;
  }

  // Handle incoming Telegram message / webhook update
  handleUpdate(update) {
    const message = update.message;
    if (!message || !message.text) return null;

    const chatId = message.chat.id;
    const text = message.text.trim();

    if (text.startsWith('/start')) {
      return {
        chatId,
        text: `🚀 *Welcome to Nava Seal Store Pro Bot!* 🇰🇭\n\nទិញអាជ្ញាប័ណ្ណកម្មវិធី និងឧបករណ៍ AI ដោយស្វ័យប្រវត្តិកម្រិតខ្ពស់។\n\n*Available Commands:*\n/products - Browse trending digital products\n/order <orderNumber> - Check order & license status\n/support - Direct support with @navaseal\n\n🌐 Visit Store: ${config.FRONTEND_URL}`,
        parse_mode: 'Markdown'
      };
    }

    if (text.startsWith('/products')) {
      const products = productStore.listProducts().slice(0, 5);
      const listText = products.map((p, idx) => 
        `${idx + 1}. *${p.title}*\n   💰 Price: $${p.price.toFixed(2)} | ⚡ ${p.deliveryType}`
      ).join('\n\n');

      return {
        chatId,
        text: `🛍️ *Trending Digital Products on Nava Seal Store:*\n\n${listText}\n\n👉 Buy now at: ${config.FRONTEND_URL}/products`,
        parse_mode: 'Markdown'
      };
    }

    if (text.startsWith('/order')) {
      const parts = text.split(' ');
      if (parts.length < 2) {
        return {
          chatId,
          text: `⚠️ *Usage:* \`/order NVS-20261108-XXXX\`\nPlease provide your order tracking number.`,
          parse_mode: 'Markdown'
        };
      }

      const orderNumber = parts[1].trim();
      const order = orderStore.getOrderByNumber(orderNumber);

      if (!order) {
        return {
          chatId,
          text: `❌ Order *${orderNumber}* not found. Please verify the order number or contact @navaseal.`,
          parse_mode: 'Markdown'
        };
      }

      return {
        chatId,
        text: `📦 *Order Lookup: ${order.orderNumber}*\n\n👤 Customer: ${order.customerName}\n💰 Total: $${order.totalAmount.toFixed(2)} ${order.currency}\n🚦 Status: *${order.status}*\n💳 Payment: *${order.paymentStatus}*\n📅 Date: ${order.createdAt.slice(0, 10)}\n\n🔗 View details: ${config.FRONTEND_URL}/orders/${order.orderNumber}`,
        parse_mode: 'Markdown'
      };
    }

    if (text.startsWith('/support')) {
      return {
        chatId,
        text: `💬 *Customer & Technical Support*\n\nFor immediate assistance, custom orders, or license activation help, message our team directly at:\n👉 Telegram: @navaseal\n📞 Phone: +855 96 888 2345\n✉️ Email: support@navaseal.site`,
        parse_mode: 'Markdown'
      };
    }

    return {
      chatId,
      text: `Hello! Send /products to view items or /order <orderNumber> to check your delivery status.`
    };
  }

  // Admin Notification: New Order Dispatched
  formatAdminNewOrderMessage(order) {
    return `🔔 *[NEW ORDER CREATED]*\n\nOrder: \`${order.orderNumber}\`\nCustomer: ${order.customerName} (${order.customerEmail})\nTotal: $${order.totalAmount.toFixed(2)} ${order.currency}\nStatus: ${order.status}\nItems: ${order.items?.length || 1}`;
  }

  // Admin Notification: Payment Verified
  formatAdminPaymentVerifiedMessage(order, payment) {
    return `✅ *[PAYMENT VERIFIED & DELIVERED]*\n\nOrder: \`${order.orderNumber}\`\nMethod: ${payment.paymentMethod}\nAmount: $${payment.amount.toFixed(2)} ${payment.currency}\nTxnRef: \`${payment.transactionRef}\`\nInstant digital files and license keys unlocked.`;
  }

  // Admin Notification: Manual Bank Transfer Slip Uploaded
  formatAdminSlipMessage(order, slipUrl) {
    return `📸 *[MANUAL PAYMENT SLIP UPLOADED]*\n\nOrder: \`${order.orderNumber}\`\nCustomer: ${order.customerName}\nAmount: $${order.totalAmount.toFixed(2)}\nSlip URL: ${slipUrl}\nPlease review and approve in Admin Console.`;
  }
}

module.exports = new TelegramBotService();

