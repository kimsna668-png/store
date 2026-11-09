import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Info, ChevronRight } from 'lucide-react';

export function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-teal-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Privacy Policy</span>
        </nav>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs prose max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 not-prose">
            Privacy & Data Security Policy
          </h1>
          <p className="text-slate-500 text-xs not-prose mb-6">Last updated: November 2026</p>

          <h3 className="text-base font-bold text-slate-900">1. Data We Collect</h3>
          <p>
            When purchasing on Nava Seal Store, we collect minimal personal information necessary to deliver and verify your digital entitlement, including your name, email address, optional Telegram handle, and transaction reference numbers.
          </p>

          <h3 className="text-base font-bold text-slate-900">2. Payment Security</h3>
          <p>
            Nava Seal Store never captures, processes, or stores your credit card numbers or banking passwords. All card payments are tokenized directly by Stripe, and all Bakong KHQR transactions are verified cryptographically through the National Bank of Cambodia payment switch.
          </p>

          <h3 className="text-base font-bold text-slate-900">3. Digital Download Protection</h3>
          <p>
            Digital files and license keys are delivered through private encrypted tokens with strict expiration and IP rate limiting to prevent unauthorized redistribution.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-teal-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Terms of Service</span>
        </nav>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs prose max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 not-prose">
            Terms & Conditions of Service
          </h1>
          <p className="text-slate-500 text-xs not-prose mb-6">Last updated: November 2026</p>

          <h3 className="text-base font-bold text-slate-900">1. Nature of Digital Goods</h3>
          <p>
            All products sold on Nava Seal Store are intangible digital goods, including software files, activation license keys, and digital accounts. By completing a transaction, you acknowledge that delivery is fulfilled instantly upon payment verification.
          </p>

          <h3 className="text-base font-bold text-slate-900">2. License Usage & Restrictions</h3>
          <p>
            Each purchased license grant corresponds strictly to the tier selected (Single Device, Multi-Device, or Unlimited Developer). Redistribution, reselling unauthorized copies, or public sharing of licensed files is strictly prohibited.
          </p>

          <h3 className="text-base font-bold text-slate-900">3. Warranty & Key Replacement</h3>
          <p>
            We guarantee 100% genuine functionality of our keys and installers. If an issue is reported with proof within the warranty window, our support team will provide a replacement license or full refund.
          </p>
        </div>
      </div>
    </div>
  );
}

