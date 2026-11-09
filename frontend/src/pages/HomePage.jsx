import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Send, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Headphones, 
  Download, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Cpu,
  Lock
} from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { formatPrice, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const spotlightProduct = mockProducts.find(p => p.slug === 'digital-product-2') || mockProducts[0];

  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(p => p.category.slug === selectedCategory);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#14b8a6_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold mb-6 backdrop-blur">
            <Zap className="w-3.5 h-3.5 text-teal-400 fill-teal-400" />
            <span>Official Nava Seal Digital Products Store</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Premium Digital Products, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">AI Creator Tools</span> & Software Licenses
          </h1>

          {/* Subheading with Khmer Typography */}
          <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium khmer-font leading-relaxed">
            ទិញកម្មវិធីកុំព្យូទ័រ អាជ្ញាប័ណ្ណស្របច្បាប់ និងឧបករណ៍ AI ជំនាន់ថ្មី។ ទទួលកូដ និងឯកសារភ្លាមៗ ២៤ ម៉ោង តាមរយៈស្កេន Bakong KHQR និង Stripe។
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm shadow-lg shadow-teal-500/30 transition flex items-center gap-2 group"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a
              href="https://t.me/navaseal"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span>Contact via Telegram @navaseal</span>
            </a>
          </div>

          {/* Category Chips Bar */}
          <div className="mt-12 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                selectedCategory === 'all'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-teal-500'
              }`}
            >
              🌟 All Products ({mockProducts.length})
            </button>
            {mockCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedCategory === c.slug
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-teal-500'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Reference Featured Product Spotlight: DIGITAL PRODUCT 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 text-white p-6 sm:p-10 border border-teal-500/30 shadow-2xl overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Featured Reference Product</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {spotlightProduct.title}
              </h2>

              <p className="text-base text-teal-300 font-semibold khmer-font">
                {spotlightProduct.titleKhmer}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {spotlightProduct.shortDescription}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Auto AI Subtitles</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Natural Voice Sync</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>4K 60FPS Batch Export</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Special Offer</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {formatPrice(spotlightProduct.price)}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(spotlightProduct.comparePrice)}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/digital-products/${spotlightProduct.slug}`}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-teal-500/30 transition flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>View Product Details</span>
                </Link>

                <button
                  onClick={() => addToCart(spotlightProduct)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
                >
                  Add to Cart
                </button>
              </div>

            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-teal-500/40 shadow-xl group">
                <img
                  src={spotlightProduct.imageUrl}
                  alt={spotlightProduct.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs">
                  <span className="font-bold text-teal-300">Instant Download Package</span>
                  <span className="bg-teal-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px]">
                    v2.5 Pro
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-teal-600 text-xs font-bold uppercase tracking-wider mb-1">
              Complete Store Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Trending Digital Assets & Tools
            </h2>
          </div>

          <Link
            to="/products"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
          >
            <span>Browse All {mockProducts.length} Items</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Why Choose Us & Trust Architecture */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-teal-600 text-xs font-bold uppercase tracking-wider">Unmatched Reliability</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Why Creators Trust Nava Seal Store
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Engineered for seamless digital delivery with zero waiting time and 100% verified authentic licenses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Automatic 5-Second Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                As soon as your Bakong KHQR or Stripe payment is verified server-side, your private download entitlement and activation keys are unlocked immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Genuine & Virus-Clean</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every software key is directly checked with vendor servers (Microsoft OEM, Canva Enterprise) and scanned for clean installation without malware.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Direct Support on Telegram</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have questions or need custom installation? Our dedicated Cambodian & English speaking technical support team is online on Telegram <strong className="text-slate-900">@navaseal</strong>.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Community Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">Need Custom Software or Bulk Keys?</span>
            <h3 className="text-xl sm:text-2xl font-black">
              Connect with Nava Seal on Telegram
            </h3>
            <p className="text-xs text-slate-400 max-w-lg">
              Get direct assistance, software demo videos, reseller pricing, and instant order tracking via Telegram.
            </p>
          </div>

          <a
            href="https://t.me/navaseal"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-teal-500/20 transition flex items-center gap-2 whitespace-nowrap"
          >
            <Send className="w-4 h-4 fill-slate-950" />
            <span>Chat on Telegram @navaseal</span>
          </a>
        </div>
      </section>

    </div>
  );
}

