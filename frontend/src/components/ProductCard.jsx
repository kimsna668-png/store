import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Zap, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, formatPrice } = useCart();

  const discountPercent = product.comparePrice && product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col group">
      
      {/* Thumbnail Container */}
      <div className="relative h-52 bg-slate-900 overflow-hidden">
        <img
          src={product.imageUrl || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          <div className="flex flex-col gap-1">
            {product.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-teal-500 text-slate-950 shadow-sm">
                {product.badge}
              </span>
            )}
            {discountPercent && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-500 text-white shadow-sm">
                -{discountPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] text-amber-300 font-semibold border border-white/10">
            <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
            <span>{product.rating || '4.9'}</span>
          </div>
        </div>

        {/* Category Label at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
            {product.category?.name || product.category || 'Digital Product'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link 
            to={`/digital-products/${product.slug}`}
            className="block text-sm font-bold text-slate-900 group-hover:text-teal-600 transition line-clamp-2 leading-snug"
          >
            {product.title}
          </Link>
          {product.titleKhmer && (
            <p className="mt-1 text-xs text-slate-500 line-clamp-1 khmer-font font-medium">
              {product.titleKhmer}
            </p>
          )}

          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
            <Zap className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span>Instant delivery 24/7 (Key & File)</span>
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-black text-slate-900">
              {formatPrice(product.price)}
            </div>
            {product.comparePrice && (
              <div className="text-[11px] text-slate-400 line-through">
                {formatPrice(product.comparePrice)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => addToCart(product)}
              className="p-2 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white transition"
              title="Add to Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <Link
              to={`/digital-products/${product.slug}`}
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1"
            >
              <span>View</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

