import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Send, Zap, ShieldCheck } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does instant digital delivery work?',
      a: 'Immediately after your payment is completed (via Bakong KHQR scan or Stripe), our automated backend marks your order as PAID and generates your private signed download link and license key right on your screen. You also receive an order confirmation with permanent access in your customer dashboard.'
    },
    {
      q: 'Which local Cambodian payment methods are supported?',
      a: 'We support all major Cambodian banking apps through the National Bank of Cambodia Bakong KHQR standard, including ABA Bank, Wing Bank, ACLEDA, Canadia, TrueMoney, and Prince Bank. Both USD and KHR (Khmer Riel) QR codes are supported.'
    },
    {
      q: 'Are the Windows 11 and Microsoft Office license keys genuine?',
      a: 'Yes, 100%. All keys are genuine OEM/Retail lifetime digital activation keys directly authenticated with Microsoft official activation servers. They receive all future security and feature updates permanently.'
    },
    {
      q: 'What is included with "Digital Product 2"?',
      a: 'Digital Product 2 is the flagship AI Automated Video Suite by Nava Seal. It includes the complete software executable (.ZIP), a permanent activation key, step-by-step video instructions in Khmer & English, and direct access to our VIP Telegram support group.'
    },
    {
      q: 'What if I need help installing or setting up my product?',
      a: 'We provide direct one-on-one technical assistance through Telegram @navaseal. If you encounter any installation questions or need assistance, message us anytime with your Order Number.'
    },
    {
      q: 'What is your refund and warranty policy?',
      a: 'We guarantee that all digital keys and software packages function as advertised. In the rare event that an activation key fails or an issue cannot be resolved by our technical team within 24 hours, we provide an immediate key replacement or 100% refund.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-slate-500">
            Answers to common questions regarding orders, Bakong KHQR payments, instant downloads, and licenses.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-teal-600 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-teal-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Telegram Direct Support Box */}
        <div className="mt-12 p-6 rounded-2xl bg-teal-50 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-sm text-teal-950">Still have questions?</h4>
            <p className="text-xs text-teal-800">Our customer support specialists are online on Telegram 24/7.</p>
          </div>
          <a
            href="https://t.me/navaseal"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Chat on Telegram @navaseal</span>
          </a>
        </div>

      </div>
    </div>
  );
}

