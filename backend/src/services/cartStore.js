const crypto = require('crypto');
const productStore = require('./productStore');

// In-memory active coupons
const activeCoupons = new Map([
  [
    'NAVA10',
    {
      code: 'NAVA10',
      description: '10% New Customer Welcome Discount',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minOrderAmount: 5.00,
      maxDiscount: 50.00,
      isActive: true
    }
  ],
  [
    'SEAL20',
    {
      code: 'SEAL20',
      description: '20% Mega Promo Discount',
      discountType: 'PERCENTAGE',
      discountValue: 20,
      minOrderAmount: 20.00,
      maxDiscount: 100.00,
      isActive: true
    }
  ],
  [
    'FIXED5',
    {
      code: 'FIXED5',
      description: '$5.00 Instant Cash Voucher',
      discountType: 'FIXED',
      discountValue: 5.00,
      minOrderAmount: 15.00,
      maxDiscount: null,
      isActive: true
    }
  ]
]);

class CartStore {
  constructor() {
    this.carts = new Map(); // cartId -> cart object
  }

  getOrCreateCart(identifier) {
    if (!identifier) {
      identifier = `session-${crypto.randomUUID()}`;
    }

    if (!this.carts.has(identifier)) {
      this.carts.set(identifier, {
        id: identifier,
        items: [],
        coupon: null,
        updatedAt: new Date().toISOString()
      });
    }

    const cart = this.carts.get(identifier);
    return this.calculateCartTotals(cart);
  }

  addItem(identifier, { productId, variantId, quantity = 1 }) {
    const cart = this.getOrCreateCart(identifier);
    const product = productStore.getProductById(productId);

    if (!product) {
      throw new Error(`Product not found.`);
    }

    if (!product.isAvailable) {
      throw new Error(`Product '${product.title}' is currently unavailable.`);
    }

    let unitPrice = Number(product.price);
    let variantTitle = 'Standard License';

    if (variantId) {
      const variant = product.variants?.find(v => v.id === variantId);
      if (variant) {
        unitPrice = Number(variant.price);
        variantTitle = variant.title;
      }
    }

    const existingIndex = cart.items.findIndex(
      item => item.productId === productId && item.variantId === (variantId || null)
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        id: `item-${crypto.randomUUID().slice(0, 8)}`,
        productId,
        productTitle: product.title,
        productTitleKhmer: product.titleKhmer,
        slug: product.slug,
        imageUrl: product.images?.[0]?.url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        variantId: variantId || null,
        variantTitle,
        unitPrice,
        quantity: Number(quantity),
        deliveryType: product.deliveryType
      });
    }

    cart.updatedAt = new Date().toISOString();
    return this.calculateCartTotals(cart);
  }

  updateItemQuantity(identifier, itemId, quantity) {
    const cart = this.getOrCreateCart(identifier);
    const numQty = Number(quantity);

    if (numQty <= 0) {
      return this.removeItem(identifier, itemId);
    }

    const item = cart.items.find(i => i.id === itemId);
    if (!item) {
      throw new Error(`Cart item not found.`);
    }

    item.quantity = numQty;
    cart.updatedAt = new Date().toISOString();
    return this.calculateCartTotals(cart);
  }

  removeItem(identifier, itemId) {
    const cart = this.getOrCreateCart(identifier);
    cart.items = cart.items.filter(i => i.id !== itemId);
    cart.updatedAt = new Date().toISOString();
    return this.calculateCartTotals(cart);
  }

  clearCart(identifier) {
    const cart = this.getOrCreateCart(identifier);
    cart.items = [];
    cart.coupon = null;
    cart.updatedAt = new Date().toISOString();
    return this.calculateCartTotals(cart);
  }

  applyCoupon(identifier, code) {
    const cart = this.getOrCreateCart(identifier);
    const upperCode = (code || '').toUpperCase().trim();
    const coupon = activeCoupons.get(upperCode);

    if (!coupon || !coupon.isActive) {
      throw new Error(`Invalid or expired coupon code: ${code}`);
    }

    // Check minimum order requirement
    const subtotal = cart.items.reduce((acc, i) => acc + (i.unitPrice * i.quantity), 0);
    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      throw new Error(`Coupon requires a minimum order of $${coupon.minOrderAmount.toFixed(2)}.`);
    }

    cart.coupon = { ...coupon };
    cart.updatedAt = new Date().toISOString();
    return this.calculateCartTotals(cart);
  }

  removeCoupon(identifier) {
    const cart = this.getOrCreateCart(identifier);
    cart.coupon = null;
    cart.updatedAt = new Date().toISOString();
    return this.calculateCartTotals(cart);
  }

  calculateCartTotals(cart) {
    const subtotal = cart.items.reduce((acc, i) => acc + (i.unitPrice * i.quantity), 0);
    let discount = 0;

    if (cart.coupon) {
      if (cart.coupon.discountType === 'PERCENTAGE') {
        discount = subtotal * (cart.coupon.discountValue / 100);
        if (cart.coupon.maxDiscount && discount > cart.coupon.maxDiscount) {
          discount = cart.coupon.maxDiscount;
        }
      } else if (cart.coupon.discountType === 'FIXED') {
        discount = Math.min(subtotal, cart.coupon.discountValue);
      }
    }

    const total = Math.max(0, subtotal - discount);
    const totalCount = cart.items.reduce((acc, i) => acc + i.quantity, 0);

    return {
      id: cart.id,
      items: cart.items,
      itemCount: totalCount,
      subtotal: Number(subtotal.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      total: Number(total.toFixed(2)),
      coupon: cart.coupon,
      updatedAt: cart.updatedAt
    };
  }
}

module.exports = new CartStore();

