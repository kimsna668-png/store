import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  Package, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Settings, 
  Trash2, 
  Edit3, 
  Plus, 
  Search,
  ExternalLink,
  ShieldCheck,
  Zap,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { mockProducts, mockCategories } from '../../data/mockProducts';

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const { formatPrice } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [productsList, setProductsList] = useState(mockProducts);
  const [telegramStatus, setTelegramStatus] = useState({
    botToken: '789123456:AAG_placeholder_bot_token',
    adminChatId: '123456789',
    webhookStatus: 'ACTIVE',
    lastPing: '2 mins ago'
  });
  const [telegramTestAlert, setTelegramTestAlert] = useState(false);

  // Sample pending and processed orders for management
  const [orders, setOrders] = useState([
    {
      id: 'ord-1',
      orderNumber: 'NVS-20261108-9921',
      customerName: 'Kosal Vuth',
      customerEmail: 'kosal@gmail.com',
      amount: 15.00,
      currency: 'USD',
      method: 'KHQR_BAKONG',
      status: 'AWAITING_PAYMENT',
      slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80',
      date: 'Today, 6:15 PM'
    },
    {
      id: 'ord-2',
      orderNumber: 'NVS-20261108-8840',
      customerName: 'Samnang Roeun',
      customerEmail: 'samnang@yahoo.com',
      amount: 9.99,
      currency: 'USD',
      method: 'STRIPE',
      status: 'PAID',
      slipUrl: null,
      date: 'Today, 5:42 PM'
    },
    {
      id: 'ord-3',
      orderNumber: 'NVS-20261108-7712',
      customerName: 'Chan Moni',
      customerEmail: 'moni.chan@gmail.com',
      amount: 49.00,
      currency: 'USD',
      method: 'MANUAL_BANK_TRANSFER',
      status: 'VERIFYING',
      slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80',
      date: 'Today, 4:10 PM'
    }
  ]);

  const handleApproveOrder = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'DELIVERED' } : o));
    alert(`Order ${orderId} verified and approved! Instant delivery entitlement unlocked and notification dispatched via Telegram.`);
  };

  const handleRejectOrder = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'CANCELLED' } : o));
  };

  const handleTestTelegramNotification = () => {
    setTelegramTestAlert(true);
    setTimeout(() => setTelegramTestAlert(false), 3500);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Nava Seal Store Pro — Admin Console
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Logged in as <strong className="text-slate-800">{user?.fullName || 'Super Admin'}</strong> ({user?.role || 'SUPER_ADMIN'})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 mb-8 bg-white p-2 rounded-2xl shadow-xs">
          {[
            { id: 'overview', label: 'Overview & Analytics', icon: BarChart3 },
            { id: 'orders', label: `Orders & Slips (${orders.length})`, icon: ShoppingBag },
            { id: 'products', label: `Products (${productsList.length})`, icon: Package },
            { id: 'telegram', label: 'Telegram Bot Settings', icon: Send },
            { id: 'settings', label: 'Payment & Store Config', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
                  <DollarSign className="w-5 h-5 text-teal-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">$14,850.00</div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span>+18.4% from last month</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <ShoppingBag className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">428</div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  <span>96.2% fulfillment rate</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Customers</span>
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">312</div>
                <div className="text-[11px] text-slate-500 font-medium">
                  <span>Khmer & International creators</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Active Digital Products</span>
                  <Package className="w-5 h-5 text-teal-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">{productsList.length}</div>
                <div className="text-[11px] text-teal-600 font-semibold">
                  <span>24/7 instant auto delivery</span>
                </div>
              </div>

            </div>

            {/* Sales Chart Breakdown */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-extrabold text-slate-900">Revenue Performance Overview</h3>
                <span className="text-xs text-slate-500 font-medium">Last 7 Days (USD)</span>
              </div>

              <div className="grid grid-cols-7 gap-3 pt-6 items-end h-48 border-b border-slate-100 pb-4">
                {[
                  { day: 'Mon', val: 420, height: '40%' },
                  { day: 'Tue', val: 680, height: '65%' },
                  { day: 'Wed', val: 510, height: '50%' },
                  { day: 'Thu', val: 890, height: '85%' },
                  { day: 'Fri', val: 1040, height: '100%' },
                  { day: 'Sat', val: 780, height: '75%' },
                  { day: 'Sun', val: 920, height: '88%' }
                ].map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-700">${col.val}</span>
                    <div 
                      className="w-full bg-gradient-to-t from-teal-600 to-teal-400 rounded-lg hover:brightness-110 transition cursor-pointer"
                      style={{ height: col.height }}
                    ></div>
                    <span className="text-[11px] font-semibold text-slate-400">{col.day}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ORDERS & SLIP VERIFICATION */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Recent Customer Orders & Payment Slips</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Order Number</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Receipt Slip</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-800">{o.customerName}</div>
                        <div className="text-[10px] text-slate-400">{o.customerEmail}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-700">{o.method}</td>
                      <td className="p-3 font-extrabold text-slate-900">{formatPrice(o.amount)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          o.status === 'PAID' || o.status === 'DELIVERED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : o.status === 'VERIFYING'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {o.slipUrl ? (
                          <a href={o.slipUrl} target="_blank" rel="noreferrer" className="text-teal-600 underline font-semibold flex items-center gap-1">
                            <span>View Slip</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-400">None</span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-1">
                        {o.status !== 'DELIVERED' && o.status !== 'PAID' && (
                          <button
                            onClick={() => handleApproveOrder(o.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px]"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleRejectOrder(o.id)}
                          className="px-2 py-1 bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-bold rounded-lg text-[10px]"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-slate-900">Manage Digital Products</h3>
              <button
                onClick={() => alert('New product creation form modal')}
                className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productsList.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex gap-3">
                    <img src={p.imageUrl} alt={p.title} className="w-16 h-16 object-cover rounded-xl border border-slate-200" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{p.title}</h4>
                      <p className="text-[11px] text-teal-700 font-semibold">{formatPrice(p.price)}</p>
                      <span className="text-[10px] text-slate-400">Deliver: {p.deliveryType}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200/80 flex justify-between items-center text-xs">
                    <span className="text-[11px] text-emerald-600 font-bold">● Active</span>
                    <div className="flex gap-1.5">
                      <button className="p-1 text-slate-500 hover:text-teal-600">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 text-slate-500 hover:text-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TELEGRAM BOT INTEGRATION */}
        {activeTab === 'telegram' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Telegram Bot API Configuration</h3>
                <p className="text-xs text-slate-500">Real-time alerts for customer purchases, bank slips, and support tickets.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Telegram Bot Token</label>
                <input
                  type="password"
                  value={telegramStatus.botToken}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Admin Chat ID</label>
                <input
                  type="text"
                  value={telegramStatus.adminChatId}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-sky-950">Webhook Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                  HEALTHY / ACTIVE
                </span>
              </div>
              <p className="text-xs text-sky-900">
                Telegram bot is actively configured to listen for orders and deliver instant customer key notifications.
              </p>
              <button
                onClick={handleTestTelegramNotification}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Test Admin Alert to Telegram</span>
              </button>
            </div>

            {telegramTestAlert && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Simulated test alert dispatched: <strong>"🔔 New Order: NVS-20261108-9921 ($15.00 via Bakong KHQR)"</strong></span>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PAYMENT & STORE CONFIG */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-extrabold text-slate-900">Storefront & Gateway Settings</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">🇰🇭 Bakong KHQR Settings</span>
                <p className="text-slate-500 text-[11px]">Merchant ID: <strong>navaseal@abaa</strong></p>
                <p className="text-slate-500 text-[11px]">Merchant Name: <strong>NAVA SEAL DIGITAL</strong></p>
                <p className="text-slate-500 text-[11px]">Currency: USD (840) & KHR (116)</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">💳 Stripe Card Gateway</span>
                <p className="text-slate-500 text-[11px]">API Status: <strong>Ready (Test / Live)</strong></p>
                <p className="text-slate-500 text-[11px]">Webhook Endpoint: <strong>/api/payments/webhook</strong></p>
                <p className="text-slate-500 text-[11px]">Card Retention: <strong>Zero Raw Card Storage</strong></p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

