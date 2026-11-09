import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Key, 
  Download, 
  LogOut, 
  ShieldCheck, 
  Zap, 
  Clock, 
  ChevronRight,
  Copy,
  Check,
  FileCode
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function CustomerDashboardPage() {
  const { user, logout, isAdmin } = useAuth();
  const { formatPrice } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders');
  const [copiedKey, setCopiedKey] = useState(null);

  const sampleOrders = [
    {
      id: 'ord-101',
      orderNumber: 'NVS-20261108-8821',
      date: 'Nov 08, 2026',
      total: 15.00,
      status: 'DELIVERED',
      productTitle: 'Digital Product 2 - AI Automated Video & Content Generator Pro',
      variant: 'Standard Personal License',
      downloadFileName: 'NavaSeal_AI_Video_Suite_v2.5_Pro.zip',
      licenseKey: 'NS-PRO-98FA-42C1-88E0-9921'
    },
    {
      id: 'ord-102',
      orderNumber: 'NVS-20261102-3319',
      date: 'Nov 02, 2026',
      total: 9.99,
      status: 'DELIVERED',
      productTitle: 'Windows 11 Professional Genuine Lifetime OEM Retail Key',
      variant: '1 PC Lifetime OEM Activation',
      downloadFileName: 'Windows11_MediaCreationGuide.pdf',
      licenseKey: 'W269N-WFGWX-YVC9B-4J6C9-T83GX'
    }
  ];

  const handleCopyKey = (key) => {
    navigator.clipboard?.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-400 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-teal-500/20">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {user?.fullName || 'Valued Customer'}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800">
                  {user?.role || 'CUSTOMER'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{user?.email || 'customer@navaseal.site'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-2 space-y-1 shadow-xs">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition ${
                  activeTab === 'orders'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>My Orders & History</span>
              </button>

              <button
                onClick={() => setActiveTab('licenses')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition ${
                  activeTab === 'licenses'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>License Keys</span>
              </button>

              <button
                onClick={() => setActiveTab('downloads')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition ${
                  activeTab === 'downloads'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download Center</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
                <h2 className="text-base font-extrabold text-slate-900">Your Purchases ({sampleOrders.length})</h2>
                
                <div className="space-y-4">
                  {sampleOrders.map((ord) => (
                    <div key={ord.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-200/80 pb-3">
                        <div>
                          <span className="font-mono font-bold text-xs text-slate-900 block">{ord.orderNumber}</span>
                          <span className="text-[11px] text-slate-400">{ord.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {ord.status}
                          </span>
                          <span className="text-sm font-extrabold text-slate-900">
                            {formatPrice(ord.total)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{ord.productTitle}</h4>
                          <p className="text-[11px] text-teal-700 font-semibold">{ord.variant}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCopyKey(ord.licenseKey)}
                            className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 text-xs font-bold transition flex items-center gap-1"
                          >
                            <Key className="w-3.5 h-3.5" />
                            <span>Copy Key</span>
                          </button>
                          <button
                            onClick={() => alert(`Starting download for: ${ord.downloadFileName}`)}
                            className="px-3 py-1.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 text-xs font-bold transition flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* License Keys Tab */}
            {activeTab === 'licenses' && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
                <h2 className="text-base font-extrabold text-slate-900">Active Activation License Keys</h2>
                
                <div className="space-y-3">
                  {sampleOrders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{ord.productTitle}</span>
                        <span className="text-sm font-mono font-black text-teal-800 tracking-wider">
                          {ord.licenseKey}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyKey(ord.licenseKey)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5"
                      >
                        {copiedKey === ord.licenseKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === ord.licenseKey ? 'Copied!' : 'Copy Key'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
                <h2 className="text-base font-extrabold text-slate-900">Downloadable Packages & Assets</h2>

                <div className="space-y-3">
                  {sampleOrders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600">
                          <FileCode className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{ord.downloadFileName}</span>
                          <span className="text-[11px] text-slate-500 font-medium">Order: {ord.orderNumber} • Unlimited Downloads</span>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Initiating secure signed download for ${ord.downloadFileName}`)}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download ZIP</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

