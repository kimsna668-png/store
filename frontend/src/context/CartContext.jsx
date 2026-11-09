import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('navaseal_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: '1-single',
          productId: '1',
          title: 'Digital Product 2 - AI Automated Video & Content Generator Pro',
          titleKhmer: 'កម្មវិធីបង្កើតវីដេអូ និងមាតិកា AI ស្វ័យប្រវត្តិជំនាន់ទី ២',
          slug: 'digital-product-2',
          price: 15.00,
          comparePrice: 25.00,
          variant: 'Standard License',
          quantity: 1,
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
          deliveryType: 'INSTANT_FILE'
        }
      ];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('navaseal_currency') || 'USD';
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('navaseal_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('navaseal_currency', currency);
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'KHR' : 'USD');
  };

  const formatPrice = (usdAmount) => {
    const val = Number(usdAmount) || 0;
    if (currency === 'KHR') {
      const khr = Math.round(val * 4100);
      return `${khr.toLocaleString()} ៛`;
    }
    return `$${val.toFixed(2)}`;
  };

  const addToCart = (product, variant = null, quantity = 1) => {
    setCartItems(prev => {
      const itemKey = `${product.id}-${variant?.id || 'default'}`;
      const existing = prev.find(item => item.id === itemKey);

      if (existing) {
        return prev.map(item =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            productId: product.id,
            title: product.title,
            titleKhmer: product.titleKhmer,
            slug: product.slug,
            price: variant ? Number(variant.price) : Number(product.price),
            comparePrice: variant ? Number(variant.comparePrice || product.comparePrice) : Number(product.comparePrice),
            variant: variant ? variant.title : 'Standard License',
            quantity: quantity,
            imageUrl: product.images?.[0]?.url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
            deliveryType: product.deliveryType || 'INSTANT_FILE'
          }
        ];
      }
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NAVA10' || clean === 'WELCOME10') {
      setAppliedCoupon({
        code: clean,
        discountPercent: 10,
        description: '10% New Customer Discount'
      });
      return { success: true, message: 'Coupon applied: 10% Discount!' };
    }
    if (clean === 'SEAL20') {
      setAppliedCoupon({
        code: clean,
        discountPercent: 20,
        description: '20% Mega Promo Discount'
      });
      return { success: true, message: 'Coupon applied: 20% Discount!' };
    }
    return { success: false, message: 'Invalid or expired coupon code' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? (subtotal * (appliedCoupon.discountPercent / 100)) : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      discountAmount,
      total,
      totalCount,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      currency,
      setCurrency,
      toggleCurrency,
      formatPrice,
      isCartDrawerOpen,
      setIsCartDrawerOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

