import React from 'react';
import { Link } from 'react-router-dom';
import { Send, ShieldCheck, Zap, Lock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-teal-500/20">
              NS
            </div>
            <div>
              <span className="text-white font-extrabold text-base tracking-tight">NAVA SEAL STORE</span>
              <p className="text-[10px] text-teal-400 font-semibold">AUTHENTIC DIGITAL PRODUCTS</p>
            </div>
          </div>
          
          <p className="text-xs leading-relaxed text-slate-400">
            Cambodia's premier digital store offering genuine software keys, AI content creator tools, design templates, and automated instant delivery via Bakong KHQR & Stripe.
          </p>

          <div className="pt-2">
            <a 
              href="https://t.me/navaseal" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-600/20 text-teal-300 border border-teal-500/30 text-xs font-bold hover:bg-teal-600 hover:text-white transition"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Join Telegram: @navaseal</span>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2">
            Digital Categories
          </h5>
          <ul className="space-y-2.5">
            <li>
              <Link to="/products?category=ai-tools" className="hover:text-teal-400 transition flex items-center justify-between">
                <span>AI Video & Script Tools</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Hot</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=software-licenses" className="hover:text-teal-400 transition">
                Windows 11 / 10 Pro OEM Keys
              </Link>
            </li>
            <li>
              <Link to="/products?category=design-graphics" className="hover:text-teal-400 transition">
                Canva Pro Lifetime Upgrade
              </Link>
            </li>
            <li>
              <Link to="/products?category=accounts-services" className="hover:text-teal-400 transition">
                Monetized TikTok Accounts (US/JP)
              </Link>
            </li>
            <li>
              <Link to="/products?category=source-code" className="hover:text-teal-400 transition">
                Khmer POS & Inventory Source Code
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Help */}
        <div>
          <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2">
            Customer Care
          </h5>
          <ul className="space-y-2.5">
            <li>
              <Link to="/faq" className="hover:text-teal-400 transition">
                How Instant Download Works
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-teal-400 transition">
                Paying with Bakong KHQR (ABA, Wing, etc.)
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-teal-400 transition">
                Contact Technical Support
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-teal-400 transition">
                Privacy & Data Security Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-teal-400 transition">
                Terms & Conditions of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Payment Gateways & Guarantee */}
        <div>
          <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2">
            Accepted Payments
          </h5>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-center font-bold text-slate-300 text-[11px]">
              🇰🇭 Bakong KHQR
            </div>
            <div className="px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-center font-bold text-slate-300 text-[11px]">
              💳 ABA PAY
            </div>
            <div className="px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-center font-bold text-slate-300 text-[11px]">
              Wing Bank
            </div>
            <div className="px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-center font-bold text-slate-300 text-[11px]">
              Stripe / Visa
            </div>
          </div>
          
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-teal-400 font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit SSL Encryption</span>
            </div>
            <p>Every transaction is cryptographically secured with zero card retention.</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p>© 2026 Nava Seal Store Pro. Re-engineered with high performance & security.</p>
        <p className="flex items-center gap-1.5">
          <span>Inspired by reference</span>
          <a 
            href="https://navaseal.site/digital-products/digital-product-2" 
            target="_blank" 
            rel="noreferrer" 
            className="text-teal-400 hover:underline font-semibold"
          >
            navaseal.site/digital-products/digital-product-2
          </a>
        </p>
      </div>
    </footer>
  );
}

