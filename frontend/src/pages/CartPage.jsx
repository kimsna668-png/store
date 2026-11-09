import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Zap, 
  ShieldCheck, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) setCouponInput('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="p-12 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your Shopping Cart is Empty</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore authentic software licenses, AI creation suites, and digital assets with instant 24/7 delivery.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition"
            >
              <span>Explore Digital Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-teal-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Shopping Cart</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
          Review Shopping Cart ({cartItems.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Items Table / Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden p-6 space-y-4">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Product Item</span>
                <span>Price & Quantity</span>
              </div>

              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-slate-100 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                    />
                    <div>
                      <Link 
                        to={`/digital-products/${item.slug}`}
                        className="text-sm font-bold text-slate-900 hover:text-teal-600 transition line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <span className="text-xs font-semibold text-teal-700 block mt-0.5">
                        {item.variant}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
                        <Zap className="w-3 h-3" />
                        <span>Instant Delivery</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-base font-black text-slate-900">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-[10px] text-slate-400">
                          {formatPrice(item.price)} each
                        </div>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-4 flex justify-between items-center text-xs">
                <Link to="/products" className="text-teal-600 font-bold hover:underline flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </Link>
                <button
                  onClick={clearCart}
                  className="text-slate-400 hover:text-rose-600 font-semibold"
                >
                  Clear Entire Cart
                </button>
              </div>

            </div>
          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5">
              <h3 className="font-extrabold text-base text-slate-900">Order Summary</h3>

              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <div>
                      <span className="font-bold">Coupon {appliedCoupon.code}</span>
                      <span className="block text-[11px]">-{appliedCoupon.discountPercent}% Discount applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-emerald-900 underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && !appliedCoupon && (
                  <p className={`text-[11px] mt-1.5 ${couponFeedback.success ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Subtotal & Total */}
              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span className="font-bold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Digital Delivery Fee</span>
                  <span className="text-emerald-600 font-bold">FREE ($0.00)</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span className="text-teal-700 text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm shadow-lg shadow-teal-500/25 transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5 text-teal-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Purchase Guarantee</span>
                </div>
                <p>Protected by 256-bit SSL encryption. Auto key & file unlock immediately after payment.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

