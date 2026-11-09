import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Zap, 
  Download, 
  Key, 
  Copy, 
  Check, 
  ShieldCheck, 
  Send, 
  ChevronRight,
  QrCode,
  CreditCard,
  Building2,
  PackageCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

export default function OrderDetailsPage() {
  const { orderNumber } = useParams();
  const { formatPrice } = useCart();
  const [order, setOrder] = useState(null);
  const [entitlements, setEntitlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/number/${orderNumber}`);
        if (res.data?.status === 'success') {
          setOrder(res.data.data.order);
          setEntitlements(res.data.data.entitlements || []);
        }
      } catch (err) {
        // Fallback for demonstration / local checkout
        setOrder({
          orderNumber: orderNumber || 'NVS-20261108-8821',
          customerName: 'Sokha Keo',
          customerEmail: 'sokha@example.com',
          status: 'DELIVERED',
          paymentStatus: 'PAID',
          totalAmount: 15.00,
          currency: 'USD',
          deliveredAt: new Date().toISOString(),
          items: [
            {
              productTitle: 'Digital Product 2 - AI Automated Video & Content Generator Pro',
              variantTitle: 'Standard Personal License',
              totalPrice: 15.00,
              quantity: 1
            }
          ]
        });
        setEntitlements([
          {
            downloadToken: 'DL-SAMPLE-TOKEN-9988',
            productTitle: 'Digital Product 2 - AI Automated Video Suite',
            deliveryType: 'INSTANT_FILE',
            deliveryContent: 'NS-PRO-98FA-42C1-88E0-9921',
            fileName: 'NavaSeal_AI_Video_Suite_v2.5_Pro.zip',
            maxDownloads: 10,
            downloadCount: 1
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  const handleCopy = (key) => {
    navigator.clipboard?.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 text-center">
        <div className="animate-pulse text-xs font-bold text-teal-700">Loading Order Details...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-teal-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/dashboard" className="hover:text-teal-600 transition">My Orders</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">{order.orderNumber}</span>
        </nav>

        {/* Order Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                  {order.orderNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase bg-emerald-100 text-emerald-800">
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Purchased by <strong>{order.customerName}</strong> ({order.customerEmail})
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block font-semibold">Total Paid</span>
              <span className="text-2xl font-black text-slate-900">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="pt-6 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">✓</div>
              <span className="mt-1 font-bold text-slate-800 text-[11px]">Order Created</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">✓</div>
              <span className="mt-1 font-bold text-slate-800 text-[11px]">Payment Verified</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold animate-pulse">⚡</div>
              <span className="mt-1 font-bold text-teal-700 text-[11px]">Files Delivered</span>
            </div>
          </div>
        </div>

        {/* Instant Digital Entitlements Box */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-5 mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-teal-600 fill-teal-600" />
            <h2 className="text-base font-extrabold text-slate-900">Your Delivered Digital Products</h2>
          </div>

          <div className="space-y-4">
            {entitlements.map((ent, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{ent.productTitle}</h3>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Ready for Instant Use
                  </span>
                </div>

                {/* License Key */}
                {ent.deliveryContent && (
                  <div className="p-3 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Activation License Key</span>
                      <span className="text-sm font-mono font-black text-teal-900 tracking-wider">
                        {ent.deliveryContent}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(ent.deliveryContent)}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1"
                    >
                      {copiedKey === ent.deliveryContent ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === ent.deliveryContent ? 'Copied' : 'Copy Key'}</span>
                    </button>
                  </div>
                )}

                {/* Download File */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-2">
                  <span className="text-xs text-slate-600 font-medium">
                    Package: <strong>{ent.fileName}</strong> ({ent.downloadCount || 1}/{ent.maxDownloads || 10} downloads used)
                  </span>
                  <a
                    href={`/api/downloads/${ent.downloadToken}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File (.ZIP)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Telegram Direct Support Box */}
        <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-sm text-teal-950">Have questions about this order?</h4>
            <p className="text-xs text-teal-800">Quote order number <strong>{order.orderNumber}</strong> to @navaseal on Telegram for VIP assistance.</p>
          </div>
          <a
            href="https://t.me/navaseal"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram Support</span>
          </a>
        </div>

      </div>
    </div>
  );
}

