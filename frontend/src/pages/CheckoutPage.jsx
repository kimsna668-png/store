import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Zap, 
  Check, 
  QrCode, 
  CreditCard, 
  Send, 
  ArrowLeft, 
  Building2,
  ChevronRight,
  Download,
  Key
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cartItems, total, subtotal, discountAmount, appliedCoupon, formatPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('KHQR_BAKONG');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    telegram: '',
    notes: ''
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-3xl border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">No items to checkout</h2>
          <Link to="/products" className="mt-4 inline-block px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-bold">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `NVS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderData = {
        orderNumber,
        items: [...cartItems],
        total,
        customer: formData,
        paymentMethod,
        downloadToken: `DL-TOKEN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        licenseKey: `NS-PRO-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      };
      setGeneratedOrder(orderData);
      setOrderComplete(true);
      setIsProcessing(false);
      clearCart();
    }, 1200);
  };

  // Completed Order View
  if (orderComplete && generatedOrder) {
    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-10 space-y-6 text-center">
            
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Payment & Order Verified
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Thank You for Your Order!
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Order Reference: <strong className="text-slate-800 font-mono">{generatedOrder.orderNumber}</strong>
              </p>
            </div>

            {/* Instant Delivery Entitlement Box */}
            <div className="p-6 rounded-2xl bg-teal-50/70 border border-teal-200 text-left space-y-4">
              <div className="flex items-center gap-2 text-teal-900 font-extrabold text-sm">
                <Zap className="w-4 h-4 text-teal-600 fill-teal-600" />
                <span>Your Digital Products & License Entitlements</span>
              </div>

              {/* License Key Box */}
              <div className="p-4 rounded-xl bg-white border border-teal-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Software Activation Key</span>
                  <span className="text-sm font-mono font-black text-slate-900 tracking-wider">
                    {generatedOrder.licenseKey}
                  </span>
                </div>
                <button
                  onClick={() => alert(`Copied Key: ${generatedOrder.licenseKey}`)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
                >
                  Copy Key
                </button>
              </div>

              {/* Download File Trigger */}
              <div className="p-4 rounded-xl bg-white border border-teal-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Download Package</span>
                  <span className="text-xs font-bold text-slate-800">
                    Installer_v2.5_Pro_Signed.zip (Full Suite)
                  </span>
                </div>
                <button
                  onClick={() => alert('Download initiated with secure token verification!')}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Now</span>
                </button>
              </div>

              <p className="text-[11px] text-teal-800">
                A confirmation email with these download credentials has also been sent to <strong>{generatedOrder.customer.email}</strong>.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/"
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Return to Store
              </Link>
              <a
                href="https://t.me/navaseal"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 font-bold text-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-sky-500" />
                <span>Contact Telegram @navaseal</span>
              </a>
            </div>

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
          <Link to="/cart" className="hover:text-teal-600 transition">Cart</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Secure Checkout</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
          Secure Digital Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Customer Info & Payment Methods */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Customer Details Box */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>1. Customer & Delivery Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sothea Keo"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email (For Instant Delivery)</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+855 12 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Telegram Username (Optional)</label>
                  <input
                    type="text"
                    placeholder="@telegram_user"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Order Notes (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Special instructions or questions for the developer..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                ></textarea>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <h2 className="text-base font-extrabold text-slate-900">
                2. Select Payment Method
              </h2>

              <div className="space-y-3">
                
                {/* Bakong KHQR */}
                <label className={`flex items-start justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === 'KHQR_BAKONG'
                    ? 'border-teal-500 bg-teal-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="KHQR_BAKONG"
                      checked={paymentMethod === 'KHQR_BAKONG'}
                      onChange={() => setPaymentMethod('KHQR_BAKONG')}
                      className="mt-1 text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">
                          🇰🇭 Bakong KHQR (Recommended)
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-teal-100 text-teal-800">
                          Instant
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Scan with ABA Mobile, Wing, ACLEDA, Sathapana or any Cambodian banking app.
                      </p>
                    </div>
                  </div>
                  <QrCode className="w-5 h-5 text-teal-600 flex-shrink-0" />
                </label>

                {/* Stripe Card */}
                <label className={`flex items-start justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === 'STRIPE'
                    ? 'border-teal-500 bg-teal-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="STRIPE"
                      checked={paymentMethod === 'STRIPE'}
                      onChange={() => setPaymentMethod('STRIPE')}
                      className="mt-1 text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-900">
                        💳 Stripe Credit / Debit Card
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Visa, MasterCard, American Express, Apple Pay & Google Pay.
                      </p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                </label>

                {/* Manual Bank Transfer */}
                <label className={`flex items-start justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === 'MANUAL_BANK_TRANSFER'
                    ? 'border-teal-500 bg-teal-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="MANUAL_BANK_TRANSFER"
                      checked={paymentMethod === 'MANUAL_BANK_TRANSFER'}
                      onChange={() => setPaymentMethod('MANUAL_BANK_TRANSFER')}
                      className="mt-1 text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-900">
                        🏦 Manual Bank Transfer / Slip Upload
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Direct account transfer verified by Telegram administrator.
                      </p>
                    </div>
                  </div>
                  <Building2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                </label>

              </div>
            </div>

          </div>

          {/* Right Column: Order Confirmation Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5 sticky top-28">
              <h3 className="font-extrabold text-base text-slate-900">Items in Order</h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600 flex-shrink-0">
                        {item.quantity}
                      </span>
                      <span className="font-semibold text-slate-800 truncate">
                        {item.title}
                      </span>
                    </div>
                    <span className="font-black text-slate-900 whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

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
                  <span>Delivery</span>
                  <span className="text-emerald-600 font-bold">Instant Download (Free)</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                  <span>Grand Total</span>
                  <span className="text-teal-700 text-2xl">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white font-black text-sm shadow-lg shadow-teal-500/25 transition flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Generating Secure Order & Key...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Pay {formatPrice(total)} & Access Downloads</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted Verification</span>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
}

