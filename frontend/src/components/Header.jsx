import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  User as UserIcon, 
  Send, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalCount, currency, toggleCurrency, setIsCartDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Zap className="w-2.5 h-2.5 mr-1" />
              AUTO DELIVERY
            </span>
            <span className="text-slate-300">
              Welcome to <strong className="text-white">Nava Seal Store</strong> — 24/7 Instant Delivery via Bakong KHQR & Stripe
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href="https://t.me/navaseal" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-teal-400 transition"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram: <strong>@navaseal</strong></span>
            </a>

            {/* Currency Switcher */}
            <div className="flex items-center border-l border-slate-700 pl-3">
              <button 
                onClick={toggleCurrency}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition"
                title="Click to toggle currency between USD and KHR"
              >
                <span>Currency:</span>
                <span className="text-teal-400 font-bold">{currency === 'USD' ? 'USD ($)' : 'KHR (៛)'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/25 font-black text-xl tracking-wider group-hover:scale-105 transition-transform">
                NS
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-teal-600 transition">
                    NAVA SEAL
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800">
                    STORE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium tracking-tight">Digital Products & Solutions</p>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search AI tools, Windows keys, Canva Pro, source code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-full focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </form>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link 
                to="/products" 
                className="text-sm font-semibold text-slate-700 hover:text-teal-600 transition"
              >
                All Products
              </Link>

              <div className="relative">
                <button
                  onClick={() => setCategoryDropdown(!categoryDropdown)}
                  onBlur={() => setTimeout(() => setCategoryDropdown(false), 200)}
                  className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-teal-600 transition"
                >
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {categoryDropdown && (
                  <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <Link 
                      to="/products?category=ai-tools" 
                      className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      🤖 AI Automated Tools
                    </Link>
                    <Link 
                      to="/products?category=software-licenses" 
                      className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      🪟 Windows & Office Keys
                    </Link>
                    <Link 
                      to="/products?category=design-graphics" 
                      className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      🎨 Canva Pro & Design Kits
                    </Link>
                    <Link 
                      to="/products?category=accounts-services" 
                      className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      📱 Monetized Accounts
                    </Link>
                    <Link 
                      to="/products?category=source-code" 
                      className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      💻 Developer Source Code & POS
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/faq" 
                className="text-sm font-semibold text-slate-700 hover:text-teal-600 transition"
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className="text-sm font-semibold text-slate-700 hover:text-teal-600 transition"
              >
                Support
              </Link>
            </nav>

            {/* Actions: Cart Trigger, Account Link */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
                title="Open Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-teal-600 text-white rounded-full text-xs font-extrabold flex items-center justify-center animate-pulse">
                    {totalCount}
                  </span>
                )}
              </button>

              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Account</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            <Link 
              to="/products" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold py-1.5 text-slate-800"
            >
              All Products Catalog
            </Link>
            <Link 
              to="/categories" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold py-1.5 text-slate-800"
            >
              Product Categories
            </Link>
            <Link 
              to="/faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold py-1.5 text-slate-800"
            >
              Frequently Asked Questions (FAQ)
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold py-1.5 text-slate-800"
            >
              Contact & Telegram Support
            </Link>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Switch Currency:</span>
              <button
                onClick={toggleCurrency}
                className="px-3 py-1 bg-slate-100 text-xs font-bold rounded text-slate-800"
              >
                {currency === 'USD' ? 'USD ($)' : 'KHR (៛)'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

